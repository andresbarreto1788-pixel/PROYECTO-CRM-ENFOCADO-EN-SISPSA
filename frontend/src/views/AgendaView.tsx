import { useState, useMemo } from 'react'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Phone,
  MessageCircle,
  Plus,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  calendarEvents,
  categoryConfig,
  dayNames,
  dayNamesFull,
  weekDates,
  todayStr,
  getEventsForDate,
  type CalendarEvent,
  type EventCategory,
} from '@/data/agendaData'

/* ─── Event Card (Calendar Grid) ─── */
interface EventCardProps {
  readonly event: CalendarEvent
}

function EventCard({ event }: EventCardProps) {
  const config = categoryConfig[event.category]
  return (
    <div
      className={cn(
        'group relative rounded-md border-l-4 px-2 py-1.5 text-xs transition-all hover:shadow-sm cursor-pointer mb-1',
        config.bg,
        config.text,
        config.border,
        event.completed && 'opacity-60 grayscale-[0.5]'
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-semibold truncate">{event.title}</span>
        <span className="text-[10px] opacity-80 tabular-nums">{event.startTime}</span>
      </div>
      <p className="truncate text-[10px] opacity-90 mt-0.5">{event.client}</p>
    </div>
  )
}

/* ─── Task Item (Sidebar) ─── */
interface TaskItemProps {
  readonly event: CalendarEvent
}

function TaskItem({ event }: TaskItemProps) {
  const config = categoryConfig[event.category]
  const whatsappUrl = `https://wa.me/${event.clientPhone.replace('+', '')}?text=Hola%20${event.client},%20te%20contacto%20de%20Red%20Empresarial`

  return (
    <div className="flex gap-3 group relative">
      {/* Time column */}
      <div className="flex flex-col items-center gap-1 w-12 pt-1">
        <span className="text-xs font-semibold text-text-primary">{event.startTime}</span>
        <div className="flex-1 w-px bg-border group-last:hidden mt-1" />
      </div>

      {/* Task Content */}
      <div className={cn(
        'flex-1 rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-elevated)]',
        event.completed && 'bg-canvas'
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase', config.bg, config.text)}>
              {config.label}
            </span>
            {event.completed && (
              <span className="flex items-center gap-1 text-[10px] font-medium text-success">
                <CheckCircle2 className="h-3 w-3" />
                Completada
              </span>
            )}
          </div>
          <button className="text-text-muted hover:text-text-primary">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <h4 className={cn('mt-2 text-sm font-semibold text-text-primary', event.completed && 'line-through opacity-60')}>
          {event.title}
        </h4>
        
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{event.client}</span>
          </div>
          {event.doctor && (
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{event.doctor} ({event.specialty})</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-whatsapp px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-canvas">
            <Phone className="h-3.5 w-3.5 text-text-muted" />
            Llamar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW: Agenda
   ═══════════════════════════════════════════ */

export default function AgendaView() {
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')

  // Get events for the selected day (for the sidebar)
  const todayTasks = useMemo(() => getEventsForDate(selectedDate), [selectedDate])

  return (
    <div className="flex flex-col gap-6 h-full lg:flex-row">
      {/* ─── Main Calendar Area ─── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>
              Agenda de Seguimiento
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Visualiza tus citas médicas, renovaciones y tareas pendientes de la semana.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md border border-border bg-surface">
              <button
                onClick={() => setViewMode('week')}
                className={cn(
                  'px-3 py-2 text-xs font-medium transition-colors',
                  viewMode === 'week' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                )}
              >
                Semana
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={cn(
                  'px-3 py-2 text-xs font-medium transition-colors border-l border-border',
                  viewMode === 'month' ? 'bg-primary text-white' : 'text-text-muted hover:text-text-primary'
                )}
              >
                Mes
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
              <Plus className="h-4 w-4" />
              Nuevo Evento
            </button>
          </div>
        </div>

        {/* Calendar Grid (Weekly View) */}
        <div className="card-re flex-1 flex flex-col overflow-hidden min-h-[600px]">
          {/* Calendar Sub-header */}
          <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-text-primary">Abril 2024</h2>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-md hover:bg-border transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="px-3 py-1 text-xs font-medium border border-border rounded-md bg-surface hover:bg-canvas">
                  Hoy
                </button>
                <button className="p-1 rounded-md hover:bg-border transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Legend */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              {Object.entries(categoryConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={cn('h-2 w-2 rounded-full', config.dot)} />
                  {config.label}
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="flex-1 grid grid-cols-7 divide-x divide-border">
            {dayNames.map((day, idx) => {
              const dateStr = weekDates[idx]
              const isToday = dateStr === todayStr
              const isSelected = dateStr === selectedDate
              const dateObj = new Date(dateStr)
              const dayNum = dateObj.getDate()
              const events = getEventsForDate(dateStr)

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    'flex flex-col min-h-0 cursor-pointer transition-colors hover:bg-canvas/50',
                    isSelected && 'bg-primary/5 ring-1 ring-inset ring-primary/20',
                    isToday && !isSelected && 'bg-primary/[0.02]'
                  )}
                >
                  {/* Day Header */}
                  <div className={cn(
                    'flex flex-col items-center py-3 border-b border-border gap-0.5',
                    isToday ? 'text-primary' : 'text-text-muted'
                  )}>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{day}</span>
                    <span className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold tabular-nums',
                      isToday ? 'bg-primary text-white' : 'text-text-primary'
                    )}>
                      {dayNum}
                    </span>
                  </div>

                  {/* Day Content (Events) */}
                  <div className="flex-1 p-1 overflow-y-auto max-h-[600px] scrollbar-hide">
                    {events.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─── Today's Tasks Sidebar ─── */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="card-re p-6 flex flex-col h-full bg-slate-900/5 border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {selectedDate === todayStr ? 'Tareas para Hoy' : `Tareas: ${selectedDate}`}
            </h3>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-[10px] font-bold text-white">
              {todayTasks.length}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 max-h-[800px] scrollbar-thin">
            {todayTasks.length > 0 ? (
              todayTasks.map(event => (
                <TaskItem key={event.id} event={event} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-canvas flex items-center justify-center mb-4 text-text-muted">
                  <CalendarIcon className="h-8 w-8" />
                </div>
                <p className="text-sm font-medium text-text-primary">No hay tareas programadas</p>
                <p className="text-xs text-text-muted mt-1">Disfruta de tu tiempo libre o planifica nuevos seguimientos.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card-re p-5 bg-primary/5 border-primary/20">
          <h4 className="text-sm font-bold text-text-primary mb-3">Recordatorio</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Recuerda que las citas médicas de <span className="font-semibold text-primary">Cardiología</span> requieren confirmación previa de 24 horas.
          </p>
        </div>
      </div>
    </div>
  )
}
