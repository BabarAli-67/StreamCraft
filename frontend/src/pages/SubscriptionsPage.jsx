import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import { Avatar } from '../components/ui/Avatar'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../features/auth/AuthContext'
import { subscriptionApi } from '../services/subscriptionApi'
import { FALLBACK_AVATAR } from '../utils/constants'

export const SubscriptionsPage = () => {
  const { user } = useAuth()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?._id) return
    let cancelled = false
    subscriptionApi
      .getSubscribedChannels(user._id)
      .then(({ data }) => {
        if (!cancelled) setChannels(data.data || [])
      })
      .catch(() => {
        if (!cancelled) setChannels([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user?._id])

  if (loading) return <Loader label="Loading subscriptions…" />

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold mb-6">Subscriptions</h1>
      {!channels.length ? (
        <EmptyState
          icon="subscriptions"
          title="No subscriptions yet"
          description="Subscribe to channels while watching videos to see them here."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((item) => {
            const channel = item.channel || {}
            return (
              <Link
                key={item._id}
                to={channel.username ? `/c/${channel.username}` : '#'}
                className="flex items-center gap-4 rounded-xl border border-outline-variant bg-surface-container p-4 hover:border-primary transition-colors"
              >
                <Avatar src={channel.avatar || FALLBACK_AVATAR} alt={channel.fullName} size="lg" />
                <div>
                  <p className="font-semibold text-on-surface">{channel.fullName}</p>
                  <p className="text-xs text-on-surface-variant">@{channel.username}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
