// ─── Agenda / Calendar Data ───

export type EventCategory = 'cita_medica' | 'seguimiento' | 'vencimiento' | 'urgente' | 'documentos'

export interface CalendarEvent {
  readonly id: string
  readonly title: string
  readonly client: string
  readonly clientPhone: string
  readonly category: EventCategory
  readonly date: string       // ISO date YYYY-MM-DD
  readonly startTime: string  // HH:mm
  readonly endTime: string    // HH:mm
  readonly description?: string
  readonly doctor?: string
  readonly specialty?: string
  completed?: boolean
}

export const categoryConfig: Record<EventCategory, {
  label: string
  color: string
  bg: string
  text: string
  dot: string
  border: string
  icon: string
}> = {
  cita_medica: {
    label: 'Cita Médica',
    color: '#10B981',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600',
    dot: 'bg-emerald-500',
    border: 'border-l-emerald-500',
    icon: '🏥',
  },
  seguimiento: {
    label: 'Seguimiento',
    color: '#3B82F6',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    dot: 'bg-blue-500',
    border: 'border-l-blue-500',
    icon: '💬',
  },
  urgente: {
    label: 'Urgente',
    color: '#EF4444',
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    dot: 'bg-red-500',
    border: 'border-l-red-500',
    icon: '🚨',
  },
  vencimiento: {
    label: 'Vencimiento',
    color: '#F59E0B',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
    icon: '⚡',
  },
  documentos: {
    label: 'Documentos',
    color: '#64748B',
    bg: 'bg-slate-500/10',
    text: 'text-slate-600',
    dot: 'bg-slate-500',
    border: 'border-l-slate-500',
    icon: '📄',
  },
}

// Helper to get current week dates
function getWeekDates(): string[] {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

  const dates: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

const weekDates = getWeekDates()
const todayStr = new Date().toISOString().split('T')[0]

// Production Hard Reset: All events cleared
export const calendarEvents: CalendarEvent[] = []

// Today's events helper
export function getTodayEvents(): CalendarEvent[] {
  return calendarEvents.filter((e) => e.date === todayStr)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

// Events for a specific date
export function getEventsForDate(date: string): CalendarEvent[] {
  return calendarEvents.filter((e) => e.date === date)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
}

// Day names
export const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] as const
export const dayNamesFull = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const

// Current week dates export
export { weekDates, todayStr }
