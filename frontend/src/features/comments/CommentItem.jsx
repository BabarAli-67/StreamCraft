import { Avatar } from '../../components/ui/Avatar'
import { LikeButton } from '../likes/LikeButton'
import { formatRelativeTime } from '../../utils/format'
import { FALLBACK_AVATAR } from '../../utils/constants'

export const CommentItem = ({ comment }) => {
  const owner = comment.owner || {}

  return (
    <div className="flex items-start gap-4">
      <Avatar
        src={owner.avatar || FALLBACK_AVATAR}
        alt={owner.username || 'User'}
        size="md"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-on-surface">
            @{owner.username || 'user'}
          </span>
          <span className="text-xs text-on-surface-variant">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-on-surface">{comment.content}</p>
        <div className="flex items-center gap-4 mt-1">
          <LikeButton
            targetId={comment._id}
            type="comment"
            initialLiked={comment.isLiked}
            initialCount={comment.likesCount || 0}
          />
        </div>
      </div>
    </div>
  )
}
