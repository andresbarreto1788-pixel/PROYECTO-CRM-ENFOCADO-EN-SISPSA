import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  AlertCircle,
  FileText
} from 'lucide-react'

import { useCRM } from '@/context/CRMContext'

export default function DashboardView() {
  const { user } = useAuth()
  const { afiliados, prospects } = useCRM()

  const activeCount = afiliados.filter(a => a.estado === 'Activo').length
  const pendingCount = afiliados.filter(a => a.estado === 'Pendiente').length
  const totalCommission = afiliados.reduce((sum, a) => sum + (a.cuotaMensual * 0.1), 0) // 10% commission example
  const conversionRate = prospects.length > 0 ? Math.round((afiliados.length / (prospects.length + afiliados.length)) * 100) : 0

  const stats = [
    { label: 'Comisiones (Est.)', value: `$${totalCommission.toFixed(2)}`, trend: '+12%', icon: DollarSign, color: 'text-primary' },
    { label: 'Afiliados Activos', value: activeCount.toString(), trend: '+2', icon: Users, color: 'text-success' },
    { label: 'Pendientes', value: pendingCount.toString(), trend: '0', icon: Clock, color: 'text-warning' },
    { label: 'Conversión', value: `${conversionRate}%`, trend: '+5%', icon: TrendingUp, color: 'text-primary-light' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
          Buenos días, {user?.name || 'Asesor'} 👋
        </h1>
        <p className="text-sm font-medium text-text-muted">
          Este es el resumen operativo de tu gestión en <span className="text-primary font-bold">CON3XUZ</span>.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-re p-6 transition-all hover:shadow-elevated group">
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-canvas ${stat.color} transition-colors group-hover:bg-primary group-hover:text-white`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-success">
                <ArrowUpRight size={14} />
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</p>
              <p className="mt-1 text-2xl font-black text-text-primary tabular-nums">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Empty State / Welcome Message */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-primary/10">
              <ShieldAlert className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary">Ecosistema en Blanco</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
              El sistema ha sido reseteado para producción (Versión 1.2.1). 
              Empieza a cargar tus prospectos en el <span className="font-bold text-primary">Pipeline</span> o registra nuevos afiliados para ver métricas reales.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-8">Añadir Afiliado</button>
              <button className="btn-ghost" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Ver Tutorial</button>
            </div>
          </div>
        </div>

        {/* Side Panel: Quick Actions/Info */}
        <div className="space-y-6">
          <div className="card-re p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary">
              <AlertCircle size={16} className="text-warning" />
              Tareas Pendientes
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 border-l-4 border-warning bg-canvas p-3 rounded-r-lg">
                <div className="h-2 w-2 rounded-full bg-warning" />
                <p className="text-xs font-medium text-text-secondary">Completar perfil corporativo</p>
              </div>
              <div className="flex items-center gap-4 border-l-4 border-border bg-canvas/50 p-3 rounded-r-lg opacity-60">
                <div className="h-2 w-2 rounded-full bg-border" />
                <p className="text-xs font-medium text-text-muted">Cargar reporte semanal</p>
              </div>
            </div>
          </div>

          <div className="card-re p-6 bg-sidebar text-white overflow-hidden relative">
             <div className="relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Soporte Red</h3>
                <p className="mt-4 text-xs leading-relaxed text-white/50">¿Necesitas ayuda con la plataforma o tus cierres?</p>
                <button className="mt-6 w-full rounded-xl bg-whatsapp py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-whatsapp/20 transition-transform active:scale-95">
                  Contactar Soporte
                </button>
             </div>
             <FileText className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShieldAlert({ className, h, w }: { className?: string, h?: number, w?: number }) {
  return (
    <svg 
      className={className} 
      width={w || 40} 
      height={h || 40} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}
