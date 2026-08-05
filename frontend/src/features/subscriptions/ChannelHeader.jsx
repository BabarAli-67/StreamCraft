import { Link } from 'react-router-dom'
import { Avatar } from '../../components/ui/Avatar'
import { SubscribeButton } from './SubscribeButton'
import { Icon } from '../../components/ui/Icon'
import { formatViews } from '../../utils/format'
import { FALLBACK_AVATAR } from '../../utils/constants'

export const ChannelHeader = ({ channel, videoCount }) => {
  if (!channel) return null

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-sc-lg -mt-12 sm:-mt-16 md:-mt-20 mb-sc-lg relative z-10">
      <Avatar
        src={channel.avatar || FALLBACK_AVATAR}
        alt={channel.fullName}
        size="xl"
        className="border-4 border-background shadow-lg"
      />
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-sc-md pb-sc-sm">
        <div className="flex flex-col gap-1">
          <h1 className="font-[family-name:var(--font-manrope)] text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
            {channel.fullName}
            <Icon name="verified" filled className="text-primary text-xl" />
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-on-surface-variant text-sm">
            <span className="font-bold">@{channel.username}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{formatViews(channel.subscribersCount)} subscribers</span>
            {typeof videoCount === 'number' ? (
              <>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span>{videoCount} videos</span>
              </>
            ) : null}
          </div>
          {channel.email ? (
            <p className="text-sm text-on-surface-variant mt-1 line-clamp-2 max-w-2xl">
              Channel contact: {channel.email}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/c/${channel.username}`}
            className="px-4 py-2 rounded-full border border-outline-variant text-on-surface hover:bg-surface-container"
          >
            <Icon name="notifications_active" />
          </Link>
          <SubscribeButton
            channelId={channel._id}
            initialSubscribed={channel.isSubscribed}
          />
        </div>
      </div>
    </div>
  )
}
