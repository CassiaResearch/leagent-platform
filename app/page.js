import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { experiments } from '../lib/experiments';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const orderedSlugs = [
  'small-service-request-capture',
  'hubspot-sequence-limit',
  'scope-creep-guard',
  'ai-payment-follow-up',
  'coach-accountable-ai',
  'accounting-document-ai',
];

export default function HomePage() {
  const pages = orderedSlugs.map((slug) => experiments[slug]).filter(Boolean);

  return (
    <main style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#fff8ef 58%,#ffffff 100%)', color: '#0f172a', minHeight: '100vh' }}>
      <section style={{ padding: '88px 0 40px' }}>
        <div className="container" style={{ display: 'grid', gap: 28 }}>
          <Badge variant="outline" className="w-fit rounded-full border-[#dbe5f1] bg-white/90 px-4 py-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#1d4e89]">
            Forge rebuild · March 20
          </Badge>

          <div style={{ display: 'grid', gap: 18, maxWidth: 900 }}>
            <h1 style={{ fontSize: 'clamp(3rem,7vw,5.8rem)', lineHeight: 0.95, letterSpacing: '-0.05em', margin: 0 }}>
              Six active wedges. One clean rebuild.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.75, color: '#475569', margin: 0, maxWidth: 820 }}>
              Alex asked for the old landing-page surfaces and the old home page to get out of the way. This home page is now a simple atlas for the six build-ready opportunities currently in motion — no stale experiments, no generic benchmark theater, just the active pages Forge rebuilt from the latest briefs.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Badge className="rounded-full bg-[#edf5ff] px-3 py-1 text-[#1d4e89]">PP-2026-03-09-04 · controlled variant</Badge>
            <Badge className="rounded-full bg-[#fff3e8] px-3 py-1 text-[#b45309]">PP-2026-03-10-01 · narrow workflow fix</Badge>
            <Badge className="rounded-full bg-[#fef2f2] px-3 py-1 text-[#b91c1c]">PP-2026-03-19-01 · revenue-protection wedge</Badge>
            <Badge className="rounded-full bg-[#eefbf6] px-3 py-1 text-[#0f766e]">PP-2026-03-20-01 · Gmail-native follow-up</Badge>
            <Badge className="rounded-full bg-[#f5f3ff] px-3 py-1 text-[#7c3aed]">PP-2026-03-22-01 · CoachAccountable back-office</Badge>
            <Badge className="rounded-full bg-[#fef9c3] px-3 py-1 text-[#a16207]">PP-2026-03-22-02 · Accounting document follow-up</Badge>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 72px' }}>
        <div className="container" style={{ display: 'grid', gap: 18 }}>
          {pages.map((page, index) => (
            <Card key={page.slug} className="border-[rgba(15,23,42,0.08)] bg-white/92 shadow-[0_26px_60px_rgba(15,23,42,0.08)]">
              <CardContent style={{ padding: 28, display: 'grid', gap: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ display: 'grid', gap: 10, maxWidth: 820 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                      <Badge variant="outline" className="rounded-full border-[#dbe5f1] text-[#1d4e89]">0{index + 1}</Badge>
                      <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 800, color: '#64748b' }}>{page.pageId}</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1.02, letterSpacing: '-0.04em', margin: 0 }}>{page.pageTitle}</h2>
                    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: '#475569' }}>{page.summary}</p>
                  </div>
                  <Link href={`/${page.slug}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ef993f_0%,#e88b2e_100%)] px-6 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(232,139,46,0.28)] transition hover:opacity-95">
                    Open page
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 800, color: '#94a3b8' }}>What the page is trying to prove</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {page.socialProofBar.map((item) => (
                      <div key={item} style={{ padding: '14px 16px', borderRadius: 18, border: '1px solid rgba(15,23,42,0.08)', background: 'rgba(248,250,252,0.88)', color: '#334155', fontWeight: 600 }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
