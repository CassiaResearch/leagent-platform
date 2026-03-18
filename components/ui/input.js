import { cn } from '../../lib/utils';

export function Input({ className = '', ...props }) {
  return <input className={cn('ui-control', className)} {...props} />;
}
