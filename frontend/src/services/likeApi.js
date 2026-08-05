import apiClient from './apiClient'

export const likeApi = {
  toggleVideo: (videoId) => apiClient.post(`/likes/toggle/v/${videoId}`),
  toggleComment: (commentId) => apiClient.post(`/likes/toggle/c/${commentId}`),
  toggleTweet: (tweetId) => apiClient.post(`/likes/toggle/t/${tweetId}`),
  getLikedVideos: () => apiClient.get('/likes/videos'),
}
