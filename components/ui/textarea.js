import { cn } from '../../lib/utils';

export function Textarea({ className = '', ...props }) {
  return <textarea className={cn('ui-control ui-textarea', className)} {...props} />;
}
