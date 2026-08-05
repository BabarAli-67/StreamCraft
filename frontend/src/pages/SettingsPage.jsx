import { useState } from 'react'
import { useAuth } from '../features/auth/AuthContext'
import { authApi } from '../services/authApi'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Avatar } from '../components/ui/Avatar'
import { FALLBACK_AVATAR } from '../utils/constants'
import { getErrorMessage } from '../utils/format'

export const SettingsPage = () => {
  const { user, refreshUser, logout } = useAuth()
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const saveProfile = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await authApi.updateAccount({ fullName, email })
      await refreshUser()
      setMessage('Profile updated')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await authApi.changePassword({ oldPassword, newPassword })
      setOldPassword('')
      setNewPassword('')
      setMessage('Password changed')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  const updateAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      await authApi.updateAvatar(formData)
      await refreshUser()
      setMessage('Avatar updated')
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="p-margin-mobile md:p-margin-desktop max-w-2xl space-y-8">
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold">Settings</h1>

      <div className="flex items-center gap-4">
        <Avatar src={user?.avatar || FALLBACK_AVATAR} alt={user?.fullName} size="lg" />
        <label className="text-sm text-primary font-semibold cursor-pointer">
          Change avatar
          <input type="file" accept="image/*" className="hidden" onChange={updateAvatar} />
        </label>
      </div>

      {message ? <p className="text-sm text-primary">{message}</p> : null}
      {error ? <p className="text-sm text-error">{error}</p> : null}

      <form onSubmit={saveProfile} className="space-y-3 rounded-xl border border-outline-variant p-4 bg-surface-container">
        <h2 className="font-semibold">Account</h2>
        <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit">Save changes</Button>
      </form>

      <form onSubmit={changePassword} className="space-y-3 rounded-xl border border-outline-variant p-4 bg-surface-container">
        <h2 className="font-semibold">Password</h2>
        <Input
          label="Current password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button type="submit" variant="secondary">
          Change password
        </Button>
      </form>

      <Button variant="danger" onClick={logout}>
        Log out
      </Button>
    </div>
  )
}
