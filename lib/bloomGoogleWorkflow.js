import { env } from './env.js';

export const BLOOM_ALLOWED_STATUSES = [
  'waitlist',
  'booking_started',
  'booked',
  'rescheduled',
  'cancelled',
  'completed',
  'no_show'
];

export const BLOOM_CANONICAL_SHEET_COLUMNS = [
  'lead_id',
  'booking_id',
  'experiment_id',
  'experiment_slug',
  'page_variant',
  'source_type',
  'source_detail',
  'channel',
  'campaign_id',
  'email_variant_id',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'name',
  'email',
  'phone',
  'company',
  'role_title',
  'status',
  'booking_started_at',
  'booked_at',
  'scheduled_for',
  'booking_url',
  'attended',
  'no_show',
  'reschedule_count',
  'pain_confirmed',
  'urgency_level',
  'signal_strength',
  'top_objections',
  'follow_up_recommended',
  'follow_up_owner',
  'follow_up_status',
  'notes',
  'created_at',
  'updated_at',
  'last_event_type',
  'last_event_at'
];

function isoNow() {
  return new Date().toISOString();
}

function pickDefinedEntries(input = {}) {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

function normalizeLead(lead = {}) {
  return pickDefinedEntries({
    lead_id: lead.lead_id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    role_title: lead.role_title || lead.role,
    notes: lead.notes
  });
}

function normalizeAttribution(attribution = {}, channel) {
  return pickDefinedEntries({
    source_type: attribution.source_type || attribution.source || channel,
    source_detail: attribution.source_detail || attribution.medium,
    channel: attribution.channel || channel,
    campaign_id: attribution.campaign_id,
    email_variant_id: attribution.email_variant_id,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term
  });
}

export function bloomSheetTarget() {
  return {
    spreadsheet_id: env.bloomGoogleSheetId,
    sheet_tab: env.bloomGoogleSheetTab,
    canonical_columns: BLOOM_CANONICAL_SHEET_COLUMNS
  };
}

export function buildBookingStartedWorkflowPayload({ experiment, variant, attribution, lead, bookingUrl }) {
  const timestamp = isoNow();
  const normalizedLead = normalizeLead(lead);
  const normalizedAttribution = normalizeAttribution(attribution, experiment.channel);

  return {
    workflow: 'bloom_google_v1',
    action: 'upsert_lead_row',
    event_name: 'booking_flow_started',
    match_keys: pickDefinedEntries({
      lead_id: normalizedLead.lead_id,
      booking_id: lead?.booking_id,
      email: normalizedLead.email,
      experiment_slug: experiment.slug
    }),
    row_patch: {
      ...normalizedLead,
      ...normalizedAttribution,
      experiment_id: experiment.id,
      experiment_slug: experiment.slug,
      page_variant: variant,
      status: 'booking_started',
      booking_started_at: timestamp,
      booking_url: bookingUrl,
      created_at: timestamp,
      updated_at: timestamp,
      last_event_type: 'booking_flow_started',
      last_event_at: timestamp
    },
    sheet: bloomSheetTarget()
  };
}

export function buildWaitlistWorkflowPayload({ experiment, variant, attribution, lead }) {
  const timestamp = isoNow();
  const normalizedLead = normalizeLead(lead);
  const normalizedAttribution = normalizeAttribution(attribution, experiment.channel);

  return {
    workflow: 'bloom_google_v1',
    action: 'upsert_lead_row',
    event_name: 'waitlist_submitted',
    match_keys: pickDefinedEntries({
      lead_id: normalizedLead.lead_id,
      email: normalizedLead.email,
      experiment_slug: experiment.slug
    }),
    row_patch: {
      ...normalizedLead,
      ...normalizedAttribution,
      experiment_id: experiment.id,
      experiment_slug: experiment.slug,
      page_variant: variant,
      status: 'waitlist',
      created_at: timestamp,
      updated_at: timestamp,
      last_event_type: 'waitlist_submitted',
      last_event_at: timestamp
    },
    sheet: bloomSheetTarget()
  };
}

export function buildBookingLifecycleWorkflowPayload(body = {}) {
  const timestamp = isoNow();
  const eventName = body.event_name || 'booking_completed';
  const status = body.status || (eventName === 'booking_rescheduled' ? 'rescheduled' : eventName === 'booking_cancelled' ? 'cancelled' : 'booked');

  return {
    workflow: 'bloom_google_v1',
    action: 'update_lead_row',
    event_name: eventName,
    match_keys: pickDefinedEntries({
      lead_id: body.lead_id,
      booking_id: body.booking_id,
      email: body.email,
      experiment_slug: body.experiment_slug
    }),
    row_patch: pickDefinedEntries({
      lead_id: body.lead_id,
      booking_id: body.booking_id,
      experiment_id: body.experiment_id,
      experiment_slug: body.experiment_slug,
      page_variant: body.page_variant,
      status: BLOOM_ALLOWED_STATUSES.includes(status) ? status : 'booked',
      booked_at: body.booked_at || (status === 'booked' ? timestamp : undefined),
      scheduled_for: body.scheduled_for,
      booking_url: body.booking_url,
      reschedule_count: body.reschedule_count,
      updated_at: timestamp,
      last_event_type: eventName,
      last_event_at: timestamp
    }),
    sheet: bloomSheetTarget()
  };
}

export function buildDemoOutcomeWorkflowPayload(body = {}) {
  const timestamp = isoNow();
  const eventName = body.event_name || (body.attended ? 'demo_completed' : 'demo_no_show');
  const status = body.status || (eventName === 'demo_no_show' ? 'no_show' : 'completed');

  return {
    workflow: 'bloom_google_v1',
    action: 'update_lead_row',
    event_name: eventName,
    match_keys: pickDefinedEntries({
      lead_id: body.lead_id,
      booking_id: body.booking_id,
      email: body.email,
      experiment_slug: body.experiment_slug
    }),
    row_patch: pickDefinedEntries({
      lead_id: body.lead_id,
      booking_id: body.booking_id,
      experiment_id: body.experiment_id,
      experiment_slug: body.experiment_slug,
      page_variant: body.page_variant,
      status: BLOOM_ALLOWED_STATUSES.includes(status) ? status : 'completed',
      attended: body.attended,
      no_show: body.no_show ?? (status === 'no_show'),
      pain_confirmed: body.pain_confirmed,
      urgency_level: body.urgency_level,
      signal_strength: body.signal_strength,
      top_objections: Array.isArray(body.top_objections) ? body.top_objections.join('; ') : body.top_objections,
      follow_up_recommended: body.follow_up_recommended,
      follow_up_owner: body.follow_up_owner,
      follow_up_status: body.follow_up_status,
      notes: body.notes,
      updated_at: timestamp,
      last_event_type: eventName,
      last_event_at: timestamp
    }),
    sheet: bloomSheetTarget()
  };
}
