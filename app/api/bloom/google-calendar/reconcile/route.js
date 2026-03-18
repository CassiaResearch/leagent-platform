import { NextResponse } from 'next/server';
import { reconcileBloomCalendarToSheet } from '../../../../../lib/bloomGoogleCalendarReconciler.js';
import { env } from '../../../../../lib/env.js';

function isAuthorized(request) {
  if (!env.bloomWorkflowSecret) return true;
  const authHeader = request.headers.get('authorization') || '';
  return authHeader === `Bearer ${env.bloomWorkflowSecret}`;
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const result = await reconcileBloomCalendarToSheet(body || {});
    return NextResponse.json(result);
  } catch (error) {
    console.error('[bloom:google-calendar-reconcile:error]', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
