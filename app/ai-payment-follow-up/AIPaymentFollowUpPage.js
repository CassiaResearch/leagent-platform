'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CheckCircle2, LoaderCircle, Mail, Clock, ArrowRight } from 'lucide-react';

const NAVY = '#1a1a2e';
const SIENNA = '#c45c3c';
const CREAM = '#e8d5b7';
const CREAM_LIGHT = '#f5efe3';
const WHITE = '#faf9f6';
const APOS = '\u0027';
const mdash = '\u2014';

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
      {children} <ArrowRight size={16} strokeWidth={3} />
    </a>
  );
}

function ThreadBubble({ from, text, style: bubbleStyle = {}, children }) {
  const isClient = from === 'client';
  return (
    <div style={{
      background: isClient ? '#f0f0f4' : CREAM_LIGHT,
      border: `1px solid ${isClient ? '#e2e2e8' : 'rgba(232,213,183,0.3)'}`,
      borderRadius: 12,
      padding: '14px 18px',
      maxWidth: 420,
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: isClient ? '#6b7280' : SIENNA, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {isClient ? 'Client reply' : 'AI draft'}
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: '#2d2d3a', margin: 0, fontStyle: isClient ? 'normal' : 'italic' }}>
        {text || children}
      </p>
    </div>
  );
}

export default function AIPaymentFollowUpPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const track = useCallback((action) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, { event_category: 'engagement', event_label: 'ai-payment-follow-up' });
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
          experiment_slug: 'ai-payment-follow-up',
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
      // Track page view
      if (window.gtag) {
        window.gtag('event', 'page_view', { event_category: 'engagement', event_label: 'ai-payment-follow-up' });
      }
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .payment-page { font-family: 'Inter', system-ui, sans-serif; color: #2d2d3a; line-height: 1.65; }
        .payment-page h1, .payment-page h2, .payment-page h3, .payment-page .serif { font-family: 'Playfair Display', Georgia, serif; }
        .payment-page * { box-sizing: border-box; }
        .payment-page a { color: inherit; }
      `}</style>

      <main className="payment-page" style={{ background: WHITE }}>

        {/* ===== HERO ===== */}
        <section style={{ background: NAVY, color: '#fff', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(196,92,60,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(232,213,183,0.04)' }} />

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: CREAM, marginBottom: 24 }}>
              For Gmail-based freelancers and micro-agencies chasing overdue invoices
            </p>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 24, maxWidth: 660 }}>
              QuickBooks almost made me{' '}
              <span style={{ color: SIENNA }}>lose my best client</span>{' '}
              with an AI reminder.
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.15rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 12, maxWidth: 580 }}>
              85% of freelancers get paid late. Average wait: 39 days. The hard part isn{APOS}t sending the invoice {mdash} it{APOS}s chasing payment without sounding like a jerk.
            </p>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontWeight: 500 }}>
              {'\u2726'} Drafts, not auto-send. Your name, your tone, your relationships.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <CtaButton onClick={() => { track('cta_click'); document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Early Access
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
              The problem
            </p>

            {/* QB disaster pull quote */}
            <blockquote style={{ borderLeft: `3px solid ${SIENNA}`, paddingLeft: 20, marginBottom: 36 }}>
              <p className="serif" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', fontStyle: 'italic', color: '#1a1a2e', lineHeight: 1.6, marginBottom: 8 }}>
                {'\u201cI nearly sent an overdue invoice reminder written in a completely inappropriate and unacceptable tone to a highly valued client, signed by my name!\u201d'}
              </p>
              <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} QuickBooks Community</cite>
            </blockquote>

            {/* The human cost */}
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 24 }}>
              You{APOS}re not bad at chasing payment. The tools are bad at sounding human.
            </h2>

            <div style={{ display: 'grid', gap: 24, marginBottom: 36 }}>
              <blockquote style={{ borderLeft: `3px solid ${CREAM}`, paddingLeft: 20, margin: 0 }}>
                <p className="serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#3d3d4a', lineHeight: 1.6, marginBottom: 6 }}>
                  {'\u201cI ran a small business from 2016 to 2019 and lost it because clients didn\u2019t pay on time. The stress of constantly following up, not knowing what to write without sounding rude, feeling like you\u2019re begging to be paid \u2014 it eventually broke the business.\u201d'}
                </p>
                <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} HN, \u201cUnpaid\u201d founder</cite>
              </blockquote>

              <blockquote style={{ borderLeft: `3px solid ${SIENNA}`, paddingLeft: 20, margin: 0 }}>
                <p className="serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#3d3d4a', lineHeight: 1.6, marginBottom: 6 }}>
                  {'\u201cChasing clients for payments\u2026 Emails like \u2018Hey\u2026 just following up on invoice #123\u2026\u2019 \u2018Gentle reminder\u2026\u2019 \u2018Second reminder\u2026\u2019 It\u2019s awkward and wastes time.\u201d'}
                </p>
                <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} r/microsaas</cite>
              </blockquote>
            </div>

            {/* Stats block */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 8 }}>
              <div style={{ background: NAVY, borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: SIENNA, lineHeight: 1 }}>85%</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>of freelancers get paid late</div>
              </div>
              <div style={{ background: NAVY, borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: SIENNA, lineHeight: 1 }}>39 days</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>average wait past due</div>
              </div>
              <div style={{ background: NAVY, borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: SIENNA, lineHeight: 1 }}>8{mdash}12 hrs</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{mdash}8{mdash}12 hrs/mo chasing invoices</div>
              </div>
              <div style={{ background: NAVY, borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: SIENNA, lineHeight: 1 }}>42%</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>missed their own bills</div>
              </div>
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
              It reads the thread. You sound like you.
            </h2>

            <div style={{ display: 'grid', gap: 24, marginBottom: 48 }}>
              {[
                {
                  num: '01',
                  title: 'Connect your Gmail',
                  body: 'One-time setup. No migration, no new inbox. Authorize access and it starts reading your overdue invoice threads.',
                },
                {
                  num: '02',
                  title: 'It reads the actual email thread',
                  body: 'Not just the invoice {mdash} the overdue notice, the client{APOS}s reply (\u201Cwe{APOS}ll pay next week\u201D, \u201Ccan we split it?\u201D), the full conversation.',
                },
                {
                  num: '03',
                  title: 'Draft the next follow-up in the right tone',
                  body: 'Professional without being robotic. Acknowledges the reply. Keeps the relationship warm. You review, edit, send.',
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

            {/* Thread visual */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(26,26,46,0.06)' }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8f8fa0', marginBottom: 20 }}>Example thread</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Invoice */}
                <div style={{ background: 'rgba(196,92,60,0.06)', border: '1px solid rgba(196,92,60,0.12)', borderRadius: 12, padding: '12px 16px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: SIENNA, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Invoice #1247 {mdash} 30 days overdue</p>
                  <p style={{ fontSize: 13, color: '#5f5f70', margin: 0 }}>Reminder: Payment of $2,400 was due March 1st.</p>
                </div>
                {/* Client reply */}
                <ThreadBubble from="client" text={'"Sorry \u2014 we had some unexpected expenses this month. Can we split it into two payments?"'} />
                {/* AI draft */}
                <ThreadBubble from="draft">
                  {'"Thanks for letting me know \u2014 I understand unexpected costs come up. A split payment works for me: $1,200 this Friday and $1,200 by April 15th. Does that work on your end?"'}
                </ThreadBubble>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ===== PROOF ===== */}
        <FadeSection style={{ padding: '80px 24px', background: WHITE }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SIENNA, marginBottom: 16 }}>
              The market signal
            </p>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 32 }}>
              Everyone{APOS}s building this. Nobody{APOS}s won.
            </h2>

            <div style={{ display: 'grid', gap: 20 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>QuickBooks just proved the demand {mdash} and proved they can{APOS}t execute.</p>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  Their AI reminders are so tone-deaf that users nearly sent inappropriate follow-ups to their best clients {mdash} signed with their own name. The market doesn{APOS}t want more automation. It wants better execution.
                </p>
              </div>

              <div>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>5+ indie builders converging. Zero winners.</p>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  Paidnice, Invoice Nudge, Unpaid, Chase, InvoicifyAI {mdash} all chasing overdue follow-up. None has breakout traction. The category is wide open.
                </p>
              </div>

              <div>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>The human cost is real and quantified.</p>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>
                  42% of freelancers missed personal bill payments because clients paid late. 38% incurred late fees. 31% borrowed money. This isn{APOS}t an inconvenience {mdash} it{APOS}s a financial cascade.
                </p>
              </div>
            </div>

            <blockquote style={{ borderLeft: `3px solid ${CREAM}`, paddingLeft: 20, marginTop: 32, marginBottom: 0 }}>
              <p className="serif" style={{ fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' === 'undefined' ? '#5f5f70' : '#5f5f70', marginBottom: 6, lineHeight: 1.6, color: '#5f5f70' }}>
                {'\u201cThe stress of constantly following up, not knowing what to write without sounding rude, feeling like you\u2019re begging to be paid \u2014 it eventually broke the business. I sold at a loss.\u201d'}
              </p>
              <cite style={{ fontSize: 13, color: '#8f8fa0', fontStyle: 'normal' }}>{'\u2014'} HN, founder who lost their business</cite>
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
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>Is this auto-send?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>No. It drafts. You review, you edit, you hit send. Your name, your call, your relationships. The only thing that changes is you stop staring at a blank reply trying to figure out what to say.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(26,26,46,0.08)', padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>How is this different from QuickBooks reminders?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>QuickBooks doesn{APOS}t read the reply. Your client says {APOS}we{APOS}ll pay next week{APOS} and QuickBooks sends another blind {APOS}gentle reminder.{APOS} This reads that reply and drafts what you{APOS}d actually say next.</p>
              </div>
              <div style={{ borderBottom: '1px solid rgba(26,26,46,0.08)', padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>How is this different from templates?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>Templates work for the first email. What about the third? The fifth? When your client replies with {APOS}we had a death in the family,{APOS} your template doesn{APOS}t adapt. This reads the thread and drafts accordingly.</p>
              </div>
              <div style={{ padding: '20px 0' }}>
                <h3 className="serif" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>How much will it cost?</h3>
                <p style={{ color: '#5f5f70', margin: 0, lineHeight: 1.7 }}>Early access is free. We{APOS}re building this with freelancers, not selling to freelancers (yet). Get in early, shape the product, and your first months are on us.</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ===== FINAL CTA ===== */}
        <section id="signup" style={{ padding: '80px 24px 100px', background: NAVY, color: '#fff' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="serif" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: 16 }}>
              You{APOS}ve already written five {'\u201c'}just checking in{'\u201d'} emails this month.
              <br />
              Let the next one be the last one you write yourself.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: 36, lineHeight: 1.7 }}>
              Join the waitlist for overdue follow-ups that read the thread and sound human.
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
                  placeholder="you@studio.com"
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
                  Get Early Access
                </button>
              </form>
            )}

            {status === 'error' && (
              <p style={{ color: '#fca5a5', fontSize: 14, marginTop: 12 }}>Something went wrong. Please try again.</p>
            )}

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Mail size={14} /> Drafts, not auto-send. Your relationships stay intact.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
