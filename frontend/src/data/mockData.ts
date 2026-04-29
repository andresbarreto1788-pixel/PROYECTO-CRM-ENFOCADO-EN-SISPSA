import type { LucideIcon } from 'lucide-react'

// ─── Navigation Items ───
export interface NavItem {
  readonly label: string
  readonly icon: string
  readonly path: string
}

export const navigationItems: readonly NavItem[] = [
  { label: 'Inicio', icon: 'Home', path: '/dashboard' },
  { label: 'Mis Afiliados', icon: 'Users', path: '/afiliados' },
  { label: 'Pipeline', icon: 'LayoutGrid', path: '/pipeline' },
  { label: 'Agenda', icon: 'Calendar', path: '/agenda' },
  { label: 'Academia', icon: 'GraduationCap', path: '/academia' },
] as const

export const bottomNavItems: readonly NavItem[] = [
  { label: 'Configuración', icon: 'Settings', path: '/configuracion' },
] as const

// ─── Current User ───
export interface UserProfile {
  readonly name: string
  readonly role: string
  readonly initials: string
  readonly avatar?: string
}

export const currentUser: UserProfile = {
  name: 'Carlos Mendoza',
  role: 'Asesor Senior',
  initials: 'CM',
}

// ─── KPI Data ───
export interface KpiCard {
  readonly label: string
  readonly value: string
  readonly change: string
  readonly trend: 'up' | 'down' | 'neutral'
  readonly subtitle: string
}

export const kpiCards: readonly KpiCard[] = [
  { label: 'Comisiones del Mes', value: '$4,850.00', change: '+$0.5%', trend: 'up', subtitle: 'vs. mes anterior' },
  { label: 'Pólizas Activas', value: '127', change: '+12', trend: 'up', subtitle: 'de 150 totales' },
  { label: 'Pólizas por Vencer', value: '8', change: '-3', trend: 'down', subtitle: 'próximos 30 días' },
  { label: 'Tasa de Retención', value: '94.2%', change: '+1.8%', trend: 'up', subtitle: 'Meta: 90%' },
] as const

// ─── Alert Items ───
export type AlertPriority = 'URGENTE' | 'PENDIENTE' | 'NUEVO'

export interface AlertItem {
  readonly id: string
  readonly priority: AlertPriority
  readonly title: string
  readonly description: string
  readonly action: string
  readonly actionType: 'whatsapp' | 'link' | 'button'
  readonly timeAgo: string
}

export const alertItems: readonly AlertItem[] = [
  {
    id: '1',
    priority: 'URGENTE',
    title: 'Póliza de María González vence en 24h',
    description: 'Plan Familiar Premium — Renovación Automática: Desactivada',
    action: 'WhatsApp',
    actionType: 'whatsapp',
    timeAgo: 'Hace 2h',
  },
  {
    id: '2',
    priority: 'URGENTE',
    title: 'Póliza de José Ramírez vence mañana',
    description: 'Plan Individual — Revisar documentos pendientes',
    action: 'WhatsApp',
    actionType: 'whatsapp',
    timeAgo: 'Hace 4h',
  },
  {
    id: '3',
    priority: 'PENDIENTE',
    title: 'Cita médica de Ana Pérez... Dr. López',
    description: 'Cardiología — Confirmación de autorización requerida',
    action: 'Ver Ficha',
    actionType: 'link',
    timeAgo: 'Mañana 10:00',
  },
  {
    id: '4',
    priority: 'PENDIENTE',
    title: 'Renovación pendiente de revisión',
    description: 'Carlos Diaz — Plan Corporativo (10 beneficiarios)',
    action: 'Revisar',
    actionType: 'button',
    timeAgo: 'Hace 1d',
  },
  {
    id: '5',
    priority: 'NUEVO',
    title: 'Nuevo prospecto asignado: Laura Martínez',
    description: 'Interés en Salud Global Premium',
    action: 'Iniciar Onboarding',
    actionType: 'button',
    timeAgo: 'Hace 30min',
  },
] as const

// ─── Pipeline Summary ───
export interface PipelineStage {
  readonly label: string
  readonly count: number
  readonly color: string
}

export const pipelineStages: readonly PipelineStage[] = [
  { label: 'Contacto 1°', count: 15, color: '#60A5FA' },
  { label: 'Propuesta', count: 8, color: '#3B82F6' },
  { label: 'Negociación', count: 5, color: '#F59E0B' },
  { label: 'Esperando Pago', count: 3, color: '#10B981' },
  { label: 'Cerrado', count: 12, color: '#059669' },
] as const

// ─── Hot Prospects ───
export interface Prospect {
  readonly name: string
  readonly status: string
  readonly value: string
  readonly timeAgo: string
}

export const hotProspects: readonly Prospect[] = [
  { name: 'Elena Salazar', status: 'PROPUESTA', value: '$320/mes', timeAgo: '2 días' },
  { name: 'Ricardo Méndez', status: 'EN PROGRESO', value: '$1,900/mes', timeAgo: '1 día' },
  { name: 'Patricia Ortiz', status: 'CONTACTO', value: '$640/mes', timeAgo: '3 días' },
] as const
