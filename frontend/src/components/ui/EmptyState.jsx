import { Icon } from './Icon'

export const EmptyState = ({ icon = 'inbox', title, description, action }) => (
  <div className="w-full min-h-[55vh] flex items-center justify-center px-6 py-16">
    <div className="w-full max-w-[28rem] flex flex-col items-center justify-center gap-3 text-center">
      <Icon name={icon} size={48} className="text-on-surface-variant/50" />
      <h3 className="font-[family-name:var(--font-manrope)] text-lg font-bold text-on-surface w-full">
        {title}
      </h3>
      {description ? (
        <p className="text-sm text-on-surface-variant w-full leading-relaxed whitespace-normal break-words">
          {description}
        </p>
      ) : null}
      {action}
    </div>
  </div>
)
