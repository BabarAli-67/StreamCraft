import { useEffect, useState } from 'react'
import { CreateTweetForm } from '../features/tweets/CreateTweetForm'
import { TweetCard } from '../features/tweets/TweetCard'
import { Loader } from '../components/ui/Loader'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../features/auth/AuthContext'
import { tweetApi } from '../services/tweetApi'

export const TweetsPage = () => {
  const { user } = useAuth()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?._id) return
    let cancelled = false
    tweetApi
      .getByUser(user._id)
      .then(({ data }) => {
        if (!cancelled) setTweets(data.data || [])
      })
      .catch(() => {
        if (!cancelled) setTweets([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user?._id])

  return (
    <div className="p-margin-mobile md:p-margin-desktop max-w-3xl mx-auto space-y-6">
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-bold">Your tweets</h1>
      <CreateTweetForm onCreated={(tweet) => setTweets((prev) => [tweet, ...prev])} />
      {loading ? (
        <Loader />
      ) : tweets.length ? (
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))}
        </div>
      ) : (
        <EmptyState icon="chat" title="No tweets yet" description="Share an update above." />
      )}
    </div>
  )
}
