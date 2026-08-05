import { Link } from 'react-router-dom'
import { formatViews } from '../../utils/format'
import { Icon } from '../../components/ui/Icon'

export const PlaylistCard = ({ playlist }) => {
  if (!playlist) return null
  const thumb = playlist.videos?.[0]?.thumbnail

  return (
    <Link
      to={`/playlists/${playlist._id}`}
      className="group flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container overflow-hidden hover:border-primary transition-colors"
    >
      <div className="aspect-video bg-surface-container-highest relative">
        {thumb ? (
          <img src={thumb} alt={playlist.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
            <Icon name="playlist_play" className="text-4xl" />
          </div>
        )}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-black/70 flex flex-col items-center justify-center text-white">
          <Icon name="playlist_play" />
          <span className="text-xs font-bold mt-1">
            {playlist.totalVideos ?? playlist.videos?.length ?? 0}
          </span>
        </div>
      </div>
      <div className="px-3 pb-3">
        <h3 className="font-semibold text-on-surface group-hover:text-primary line-clamp-2">
          {playlist.name}
        </h3>
        <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
          {playlist.description}
        </p>
        {typeof playlist.totalViews === 'number' ? (
          <p className="text-xs text-on-surface-variant mt-1">
            {formatViews(playlist.totalViews)} views
          </p>
        ) : null}
      </div>
    </Link>
  )
}
