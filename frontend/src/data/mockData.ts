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
  name: 'Administrador',
  role: 'Director de Red',
  initials: 'AD',
}

// ─── KPI Data (Zeroed for Production) ───
export interface KpiCard {
  readonly label: string
  readonly value: string
  readonly change: string
  readonly trend: 'up' | 'down' | 'neutral'
  readonly subtitle: string
}

export const kpiCards: readonly KpiCard[] = [
  { label: 'Comisiones del Mes', value: '$0.00', change: '0%', trend: 'neutral', subtitle: 'Pendiente de gestión' },
  { label: 'Pólizas Activas', value: '0', change: '0', trend: 'neutral', subtitle: 'Sin registros' },
  { label: 'Pólizas por Vencer', value: '0', change: '0', trend: 'neutral', subtitle: 'Próximos 30 días' },
  { label: 'Tasa de Retención', value: '0%', change: '0%', trend: 'neutral', subtitle: 'Meta: 90%' },
] as const

// ─── Alert Items (Empty for Production) ───
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

export const alertItems: readonly AlertItem[] = []

// ─── Pipeline Summary (Zeroed for Production) ───
export interface PipelineStage {
  readonly label: string
  readonly count: number
  readonly color: string
}

export const pipelineStages: readonly PipelineStage[] = [
  { label: 'Contacto 1°', count: 0, color: '#60A5FA' },
  { label: 'Propuesta', count: 0, color: '#3B82F6' },
  { label: 'Negociación', count: 0, color: '#F59E0B' },
  { label: 'Esperando Pago', count: 0, color: '#10B981' },
  { label: 'Cerrado', count: 0, color: '#059669' },
] as const

// ─── Hot Prospects (Empty for Production) ───
export interface Prospect {
  readonly name: string
  readonly status: string
  readonly value: string
  readonly timeAgo: string
}

export const hotProspects: readonly Prospect[] = []
