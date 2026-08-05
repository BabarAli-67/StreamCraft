import apiClient from './apiClient'

export const playlistApi = {
  create: (payload) => apiClient.post('/playlist', payload),
  getById: (playlistId) => apiClient.get(`/playlist/${playlistId}`),
  getByUser: (userId) => apiClient.get(`/playlist/user/${userId}`),
  update: (playlistId, payload) =>
    apiClient.patch(`/playlist/${playlistId}`, payload),
  remove: (playlistId) => apiClient.delete(`/playlist/${playlistId}`),
  addVideo: (playlistId, videoId) =>
    apiClient.patch(`/playlist/add/${videoId}/${playlistId}`),
  removeVideo: (playlistId, videoId) =>
    apiClient.patch(`/playlist/remove/${videoId}/${playlistId}`),
}
