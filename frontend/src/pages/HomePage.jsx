import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { VideoGrid } from '../features/videos/VideoGrid'
import { EmptyState } from '../components/ui/EmptyState'
import { CATEGORY_CHIPS } from '../utils/constants'
import { videoApi } from '../services/videoApi'
import { getErrorMessage } from '../utils/format'

export const HomePage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [category, setCategory] = useState('All')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const effectiveQuery = useMemo(() => {
    if (query) return query
    return category === 'All' ? '' : category
  }, [query, category])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const { data } = await videoApi.getAll({
          page: 1,
          limit: 24,
          query: effectiveQuery || undefined,
          sortBy: 'createdAt',
          sortType: 'desc',
        })
        if (!cancelled) setVideos(data.data?.docs || [])
      } catch (err) {
        if (!cancelled) {
          setVideos([])
          setError(getErrorMessage(err, 'Could not load videos. Check API connection.'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [effectiveQuery])

  return (
    <div className="pt-6 px-margin-mobile md:px-margin-desktop pb-12 bg-background min-h-[calc(100vh-4rem)] w-full">
      <div className="flex gap-sc-sm overflow-x-auto no-scrollbar mb-sc-lg pb-2 border-b border-outline-variant/30">
        {CATEGORY_CHIPS.map((chip) => {
          const active = category === chip
          return (
            <button
              key={chip}
              type="button"
              onClick={() => setCategory(chip)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-[#e5e2e3] text-[#131314] font-bold'
                  : 'bg-surface-container-high text-on-surface border border-outline-variant hover:bg-surface-container-highest'
              }`}
            >
              {chip}
            </button>
          )
        })}
      </div>

      {error ? (
        <EmptyState icon="cloud_off" title="Videos unavailable" description={error} />
      ) : (
        <VideoGrid
          videos={videos}
          loading={loading}
          emptyTitle={effectiveQuery ? `No results for “${effectiveQuery}”` : 'No videos yet'}
        />
      )}
    </div>
  )
}
