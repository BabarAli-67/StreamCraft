import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuth } from './AuthContext'

export const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const isEmail = identifier.includes('@')
      await login({
        password,
        ...(isEmail ? { email: identifier } : { username: identifier }),
      })
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        label="Email or username"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="you@example.com"
        autoComplete="username"
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />
      {error ? (
        <p className="w-full text-sm text-error leading-normal whitespace-normal">{error}</p>
      ) : null}
      <Button type="submit" size="lg" className="w-full min-h-11 whitespace-nowrap" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="w-full text-sm text-on-surface-variant text-center leading-normal whitespace-normal">
        No account?{' '}
        <Link to="/register" className="text-primary font-semibold whitespace-nowrap">
          Create one
        </Link>
      </p>
    </form>
  )
}
