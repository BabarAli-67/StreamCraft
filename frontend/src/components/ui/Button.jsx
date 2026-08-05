const variants = {
  primary:
    'bg-primary text-on-primary hover:brightness-110 shadow-[0_0_15px_rgba(208,188,255,0.2)]',
  secondary:
    'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high',
  ghost: 'bg-transparent text-on-surface hover:bg-secondary-container',
  danger: 'bg-error/15 text-error hover:bg-error/25',
  accent: 'bg-accent text-white hover:brightness-110',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
)
