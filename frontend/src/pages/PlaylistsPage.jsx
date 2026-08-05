import { useEffect, useState } from 'react'
import { PlaylistCard } from '../features/playlists/PlaylistCard'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Loader } from '../components/ui/Loader'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../features/auth/AuthContext'
import { playlistApi } from '../services/playlistApi'
import { getErrorMessage } from '../utils/format'

export const PlaylistsPage = () => {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await playlistApi.getByUser(user._id)
      setPlaylists(data.data || [])
    } catch {
      setPlaylists([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?._id) load()
  }, [user?._id])

  const create = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await playlistApi.create({ name, description })
      setPlaylists((prev) => [data.data, ...prev])
      setName('')
      setDescription('')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop space-y-8">
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold">Playlists</h1>

      <form
        onSubmit={create}
        className="rounded-xl border border-outline-variant bg-surface-container p-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] items-end"
      >
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button type="submit">Create</Button>
        {error ? <p className="text-sm text-error md:col-span-3">{error}</p> : null}
      </form>

      {loading ? (
        <Loader />
      ) : playlists.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      ) : (
        <EmptyState icon="playlist_play" title="No playlists yet" description="Create one above." />
      )}
    </div>
  )
}
