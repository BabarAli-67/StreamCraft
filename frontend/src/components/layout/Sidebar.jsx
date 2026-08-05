import { NavLink } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'
import { NAV_LINKS } from '../../utils/constants'

export const Sidebar = ({ activeKey, mobileOpen = false, onClose }) => {
  const navItemClass = (isActive) =>
    `flex items-center gap-4 py-3 px-3 lg:px-4 transition-all rounded-lg ${
      isActive
        ? 'text-on-surface border-l-4 border-primary bg-surface-container-high rounded-r-lg'
        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
    }`

  const content = (
    <>
      <div className="px-3 lg:px-6 pb-4 hidden md:block">
        <h2 className="font-[family-name:var(--font-manrope)] text-xl font-bold text-primary tracking-tight lg:block hidden">
          StreamCraft
        </h2>
        <p className="text-xs font-semibold tracking-wide text-on-surface-variant mt-1 hidden lg:block">
          Premium Streaming
        </p>
        <div className="lg:hidden flex justify-center pt-1">
          <Icon name="play_circle" filled className="text-primary" size={28} />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-4 md:hidden">
        <span className="font-[family-name:var(--font-manrope)] text-lg font-bold text-on-surface">
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-container text-on-surface"
          aria-label="Close menu"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <nav className="flex-1 px-2 lg:px-3 space-y-1">
        {NAV_LINKS.map((link) => {
          const isActive = activeKey === link.key
          return (
            <NavLink
              key={link.key}
              to={link.path}
              title={link.label}
              onClick={onClose}
              className={navItemClass(isActive)}
            >
              <Icon
                name={link.icon}
                filled={isActive}
                size={22}
                className={isActive ? 'text-primary' : ''}
              />
              <span className="text-xs font-semibold tracking-wide md:hidden lg:inline">
                {link.label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto p-3 lg:p-4 border-t border-outline-variant space-y-3">
        <div className="hidden lg:flex bg-surface-container-high p-4 rounded-lg flex-col items-center border border-outline-variant text-center">
          <p className="font-[family-name:var(--font-manrope)] text-lg font-bold text-primary mb-1">
            StreamCraft
          </p>
          <p className="text-xs text-on-surface-variant mb-3">Premium Streaming</p>
          <Button variant="accent" size="sm" className="w-full">
            Go Pro
          </Button>
        </div>
        <NavLink
          to="/settings"
          title="Settings"
          onClick={onClose}
          className="flex items-center gap-4 text-on-surface-variant py-2 px-3 hover:text-on-surface transition-colors rounded-lg"
        >
          <Icon name="settings" size={22} />
          <span className="text-xs font-semibold md:hidden lg:inline">Settings</span>
        </NavLink>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen pt-16 flex-col z-40 overflow-y-auto w-[72px] lg:w-[240px] bg-surface border-r border-outline-variant">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu overlay"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 h-full w-[260px] bg-surface border-r border-outline-variant flex flex-col pt-4 shadow-2xl">
            {content}
          </aside>
        </div>
      ) : null}
    </>
  )
}
