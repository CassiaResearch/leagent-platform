import { NextResponse } from 'next/server';
import { processBloomGoogleWorkflow } from '../../../../lib/bloomGoogleSheetsWorker.js';
import { env } from '../../../../lib/env.js';

function isAuthorized(request) {
  if (!env.bloomWorkflowSecret) return true;
  const authHeader = request.headers.get('authorization') || '';
  return authHeader === `Bearer ${env.bloomWorkflowSecret}`;
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body?.workflow || !body?.sheet?.spreadsheet_id || !body?.sheet?.sheet_tab) {
    return NextResponse.json({ error: 'workflow payload with sheet target is required' }, { status: 400 });
  }

  try {
    const worker = await processBloomGoogleWorkflow(body);
    return NextResponse.json({ ok: true, worker });
  } catch (error) {
    console.error('[bloom:google-workflow:error]', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
