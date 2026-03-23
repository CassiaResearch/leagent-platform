import ScopeCreepGuardPage from './ScopeCreepGuardPage';
export const metadata = {
  title: 'You quoted $2K. You worked 43 hours. You got paid $2K. | Scope guard for freelance designers',
  description: '79% of freelance designers work beyond scope for free. A scope guard that catches out-of-scope asks before you do the work.',
  openGraph: {
    title: 'You quoted $2K. You worked 43 hours. You got paid $2K.',
    description: 'A scope guard for freelance designers. Catch out-of-scope asks before they eat your profit.',
    type: 'website',
  },
};
export default function Page() {
  return <ScopeCreepGuardPage />;
}
