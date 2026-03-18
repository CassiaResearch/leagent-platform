import { cn } from '../../lib/utils';

export function SectionFrame({ className = '', tone = 'default', children, ...props }) {
  return <section className={cn('amve-section-frame', tone !== 'default' && `amve-section-${tone}`, className)} {...props}>{children}</section>;
}

export function SurfaceCard({ className = '', tone = 'default', children, ...props }) {
  return <div className={cn('amve-surface-card', tone !== 'default' && `amve-surface-${tone}`, className)} {...props}>{children}</div>;
}

export function Eyebrow({ className = '', children }) {
  return <div className={cn('amve-eyebrow', className)}>{children}</div>;
}

export function ProofPill({ className = '', children }) {
  return <span className={cn('amve-proof-pill', className)}>{children}</span>;
}

export function MetricTile({ className = '', value, label }) {
  return (
    <div className={cn('amve-metric-tile', className)}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
