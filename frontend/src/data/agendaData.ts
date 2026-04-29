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
  vencimiento: {
    label: 'Vencimiento',
    color: '#F59E0B',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
    icon: '⚡',
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

// Generate events for the current week
export const calendarEvents: CalendarEvent[] = [
  // ─── Monday ───
  {
    id: 'EV001', title: 'Seguimiento Renovación', client: 'María González',
    clientPhone: '+584121234567', category: 'seguimiento',
    date: weekDates[0], startTime: '09:00', endTime: '09:30',
    description: 'Verificar renovación de póliza Plan Oro',
  },
  {
    id: 'EV002', title: 'Cita médica — Cardiología', client: 'Ana Pérez',
    clientPhone: '+584151234567', category: 'cita_medica',
    date: weekDates[0], startTime: '14:00', endTime: '15:00',
    doctor: 'Dr. López', specialty: 'Cardiología',
  },

  // ─── Tuesday ───
  {
    id: 'EV003', title: 'Vencimiento de Póliza', client: 'José Ramírez',
    clientPhone: '+584149876543', category: 'vencimiento',
    date: weekDates[1], startTime: '10:00', endTime: '10:30',
    description: 'Póliza Plan Individual vence hoy',
  },
  {
    id: 'EV004', title: 'Carga de Documentos', client: 'Laura Martínez',
    clientPhone: '+584121234567', category: 'documentos',
    date: weekDates[1], startTime: '11:00', endTime: '11:30',
    description: 'Pendiente copia de cédula + exámenes',
  },

  // ─── Wednesday (Today) ───
  {
    id: 'EV005', title: 'Enviar correo bienvenida', client: 'Andrea Mejía',
    clientPhone: '+584161234567', category: 'seguimiento',
    date: weekDates[2], startTime: '08:30', endTime: '08:45',
    description: 'Onboarding completado ayer, enviar paquete de bienvenida',
    completed: true,
  },
  {
    id: 'EV006', title: 'Cita médica — Pediatría', client: 'Carmen Herrera',
    clientPhone: '+584201234567', category: 'cita_medica',
    date: weekDates[2], startTime: '09:00', endTime: '10:00',
    doctor: 'Dra. Sánchez', specialty: 'Pediatría',
  },
  {
    id: 'EV007', title: 'Seguimiento Post-Venta', client: 'Roberto Sánchez',
    clientPhone: '+584171234567', category: 'seguimiento',
    date: weekDates[2], startTime: '11:30', endTime: '12:00',
    description: 'Verificar satisfacción con Plan Plata — 1 mes activo',
  },
  {
    id: 'EV008', title: 'Recordar renovación', client: 'Isabella Morales',
    clientPhone: '+584231234567', category: 'vencimiento',
    date: weekDates[2], startTime: '15:00', endTime: '15:30',
    description: 'Plan Esmeralda Básico vence en 7 días',
  },
  {
    id: 'EV009', title: 'Preparar documentos', client: 'Luis Torres',
    clientPhone: '+584241234567', category: 'documentos',
    date: weekDates[2], startTime: '16:00', endTime: '16:30',
    description: 'Preparar carpeta de afiliación completa',
  },

  // ─── Thursday ───
  {
    id: 'EV010', title: 'Cita médica — General', client: 'Fernando López',
    clientPhone: '+584211234567', category: 'cita_medica',
    date: weekDates[3], startTime: '10:00', endTime: '11:00',
    doctor: 'Dr. Rodríguez', specialty: 'Medicina General',
  },
  {
    id: 'EV011', title: 'Seguimiento Plan Diamante', client: 'Gabriela Vargas',
    clientPhone: '+584241112233', category: 'seguimiento',
    date: weekDates[3], startTime: '14:00', endTime: '14:30',
    description: 'Revisar beneficios utilizados del Plan Diamante',
  },

  // ─── Friday ───
  {
    id: 'EV012', title: 'URGENTE: Vencimiento 24h', client: 'Miguel Torres',
    clientPhone: '+584161234567', category: 'urgente',
    date: weekDates[4], startTime: '09:00', endTime: '09:30',
    description: 'Póliza Plan Bronce vence mañana — contactar de inmediato',
  },
  {
    id: 'EV013', title: 'Onboarding nuevo prospecto', client: 'Sofía Rodríguez',
    clientPhone: '+584181234567', category: 'seguimiento',
    date: weekDates[4], startTime: '14:00', endTime: '14:30',
    description: 'Presentar planes disponibles y beneficios',
  },

  // ─── Saturday ───
  {
    id: 'EV014', title: 'Seguimiento WhatsApp', client: 'Elena Salazar',
    clientPhone: '+584149990011', category: 'seguimiento',
    date: weekDates[5], startTime: '10:00', endTime: '10:15',
    description: 'Mensaje de seguimiento semanal a prospecto caliente',
  },
]

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
