import { Link } from 'react-router-dom'
import { Avatar } from '../../components/ui/Avatar'
import { formatDuration, formatRelativeTime, formatViews } from '../../utils/format'
import { FALLBACK_AVATAR } from '../../utils/constants'

export const VideoCard = ({ video, variant = 'feed' }) => {
  if (!video) return null

  const owner = video.owner || {}
  const channelName = owner.fullName || owner.username || 'Unknown'
  const channelPath = owner.username ? `/c/${owner.username}` : '#'

  if (variant === 'upNext') {
    return (
      <Link to={`/watch/${video._id}`} className="flex gap-3 group cursor-pointer">
        <div className="w-[160px] xl:w-[180px] aspect-video bg-surface-container-highest rounded-lg overflow-hidden shrink-0 relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-semibold">
            {formatDuration(video.duration)}
          </span>
        </div>
        <div className="flex flex-col gap-1 pr-2 min-w-0">
          <h4 className="text-sm text-on-surface leading-tight line-clamp-2 group-hover:text-primary transition-colors font-semibold">
            {video.title}
          </h4>
          <span className="text-xs text-on-surface-variant">{channelName}</span>
          <span className="text-xs text-on-surface-variant">
            {formatViews(video.views)} views • {formatRelativeTime(video.createdAt)}
          </span>
        </div>
      </Link>
    )
  }

  const showAvatar = variant === 'feed'

  return (
    <article className="group cursor-pointer flex flex-col gap-sc-sm">
      <Link
        to={`/watch/${video._id}`}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container border border-transparent group-hover:border-b-2 group-hover:border-b-accent group-hover:scale-[1.02] transition-all duration-300 block"
      >
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-white font-semibold">
          {formatDuration(video.duration)}
        </div>
      </Link>

      <div className="flex gap-3 items-start pr-4">
        {showAvatar ? (
          <Link to={channelPath}>
            <Avatar
              src={owner.avatar || FALLBACK_AVATAR}
              alt={channelName}
              size="md"
              className="w-9 h-9 mt-1"
            />
          </Link>
        ) : null}
        <div className="flex flex-col min-w-0">
          <Link to={`/watch/${video._id}`}>
            <h3 className="text-base font-bold text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {video.title}
            </h3>
          </Link>
          {showAvatar ? (
            <Link to={channelPath} className="text-xs text-on-surface-variant mt-1 hover:text-on-surface">
              {channelName}
            </Link>
          ) : null}
          <p className="text-xs text-on-surface-variant/80 mt-0.5">
            {formatViews(video.views)} views • {formatRelativeTime(video.createdAt)}
          </p>
        </div>
      </div>
    </article>
  )
}
