import { Component } from 'react'
import { Button } from '../ui/Button'

export class ErrorBoundary extends Component {
  state = { hasError: false, message: '' }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unexpected error' }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-on-surface px-6">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-on-surface-variant text-sm">{this.state.message}</p>
          <Button onClick={() => window.location.assign('/')}>Go home</Button>
        </div>
      )
    }
    return this.props.children
  }
}
