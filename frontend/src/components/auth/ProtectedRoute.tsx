import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  adminOnly?: boolean
  superOnly?: boolean
}

export default function ProtectedRoute({ adminOnly = false, superOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // No user logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Force password change if needed
  if (user.mustChangePassword && location.pathname !== '/update-password') {
    return <Navigate to="/update-password" replace />
  }

  /**
   * GATEKEEPER LOGIC (V1.2.0)
   * Only ACTIVO users can access the CRM.
   * Users in PENDIENTE are redirected to the courtesy screen.
   * BLOQUEADO users are kicked out.
   */
  if (user.status === 'BLOQUEADO') {
    return <Navigate to="/login" replace />
  }

  /* 
  if (user.status === 'PENDIENTE' && location.pathname !== '/pending-review') {
    return <Navigate to="/pending-review" replace />
  }
  */

  // Role based access
  if (superOnly && user.role !== 'super_admin') {
    return <Navigate to="/dashboard" replace />
  }

  if (adminOnly && user.role !== 'admin' && user.role !== 'super_admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
