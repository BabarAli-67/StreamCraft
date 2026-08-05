import { NavLink } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const items = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/subscriptions', icon: 'subscriptions', label: 'Subs' },
  { to: '/upload', icon: 'add_circle', label: '', elevated: true },
  { to: '/history', icon: 'history', label: 'History' },
  { to: '/dashboard', icon: 'dashboard', label: 'Library' },
]

export const MobileBottomNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant flex justify-around items-center z-50 px-2">
    {items.map((item) =>
      item.elevated ? (
        <NavLink
          key={item.to}
          to={item.to}
          className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant relative"
        >
          <div className="absolute -top-4 w-12 h-12 bg-surface rounded-full border border-outline-variant flex items-center justify-center">
            <Icon name={item.icon} size={24} />
          </div>
        </NavLink>
      ) : (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full ${
              isActive ? 'text-primary' : 'text-on-surface-variant'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} size={22} />
              <span className="text-[10px] font-semibold mt-1">{item.label}</span>
            </>
          )}
        </NavLink>
      )
    )}
  </nav>
)
