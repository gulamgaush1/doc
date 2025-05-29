import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingScreen from '../common/LoadingScreen'

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login\" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute