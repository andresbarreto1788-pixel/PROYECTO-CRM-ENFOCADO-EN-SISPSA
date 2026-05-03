// ─── Affiliates Data ───
// Plans with real pricing from SISPSA Red Empresarial

export type PlanType = 'Bronce' | 'Plata' | 'Oro' | 'Esmeralda Básico' | 'Esmeralda Plus' | 'Diamante'
export type AfiliadoStatus = 'Activo' | 'Pendiente' | 'Vencido'

export const planOptions: PlanType[] = ['Bronce', 'Plata', 'Oro', 'Esmeralda Básico', 'Esmeralda Plus', 'Diamante']
export const statusOptions: AfiliadoStatus[] = ['Activo', 'Pendiente', 'Vencido']

export interface Plan {
  readonly name: PlanType
  readonly price: number
  readonly colorClass: string
  readonly bgClass: string
}

export const planCatalog: Record<PlanType, Plan> = {
  'Bronce':           { name: 'Bronce',           price: 20, colorClass: 'text-amber-800',   bgClass: 'bg-amber-800/10' },
  'Plata':            { name: 'Plata',            price: 25, colorClass: 'text-slate-600',   bgClass: 'bg-slate-500/10' },
  'Oro':              { name: 'Oro',              price: 29, colorClass: 'text-amber-600',   bgClass: 'bg-amber-500/10' },
  'Esmeralda Básico': { name: 'Esmeralda Básico', price: 28, colorClass: 'text-emerald-600', bgClass: 'bg-emerald-500/10' },
  'Esmeralda Plus':   { name: 'Esmeralda Plus',   price: 34, colorClass: 'text-emerald-700', bgClass: 'bg-emerald-600/10' },
  'Diamante':         { name: 'Diamante',         price: 39, colorClass: 'text-blue-600',    bgClass: 'bg-blue-500/10' },
}

export interface Afiliado {
  readonly id: string
  readonly nombre: string
  readonly apellido: string
  readonly email: string
  readonly cedula: string
  readonly plan: PlanType
  readonly cuotaMensual: number
  readonly fechaInicio: string
  readonly ultimoPago: string
  readonly ultimoPagoRelativo: string
  readonly estado: AfiliadoStatus
  readonly clinica: string
  readonly zona: string
}

export const clinicas = [
  'Clínica El Ávila',
  'Centro Médico Caracas',
  'Clínica Santa Sofía',
  'Hospital de Clínicas',
  'Policlínica Metropolitana',
] as const

export const estadosVenezuela = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo', 'Cojedes', 
  'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara', 'Mérida', 'Miranda', 
  'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 'Táchira', 'Trujillo', 'Vargas (La Guaira)', 
  'Yaracuy', 'Zulia'
] as const

export const afiliadosData: readonly Afiliado[] = []
