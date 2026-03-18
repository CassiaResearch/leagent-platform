import { NextResponse } from 'next/server';
import { buildBookingLifecycleWorkflowPayload } from '../../../../lib/bloomGoogleWorkflow.js';
import { postWebhook } from '../../../../lib/tracking.js';
import { env } from '../../../../lib/env.js';
import { processBloomGoogleWorkflow } from '../../../../lib/bloomGoogleSheetsWorker.js';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.experiment_id || (!body?.lead_id && !body?.booking_id)) {
    return NextResponse.json({ error: 'experiment_id and lead_id or booking_id are required' }, { status: 400 });
  }

  const workflowPayload = buildBookingLifecycleWorkflowPayload(body);
  const payload = {
    ...workflowPayload,
    received_at: new Date().toISOString(),
    user_agent: request.headers.get('user-agent') || ''
  };

  console.log('[bloom:booking-complete]', payload);
  const [worker, webhook] = await Promise.all([
    env.bloomWorkflowMode === 'local'
      ? processBloomGoogleWorkflow(workflowPayload).catch((error) => ({ error: error.message }))
      : Promise.resolve({ skipped: true, mode: env.bloomWorkflowMode }),
    postWebhook(env.bookingWebhookUrl || env.eventWebhookUrl, payload).catch((error) => ({ error: error.message }))
  ]);

  return NextResponse.json({ ok: true, bloom_google_workflow: workflowPayload, worker, webhook });
}
