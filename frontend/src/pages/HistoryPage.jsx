import { useEffect, useState } from 'react'
import { VideoGrid } from '../features/videos/VideoGrid'
import { authApi } from '../services/authApi'

export const HistoryPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    authApi
      .getWatchHistory()
      .then(({ data }) => {
        if (!cancelled) setVideos(data.data || [])
      })
      .catch(() => {
        if (!cancelled) setVideos([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="p-margin-mobile md:p-margin-desktop">
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold mb-6">Watch history</h1>
      <VideoGrid videos={videos} loading={loading} emptyTitle="No watch history yet" />
    </div>
  )
}
