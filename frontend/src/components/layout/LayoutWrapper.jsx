import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { MobileBottomNav } from './MobileBottomNav'
import { VideoUploadModal } from '../../features/videos/VideoUploadModal'
import { useDebounce } from '../../hooks/useDebounce'

const activeKeyFromPath = (pathname) => {
  if (pathname.startsWith('/dashboard')) return 'dashboard'
  if (pathname.startsWith('/subscriptions')) return 'subscriptions'
  if (pathname.startsWith('/history')) return 'history'
  if (pathname.startsWith('/liked')) return 'liked'
  if (pathname.startsWith('/playlists')) return 'playlists'
  if (pathname.startsWith('/tweets')) return 'tweets'
  return 'home'
}

export const LayoutWrapper = ({
  showSidebar = true,
  showBottomNav = false,
  navVariant: navVariantProp = 'default',
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [uploadOpen, setUploadOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 400)
  const navVariant =
    navVariantProp ||
    (location.pathname.startsWith('/dashboard') ? 'dashboard' : 'default')

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleSearchSubmit = (value) => {
    const q = (value ?? debouncedSearch).trim()
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  const contentOffset = showSidebar ? 'md:ml-[72px] lg:ml-[240px]' : ''

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {showSidebar ? (
        <Sidebar
          activeKey={activeKeyFromPath(location.pathname)}
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      ) : null}

      <div className={`flex flex-col min-h-screen ${contentOffset}`}>
        <Navbar
          searchValue={search}
          onSearchChange={setSearch}
          onSearchSubmit={handleSearchSubmit}
          onUploadClick={() => setUploadOpen(true)}
          onMenuClick={() => setMobileMenuOpen(true)}
          showMenuButton={showSidebar}
          variant={navVariant}
        />
        <main className={`flex-1 w-full min-w-0 ${showBottomNav ? 'pb-24 md:pb-0' : ''}`}>
          <Outlet context={{ openUpload: () => setUploadOpen(true) }} />
        </main>
      </div>

      {showBottomNav ? <MobileBottomNav /> : null}

      <VideoUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  )
}
