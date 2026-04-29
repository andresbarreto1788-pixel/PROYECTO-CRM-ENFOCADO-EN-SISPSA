// ─── Affiliates Data ───
// Plans with real pricing from SISPSA Red Empresarial

export type PlanType = 'Bronce' | 'Plata' | 'Oro' | 'Esmeralda Básico' | 'Esmeralda Plus' | 'Diamante'
export type AfiliadoStatus = 'Activo' | 'Pendiente' | 'Vencido'

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
}

export const clinicas = [
  'Clínica El Ávila',
  'Centro Médico Caracas',
  'Clínica Santa Sofía',
  'Hospital de Clínicas',
  'Policlínica Metropolitana',
] as const

export const afiliadosData: readonly Afiliado[] = [
  {
    id: 'AF001',
    nombre: 'María',
    apellido: 'González',
    email: 'maria.gonzalez@email.com',
    cedula: 'V-18.456.789',
    plan: 'Oro',
    cuotaMensual: 29,
    fechaInicio: '15/01/2024',
    ultimoPago: '15/04/2024',
    ultimoPagoRelativo: 'Hace 5 días',
    estado: 'Activo',
    clinica: 'Clínica El Ávila',
  },
  {
    id: 'AF002',
    nombre: 'José',
    apellido: 'Ramírez',
    email: 'jose.ramirez@email.com',
    cedula: 'V-22.345.678',
    plan: 'Plata',
    cuotaMensual: 25,
    fechaInicio: '03/02/2024',
    ultimoPago: '01/04/2024',
    ultimoPagoRelativo: 'Hace 19 días',
    estado: 'Pendiente',
    clinica: 'Centro Médico Caracas',
  },
  {
    id: 'AF003',
    nombre: 'Ana',
    apellido: 'Pérez',
    email: 'ana.perez@email.com',
    cedula: 'V-15.678.901',
    plan: 'Esmeralda Plus',
    cuotaMensual: 34,
    fechaInicio: '20/03/2023',
    ultimoPago: '20/04/2024',
    ultimoPagoRelativo: 'Hoy',
    estado: 'Activo',
    clinica: 'Clínica Santa Sofía',
  },
  {
    id: 'AF004',
    nombre: 'Carlos',
    apellido: 'Díaz',
    email: 'carlos.diaz@email.com',
    cedula: 'V-19.012.345',
    plan: 'Bronce',
    cuotaMensual: 20,
    fechaInicio: '12/06/2023',
    ultimoPago: '28/03/2024',
    ultimoPagoRelativo: 'Hace 23 días',
    estado: 'Vencido',
    clinica: 'Hospital de Clínicas',
  },
  {
    id: 'AF005',
    nombre: 'Laura',
    apellido: 'Martínez',
    email: 'laura.martinez@email.com',
    cedula: 'V-25.789.012',
    plan: 'Oro',
    cuotaMensual: 29,
    fechaInicio: '05/01/2024',
    ultimoPago: '05/04/2024',
    ultimoPagoRelativo: 'Hace 15 días',
    estado: 'Activo',
    clinica: 'Clínica El Ávila',
  },
  {
    id: 'AF006',
    nombre: 'Roberto',
    apellido: 'Sánchez',
    email: 'roberto.sanchez@email.com',
    cedula: 'V-17.234.567',
    plan: 'Plata',
    cuotaMensual: 25,
    fechaInicio: '18/09/2023',
    ultimoPago: '18/04/2024',
    ultimoPagoRelativo: 'Hace 2 días',
    estado: 'Activo',
    clinica: 'Centro Médico Caracas',
  },
  {
    id: 'AF007',
    nombre: 'Carmen',
    apellido: 'Herrera',
    email: 'carmen.herrera@email.com',
    cedula: 'V-20.567.890',
    plan: 'Diamante',
    cuotaMensual: 39,
    fechaInicio: '22/11/2023',
    ultimoPago: '22/04/2024',
    ultimoPagoRelativo: 'Hoy',
    estado: 'Activo',
    clinica: 'Policlínica Metropolitana',
  },
  {
    id: 'AF008',
    nombre: 'Miguel',
    apellido: 'Torres',
    email: 'miguel.torres@email.com',
    cedula: 'V-16.890.123',
    plan: 'Bronce',
    cuotaMensual: 20,
    fechaInicio: '07/04/2023',
    ultimoPago: '07/01/2024',
    ultimoPagoRelativo: 'Hace 3 meses',
    estado: 'Vencido',
    clinica: 'Hospital de Clínicas',
  },
  {
    id: 'AF009',
    nombre: 'Isabella',
    apellido: 'Morales',
    email: 'isabella.morales@email.com',
    cedula: 'V-23.456.789',
    plan: 'Esmeralda Básico',
    cuotaMensual: 28,
    fechaInicio: '14/07/2023',
    ultimoPago: '14/04/2024',
    ultimoPagoRelativo: 'Hace 6 días',
    estado: 'Pendiente',
    clinica: 'Clínica Santa Sofía',
  },
  {
    id: 'AF010',
    nombre: 'Fernando',
    apellido: 'López',
    email: 'fernando.lopez@email.com',
    cedula: 'V-21.123.456',
    plan: 'Plata',
    cuotaMensual: 25,
    fechaInicio: '30/05/2023',
    ultimoPago: '30/04/2024',
    ultimoPagoRelativo: 'Hoy',
    estado: 'Activo',
    clinica: 'Centro Médico Caracas',
  },
  {
    id: 'AF011',
    nombre: 'Beatriz',
    apellido: 'Luna',
    email: 'beatriz.luna@email.com',
    cedula: 'V-14.992.102',
    plan: 'Oro',
    cuotaMensual: 29,
    fechaInicio: '01/08/2023',
    ultimoPago: '05/04/2024',
    ultimoPagoRelativo: 'Hace 15 días',
    estado: 'Activo',
    clinica: 'Clínica El Ávila',
  },
  {
    id: 'AF012',
    nombre: 'Ricardo',
    apellido: 'Méndez',
    email: 'ricardo.mendez@email.com',
    cedula: 'V-11.223.344',
    plan: 'Esmeralda Plus',
    cuotaMensual: 34,
    fechaInicio: '10/03/2023',
    ultimoPago: '18/04/2024',
    ultimoPagoRelativo: 'Hace 2 días',
    estado: 'Activo',
    clinica: 'Policlínica Metropolitana',
  },
  {
    id: 'AF013',
    nombre: 'Elena',
    apellido: 'Castro',
    email: 'elena.castro@email.com',
    cedula: 'V-20.558.778',
    plan: 'Plata',
    cuotaMensual: 25,
    fechaInicio: '22/11/2023',
    ultimoPago: '22/03/2024',
    ultimoPagoRelativo: 'Hace 29 días',
    estado: 'Vencido',
    clinica: 'Hospital de Clínicas',
  },
  {
    id: 'AF014',
    nombre: 'Héctor',
    apellido: 'Ruiz',
    email: 'hector.ruiz@email.com',
    cedula: 'V-18.776.321',
    plan: 'Bronce',
    cuotaMensual: 20,
    fechaInicio: '14/03/2024',
    ultimoPago: '',
    ultimoPagoRelativo: 'N/A',
    estado: 'Pendiente',
    clinica: 'Clínica El Ávila',
  },
  {
    id: 'AF015',
    nombre: 'Gabriela',
    apellido: 'Vargas',
    email: 'gabriela.vargas@email.com',
    cedula: 'V-24.112.990',
    plan: 'Diamante',
    cuotaMensual: 39,
    fechaInicio: '01/12/2023',
    ultimoPago: '01/04/2024',
    ultimoPagoRelativo: 'Hace 19 días',
    estado: 'Activo',
    clinica: 'Policlínica Metropolitana',
  },
] as const
