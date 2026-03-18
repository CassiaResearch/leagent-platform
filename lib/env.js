export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  defaultBookingUrl: process.env.NEXT_PUBLIC_DEFAULT_BOOKING_URL || 'https://calendar.app.google/pkZ5HGKJx7UeEUaP9',
  bloomGoogleSheetId: process.env.BLOOM_GOOGLE_SHEET_ID || '1rrLWavV9HDM0b9kmaJHO2y97TJ9WUe2jToQGree4QSM',
  bloomGoogleSheetTab: process.env.BLOOM_GOOGLE_SHEET_TAB || 'Sheet1',
  bloomGoogleCalendarId: process.env.BLOOM_GOOGLE_CALENDAR_ID || 'primary',
  bloomWorkflowMode: process.env.BLOOM_GOOGLE_WORKFLOW_MODE || 'local',
  bloomWorkflowSecret: process.env.BLOOM_GOOGLE_WORKFLOW_SECRET || '',
  eventWebhookUrl: process.env.BLOOM_EVENT_WEBHOOK_URL || '',
  bookingWebhookUrl: process.env.BLOOM_BOOKING_WEBHOOK_URL || '',
  hubspotFormPortalId: process.env.HUBSPOT_PORTAL_ID || '',
  hubspotFormId: process.env.HUBSPOT_FORM_ID || ''
};
