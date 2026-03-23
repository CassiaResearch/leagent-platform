'use client';

import { ArrowRight } from 'lucide-react';
import LeadCaptureForm, { useExperimentTracking } from './LeadCaptureForm';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

function HeroActions({ track, primaryLabel, secondaryLabel = 'See how it works' }) {
  return (
    <div className="hero-actions">
      <a
        href="#booking"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ef993f_0%,#e88b2e_100%)] px-6 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(232,139,46,0.3)] transition hover:opacity-95"
        onClick={() => track('cta_click', { cta_location: 'hero', cta_copy: primaryLabel })}
      >
        {primaryLabel}
        <ArrowRight className="size-4" />
      </a>
      <a href="#how-it-works" className="inline-flex h-12 items-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white/78 px-6 text-sm font-bold text-[#0f172a] transition hover:bg-white">
        {secondaryLabel}
      </a>
    </div>
  );
}

function ProofPills({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {items.map((item) => (
        <div key={item} className="badge" style={{ background: 'rgba(255,255,255,0.88)', borderColor: 'rgba(15,23,42,0.08)' }}>
          {item}
        </div>
      ))}
    </div>
  );
}

function Steps({ title, steps }) {
  return (
    <section id="how-it-works" className="section-tight">
      <div className="container" style={{ display: 'grid', gap: 22 }}>
        <div>
          <div className="eyebrow">How it works</div>
          <h2 className="section-title left">{title}</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={step.title} className="card step-card" style={{ background: 'rgba(255,255,255,0.94)' }}>
              <div className="step-index">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p className="muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SharedFaqs({ experiment }) {
  return (
    <section className="section-tight">
      <div className="container" style={{ display: 'grid', gap: 18 }}>
        <div>
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title left">Short answers to the obvious objections.</h2>
        </div>
        <Card className="border-[rgba(15,23,42,0.08)] bg-white/90 shadow-[0_20px_42px_rgba(20,32,51,0.08)]">
          <CardContent className="p-2 sm:p-4">
            <Accordion type="single" collapsible defaultValue={experiment.faqs[0]?.question} className="faq-accordion">
              {experiment.faqs.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="border-b border-[rgba(15,23,42,0.08)] last:border-b-0">
                  <AccordionTrigger className="px-3 py-4 text-base font-extrabold sm:text-lg">{item.question}</AccordionTrigger>
                  <AccordionContent className="px-3 pb-4 text-[15px] leading-7 text-[var(--muted)]">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function GenericExperimentPage({ experiment, variant, attribution, theme }) {
  const variantData = experiment.variants[variant] || Object.values(experiment.variants)[0];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="page-shell" style={{ background: theme.background, color: theme.ink }}>
      <section className="section" style={{ paddingTop: 88 }}>
        <div className="container" style={{ display: 'grid', gap: 28 }}>
          <div className="hero-shell two-column" style={{ alignItems: 'center' }}>
            <div>
              <Badge variant="outline" className="w-fit rounded-full border-white/40 bg-white/80 px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: theme.accentText }}>
                {experiment.hero.kicker}
              </Badge>
              <h1 className="display-title" style={{ maxWidth: 760, marginTop: 18 }}>{variantData.headline || experiment.hero.headline}</h1>
              <p className="hero-copy" style={{ color: theme.muted, maxWidth: 760 }}>{variantData.subheadline || experiment.hero.subheadline}</p>
              <p className="hero-reassurance" style={{ color: theme.ink }}>{experiment.hero.reassurance}</p>
              <HeroActions track={track} primaryLabel={experiment.form.submitLabel || 'Get early access'} />
            </div>

            <div className="card" style={{ padding: 24, borderColor: 'rgba(15,23,42,0.08)', background: theme.panel, boxShadow: '0 24px 64px rgba(15,23,42,0.08)' }}>
              <div className="eyebrow" style={{ color: theme.accentText }}>Before → after</div>
              <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
                {variantData.steps.map((step, index) => (
                  <div key={step.title} style={{ padding: 16, borderRadius: 18, background: index === 1 ? theme.highlight : 'rgba(255,255,255,0.92)', border: '1px solid rgba(15,23,42,0.08)' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: theme.accentText }}>0{index + 1}</div>
                    <strong style={{ display: 'block', marginTop: 6, marginBottom: 6 }}>{step.title}</strong>
                    <div style={{ color: '#475569', lineHeight: 1.65 }}>{step.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ProofPills items={experiment.socialProofBar} />
        </div>
      </section>

      <section className="section-tight">
        <div className="container two-column" style={{ alignItems: 'stretch' }}>
          <div className="card" style={{ padding: 26, background: 'rgba(255,255,255,0.96)' }}>
            <div className="eyebrow">Recognition</div>
            <h2 className="section-title left" style={{ marginBottom: 16 }}>The page is selling one pain clearly enough that the right buyer should recognize themselves fast.</h2>
            <blockquote className="quote-block" style={{ marginTop: 0 }}>{experiment.quote.body}</blockquote>
            <p className="muted" style={{ marginBottom: 0 }}>{experiment.quote.source}</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {experiment.proof.map((item, index) => (
              <div key={item} className="card" style={{ padding: 20, background: index === 2 ? theme.darkCard : 'rgba(255,255,255,0.92)', color: index === 2 ? 'white' : theme.ink }}>
                <div className="eyebrow" style={{ color: index === 2 ? '#FCD34D' : theme.accentText }}>Proof 0{index + 1}</div>
                <p style={{ margin: '12px 0 0', lineHeight: 1.7, color: index === 2 ? 'rgba(255,255,255,0.82)' : '#475569' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Steps title="A narrow workflow fix — not a broad platform pitch." steps={variantData.steps} />

      <section className="section-tight">
        <div className="container two-column split-balance">
          <div className="card content-card soft-card" style={{ background: 'rgba(255,255,255,0.92)' }}>
            <div className="eyebrow">What gets better</div>
            <ul className="benefit-list clean-list">
              {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
          <div className="card content-card" style={{ background: theme.highlight }}>
            <div className="eyebrow">Why this stays believable</div>
            <p className="muted" style={{ marginBottom: 18 }}>
              The rebuild keeps the promise narrow on purpose: strong enough to sell, disciplined enough not to drift into a fake broader product story.
            </p>
            <ul className="benefit-list clean-list">
              <li>{experiment.hero.reassurance}</li>
              <li>{experiment.socialProofBar[0]}</li>
              <li>{experiment.socialProofBar[1]}</li>
            </ul>
          </div>
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        title={experiment.form.title}
        description={experiment.form.description}
        submitLabel={experiment.form.submitLabel}
        successMessage={experiment.slug === 'ai-payment-follow-up'
          ? 'You’re on the waitlist. We’ll share early access as this workflow opens up.'
          : 'You’re on the list. We’ll share early access updates as this workflow opens up.'}
        aside={<div className="aside-note"><strong>Good fit:</strong><ul><li>{variantData.benefits[0]}</li><li>{variantData.benefits[1]}</li><li>{variantData.benefits[2]}</li></ul></div>}
      />
    </main>
  );
}

const themes = {
  'small-service-request-capture': {
    background: 'linear-gradient(180deg,#f5f1e8 0%,#fff9f1 55%,#ffffff 100%)',
    panel: 'linear-gradient(180deg,#ffffff 0%,#fff5e7 100%)',
    highlight: 'linear-gradient(180deg,#fff8ef 0%,#ffffff 100%)',
    darkCard: '#1F3A5F',
    ink: '#0f172a',
    muted: '#475569',
    accentText: '#b45309'
  },
  'hubspot-sequence-limit': {
    background: 'linear-gradient(180deg,#f4f1ea 0%,#f8fbff 58%,#ffffff 100%)',
    panel: 'linear-gradient(180deg,#ffffff 0%,#f3f8ff 100%)',
    highlight: 'linear-gradient(180deg,#f7fbff 0%,#ffffff 100%)',
    darkCard: '#213547',
    ink: '#0f172a',
    muted: '#475569',
    accentText: '#b45309'
  },
  'scope-creep-guard': {
    background: 'linear-gradient(180deg,#f8f5ef 0%,#fff6f6 58%,#ffffff 100%)',
    panel: 'linear-gradient(180deg,#ffffff 0%,#fff1f2 100%)',
    highlight: 'linear-gradient(180deg,#fff5f5 0%,#ffffff 100%)',
    darkCard: '#1E293B',
    ink: '#0f172a',
    muted: '#475569',
    accentText: '#b91c1c'
  },
  'ai-payment-follow-up': {
    background: 'linear-gradient(180deg,#f8fafc 0%,#fff8ef 58%,#ffffff 100%)',
    panel: 'linear-gradient(180deg,#ffffff 0%,#fff7ed 100%)',
    highlight: 'linear-gradient(180deg,#fff7ed 0%,#ffffff 100%)',
    darkCard: '#0F172A',
    ink: '#0f172a',
    muted: '#475569',
    accentText: '#b45309'
  }
};

export default function ExperimentPage({ experiment, variant, attribution }) {
  const theme = themes[experiment.slug] || themes['ai-payment-follow-up'];
  return <GenericExperimentPage experiment={experiment} variant={variant} attribution={attribution} theme={theme} />;
}
