import { useState } from 'react'
import { Textarea } from '../../components/ui/Textarea'
import { Button } from '../../components/ui/Button'
import { tweetApi } from '../../services/tweetApi'
import { getErrorMessage } from '../../utils/format'

export const CreateTweetForm = ({ onCreated }) => {
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setBusy(true)
    setError('')
    try {
      const { data } = await tweetApi.create(content.trim())
      setContent('')
      onCreated?.(data.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-surface-container rounded-xl p-4 border border-outline-variant space-y-3">
      <Textarea
        label="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share an update with your audience"
      />
      {error ? <p className="text-xs text-error">{error}</p> : null}
      <div className="flex justify-end">
        <Button type="submit" disabled={busy || !content.trim()}>
          {busy ? 'Posting…' : 'Post tweet'}
        </Button>
      </div>
    </form>
  )
}
