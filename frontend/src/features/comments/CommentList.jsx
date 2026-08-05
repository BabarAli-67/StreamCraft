import { useEffect, useState } from 'react'
import { CommentItem } from './CommentItem'
import { CommentInput } from './CommentInput'
import { Loader } from '../../components/ui/Loader'
import { Icon } from '../../components/ui/Icon'
import { commentApi } from '../../services/commentApi'
import { formatViews } from '../../utils/format'

export const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const { data } = await commentApi.getByVideo(videoId, { page: 1, limit: 20 })
        if (cancelled) return
        setComments(data.data?.docs || [])
        setTotal(data.data?.totalDocs || 0)
      } catch {
        if (!cancelled) {
          setComments([])
          setTotal(0)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (videoId) load()
    return () => {
      cancelled = true
    }
  }, [videoId])

  return (
    <div className="flex flex-col gap-sc-md mt-4">
      <div className="flex items-center gap-6">
        <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-on-surface">
          {formatViews(total)} Comments
        </h3>
        <button type="button" className="flex items-center gap-2 text-on-surface hover:text-primary">
          <Icon name="sort" />
          <span className="text-xs font-semibold">Sort by</span>
        </button>
      </div>

      <CommentInput
        videoId={videoId}
        onCreated={(comment) => {
          setComments((prev) => [comment, ...prev])
          setTotal((t) => t + 1)
        }}
      />

      {loading ? (
        <Loader label="Loading comments…" />
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  )
}
