// ─── Academia & Resources Data ───

export interface VideoTutorial {
  readonly id: string
  readonly title: string
  readonly duration: string
  readonly category: 'ventas' | 'crm' | 'producto' | 'retencion'
  readonly thumbnail: string
  readonly views: string
  readonly date: string
}

export interface ResourceFile {
  readonly id: string
  readonly title: string
  readonly type: 'PDF' | 'PNG' | 'XLS' | 'PPT'
  readonly size: string
  readonly category: 'folletos' | 'logos' | 'tablas' | 'marketing'
}

export const videoTutorials: readonly VideoTutorial[] = [
  {
    id: 'V001',
    title: 'Dominando el Cierre de Ventas: Plan Oro',
    duration: '12:45',
    category: 'ventas',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400',
    views: '1.2k',
    date: 'Hace 2 días',
  },
  {
    id: 'V002',
    title: 'Guía Completa: Uso del Nuevo Pipeline Kanban',
    duration: '08:20',
    category: 'crm',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    views: '850',
    date: 'Hace 1 semana',
  },
  {
    id: 'V003',
    title: 'Beneficios Exclusivos del Plan Diamante',
    duration: '15:10',
    category: 'producto',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400',
    views: '2.4k',
    date: 'Hace 3 días',
  },
  {
    id: 'V004',
    title: 'Estrategias de Retención Post-Venta',
    duration: '10:30',
    category: 'retencion',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    views: '600',
    date: 'Hace 5 días',
  },
  {
    id: 'V005',
    title: 'Cómo Escanear Cédulas con la Nueva IA',
    duration: '05:15',
    category: 'crm',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400',
    views: '1.1k',
    date: 'Ayer',
  },
  {
    id: 'V006',
    title: 'Manejo de Objeciones en Salud Prepagada',
    duration: '18:00',
    category: 'ventas',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    views: '3.1k',
    date: 'Hace 2 semanas',
  },
] as const

export const resourceFiles: readonly ResourceFile[] = [
  { id: 'F001', title: 'Brochure Corporativo Red Empresarial 2024', type: 'PDF', size: '4.2 MB', category: 'folletos' },
  { id: 'F002', title: 'Tabla de Coberturas SISPSA — Comparativa', type: 'XLS', size: '1.1 MB', category: 'tablas' },
  { id: 'F003', title: 'Logotipos RE (Alta Resolución)', type: 'PNG', size: '12.5 MB', category: 'logos' },
  { id: 'F004', title: 'Plantilla de Presentación para Clientes', type: 'PPT', size: '8.4 MB', category: 'marketing' },
  { id: 'F005', title: 'Manual de Identidad Visual', type: 'PDF', size: '15.2 MB', category: 'logos' },
  { id: 'F006', title: 'Flyers para Redes Sociales — Abril', type: 'PNG', size: '22.0 MB', category: 'marketing' },
] as const

export const categoryLabels: Record<string, string> = {
  ventas: 'Ventas y Cierre',
  crm: 'Tutoriales CRM',
  producto: 'Conocimiento de Producto',
  retencion: 'Retención y Servicio',
}
