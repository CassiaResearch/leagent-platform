export default function BookedPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="panel" style={{ padding: 32, maxWidth: 760 }}>
          <div className="eyebrow">You’re booked</div>
          <h1 style={{ fontSize: 42, marginBottom: 12 }}>Thanks — your call is confirmed.</h1>
          <p className="muted" style={{ fontSize: 18, lineHeight: 1.7 }}>
            We’ve got your booking. If you were sent here by a calendar redirect, this page can also be used to record the completed booking event for reporting.
          </p>
        </div>
      </div>
    </main>
  );
}
