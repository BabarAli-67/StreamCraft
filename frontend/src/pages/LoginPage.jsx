import { LoginForm } from '../features/auth/LoginForm'
import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'

export const LoginPage = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-10">
    <div className="w-full max-w-[28rem] flex flex-col items-center gap-6">
      <div className="w-full text-center space-y-2">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-on-surface whitespace-nowrap"
        >
          <Icon name="play_circle" filled className="text-primary" size={28} />
          <span>StreamCraft</span>
        </Link>
        <p className="text-on-surface-variant text-sm leading-normal whitespace-normal">
          Sign in to continue
        </p>
      </div>

      <div className="w-full rounded-2xl border border-outline-variant bg-surface-container p-6 sm:p-8 shadow-xl shadow-black/20">
        <LoginForm />
      </div>
    </div>
  </div>
)
