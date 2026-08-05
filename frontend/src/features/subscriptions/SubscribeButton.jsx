import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { subscriptionApi } from '../../services/subscriptionApi'
import { useAuth } from '../auth/AuthContext'

export const SubscribeButton = ({
  channelId,
  initialSubscribed = false,
  className = '',
}) => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [subscribed, setSubscribed] = useState(initialSubscribed)
  const [busy, setBusy] = useState(false)

  if (user?._id && String(user._id) === String(channelId)) {
    return null
  }

  const toggle = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (busy) return
    setBusy(true)
    const prev = subscribed
    setSubscribed(!prev)
    try {
      const { data } = await subscriptionApi.toggle(channelId)
      setSubscribed(Boolean(data.data?.subscribed))
    } catch {
      setSubscribed(prev)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Button
      onClick={toggle}
      disabled={busy}
      variant={subscribed ? 'secondary' : 'primary'}
      className={className}
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  )
}
