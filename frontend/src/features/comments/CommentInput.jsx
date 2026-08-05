import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../auth/AuthContext'
import { commentApi } from '../../services/commentApi'
import { FALLBACK_AVATAR } from '../../utils/constants'
import { getErrorMessage } from '../../utils/format'

export const CommentInput = ({ videoId, onCreated }) => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [focused, setFocused] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (!content.trim()) return
    setBusy(true)
    setError('')
    try {
      const { data } = await commentApi.add(videoId, content.trim())
      setContent('')
      setFocused(false)
      onCreated?.(data.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex items-start gap-4 mb-4">
      <Avatar
        src={user?.avatar || FALLBACK_AVATAR}
        alt={user?.fullName || 'You'}
        size="md"
      />
      <div className="flex-1">
        <input
          className="w-full bg-transparent border-b border-outline-variant focus:border-primary pb-1 text-on-surface text-sm transition-colors focus:outline-none placeholder:text-on-surface-variant mb-2"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {(focused || content) && (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setContent('')
                setFocused(false)
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={submit} disabled={busy || !content.trim()}>
              Comment
            </Button>
          </div>
        )}
        {error ? <p className="text-xs text-error mt-1">{error}</p> : null}
      </div>
    </div>
  )
}
