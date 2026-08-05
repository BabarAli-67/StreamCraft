import apiClient from './apiClient'

export const dashboardApi = {
  getStats: () => apiClient.get('/dashboard/stats'),
  getVideos: () => apiClient.get('/dashboard/videos'),
}
