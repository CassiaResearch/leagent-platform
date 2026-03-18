import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <div className="panel" style={{ padding: 32, maxWidth: 760 }}>
          <div className="eyebrow">Not found</div>
          <h1 style={{ fontSize: 42, marginBottom: 12 }}>That page does not exist.</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.7 }}>Try the page index instead.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: 18 }}>Back to pages</Link>
        </div>
      </div>
    </main>
  );
}
