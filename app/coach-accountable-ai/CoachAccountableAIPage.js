'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';

const NAVY = '#1a1a2e';
const CREAM = '#e8d5b7';
const SIENNA = '#c45c3c';
const CREAM_LIGHT = '#f5efe3';
const WHITE = '#faf9f6';

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = '', style = {} }) {
  const ref = useFadeIn();
  return (
    <section
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}
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
        padding: '14px 32px',
        background: SIENNA,
        color: '#fff',
        borderRadius: 999,
        fontWeight: 800,
        fontSize: 15,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        boxShadow: '0 8px 24px rgba(196,92,60,0.3)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children}
    </a>
  );
}

const APOS = '\u0027'; // literal apostrophe for use in JSX strings via {}

export default function CoachAccountableAIPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [ctaClicks, setCtaClicks] = useState(0);

  const track = useCallback((action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_category: 'engagement', event_label: 'coach-accountable-ai' });
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

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiment_slug: 'coach-accountable-ai',
          page_variant: 'A',
          attribution,
          lead: { email },
        }),
      });

      if (!res.ok) throw new Error('Submission failed');
      track('waitlist_submit');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      window.searchParams = sp;
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .coach-page { font-family: 'Inter', system-ui, sans-serif; color: #2d2d3a; line-height: 1.65; }
        .coach-page h1, .coach-page h2, .coach-page h3, .coach-page .serif { font-family: 'Playfair Display', Georgia, serif; }
        .coach-page * { box-sizing: border-box; }
        .coach-page a { color: inherit; }
      `}</style>

      <main className="coach-page" style={{ background: WHITE }}>

        {/* ===== HERO ===== */}
        <section style={{ background: NAVY, color: '#fff', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(196,92,60,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(232,213,183,0.06)' }} />

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM, marginBottom: 24 }}>
              For coaches running 20+ clients/month on CoachAccountable
            </p>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 24, maxWidth: 640 }}>
              You coached 8 clients today. Why are you still at your laptop at 10pm?
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 12, maxWidth: 580 }}>
              Session recaps, homework reminders, and next-session briefs — handled automatically inside CoachAccountable. No new CRM. No migration.
            </p>

            <p style={{ fontSize: 14, color: CREAM, marginBottom: 32, fontWeight: 500 }}>
              {'\u2726'} Works inside your existing CoachAccountable account — no migration needed
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <CtaButton onClick={() => { track('cta_click'); document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get early access
              </CtaButton>
              <a href="#problem" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}>
                Why this exists &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ===== PROBLEM ===== */}
        <FadeSection id="problem" style={{ padding: '80px 24px', background: WHITE }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIENNA, marginBottom: 16 }}>
              The moment you know
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 24 }}>
              Coaching done, energy spent — and there you are at 10pm, typing up recaps, sending homework reminders, chasing an invoice.
            </h2>
            <p style={{ color: '#5f5f70', marginBottom: 32, maxWidth: 600 }}>
              Every. Single. Week. 30-60 minutes of paperwork per session, 20+ clients a month. That{APOS}s not a scheduling problem. That{APOS}s 36% of your work week spent on admin, not coaching.
            </p>

            <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
              <blockquote style={{ borderLeft: `3px solid ${SIENNA}`, paddingLeft: 20, margin: 0 }}>
                <p className="serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#3d3d4a', marginBottom: 6, lineHeight: 1.6 }}>
                  {'\u201cShe had 8 clients that week. Coaching done, energy spent \u2014 and there she was at 10pm, typing up recaps, sending homework reminders, chasing an invoice.\u201d'}
                </p>
                <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} r/zerotosaas, CoachOS builder describing a real coach</cite>
              </blockquote>

              <blockquote style={{ borderLeft: `3px solid ${CREAM}`, paddingLeft: 20, margin: 0 }}>
                <p className="serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#3d3d4a', marginBottom: 6, lineHeight: 1.6 }}>
                  {'\u201cI\u2019m trying to scale my practice, but the session summaries and prep are eating my life.\u201d'}
                </p>
                <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} r/lifecoaching</cite>
              </blockquote>

              <blockquote style={{ borderLeft: `3px solid ${SIENNA}`, paddingLeft: 20, margin: 0 }}>
                <p className="serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#3d3d4a', marginBottom: 6, lineHeight: 1.6 }}>
                  {'\u201c30-60 minutes of paperwork per session adds up. For 20 clients a week, that\u2019s 20+ hours a month just on follow-up.\u201d'}
                </p>
                <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} r/zerotosaas, CoachOS builder</cite>
              </blockquote>
            </div>

            {/* Stat callout */}
            <div style={{ background: NAVY, borderRadius: 16, padding: '28px 32px', color: '#fff' }}>
              <p className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                20+ hours/month
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', margin: '8px 0 0', fontSize: 15 }}>
                That{APOS}s how much admin you{APOS}re doing — per session recap, homework reminder, and follow-up — that could happen automatically.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== HOW IT WORKS ===== */}
        <FadeSection style={{ padding: '80px 24px', background: CREAM_LIGHT }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIENNA, marginBottom: 16 }}>
              How it works
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 40 }}>
              Three steps. No new interface.
            </h2>

            <div style={{ display: 'grid', gap: 24 }}>
              {[
                {
                  num: '01',
                  title: 'Connect your CoachAccountable account',
                  body: 'One-time setup. Two minutes. Authorize access, and the AI starts reading your sessions, clients, and workflow.',
                },
                {
                  num: '02',
                  title: 'Coach your sessions as normal',
                  body: 'The AI listens, reads your notes, and learns your coaching framework, your voice, and how you write recaps.',
                },
                {
                  num: '03',
                  title: 'Recaps, homework, and briefs appear automatically',
                  body: 'After every session: a recap in your voice. Homework reminders scheduled. Next-session brief prepped and waiting. No new screen, no new login.',
                },
              ].map((step) => (
                <div key={step.num} style={{ background: '#fff', borderRadius: 16, padding: '28px 32px', border: '1px solid rgba(26,26,46,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: SIENNA, letterSpacing: '0.1em' }}>{step.num}</span>
                    <h3 className="serif" style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{step.title}</h3>
                  </div>
                  <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ===== BENEFITS ===== */}
        <FadeSection style={{ padding: '80px 24px', background: WHITE }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIENNA, marginBottom: 16 }}>
              What changes
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 40 }}>
              Your evenings back. Starting now.
            </h2>

            <div style={{ display: 'grid', gap: 28 }}>
              <div>
                <h3 className="serif" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>Recaps written, not typed</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  After every session, a detailed recap appears in CoachAccountable — in your voice, using your framework. You review. You approve. You{APOS}re done.
                </p>
              </div>
              <div>
                <h3 className="serif" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>Homework sent without a nudge from you</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  Your client{APOS}s action items, reminders, and check-ins get scheduled and delivered automatically based on what was discussed.
                </p>
              </div>
              <div>
                <h3 className="serif" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10 }}>Next session, prepped in 60 seconds</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  Open your laptop before a call and see: last session notes, outstanding homework, stated goals, and what to focus on. No scrambling.
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ===== CREDIBILITY ===== */}
        <FadeSection style={{ padding: '80px 24px', background: NAVY, color: '#fff' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: CREAM, marginBottom: 16 }}>
              Why now
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 32 }}>
              The category is wide open.
            </h2>

            <div style={{ display: 'grid', gap: 20, maxWidth: 560 }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#fff' }}>123K coaches worldwide.</strong> 15% growth since 2023 (ICF). The demand for coaching is growing — and so is the admin burden.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#fff' }}>CoachAccountable has a full REST API.</strong> 100 requests/minute. Webhook support. The building blocks exist — someone just needs to wire them together for coaches.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#fff' }}>12+ coaching CRMs. Only 2 ship any AI.</strong> Both are pre-traction solo projects with zero reviews and no users. This{APOS}s not a crowded market — it{APOS}s an empty one.
              </p>
            </div>

            <blockquote style={{ borderLeft: `3px solid ${CREAM}`, paddingLeft: 20, marginTop: 36, marginBottom: 0 }}>
              <p className="serif" style={{ fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginBottom: 6, lineHeight: 1.6 }}>
                {'\u201cBetween client management, invoicing, scheduling, and marketing, it can feel like you\u2019re running a full-time admin department.\u201d'}
              </p>
              <cite style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontStyle: 'normal' }}>{'\u2014'} greatingreatout.com</cite>
            </blockquote>
          </div>
        </FadeSection>

        {/* ===== FAQ ===== */}
        <FadeSection style={{ padding: '80px 24px', background: CREAM_LIGHT }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIENNA, marginBottom: 16 }}>
              Questions
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 36 }}>
              Straight answers.
            </h2>

            <div style={{ display: 'grid', gap: 0 }}>
              <div style={{ borderBottom: '1px solid rgba(26,26,46,0.08)', padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>Do I have to switch CRMs?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>No. That{APOS}s exactly who this is for. You keep CoachAccountable — this adds AI on top. No migration. Your clients, your data, your workflow stay exactly where they are.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(26,26,46,0.08)', padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>Is this another generic AI note-taker?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>No. This reads directly from CoachAccountable — your coaching framework, your client goals, your homework assignments. It{APOS}s not a generic recorder. It knows your practice.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(26,26,46,0.08)', padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>How much will it cost?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>Early access is free. We{APOS}re building this with coaches, not selling to coaches (yet). Get in early, shape the product, and your first months are on us.</p>
              </div>
              <div style={{ padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>When can I try it?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>We{APOS}re onboarding early users now. Join the waitlist and we{APOS}ll reach out with access as it opens. CoachAccountable users get priority.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ===== FINAL CTA / SIGNUP ===== */}
        <section id="signup" style={{ padding: '80px 24px 100px', background: NAVY, color: '#fff' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 16 }}>
              Stop doing admin at 10pm.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: 36, lineHeight: 1.7 }}>
              Your clients need you rested, not burned out. Get early access to the AI back-office layer built specifically for CoachAccountable.
            </p>

            {status === 'success' ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 32px', background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
                <CheckCircle2 size={20} style={{ color: '#6ee7b7' }} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>{`You${APOS}re in. We${APOS}ll reach out when early access opens.`}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <input
                  type="email"
                  required
                  placeholder="you@yourpractice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: '1 1 260px',
                    maxWidth: 360,
                    padding: '14px 20px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: 15,
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = CREAM; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    padding: '14px 32px',
                    background: SIENNA,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 999,
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 8px 24px rgba(196,92,60,0.3)',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {status === 'loading' ? <LoaderCircle size={16} className="animate-spin" /> : null}
                  Get early access
                </button>
              </form>
            )}

            {status === 'error' && (
              <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 12 }}>Something went wrong. Please try again.</p>
            )}

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 24 }}>
              Works inside CoachAccountable — no migration needed. Email only. Zero spam.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
