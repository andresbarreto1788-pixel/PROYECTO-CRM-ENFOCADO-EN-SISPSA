// ─── Pipeline Kanban Data ───

export type PipelineStageId = 'nuevo' | 'propuesta' | 'negociacion' | 'esperando_pago' | 'afiliacion_exitosa'
export type ProspectPriority = 'Alta' | 'Media' | 'Baja'

export interface PipelineColumn {
  readonly id: PipelineStageId
  readonly title: string
  readonly color: string
  readonly dotColor: string
}

export const pipelineColumns: readonly PipelineColumn[] = [
  { id: 'nuevo',              title: 'Nuevo Prospecto',     color: '#60A5FA', dotColor: 'bg-blue-400' },
  { id: 'propuesta',          title: 'Propuesta Enviada',   color: '#3B82F6', dotColor: 'bg-blue-500' },
  { id: 'negociacion',        title: 'En Negociación',      color: '#F59E0B', dotColor: 'bg-amber-500' },
  { id: 'esperando_pago',     title: 'Esperando Pago',      color: '#10B981', dotColor: 'bg-emerald-500' },
  { id: 'afiliacion_exitosa', title: 'Afiliación Exitosa',  color: '#059669', dotColor: 'bg-emerald-600' },
] as const

export interface ProspectCard {
  id: string
  nombre: string
  apellido: string
  telefono: string
  email: string
  plan: string
  valorEstimado: number
  prioridad: ProspectPriority
  diasInactividad: number
  stageId: PipelineStageId
  notas?: string
  vendedorId: string
  zona?: string
}

export const priorityConfig: Record<ProspectPriority, { bg: string; text: string; border: string }> = {
  Alta:  { bg: 'bg-red-500/10',    text: 'text-red-600',    border: 'border-red-200' },
  Media: { bg: 'bg-amber-500/10',  text: 'text-amber-600',  border: 'border-amber-200' },
  Baja:  { bg: 'bg-blue-500/10',   text: 'text-blue-600',   border: 'border-blue-200' },
}

// Initial prospects data
export const initialProspects: ProspectCard[] = []
