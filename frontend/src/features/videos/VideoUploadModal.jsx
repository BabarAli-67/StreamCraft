import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Icon } from '../../components/ui/Icon'
import { videoApi } from '../../services/videoApi'
import { useAuth } from '../auth/AuthContext'
import { getErrorMessage } from '../../utils/format'

export const VideoUploadModal = ({ open, onClose, onUploaded }) => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const reset = () => {
    setTitle('')
    setDescription('')
    setVideoFile(null)
    setThumbnail(null)
    setError('')
  }

  const handleClose = () => {
    if (submitting) return
    reset()
    onClose?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (!title.trim() || !description.trim() || !videoFile || !thumbnail) {
      setError('Title, description, video, and thumbnail are required.')
      return
    }

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('description', description.trim())
    formData.append('videoFile', videoFile)
    formData.append('thumbnail', thumbnail)

    setSubmitting(true)
    setError('')
    try {
      const { data } = await videoApi.publish(formData)
      onUploaded?.(data.data)
      reset()
      onClose?.()
      navigate(`/watch/${data.data._id}`)
    } catch (err) {
      setError(getErrorMessage(err, 'Upload failed'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title="Upload video" wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-lowest p-6 text-center hover:border-primary transition-colors">
          <Icon name="cloud_upload" className="text-4xl text-on-surface-variant mb-2" />
          <p className="text-sm text-on-surface mb-3">Select a video file and thumbnail</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <label className="cursor-pointer rounded-full border border-outline-variant px-4 py-2 text-xs font-semibold hover:bg-surface-container">
              {videoFile ? videoFile.name : 'Choose video'}
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
            </label>
            <label className="cursor-pointer rounded-full border border-outline-variant px-4 py-2 text-xs font-semibold hover:bg-surface-container">
              {thumbnail ? thumbnail.name : 'Choose thumbnail'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              />
            </label>
          </div>
        </div>

        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Uploading…' : 'Publish'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
