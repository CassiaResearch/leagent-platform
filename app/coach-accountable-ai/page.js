import CoachAccountableAIPage from './CoachAccountableAIPage';

export const metadata = {
  title: 'Stop typing session recaps at 10pm | AI back-office for CoachAccountable',
  description: 'Session recaps, homework reminders, and next-session briefs — handled automatically inside CoachAccountable. No new CRM. No migration.',
  openGraph: {
    title: 'Stop typing session recaps at 10pm',
    description: 'Your AI back-office for CoachAccountable. Session recaps, homework, and briefs — handled automatically.',
    type: 'website',
  },
};

export default function Page() {
  return <CoachAccountableAIPage />;
}
