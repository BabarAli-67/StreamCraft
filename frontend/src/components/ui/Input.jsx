export const Input = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => (
  <label className={`flex w-full min-w-0 flex-col gap-1.5 ${containerClassName}`}>
    {label ? (
      <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase whitespace-nowrap leading-normal">
        {label}
      </span>
    ) : null}
    <input
      className={`box-border w-full min-w-0 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm leading-normal text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors ${className}`}
      {...props}
    />
    {error ? (
      <span className="text-xs text-error leading-normal whitespace-normal">{error}</span>
    ) : null}
  </label>
)
