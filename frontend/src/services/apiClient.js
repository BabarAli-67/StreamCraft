import axios from 'axios'
import { API_BASE_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from '../utils/constants'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

let refreshPromise = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status !== 401 || original?._retry) {
      return Promise.reject(error)
    }

    original._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${API_BASE_URL}/users/refresh-token`,
            {
              refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
            },
            { withCredentials: true }
          )
          .finally(() => {
            refreshPromise = null
          })
      }

      const { data } = await refreshPromise
      const payload = data?.data
      if (payload?.accessToken) {
        localStorage.setItem(TOKEN_KEY, payload.accessToken)
      }
      if (payload?.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, payload.refreshToken)
      }

      original.headers.Authorization = `Bearer ${payload?.accessToken}`
      return apiClient(original)
    } catch (refreshError) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      return Promise.reject(refreshError)
    }
  }
)

export default apiClient
