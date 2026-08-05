import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { likeApi } from '../../services/likeApi'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { formatViews } from '../../utils/format'

export const LikeButton = ({
  targetId,
  type = 'video',
  initialLiked = false,
  initialCount = 0,
  className = '',
}) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [busy, setBusy] = useState(false)

  const toggle = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (busy) return
    setBusy(true)
    const prevLiked = liked
    setLiked(!prevLiked)
    setCount((c) => (prevLiked ? Math.max(0, c - 1) : c + 1))
    try {
      if (type === 'comment') await likeApi.toggleComment(targetId)
      else if (type === 'tweet') await likeApi.toggleTweet(targetId)
      else await likeApi.toggleVideo(targetId)
    } catch {
      setLiked(prevLiked)
      setCount((c) => (prevLiked ? c + 1 : Math.max(0, c - 1)))
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={`flex items-center gap-2 transition-colors ${
        liked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
      } ${className}`}
    >
      <Icon name="thumb_up" filled={liked} />
      <span className="text-xs font-bold">{formatViews(count)}</span>
    </button>
  )
}
