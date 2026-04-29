import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import DashboardView from '@/views/DashboardView'
import AfiliadosView from '@/views/AfiliadosView'
import PipelineView from '@/views/PipelineView'
import AgendaView from '@/views/AgendaView'
import AcademiaView from '@/views/AcademiaView'
import ConfiguracionView from '@/views/ConfiguracionView'
import PlaceholderView from '@/views/PlaceholderView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main CRM Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/afiliados" element={<AfiliadosView />} />
          <Route path="/pipeline" element={<PipelineView />} />
          <Route path="/agenda" element={<AgendaView />} />
          <Route path="/academia" element={<AcademiaView />} />
          <Route path="/configuracion" element={<ConfiguracionView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
