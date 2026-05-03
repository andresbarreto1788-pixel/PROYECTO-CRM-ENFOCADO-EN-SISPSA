import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { CRMProvider } from '@/context/CRMContext'
import { NotificationProvider } from '@/context/NotificationContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AppLayout from '@/components/layout/AppLayout'
import DashboardView from '@/views/DashboardView'
import AfiliadosView from '@/views/AfiliadosView'
import PipelineView from '@/views/PipelineView'
import AgendaView from '@/views/AgendaView'
import AcademiaView from '@/views/AcademiaView'
import ConfiguracionView from '@/views/ConfiguracionView'
import LandingPage from '@/views/LandingPage'
import RegistroPage from '@/views/RegistroPage'
import LoginView from '@/views/LoginView'
import EquipoView from '@/views/EquipoView'
import UpdatePasswordView from '@/views/UpdatePasswordView'
import AuditoriaView from '@/views/AuditoriaView'
import UsuariosView from '@/views/UsuariosView'
import PendingReviewView from '@/views/PendingReviewView'

/**
 * Red Empresarial SISPSA (Red Empresarial)
 * Main Application Component — Version 1.2.0
 */
// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[Global Error]', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', background: '#F8FAFC', height: '100vh' }}>
          <h1 style={{ color: '#1E40AF' }}>Algo salió mal</h1>
          <p style={{ color: '#64748B' }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#1E40AF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
      <CRMProvider>
        <AuthProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegistroPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/pending-review" element={<PendingReviewView />} />
              <Route path="/update-password" element={<UpdatePasswordView />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/afiliados" element={<AfiliadosView />} />
                <Route path="/pipeline" element={<PipelineView />} />
                <Route path="/agenda" element={<AgendaView />} />
                <Route path="/academia" element={<AcademiaView />} />
                <Route path="/configuracion" element={<ConfiguracionView />} />
                
                <Route element={<ProtectedRoute adminOnly />}>
                  <Route path="/equipo" element={<EquipoView />} />
                </Route>

                <Route element={<ProtectedRoute superOnly />}>
                  <Route path="/usuarios" element={<UsuariosView />} />
                  <Route path="/auditoria" element={<AuditoriaView />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </CRMProvider>
      </NotificationProvider>
    </ErrorBoundary>
  )
}

export default App
