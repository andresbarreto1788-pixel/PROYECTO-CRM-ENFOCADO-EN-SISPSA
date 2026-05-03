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

// Production Reset: Content cleared for real training materials
export const videoTutorials: readonly VideoTutorial[] = []

export const resourceFiles: readonly ResourceFile[] = []

export const categoryLabels: Record<string, string> = {
  ventas: 'Ventas y Cierre',
  crm: 'Tutoriales CRM',
  producto: 'Conocimiento de Producto',
  retencion: 'Retención y Servicio',
}
