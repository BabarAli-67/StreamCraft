export const Textarea = ({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => (
  <label className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
    {label ? (
      <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase">
        {label}
      </span>
    ) : null}
    <textarea
      className={`w-full rounded-xl border border-outline-variant bg-surface-container px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-y min-h-24 ${className}`}
      {...props}
    />
    {error ? <span className="text-xs text-error">{error}</span> : null}
  </label>
)
