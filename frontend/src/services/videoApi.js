import apiClient from './apiClient'

export const videoApi = {
  getAll: (params) => apiClient.get('/videos', { params }),
  getById: (videoId) => apiClient.get(`/videos/${videoId}`),
  publish: (formData) => apiClient.post('/videos', formData),
  update: (videoId, formData) => apiClient.patch(`/videos/${videoId}`, formData),
  remove: (videoId) => apiClient.delete(`/videos/${videoId}`),
  togglePublish: (videoId) => apiClient.patch(`/videos/toggle/publish/${videoId}`),
}
