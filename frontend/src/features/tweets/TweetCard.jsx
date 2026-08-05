import { Avatar } from '../../components/ui/Avatar'
import { LikeButton } from '../likes/LikeButton'
import { formatRelativeTime } from '../../utils/format'
import { FALLBACK_AVATAR } from '../../utils/constants'
import { Icon } from '../../components/ui/Icon'

export const TweetCard = ({ tweet }) => {
  const owner = tweet.owner || {}

  return (
    <article className="bg-surface-container rounded-xl p-sc-md border border-outline-variant hover:border-outline transition-colors">
      <div className="flex items-start gap-sc-sm mb-sc-sm">
        <Avatar src={owner.avatar || FALLBACK_AVATAR} alt={owner.fullName || 'User'} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-on-surface text-sm">{owner.fullName}</span>
            <Icon name="verified" filled className="text-primary text-sm" />
            <span className="text-on-surface-variant text-sm">@{owner.username}</span>
            <span className="text-on-surface-variant text-sm">
              · {formatRelativeTime(tweet.createdAt)}
            </span>
          </div>
          <p className="text-sm text-on-surface mt-2 whitespace-pre-wrap">{tweet.content}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-outline-variant/50 text-on-surface-variant">
        <LikeButton
          targetId={tweet._id}
          type="tweet"
          initialLiked={tweet.isLiked}
          initialCount={tweet.likesCount || 0}
        />
      </div>
    </article>
  )
}
