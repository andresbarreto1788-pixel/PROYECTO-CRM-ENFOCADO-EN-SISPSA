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
}

export const priorityConfig: Record<ProspectPriority, { bg: string; text: string; border: string }> = {
  Alta:  { bg: 'bg-red-500/10',    text: 'text-red-600',    border: 'border-red-200' },
  Media: { bg: 'bg-amber-500/10',  text: 'text-amber-600',  border: 'border-amber-200' },
  Baja:  { bg: 'bg-blue-500/10',   text: 'text-blue-600',   border: 'border-blue-200' },
}

// Initial prospects data
export const initialProspects: ProspectCard[] = [
  // ─── Nuevo Prospecto ───
  {
    id: 'P001', nombre: 'Laura', apellido: 'Martínez', telefono: '+584121234567',
    email: 'laura@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Alta', diasInactividad: 1, stageId: 'nuevo',
  },
  {
    id: 'P002', nombre: 'Andrés', apellido: 'García', telefono: '+584149876543',
    email: 'andres@email.com', plan: 'Esmeralda Plus', valorEstimado: 34,
    prioridad: 'Media', diasInactividad: 3, stageId: 'nuevo',
  },
  {
    id: 'P003', nombre: 'Diana', apellido: 'Rojas', telefono: '+584161112233',
    email: 'diana@email.com', plan: 'Plata', valorEstimado: 25,
    prioridad: 'Baja', diasInactividad: 5, stageId: 'nuevo',
  },
  {
    id: 'P004', nombre: 'Sergio', apellido: 'Mendoza', telefono: '+584124445566',
    email: 'sergio@email.com', plan: 'Bronce', valorEstimado: 20,
    prioridad: 'Media', diasInactividad: 2, stageId: 'nuevo',
  },
  {
    id: 'P005', nombre: 'Patricia', apellido: 'Lozano', telefono: '+584167778899',
    email: 'patricia@email.com', plan: 'Diamante', valorEstimado: 39,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'nuevo',
  },
  {
    id: 'P006', nombre: 'Tomás', apellido: 'Urdaneta', telefono: '+584140001122',
    email: 'tomas@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Baja', diasInactividad: 7, stageId: 'nuevo',
  },

  // ─── Propuesta Enviada ───
  {
    id: 'P007', nombre: 'Mercedes', apellido: 'Rivas', telefono: '+584122223344',
    email: 'mercedes@email.com', plan: 'Esmeralda Básico', valorEstimado: 28,
    prioridad: 'Media', diasInactividad: 2, stageId: 'propuesta',
  },
  {
    id: 'P008', nombre: 'Felipe', apellido: 'Bravo', telefono: '+584145556677',
    email: 'felipe@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Alta', diasInactividad: 1, stageId: 'propuesta',
  },
  {
    id: 'P009', nombre: 'Valentina', apellido: 'Parra', telefono: '+584168889900',
    email: 'valentina@email.com', plan: 'Plata', valorEstimado: 25,
    prioridad: 'Baja', diasInactividad: 4, stageId: 'propuesta',
  },
  {
    id: 'P010', nombre: 'Gabriel', apellido: 'Soto', telefono: '+584121110022',
    email: 'gabriel@email.com', plan: 'Diamante', valorEstimado: 39,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'propuesta',
  },
  {
    id: 'P011', nombre: 'Lucía', apellido: 'Fernández', telefono: '+584143332211',
    email: 'lucia@email.com', plan: 'Bronce', valorEstimado: 20,
    prioridad: 'Media', diasInactividad: 6, stageId: 'propuesta',
  },

  // ─── En Negociación ───
  {
    id: 'P012', nombre: 'Ricardo', apellido: 'Hernández', telefono: '+584164443322',
    email: 'ricardo@email.com', plan: 'Esmeralda Plus', valorEstimado: 34,
    prioridad: 'Media', diasInactividad: 1, stageId: 'negociacion',
  },
  {
    id: 'P013', nombre: 'Patricia', apellido: 'Peña', telefono: '+584125554433',
    email: 'patricia.p@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'negociacion',
  },
  {
    id: 'P014', nombre: 'Emilio', apellido: 'Vargas', telefono: '+584146667788',
    email: 'emilio@email.com', plan: 'Esmeralda Básico', valorEstimado: 28,
    prioridad: 'Baja', diasInactividad: 3, stageId: 'negociacion',
  },
  {
    id: 'P015', nombre: 'Sofía', apellido: 'Contreras', telefono: '+584167776655',
    email: 'sofia@email.com', plan: 'Plata', valorEstimado: 25,
    prioridad: 'Media', diasInactividad: 2, stageId: 'negociacion',
  },

  // ─── Esperando Pago ───
  {
    id: 'P016', nombre: 'Francisco', apellido: 'Blanco', telefono: '+584128889944',
    email: 'francisco@email.com', plan: 'Diamante', valorEstimado: 39,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'esperando_pago',
  },
  {
    id: 'P017', nombre: 'Elena', apellido: 'Salazar', telefono: '+584149990011',
    email: 'elena@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Alta', diasInactividad: 1, stageId: 'esperando_pago',
  },
  {
    id: 'P018', nombre: 'Diego', apellido: 'Arévalo', telefono: '+584160001133',
    email: 'diego@email.com', plan: 'Esmeralda Plus', valorEstimado: 34,
    prioridad: 'Media', diasInactividad: 2, stageId: 'esperando_pago',
  },

  // ─── Afiliación Exitosa ───
  {
    id: 'P019', nombre: 'Camila', apellido: 'Ortiz', telefono: '+584122224466',
    email: 'camila@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P020', nombre: 'Nicolás', apellido: 'Gutiérrez', telefono: '+584143335577',
    email: 'nicolas@email.com', plan: 'Plata', valorEstimado: 25,
    prioridad: 'Media', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P021', nombre: 'Mariana', apellido: 'Delgado', telefono: '+584164446688',
    email: 'mariana@email.com', plan: 'Esmeralda Básico', valorEstimado: 28,
    prioridad: 'Baja', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P022', nombre: 'Sebastián', apellido: 'Moreno', telefono: '+584125557799',
    email: 'sebastian@email.com', plan: 'Diamante', valorEstimado: 39,
    prioridad: 'Alta', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P023', nombre: 'Valeria', apellido: 'Castro', telefono: '+584146668800',
    email: 'valeria@email.com', plan: 'Bronce', valorEstimado: 20,
    prioridad: 'Media', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P024', nombre: 'Rodrigo', apellido: 'Navarro', telefono: '+584167779911',
    email: 'rodrigo@email.com', plan: 'Esmeralda Plus', valorEstimado: 34,
    prioridad: 'Media', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P025', nombre: 'Daniela', apellido: 'Paredes', telefono: '+584128880022',
    email: 'daniela@email.com', plan: 'Oro', valorEstimado: 29,
    prioridad: 'Baja', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
  {
    id: 'P026', nombre: 'Alejandro', apellido: 'Flores', telefono: '+584149991133',
    email: 'alejandro@email.com', plan: 'Plata', valorEstimado: 25,
    prioridad: 'Baja', diasInactividad: 0, stageId: 'afiliacion_exitosa',
  },
]
