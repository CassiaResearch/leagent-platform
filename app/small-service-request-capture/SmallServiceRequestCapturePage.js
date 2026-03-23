'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, LoaderCircle, MessageSquare, Shield, Zap } from 'lucide-react';

/* ─── variant selection ─── */
function useVariant() {
  const [variant, setVariant] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    let picked;
    if (v === 'loss') picked = 'A';
    else if (v === 'revenue') picked = 'B';
    else {
      const stored = sessionStorage.getItem('ssr-variant');
      if (stored) picked = stored;
      else {
        picked = Math.random() < 0.5 ? 'A' : 'B';
        sessionStorage.setItem('ssr-variant', picked);
      }
    }
    setVariant(picked);
    if (window.gtag) window.gtag('event', 'page_view', { event_category: 'experiment', event_label: `ssr-${picked}` });
    if (window.gtag) window.gtag('event', 'variant', { value: picked === 'A' ? 1 : 2 });
  }, []);
  return variant;
}

/* ─── scroll tracking ─── */
function useScrollDepth() {
  useEffect(() => {
    let max = 0;
    const handler = () => {
      const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (pct > max) { max = pct; if (window.gtag) window.gtag('event', 'scroll_depth', { value: pct }); }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

/* ─── fade-in ─── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = 1; el.style.transform = 'translateY(0)'; obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, style, ...props }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} {...props} style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>
      {children}
    </div>
  );
}

/* ─── CTA button ─── */
function CtaButton({ children, onClick, style, ...props }) {
  return (
    <button onClick={onClick} {...props} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px',
      backgroundColor: '#e88b2e', color: '#fff', border: 'none', borderRadius: 8,
      fontSize: 'clamp(16px, 2.2vw, 18px)', fontWeight: 700, cursor: 'pointer',
      transition: 'background-color 0.2s, transform 0.15s', letterSpacing: '-0.01em',
      ...style,
    }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#d67a22'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
       onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e88b2e'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      {children}
    </button>
  );
}

/* ─── content data ─── */
const KICKER = 'For trades and home-service crews running their business from their phone';
const TRUST_LINE = 'Works with text, WhatsApp, email — whatever your customers already use';

const HERO = {
  A: { headline: 'You read the text. You were driving. And it was gone.', sub: 'Texts, WhatsApp, DMs — customer requests hit your phone while you\'re on the job. You mean to reply. Then you don\'t. Catch every request, automatically, without adding another app.' },
  B: { headline: '20+ customer requests a month. Gone. And you never even knew.', sub: 'A roofing crew documented 20+ lost leads per month. A landscaping owner processes 30+ messages a day with nothing reliable catching what slips. How many are you losing?' },
};

const PROBLEM_QUOTE = '"So I run a small landscaping business, 3 crews, and the number one way I lost track of things is when clients message me on WhatsApp or text... I read it, I\'m driving or in the middle of something, and then it\'s just... gone. Poof." — r/smallbusiness';

const BENEFITS = {
  A: [
    { icon: CheckCircle2, title: 'Every request gets caught', desc: 'Text, WhatsApp, email, DMs. No memory required. It just works.' },
    { icon: Zap, title: 'Works while you\'re working', desc: "You{APOS}re on the job, not at a desk. Capture happens automatically." },
    { icon: Shield, title: 'Lighter than Jobber, cheaper than lost quotes', desc: "Not a field-service platform. A safety net for the one thing that falls through." },
  ],
  B: [
    { icon: CheckCircle2, title: 'Catch every lead', desc: 'Requests from text, WhatsApp, email, DMs become follow-up items automatically.' },
    { icon: Zap, title: 'Built for trades, not tech companies', desc: 'No Zapier, no CRM setup, no migration. Just works with what you have.' },
    { icon: Shield, title: 'Cheaper than the quotes you\'re already losing', desc: 'Even 3 saved quotes/month pays for itself. How many are slipping through?' },
  ],
};

const STATS = [
  { value: '30+', label: 'messages/day processed by one landscaping owner' },
  { value: '20+', label: 'lost leads/month documented by a roofing crew' },
  { value: 'Overkill', label: 'how trades owners describe Jobber and ServiceTitan' },
  { value: 'Not realistic', label: 'their verdict on manual tracking' },
];

const PROOF_QUOTES = [
  { text: 'This is one of the biggest issues we have... I have not found an easy way to make sure none get lost in the shuffle.', source: 'r/smallbusiness' },
  { text: 'Jobber and ServiceTitan... seem like overkill (and expensive) for a small crew.', source: 'r/landscaping' },
];

const FAQS = [
  { q: "Isn't this just a CRM?", a: 'No. CRMs manage your whole business. This catches the one thing that falls through: requests you saw and forgot.' },
  { q: 'I already use Jobber', a: 'Great — does Jobber remind you when you read a text at a red light and forgot by the time you parked?' },
  { q: 'Another app on my phone?', a: "You don{APOS}t install anything. Requests get captured from the apps you already use." },
  { q: 'Customers will just call if it\'s important', a: "Or they'll text the next guy on Google who replies faster." },
  { q: 'How much?', a: "Early access is free. We're building this with trades owners, not selling to them (yet)." },
];

const TRADE_OPTIONS = ['Landscaping', 'Roofing', 'HVAC', 'Plumbing', 'Cleaning', 'Other'];

/* ─── main component ─── */
export default function SmallServiceRequestCapturePage() {
  const variant = useVariant();
  const scrollRef = useScrollDepth();
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (window.gtag) window.gtag('event', 'cta_click', { event_category: 'engagement' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const params = new URLSearchParams(window.location.search);
      const attribution = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k => { if (params.get(k)) attribution[k] = params.get(k); });
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experiment_slug: 'small-service-request-capture', page_variant: variant, attribution, lead: { email, trade: trade || undefined } }),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus('success');
      if (window.gtag) window.gtag('event', 'waitlist_submit', { event_category: 'conversion' });
    } catch { setStatus('error'); }
  };

  if (!variant) return null;

  const h = HERO[variant];
  const benefits = BENEFITS[variant];
  const finalHeadline = variant === 'A' ? 'Stop losing requests because you were busy.' : 'Stop leaving money on the table.';

  return (
    <div className="ssr-page" ref={scrollRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&display=swap');
        .ssr-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #1a2744; background: #ffffff; line-height: 1.6; }
        .ssr-page * { box-sizing: border-box; }
      `}</style>

      {/* ── HERO ── */}
      <header style={{ background: 'linear-gradient(170deg, #1a2744 0%, #243352 60%, #2d3f5e 100%)', color: '#fff', padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,80px) clamp(50px,8vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60%', right: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(232,139,46,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <p style={{ fontSize: 'clamp(12px,1.6vw,14px)', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#e88b2e', fontWeight: 600, marginBottom: 20 }}>{KICKER}</p>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(28px,5vw,52px)', lineHeight: 1.15, marginBottom: 24, color: '#fff' }}>{h.headline}</h1>
            <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: 'rgba(255,255,255,0.82)', maxWidth: 600, marginBottom: 32, lineHeight: 1.65 }}>{h.sub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
              <CtaButton onClick={scrollToForm}>Get early access — it{APOS}s free</CtaButton>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MessageSquare size={14} /> {TRUST_LINE}
              </p>
            </div>
          </FadeSection>
        </div>
      </header>

      {/* ── PROBLEM ── */}
      <section style={{ background: '#f8f7f4', padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeSection>
            {variant === 'A' ? (
              <>
                <blockquote style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(18px,2.8vw,24px)', lineHeight: 1.5, borderLeft: '4px solid #e88b2e', paddingLeft: 24, color: '#1a2744', marginBottom: 40 }}>
                  {PROBLEM_QUOTE}
                </blockquote>
                <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: '#4a5568', marginBottom: 16, lineHeight: 1.7 }}>
                  You{APOS}re driving. On a roof. Hands full. Phone buzzes. You glance at the text — yeah, I'll get back to that.
                </p>
                <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: '#4a5568', marginBottom: 24, lineHeight: 1.7 }}>
                  Two hours later, it doesn{APOS}t exist. Your customer has already texted the next person on Google.
                </p>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                  <div style={{ flex: '1 1 200px', background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(36px,5vw,48px)', color: '#e88b2e', lineHeight: 1, marginBottom: 8 }}>20+</p>
                    <p style={{ fontSize: 14, color: '#6b7280' }}>lost leads per month<br/>(roofing crew, Contractor Talk)</p>
                  </div>
                  <div style={{ flex: '1 1 200px', background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(36px,5vw,48px)', color: '#e88b2e', lineHeight: 1, marginBottom: 8 }}>30+</p>
                    <p style={{ fontSize: 14, color: '#6b7280' }}>messages/day with nothing<br/>catching what slips</p>
                  </div>
                </div>
                <p style={{ fontSize: 'clamp(16px,2vw,18px)', color: '#4a5568', marginBottom: 16, lineHeight: 1.7 }}>
                  Even at $200 per average job, 15 lost requests a month is <strong style={{ color: '#1a2744' }}>$3,000/month</strong> walking out the door. You just don{APOS}t see it happen.
                </p>
                <blockquote style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(16px,2.4vw,20px)', lineHeight: 1.5, borderLeft: '4px solid #e88b2e', paddingLeft: 24, color: '#1a2744', marginTop: 24 }}>
                  {PROBLEM_QUOTE}
                </blockquote>
              </>
            )}
            <p style={{ fontSize: 'clamp(16px,2vw,18px)', fontWeight: 600, color: '#1a2744', marginTop: 32 }}>
              How much is that costing you?
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ background: '#fff', padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(24px,4vw,36px)', textAlign: 'center', marginBottom: 48, color: '#1a2744' }}>
              What this actually does
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', padding: 24, background: '#f8f7f4', borderRadius: 12 }}>
                  <div style={{ flexShrink: 0, width: 40, height: 40, background: 'rgba(232,139,46,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <b.icon size={22} color="#e88b2e" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(16px,2.2vw,20px)', fontWeight: 700, marginBottom: 6, color: '#1a2744' }}>{b.title}</h3>
                    <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: '#6b7280', lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <CtaButton onClick={scrollToForm}>Get early access — it{APOS}s free</CtaButton>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── PROOF / STATS ── */}
      <section style={{ background: '#f5f1e8', padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(24px,4vw,36px)', textAlign: 'center', marginBottom: 40, color: '#1a2744' }}>
              The numbers trades owners are seeing
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '24px 20px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(28px,4vw,36px)', color: '#e88b2e', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 20 }}>
              {PROOF_QUOTES.map((q, i) => (
                <blockquote key={i} style={{ background: '#fff', borderRadius: 12, padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #e88b2e' }}>
                  <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: '#1a2744', lineHeight: 1.6, marginBottom: 8, fontStyle: 'italic' }}>{q.text}</p>
                  <p style={{ fontSize: 13, color: '#9ca3af' }}>— {q.source}</p>
                </blockquote>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#fff', padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(24px,4vw,36px)', textAlign: 'center', marginBottom: 40, color: '#1a2744' }}>
              Questions you{APOS}re probably asking
            </h2>
            <div style={{ display: 'grid', gap: 0 }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width: '100%', textAlign: 'left', padding: '20px 0', fontSize: 'clamp(15px,2vw,17px)',
                    fontWeight: 600, color: '#1a2744', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    {f.q}
                    <span style={{ fontSize: 20, color: '#9ca3af', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: 'clamp(14px,1.8vw,16px)', color: '#6b7280', lineHeight: 1.65, paddingBottom: 20 }}>
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section ref={formRef} style={{ background: 'linear-gradient(170deg, #1a2744 0%, #243352 100%)', color: '#fff', padding: 'clamp(50px,8vw,90px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(24px,4.5vw,38px)', marginBottom: 12, color: '#fff', lineHeight: 1.2 }}>
              {finalHeadline}
            </h2>
            <p style={{ fontSize: 'clamp(15px,2vw,17px)', color: 'rgba(255,255,255,0.7)', marginBottom: 36 }}>
              {variant === 'A'
                ? 'Early access is free. No credit card, no app to install. Just your email.'
                : 'Join other trades owners building this with us. Early access is free.'}
            </p>

            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <CheckCircle2 size={40} color="#e88b2e" />
                <p style={{ fontSize: 18, fontWeight: 600 }}>You{APOS}re in.</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420, margin: '0 auto' }}>
                <input
                  type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                  style={{
                    padding: '14px 18px', borderRadius: 8, border: 'none', fontSize: 'clamp(15px,2vw,16px)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', outline: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                />
                <select value={trade} onChange={e => setTrade(e.target.value)} style={{
                  padding: '14px 18px', borderRadius: 8, border: 'none', fontSize: 'clamp(14px,1.8vw,15px)',
                  background: 'rgba(255,255,255,0.1)', color: trade ? '#fff' : 'rgba(255,255,255,0.5)',
                  outline: 'none', border: '1px solid rgba(255,255,255,0.2)', appearance: 'none',
                }}>
                  <option value="" disabled>Trade (optional)</option>
                  {TRADE_OPTIONS.map(t => <option key={t} value={t} style={{ color: '#1a2744', background: '#fff' }}>{t}</option>)}
                </select>
                <CtaButton type="submit" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', marginTop: 4, opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? <><LoaderCircle size={18} style={{ animation: 'spin 1s linear infinite' }} /> Joining...</> : 'Get early access'}
                </CtaButton>
                {status === 'error' && <p style={{ fontSize: 13, color: '#f87171' }}>Something went wrong. Try again.</p>}
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <MessageSquare size={12} /> Works with text, WhatsApp, email. No new app for them.
                </p>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </form>
            )}
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
