import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { VideoCard } from '../features/videos/VideoCard'
import { Loader } from '../components/ui/Loader'
import { playlistApi } from '../services/playlistApi'

export const PlaylistDetailPage = () => {
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    playlistApi
      .getById(playlistId)
      .then(({ data }) => {
        if (!cancelled) setPlaylist(data.data)
      })
      .catch(() => {
        if (!cancelled) setPlaylist(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [playlistId])

  if (loading) return <Loader />
  if (!playlist) {
    return (
      <div className="p-10 text-center">
        Playlist not found. <Link to="/playlists" className="text-primary">Back</Link>
      </div>
    )
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold">{playlist.name}</h1>
        <p className="text-on-surface-variant mt-2">{playlist.description}</p>
        <p className="text-xs text-on-surface-variant mt-1">
          {playlist.totalVideos ?? playlist.videos?.length ?? 0} videos
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {(playlist.videos || []).map((video) => (
          <VideoCard key={video._id} video={video} variant="channel" />
        ))}
      </div>
    </div>
  )
}
