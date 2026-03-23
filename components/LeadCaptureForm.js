'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { SurfaceCard } from './amve/surfaces';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Card, CardContent } from './ui/card';

function Field({ field, value, onChange }) {
  const label = (
    <span style={{ fontWeight: 700, fontSize: 14 }}>
      {field.label}
      {field.required ? ' *' : ''}
    </span>
  );

  if (field.type === 'select') {
    return (
      <label style={{ display: 'grid', gap: 8 }}>
        {label}
        <Select value={value || ''} onValueChange={(nextValue) => onChange({ target: { name: field.name, value: nextValue } })}>
          <SelectTrigger className="amve-select-trigger w-full">
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            {(field.options || []).map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name={field.name} value={value || ''} required={field.required} />
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label style={{ display: 'grid', gap: 8 }}>
        {label}
        <Textarea rows={5} name={field.name} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} required={field.required} className="amve-form-control amve-form-textarea" />
      </label>
    );
  }

  return (
    <label style={{ display: 'grid', gap: 8 }}>
      {label}
      <Input type={field.type || 'text'} name={field.name} placeholder={field.placeholder || ''} value={value || ''} onChange={onChange} required={field.required} className="amve-form-control" />
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

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const marks = [25, 50, 75, 100];
    const fired = new Set();

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const percent = Math.min(100, Math.round((scrollTop / maxScroll) * 100));

      marks.forEach((mark) => {
        if (percent >= mark && !fired.has(mark)) {
          fired.add(mark);
          track('scroll_depth', { percent_scrolled: mark });
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

        <Card className="panel amve-form-panel border-white/10 bg-white/94 text-[var(--ink)] shadow-[0_28px_60px_rgba(15,23,42,0.16)]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input type="text" name="company_website" value={form.company_website || ''} onChange={updateField} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true" />
              {experiment.form.fields.map((field) => (
                <Field key={field.name} field={field} value={form[field.name]} onChange={updateField} />
              ))}
              <Button className="amve-form-submit h-12 rounded-full bg-[linear-gradient(180deg,#ef993f_0%,#e88b2e_100%)] px-5 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(232,139,46,0.3)] hover:opacity-95" type="submit" disabled={status.state === 'loading'}>
                {status.state === 'loading' ? <><LoaderCircle className="size-4 animate-spin" data-icon="inline-start" />{mode === 'booking' ? 'Opening calendar…' : 'Saving…'}</> : (submitLabel || experiment.form.submitLabel || 'Get early access')}
              </Button>
              <div className="muted" style={{ fontSize: 14 }}>{experiment.form.helperText || 'We’ll use this to route updates and understand whether this workflow problem is real for your team.'}</div>
              {status.message ? (
                <SurfaceCard className="amve-form-status" style={{ padding: 16, borderColor: status.state === 'error' ? '#fecaca' : 'var(--line)' }}>
                  {status.state === 'success' ? <CheckCircle2 className="mr-2 inline size-4" /> : null}
                  {status.message}
                </SurfaceCard>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
