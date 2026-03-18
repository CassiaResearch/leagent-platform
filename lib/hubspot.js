import { env } from './env.js';

export async function submitHubspotForm(payload) {
  if (!env.hubspotFormPortalId || !env.hubspotFormId) {
    return { skipped: true, reason: 'missing_hubspot_form_config' };
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${env.hubspotFormPortalId}/${env.hubspotFormId}`;
  const fields = Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([name, value]) => ({ name, value: String(value) }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ fields }),
    cache: 'no-store'
  });

  return { ok: response.ok, status: response.status };
}
