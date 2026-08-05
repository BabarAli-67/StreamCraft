import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from './AuthContext'

export const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })
  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!avatar) {
      setError('Avatar is required')
      return
    }
    setBusy(true)
    setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      formData.append('avatar', avatar)
      if (coverImage) formData.append('coverImage', coverImage)
      await register(formData)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        label="Full name"
        value={form.fullName}
        onChange={update('fullName')}
        placeholder="Jane Doe"
        autoComplete="name"
        required
      />
      <Input
        label="Username"
        value={form.username}
        onChange={update('username')}
        placeholder="janedoe"
        autoComplete="username"
        required
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={update('email')}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={update('password')}
        placeholder="At least 6 characters"
        autoComplete="new-password"
        required
      />

      <label className="flex w-full flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase whitespace-nowrap">
          Avatar (required)
        </span>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className="w-full text-sm text-on-surface file:mr-3 file:rounded-full file:border-0 file:bg-surface-container-high file:px-4 file:py-2 file:text-xs file:font-semibold file:text-on-surface hover:file:bg-surface-container-highest"
        />
      </label>

      <label className="flex w-full flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide text-on-surface-variant uppercase whitespace-nowrap">
          Cover image (optional)
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          className="w-full text-sm text-on-surface file:mr-3 file:rounded-full file:border-0 file:bg-surface-container-high file:px-4 file:py-2 file:text-xs file:font-semibold file:text-on-surface hover:file:bg-surface-container-highest"
        />
      </label>

      {error ? (
        <p className="w-full text-sm text-error leading-normal whitespace-normal">{error}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full min-h-11 whitespace-nowrap" disabled={busy}>
        {busy ? 'Creating account…' : 'Create account'}
      </Button>

      <p className="w-full text-sm text-on-surface-variant text-center leading-normal whitespace-normal">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-semibold whitespace-nowrap">
          Sign in
        </Link>
      </p>
    </form>
  )
}
