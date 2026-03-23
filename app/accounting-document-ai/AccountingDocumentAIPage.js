'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle2, FileText, Clock, ArrowRight, Inbox, FileCheck, Send, Shield } from 'lucide-react';

const APOS = '\u0027';
const mdash = '\u2014';
const ldquo = '\u201C';
const rdquo = '\u201D';

const NAVY = '#1a2744';
const AMBER = '#d4a843';
const AMBER_LIGHT = '#f5e6c0';
const OFFWHITE = '#f8f7f4';
const WHITE = '#ffffff';
const DARK = '#111827';
const MUTED = '#6b7280';

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; } },
      { threshold: 0.12 }
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
        padding: '15px 36px',
        background: AMBER,
        color: NAVY,
        borderRadius: 8,
        fontWeight: 800,
        fontSize: 16,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        boxShadow: '0 8px 24px rgba(212,168,67,0.25)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {children} <ArrowRight size={18} strokeWidth={3} />
    </a>
  );
}

function StatBlock({ number, label }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: NAVY, lineHeight: 1 }}>{number}</div>
      <div style={{ fontSize: 14, color: MUTED, marginTop: 6, lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

export default function AccountingDocumentAIPage() {
  const [email, setEmail] = useState('');
  const [portal, setPortal] = useState('');
  const [firmSize, setFirmSize] = useState('');
  const [status, setStatus] = useState('idle');

  const track = useCallback((action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_category: 'engagement', event_label: 'accounting-document-ai' });
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

      const lead = { email };
      if (portal) lead.portal = portal;
      if (firmSize) lead.firm_size = firmSize;

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiment_slug: 'accounting-document-ai',
          page_variant: 'A',
          attribution,
          lead,
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&display=swap');
        .acct-page { font-family: 'Inter', system-ui, sans-serif; color: DARK; line-height: 1.65; }
        .acct-page h1, .acct-page h2, .acct-page h3, .acct-page .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .acct-page * { box-sizing: border-box; }
        .acct-page a { color: inherit; }
      `}</style>

      <main className="acct-page" style={{ background: WHITE }}>

        {/* ===== HERO ===== */}
        <section style={{ background: NAVY, color: '#fff', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle geometric accents */}
          <div style={{ position: 'absolute', top: -120, right: -60, width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(212,168,67,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -40, width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />

          <div style={{ maxWidth: 740, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: AMBER, marginBottom: 24 }}>
              For small accounting firms on Karbon or Canopy
            </p>

            <h1 style={{ fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: 24, maxWidth: 660 }}>
              <span style={{ color: AMBER, fontFamily: "'DM Serif Display', serif" }}>2 hours a day</span> chasing clients for documents your portal can{APOS}t ask for.
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 12, maxWidth: 580 }}>
              AI follow-up that reminds clients, tracks what{APOS}s missing, and routes everything to your engagements {mdash} without switching tools.
            </p>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 36, fontWeight: 500 }}>
              No migration. No new portal. Works with what you have.
            </p>

            <CtaButton onClick={() => track('hero_cta_click')}>Get Early Access</CtaButton>
          </div>
        </section>

        {/* ===== PROBLEM ===== */}
        <FadeSection style={{ background: WHITE, padding: '80px 24px' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 400, color: NAVY, marginBottom: 32, lineHeight: 1.25 }}>
              Your portal stores documents.<br />
              <span style={{ color: AMBER }}>It doesn{APOS}t follow up when they{APOS}re missing.</span>
            </h2>

            <div style={{ display: 'grid', gap: 24, marginBottom: 40 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={18} color={MUTED} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>1{mdash}3 hours a day, every day</p>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                    79% of firms without cloud work management spend 1{mdash}3 hours daily on manual document chasing {mdash} and that{APOS}s year-round, not just tax season.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Inbox size={18} color={MUTED} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>The follow-up happens outside the portal</p>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                    Emails, texts, phone calls, spreadsheets {mdash} the actual chasing lives in your inbox and on your phone, not in Karbon or Canopy.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={18} color={MUTED} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>By the time you open a file, it{APOS}s still incomplete</p>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
                    {ldquo}By the time a return is ready to work on, someone has usually spent two to three hours just confirming the file is complete.{rdquo}
                  </p>
                </div>
              </div>
            </div>

            {/* Pull quote */}
            <div style={{ borderLeft: `3px solid ${AMBER}`, paddingLeft: 20, fontStyle: 'italic', color: '#374151', fontSize: 15, lineHeight: 1.7 }}>
              {ldquo}Half of busy season isn{APOS}t the returns. It{APOS}s chasing clients for their documents.{rdquo}
              <span style={{ display: 'block', fontStyle: 'normal', fontWeight: 600, fontSize: 13, color: MUTED, marginTop: 8 }}> {mdash} r/Accounting</span>
            </div>
          </div>
        </FadeSection>

        {/* ===== HOW IT WORKS ===== */}
        <FadeSection style={{ background: OFFWHITE, padding: '80px 24px' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 400, color: NAVY, marginBottom: 48, textAlign: 'center' }}>
              How it works
            </h2>

            <div style={{ display: 'grid', gap: 32 }}>
              {[
                {
                  num: '1',
                  title: 'Connect Karbon or Canopy',
                  body: 'Link your existing portal. No migration, no new login for your clients, no disruption to your current setup.',
                  icon: <Send size={20} color={AMBER} />,
                },
                {
                  num: '2',
                  title: 'AI identifies what{APOS}s missing per engagement',
                  body: 'Knows what documents each engagement needs and automatically flags gaps {mdash} T4s, bank statements, receipts, whatever the file requires.',
                  icon: <FileText size={20} color={AMBER} />,
                },
                {
                  num: '3',
                  title: 'AI follows up until the file is complete',
                  body: 'Sends reminders to clients, tracks what{APOS}s outstanding, and routes incoming documents to the right engagement. Runs 24/7.',
                  icon: <FileCheck size={20} color={AMBER} />,
                },
              ].map((step) => (
                <div key={step.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 48, height: 48, borderRadius: 12, background: WHITE,
                    border: `1px solid #e5e7eb`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 16, color: NAVY, marginBottom: 6 }}>{step.title}</p>
                    <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.65 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ===== PROOF ===== */}
        <FadeSection style={{ background: WHITE, padding: '80px 24px' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 400, color: NAVY, marginBottom: 40, textAlign: 'center' }}>
              The numbers behind the problem
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
              <StatBlock number="#2" label="challenge for firm owners is chasing clients for documents" />
              <StatBlock number="288 hrs" label="saved in one tax season by improving document collection" />
              <StatBlock number="79%" label="of firms spend 1{mdash}3 hours daily on manual document work" />
            </div>

            <div style={{ background: OFFWHITE, borderRadius: 12, padding: '28px 24px', marginBottom: 16 }}>
              <p style={{ fontStyle: 'italic', color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
                {ldquo}288 hours saved in just one tax season{rdquo}
              </p>
              <p style={{ fontWeight: 600, fontSize: 13, color: MUTED }}>
                {mdash} Glasscubes customer, TaxAssist Accountants
              </p>
            </div>

            <div style={{ background: OFFWHITE, borderRadius: 12, padding: '28px 24px' }}>
              <p style={{ fontStyle: 'italic', color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
                {ldquo}A significant part of what makes busy season brutal is the workflow fighting the team at every step.{rdquo}
              </p>
              <p style={{ fontWeight: 600, fontSize: 13, color: MUTED }}>
                {mdash} SmartVault
              </p>
            </div>
          </div>
        </FadeSection>

        {/* ===== FAQ ===== */}
        <FadeSection style={{ background: OFFWHITE, padding: '80px 24px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 400, color: NAVY, marginBottom: 40, textAlign: 'center' }}>
              Common questions
            </h2>

            {[
              {
                q: 'Does this replace Karbon or Canopy?',
                a: 'No. It sits on top of your existing portal and handles the follow-up workflow they don{APOS}t cover. No migration, no new login for your clients.',
              },
              {
                q: 'What about SmartRequestAI?',
                a: 'SmartRequestAI only works on SmartVault. If you{APOS}re on Karbon or Canopy, it doesn{APOS}t help you. This is cross-platform {mdash} built for the platforms that don{APOS}t have a native solution.',
              },
              {
                q: 'We only need this during tax season.',
                a: 'Document chasing is year-round: monthly close, quarterly payroll, ongoing bookkeeping. 79% of firms spend 1{mdash}3 hours daily on this regardless of season.',
              },
              {
                q: 'How is this different from hiring a VA?',
                a: 'VAs cost $1,000{mdash}3,000/month, need retraining every season, and still use the same manual workflow. This runs 24/7 and scales with your client count, not your headcount.',
              },
              {
                q: 'Is our client data secure?',
                a: 'Documents are never stored or processed outside your existing portal{APOS}s infrastructure. AI handles the follow-up messages only.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none', padding: '20px 0' }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 8 }}>{faq.q}</p>
                <p style={{ color: '#4b5563', fontSize: 14, lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* ===== FINAL CTA ===== */}
        <section id="signup" style={{ background: NAVY, color: '#fff', padding: '80px 24px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 400, lineHeight: 1.25, marginBottom: 16 }}>
              Stop chasing. <span style={{ color: AMBER }}>Start closing.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
              Join the waitlist for AI document follow-up that works with your Karbon or Canopy setup.
            </p>

            {status === 'success' ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', background: 'rgba(212,168,67,0.12)', borderRadius: 8, border: '1px solid rgba(212,168,67,0.25)' }}>
                <CheckCircle2 size={20} color={AMBER} />
                <span style={{ fontWeight: 600 }}>You{APOS}re on the list. We{APOS}ll be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                <input
                  type="email"
                  required
                  placeholder="you@firm.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'idle') track('form_start'); }}
                  style={{
                    width: '100%', maxWidth: 400, padding: '14px 18px', borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
                    color: '#fff', fontSize: 15, outline: 'none',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = AMBER; if (status === 'idle') track('form_start'); }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                />
                <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 400 }}>
                  <select
                    value={portal}
                    onChange={(e) => setPortal(e.target.value)}
                    style={{
                      flex: 1, padding: '12px 14px', borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
                      color: portal ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 14, outline: 'none', appearance: 'none',
                    }}
                  >
                    <option value="" style={{ background: NAVY }}>Portal (optional)</option>
                    <option value="karbon" style={{ background: NAVY }}>Karbon</option>
                    <option value="canopy" style={{ background: NAVY }}>Canopy</option>
                    <option value="other" style={{ background: NAVY }}>Other</option>
                  </select>
                  <select
                    value={firmSize}
                    onChange={(e) => setFirmSize(e.target.value)}
                    style={{
                      flex: 1, padding: '12px 14px', borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)',
                      color: firmSize ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: 14, outline: 'none', appearance: 'none',
                    }}
                  >
                    <option value="" style={{ background: NAVY }}>Firm size (optional)</option>
                    <option value="solo" style={{ background: NAVY }}>Solo</option>
                    <option value="2-5" style={{ background: NAVY }}>2{mdash}5 people</option>
                    <option value="6-10" style={{ background: NAVY }}>6{mdash}10 people</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  onClick={() => track('final_cta_click')}
                  style={{
                    marginTop: 8, padding: '15px 40px', background: AMBER, color: NAVY,
                    border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 16,
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    boxShadow: '0 8px 24px rgba(212,168,67,0.25)',
                  }}
                >
                  {status === 'loading' ? 'Submitting...' : 'Get Early Access'}
                </button>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: 13, marginTop: 4 }}>Something went wrong. Please try again.</p>
                )}
              </form>
            )}

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Shield size={14} /> No spam. Built for small firms, not enterprise.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
