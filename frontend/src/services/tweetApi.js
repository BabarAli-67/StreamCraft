import apiClient from './apiClient'

export const tweetApi = {
  create: (content) => apiClient.post('/tweets', { content }),
  getByUser: (userId) => apiClient.get(`/tweets/user/${userId}`),
  update: (tweetId, content) =>
    apiClient.patch(`/tweets/${tweetId}`, { content }),
  remove: (tweetId) => apiClient.delete(`/tweets/${tweetId}`),
}
