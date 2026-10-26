import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:bg-[#5ee8ab]',
  secondary: 'border border-line-strong bg-surface text-ink hover:border-accent/50 hover:bg-surface2',
  ghost: 'text-mute hover:text-ink',
};

export default function Button({
  children,
  variant = 'secondary',
  href,
  onClick,
  external = false,
  icon,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {icon}
      {children}
    </button>
  );
}
