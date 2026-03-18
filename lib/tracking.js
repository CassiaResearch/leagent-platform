import crypto from 'node:crypto';
import { env } from './env.js';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export function readVariant(searchParams, experiment) {
  const candidate = String(searchParams?.variant || 'A').toUpperCase();
  return experiment.variants[candidate] ? candidate : Object.keys(experiment.variants)[0];
}

export function buildAttribution(searchParams = {}) {
  const out = {};
  UTM_KEYS.forEach((key) => {
    if (searchParams[key]) out[key] = String(searchParams[key]);
  });
  ['source', 'medium', 'channel', 'campaign_id', 'email_variant_id', 'lead_id'].forEach((key) => {
    if (searchParams[key]) out[key] = String(searchParams[key]);
  });
  return out;
}

export function buildBookingUrl(experiment, variant, searchParams = {}, lead = {}) {
  const bookingUrl = new URL(experiment.bookingUrl || env.defaultBookingUrl);
  bookingUrl.searchParams.set('experiment_id', experiment.id);
  bookingUrl.searchParams.set('experiment_slug', experiment.slug);
  bookingUrl.searchParams.set('page_variant', variant);
  Object.entries(buildAttribution(searchParams)).forEach(([key, value]) => bookingUrl.searchParams.set(key, value));
  Object.entries(lead).forEach(([key, value]) => { if (value) bookingUrl.searchParams.set(key, value); });
  bookingUrl.searchParams.set('booking_started_at', new Date().toISOString());
  return bookingUrl.toString();
}

export function cookieLeadId() {
  return crypto.randomUUID();
}

export async function postWebhook(url, payload) {
  if (!url) return { skipped: true };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });
  return { ok: response.ok, status: response.status };
}
