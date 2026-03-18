import { cn } from '../../lib/utils';

export function Button({ asChild = false, variant = 'default', className = '', ...props }) {
  const Component = asChild ? 'span' : 'button';

  return (
    <Component
      className={cn(
        'ui-button',
        variant === 'secondary' && 'ui-button-secondary',
        variant === 'ghost' && 'ui-button-ghost',
        className
      )}
      {...props}
    />
  );
}
