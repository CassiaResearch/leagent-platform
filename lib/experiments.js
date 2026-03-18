import { env } from './env.js';

const baseBookingUrl = env.defaultBookingUrl;

export const experiments = {
  'small-service-request-capture': {
    id: 'EXP-BLOOM-001',
    slug: 'small-service-request-capture',
    name: 'Small Service Request Capture',
    summary: 'Stop losing customer requests across text, WhatsApp, email, forms, and DMs.',
    channel: 'cold_email',
    pageTitle: 'Stop losing customer requests across text, email, and DMs',
    metaDescription: 'A simple way for small service businesses to stop losing quotes, callbacks, and follow-ups across text, WhatsApp, email, forms, and DMs.',
    bookingUrl: process.env.SMALL_SERVICE_BOOKING_URL || baseBookingUrl,
    hero: {
      kicker: 'For 2–10 person service businesses juggling texts, WhatsApp, email, forms, and DMs',
      headline: 'Stop losing customer requests before they turn into lost revenue.',
      subheadline: 'A lightweight request-capture layer for small service crews — built to get buried callbacks, quotes, and follow-ups back into view.',
      reassurance: 'Not a full CRM rollout. Just the missing layer between incoming messages and the next action.'
    },
    socialProofBar: ['Built for small crews, not bloated CRM rollouts', 'No complicated setup story', 'Controlled messaging test'],
    proof: [
      'Requests are scattered across text, WhatsApp, email, forms, and DMs.',
      'Small crews read messages while on the job, then lose the next step.',
      'Heavy field-service systems feel expensive and overbuilt for this first problem.'
    ],
    quote: {
      title: 'Research signal',
      body: 'The number one way I lost track of things is when clients message me on WhatsApp or text... I read it, I am driving or in the middle of something, and then it is just gone.',
      source: 'Small-business operator research'
    },
    faqs: [
      {
        question: 'Do I need to switch how customers contact me?',
        answer: 'No. This is built around the texts, WhatsApp messages, emails, forms, and DMs you already get.'
      },
      {
        question: 'Is this a full CRM or field-service platform?',
        answer: 'No. The promise stays narrow on purpose: stop losing inbound work first.'
      },
      {
        question: 'Who is this built for?',
        answer: 'Small service businesses with roughly 2–10 people or 1–3 crews that still run intake through personal inboxes, paper, notes, and lightweight workarounds.'
      }
    ],
    variants: {
      A: {
        label: 'Capture-first triage',
        benefits: [
          'Capture new requests from the channels you already use',
          'Turn buried messages into clear follow-up tasks',
          'See what still needs a callback, quote, or reply'
        ],
        steps: [
          { title: 'Requests keep coming through normal channels', body: 'No behavior change required from customers.' },
          { title: 'The request becomes one visible next step', body: 'Instead of staying buried in an inbox, it gets promoted into action.' },
          { title: 'You catch follow-up before it disappears', body: 'Quotes, callbacks, and replies stay visible while the day gets messy.' }
        ],
        values: [
          { title: 'Fix the exact point of failure', body: 'The problem is usually not lead gen. It is losing the next action after the message arrives.' },
          { title: 'Keep customer behavior unchanged', body: 'Customers can still text, email, or DM however they want.' },
          { title: 'Stay light', body: 'Built for small crews that do not want a heavyweight rollout.' }
        ]
      },
      B: {
        label: 'Lightweight all-in-one workflow',
        benefits: [
          'Keep requests and follow-up together in one flow',
          'Reduce bouncing across notes and inboxes',
          'Give the team enough structure without overbuilding'
        ],
        steps: [
          { title: 'Bring inbound work into one lightweight view', body: 'Instead of hunting through threads, see the active work in one place.' },
          { title: 'Track callbacks, quotes, and next steps', body: 'The team stays aligned on what still needs action.' },
          { title: 'Run a tighter day without full FSM software', body: 'Useful structure, minus the enterprise overhead.' }
        ],
        values: [
          { title: 'One home for the next action', body: 'You do not need to centralize every operation, only the fragile handoff.' },
          { title: 'Less operational scatter', body: 'Reduce the constant mental tax from messages living everywhere.' },
          { title: 'Enough system, not too much system', body: 'The page tests demand for a narrow operational win.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'Tell us how requests usually get lost. Then book time if this problem is real for your team.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Alex Smith' },
        { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'alex@company.com' },
        { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Smith Plumbing' },
        { name: 'role', label: 'Role', type: 'text', required: false, placeholder: 'Owner / operator' },
        { name: 'team_size', label: 'Team size', type: 'select', options: ['1-2 people', '3-5 people', '6-10 people', '10+ people'] },
        { name: 'main_channel', label: 'Where do requests get lost most?', type: 'select', options: ['Text / SMS', 'WhatsApp', 'Email', 'Website forms', 'Instagram / Facebook DMs', 'Multiple places'] },
        { name: 'notes', label: 'What usually slips through the cracks?', type: 'textarea', required: false, placeholder: 'Quotes, callbacks, invoice follow-ups, messages read while driving...' }
      ]
    }
  },
  'hubspot-sequence-limit': {
    id: 'EXP-BLOOM-002',
    slug: 'hubspot-sequence-limit',
    name: 'HubSpot Sequence Workflow Fix',
    summary: 'Bulk enroll sequence contacts without the 50-at-a-time grind.',
    channel: 'cold_email',
    pageTitle: 'Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind',
    metaDescription: 'A focused workflow layer for teams stuck doing repetitive 50-contact HubSpot sequence batches.',
    bookingUrl: process.env.HUBSPOT_SEQUENCE_BOOKING_URL || baseBookingUrl,
    hero: {
      kicker: 'Built for sales ops, RevOps, and founder-led outbound teams using HubSpot',
      headline: 'Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind.',
      subheadline: 'A focused workflow layer for one stubborn outbound bottleneck.',
      reassurance: 'No CRM migration. No extra busywork. Just faster campaign launch.'
    },
    socialProofBar: ['Stay inside HubSpot', 'No extra outbound stack', 'Known workflow pain'],
    proof: [
      'HubSpot users explicitly ask to enroll 1,000+ contacts at once.',
      'Operators describe repetitive batching as making large-scale outbound impractical.',
      'The native request is not currently planned, so the workaround pain is durable.'
    ],
    quote: {
      title: 'Operator quote',
      body: 'Sequences was sold to me as a way of automating emailing for a list of contacts... In reality, enrolment is manual and capped at 50 contacts at a time, making large scale outbound impractical.',
      source: 'Trustpilot review cited in discovery'
    },
    faqs: [
      {
        question: 'Couldn’t we just script this?',
        answer: 'Some teams can, but the point here is giving ops teams a less brittle fix than maintaining custom workflow patches for a recurring job.'
      },
      {
        question: 'Is this another outbound platform?',
        answer: 'No. The page is testing demand for one focused workflow fix inside HubSpot: bulk sequence enrollment without repetitive manual batching.'
      },
      {
        question: 'What if HubSpot eventually ships it?',
        answer: 'Maybe later. Right now the request is marked not currently planned, and teams still need a practical way to run outbound without the daily click loop.'
      },
      {
        question: 'Who is this for?',
        answer: 'Sales ops, RevOps, and founder-led outbound teams using HubSpot often enough that sequence batching is a recurring operational drag.'
      }
    ],
    variants: {
      A: {
        label: 'Ops efficiency',
        benefits: [
          'Launch campaign-sized sequence enrollments without manual batching',
          'Stay inside HubSpot without adding another outbound stack',
          'Reduce repetitive ops work'
        ],
        steps: [
          { title: 'Select the HubSpot contacts you need', body: 'Use the list you already built.' },
          { title: 'Bulk enroll through one workflow', body: 'Skip page-by-page 50-contact loops.' },
          { title: 'Keep campaigns moving', body: 'Launch recurring outbound faster and with less friction.' }
        ],
        values: [
          { title: 'Less repetitive ops work', body: 'Turn campaign launch back into one operational step.' },
          { title: 'Less tool sprawl', body: 'Solve the bottleneck without adopting a full new outbound suite.' },
          { title: 'More campaign reliability', body: 'Avoid brittle scripts and manual routines.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'If HubSpot sequence enrollment is slowing down real outbound, book time and we’ll walk through the workflow fix.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'volume', label: 'Typical enrollment volume', type: 'select', options: ['51-250 contacts', '251-1,000 contacts', '1,001-5,000 contacts', '5,000+ contacts'] },
        { name: 'notes', label: 'What breaks today?', type: 'textarea', placeholder: 'Manual batching, campaign launch delays, brittle scripts...' }
      ]
    }
  },
  'linkedin-crm-sync': {
    id: 'EXP-BLOOM-003',
    slug: 'linkedin-crm-sync',
    name: 'LinkedIn Sales Nav → CRM',
    summary: 'Sync LinkedIn Sales Navigator into HubSpot without the copy-paste drag.',
    channel: 'cold_email',
    pageTitle: 'Sync LinkedIn Sales Navigator to HubSpot in one click',
    metaDescription: 'Stop manually copying data between LinkedIn and HubSpot. One-click sync saves hours every week.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For sales reps and teams prospecting in LinkedIn but living in HubSpot later',
      headline: 'Sync LinkedIn Sales Navigator into HubSpot without copy-paste.',
      subheadline: 'A one-click workflow layer that keeps prospecting and CRM updates from living in two separate worlds.',
      reassurance: 'No CRM replacement. Just a faster handoff from prospecting to clean CRM records.'
    },
    socialProofBar: ['One-click sync concept', 'CRM handoff pain is real', 'Booking CTA now standardized'],
    proof: [
      'Sales teams describe living in two tools and duplicating the same work manually.',
      'Prospecting data often gets re-entered by hand after research is already done.',
      'Teams still feel the handoff pain between prospecting and CRM updates, and the workflow stays focused on that problem.'
    ],
    quote: {
      title: 'Research signal',
      body: 'My sales reps are living in two separate worlds right now. They prospect in Sales Navigator all morning, then spend the afternoon copying everything into HubSpot manually.',
      source: 'r/hubspot research'
    },
    faqs: [
      {
        question: 'Is this a CRM replacement?',
        answer: 'No. It is a focused sync workflow between where reps prospect and where the CRM needs to stay up to date.'
      },
      {
        question: 'Why move this page into the shared app?',
        answer: 'So teams can see a practical workflow for reducing CRM admin without changing the rest of their stack.'
      },
      {
        question: 'Who is this for?',
        answer: 'Sales reps, sales managers, and ops teams using LinkedIn Sales Navigator plus HubSpot and feeling the data-entry tax between them.'
      }
    ],
    variants: {
      A: {
        label: 'One-click sync',
        benefits: [
          'Reduce manual copy-paste between LinkedIn and HubSpot',
          'Keep prospecting momentum without CRM cleanup later',
          'Create cleaner records without asking reps for a second pass'
        ],
        steps: [
          { title: 'Find prospects in Sales Navigator', body: 'Work in the prospecting tool your reps already use.' },
          { title: 'Sync with one focused action', body: 'Push the prospect record into HubSpot without retyping the same details.' },
          { title: 'Keep selling instead of doing admin', body: 'Spend less time recreating CRM records after the fact.' }
        ],
        values: [
          { title: 'Less duplicate work', body: 'The value is cutting the handoff tax between prospecting and CRM hygiene.' },
          { title: 'Cleaner rep workflow', body: 'The goal is to reduce the admin tax between Sales Navigator and HubSpot.' },
          { title: 'Still lightweight', body: 'This remains a narrow workflow test, not a bigger platform pitch.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'If LinkedIn-to-HubSpot copy-paste is eating real rep time, book time and we’ll walk through the workflow.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'role', label: 'Role', type: 'text', placeholder: 'Sales rep, sales manager, RevOps...' },
        { name: 'crm', label: 'Current CRM', type: 'text', placeholder: 'HubSpot' },
        { name: 'notes', label: 'What part is still manual?', type: 'textarea', placeholder: 'Prospect creation, logging activity, copying profile data...' }
      ]
    }
  },
  'auto-data-entry': {
    id: 'EXP-BLOOM-004',
    slug: 'auto-data-entry',
    name: 'Auto Data Entry',
    summary: 'Automate invoice sorting, PDF extraction, and spreadsheet updates.',
    channel: 'cold_email',
    pageTitle: 'Stop spending hours on manual data entry',
    metaDescription: 'Automate invoice sorting, PDF extraction, and lead tracking. Save hours every week.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For operators losing hours every week to invoices, PDFs, and spreadsheet updates',
      headline: 'Stop spending hours on manual data entry.',
      subheadline: 'Automate invoice sorting, PDF extraction, and spreadsheet updates without turning this into a heavyweight back-office rebuild.',
      reassurance: 'Built for high-volume back-office tasks without turning into a bigger systems project.'
    },
    socialProofBar: ['Invoice and PDF workflows', 'Spreadsheet update relief', 'Time-back use case'],
    proof: [
      'Operators explicitly describe saving hours when invoice sorting gets automated.',
      'The value is immediate time-back from document handling, field extraction, and spreadsheet busywork.',
      'The page stays anchored on repetitive admin relief, not a vague AI automation story.'
    ],
    quote: {
      title: 'Research signal',
      body: 'I finally managed to automate my messy invoice sorting and it saved me like 5 hours this week.',
      source: 'Reddit small-business research'
    },
    faqs: [
      {
        question: 'What kind of work is this for?',
        answer: 'Invoice sorting, PDF extraction, spreadsheet updates, and other repeatable data-entry tasks that still happen manually.'
      },
      {
        question: 'Is this replacing my whole workflow stack?',
        answer: 'No. It is testing a narrow promise: less manual entry, faster document handling, cleaner downstream data.'
      },
      {
        question: 'Why keep the scope narrow?',
        answer: 'Because the need is usually immediate time savings, not a giant software overhaul.'
      }
    ],
    variants: {
      A: {
        label: 'Time-back workflow',
        benefits: [
          'Upload documents and extract the useful data automatically',
          'Reduce spreadsheet copy-paste and repetitive typing',
          'Reduce repetitive admin work across documents and spreadsheets'
        ],
        steps: [
          { title: 'Upload invoices or PDFs', body: 'Start with the messy docs that usually trigger manual entry work.' },
          { title: 'Extract structured data automatically', body: 'Pull out the relevant fields without hand-keying every value.' },
          { title: 'Sync downstream and move on', body: 'Push the data where it needs to go instead of spending hours in cleanup.' }
        ],
        values: [
          { title: 'Time back this week', body: 'The promise is immediate operational relief, not a future transformation deck.' },
          { title: 'Messy-doc workflow, not generic AI fluff', body: 'The experiment stays anchored in concrete documents and concrete admin pain.' },
          { title: 'Concrete operational win', body: 'This stays anchored in invoices, PDFs, and repetitive admin tasks people already recognize.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'If manual data entry is still eating real operator time, book time and we’ll walk through the workflow.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'document_type', label: 'Main document type', type: 'select', options: ['Invoices', 'Receipts', 'PDF forms', 'Applications / leads', 'Mixed documents'] },
        { name: 'notes', label: 'What still requires manual entry?', type: 'textarea', placeholder: 'Invoice fields, spreadsheet updates, PDF data extraction...' }
      ]
    }
  },
  'manufacturing-tracker': {
    id: 'EXP-BLOOM-005',
    slug: 'manufacturing-tracker',
    name: 'Manufacturing Tracker',
    summary: 'Simple inventory and production tracking for small manufacturers.',
    channel: 'cold_email',
    pageTitle: 'Manufacturing Tracker — simple inventory and production tracking for small shops',
    metaDescription: 'ERP power without ERP complexity. Simple inventory and production tracking designed for small manufacturers.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For small manufacturers that outgrew spreadsheets but do not want enterprise ERP baggage',
      headline: 'Stop losing money to spreadsheet chaos.',
      subheadline: 'Simple inventory and production tracking for smaller shops that need visibility without an ERP implementation circus.',
      reassurance: 'Built for smaller shops that need clarity before they need a full ERP.'
    },
    socialProofBar: ['Small-shop inventory fit', 'Inventory drift pain', 'Production visibility without ERP sprawl'],
    proof: [
      'Spreadsheet-based inventory tracking gets messy once materials, batches, and real costs all need to stay aligned.',
      'Most ERP options are shaped for much larger companies than this experiment targets.',
      'Smaller manufacturers want visibility without dragging the business into an enterprise rollout.'
    ],
    quote: {
      title: 'Operator quote',
      body: 'Spreadsheets work great at the beginning, but once you start juggling materials, production runs, and actual costs, things start getting messy.',
      source: 'Small manufacturer research'
    },
    faqs: [
      {
        question: 'Is this a full ERP replacement?',
        answer: 'No. The page is about a simpler inventory and production tracking layer for smaller shops that do not need a massive rollout.'
      },
      {
        question: 'Who is this for?',
        answer: 'Manufacturers under roughly $10M revenue or similarly small ops teams that have outgrown spreadsheets but not into enterprise systems.'
      },
      {
        question: 'Why not use a full ERP?',
        answer: 'Because many shops need clearer inventory and production visibility before they need a full ERP replacement.'
      }
    ],
    variants: {
      A: {
        label: 'Spreadsheet chaos fix',
        benefits: [
          'Track inventory and production without fuzzy spreadsheet math',
          'Keep batch-level costs and material usage visible',
          'Reduce spreadsheet confusion across inventory and production'
        ],
        steps: [
          { title: 'Log incoming materials', body: 'Get inventory and cost inputs into a simple, reliable workflow.' },
          { title: 'Track production runs', body: 'Link batches to what was used so traceability does not live in someone’s memory.' },
          { title: 'See real costs faster', body: 'Keep production visibility without buying into a giant ERP motion.' }
        ],
        values: [
          { title: 'Small-shop clarity, not ERP theater', body: 'The core promise is visibility without six months of implementation pain.' },
          { title: 'Real operations wedge', body: 'Inventory drift, material traceability, and cost fuzziness are concrete workflow issues.' },
          { title: 'Built for smaller shops', body: 'The workflow is aimed at teams that want clarity without enterprise complexity.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'If spreadsheet-based inventory tracking is breaking down, book time and we’ll walk through the workflow.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'shop_size', label: 'Shop size', type: 'select', options: ['1-10 employees', '11-25 employees', '26-50 employees', '50+ employees'] },
        { name: 'notes', label: 'What gets messy today?', type: 'textarea', placeholder: 'Inventory drift, batch traceability, cost tracking, spreadsheet sprawl...' }
      ]
    }
  },
  'healthcare-no-shows': {
    id: 'EXP-BLOOM-006',
    slug: 'healthcare-no-shows',
    name: 'Healthcare No-Shows',
    summary: 'Reduce appointment no-shows with reminder and confirmation workflows.',
    channel: 'cold_email',
    pageTitle: 'Stop losing revenue to appointment no-shows',
    metaDescription: 'Automated SMS reminders that patients actually read. Reduce no-shows and recover lost revenue.',
    bookingUrl: baseBookingUrl,
    hero: {
      kicker: 'For healthcare practices losing real revenue to empty slots and unconfirmed appointments',
      headline: 'Reduce appointment no-shows without adding more admin work.',
      subheadline: 'A reminder and confirmation workflow built around how patients actually respond: text, not voicemail roulette.',
      reassurance: 'Designed to reduce no-shows without adding more front-desk calling.'
    },
    socialProofBar: ['SMS reminder wedge', 'No-show revenue pain', 'Shared measurement now added'],
    proof: [
      'No-shows create direct revenue loss, wasted capacity, and front-desk churn.',
      'Text reminders are repeatedly described as more durable and more useful than phone call reminders.',
      'Practices care about the operational and revenue cost of empty slots, not more reminder admin.'
    ],
    quote: {
      title: 'Research signal',
      body: 'Text messages are durable, phone calls are not. If I need to check when my appointment is, I can look up the text.',
      source: 'Healthcare reminder research'
    },
    faqs: [
      {
        question: 'Is this replacing my scheduling system?',
        answer: 'No. The original idea was to sit alongside existing scheduling workflows and improve reminder + confirmation behavior.'
      },
      {
        question: 'Why focus on texting?',
        answer: 'Because that is where patients reliably see and revisit the reminder, unlike missed calls and voicemails.'
      },
      {
        question: 'Why focus on texting first?',
        answer: 'Because practices need a reminder workflow that actually gets seen, not another layer of phone-tag.'
      }
    ],
    variants: {
      A: {
        label: 'SMS reminder flow',
        benefits: [
          'Automate patient reminders without more front-desk calling',
          'Capture confirmations or reschedule intent faster',
          'Give practices a clearer path to confirmation and rescheduling'
        ],
        steps: [
          { title: 'Send text reminders at the right time', body: 'Use a channel patients actually read and revisit.' },
          { title: 'Capture confirmation or reschedule intent', body: 'Make it easy to respond before the appointment goes dark.' },
          { title: 'Keep staff out of voicemail loops', body: 'Reduce manual follow-up burden while protecting filled slots.' }
        ],
        values: [
          { title: 'Revenue protection', body: 'No-show reduction is really capacity and revenue recovery.' },
          { title: 'Better than phone-tag', body: 'The wedge is behavioral as much as technical: text persists, calls do not.' },
          { title: 'Operationally practical', body: 'The workflow is designed to reduce no-shows without creating more front-desk work.' }
        ]
      }
    },
    form: {
      title: 'Book a 30-minute demo',
      description: 'If no-shows are a live revenue problem, book time and we’ll walk through the reminder workflow.',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
        { name: 'company', label: 'Practice / clinic', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'appointment_volume', label: 'Weekly appointment volume', type: 'select', options: ['Under 50', '50-150', '151-300', '300+'] },
        { name: 'notes', label: 'What is the no-show issue today?', type: 'textarea', placeholder: 'Missed appointments, voicemail reliance, rescheduling friction...' }
      ]
    }
  }
};

export function getExperiment(slug) {
  return experiments[slug] || null;
}
