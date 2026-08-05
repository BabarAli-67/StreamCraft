import apiClient from './apiClient'

export const authApi = {
  register: (formData) => apiClient.post('/users/register', formData),
  login: (payload) => apiClient.post('/users/login', payload),
  logout: () => apiClient.post('/users/logout'),
  refreshToken: (refreshToken) =>
    apiClient.post('/users/refresh-token', { refreshToken }),
  getCurrentUser: () => apiClient.get('/users/current-user'),
  changePassword: (payload) => apiClient.post('/users/change-password', payload),
  updateAccount: (payload) => apiClient.patch('/users/update-account', payload),
  updateAvatar: (formData) => apiClient.patch('/users/avatar', formData),
  updateCoverImage: (formData) => apiClient.patch('/users/cover-image', formData),
  getChannelProfile: (username) => apiClient.get(`/users/c/${username}`),
  getWatchHistory: () => apiClient.get('/users/history'),
}
