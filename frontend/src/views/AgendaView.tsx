import { useState, useMemo, useEffect } from 'react'
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
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'
import {
  categoryConfig,
  dayNames,
  dayNamesFull,
  weekDates,
  todayStr,
  type CalendarEvent,
  type EventCategory,
} from '@/data/agendaData'

/* ─── Event Card (Calendar Grid) ─── */
interface EventCardProps {
  readonly event: CalendarEvent
  readonly onClick?: () => void
}

function EventCard({ event, onClick }: EventCardProps) {
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
  readonly onToggle: (id: string) => void
}

function TaskItem({ event, onToggle }: TaskItemProps) {
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
          <button 
            onClick={() => onToggle(event.id)}
            className={cn("rounded-md p-1 transition-colors", event.completed ? "text-success bg-success/10" : "text-text-muted hover:bg-canvas")}
          >
            {event.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
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
  const { events, addEvent, toggleEventCompleted } = useCRM()
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helper inside component to use dynamic events
  const getEventsForDate = (date: string) => {
    return events.filter((e) => e.date === date)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Get events for the selected day (for the sidebar)
  const todayTasks = useMemo(() => getEventsForDate(selectedDate), [selectedDate, events])

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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" />
              Nuevo Evento
            </button>
          </div>
        </div>

        {/* Calendar Grid (Weekly View) */}
        <div className="card-re flex-1 flex flex-col overflow-hidden min-h-[500px]">
          {/* Calendar Sub-header */}
          <div className="flex items-center justify-between border-b border-border bg-canvas px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-base md:text-lg font-bold text-text-primary">Abril 2024</h2>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-md hover:bg-border transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="px-3 py-1 text-xs font-medium border border-border rounded-md bg-surface hover:bg-canvas min-h-[40px]">
                  Hoy
                </button>
                <button className="p-1 rounded-md hover:bg-border transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Legend - hidden on mobile */}
            {!isMobile && (
              <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className={cn('h-2 w-2 rounded-full', config.dot)} />
                    {config.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grid Layout - Responsive */}
          <div className={cn(
            "flex-1 grid divide-x divide-border",
            isMobile ? "grid-cols-1 overflow-y-auto" : "grid-cols-7"
          )}>
            {isMobile ? (
              /* Mobile Date Selector (Horizontal Scroll) */
              <div className="flex flex-col h-full">
                <div className="flex gap-2 overflow-x-auto p-4 border-b border-border scrollbar-hide bg-surface sticky top-0 z-10">
                  {dayNames.map((day, idx) => {
                    const dateStr = weekDates[idx]
                    const isToday = dateStr === todayStr
                    const isSelected = dateStr === selectedDate
                    const dateObj = new Date(dateStr)
                    const dayNum = dateObj.getDate()
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(dateStr)}
                        className={cn(
                          'flex flex-col items-center gap-1 min-w-[60px] p-3 rounded-xl transition-all border',
                          isSelected 
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                            : 'bg-canvas border-border text-text-muted hover:border-primary/30'
                        )}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">{day}</span>
                        <span className="text-lg font-bold tabular-nums">{dayNum}</span>
                      </button>
                    )
                  })}
                </div>
                {/* Mobile Day Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Eventos para el día</h3>
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className="card-re p-4 flex flex-col gap-2 border-l-4" style={{ borderColor: categoryConfig[event.category].dot.replace('bg-', '') }}>
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-text-primary">{event.title}</span>
                          <span className="text-xs font-semibold tabular-nums text-primary">{event.startTime}</span>
                        </div>
                        <p className="text-xs text-text-muted">{event.client}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-text-muted italic">Sin eventos para este día.</div>
                  )}
                </div>
              </div>
            ) : (
              /* Desktop Grid */
              dayNames.map((day, idx) => {
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
              })
            )}
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
                <TaskItem key={event.id} event={event} onToggle={toggleEventCompleted} />
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

      {/* ─── Event Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="card-re relative w-[95vw] max-w-[500px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <h3 className="text-lg font-bold text-text-primary">Nuevo Evento en Agenda</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-danger">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              setIsSubmitting(true)
              const formData = new FormData(e.currentTarget)
              const newEvent: CalendarEvent = {
                id: crypto.randomUUID(),
                title: formData.get('title') as string,
                client: formData.get('client') as string,
                clientPhone: '',
                category: formData.get('category') as any || 'seguimiento',
                date: formData.get('date') as string,
                startTime: formData.get('time') as string,
                endTime: '',
                completed: false
              }
              setTimeout(() => {
                addEvent(newEvent)
                setIsSubmitting(false)
                setIsModalOpen(false)
              }, 600)
            }} className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Título del Evento</label>
                  <input name="title" required type="text" placeholder="Ej: Seguimiento de Plan Oro" className="form-input text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Fecha</label>
                    <input name="date" required type="date" className="form-input text-sm" defaultValue={selectedDate} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Hora</label>
                    <input name="time" required type="time" className="form-input text-sm" defaultValue="09:00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cliente</label>
                    <input name="client" required type="text" placeholder="Nombre..." className="form-input text-sm" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Categoría</label>
                    <select name="category" className="form-input text-sm">
                      {Object.entries(categoryConfig).map(([key, cfg]) => (
                        <option key={key} value={key}>{cfg.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost py-2">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-2">
                  {isSubmitting ? 'Programando...' : 'Programar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
