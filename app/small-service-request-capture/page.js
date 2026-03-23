import SmallServiceRequestCapturePage from './SmallServiceRequestCapturePage';

export const metadata = {
  title: 'You read the text. You were driving. And it was gone. | Request capture for trades & service crews',
  description: 'For small service businesses: catch every customer request — text, WhatsApp, email, DMs — before it disappears because you were on the job.',
  openGraph: {
    title: 'You read the text. You were driving. And it was gone.',
    description: "A safety net for customer requests that slip through while you're actually working.",
    type: 'website',
  },
};

export default function Page() {
  return <SmallServiceRequestCapturePage />;
}
