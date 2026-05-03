import { useState, useMemo, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  MessageCircle,
  Clock,
  GripVertical,
  LayoutList,
  LayoutGrid,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  pipelineColumns,
  initialProspects,
  priorityConfig,
  type ProspectCard,
  type PipelineStageId,
} from '@/data/pipelineData'

/* ═══════════════════════════════════════════
   SORTABLE PROSPECT CARD
   ═══════════════════════════════════════════ */

interface ProspectCardItemProps {
  readonly prospect: ProspectCard
  readonly isDragging?: boolean
}

function ProspectCardItem({ prospect, isDragging }: ProspectCardItemProps) {
  const priority = priorityConfig[prospect.prioridad]
  const initials = `${prospect.nombre[0]}${prospect.apellido[0]}`
  const whatsappUrl = `https://wa.me/${prospect.telefono.replace('+', '')}?text=Hola%20${prospect.nombre},%20te%20contacto%20de%20Red%20Empresarial`

  return (
    <div
      className={cn(
        'group rounded-lg border border-border bg-surface p-3.5 transition-all',
        isDragging
          ? 'rotate-2 scale-105 shadow-[var(--shadow-overlay)] ring-2 ring-primary/30'
          : 'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-border-subtle'
      )}
    >
      {/* Header: Avatar + Name + Priority */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-text-primary">
              {prospect.nombre} {prospect.apellido}
            </p>
          </div>
        </div>
        <span className={cn('flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', priority.bg, priority.text)}>
          {prospect.prioridad}
        </span>
      </div>

      {/* Plan + Value */}
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-md bg-canvas px-2 py-0.5 text-xs font-medium text-text-secondary">
          {prospect.plan}
        </span>
        <span className="tabular-nums text-sm font-semibold text-text-primary">
          ${prospect.valorEstimado}<span className="text-xs font-normal text-text-muted">/mes</span>
        </span>
      </div>

      {/* Footer: Days + WhatsApp */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
        {prospect.diasInactividad > 0 ? (
          <span className={cn(
            'flex items-center gap-1 text-xs',
            prospect.diasInactividad >= 5 ? 'text-danger' : prospect.diasInactividad >= 3 ? 'text-warning' : 'text-text-muted'
          )}>
            <Clock className="h-3 w-3" />
            Hace {prospect.diasInactividad} día{prospect.diasInactividad !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-success">
            <Clock className="h-3 w-3" />
            Hoy
          </span>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
        >
          <MessageCircle className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SORTABLE WRAPPER
   ═══════════════════════════════════════════ */

function SortableCard({ prospect }: { prospect: ProspectCard }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: prospect.id, data: { prospect } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProspectCardItem prospect={prospect} />
    </div>
  )
}

/* ═══════════════════════════════════════════
   KANBAN COLUMN
   ═══════════════════════════════════════════ */

interface KanbanColumnProps {
  readonly columnId: PipelineStageId
  readonly title: string
  readonly color: string
  readonly dotColor: string
  readonly prospects: ProspectCard[]
  readonly isLastColumn?: boolean
}

function KanbanColumn({ columnId, title, color, dotColor, prospects, isLastColumn }: KanbanColumnProps) {
  const totalValue = prospects.reduce((sum, p) => sum + p.valorEstimado, 0)
  const prospectIds = prospects.map((p) => p.id)

  return (
    <div className={cn(
      'flex w-72 flex-shrink-0 flex-col rounded-xl border border-border',
      isLastColumn ? 'bg-emerald-50/50' : 'bg-canvas'
    )}>
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', dotColor)} />
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-border px-1.5 text-[10px] font-bold text-text-muted">
            {prospects.length}
          </span>
        </div>
      </div>

      {/* Column Subtotal */}
      <div className="flex items-center gap-1.5 px-4 pb-3">
        <DollarSign className="h-3 w-3 text-text-muted" />
        <span className="tabular-nums text-xs text-text-muted">
          ${totalValue}<span className="font-normal">/mes proyectado</span>
        </span>
      </div>

      {/* Separator */}
      <div className="mx-4 h-px" style={{ backgroundColor: color, opacity: 0.3 }} />

      {/* Cards Container */}
      <SortableContext items={prospectIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-3" style={{ maxHeight: 'calc(100vh - 340px)' }}>
          {prospects.map((prospect) => (
            <SortableCard key={prospect.id} prospect={prospect} />
          ))}

          {prospects.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 text-center">
              <p className="text-sm font-medium text-text-primary">No hay prospectos asignados</p>
              <p className="mt-1 text-[11px] text-text-muted">Arrastre aquí para gestionar el flujo</p>
            </div>
          )}
        </div>
      </SortableContext>

      {/* Add button for first column */}
      {columnId === 'nuevo' && (
        <div className="border-t border-border px-3 py-2.5">
          <button className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border bg-surface py-2 text-xs font-medium text-text-muted transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary">
            <Plus className="h-3.5 w-3.5" />
            Añadir Prospecto
          </button>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW: Pipeline Kanban
   ═══════════════════════════════════════════ */

export default function PipelineView() {
  const { user } = useAuth()
  const initialFilteredProspects = useMemo(() => {
    return initialProspects.filter((p) => {
      if (user?.role === 'vendedor' && p.vendedorId !== user.email) {
        return false
      }
      return true
    })
  }, [user])

  const [prospects, setProspects] = useState<ProspectCard[]>(initialFilteredProspects)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [mobileStage, setMobileStage] = useState<PipelineStageId>('nuevo')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  // ─── Grouped prospects by column ───
  const groupedProspects = useMemo(() => {
    const groups: Record<PipelineStageId, ProspectCard[]> = {
      nuevo: [],
      propuesta: [],
      negociacion: [],
      esperando_pago: [],
      afiliacion_exitosa: [],
    }
    prospects.forEach((p) => groups[p.stageId].push(p))
    return groups
  }, [prospects])

  // ─── KPI calculations ───
  const totalProspects = prospects.length
  const totalProjected = prospects.reduce((sum, p) => sum + p.valorEstimado, 0)
  const convertedCount = groupedProspects.afiliacion_exitosa.length
  const conversionRate = totalProspects > 0 ? Math.round((convertedCount / totalProspects) * 100) : 0

  // ─── Active card for overlay ───
  const activeProspect = activeId ? prospects.find((p) => p.id === activeId) : null

  // ─── DnD Handlers ───
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeProspectData = prospects.find((p) => p.id === active.id)
    if (!activeProspectData) return

    // Find destination column
    let destColumnId: PipelineStageId | null = null

    // Check if dropping over a column (empty area)
    const overProspect = prospects.find((p) => p.id === over.id)
    if (overProspect) {
      destColumnId = overProspect.stageId
    } else {
      // Dropping on a column identifier
      destColumnId = over.id as PipelineStageId
    }

    if (destColumnId && activeProspectData.stageId !== destColumnId) {
      setProspects((prev) =>
        prev.map((p) =>
          p.id === active.id ? { ...p, stageId: destColumnId! } : p
        )
      )
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) return

    // Reorder within same column
    const activeP = prospects.find((p) => p.id === active.id)
    const overP = prospects.find((p) => p.id === over.id)

    if (activeP && overP && activeP.stageId === overP.stageId) {
      const columnProspects = prospects.filter((p) => p.stageId === activeP.stageId)
      const oldIdx = columnProspects.findIndex((p) => p.id === active.id)
      const newIdx = columnProspects.findIndex((p) => p.id === over.id)

      if (oldIdx !== newIdx) {
        const reordered = arrayMove(columnProspects, oldIdx, newIdx)
        setProspects((prev) => {
          const others = prev.filter((p) => p.stageId !== activeP.stageId)
          return [...others, ...reordered]
        })
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Page Header ─── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>
            Pipeline de Ventas
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Gestiona el ciclo de vida de tus prospectos desde el primer contacto hasta la afiliación.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isMobile && (
            <>
              {/* View Toggle */}
              <div className="flex rounded-md border border-border bg-surface">
                <button
                  onClick={() => setViewMode('board')}
                  className={cn(
                    'flex items-center gap-1.5 rounded-l-md px-3 py-2 text-sm font-medium transition-colors',
                    viewMode === 'board' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Vista Kanban
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex items-center gap-1.5 rounded-r-md px-3 py-2 text-sm font-medium transition-colors',
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                  )}
                >
                  <LayoutList className="h-4 w-4" />
                  Vista Lista
                </button>
              </div>
            </>
          )}
          <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
            <Plus className="h-4 w-4" />
            {isMobile ? 'Nuevo' : 'Añadir Prospecto'}
          </button>
        </div>
      </div>

      {/* ─── KPI Summary Bar ─── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-re flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Total Prospectos</p>
            <p className="tabular-nums text-xl font-semibold text-text-primary">{totalProspects}</p>
          </div>
        </div>
        <div className="card-re flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <DollarSign className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Proyectado/Mes</p>
            <p className="tabular-nums text-xl font-semibold text-text-primary">${totalProjected.toLocaleString()}</p>
          </div>
        </div>
        <div className="card-re flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <TrendingUp className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Tasa de Conversión</p>
            <p className="tabular-nums text-xl font-semibold text-text-primary">{conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* ─── Mobile Stage Selector ─── */}
      <div className="pipeline-stage-selector">
        {pipelineColumns.map((col) => (
          <button
            key={col.id}
            className={cn('pipeline-stage-btn', mobileStage === col.id && 'active')}
            onClick={() => setMobileStage(col.id)}
          >
            <span className="stage-dot" style={{ backgroundColor: col.color }} />
            {col.title}
            <span className="text-[10px] opacity-70">({groupedProspects[col.id].length})</span>
          </button>
        ))}
      </div>

      {/* ─── Kanban Board ─── */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineColumns
            .filter((col) => !isMobile || col.id === mobileStage)
            .map((col) => (
            <KanbanColumn
              key={col.id}
              columnId={col.id}
              title={col.title}
              color={col.color}
              dotColor={col.dotColor}
              prospects={groupedProspects[col.id]}
              isLastColumn={col.id === 'afiliacion_exitosa'}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeProspect && (
            <div className="w-72">
              <ProspectCardItem prospect={activeProspect} isDragging />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
