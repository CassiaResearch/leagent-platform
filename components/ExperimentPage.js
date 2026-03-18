'use client';

import LeadCaptureForm, { useExperimentTracking } from './LeadCaptureForm';
import { SurfaceCard } from './amve/surfaces';

function HeroActions({ track, primaryLabel = 'Book a walkthrough', secondaryLabel = 'See the workflow' }) {
  return (
    <div className="hero-actions">
      <a href="#booking" className="btn-primary" onClick={() => track('cta_click', { cta_location: 'hero', cta_copy: primaryLabel })}>{primaryLabel}</a>
      <a href="#how-it-works" className="btn-secondary">{secondaryLabel}</a>
    </div>
  );
}

function SharedFaqs({ experiment }) {
  if (!experiment.faqs?.length) return null;

  return (
    <section className="section-tight">
      <div className="container">
        <div className="eyebrow">FAQ</div>
        <h2 className="section-title">Short answers to the obvious questions.</h2>
        <div className="faq-list">
          {experiment.faqs.map((item, index) => (
            <details key={item.question} className="card faq-card" open={index === 0}>
              <summary>{item.question}</summary>
              <p className="muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofRail({ items, className = '' }) {
  return (
    <div className={`compact-proof-grid ${className}`.trim()}>
      {items.map((item) => <div key={item} className="card compact-proof">{item}</div>)}
    </div>
  );
}

function Steps({ steps, title, eyebrow = 'How it works', className = '' }) {
  return (
    <section id="how-it-works" className={`section-tight ${className}`.trim()}>
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={step.title} className="card step-card">
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

function SignalChecklist({ title, eyebrow, items, className = '' }) {
  return (
    <div className={`card signal-card ${className}`.trim()}>
      <div className="eyebrow">{eyebrow}</div>
      <h3>{title}</h3>
      <ul className="signal-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function SmallServicePage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-service page-shell">
      <section className="section">
        <div className="container hero-shell two-column service-hero-grid">
          <div>
            <div className="eyebrow">For 2–10 person service businesses</div>
            <h1 className="display-title">Never lose a text, WhatsApp, email, or DM lead again.</h1>
            <p className="hero-copy">A lightweight request-capture layer for small crews that win work through scattered messages, not through a giant field-service rollout.</p>
            <p className="hero-reassurance">The promise stays narrow: keep the next action visible before the day gets messy.</p>
            <HeroActions track={track} primaryLabel="Get early access" secondaryLabel="See the capture flow" />
          </div>

          <div className="card visual-card service-visual-card">
            <div className="flow-label-row">
              <span className="eyebrow">Scattered inbound</span>
              <span className="eyebrow">Clear next step</span>
            </div>
            <div className="service-visual-layout">
              <div className="message-cluster">
                <span className="message-chip">Text</span>
                <span className="message-chip">WhatsApp</span>
                <span className="message-chip">Email</span>
                <span className="message-chip">Instagram DM</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="task-card service-task-card">
                <strong>Today’s follow-up queue</strong>
                <span>Call back before 3pm</span>
                <span>Send quote for kitchen leak</span>
                <span>Reply to weekend DM</span>
              </div>
            </div>
            <div className="metric-strip">
              <div><strong>Less inbox hunting</strong><span>one visible queue</span></div>
              <div><strong>Less dropped work</strong><span>callbacks + quotes surfaced</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container service-rhythm-grid">
          <SignalChecklist eyebrow="Where it breaks" title="The failure point is usually tiny and constant." items={experiment.proof} />
          <div className="service-day-strip">
            <div className="eyebrow">A normal day</div>
            <div className="service-timeline">
              <div className="service-time-card"><strong>8:12</strong><span>customer texts while you’re on the road</span></div>
              <div className="service-time-card"><strong>11:40</strong><span>callback gets buried under job updates</span></div>
              <div className="service-time-card accent"><strong>4:55</strong><span>quote was never sent</span></div>
            </div>
          </div>
        </div>
      </section>

      <Steps steps={variantData.steps} title="A first fix for the part that keeps slipping through the cracks." />

      <section className="section-tight">
        <div className="container two-column split-balance service-bottom-grid">
          <div className="card content-card soft-card">
            <div className="eyebrow">What gets better</div>
            <ul className="benefit-list clean-list">
              {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
          <div className="quote-panel service-quote-panel">
            <div className="eyebrow">Why this feels real</div>
            <blockquote className="quote-block">“I read the message while I’m driving or in the middle of something, and then it’s just gone.”</blockquote>
            <p className="muted quote-note">That’s the exact failure point this page is testing — not a bigger service-business platform pitch.</p>
          </div>
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        title="Get early access"
        description="Join the waitlist for a simpler way to stop losing customer requests across texts, email, WhatsApp, and DMs."
        submitLabel="Get early access"
        successMessage="You’re on the early-access list. We’ll share updates as this workflow opens up."
        aside={<div className="aside-note"><strong>Good fit:</strong><ul><li>small crews juggling inbound from multiple channels</li><li>owners or office admins tired of mental follow-up tracking</li><li>teams that want a lighter first fix than Jobber or ServiceTitan</li></ul></div>}
      />
    </main>
  );
}

function HubspotPage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-hubspot page-shell">
      <section className="section">
        <div className="container hero-shell two-column hubspot-shell">
          <div>
            <div className="eyebrow">For sales ops, RevOps, and founder-led HubSpot teams</div>
            <h1 className="display-title">Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind.</h1>
            <p className="hero-copy">Launch campaign-sized sequence enrollments without repetitive page-by-page batching, brittle scripts, or more tool sprawl.</p>
            <p className="hero-reassurance">No CRM migration. No extra outbound stack. Just a fix for one stubborn workflow tax.</p>
            <HeroActions track={track} primaryLabel="Get early access" secondaryLabel="See the bulk-enroll flow" />
            <div className="hubspot-launch-strip">
              <div><strong>List ready</strong><span>segmentation already done</span></div>
              <div><strong>Ops delay</strong><span>manual batch loop starts</span></div>
              <div><strong>Desired motion</strong><span>launch once and move on</span></div>
            </div>
          </div>

          <SurfaceCard className="card visual-card hubspot-visual hubspot-stage-card hubspot-benchmark-card" tone="cool">
            <div className="flow-label-row">
              <span className="eyebrow">Current reality</span>
              <span className="eyebrow">Focused fix</span>
            </div>
            <div className="hubspot-flow">
              <div className="batch-stack">
                <span>50</span>
                <span>50</span>
                <span>50</span>
                <span>50</span>
              </div>
              <div className="flow-arrow">→</div>
              <div className="task-card slate">
                <strong>Bulk enroll once</strong>
                <span>Campaign-sized lists</span>
                <span>No repeat batching</span>
              </div>
            </div>
            <div className="mini-kpi-row">
              <div className="mini-kpi"><strong>Ops drag</strong><span>manual loops every launch</span></div>
              <div className="mini-kpi"><strong>Desired state</strong><span>one workflow inside HubSpot</span></div>
            </div>
            <div className="hubspot-progress-rail">
              <span className="active">select list</span>
              <span className="active">choose sequence</span>
              <span className="active">enroll all</span>
              <span>done</span>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="section-tight">
        <div className="container hubspot-rhythm-grid">
          <div className="hubspot-fact-stack">
            <SurfaceCard className="hubspot-fact-card card hubspot-fact-card-accent"><span className="hubspot-fact-number">50</span><p>native contacts per enrollment batch</p></SurfaceCard>
            <SurfaceCard className="hubspot-fact-card card hubspot-fact-card-accent"><span className="hubspot-fact-number">4×</span><p>repeat loops for a modest 200-contact launch</p></SurfaceCard>
            <SurfaceCard className="hubspot-fact-card card hubspot-fact-card-accent"><span className="hubspot-fact-number">0</span><p>desire to add another outbound tool just to patch this</p></SurfaceCard>
          </div>
          <div className="card content-card soft-card hubspot-ops-card">
            <div className="eyebrow">Broken current workflow</div>
            <h2 className="section-title left">Normal campaign volume keeps turning into repetitive ops labor.</h2>
            <ul className="benefit-list clean-list">
              <li>Real outbound lists routinely exceed the native 50-contact batch cap.</li>
              <li>Teams keep repeating the same page-by-page enrollment loop just to launch one campaign.</li>
              <li>HubSpot has marked the request not currently planned, so the workaround pain is sticking around.</li>
            </ul>
          </div>
        </div>
      </section>

      <Steps steps={variantData.steps} title="A tighter workflow for teams already living in HubSpot." />

      <section className="section-tight">
        <div className="container two-column split-balance">
          <div className="quote-panel light hubspot-quote-card">
            <div className="eyebrow">Research signal</div>
            <blockquote className="quote-block dark">“Enrolment is manual and capped at 50 contacts at a time, making large-scale outbound impractical.”</blockquote>
          </div>
          <ProofRail items={variantData.benefits} className="hubspot-proof-grid" />
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        theme="light"
        title="Get early access"
        description="Join the waitlist for a simpler way to bulk enroll HubSpot sequence contacts without the manual batching loop."
        submitLabel="Get early access"
        successMessage="You’re on the list. We’ll share early access updates for the HubSpot workflow fix."
        aside={<div className="aside-note light"><strong>Best fit:</strong><ul><li>HubSpot teams launching outbound often enough that batching is a recurring tax</li><li>ops-minded teams that do not want brittle scripts</li><li>founder-led or RevOps-led teams who want a focused fix, not another platform</li></ul></div>}
      />
    </main>
  );
}

function LinkedInPage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-linkedin page-shell">
      <section className="section hero-band hero-band-linkedin">
        <div className="container hero-shell linkedin-hero-layout">
          <div className="linkedin-copy-stack">
            <div className="eyebrow">For reps prospecting in LinkedIn and updating HubSpot later</div>
            <h1 className="display-title">Sync LinkedIn Sales Navigator into HubSpot without copy-paste.</h1>
            <p className="hero-copy">A one-click handoff from prospecting to CRM records — so reps stop recreating work they already did in LinkedIn.</p>
            <p className="hero-reassurance">This is not a CRM replacement. It is a cleaner bridge between two tools your team already uses.</p>
            <HeroActions track={track} primaryLabel="Book a walkthrough" secondaryLabel="See the sync path" />
          </div>
          <div className="linkedin-board">
            <div className="linkedin-board-topline">
              <span>Prospecting context in</span>
              <span>Clean CRM record out</span>
            </div>
            <div className="linkedin-pane source">
              <div className="pane-label">Sales Navigator</div>
              <strong>Saved lead</strong>
              <span>VP Revenue Operations</span>
              <span>Acme Industrial</span>
              <span>Recent post activity</span>
            </div>
            <div className="sync-connector">sync</div>
            <div className="linkedin-pane target">
              <div className="pane-label">HubSpot</div>
              <strong>Contact created</strong>
              <span>Company attached</span>
              <span>Owner assigned</span>
              <span>Rep keeps moving</span>
            </div>
            <div className="linkedin-proof-ribbon">
              <span>less duplicate entry</span>
              <span>faster rep handoff</span>
              <span>cleaner CRM hygiene</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container linkedin-rhythm-grid">
          <div className="card problem-strip-card linkedin-problem-card">
            <div className="eyebrow">The current tax</div>
            <h2 className="section-title left">Reps prospect in one place and rebuild the same record somewhere else.</h2>
            <p className="muted">That split is small enough to sound boring and expensive enough to waste hours every week.</p>
          </div>
          <div className="linkedin-shift-card card">
            <div className="eyebrow">After the handoff</div>
            <div className="linkedin-shift-grid">
              <div><strong>Prospecting</strong><span>keep moving in Sales Navigator</span></div>
              <div><strong>CRM hygiene</strong><span>clean records arrive without the second pass</span></div>
              <div><strong>Rep time</strong><span>stays on outreach, not admin cleanup</span></div>
            </div>
          </div>
        </div>
      </section>

      <Steps steps={variantData.steps} title="A direct handoff from research to clean CRM records." className="linkedin-steps" />

      <section className="section-tight">
        <div className="container two-column split-balance">
          <div className="quote-panel linkedin-quote-panel">
            <div className="eyebrow">Research signal</div>
            <blockquote className="quote-block dark">{experiment.quote.body}</blockquote>
            <p className="muted quote-note">{experiment.quote.source}</p>
          </div>
          <div>
            <ProofRail items={experiment.proof} className="three-up-tight linkedin-proof-tight" />
            <div className="card content-card linkedin-value-card">
              <div className="eyebrow">What gets better</div>
              <ul className="benefit-list clean-list">
                {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        mode="booking"
        title={experiment.form.title}
        description={experiment.form.description}
        submitLabel={experiment.form.submitLabel || 'Book a 30-minute demo'}
        successMessage={experiment.form.successMessage || 'Opening the calendar…'}
        aside={<div className="aside-note"><strong>Best fit:</strong><ul><li>teams working in Sales Navigator daily</li><li>HubSpot users feeling duplicate admin work</li><li>sales or RevOps leaders trying to keep prospect data cleaner</li></ul></div>}
      />
    </main>
  );
}

function AutoDataEntryPage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-data-entry page-shell">
      <section className="section">
        <div className="container hero-shell data-entry-hero">
          <div className="data-entry-intro">
            <div className="eyebrow">For operators buried under invoices, PDFs, and spreadsheets</div>
            <h1 className="display-title">Stop spending hours on manual data entry.</h1>
            <p className="hero-copy">Automate invoice sorting, PDF extraction, and spreadsheet updates without turning this into a heavyweight back-office rebuild.</p>
            <p className="hero-reassurance">The promise is immediate time-back, not an ERP story in disguise.</p>
            <HeroActions track={track} primaryLabel="Book a walkthrough" secondaryLabel="See the document flow" />
          </div>
          <div className="data-entry-visual">
            <div className="paper-stack">
              <div className="paper-card skew-a">Invoice.pdf</div>
              <div className="paper-card skew-b">Vendor receipt</div>
              <div className="paper-card skew-c">Order form</div>
            </div>
            <div className="data-lane">
              <div className="lane-pill">Extract fields</div>
              <div className="lane-pill">Sort documents</div>
              <div className="lane-pill">Update sheet</div>
            </div>
            <div className="data-entry-meter">
              <span>Inbox pile</span>
              <div className="data-entry-meter-bar"><strong /></div>
              <span>Structured data out</span>
            </div>
            <div className="results-card">
              <strong>Manual work removed</strong>
              <span>less copy-paste</span>
              <span>fewer spreadsheet updates by hand</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container data-entry-rhythm-grid">
          <div className="ledger-card workflow-ledger">
            <div className="eyebrow">What this fixes</div>
            <ul className="tight-list">
              {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
          <div className="ops-board card">
            <div className="eyebrow">Manual work before</div>
            <div className="ops-board-list">
              <div><strong>Open PDF</strong><span>find totals and vendor</span></div>
              <div><strong>Copy fields</strong><span>paste into sheet or system</span></div>
              <div><strong>Re-check errors</strong><span>fix typos later</span></div>
            </div>
          </div>
          <div className="ledger-card muted-ledger data-entry-quote-card">
            <div className="eyebrow">Why people care</div>
            <blockquote className="ledger-quote">{experiment.quote.body}</blockquote>
            <p className="muted" style={{ marginBottom: 0 }}>{experiment.quote.source}</p>
          </div>
        </div>
      </section>

      <Steps steps={variantData.steps} title="A practical document-to-data workflow for repetitive admin work." />

      <section className="section-tight">
        <div className="container">
          <ProofRail items={experiment.proof} className="data-proof-grid" />
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        mode="booking"
        title={experiment.form.title}
        description={experiment.form.description}
        submitLabel={experiment.form.submitLabel || 'Book a 30-minute demo'}
        successMessage={experiment.form.successMessage || 'Opening the calendar…'}
        aside={<div className="aside-note"><strong>Typical fit:</strong><ul><li>ops or finance-adjacent teams stuck doing repetitive document work</li><li>spreadsheet-heavy workflows with clean downstream destinations</li><li>businesses that need relief now, not a big systems project</li></ul></div>}
      />
    </main>
  );
}

function ManufacturingPage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-manufacturing page-shell">
      <section className="section hero-band hero-band-manufacturing">
        <div className="container hero-shell manufacturing-hero-grid">
          <div>
            <div className="eyebrow">For small shops that outgrew spreadsheets</div>
            <h1 className="display-title">Stop losing money to spreadsheet chaos.</h1>
            <p className="hero-copy">Simple inventory and production tracking for smaller manufacturers that need visibility without an ERP implementation circus.</p>
            <p className="hero-reassurance">Designed for clarity before enterprise complexity.</p>
            <HeroActions track={track} primaryLabel="Book a walkthrough" secondaryLabel="See the shop-floor flow" />
          </div>
          <div className="manufacturing-diagram card">
            <div className="manufacturing-console-bar">
              <span>shop floor</span>
              <span>inventory</span>
              <span>batch costing</span>
            </div>
            <div className="diagram-row">
              <div className="diagram-block">Materials in</div>
              <div className="diagram-block accent">Batch run</div>
              <div className="diagram-block">Finished output</div>
            </div>
            <div className="diagram-rail" />
            <div className="diagram-notes">
              <span>Inventory stays aligned</span>
              <span>Usage gets traced</span>
              <span>Costs stop getting fuzzy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container manufacturing-grid-layout">
          <div className="manufacturing-stat-band">
            {experiment.proof.map((item) => <div key={item} className="stat-chip">{item}</div>)}
          </div>
          <div className="shop-floor-card card">
            <div className="eyebrow">What operators need</div>
            <div className="shop-floor-metrics">
              <div><strong>Inventory</strong><span>what is actually on hand</span></div>
              <div><strong>Batches</strong><span>what used what</span></div>
              <div><strong>Costs</strong><span>where margin drift begins</span></div>
            </div>
          </div>
        </div>
      </section>

      <Steps steps={variantData.steps} title="A smaller-system workflow for inventory, batches, and cost visibility." />

      <section className="section-tight">
        <div className="container two-column split-balance">
          <div className="card content-card soft-card">
            <div className="eyebrow">What gets better</div>
            <ul className="benefit-list clean-list">
              {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
          <div className="quote-panel manufacturing-quote">
            <div className="eyebrow">Operator quote</div>
            <blockquote className="quote-block">{experiment.quote.body}</blockquote>
            <p className="muted quote-note">{experiment.quote.source}</p>
          </div>
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        mode="booking"
        title={experiment.form.title}
        description={experiment.form.description}
        submitLabel={experiment.form.submitLabel || 'Book a 30-minute demo'}
        successMessage={experiment.form.successMessage || 'Opening the calendar…'}
        aside={<div className="aside-note"><strong>Good fit:</strong><ul><li>smaller manufacturers not ready for a full ERP rollout</li><li>teams tracking materials, batches, and production in spreadsheets today</li><li>operators who need clearer inventory visibility fast</li></ul></div>}
      />
    </main>
  );
}

function HealthcarePage({ experiment, variant, attribution }) {
  const variantData = experiment.variants[variant];
  const { track } = useExperimentTracking(experiment, variant, attribution);

  return (
    <main className="theme-healthcare page-shell">
      <section className="section healthcare-hero-shell">
        <div className="container hero-shell two-column healthcare-grid">
          <div>
            <div className="eyebrow">For practices losing money to empty slots</div>
            <h1 className="display-title">Reduce appointment no-shows without adding more admin work.</h1>
            <p className="hero-copy">A reminder and confirmation workflow built around how patients actually respond: text, not voicemail roulette.</p>
            <p className="hero-reassurance">Designed to recover revenue and capacity without turning the front desk into a phone tree.</p>
            <HeroActions track={track} primaryLabel="Book a walkthrough" secondaryLabel="See the reminder flow" />
          </div>
          <div className="healthcare-visual card">
            <div className="healthcare-recovery-strip">
              <div><strong>Booked</strong><span>tomorrow&apos;s schedule loaded</span></div>
              <div><strong>Confirmed</strong><span>patients text back fast</span></div>
              <div><strong>Recovered</strong><span>reschedule signals arrive early</span></div>
            </div>
            <div className="phone-shell">
              <div className="phone-header">Patient reminder</div>
              <div className="sms-bubble outgoing">Reminder: appointment tomorrow at 10:00am. Reply C to confirm.</div>
              <div className="sms-bubble incoming">C</div>
              <div className="sms-bubble outgoing muted-bubble">Great — you’re confirmed.</div>
            </div>
            <div className="healthcare-side-notes">
              <span>fewer empty slots</span>
              <span>less voicemail chasing</span>
              <span>clearer reschedule signals</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container healthcare-rhythm-grid">
          <div className="healthcare-status-board card">
            <div className="eyebrow">Tomorrow’s schedule</div>
            <div className="status-slot confirmed"><strong>9:00</strong><span>confirmed by text</span></div>
            <div className="status-slot pending"><strong>10:30</strong><span>waiting on reply</span></div>
            <div className="status-slot reschedule"><strong>1:15</strong><span>asked to reschedule</span></div>
          </div>
          <ProofRail items={experiment.proof} className="healthcare-proof-grid" />
        </div>
      </section>

      <Steps steps={variantData.steps} title="A reminder flow built for confirmation and reschedule intent, not phone-tag." />

      <section className="section-tight">
        <div className="container two-column split-balance">
          <div className="quote-panel healthcare-quote-panel">
            <div className="eyebrow">Research signal</div>
            <blockquote className="quote-block">{experiment.quote.body}</blockquote>
            <p className="muted quote-note">{experiment.quote.source}</p>
          </div>
          <div className="card content-card healthcare-card">
            <div className="eyebrow">What gets better</div>
            <ul className="benefit-list clean-list">
              {variantData.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <SharedFaqs experiment={experiment} />

      <LeadCaptureForm
        experiment={experiment}
        variant={variant}
        attribution={attribution}
        mode="booking"
        title={experiment.form.title}
        description={experiment.form.description}
        submitLabel={experiment.form.submitLabel || 'Book a 30-minute demo'}
        successMessage={experiment.form.successMessage || 'Opening the calendar…'}
        aside={<div className="aside-note"><strong>Likely fit:</strong><ul><li>practices feeling real revenue loss from no-shows</li><li>teams still relying on calls or voicemail reminders</li><li>operations leads who want confirmation visibility without more front-desk work</li></ul></div>}
      />
    </main>
  );
}

export default function ExperimentPage({ experiment, variant, attribution }) {
  if (experiment.slug === 'small-service-request-capture') return <SmallServicePage experiment={experiment} variant={variant} attribution={attribution} />;
  if (experiment.slug === 'hubspot-sequence-limit') return <HubspotPage experiment={experiment} variant={variant} attribution={attribution} />;
  if (experiment.slug === 'linkedin-crm-sync') return <LinkedInPage experiment={experiment} variant={variant} attribution={attribution} />;
  if (experiment.slug === 'auto-data-entry') return <AutoDataEntryPage experiment={experiment} variant={variant} attribution={attribution} />;
  if (experiment.slug === 'manufacturing-tracker') return <ManufacturingPage experiment={experiment} variant={variant} attribution={attribution} />;
  if (experiment.slug === 'healthcare-no-shows') return <HealthcarePage experiment={experiment} variant={variant} attribution={attribution} />;

  return null;
}
