import { env } from './env.js';

const baseBookingUrl = env.defaultBookingUrl;

export const experiments = {
  'small-service-request-capture': {
    id: 'EXP-FORGE-001',
    pageId: 'PP-2026-03-09-04',
    slug: 'small-service-request-capture',
    name: 'Small Service Request Capture',
    summary: 'Stop losing customer requests across text, WhatsApp, email, forms, and DMs without buying bloated field-service software.',
    channel: 'cold_email',
    pageTitle: 'Stop losing customer requests across text, WhatsApp, email, and DMs',
    metaDescription: 'For small service crews: catch scattered customer requests before they disappear into callbacks, quotes, and missed revenue.',
    bookingUrl: process.env.SMALL_SERVICE_BOOKING_URL || baseBookingUrl,
    hero: {
      kicker: 'For 2–10 person service businesses juggling texts, WhatsApp, email, forms, and DMs',
      headline: 'Stop losing customer requests before they turn into lost revenue.',
      subheadline: 'A lightweight request-capture layer for small crews that need one reliable follow-up lane — not another giant CRM rollout.',
      reassurance: 'Built for small crews, not bloated FSM rollouts.'
    },
    socialProofBar: ['Works with the channels customers already use', 'Built for small crews, not bloated FSM rollouts', 'Tests two narrow promise variants in one shared shell'],
    proof: [
      '"the number one way I lost track of things is when clients message me on WhatsApp or text... and then it’s just... gone."',
      '"requests scattered across email, texts, forms, and DMs... creates constant background stress."',
      'Jobber and ServiceTitan repeatedly read as overkill and expensive for this first problem.'
    ],
    quote: {
      title: 'Operator signal',
      body: 'This is one of the biggest issues we have... Some text. Some email. Some call. Some through online services... I have not found an easy way to make sure none get lost in the shuffle.',
      source: 'Small service operator research'
    },
    faqs: [
      {
        question: 'Do customers need to change how they contact us?',
        answer: 'No. The story stays narrow on purpose: work with the texts, WhatsApp messages, calls, forms, and DMs customers already use.'
      },
      {
        question: 'Is this a full field-service platform or CRM?',
        answer: 'No. This is a first-fix reliability layer for lost requests, not dispatching, invoicing, route optimization, or a full business operating system.'
      },
      {
        question: 'Who is this for?',
        answer: 'Owner-operators and office admins at small local service businesses that still run inbound work through inboxes, chat apps, notes, and memory.'
      }
    ],
    variants: {
      A: {
        label: 'Capture-first safety net',
        headline: 'Stop losing customer requests in text, WhatsApp, and email.',
        subheadline: 'For small service crews who get work through scattered messages, forms, and DMs — turn buried requests into clear follow-up before they disappear into the rest of the day.',
        benefits: [
          'Catch requests from the channels customers already use',
          'Turn buried messages into follow-up you can trust',
          'See what still needs a callback, quote, or reply before revenue slips away'
        ],
        steps: [
          { title: 'Requests come in through the usual chaos', body: 'Text, WhatsApp, email, forms, calls, and DMs still arrive however customers prefer.' },
          { title: 'Each request becomes one visible next step', body: 'Instead of dying inside an inbox, the message becomes something the team can actually act on.' },
          { title: 'You catch the callback, quote, or reply in time', body: 'The value is simple: fewer dropped balls, fewer cold leads, less background stress.' }
        ]
      },
      B: {
        label: 'Lightweight request workflow',
        headline: 'A simpler workflow for customer requests, callbacks, and next steps.',
        subheadline: 'Bring scattered inbound work into one simple follow-up lane — without paying for heavyweight FSM software your small crew will never fully use.',
        benefits: [
          'Keep incoming requests and next steps together in one place',
          'Reduce the chaos across texts, emails, notes, and DMs',
          'Give your crew a workflow simple enough to use every day'
        ],
        steps: [
          { title: 'Pull inbound work into one simple queue', body: 'The page stays focused on requests and next actions, not on broad platform management.' },
          { title: 'Track who needs a callback, quote, or response', body: 'See what still matters today instead of relying on memory and inbox search.' },
          { title: 'Keep work moving without paper, spreadsheets, or CRM bloat', body: 'Enough system to stop losing work. Not a giant software project.' }
        ]
      }
    },
    form: {
      title: 'Get early access',
      description: 'Tell us where requests usually get lost. We’ll use that signal to shape the first reliability workflow for small crews.',
      submitLabel: 'Get early access',
      helperText: 'Low-friction waitlist for small service teams. No full-platform migration pitch.',
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'alex@smithplumbing.com' },
        { name: 'trade', label: 'Trade / business type', type: 'text', required: false, placeholder: 'Plumbing, roofing, HVAC…' },
        { name: 'team_size', label: 'Team size', type: 'select', required: false, options: ['1-2 people', '3-5 people', '6-10 people', '10+ people'] },
        { name: 'main_channel', label: 'Where do requests slip most?', type: 'select', required: false, options: ['Text / SMS', 'WhatsApp', 'Email', 'Calls', 'Website forms', 'Instagram / Facebook DMs', 'Multiple places'] },
        { name: 'notes', label: 'What usually slips through the cracks?', type: 'textarea', required: false, placeholder: 'Quotes, callbacks, invoice follow-up, weekend messages…' }
      ]
    }
  },
  'hubspot-sequence-limit': {
    id: 'EXP-FORGE-002',
    pageId: 'PP-2026-03-10-01',
    slug: 'hubspot-sequence-limit',
    name: 'HubSpot Sequence Workflow Fix',
    summary: 'Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind.',
    channel: 'cold_email',
    pageTitle: 'Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind',
    metaDescription: 'For HubSpot outbound teams: remove the repetitive 50-contact batching bottleneck without scripts or a second outbound stack.',
    bookingUrl: process.env.HUBSPOT_SEQUENCE_BOOKING_URL || baseBookingUrl,
    hero: {
      kicker: 'For sales ops, RevOps, and founder-led outbound teams already running in HubSpot',
      headline: 'Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind.',
      subheadline: 'A focused workflow fix for one recurring outbound bottleneck — campaign-sized enrollment without repetitive page-by-page batching, brittle scripts, or another outbound tool.',
      reassurance: 'No CRM migration. No extra busywork. Just saner sequence launch.'
    },
    socialProofBar: ['HubSpot-native wedge', 'Request marked not currently planned', 'Built for real outbound operators'],
    proof: [
      '"In reality, enrolment is manual and capped at 50 contacts at a time..."',
      '"I would like the ability to bulk enroll all 1,000 contacts in a sequence at once."',
      'HubSpot marked the request not currently planned, making the pain durable enough for a focused point solution.'
    ],
    quote: {
      title: 'Operator quote',
      body: 'i have to select all to 50 contacts, enroll, then select all to my next page of 50 contacts',
      source: 'HubSpot Community / user research'
    },
    faqs: [
      {
        question: 'Couldn’t we just script this?',
        answer: 'Some teams can. The point of the wedge is giving non-technical ops teams a cleaner recurring workflow than maintaining custom patches for a basic launch step.'
      },
      {
        question: 'Is this another outbound platform?',
        answer: 'No. It stays tightly scoped to one broken workflow inside HubSpot: bulk sequence enrollment.'
      },
      {
        question: 'What if HubSpot ships this later?',
        answer: 'Maybe eventually. Right now the request is explicitly not planned and teams still need a practical way to launch without the daily batching loop.'
      },
      {
        question: 'Who is this for?',
        answer: 'Ops-minded HubSpot users launching outbound often enough that the 50-contact cap is a recurring operational tax.'
      }
    ],
    variants: {
      A: {
        label: 'Ops efficiency',
        headline: 'Stop enrolling HubSpot sequence contacts 50 at a time.',
        subheadline: 'For HubSpot teams running real outbound campaigns: bulk enroll sequence contacts without repetitive batching, brittle scripts, or a second outbound stack.',
        benefits: [
          'Launch campaign-sized enrollments without repetitive 50-contact batches',
          'Keep outbound inside HubSpot without fragile workaround maintenance',
          'Give ops and founder-led teams a saner recurring enrollment workflow'
        ],
        steps: [
          { title: 'Choose the list you already built', body: 'The page does not broaden into sourcing, copy, or strategy. The list work is already done.' },
          { title: 'Run one clean bulk-enroll action', body: 'Skip the page-by-page loop and remove the repetitive 50-contact bottleneck.' },
          { title: 'Get the campaign moving faster', body: 'The win is straightforward: less launch drag inside the system you already pay for.' }
        ]
      }
    },
    form: {
      title: 'Get early access',
      description: 'If sequence batching is slowing down real outbound, join the waitlist and tell us how painful the launch loop is today.',
      submitLabel: 'Get early access',
      helperText: 'Built for teams already running outbound in HubSpot. No migration story.',
      fields: [
        { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'ops@company.com' },
        { name: 'role', label: 'Role', type: 'text', required: false, placeholder: 'Sales Ops, RevOps, founder…' },
        { name: 'volume', label: 'Typical enrollment volume', type: 'select', required: false, options: ['51-250 contacts', '251-1,000 contacts', '1,001-5,000 contacts', '5,000+ contacts'] },
        { name: 'notes', label: 'What breaks today?', type: 'textarea', required: false, placeholder: 'Manual batching, launch delays, brittle scripts…' }
      ]
    }
  },
  'scope-creep-guard': {
    id: 'EXP-FORGE-003',
    pageId: 'PP-2026-03-19-01',
    slug: 'scope-creep-guard',
    name: 'Scope Creep Guard',
    summary: 'Flag out-of-scope requests before they turn into unpaid work for freelance designers and small studios.',
    channel: 'cold_email',
    pageTitle: 'The scope guard your freelance CRM doesn’t have',
    metaDescription: 'For freelance designers and small studios using Dubsado, HoneyBook, or Bonsai: catch revision creep before it eats project profit.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For freelance designers and 2–5 person creative studios using Dubsado, HoneyBook, or Bonsai',
      headline: 'The scope guard your freelance CRM doesn’t have.',
      subheadline: 'Flag out-of-scope asks in live client messages before they turn into unpaid revisions, awkward conversations, and quietly disappearing project margin.',
      reassurance: 'Works with your current freelance CRM. Human stays in control.'
    },
    socialProofBar: ['57% of agencies lose $1K–$5K/mo to scope creep', 'Only 1% bill all out-of-scope work', 'Built for live project conversations, not PM sprawl'],
    proof: [
      '57% of agencies lose $1K–$5K per month to unbilled scope creep; 30% lose more than $5K.',
      '79% of creative agencies report working beyond scope for free.',
      'Freelance CRM tools handle proposals and invoices, but still miss the moment an extra ask actually arrives.'
    ],
    quote: {
      title: 'Designer signal',
      body: 'I’m bad at enforcing it... I usually let things slide, forget to remind people, or just keep going because it feels awkward to stop the flow and say “hey this is billable now.”',
      source: 'Freelance designer research'
    },
    faqs: [
      {
        question: 'I already use Dubsado, HoneyBook, or Bonsai. Why would I need this?',
        answer: 'Those tools handle the bookends well. The wedge here is the missing middle: live client requests, revisions, and extra asks that change the deal in real time.'
      },
      {
        question: 'Is this another PM tool?',
        answer: 'No. PM tools track work. This page is testing demand for something narrower: flagging when the work changed financially.'
      },
      {
        question: 'Is AI talking to clients for me?',
        answer: 'No. Keep the claim tight and human-in-the-loop. The job is surfacing scope drift and helping you respond with confidence — not auto-negotiating with clients.'
      }
    ],
    variants: {
      A: {
        label: 'Revenue protection',
        headline: 'Catch revision creep before it eats the profit from your project.',
        subheadline: 'For freelance designers and small studios: spot out-of-scope asks in live client messages before unpaid work quietly piles up.',
        benefits: [
          'Spot out-of-scope requests the moment they arrive',
          'Keep using your current proposal and invoicing stack',
          'Push back on extras with more confidence and less awkwardness'
        ],
        steps: [
          { title: 'Compare the new ask against the agreed scope', body: 'The value starts when the client says “can you just add one more thing?” — not weeks later during invoicing.' },
          { title: 'Flag what crossed the line', body: 'Get one clear signal that a revision, approval note, or Slack request now changes the financial shape of the project.' },
          { title: 'Respond before unpaid work piles up', body: 'Protect the relationship and the margin before the extra work becomes invisible labor.' }
        ]
      }
    },
    form: {
      title: 'Get early access',
      description: 'Tell us what usually turns into unpaid work. We’ll use that signal to shape the first scope-protection workflow for freelancers and tiny studios.',
      submitLabel: 'Get early access',
      helperText: 'Built for designers and small studios. Not another agency PM stack.',
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@studio.com' },
        { name: 'tool', label: 'Current freelance CRM / tool', type: 'select', required: false, options: ['Dubsado', 'HoneyBook', 'Bonsai', 'Other', 'None'] },
        { name: 'role', label: 'Role', type: 'text', required: false, placeholder: 'Freelance designer, studio owner…' },
        { name: 'notes', label: 'What usually turns into unpaid work?', type: 'textarea', required: false, placeholder: 'Extra revisions, Slack asks, approval changes, “quick” additions…' }
      ]
    }
  },
  'ai-payment-follow-up': {
    id: 'EXP-FORGE-004',
    pageId: 'PP-2026-03-20-01',
    slug: 'ai-payment-follow-up',
    name: 'AI Payment Follow-Up',
    summary: 'Thread-aware overdue invoice follow-up for freelancers and micro-agencies.',
    channel: 'cold_email',
    pageTitle: 'The overdue-invoice follow-up that reads the reply thread',
    metaDescription: 'For Gmail-based freelancers and micro-agencies: draft overdue invoice follow-ups from the real thread, keep the tone human, and stay in control.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For Gmail-based freelancers and micro-agencies chasing overdue invoices themselves',
      headline: 'The overdue-invoice follow-up that reads the reply thread.',
      subheadline: 'Draft the next overdue follow-up from the actual email conversation so you can keep payment moving without sounding robotic, needy, or rude.',
      reassurance: 'Gmail-native. Human-in-the-loop. No robotic auto-send claims.'
    },
    socialProofBar: ['85% of freelancers get paid late', 'Average wait is 39 days past due', 'Built for Gmail + QuickBooks / Wave / FreshBooks workflows'],
    proof: [
      '85% of freelancers get paid late, and the average wait is 39 days past due.',
      'Reminder-category tools prove WTP exists, but template logic still falls apart once the client replies with nuance.',
      'QuickBooks AI reminder backlash shows the market wants better execution, not just more automation.'
    ],
    quote: {
      title: 'Research signal',
      body: 'I nearly sent an overdue invoice reminder written in a completely inappropriate and unacceptable tone to a highly valued client, signed by my name!',
      source: 'QuickBooks community user'
    },
    faqs: [
      {
        question: 'I already have QuickBooks reminders. Why would I need this?',
        answer: 'The wedge is not generic reminders. It is thread-aware follow-up that uses the real reply context before drafting the next message.'
      },
      {
        question: 'Is this another template tool?',
        answer: 'No. The point is handling the moment after the client replies with delay, context, or excuses — where canned reminders fall apart.'
      },
      {
        question: 'Is AI sending risky emails for me?',
        answer: 'No. The human stays in control. The promise is drafting and prioritizing inside Gmail, not autonomous sending.'
      }
    ],
    variants: {
      A: {
        label: 'Thread-aware human follow-up',
        headline: 'Get paid without sounding like a bot begging for money.',
        subheadline: 'For freelancers and micro-agencies using Gmail, QuickBooks, Wave, or FreshBooks — draft overdue follow-ups from the real thread and keep the tone human.',
        benefits: [
          'Draft the next overdue follow-up from the actual email thread',
          'Keep the tone professional without sounding stiff or aggressive',
          'Focus on the invoices most likely to get resolved next'
        ],
        steps: [
          { title: 'See which overdue thread matters right now', body: 'Prioritize the follow-up that is most likely to move instead of staring at generic reminder queues.' },
          { title: 'Read the real context before drafting', body: 'Use the actual excuses, promises, questions, and delays instead of resetting to another canned reminder.' },
          { title: 'Send a human-sounding next move you still control', body: 'Keep the relationship intact while pushing the conversation toward payment.' }
        ]
      }
    },
    form: {
      title: 'Join the waitlist',
      description: 'Tell us what makes payment follow-up awkward today. We’ll use that signal to shape the first Gmail-native overdue follow-up workflow.',
      submitLabel: 'Join the waitlist',
      helperText: 'Built for freelancers and micro-agencies. No robotic send-and-pray reminders.',
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@studio.com' },
        { name: 'role', label: 'Role / business type', type: 'select', required: false, options: ['Freelancer', 'Solo service business', '2-5 person agency', 'Other small business'] },
        { name: 'notes', label: 'What is hardest about chasing payment?', type: 'textarea', required: false, placeholder: 'Writing the nudge, replying to excuses, keeping the tone right…' }
      ]
    }
  }
,
  'coach-accountable-ai': {
    id: 'EXP-FORGE-005',
    pageId: 'PP-2026-03-22-01',
    slug: 'coach-accountable-ai',
    name: 'Coach Back-Office AI for CoachAccountable',
    summary: 'Stop typing session recaps at 10pm. AI back-office for CoachAccountable.',
    channel: 'cold_email',
    pageTitle: 'Stop typing session recaps at 10pm | AI back-office for CoachAccountable',
    metaDescription: 'Session recaps, homework reminders, and next-session briefs — handled automatically inside CoachAccountable. No new CRM. No migration.',
    hero: {
      kicker: 'For coaches running 20+ clients/month on CoachAccountable',
      headline: 'You coached 8 clients today. Why are you still at your laptop at 10pm?',
      subheadline: 'Session recaps, homework reminders, and next-session briefs — handled automatically inside CoachAccountable.',
      reassurance: 'Works inside CoachAccountable — no migration needed.'
    },
    form: {
      title: 'Get early access',
      description: 'Join the waitlist for the AI back-office built specifically for CoachAccountable.',
      submitLabel: 'Get early access',
      fields: [{ name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@yourpractice.com' }],
    },
    socialProofBar: ['123K coaches worldwide (ICF)', 'CoachAccountable has a full REST API', 'Only 2 of 12+ coaching CRMs ship any AI'],
    proof: [
      '"She had 8 clients that week. Coaching done, energy spent — and there she was at 10pm, typing up recaps, sending homework reminders, chasing an invoice." — r/zerotosaas',
      '"I\'m trying to scale my practice, but the session summaries and prep are eating my life." — r/lifecoaching',
      '"30-60 minutes of paperwork per session adds up. For 20 clients a week, that\'s 20+ hours a month just on follow-up." — r/zerotosaas',
    ],
    quote: {
      title: 'Operator signal',
      body: '"Between client management, invoicing, scheduling, and marketing, it can feel like you\'re running a full-time admin department."',
      source: 'greatingreatout.com'
    },
    faqs: [
      { question: 'Do I have to switch CRMs?', answer: "No. That's exactly who this is for. You keep CoachAccountable — this adds AI on top. No migration." },
      { question: 'Is this another generic AI note-taker?', answer: "No. This reads directly from CoachAccountable — your coaching framework, your client goals, your homework assignments." },
      { question: 'How much will it cost?', answer: "Early access is free. We're building this with coaches, not selling to coaches (yet)." },
      { question: 'When can I try it?', answer: "We're onboarding early users now. CoachAccountable users get priority." },
    ],
    variants: {
      A: {
        headline: 'You coached 8 clients today. Why are you still at your laptop at 10pm?',
        subheadline: 'Session recaps, homework reminders, and next-session briefs — handled automatically inside CoachAccountable. No new CRM. No migration.',
        steps: [
          { title: 'Connect CoachAccountable', body: 'One-time setup, two minutes. Authorize and the AI starts reading your sessions.' },
          { title: 'Coach your sessions normally', body: 'The AI learns your framework, your voice, how you write recaps.' },
          { title: 'Everything appears automatically', body: 'Recaps in your voice. Homework reminders scheduled. Next-session brief prepped and waiting.' },
        ],
        benefits: [
          'Recaps written in your voice — you review, approve, done',
          'Homework and reminders sent without you lifting a finger',
          'Next session prepped in 60 seconds — notes, homework, goals ready',
        ],
      },
    },
  },
  'accounting-document-ai': {
    id: 'EXP-FORGE-006',
    pageId: 'PP-2026-03-22-02',
    slug: 'accounting-document-ai',
    name: 'AI Document Follow-Up for Karbon and Canopy',
    summary: 'AI follow-up that chases clients for missing documents — works with Karbon and Canopy.',
    channel: 'cold_email',
    pageTitle: '2 hours a day chasing documents your portal can\u2019t ask for',
    metaDescription: 'AI document follow-up for Karbon and Canopy. Reminds clients, tracks missing docs, routes to engagements. No migration.',
    hero: {
      kicker: 'For small accounting firms on Karbon or Canopy',
      headline: '2 hours a day chasing clients for documents your portal can\u2019t ask for.',
      subheadline: 'AI follow-up for Karbon and Canopy. No migration, no new portal.',
      reassurance: 'No migration. No new portal. Works with what you have.'
    },
    form: {
      title: 'Get Early Access',
      description: 'Join the waitlist for AI document follow-up that works with your existing Karbon or Canopy setup.',
      submitLabel: 'Get Early Access',
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@firm.com' },
        { name: 'portal', label: 'Portal', type: 'select', required: false, options: ['Karbon', 'Canopy', 'Other'] },
        { name: 'firm_size', label: 'Firm size', type: 'select', required: false, options: ['Solo', '2-5', '6-10'] },
      ],
    },
    proof: [
      '"Chasing clients for documents" is the #2 challenge for firm owners — Financial Cents 2023 survey of 132 firms.',
      '"288 hours saved in just one tax season" by improving document collection — Glasscubes customer (TaxAssist Accountants).',
      '79% of firms without cloud work management spend 1-3 hours daily on manual document work — Xero study.',
    ],
    faqs: [
      { question: 'Does this replace Karbon or Canopy?', answer: "No. It sits on top of your existing portal and handles the follow-up workflow they don't cover." },
      { question: 'What about SmartRequestAI?', answer: "SmartRequestAI only works on SmartVault. If you're on Karbon or Canopy, it doesn't help you." },
      { question: 'We only need this during tax season.', answer: "Document chasing is year-round: monthly close, quarterly payroll, ongoing bookkeeping." },
      { question: 'How is this different from hiring a VA?', answer: "VAs cost $1,000-3,000/month and need retraining every season. This runs 24/7." },
    ],
    variants: {
      A: {
        headline: '2 hours a day chasing clients for documents your portal can\u2019t ask for.',
        subheadline: 'AI follow-up for Karbon and Canopy. No migration, no new portal.',
      },
    },
  },
};

export function getExperiment(slug) {
  return experiments[slug] || null;
}
