import './globals.css';
import GoogleAnalytics from '../components/GoogleAnalytics';

export const metadata = {
  title: 'Leagent',
  description: 'Focused landing pages with shared attribution, booking, and analytics infrastructure.'
};

export default function RootLayout({ children }) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics measurementId={measurementId} />
        {children}
      </body>
    </html>
  );
}
