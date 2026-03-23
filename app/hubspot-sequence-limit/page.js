import HubSpotSequenceLimitPage from './HubSpotSequenceLimitPage';

export const metadata = {
  title: 'You built a 1,000-contact list. HubSpot makes you enroll it 20 times. | Bulk sequence enrollment',
  description:
    "Bulk enroll HubSpot sequence contacts without the 50-at-a-time grind. No scripts. No migration. Just fix the one thing that's broken.",
  openGraph: {
    title: 'You built a 1,000-contact list. HubSpot makes you enroll it 20 times.',
    description: 'Bulk sequence enrollment for HubSpot. No more 50-at-a-time.',
    type: 'website',
  },
};

export default function Page() {
  return <HubSpotSequenceLimitPage />;
}
