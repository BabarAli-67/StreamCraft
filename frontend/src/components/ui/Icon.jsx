import {
  Home,
  Users,
  History,
  ThumbsUp,
  ThumbsDown,
  ListVideo,
  MessageSquare,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Search,
  Menu,
  Upload,
  Bell,
  PlayCircle,
  VideoOff,
  Inbox,
  PlusCircle,
  X,
  CloudUpload,
  BadgeCheck,
  BellRing,
  Share2,
  ListPlus,
  ArrowUpRight,
  Eye,
  Trash2,
  CalendarDays,
  ArrowUpDown,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

const ICONS = {
  home: Home,
  subscriptions: Users,
  history: History,
  thumb_up: ThumbsUp,
  thumb_down: ThumbsDown,
  playlist_play: ListVideo,
  playlist_add: ListPlus,
  chat: MessageSquare,
  dashboard: LayoutDashboard,
  settings: Settings,
  help: HelpCircle,
  search: Search,
  menu: Menu,
  upload: Upload,
  notifications: Bell,
  notifications_active: BellRing,
  play_circle: PlayCircle,
  videocam_off: VideoOff,
  inbox: Inbox,
  add_circle: PlusCircle,
  close: X,
  cloud_upload: CloudUpload,
  verified: BadgeCheck,
  check_circle: CheckCircle2,
  share: Share2,
  trending_up: ArrowUpRight,
  visibility: Eye,
  delete: Trash2,
  calendar_month: CalendarDays,
  sort: ArrowUpDown,
  progress_activity: Loader2,
}

const sizeFromClass = (className = '') => {
  if (className.includes('text-5xl')) return 48
  if (className.includes('text-4xl')) return 40
  if (className.includes('text-3xl')) return 32
  if (className.includes('text-2xl')) return 28
  if (className.includes('text-xl')) return 22
  if (className.includes('text-[20px]')) return 20
  if (className.includes('text-[18px]')) return 18
  if (className.includes('text-[16px]')) return 16
  if (className.includes('text-[14px]')) return 14
  if (className.includes('text-sm')) return 16
  return 22
}

export const Icon = ({ name, filled = false, className = '', size, style, ...props }) => {
  const LucideIcon = ICONS[name] || Inbox
  const resolvedSize = size ?? sizeFromClass(className)

  return (
    <LucideIcon
      aria-hidden="true"
      size={resolvedSize}
      strokeWidth={filled ? 2.25 : 1.85}
      absoluteStrokeWidth
      fill={filled ? 'currentColor' : 'none'}
      className={`shrink-0 inline-block ${className}`}
      style={style}
      {...props}
    />
  )
}
