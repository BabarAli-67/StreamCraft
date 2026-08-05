import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChannelHeader } from '../features/subscriptions/ChannelHeader'
import { VideoGrid } from '../features/videos/VideoGrid'
import { TweetCard } from '../features/tweets/TweetCard'
import { PlaylistCard } from '../features/playlists/PlaylistCard'
import { Loader } from '../components/ui/Loader'
import { authApi } from '../services/authApi'
import { videoApi } from '../services/videoApi'
import { tweetApi } from '../services/tweetApi'
import { playlistApi } from '../services/playlistApi'

const TABS = ['Videos', 'Tweets', 'Playlists', 'About']

export const ChannelPage = () => {
  const { username } = useParams()
  const [tab, setTab] = useState('Videos')
  const [sort, setSort] = useState('Latest')
  const [channel, setChannel] = useState(null)
  const [videos, setVideos] = useState([])
  const [tweets, setTweets] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      try {
        const { data: channelRes } = await authApi.getChannelProfile(username)
        const channelData = channelRes.data
        if (cancelled) return
        setChannel(channelData)

        const [videosRes, tweetsRes, playlistsRes] = await Promise.all([
          videoApi.getAll({ userId: channelData._id, limit: 24 }),
          tweetApi.getByUser(channelData._id).catch(() => ({ data: { data: [] } })),
          playlistApi.getByUser(channelData._id).catch(() => ({ data: { data: [] } })),
        ])

        if (cancelled) return
        setVideos(videosRes.data?.docs || [])
        setTweets(tweetsRes.data?.data || [])
        setPlaylists(playlistsRes.data?.data || [])
      } catch {
        if (!cancelled) setChannel(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [username])

  const sortedVideos = [...videos].sort((a, b) => {
    if (sort === 'Popular') return (b.views || 0) - (a.views || 0)
    if (sort === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  if (loading) return <Loader label="Loading channel…" />
  if (!channel) {
    return <div className="p-10 text-center text-on-surface-variant">Channel not found</div>
  }

  return (
    <div className="bg-background relative pb-sc-xl min-h-full">
      <div className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden bg-surface-container-high border-b border-outline-variant">
        {channel.coverImage ? (
          <img src={channel.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      </div>

      <div className="max-w-[1600px] mx-auto px-margin-mobile md:px-margin-desktop relative">
        <ChannelHeader channel={channel} videoCount={videos.length} />

        <div className="w-full border-b border-outline-variant flex items-center gap-sc-xl overflow-x-auto no-scrollbar mt-sc-md mb-sc-lg">
          {TABS.map((item) => {
            const active = tab === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`pb-sc-sm relative font-[family-name:var(--font-manrope)] text-lg transition-colors ${
                  active ? 'text-on-surface font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item}
                <div
                  className={`absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-full ${
                    active ? '' : 'hidden'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {tab === 'Videos' && (
          <div>
            <div className="flex items-center gap-sc-sm mb-sc-lg">
              {['Latest', 'Popular', 'Oldest'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSort(item)}
                  className={`px-sc-md py-sc-xs rounded-lg text-xs font-semibold transition-colors ${
                    sort === item
                      ? 'bg-surface-container text-on-surface border border-outline-variant'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <VideoGrid videos={sortedVideos} emptyTitle="No videos on this channel" />
          </div>
        )}

        {tab === 'Tweets' && (
          <div className="max-w-3xl mx-auto flex flex-col gap-sc-md">
            {tweets.length ? (
              tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
            ) : (
              <p className="text-on-surface-variant py-10 text-center">No tweets yet</p>
            )}
          </div>
        )}

        {tab === 'Playlists' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
            {!playlists.length ? (
              <p className="text-on-surface-variant col-span-full text-center py-10">No playlists yet</p>
            ) : null}
          </div>
        )}

        {tab === 'About' && (
          <div className="max-w-2xl py-6 space-y-3 text-on-surface-variant">
            <p>
              <span className="text-on-surface font-semibold">Channel:</span> {channel.fullName}
            </p>
            <p>
              <span className="text-on-surface font-semibold">Username:</span> @{channel.username}
            </p>
            <p>
              <span className="text-on-surface font-semibold">Subscribers:</span>{' '}
              {channel.subscribersCount}
            </p>
            <p>
              <span className="text-on-surface font-semibold">Subscribed to:</span>{' '}
              {channel.channelsSubscribedToCount} channels
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
