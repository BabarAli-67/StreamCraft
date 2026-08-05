import { Navigate, Route, Routes } from 'react-router-dom'
import { LayoutWrapper } from '../components/layout/LayoutWrapper'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import { HomePage } from '../pages/HomePage'
import { WatchPage } from '../pages/WatchPage'
import { ChannelPage } from '../pages/ChannelPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { HistoryPage } from '../pages/HistoryPage'
import { LikedVideosPage } from '../pages/LikedVideosPage'
import { SubscriptionsPage } from '../pages/SubscriptionsPage'
import { PlaylistsPage } from '../pages/PlaylistsPage'
import { PlaylistDetailPage } from '../pages/PlaylistDetailPage'
import { TweetsPage } from '../pages/TweetsPage'
import { SettingsPage } from '../pages/SettingsPage'

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route element={<LayoutWrapper showSidebar showBottomNav />}>
      <Route index element={<HomePage />} />
    </Route>

    <Route element={<LayoutWrapper showSidebar={false} showBottomNav={false} />}>
      <Route path="/watch/:videoId" element={<WatchPage />} />
    </Route>

    <Route element={<LayoutWrapper showSidebar />}>
      <Route path="/c/:username" element={<ChannelPage />} />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/liked"
        element={
          <ProtectedRoute>
            <LikedVideosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <SubscriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <PlaylistsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists/:playlistId"
        element={
          <ProtectedRoute>
            <PlaylistDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tweets"
        element={
          <ProtectedRoute>
            <TweetsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)
