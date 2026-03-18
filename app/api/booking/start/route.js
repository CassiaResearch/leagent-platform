import { NextResponse } from 'next/server';
import { getExperiment } from '../../../../lib/experiments.js';
import { submitHubspotForm } from '../../../../lib/hubspot.js';
import { buildBookingStartedWorkflowPayload } from '../../../../lib/bloomGoogleWorkflow.js';
import { buildBookingUrl, cookieLeadId, postWebhook } from '../../../../lib/tracking.js';
import { env } from '../../../../lib/env.js';
import { processBloomGoogleWorkflow } from '../../../../lib/bloomGoogleSheetsWorker.js';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const experiment = getExperiment(body?.experiment_slug);
  if (!experiment) {
    return NextResponse.json({ error: 'Unknown experiment' }, { status: 404 });
  }

  const variant = body?.page_variant || 'A';
  const attribution = body?.attribution || {};
  const lead = body?.lead || {};
  const leadId = lead.lead_id || attribution.lead_id || cookieLeadId();
  const leadPayload = {
    ...attribution,
    ...lead,
    lead_id: leadId,
    experiment_id: experiment.id,
    experiment_slug: experiment.slug,
    page_variant: variant
  };
  const bookingUrl = buildBookingUrl(experiment, variant, attribution, { lead_id: leadId, email: lead.email || '', company: lead.company || '' });
  const workflowPayload = buildBookingStartedWorkflowPayload({
    experiment,
    variant,
    attribution,
    lead: leadPayload,
    bookingUrl
  });

  console.log('[bloom:booking-start]', { experiment_id: experiment.id, page_variant: variant, lead: leadPayload, bookingUrl, workflowPayload });

  const [hubspot, worker, webhook] = await Promise.all([
    submitHubspotForm(leadPayload).catch((error) => ({ error: error.message })),
    env.bloomWorkflowMode === 'local'
      ? processBloomGoogleWorkflow(workflowPayload).catch((error) => ({ error: error.message }))
      : Promise.resolve({ skipped: true, mode: env.bloomWorkflowMode }),
    postWebhook(env.bookingWebhookUrl || env.eventWebhookUrl, workflowPayload).catch((error) => ({ error: error.message }))
  ]);

  return NextResponse.json({
    ok: true,
    booking_url: bookingUrl,
    lead_id: leadId,
    bloom_google_workflow: workflowPayload,
    integrations: { hubspot, worker, webhook }
  });
}
