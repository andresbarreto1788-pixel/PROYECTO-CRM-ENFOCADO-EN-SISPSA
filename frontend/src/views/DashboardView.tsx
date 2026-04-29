import {
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle,
  Clock,
  MessageCircle,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  kpiCards,
  alertItems,
  pipelineStages,
  hotProspects,
  type AlertPriority,
} from '@/data/mockData'

/* ─── Sub-components ─── */

function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((kpi) => (
        <div key={kpi.label} className="card-re p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{kpi.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="tabular-nums text-2xl font-semibold text-text-primary">{kpi.value}</p>
            <span
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                kpi.trend === 'up' && 'bg-success/10 text-success',
                kpi.trend === 'down' && 'bg-danger/10 text-danger',
                kpi.trend === 'neutral' && 'bg-border text-text-muted'
              )}
            >
              {kpi.trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {kpi.trend === 'down' && <TrendingDown className="h-3 w-3" />}
              {kpi.change}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-muted">{kpi.subtitle}</p>
        </div>
      ))}
    </div>
  )
}

const priorityConfig: Record<AlertPriority, { bg: string; text: string; icon: React.ElementType }> = {
  URGENTE: { bg: 'bg-danger/10', text: 'text-danger', icon: AlertTriangle },
  PENDIENTE: { bg: 'bg-warning/10', text: 'text-warning', icon: Clock },
  NUEVO: { bg: 'bg-success/10', text: 'text-success', icon: Sparkles },
}

function AlertsSection() {
  return (
    <div className="card-re flex-1 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Alertas y Acciones Pendientes</h2>
      </div>

      {/* Tab filters */}
      <div className="mb-4 flex gap-2 border-b border-border">
        {['Todas', 'Urgentes', 'Pendientes', 'Nuevas'].map((tab, i) => (
          <button
            key={tab}
            className={cn(
              'border-b-2 px-3 py-2 text-sm font-medium transition-colors',
              i === 0
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-primary'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Alert items */}
      <div className="flex flex-col gap-3">
        {alertItems.map((alert) => {
          const config = priorityConfig[alert.priority]
          const PriorityIcon = config.icon
          return (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-canvas">
              {/* Priority indicator */}
              <div className={cn('mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', config.bg)}>
                <PriorityIcon className={cn('h-4 w-4', config.text)} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', config.bg, config.text)}>
                    {alert.priority}
                  </span>
                  <span className="text-xs text-text-muted">• {alert.timeAgo}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-text-primary">{alert.title}</p>
                <p className="mt-0.5 text-xs text-text-muted">{alert.description}</p>
              </div>

              {/* Action button */}
              <button
                className={cn(
                  'flex-shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  alert.actionType === 'whatsapp'
                    ? 'bg-whatsapp text-white hover:bg-whatsapp/90'
                    : 'border border-border text-text-primary hover:bg-canvas'
                )}
              >
                {alert.action}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PipelineSection() {
  const totalProspects = pipelineStages.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="card-re w-full p-5 xl:w-80">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Pipeline de Ventas</h2>
        <button className="text-xs font-medium text-primary hover:underline">Ver Kanban completo</button>
      </div>

      {/* Visual funnel bar */}
      <div className="mb-4 flex gap-1 overflow-hidden rounded-md">
        {pipelineStages.map((stage) => (
          <div
            key={stage.label}
            className="h-8 transition-all hover:opacity-80"
            style={{
              width: `${(stage.count / totalProspects) * 100}%`,
              backgroundColor: stage.color,
              minWidth: '20px',
            }}
            title={`${stage.label}: ${stage.count}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1">
        {pipelineStages.map((stage) => (
          <div key={stage.label} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
            <span className="text-xs text-text-muted">{stage.label} ({stage.count})</span>
          </div>
        ))}
      </div>

      {/* Hot Prospects */}
      <h3 className="mb-3 text-sm font-semibold text-text-primary">Prospectos Calientes</h3>
      <div className="flex flex-col gap-2">
        {hotProspects.map((prospect) => (
          <div key={prospect.name} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-canvas">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {prospect.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{prospect.name}</p>
                <p className="text-xs text-text-muted">{prospect.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="tabular-nums text-sm font-semibold text-text-primary">{prospect.value}</p>
              <p className="text-xs text-text-muted">{prospect.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Dashboard View ─── */

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>
          Buenos días, Carlos 👋
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Aquí tienes el resumen de tu actividad de hoy.
        </p>
      </div>

      {/* KPI Cards */}
      <KpiSection />

      {/* Alerts + Pipeline */}
      <div className="flex flex-col gap-6 xl:flex-row">
        <AlertsSection />
        <PipelineSection />
      </div>
    </div>
  )
}
