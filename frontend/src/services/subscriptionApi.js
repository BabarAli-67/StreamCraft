import apiClient from './apiClient'

export const subscriptionApi = {
  toggle: (channelId) => apiClient.post(`/subscriptions/c/${channelId}`),
  getSubscribers: (channelId) => apiClient.get(`/subscriptions/c/${channelId}`),
  getSubscribedChannels: (subscriberId) =>
    apiClient.get(`/subscriptions/u/${subscriberId}`),
}
