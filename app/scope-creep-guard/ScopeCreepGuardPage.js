'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, LoaderCircle, AlertTriangle, Shield } from 'lucide-react';

/* ── fade-in on scroll ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeSection({ children, style, className }) {
  const [ref, visible] = useFadeIn();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ── CTA button ── */
function CtaButton({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        backgroundColor: '#DC2626',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '16px 40px',
        fontSize: 18,
        fontWeight: 600,
        cursor: loading ? 'wait' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        transition: 'background 0.2s',
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#B91C1C')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#DC2626')}
    >
      {loading && <LoaderCircle size={18} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  );
}

/* ── message bubble ── */
function MessageBubble() {
  return (
    <div style={{ maxWidth: 420, margin: '0 auto', position: 'relative' }}>
      <div style={{
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        borderRadiusBottomRight: 4,
        padding: '16px 20px',
        fontSize: 15,
        color: '#1E293B',
        fontFamily: "'Inter', sans-serif",
        lineHeight: 1.5,
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6, fontWeight: 500 }}>Client — 2:34 PM</div>
        Hey! So excited about how this is coming together. Quick question — <strong>can you just</strong> make the logo a little bigger, swap the font to something more "premium," and add that scroll animation we talked about? Should be super quick. 🙏
      </div>
      {/* scope boundary indicator */}
      <div style={{
        marginTop: 16,
        padding: '10px 16px',
        borderRadius: 8,
        borderLeft: '3px solid #DC2626',
        backgroundColor: '#FEF2F2',
        fontSize: 13,
        color: '#991B1B',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
      }}>
        <AlertTriangle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
        None of these were in the original scope.
      </div>
    </div>
  );
}

/* ── stat block ── */
function StatBlock({ number, label, accent }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 48,
        fontWeight: 800,
        fontFamily: "'DM Serif Display', serif",
        color: accent ? '#DC2626' : '#1E293B',
        lineHeight: 1.1,
      }}>
        {number}
      </div>
      <div style={{
        fontSize: 15,
        color: '#64748B',
        marginTop: 8,
        fontFamily: "'Inter', sans-serif",
        maxWidth: 260,
        lineHeight: 1.5,
      }}>
        {label}
      </div>
    </div>
  );
}

/* ── step ── */
function Step({ num, title, desc }) {
  return (
    <div style={{
      flex: '1 1 280px',
      padding: '32px 24px',
      backgroundColor: '#fff',
      borderRadius: 12,
      border: '1px solid #E2E8F0',
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#1E293B',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 18,
        fontFamily: "'Inter', sans-serif",
        marginBottom: 20,
      }}>
        {num}
      </div>
      <h3 style={{
        fontSize: 18,
        fontWeight: 700,
        color: '#1E293B',
        marginBottom: 10,
        fontFamily: "'Inter', sans-serif",
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 15,
        color: '#64748B',
        lineHeight: 1.6,
        fontFamily: "'Inter', sans-serif",
      }}>
        {desc}
      </p>
    </div>
  );
}

/* ── FAQ ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #E2E8F0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: '#1E293B',
        }}
      >
        {q}
        <span style={{ fontSize: 20, color: '#64748B', transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: 20,
          fontSize: 15,
          color: '#64748B',
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

/* ── benefit row ── */
function BenefitRow({ icon, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 32 }}>
      <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#1E293B',
          marginBottom: 8,
          fontFamily: "'Inter', sans-serif",
        }}>{title}</h3>
        <p style={{
          fontSize: 15,
          color: '#64748B',
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
        }}>{desc}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function ScopeCreepGuardPage() {
  const [email, setEmail] = useState('');
  const [tool, setTool] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault();
    if (!email || !email.includes('@')) { setError('Enter a valid email.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiment_slug: 'scope-creep-guard',
          page_variant: 'A',
          attribution: 'direct',
          lead: { email },
          ...(tool ? { tool } : {}),
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }, [email, tool]);

  return (
    <div className="scope-page" style={{ fontFamily: "'Inter', sans-serif", color: '#1E293B', backgroundColor: '#ffffff', lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .scope-page * { box-sizing: border-box; }
      `}</style>

      {/* ─── HERO ─── */}
      <section style={{
        backgroundColor: '#1E293B',
        color: '#fff',
        padding: '100px 24px 80px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94A3B8',
            marginBottom: 28,
          }}>
            For freelance designers &amp; small studios using Dubsado, HoneyBook, or Bonsai
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 24,
            color: '#fff',
          }}>
            You quoted $2K. You worked 43 hours. You got paid $2K.
          </h1>

          <p style={{
            fontSize: 18,
            color: '#CBD5E1',
            maxWidth: 560,
            margin: '0 auto 16px',
            lineHeight: 1.7,
          }}>
            79% of freelance designers work beyond scope for free. You're not bad at business — your tools just don't help you in the moment it matters.
          </p>

          <div style={{
            fontSize: 14,
            color: '#94A3B8',
            marginBottom: 40,
          }}>
            Works with Dubsado, HoneyBook, or Bonsai — no migration, no replacement.
          </div>

          <CtaButton onClick={() => document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Early Access
          </CtaButton>
        </div>
      </section>

      {/* ─── THE MOMENT ─── */}
      <FadeSection style={{ padding: '80px 24px', backgroundColor: '#F8F5EF' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            marginBottom: 40,
            color: '#1E293B',
          }}>
            You know this message.
          </h2>
          <MessageBubble />
        </div>

        <div style={{
          maxWidth: 600,
          margin: '48px auto 0',
          borderLeft: '4px solid #DC2626',
          paddingLeft: 24,
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontStyle: 'italic',
            color: '#1E293B',
            lineHeight: 1.6,
          }}>
            "I'm bad at enforcing it... I usually let things slide, forget to remind people, or just keep going because it feels awkward to stop the flow and say 'hey this is billable now.'"
          </p>
          <p style={{ fontSize: 14, color: '#64748B', marginTop: 12 }}>— r/graphic_design</p>
        </div>
      </FadeSection>

      {/* ─── THE COST ─── */}
      <FadeSection style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 48,
            color: '#1E293B',
          }}>
            The cost of being "easy to work with"
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 48,
            marginBottom: 56,
          }}>
            <StatBlock number="79%" label="of creative agencies work beyond scope for free" accent />
            <StatBlock number="$1K–$5K" label="what 57% of agencies lose to unbilled scope creep every month" accent />
            <StatBlock number="1%" label="successfully bill for ALL out-of-scope work" accent />
          </div>

          <div style={{
            backgroundColor: '#FEF2F2',
            borderRadius: 12,
            padding: '28px 32px',
            borderLeft: '4px solid #DC2626',
          }}>
            <p style={{
              fontSize: 16,
              color: '#1E293B',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.7,
              marginBottom: 20,
            }}>
              One freelancer quoted <strong>$2,000</strong> for a landing page, worked <strong>43 hours</strong>, got paid <strong>$2,000</strong> — lost <strong style={{ color: '#DC2626' }}>$2,300</strong> in unpaid work.
            </p>
            <p style={{
              fontSize: 15,
              color: '#64748B',
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              "Bonsai, HoneyBook, Dubsado, Wave, FreshBooks, all of them make that process cleaner... None of them question whether it is the right process. Scope creep happens in the same gap because there is no natural checkpoint."
              <br /><span style={{ fontStyle: 'normal', fontWeight: 500 }}>— MileStage founder</span>
            </p>
          </div>
        </div>
      </FadeSection>

      {/* ─── HOW IT WORKS ─── */}
      <FadeSection style={{ padding: '80px 24px', backgroundColor: '#F8F5EF' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 48,
            color: '#1E293B',
          }}>
            Three steps. No migration.
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <Step
              num={1}
              title="Connect your scope doc"
              desc="From Dubsado, HoneyBook, Bonsai — or upload directly. Your scope doc is the single source of truth."
            />
            <Step
              num={2}
              title="Messages get checked automatically"
              desc="When a client says 'can you just…' — it gets checked against scope in real time. The moment it matters."
            />
            <Step
              num={3}
              title="You decide. Not AI."
              desc="Out-of-scope asks get flagged for YOU. You see it, you decide what to do. No AI talking to your client. Ever."
            />
          </div>
        </div>
      </FadeSection>

      {/* ─── BENEFITS ─── */}
      <FadeSection style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            marginBottom: 48,
            color: '#1E293B',
          }}>
            What changes
          </h2>

          <BenefitRow
            icon={<Shield size={22} color="#DC2626" />}
            title="Stop swallowing the cost"
            desc="When a client says 'can you just add one more thing,' know immediately whether it's in scope. No more guessing. No more free work."
          />
          <BenefitRow
            icon={<CheckCircle2 size={22} color="#DC2626" />}
            title="Your scope doc speaks for you"
            desc="No more awkward conversations. The tool flags it so it's about what was agreed — not you being difficult."
          />
          <BenefitRow
            icon={<AlertTriangle size={22} color="#DC2626" />}
            title="Keep your current tools"
            desc="Works alongside Dubsado, HoneyBook, or Bonsai. No migration. Just the missing piece."
          />
        </div>
      </FadeSection>

      {/* ─── FAQ ─── */}
      <FadeSection style={{ padding: '80px 24px', backgroundColor: '#F8F5EF' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 38px)',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: 40,
            color: '#1E293B',
          }}>
            Questions you're probably asking
          </h2>

          <FaqItem
            q="I already use Dubsado / HoneyBook / Bonsai."
            a="Keep it. They write the scope. This enforces it when it matters — in the moment a client asks for something outside what was agreed."
          />
          <FaqItem
            q="I don't want AI talking to my clients."
            a="This doesn't talk to clients. It flags asks for YOU. Human in control, always."
          />
          <FaqItem
            q="This sounds like another PM tool."
            a="PM tools track tasks. This answers one question: is this in scope or not? That's it."
          />
          <FaqItem
            q="ScopeShield already does this."
            a="ScopeShield scans contracts like a lawyer. This works in your workflow — when a client says 'can you just,' you get an answer without re-reading your SOW."
          />
          <FaqItem
            q="I should just be better at enforcing scope."
            a="79% of agencies have this problem. The issue is no tool helps you in the moment. That's what this is."
          />
        </div>
      </FadeSection>

      {/* ─── FINAL CTA ─── */}
      <FadeSection style={{
        padding: '80px 24px',
        backgroundColor: '#1E293B',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 400,
            marginBottom: 20,
            color: '#fff',
          }}>
            Stop being the freelancer who works for free.
          </h2>
          <p style={{
            fontSize: 18,
            color: '#CBD5E1',
            marginBottom: 40,
            lineHeight: 1.6,
          }}>
            Your scope doc should enforce itself.
          </p>

          {!submitted ? (
            <form
              id="cta-form"
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxWidth: 400,
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: '1px solid #475569',
                  backgroundColor: '#0F172A',
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                }}
              />
              <select
                value={tool}
                onChange={e => setTool(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: '1px solid #475569',
                  backgroundColor: '#0F172A',
                  color: tool ? '#fff' : '#94A3B8',
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  appearance: 'auto',
                }}
              >
                <option value="">What tool do you use? (optional)</option>
                <option value="Dubsado">Dubsado</option>
                <option value="HoneyBook">HoneyBook</option>
                <option value="Bonsai">Bonsai</option>
                <option value="Other">Other</option>
                <option value="None">None</option>
              </select>
              <CtaButton onClick={handleSubmit} loading={loading}>
                Get Early Access
              </CtaButton>
              {error && <p style={{ color: '#FCA5A5', fontSize: 14 }}>{error}</p>}
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>
                Works with Dubsado, HoneyBook, Bonsai. No replacement needed.
              </p>
            </form>
          ) : (
            <div style={{ padding: '20px 0' }}>
              <CheckCircle2 size={48} color="#22C55E" style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 18, color: '#CBD5E1' }}>You're on the list. We'll be in touch.</p>
            </div>
          )}
        </div>
      </FadeSection>
    </div>
  );
}
