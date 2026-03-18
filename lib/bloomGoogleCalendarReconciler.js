import { env } from './env.js';
import { BLOOM_CANONICAL_SHEET_COLUMNS, bloomSheetTarget } from './bloomGoogleWorkflow.js';
import { gws, processBloomGoogleWorkflow, readSheetRows, rowToObject } from './bloomGoogleSheetsWorker.js';

function isoNow() {
  return new Date().toISOString();
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function normalizeText(value) {
  return String(value || '').trim();
}

function pickDefinedEntries(input = {}) {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

function parseEventDate(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.dateTime || value.date || '';
}

function parseMetadataBlock(text = '') {
  const metadata = {};
  const patterns = {
    lead_id: /(?:^|[\s\n,;])lead_id[=:]\s*([^\s\n,;]+)/i,
    booking_id: /(?:^|[\s\n,;])booking_id[=:]\s*([^\s\n,;]+)/i,
    experiment_slug: /(?:^|[\s\n,;])experiment_slug[=:]\s*([^\s\n,;]+)/i,
    experiment_id: /(?:^|[\s\n,;])experiment_id[=:]\s*([^\s\n,;]+)/i,
    email: /(?:^|[\s\n,;])email[=:]\s*([^\s\n,;]+)/i,
    page_variant: /(?:^|[\s\n,;])page_variant[=:]\s*([^\s\n,;]+)/i,
    channel: /(?:^|[\s\n,;])channel[=:]\s*([^\s\n,;]+)/i,
    campaign_id: /(?:^|[\s\n,;])campaign_id[=:]\s*([^\s\n,;]+)/i,
    email_variant_id: /(?:^|[\s\n,;])email_variant_id[=:]\s*([^\s\n,;]+)/i
  };

  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = text.match(pattern);
    if (match?.[1]) metadata[key] = match[1].trim();
  });

  const urlMatches = text.match(/https?:\/\/[^\s)]+/gi) || [];
  for (const rawUrl of urlMatches) {
    try {
      const parsedUrl = new URL(rawUrl);
      ['lead_id', 'booking_id', 'experiment_slug', 'experiment_id', 'email', 'page_variant', 'channel', 'campaign_id', 'email_variant_id'].forEach((key) => {
        const value = parsedUrl.searchParams.get(key);
        if (value && !metadata[key]) metadata[key] = value;
      });
    } catch {
      // ignore malformed URLs inside event descriptions
    }
  }

  return metadata;
}

function extractDescriptionMetadata(event = {}) {
  const description = [event.description, event.location, event.summary].filter(Boolean).join('\n');
  return parseMetadataBlock(description);
}

function extractEventMetadata(event = {}) {
  const privateProps = event.extendedProperties?.private || {};
  const sharedProps = event.extendedProperties?.shared || {};
  const parsed = extractDescriptionMetadata(event);
  const attendees = Array.isArray(event.attendees) ? event.attendees : [];
  const attendeeEmail = attendees.find((attendee) => attendee.self !== true && attendee.email)?.email || attendees[0]?.email;

  return pickDefinedEntries({
    lead_id: privateProps.lead_id || sharedProps.lead_id || parsed.lead_id,
    booking_id: privateProps.booking_id || sharedProps.booking_id || parsed.booking_id || event.id,
    experiment_id: privateProps.experiment_id || sharedProps.experiment_id || parsed.experiment_id,
    experiment_slug: privateProps.experiment_slug || sharedProps.experiment_slug || parsed.experiment_slug,
    page_variant: privateProps.page_variant || sharedProps.page_variant || parsed.page_variant,
    channel: privateProps.channel || sharedProps.channel || parsed.channel,
    campaign_id: privateProps.campaign_id || sharedProps.campaign_id || parsed.campaign_id,
    email_variant_id: privateProps.email_variant_id || sharedProps.email_variant_id || parsed.email_variant_id,
    email: privateProps.email || sharedProps.email || parsed.email || attendeeEmail
  });
}

function buildRowLookup(rows) {
  const headers = rows[0] || BLOOM_CANONICAL_SHEET_COLUMNS;
  const byLeadId = new Map();
  const byBookingId = new Map();
  const byEmailAndExperiment = new Map();

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const record = rowToObject(headers, row);
    record.__rowNumber = rowNumber;

    if (record.lead_id) byLeadId.set(String(record.lead_id), record);
    if (record.booking_id) byBookingId.set(String(record.booking_id), record);
    if (record.email && record.experiment_slug) byEmailAndExperiment.set(`${record.email}::${record.experiment_slug}`, record);
  });

  return { byLeadId, byBookingId, byEmailAndExperiment };
}

function findExistingRow(lookup, matchKeys = {}) {
  if (matchKeys.lead_id && lookup.byLeadId.has(String(matchKeys.lead_id))) {
    return lookup.byLeadId.get(String(matchKeys.lead_id));
  }
  if (matchKeys.booking_id && lookup.byBookingId.has(String(matchKeys.booking_id))) {
    return lookup.byBookingId.get(String(matchKeys.booking_id));
  }
  if (matchKeys.email && matchKeys.experiment_slug) {
    return lookup.byEmailAndExperiment.get(`${matchKeys.email}::${matchKeys.experiment_slug}`) || null;
  }
  return null;
}

function determineLifecycleEvent(event, existingRow) {
  if (event.status === 'cancelled') return { event_name: 'booking_cancelled', status: 'cancelled' };

  const scheduledFor = parseEventDate(event.start);
  if (existingRow?.scheduled_for && scheduledFor && existingRow.scheduled_for !== scheduledFor) {
    return { event_name: 'booking_rescheduled', status: 'rescheduled' };
  }

  return { event_name: 'booking_completed', status: 'booked' };
}

function buildWorkflowPayloadFromCalendarEvent(event, existingRow) {
  const metadata = extractEventMetadata(event);
  const lifecycle = determineLifecycleEvent(event, existingRow);
  const scheduledFor = parseEventDate(event.start);
  const updatedAt = event.updated || isoNow();

  const matchKeys = pickDefinedEntries({
    lead_id: metadata.lead_id,
    booking_id: metadata.booking_id,
    email: metadata.email || existingRow?.email,
    experiment_slug: metadata.experiment_slug || existingRow?.experiment_slug
  });

  if (!matchKeys.lead_id && !matchKeys.booking_id && !(matchKeys.email && matchKeys.experiment_slug)) {
    return null;
  }

  return {
    workflow: 'bloom_google_v1',
    action: 'update_lead_row',
    source: 'google_calendar_reconciler',
    event_name: lifecycle.event_name,
    match_keys: matchKeys,
    row_patch: pickDefinedEntries({
      lead_id: metadata.lead_id || existingRow?.lead_id,
      booking_id: metadata.booking_id || existingRow?.booking_id,
      experiment_id: metadata.experiment_id || existingRow?.experiment_id,
      experiment_slug: metadata.experiment_slug || existingRow?.experiment_slug,
      page_variant: metadata.page_variant || existingRow?.page_variant,
      channel: metadata.channel || existingRow?.channel,
      campaign_id: metadata.campaign_id || existingRow?.campaign_id,
      email_variant_id: metadata.email_variant_id || existingRow?.email_variant_id,
      email: metadata.email || existingRow?.email,
      status: lifecycle.status,
      booked_at: lifecycle.status === 'booked' && !existingRow?.booked_at ? updatedAt : existingRow?.booked_at,
      scheduled_for: scheduledFor,
      updated_at: updatedAt,
      last_event_type: lifecycle.event_name,
      last_event_at: updatedAt
    }),
    sheet: bloomSheetTarget(),
    calendar_event: {
      id: event.id,
      status: event.status,
      summary: event.summary || '',
      updated: event.updated || '',
      scheduled_for: scheduledFor
    }
  };
}

export async function reconcileBloomCalendarToSheet(options = {}) {
  const calendarId = options.calendar_id || options.calendarId || env.bloomGoogleCalendarId || 'primary';
  const now = new Date();
  const timeMin = options.time_min || options.timeMin || addDays(now, -14).toISOString();
  const timeMax = options.time_max || options.timeMax || addDays(now, 30).toISOString();
  const maxResults = Number(options.max_results || options.maxResults || 100);
  const dryRun = options.dry_run === true || options.dryRun === true;

  const [{ data: eventsResponse }, rows] = await Promise.all([
    gws('calendar events list', {
      calendarId,
      singleEvents: true,
      showDeleted: true,
      orderBy: 'updated',
      timeMin,
      timeMax,
      maxResults
    }),
    readSheetRows(env.bloomGoogleSheetId, env.bloomGoogleSheetTab)
  ]);

  const lookup = buildRowLookup(rows);
  const events = Array.isArray(eventsResponse.items) ? eventsResponse.items : [];
  const considered = [];
  const applied = [];
  const skipped = [];

  for (const event of events) {
    const metadata = extractEventMetadata(event);
    const existingRow = findExistingRow(lookup, metadata);
    const workflowPayload = buildWorkflowPayloadFromCalendarEvent(event, existingRow);

    if (!workflowPayload) {
      skipped.push({
        calendar_event_id: event.id,
        reason: 'no_stable_match_keys',
        metadata
      });
      continue;
    }

    considered.push({
      calendar_event_id: event.id,
      event_name: workflowPayload.event_name,
      match_keys: workflowPayload.match_keys,
      scheduled_for: workflowPayload.row_patch.scheduled_for || '',
      existing_row_status: existingRow?.status || ''
    });

    if (dryRun) {
      applied.push({ dry_run: true, workflow: workflowPayload });
      continue;
    }

    const result = await processBloomGoogleWorkflow(workflowPayload);
    applied.push(result);

    const refreshedMatch = findExistingRow(lookup, workflowPayload.match_keys);
    const merged = {
      ...(refreshedMatch || existingRow || {}),
      ...workflowPayload.row_patch
    };
    if (merged.lead_id) lookup.byLeadId.set(String(merged.lead_id), merged);
    if (merged.booking_id) lookup.byBookingId.set(String(merged.booking_id), merged);
    if (merged.email && merged.experiment_slug) lookup.byEmailAndExperiment.set(`${merged.email}::${merged.experiment_slug}`, merged);
  }

  return {
    ok: true,
    calendar_id: calendarId,
    time_min: timeMin,
    time_max: timeMax,
    dry_run: dryRun,
    total_events_fetched: events.length,
    considered,
    applied,
    skipped
  };
}
