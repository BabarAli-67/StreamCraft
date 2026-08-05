import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { useAuth } from '../../features/auth/AuthContext'
import { FALLBACK_AVATAR } from '../../utils/constants'

export const Navbar = ({
  onMenuClick,
  onUploadClick,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  variant = 'default',
  showMenuButton = false,
}) => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearchSubmit?.(searchValue)
  }

  return (
    <header
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 md:gap-4 w-full px-4 md:px-6 lg:px-10 h-16 sticky top-0 z-50 border-b border-outline-variant ${
        variant === 'blur' ? 'bg-surface/80 backdrop-blur-md' : 'bg-surface'
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {showMenuButton ? (
          <button
            type="button"
            className="md:hidden text-on-surface p-2 rounded-full hover:bg-surface-container"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Icon name="menu" size={22} />
          </button>
        ) : null}
        <Link
          to="/"
          className="font-[family-name:var(--font-manrope)] text-lg sm:text-xl font-bold text-on-surface tracking-tight flex items-center gap-2 shrink-0"
        >
          <Icon name="play_circle" filled className="text-primary" size={24} />
          <span className="truncate">StreamCraft</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="hidden sm:flex w-full max-w-xl mx-auto items-center bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all"
      >
        <Icon name="search" className="text-on-surface-variant mr-2 shrink-0" size={18} />
        <input
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full min-w-0 bg-transparent border-none focus:outline-none text-on-surface text-sm placeholder:text-on-surface-variant"
          placeholder="Search"
          type="search"
        />
      </form>

      <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
        <button
          type="button"
          className="sm:hidden p-2 rounded-full hover:bg-surface-container text-on-surface"
          onClick={() => onSearchSubmit?.(searchValue)}
          aria-label="Search"
        >
          <Icon name="search" size={20} />
        </button>

        {isAuthenticated ? (
          <>
            <Button
              variant={variant === 'dashboard' ? 'primary' : 'secondary'}
              size="sm"
              onClick={onUploadClick}
              className="hidden sm:inline-flex"
            >
              <Icon name="upload" size={18} />
              <span className="hidden lg:inline">Upload</span>
            </Button>
            <button
              type="button"
              className="text-on-surface hover:bg-secondary-container p-2 rounded-full relative"
              aria-label="Notifications"
            >
              <Icon name="notifications" size={20} />
            </button>
            <button
              type="button"
              onClick={() => navigate(user?.username ? `/c/${user.username}` : '/dashboard')}
              className="ml-0.5"
            >
              <Avatar src={user?.avatar || FALLBACK_AVATAR} alt={user?.fullName || 'User'} size="sm" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
