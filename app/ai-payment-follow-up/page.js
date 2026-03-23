import AIPaymentFollowUpPage from './AIPaymentFollowUpPage';

export const metadata = {
  title: 'QuickBooks almost made me lose my best client with an AI reminder | Thread-aware payment follow-up',
  description: 'Draft overdue-invoice follow-ups that read the actual email thread and sound human. No robotic reminders. No embarrassment.',
  openGraph: {
    title: 'QuickBooks almost made me lose my best client with an AI reminder',
    description: 'Thread-aware payment follow-up that sounds human — not robotic.',
    type: 'website',
  },
};

export default function Page() {
  return <AIPaymentFollowUpPage />;
}
