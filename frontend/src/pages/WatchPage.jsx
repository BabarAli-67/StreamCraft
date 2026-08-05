import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { VideoPlayer } from '../features/videos/VideoPlayer'
import { VideoCard } from '../features/videos/VideoCard'
import { CommentList } from '../features/comments/CommentList'
import { LikeButton } from '../features/likes/LikeButton'
import { SubscribeButton } from '../features/subscriptions/SubscribeButton'
import { AddToPlaylistModal } from '../features/playlists/AddToPlaylistModal'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { Loader } from '../components/ui/Loader'
import { Icon } from '../components/ui/Icon'
import { videoApi } from '../services/videoApi'
import { formatDate, formatViews } from '../utils/format'
import { FALLBACK_AVATAR } from '../utils/constants'

export const WatchPage = () => {
  const { videoId } = useParams()
  const [video, setVideo] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const [descOpen, setDescOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const [{ data: videoRes }, { data: listRes }] = await Promise.all([
          videoApi.getById(videoId),
          videoApi.getAll({ page: 1, limit: 12 }),
        ])
        if (cancelled) return
        setVideo(videoRes.data)
        setRelated((listRes.data?.docs || []).filter((v) => v._id !== videoId))
      } catch {
        if (!cancelled) setVideo(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [videoId])

  if (loading) return <Loader label="Loading video…" />
  if (!video) {
    return (
      <div className="p-10 text-center text-on-surface-variant">
        Video not found. <Link to="/" className="text-primary">Go home</Link>
      </div>
    )
  }

  const owner = video.owner || {}

  return (
    <div className="max-w-[1800px] mx-auto px-margin-mobile md:px-margin-desktop py-sc-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-8">
      <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-sc-lg">
        <VideoPlayer src={video.videoFile} poster={video.thumbnail} title={video.title} />

        <div className="flex flex-col gap-sc-sm">
          <h1 className="font-[family-name:var(--font-manrope)] text-2xl md:text-3xl font-bold text-on-surface">
            {video.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to={owner.username ? `/c/${owner.username}` : '#'}>
                <Avatar src={owner.avatar || FALLBACK_AVATAR} alt={owner.fullName || 'Channel'} size="lg" />
              </Link>
              <div className="flex flex-col">
                <Link
                  to={owner.username ? `/c/${owner.username}` : '#'}
                  className="font-[family-name:var(--font-manrope)] text-lg font-semibold text-on-surface flex items-center gap-1"
                >
                  {owner.fullName || owner.username}
                  <Icon name="check_circle" filled className="text-sm text-on-surface-variant" />
                </Link>
              </div>
              <SubscribeButton channelId={owner._id} className="ml-2" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <div className="flex items-center bg-surface-container rounded-full border border-outline-variant">
                <div className="px-4 py-2 border-r border-outline-variant">
                  <LikeButton
                    targetId={video._id}
                    initialLiked={video.isLiked}
                    initialCount={video.likesCount || 0}
                  />
                </div>
                <button type="button" className="px-4 py-2 text-on-surface-variant" aria-label="Dislike">
                  <Icon name="thumb_down" />
                </button>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setPlaylistOpen(true)}>
                <Icon name="playlist_add" />
                Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
              >
                <Icon name="share" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDescOpen((v) => !v)}
          className="bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl p-sc-md border border-outline-variant text-left"
        >
          <div className="text-xs font-semibold text-on-surface flex gap-2 mb-2">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{formatDate(video.createdAt)}</span>
          </div>
          <p className={`text-sm text-on-surface-variant whitespace-pre-wrap ${descOpen ? '' : 'line-clamp-2'}`}>
            {video.description}
          </p>
          <div className="mt-2 text-xs font-bold text-on-surface">
            {descOpen ? 'Show less' : 'Show more'}
          </div>
        </button>

        <CommentList videoId={video._id} />
      </div>

      <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-sc-md">
        <h2 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-on-surface mb-2">
          Up Next
        </h2>
        <div className="flex flex-col gap-sc-sm">
          {related.map((item) => (
            <VideoCard key={item._id} video={item} variant="upNext" />
          ))}
        </div>
      </aside>

      <AddToPlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        videoId={video._id}
      />
    </div>
  )
}
