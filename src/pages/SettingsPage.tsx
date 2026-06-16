import { Navigate } from 'react-router-dom'

// Redirect /settings → /settings/profile
export function SettingsPage() {
  return <Navigate to="/settings/profile" replace />
}
