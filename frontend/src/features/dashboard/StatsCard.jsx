import { Icon } from '../../components/ui/Icon'
import { formatViews } from '../../utils/format'

export const StatsCard = ({ icon, label, value, delta }) => (
  <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 flex items-center gap-2 text-on-surface-variant text-xs font-semibold mb-4">
      <Icon name={icon} />
      {label}
    </div>
    <div className="relative z-10 flex items-end justify-between">
      <span className="font-[family-name:var(--font-manrope)] text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
        {typeof value === 'number' ? formatViews(value) : value}
      </span>
      {delta ? (
        <div className="flex items-center gap-1 text-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded-md text-xs font-semibold">
          <Icon name="trending_up" className="text-[14px]" />
          {delta}
        </div>
      ) : null}
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-variant">
      <div className="h-full bg-primary w-3/4 rounded-r-full" />
    </div>
  </div>
)
