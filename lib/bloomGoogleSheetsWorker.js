import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { BLOOM_CANONICAL_SHEET_COLUMNS } from './bloomGoogleWorkflow.js';
import { env } from './env.js';

const execFileAsync = promisify(execFile);
const GWS_BIN = process.env.GWS_BIN || 'gws';

function quoteSheetName(name) {
  return /[^A-Za-z0-9_]/.test(name) ? `'${String(name).replace(/'/g, "''")}'` : name;
}

function a1Column(index) {
  let n = index + 1;
  let out = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

function sheetRange(tab, startColumn, endColumn, rowNumber) {
  const sheetName = quoteSheetName(tab);
  return `${sheetName}!${startColumn}${rowNumber}:${endColumn}${rowNumber}`;
}

function valueToCell(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  return String(value);
}

export async function gws(resourcePath, params, jsonBody) {
  const args = resourcePath.split(' ');
  if (params) args.push('--params', JSON.stringify(params));
  if (jsonBody) args.push('--json', JSON.stringify(jsonBody));
  const { stdout, stderr } = await execFileAsync(GWS_BIN, args, {
    env: process.env,
    maxBuffer: 10 * 1024 * 1024
  });
  const text = stdout?.trim() || '{}';
  try {
    return { data: JSON.parse(text), stderr: stderr?.trim() || '' };
  } catch {
    return { data: { raw: text }, stderr: stderr?.trim() || '' };
  }
}

export async function readSheetRows(spreadsheetId, sheetTab) {
  const range = `${quoteSheetName(sheetTab)}!A1:${a1Column(BLOOM_CANONICAL_SHEET_COLUMNS.length - 1)}`;
  const { data } = await gws('sheets spreadsheets values get', {
    spreadsheetId,
    range,
    majorDimension: 'ROWS'
  });
  return data.values || [];
}

export function rowToObject(headers, row) {
  return headers.reduce((acc, header, index) => {
    acc[header] = row[index] ?? '';
    return acc;
  }, {});
}

export function findMatchingRowIndex(rows, matchKeys) {
  const dataRows = rows.slice(1);

  if (matchKeys.lead_id) {
    const hit = dataRows.findIndex((row) => row[0] === String(matchKeys.lead_id));
    if (hit >= 0) return hit + 2;
  }

  if (matchKeys.booking_id) {
    const bookingIndex = BLOOM_CANONICAL_SHEET_COLUMNS.indexOf('booking_id');
    const hit = dataRows.findIndex((row) => row[bookingIndex] === String(matchKeys.booking_id));
    if (hit >= 0) return hit + 2;
  }

  if (matchKeys.email && matchKeys.experiment_slug) {
    const emailIndex = BLOOM_CANONICAL_SHEET_COLUMNS.indexOf('email');
    const experimentIndex = BLOOM_CANONICAL_SHEET_COLUMNS.indexOf('experiment_slug');
    const hit = dataRows.findIndex((row) => row[emailIndex] === String(matchKeys.email) && row[experimentIndex] === String(matchKeys.experiment_slug));
    if (hit >= 0) return hit + 2;
  }

  return null;
}

function buildRowValues(existingRow = {}, patch = {}) {
  const merged = { ...existingRow, ...patch };
  if (!merged.created_at) {
    merged.created_at = patch.created_at || new Date().toISOString();
  }
  return BLOOM_CANONICAL_SHEET_COLUMNS.map((column) => valueToCell(merged[column]));
}

export async function processBloomGoogleWorkflow(payload) {
  if (!payload || payload.workflow !== 'bloom_google_v1') {
    throw new Error('Unsupported Bloom workflow payload');
  }

  const spreadsheetId = payload?.sheet?.spreadsheet_id || env.bloomGoogleSheetId;
  const sheetTab = payload?.sheet?.sheet_tab || env.bloomGoogleSheetTab;
  const rows = await readSheetRows(spreadsheetId, sheetTab);

  const headers = rows[0] || BLOOM_CANONICAL_SHEET_COLUMNS;
  const rowNumber = findMatchingRowIndex(rows, payload.match_keys || {});
  const existingValues = rowNumber ? (rows[rowNumber - 1] || []) : [];
  const existingRow = rowToObject(headers, existingValues);
  const rowPatch = { ...(payload.row_patch || {}) };

  if (payload.event_name === 'booking_rescheduled' && rowPatch.reschedule_count === undefined) {
    const current = Number(existingRow.reschedule_count || 0);
    rowPatch.reschedule_count = String(current + 1);
  }

  const values = [buildRowValues(existingRow, rowPatch)];
  const endColumn = a1Column(BLOOM_CANONICAL_SHEET_COLUMNS.length - 1);

  if (rowNumber) {
    const range = sheetRange(sheetTab, 'A', endColumn, rowNumber);
    const { data, stderr } = await gws('sheets spreadsheets values update', {
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      includeValuesInResponse: true
    }, {
      range,
      majorDimension: 'ROWS',
      values
    });

    return {
      ok: true,
      mode: 'update',
      spreadsheet_id: spreadsheetId,
      sheet_tab: sheetTab,
      matched_row: rowNumber,
      match_keys: payload.match_keys || {},
      event_name: payload.event_name,
      result: data,
      stderr
    };
  }

  const range = `${quoteSheetName(sheetTab)}!A:${endColumn}`;
  const { data, stderr } = await gws('sheets spreadsheets values append', {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    includeValuesInResponse: true
  }, {
    range,
    majorDimension: 'ROWS',
    values
  });

  return {
    ok: true,
    mode: 'append',
    spreadsheet_id: spreadsheetId,
    sheet_tab: sheetTab,
    matched_row: null,
    match_keys: payload.match_keys || {},
    event_name: payload.event_name,
    result: data,
    stderr
  };
}
