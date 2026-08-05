import { Icon } from './Icon'

export const Loader = ({ label = 'Loading…', className = '' }) => (
  <div className={`flex flex-col items-center justify-center gap-3 py-16 text-on-surface-variant ${className}`}>
    <Icon name="progress_activity" className="animate-spin text-3xl text-primary" />
    <p className="text-sm">{label}</p>
  </div>
)
