import { useEffect } from 'react'
import { Icon } from './Icon'

export const Modal = ({ open, onClose, title, children, wide = false }) => {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} rounded-xl border border-outline-variant bg-surface-container p-6 shadow-2xl`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Close"
        >
          <Icon name="close" />
        </button>
        {title ? (
          <h2 className="font-[family-name:var(--font-manrope)] text-xl font-bold text-on-surface mb-4 pr-8">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </div>
  )
}
