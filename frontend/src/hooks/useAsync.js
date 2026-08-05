import { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../utils/format'

export const useAsync = (asyncFn, deps = [], { immediate = true } = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFn(...args)
      setData(result)
      return result
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, deps)

  useEffect(() => {
    if (!immediate) return
    execute().catch(() => {})
  }, [execute, immediate])

  return { data, loading, error, execute, setData }
}
