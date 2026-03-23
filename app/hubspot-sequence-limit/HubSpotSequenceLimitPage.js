'use client';
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle2, LoaderCircle, ArrowRight, Users, Zap, Clock, Shield } from 'lucide-react';

const PRIMARY = '#213547';
const SECONDARY = '#F4F1EA';
const ACCENT = '#D97706';
const WHITE = '#ffffff';
const MUTED = '#6b7280';

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, style = {} }) {
  const ref = useFadeIn();
  return (
    <section
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function CtaButton({ children, onClick }) {
  return (
    <a
      href="#signup"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '16px 36px',
        background: ACCENT,
        color: '#fff',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        boxShadow: '0 4px 16px rgba(217,119,6,0.25)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.92';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}

function QuoteBlock({ quote, source, year }) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${ACCENT}`,
        paddingLeft: 20,
        marginBottom: 24,
        fontStyle: 'italic',
        color: MUTED,
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
      &ldquo;{quote}&rdquo;
      <div style={{ fontWeight: 600, color: PRIMARY, marginTop: 6, fontStyle: 'normal', fontSize: 13 }}>
        — {source}{year ? `, ${year}` : ''}
      </div>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 260,
        padding: '32px 28px',
        background: WHITE,
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: `${ACCENT}15`,
          color: ACCENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        {number}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: PRIMARY, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, margin: 0 }}>{description}</p>
    </div>
  );
}

function BenefitRow({ icon: Icon, title, description }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 28 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: `${ACCENT}12`,
          color: ACCENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <Icon size={20} />
      </div>
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: PRIMARY, marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: `1px solid #e5e7eb`,
        padding: '20px 0',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 600,
          color: PRIMARY,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
          fontFamily: "'DM Serif Display', Georgia, serif",
        }}
      >
        {question}
        <span style={{ color: MUTED, fontSize: 20, flexShrink: 0, marginLeft: 12 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.65, marginTop: 12, marginBottom: 0 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

const VARIANTS = {
  A: {
    headline: 'You built a 1,000-contact list. HubSpot makes you enroll it 20 times.',
    sub: "HubSpot caps sequence enrollment at 50 contacts. Their own team marked bulk enrollment 'Not Currently Planned.' You've been doing this manually since 2020. Stop.",
  },
  B: {
    headline: 'Your outbound team spends 20 minutes a day on something that should be one click.',
    sub: "HubSpot's 50-contact enrollment cap turns a 30-second task into a 15-minute daily routine. Bulk enroll your sequence contacts in one step.",
  },
};

export default function HubSpotSequenceLimitPage() {
  const [email, setEmail] = useState('');
  const [volume, setVolume] = useState('');
  const [status, setStatus] = useState('idle');
  const [variant, setVariant] = useState(null);

  const track = useCallback((action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_category: 'engagement', event_label: 'hubspot-sequence-limit' });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    window.searchParams = sp;

    const vParam = sp.get('v');
    let v;
    if (vParam === 'a' || vParam === 'b') {
      v = vParam.toUpperCase();
    } else {
      const stored = sessionStorage.getItem('hs_seq_variant');
      if (stored) {
        v = stored;
      } else {
        v = Math.random() < 0.5 ? 'A' : 'B';
        sessionStorage.setItem('hs_seq_variant', v);
      }
    }
    setVariant(v);

    if (window.gtag) {
      window.gtag('event', 'page_variant_assigned', {
        event_category: 'experiment',
        event_label: 'hubspot-sequence-limit',
        page_variant: v,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const attribution = {};
      if (typeof window !== 'undefined' && window.searchParams) {
        const sp = window.searchParams;
        if (sp.get('utm_source')) attribution.utm_source = sp.get('utm_source');
        if (sp.get('utm_medium')) attribution.utm_medium = sp.get('utm_medium');
        if (sp.get('utm_campaign')) attribution.utm_campaign = sp.get('utm_campaign');
      }

      const body = {
        experiment_slug: 'hubspot-sequence-limit',
        page_variant: variant,
        attribution,
        lead: { email },
      };
      if (volume) body.lead.volume = volume;

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Submission failed');
      track('waitlist_submit');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (!variant) return null;

  const v = VARIANTS[variant];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&display=swap');
        .hubspot-page { font-family: 'Inter', system-ui, sans-serif; color: ${PRIMARY}; line-height: 1.65; }
        .hubspot-page h1, .hubspot-page h2, .hubspot-page h3, .hubspot-page .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .hubspot-page * { box-sizing: border-box; }
        .hubspot-page a { color: inherit; }
      `}</style>

      <main className="hubspot-page" style={{ background: WHITE }}>

        {/* Hero */}
        <section
          style={{
            padding: '100px 24px 80px',
            textAlign: 'center',
            background: `linear-gradient(180deg, ${SECONDARY} 0%, ${WHITE} 100%)`,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: ACCENT,
              marginBottom: 24,
            }}
          >
            For sales ops, RevOps, and founder-led outbound teams running HubSpot
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 46px)',
              lineHeight: 1.15,
              fontWeight: 400,
              color: PRIMARY,
              marginBottom: 24,
              maxWidth: 680,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {v.headline}
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2.5vw, 19px)',
              color: MUTED,
              maxWidth: 560,
              margin: '0 auto 20px',
              lineHeight: 1.7,
            }}
          >
            {v.sub}
          </p>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 32 }}>
            No CRM migration. No new outbound stack.
          </p>
          <CtaButton onClick={() => track('hero_cta_click')}>
            Join the waitlist <ArrowRight size={18} />
          </CtaButton>
        </section>

        {/* Problem */}
        <FadeSection
          style={{
            padding: '60px 24px 80px',
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 12, textAlign: 'center' }}>
            The loop you're stuck in
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: MUTED,
              maxWidth: 520,
              margin: '0 auto 48px',
              fontSize: 16,
            }}
          >
            HubSpot users have been asking for this since 2020. Here's what that sounds like.
          </p>

          <QuoteBlock
            quote="In reality, enrolment is manual and capped at 50 contacts at a time, making large scale outbound impractical"
            source="Trustpilot"
          />
          <QuoteBlock
            quote="I would like the ability to bulk enroll all 1,000 contacts in a sequence at once"
            source="HubSpot Community"
            year="2020"
          />
          <QuoteBlock
            quote="i have to select all to 50 contacts, enroll, then select all to my next page of 50 contacts"
            source="HubSpot Community"
            year="2022"
          />
          <QuoteBlock
            quote="it feels like you're making it harder for no reason."
            source="HubSpot Community"
            year="2021"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginTop: 48,
            }}
          >
            {[
              { num: '20', label: 'enrollment rounds for 1,000 contacts' },
              { num: '10', label: 'rounds per launch at 500 contacts/week' },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  background: `${ACCENT}08`,
                  borderRadius: 10,
                }}
              >
                <div className="serif" style={{ fontSize: 42, color: ACCENT, fontWeight: 400 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* HubSpot's Response */}
        <FadeSection
          style={{
            padding: '60px 24px',
            background: PRIMARY,
          }}
        >
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 30px)',
                color: WHITE,
                marginBottom: 20,
              }}
            >
              HubSpot's response
            </h2>
            <div
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '28px 24px',
                borderLeft: `3px solid ${ACCENT}`,
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.7 }}>
                The HubSpot Community thread requesting bulk sequence enrollment has been active since{' '}
                <strong style={{ color: '#fff' }}>2020</strong>. In December 2025, the HubSpot product team
                updated the thread with a status:{' '}
                <strong style={{ color: ACCENT }}>&ldquo;Not Currently Planned.&rdquo;</strong>
              </p>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 20, marginBottom: 0 }}>
              Five years. Not currently planned.
            </p>
          </div>
        </FadeSection>

        {/* How It Works */}
        <FadeSection
          style={{
            padding: '80px 24px',
            background: SECONDARY,
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 12, textAlign: 'center' }}>
              How it works
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: MUTED,
                maxWidth: 480,
                margin: '0 auto 48px',
                fontSize: 16,
              }}
            >
              Three steps. No migration. No scripts.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              <StepCard
                number="1"
                title="Connect your HubSpot account"
                description="One-time auth. No migration. Your data stays where it is."
              />
              <StepCard
                number="2"
                title="Select your list + sequence"
                description="The lists and sequences you've already built. Nothing new to create."
              />
              <StepCard
                number="3"
                title="Enroll all contacts in one action"
                description="No pages. No scrolling. No 50-contact ceiling. Click once, done."
              />
            </div>
          </div>
        </FadeSection>

        {/* Benefits */}
        <FadeSection
          style={{
            padding: '80px 24px',
            maxWidth: 640,
            margin: '0 auto',
          }}
        >
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 48, textAlign: 'center' }}>
            What you get back
          </h2>

          <BenefitRow
            icon={Users}
            title="Enroll your whole list in one action"
            description="50 contacts or 5,000. Same step. Same click. No more pagination."
          />
          <BenefitRow
            icon={Shield}
            title="No scripts, no maintenance"
            description="No midnight debugging when HubSpot ships a UI update. This handles the API so you don't have to."
          />
          <BenefitRow
            icon={Clock}
            title="15 minutes back every day"
            description="That's 5 hours a week your ops team stops clicking through enrollment pages."
          />
        </FadeSection>

        {/* FAQ */}
        <FadeSection
          style={{
            padding: '80px 24px',
            background: SECONDARY,
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', marginBottom: 40, textAlign: 'center' }}>
              FAQ
            </h2>

            <FaqItem
              question="Do I have to switch from HubSpot?"
              answer="No. This fixes one workflow inside HubSpot. You keep everything — your CRM, your sequences, your contacts."
            />
            <FaqItem
              question="Can't I just script this?"
              answer="You can. And when HubSpot updates their UI, your script breaks at midnight. This keeps working."
            />
            <FaqItem
              question="What if HubSpot ships bulk enrollment?"
              answer="They've had the thread since 2020 and marked it 'Not Currently Planned' in December 2025. Five years of not shipping. We'll celebrate if they do."
            />
            <FaqItem
              question="When can I try it?"
              answer="We're onboarding early users now. Join the waitlist."
            />
          </div>
        </FadeSection>

        {/* Final CTA */}
        <FadeSection
          id="signup"
          style={{
            padding: '80px 24px 100px',
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 38px)',
              marginBottom: 16,
            }}
          >
            Stop enrolling 50 at a time.
          </h2>
          <p style={{ color: MUTED, fontSize: 16, marginBottom: 36 }}>
            Get early access when we launch.
          </p>

          {status === 'success' ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#16a34a' }}>
              <CheckCircle2 size={22} />
              <span style={{ fontWeight: 600, fontSize: 16 }}>You're on the list. We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10, width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 220,
                    padding: '14px 18px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 15,
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                />
                <select
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  style={{
                    padding: '14px 14px',
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    fontSize: 14,
                    color: MUTED,
                    background: WHITE,
                    outline: 'none',
                    fontFamily: 'inherit',
                    minWidth: 140,
                  }}
                >
                  <option value="">List size (optional)</option>
                  <option value="51-250">51–250</option>
                  <option value="251-1K">251–1K</option>
                  <option value="1K-5K">1K–5K</option>
                  <option value="5K+">5K+</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 36px',
                  background: ACCENT,
                  color: '#fff',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  border: 'none',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  fontFamily: 'inherit',
                  boxShadow: '0 4px 16px rgba(217,119,6,0.25)',
                }}
              >
                {status === 'loading' ? (
                  <LoaderCircle size={18} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <>
                    Join the waitlist <ArrowRight size={18} />
                  </>
                )}
              </button>
              {status === 'error' && (
                <p style={{ color: '#dc2626', fontSize: 14, margin: 0 }}>Something went wrong. Try again.</p>
              )}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>
          )}
        </FadeSection>
      </main>
    </>
  );
}
