import Link from 'next/link';
import { experiments } from '../lib/experiments';
import { Button } from '../components/ui/button';
import { Eyebrow, MetricTile, ProofPill, SectionFrame, SurfaceCard } from '../components/amve/surfaces';

const homeThemes = {
  'small-service-request-capture': 'home-card-service',
  'hubspot-sequence-limit': 'home-card-hubspot',
  'linkedin-crm-sync': 'home-card-linkedin',
  'auto-data-entry': 'home-card-data',
  'manufacturing-tracker': 'home-card-manufacturing',
  'healthcare-no-shows': 'home-card-healthcare'
};

const pageAngles = {
  'small-service-request-capture': ['message chaos', 'lightweight capture', 'owner-operator pain'],
  'hubspot-sequence-limit': ['ops bottleneck', 'batch cap', 'stay in HubSpot'],
  'linkedin-crm-sync': ['rep workflow', 'clean CRM handoff', 'less admin'],
  'auto-data-entry': ['document handling', 'hours back', 'back-office wedge'],
  'manufacturing-tracker': ['inventory clarity', 'batch traceability', 'no ERP circus'],
  'healthcare-no-shows': ['SMS reminders', 'confirmation visibility', 'recovered slots']
};

const laneNotes = [
  {
    title: 'A different story per wedge',
    copy: 'Each page should feel native to the workflow it is selling, not like the same template wearing a new headline.'
  },
  {
    title: 'Shared funnel underneath',
    copy: 'Attribution, event capture, lead collection, and booking plumbing stay centralized so page differentiation does not create ops chaos.'
  },
  {
    title: 'Design benchmark now lives here',
    copy: 'The homepage becomes the reference for rhythm: more editorial, more intentional, and less card-grid default.'
  }
];

export default function HomePage() {
  const liveExperiments = Object.values(experiments);
  const flagshipPages = liveExperiments.slice(0, 3);

  return (
    <main className="home-shell home-redesign-shell">
      <section className="section home-hero-section home-benchmark-hero">
        <div className="container home-benchmark-grid">
          <div className="home-benchmark-copy">
            <div className="badge">AMVE landing system</div>
            <h1 className="home-title">Bespoke wedges up front. Shared conversion plumbing underneath.</h1>
            <p className="home-copy">
              This redesign turns the homepage into the benchmark for the rest of the surface: sharper hierarchy, more deliberate section rhythm,
              and a clearer distinction between custom market narratives and the shared system powering them.
            </p>
            <div className="hero-actions">
              <a href="#benchmark-pages"><Button asChild className="btn-primary">Browse benchmark pages</Button></a>
              <Link href="/hubspot-sequence-limit" className="btn-secondary">Open the HubSpot wedge</Link>
            </div>
            <div className="home-proof-row">
              <ProofPill>distinct heroes</ProofPill>
              <ProofPill>shared lead capture</ProofPill>
              <ProofPill>variant-ready routing</ProofPill>
              <ProofPill>booking + attribution intact</ProofPill>
            </div>
          </div>

          <SurfaceCard className="home-benchmark-system" tone="cool">
            <Eyebrow>System readout</Eyebrow>
            <div className="home-system-heading">
              <h2>One app layer supporting multiple market-specific stories.</h2>
              <p>The infrastructure stays reusable. The conversion surface stops looking reused.</p>
            </div>
            <div className="home-system-flow">
              <div>
                <span>01</span>
                <strong>Cold email or inbound source</strong>
                <p>Traffic lands on a page shaped around one narrow workflow problem.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Lead capture + booking intent</strong>
                <p>Shared forms, events, and booking hooks keep the funnel behavior stable.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Operational learning loop</strong>
                <p>Same tracking surface. Better creative range.</p>
              </div>
            </div>
            <div className="home-metric-strip home-metric-strip-3">
              <MetricTile value={liveExperiments.length} label="live pages" />
              <MetricTile value="1" label="shared funnel layer" />
              <MetricTile value="now" label="homepage benchmark reset" />
            </div>
          </SurfaceCard>
        </div>
      </section>

      <SectionFrame className="section-tight home-lane-section" tone="warm">
        <div className="container home-lane-layout">
          <div>
            <Eyebrow>Design direction</Eyebrow>
            <h2 className="section-title left">Shadcn as infrastructure, not the aesthetic.</h2>
            <p className="muted home-direction-copy">
              The primitives layer now exists to speed up consistent controls and shells. It does not decide the page composition,
              proof treatment, pacing, or metaphor. AMVE owns those.
            </p>
          </div>
          <div className="home-lane-notes">
            {laneNotes.map((item) => (
              <SurfaceCard key={item.title} className="home-note-card">
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SectionFrame>

      <section id="benchmark-pages" className="section-tight home-pages-benchmark">
        <div className="container">
          <div className="home-pages-header home-pages-header-benchmark">
            <div>
              <Eyebrow>Flagship pages</Eyebrow>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Current benchmark set</h2>
              <p className="muted home-pages-intro">Three wedges that show how the system can stretch without losing funnel consistency.</p>
            </div>
            <div className="badge">{liveExperiments.length} active surfaces</div>
          </div>

          <div className="home-flagship-grid">
            {flagshipPages.map((experiment, index) => (
              <Link key={experiment.id} href={`/${experiment.slug}`} className={`home-flagship-card ${homeThemes[experiment.slug] || ''}`.trim()}>
                <div className="home-card-topline">
                  <span className="eyebrow">0{index + 1} flagship</span>
                  <span className="mini-link">open ↗</span>
                </div>
                <h3>{experiment.pageTitle}</h3>
                <p>{experiment.summary}</p>
                <div className="home-card-rhythm">
                  <div><strong>Hero</strong><span>{(pageAngles[experiment.slug] || [])[0]}</span></div>
                  <div><strong>Mid-page</strong><span>{(pageAngles[experiment.slug] || [])[1]}</span></div>
                  <div><strong>Proof</strong><span>{(pageAngles[experiment.slug] || [])[2]}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SurfaceCard className="home-atlas-card">
            <div className="home-atlas-header">
              <div>
                <Eyebrow>Full atlas</Eyebrow>
                <h2 className="section-title left">All live surfaces, mapped by workflow pain.</h2>
              </div>
              <p className="muted">Still one app. No repeated stock marketing anatomy.</p>
            </div>
            <div className="home-card-grid home-card-grid-atlas">
              {liveExperiments.map((experiment) => (
                <Link key={experiment.id} href={`/${experiment.slug}`} className={`home-page-card home-page-card-atlas ${homeThemes[experiment.slug] || ''}`.trim()}>
                  <div className="home-card-topline">
                    <span className="eyebrow">{experiment.name}</span>
                    <span className="mini-link">view ↗</span>
                  </div>
                  <h3>{experiment.pageTitle}</h3>
                  <p>{experiment.summary}</p>
                  <div className="home-angle-list">
                    {(pageAngles[experiment.slug] || []).map((angle) => <span key={angle}>{angle}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </section>
    </main>
  );
}
