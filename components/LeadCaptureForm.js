'use client';

import { useEffect, useMemo, useState } from 'react';
import { SurfaceCard } from './amve/surfaces';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Textarea } from './ui/textarea';

function Field({ field, value, onChange }) {
  if (field.type === 'select') {
    return (
      <label style={{ display: 'grid', gap: 8 }}>
        <span style={{ fontWeight: 700 }}>{field.label}{field.required ? ' *' : ''}</span>
        <Select name={field.name} value={value || ''} onChange={onChange} required={field.required}>
          <option value="">Select one</option>
          {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label style={{ display: 'grid', gap: 8 }}>
        <span style={{ fontWeight: 700 }}>{field.label}{field.required ? ' *' : ''}</span>
        <Textarea rows={4} name={field.name} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} required={field.required} />
      </label>
    );
  }

  return (
    <label style={{ display: 'grid', gap: 8 }}>
      <span style={{ fontWeight: 700 }}>{field.label}{field.required ? ' *' : ''}</span>
      <Input type={field.type || 'text'} name={field.name} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} required={field.required} />
    </label>
  );
}

export function useExperimentTracking(experiment, variant, attribution) {
  const attributionPayload = useMemo(() => attribution, [attribution]);

  async function track(eventName, extra = {}) {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        experiment_id: experiment.id,
        page_id: experiment.pageId || experiment.id,
        experiment_slug: experiment.slug,
        page_variant: variant,
        channel: experiment.channel,
        ...attributionPayload,
        ...extra
      })
    }).catch(() => null);
  }

  useEffect(() => {
    track('page_view');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiment.id, variant, JSON.stringify(attributionPayload)]);

  return { track, attributionPayload };
}

export default function LeadCaptureForm({
  experiment,
  variant,
  attribution,
  theme = 'dark',
  title,
  description,
  aside,
  submitLabel,
  successMessage,
  mode = 'waitlist'
}) {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const { track, attributionPayload } = useExperimentTracking(experiment, variant, attribution);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const loadingMessage = mode === 'booking' ? 'Saving your details and opening the calendar…' : 'Saving your details…';
    setStatus({ state: 'loading', message: loadingMessage });

    const endpoint = mode === 'booking' ? '/api/booking/start' : '/api/waitlist';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        experiment_slug: experiment.slug,
        page_variant: variant,
        attribution: attributionPayload,
        lead: form
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus({ state: 'error', message: data.error || 'Could not submit the form.' });
      return;
    }

    await track('cta_click', {
      cta_location: 'form',
      cta_copy: submitLabel || experiment.form.submitLabel || 'Get early access',
      lead_email: form.email || ''
    });
    await track('form_submit', {
      form_id: `${experiment.slug}-lead-capture`,
      lead_email: form.email || ''
    });

    if (mode === 'booking' && data.booking_url) {
      await track('booking_flow_started', { booking_url_host: new URL(data.booking_url).host, lead_email: form.email || '' });
      setStatus({ state: 'success', message: successMessage || 'Opening the calendar…' });
      window.location.href = data.booking_url;
      return;
    }

    setForm({});
    setStatus({ state: 'success', message: successMessage || 'You’re on the list. We’ll share early access updates soon.' });
  }

  return (
    <section className={`section ${theme === 'dark' ? 'navy-section' : ''}`} id="booking">
      <div className="container meta-grid">
        <div>
          <div className="eyebrow" style={theme === 'dark' ? { color: '#fdba74' } : {}}>{mode === 'booking' ? 'Book a walkthrough' : 'Get early access'}</div>
          <h2 style={{ fontSize: 42, lineHeight: 1.1, margin: '12px 0 16px' }}>{title || experiment.form.title}</h2>
          <p style={theme === 'dark' ? { color: 'rgba(255,255,255,0.82)', fontSize: 18, lineHeight: 1.7 } : { fontSize: 18, lineHeight: 1.7, color: 'var(--muted)' }}>{description || experiment.form.description}</p>
          {aside ? aside : null}
        </div>

        <form onSubmit={handleSubmit} className="panel amve-form-panel" style={{ padding: 24, color: 'var(--ink)' }}>
          <div style={{ display: 'grid', gap: 16 }}>
            <input type="text" name="company_website" value={form.company_website || ''} onChange={updateField} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true" />
            {experiment.form.fields.map((field) => (
              <Field key={field.name} field={field} value={form[field.name]} onChange={updateField} />
            ))}
            <Button className="btn-primary amve-form-submit" type="submit" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? (mode === 'booking' ? 'Opening calendar…' : 'Saving…') : (submitLabel || experiment.form.submitLabel || 'Get early access')}
            </Button>
            <div className="muted" style={{ fontSize: 14 }}>{experiment.form.helperText || 'We’ll use this to route updates and understand whether this workflow problem is real for your team.'}</div>
            {status.message ? (
              <SurfaceCard className="amve-form-status" style={{ padding: 16, borderColor: status.state === 'error' ? '#fecaca' : 'var(--line)' }}>
                {status.message}
              </SurfaceCard>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
