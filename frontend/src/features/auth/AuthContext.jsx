import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../../services/authApi'
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../utils/constants'
import { getErrorMessage } from '../../utils/format'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const persistTokens = (payload = {}) => {
    if (payload.accessToken) localStorage.setItem(TOKEN_KEY, payload.accessToken)
    if (payload.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken)
    }
  }

  const clearSession = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setUser(null)
  }

  const bootstrap = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const { data } = await authApi.getCurrentUser()
      setUser(data.data)
    } catch {
      clearSession()
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  const login = async (credentials) => {
    setError(null)
    try {
      const { data } = await authApi.login(credentials)
      persistTokens(data.data)
      setUser(data.data.user)
      return data.data.user
    } catch (err) {
      const message = getErrorMessage(err, 'Login failed')
      setError(message)
      throw new Error(message)
    }
  }

  const register = async (formData) => {
    setError(null)
    try {
      await authApi.register(formData)
      const email = formData.get('email')
      const password = formData.get('password')
      return login({ email, password })
    } catch (err) {
      const message = getErrorMessage(err, 'Registration failed')
      setError(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore network logout errors
    } finally {
      clearSession()
    }
  }

  const refreshUser = async () => {
    const { data } = await authApi.getCurrentUser()
    setUser(data.data)
    return data.data
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
