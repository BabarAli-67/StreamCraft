export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export const TOKEN_KEY = 'streamcraft_access_token'
export const REFRESH_TOKEN_KEY = 'streamcraft_refresh_token'

export const FALLBACK_AVATAR =
  'https://ui-avatars.com/api/?name=User&background=2a2a2b&color=d0bcff'

export const NAV_LINKS = [
  { key: 'home', label: 'Home', icon: 'home', path: '/' },
  { key: 'subscriptions', label: 'Subscriptions', icon: 'subscriptions', path: '/subscriptions' },
  { key: 'history', label: 'History', icon: 'history', path: '/history' },
  { key: 'liked', label: 'Liked Videos', icon: 'thumb_up', path: '/liked' },
  { key: 'playlists', label: 'Playlists', icon: 'playlist_play', path: '/playlists' },
  { key: 'tweets', label: 'Tweets', icon: 'chat', path: '/tweets' },
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
]

export const CATEGORY_CHIPS = [
  'All',
  'Gaming',
  'Music',
  'Live',
  'Tech',
  'Podcasts',
  'Design',
]
