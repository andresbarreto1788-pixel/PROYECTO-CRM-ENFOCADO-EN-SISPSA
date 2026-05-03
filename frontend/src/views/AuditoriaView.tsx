import React from 'react'
import { Shield, Clock, User, Activity, Search, Filter, Download } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

export default function AuditoriaView() {
  const { auditLogs } = useAuth()

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Centro de Auditoría</h1>
          <p className="mt-1 text-sm text-text-muted">Registro histórico de actividad crítica del ecosistema.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-bold text-text-primary transition-all hover:bg-canvas">
          <Download size={16} />
          Exportar Logs
        </button>
      </div>

      {/* KPI Audit Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-re p-5 border-l-4 border-l-primary">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Eventos Totales</p>
              <p className="text-2xl font-bold text-text-primary">{auditLogs.length}</p>
            </div>
          </div>
        </div>
        <div className="card-re p-5 border-l-4 border-l-success">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Seguridad OK</p>
              <p className="text-2xl font-bold text-text-primary">100%</p>
            </div>
          </div>
        </div>
        <div className="card-re p-5 border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Admin Activos</p>
              <p className="text-2xl font-bold text-text-primary">Master</p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="card-re p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-text-primary">Log de Actividad Reciente</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Buscar evento o usuario..."
              className="rounded-full border border-border bg-canvas py-2 pl-9 pr-4 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left">
            <thead className="bg-canvas text-[11px] font-bold uppercase tracking-widest text-text-muted">
              <tr>
                <th className="px-6 py-4">Evento</th>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Fecha y Hora</th>
                <th className="px-6 py-4">Detalles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "h-2 w-2 rounded-full",
                        log.event === 'Inicio de Sesión' ? 'bg-success' : 'bg-primary'
                      )} />
                      <span className="text-sm font-bold text-text-primary">{log.event}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <User size={14} className="text-text-muted" />
                      {log.user}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock size={14} />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-text-muted bg-border/30 px-2 py-1 rounded">
                      {log.details}
                    </span>
                  </td>
                </tr>
              ))}

              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <Shield className="mx-auto mb-4 h-12 w-12 text-border" />
                    <p className="text-sm font-bold text-text-primary">No hay registros de auditoría</p>
                    <p className="text-xs text-text-muted">La actividad comenzará a registrarse tras el primer inicio de sesión.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
