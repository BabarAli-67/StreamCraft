import { StatsCard } from './StatsCard'

export const AnalyticsOverview = ({ stats }) => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <StatsCard icon="visibility" label="Total Views" value={stats?.totalViews || 0} />
    <StatsCard icon="group" label="Total Subscribers" value={stats?.totalSubscribers || 0} />
    <StatsCard icon="thumb_up" label="Total Likes" value={stats?.totalLikes || 0} />
  </section>
)
