import apiClient from './apiClient'

export const commentApi = {
  getByVideo: (videoId, params) =>
    apiClient.get(`/comments/${videoId}`, { params }),
  add: (videoId, content) =>
    apiClient.post(`/comments/${videoId}`, { content }),
  update: (commentId, content) =>
    apiClient.patch(`/comments/c/${commentId}`, { content }),
  remove: (commentId) => apiClient.delete(`/comments/c/${commentId}`),
}
