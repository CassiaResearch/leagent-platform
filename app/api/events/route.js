import { NextResponse } from 'next/server';
import { env } from '../../../lib/env.js';
import { postWebhook } from '../../../lib/tracking.js';

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body?.event_name || !body?.experiment_id) {
    return NextResponse.json({ error: 'event_name and experiment_id are required' }, { status: 400 });
  }

  const payload = {
    ...body,
    received_at: new Date().toISOString(),
    user_agent: request.headers.get('user-agent') || ''
  };

  console.log('[bloom:event]', payload);
  const webhook = await postWebhook(env.eventWebhookUrl, payload).catch((error) => ({ error: error.message }));

  return NextResponse.json({ ok: true, webhook });
}
