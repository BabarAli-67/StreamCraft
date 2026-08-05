import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'
import { formatDate, formatDuration, formatViews } from '../../utils/format'

export const VideoTable = ({ videos = [], onTogglePublish, onDelete }) => (
  <div className="bg-surface-container border border-outline-variant rounded-xl overflow-x-auto shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-outline-variant bg-surface-container-highest/50">
          <th className="text-xs text-on-surface-variant py-4 px-6 font-semibold uppercase tracking-wider">
            Video
          </th>
          <th className="text-xs text-on-surface-variant py-4 px-6 font-semibold uppercase tracking-wider">
            Status
          </th>
          <th className="text-xs text-on-surface-variant py-4 px-6 font-semibold uppercase tracking-wider">
            Views
          </th>
          <th className="text-xs text-on-surface-variant py-4 px-6 font-semibold uppercase tracking-wider">
            Date
          </th>
          <th className="text-xs text-on-surface-variant py-4 px-6 font-semibold uppercase tracking-wider text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline-variant">
        {videos.map((video) => (
          <tr key={video._id} className="hover:bg-surface-container-high transition-colors group">
            <td className="py-4 px-6">
              <div className="flex items-center gap-4">
                <Link
                  to={`/watch/${video._id}`}
                  className="w-32 aspect-video rounded-lg overflow-hidden bg-surface-variant shrink-0 border border-outline-variant relative"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 rounded">
                    {formatDuration(video.duration)}
                  </span>
                </Link>
                <div>
                  <p className="text-sm font-semibold text-on-surface line-clamp-2">{video.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">
                    {video.description}
                  </p>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={Boolean(video.isPublished)}
                  onChange={() => onTogglePublish?.(video)}
                />
                <div className="w-9 h-5 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                <span className="ml-3 text-xs text-on-surface">
                  {video.isPublished ? 'Published' : 'Draft'}
                </span>
              </label>
            </td>
            <td className="py-4 px-6 text-sm text-on-surface">
              {video.isPublished ? formatViews(video.views) : '—'}
            </td>
            <td className="py-4 px-6 text-sm text-on-surface-variant">
              {formatDate(video.createdAt)}
            </td>
            <td className="py-4 px-6 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/watch/${video._id}`}
                  className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full"
                  title="View"
                >
                  <Icon name="visibility" className="text-[20px]" />
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete?.(video)}
                  className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full"
                  title="Delete"
                >
                  <Icon name="delete" className="text-[20px]" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
