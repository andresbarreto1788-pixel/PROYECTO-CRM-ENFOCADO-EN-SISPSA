import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
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
 * Red Empresarial SISPSA (CON3XUZ)
 * Main Application Component — Version 1.2.0
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ─── PUBLIC ROUTES ─── */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/login" element={<LoginView />} />
          
          {/* ─── SECURITY: PENDING REVIEW SCREEN ─── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/pending-review" element={<PendingReviewView />} />
            <Route path="/update-password" element={<UpdatePasswordView />} />
          </Route>

          {/* ─── PRIVATE CRM AREA (GATEKEEPER ACTIVE) ─── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* Standard Advisor Views (ACTIVO only) */}
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/afiliados" element={<AfiliadosView />} />
              <Route path="/pipeline" element={<PipelineView />} />
              <Route path="/agenda" element={<AgendaView />} />
              <Route path="/academia" element={<AcademiaView />} />
              <Route path="/configuracion" element={<ConfiguracionView />} />
              
              {/* Admin Shared: Team Management */}
              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/equipo" element={<EquipoView />} />
              </Route>

              {/* Super Admin Only: Security & Access */}
              <Route element={<ProtectedRoute superOnly />}>
                <Route path="/usuarios" element={<UsuariosView />} />
                <Route path="/auditoria" element={<AuditoriaView />} />
              </Route>
            </Route>
          </Route>

          {/* ─── FALLBACK ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
