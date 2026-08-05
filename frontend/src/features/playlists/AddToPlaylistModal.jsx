import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Loader } from '../../components/ui/Loader'
import { playlistApi } from '../../services/playlistApi'
import { useAuth } from '../auth/AuthContext'
import { getErrorMessage } from '../../utils/format'

export const AddToPlaylistModal = ({ open, onClose, videoId }) => {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    if (!open || !user?._id) return
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const { data } = await playlistApi.getByUser(user._id)
        if (!cancelled) setPlaylists(data.data || [])
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [open, user?._id])

  const createPlaylist = async () => {
    if (!name.trim() || !description.trim()) return
    setError('')
    try {
      const { data } = await playlistApi.create({
        name: name.trim(),
        description: description.trim(),
      })
      setPlaylists((prev) => [data.data, ...prev])
      setName('')
      setDescription('')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const addToPlaylist = async (playlistId) => {
    setBusyId(playlistId)
    setError('')
    try {
      await playlistApi.addVideo(playlistId, videoId)
      onClose?.()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Save to playlist">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input label="New playlist name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="button" variant="secondary" onClick={createPlaylist}>
            Create playlist
          </Button>
        </div>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        {loading ? (
          <Loader label="Loading playlists…" />
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {playlists.map((playlist) => (
              <li key={playlist._id}>
                <button
                  type="button"
                  disabled={busyId === playlist._id}
                  onClick={() => addToPlaylist(playlist._id)}
                  className="w-full text-left rounded-lg border border-outline-variant px-4 py-3 hover:bg-surface-container-high transition-colors"
                >
                  <p className="font-semibold text-sm">{playlist.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {playlist.totalVideos ?? playlist.videos?.length ?? 0} videos
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  )
}
