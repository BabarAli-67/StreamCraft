import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { AnalyticsOverview } from '../features/dashboard/AnalyticsOverview'
import { VideoTable } from '../features/dashboard/VideoTable'
import { Loader } from '../components/ui/Loader'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { dashboardApi } from '../services/dashboardApi'
import { videoApi } from '../services/videoApi'
import { getErrorMessage } from '../utils/format'

export const DashboardPage = () => {
  const { openUpload } = useOutletContext() || {}
  const [stats, setStats] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const [statsRes, videosRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getVideos(),
      ])
      setStats(statsRes.data.data)
      setVideos(videosRes.data.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onTogglePublish = async (video) => {
    try {
      const { data } = await videoApi.togglePublish(video._id)
      setVideos((prev) =>
        prev.map((item) => (item._id === video._id ? data.data : item))
      )
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const onDelete = async (video) => {
    if (!window.confirm(`Delete “${video.title}”?`)) return
    try {
      await videoApi.remove(video._id)
      setVideos((prev) => prev.filter((item) => item._id !== video._id))
      load()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  if (loading) return <Loader label="Loading dashboard…" />

  return (
    <div className="p-margin-mobile md:p-margin-desktop space-y-sc-lg max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-sc-xl">
        <div>
          <h1 className="font-[family-name:var(--font-manrope)] text-2xl md:text-3xl font-bold text-on-surface">
            Dashboard Overview
          </h1>
          <p className="text-base text-on-surface-variant mt-2">
            Welcome back. Here&apos;s how your channel is performing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant">
            <Icon name="calendar_month" className="text-[16px]" />
            All time
          </div>
          <Button onClick={openUpload}>
            <Icon name="upload" className="text-[18px]" />
            Upload
          </Button>
        </div>
      </div>

      {error ? <p className="text-sm text-error">{error}</p> : null}

      <AnalyticsOverview stats={stats} />

      <section className="mt-sc-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-[family-name:var(--font-manrope)] text-xl font-bold text-on-surface">
            Recent Uploads
          </h2>
          <span className="text-xs text-on-surface-variant">
            {stats?.totalVideos || videos.length} videos
          </span>
        </div>
        {videos.length ? (
          <VideoTable
            videos={videos}
            onTogglePublish={onTogglePublish}
            onDelete={onDelete}
          />
        ) : (
          <div className="rounded-xl border border-outline-variant p-10 text-center text-on-surface-variant">
            No uploads yet.{' '}
            <button type="button" className="text-primary font-semibold" onClick={openUpload}>
              Upload your first video
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
