import { VideoCard } from './VideoCard'
import { Loader } from '../../components/ui/Loader'
import { EmptyState } from '../../components/ui/EmptyState'

export const VideoGrid = ({ videos = [], loading, emptyTitle = 'No videos yet' }) => {
  if (loading) return <Loader label="Loading videos…" />

  if (!videos.length) {
    return (
      <EmptyState
        icon="videocam_off"
        title={emptyTitle}
        description="Try a different search or check back later."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  )
}
