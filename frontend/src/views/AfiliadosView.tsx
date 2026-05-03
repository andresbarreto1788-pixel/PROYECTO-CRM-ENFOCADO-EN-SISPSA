import { useState, useMemo, useRef, useEffect } from 'react'
import * as XLSX from 'xlsx'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import {
  Search, Plus, Download, Upload, ChevronDown, ChevronUp, ChevronsUpDown,
  MoreHorizontal, Eye, CreditCard, AlertTriangle, X, ChevronLeft, ChevronRight,
  MessageCircle, Trash2, FileUp, FileDown, CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'
import {
  clinicas, estadosVenezuela, planOptions, statusOptions, planCatalog,
  type Afiliado, type AfiliadoStatus, type PlanType,
} from '@/data/afiliadosData'

/* ─── Types ─── */
type SortField = 'nombre' | 'cedula' | 'plan' | 'cuotaMensual' | 'fechaInicio' | 'ultimoPago' | 'estado'
type SortDirection = 'asc' | 'desc' | null
interface SortConfig { field: SortField; direction: SortDirection }

const ROWS_PER_PAGE = 10

const statusConfig: Record<AfiliadoStatus, { dot: string; bg: string; text: string }> = {
  Activo:    { dot: 'bg-success',  bg: 'bg-success/10',  text: 'text-success' },
  Pendiente: { dot: 'bg-warning',  bg: 'bg-warning/10',  text: 'text-warning' },
  Vencido:   { dot: 'bg-danger',   bg: 'bg-danger/10',   text: 'text-danger' },
}

/* ─── SelectFilter ─── */
interface SelectFilterProps {
  readonly label: string
  readonly value: string
  readonly options: readonly string[]
  readonly onChange: (value: string) => void
}

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn('flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors hover:bg-canvas', value !== 'Todos' && 'border-primary/50 bg-primary/5')}
      >
        <span className="text-text-muted">{label}:</span>
        <span className="font-medium text-text-primary">{value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-surface py-1 shadow-[var(--shadow-overlay)]">
          <button onClick={() => { onChange('Todos'); setOpen(false) }} className={cn('flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-canvas', value === 'Todos' && 'bg-primary/5 font-medium text-primary')}>Todos</button>
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false) }} className={cn('flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-canvas', value === opt && 'bg-primary/5 font-medium text-primary')}>
              {label === 'Estado' && <span className={cn('h-2 w-2 rounded-full', statusConfig[opt as AfiliadoStatus]?.dot)} />}
              {label === 'Plan' && <span className={cn('h-2 w-2 rounded-full', planCatalog[opt as PlanType]?.bgClass.replace('/10', ''))} />}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── RowActions ─── */
interface RowActionsProps {
  readonly afiliado: Afiliado
  readonly onDelete: () => void
  readonly onSuspend: () => void
  readonly onPayment: () => void
  readonly onView: () => void
}

function RowActions({ afiliado, onDelete, onSuspend, onPayment, onView }: RowActionsProps) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setConfirmDelete(false) } }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-canvas hover:text-text-primary">
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-52 rounded-lg border border-border bg-surface py-1 shadow-[var(--shadow-overlay)]">
          <button onClick={() => { onView(); setOpen(false) }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas">
            <Eye className="h-4 w-4 text-text-muted" /> Ver Perfil
          </button>
          <button onClick={() => { onPayment(); setOpen(false) }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas">
            <CreditCard className="h-4 w-4 text-text-muted" /> Registrar Pago
          </button>
          <a
            href={`https://wa.me/${afiliado.cedula}?text=Hola%20${afiliado.nombre}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas"
          >
            <MessageCircle className="h-4 w-4 text-whatsapp" /> Enviar WhatsApp
          </a>
          {afiliado.estado !== 'Vencido' && (
            <button onClick={() => { onSuspend(); setOpen(false) }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-warning transition-colors hover:bg-warning/5">
              <AlertTriangle className="h-4 w-4" /> Suspender
            </button>
          )}
          <div className="my-1 border-t border-border" />
          {confirmDelete ? (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-danger mb-2">¿Confirmar eliminación?</p>
              <div className="flex gap-2">
                <button onClick={() => { onDelete(); setOpen(false) }} className="flex-1 rounded-md bg-danger py-1 text-xs font-bold text-white hover:bg-danger/90">Eliminar</button>
                <button onClick={() => setConfirmDelete(false)} className="flex-1 rounded-md border border-border py-1 text-xs hover:bg-canvas">Cancelar</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/5">
              <Trash2 className="h-4 w-4" /> Eliminar Afiliado
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── SortableHeader ─── */
interface SortableHeaderProps {
  readonly label: string; readonly field: SortField; readonly sort: SortConfig
  readonly onSort: (field: SortField) => void; readonly className?: string
}
function SortableHeader({ label, field, sort, onSort, className }: SortableHeaderProps) {
  const isActive = sort.field === field && sort.direction !== null
  return (
    <th className={cn('cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary', className)} onClick={() => onSort(field)}>
      <div className="flex items-center gap-1.5">
        {label}
        {isActive ? (sort.direction === 'asc' ? <ChevronUp className="h-3.5 w-3.5 text-primary" /> : <ChevronDown className="h-3.5 w-3.5 text-primary" />) : <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}
      </div>
    </th>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW
   ═══════════════════════════════════════════ */

export default function AfiliadosView() {
  const { user } = useAuth()
  const { afiliados, addAfiliado, updateAfiliado, deleteAfiliado, addProspect } = useCRM()
  const { addNotification } = useNotifications()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [planFilter, setPlanFilter] = useState('Todos')
  const [clinicaFilter, setClinicaFilter] = useState('Todos')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<SortConfig>({ field: 'nombre', direction: null })
  const [currentPage, setCurrentPage] = useState(1)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewAfiliado, setViewAfiliado] = useState<Afiliado | null>(null)
  const [paymentAfiliado, setPaymentAfiliado] = useState<Afiliado | null>(null)
  const [paymentDate, setPaymentDate] = useState('')
  const [importPreview, setImportPreview] = useState<Afiliado[]>([])
  const [showImportModal, setShowImportModal] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)

  // ─── Filtering ───
  const filteredData = useMemo(() => afiliados.filter(a => {
    if (user?.role === 'vendedor' && a.zona !== user.zone) return false
    const matchesSearch = searchQuery === '' || `${a.nombre} ${a.apellido}`.toLowerCase().includes(searchQuery.toLowerCase()) || a.cedula.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch && (statusFilter === 'Todos' || a.estado === statusFilter) && (planFilter === 'Todos' || a.plan === planFilter) && (clinicaFilter === 'Todos' || a.clinica === clinicaFilter)
  }), [afiliados, searchQuery, statusFilter, planFilter, clinicaFilter, user])

  // ─── Sorting ───
  const sortedData = useMemo(() => {
    if (sort.direction === null) return filteredData
    return [...filteredData].sort((a, b) => {
      let valA: string | number = sort.field === 'nombre' ? `${a.nombre} ${a.apellido}` : sort.field === 'cuotaMensual' ? a.cuotaMensual : a[sort.field]
      let valB: string | number = sort.field === 'nombre' ? `${b.nombre} ${b.apellido}` : sort.field === 'cuotaMensual' ? b.cuotaMensual : b[sort.field]
      if (typeof valA === 'number' && typeof valB === 'number') return sort.direction === 'asc' ? valA - valB : valB - valA
      return sort.direction === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA))
    })
  }, [filteredData, sort])

  const totalPages = Math.ceil(sortedData.length / ROWS_PER_PAGE)
  const paginatedData = sortedData.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)
  useMemo(() => { setCurrentPage(1) }, [searchQuery, statusFilter, planFilter, clinicaFilter])

  const hasFilters = searchQuery || statusFilter !== 'Todos' || planFilter !== 'Todos' || clinicaFilter !== 'Todos'
  function clearFilters() { setSearchQuery(''); setStatusFilter('Todos'); setPlanFilter('Todos'); setClinicaFilter('Todos') }

  // ─── Add Affiliate ───
  function handleAddAffiliate(e: React.FormEvent<HTMLFormElement & EventTarget>) {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const plan = formData.get('plan') as PlanType
    const newAfiliado: Afiliado = {
      id: crypto.randomUUID(),
      nombre: formData.get('nombre') as string,
      apellido: formData.get('apellido') as string,
      email: formData.get('email') as string,
      cedula: formData.get('cedula') as string,
      plan,
      cuotaMensual: planCatalog[plan]?.price || 0,
      fechaInicio: new Date().toISOString().split('T')[0],
      ultimoPago: '',
      ultimoPagoRelativo: 'Sin pagos',
      estado: 'Pendiente',
      clinica: formData.get('clinica') as string,
      zona: formData.get('zona') as string || user?.zone || 'Nacional',
    }
    setTimeout(() => {
      addAfiliado(newAfiliado)
      // Auto-add to pipeline as new prospect
      addProspect({
        id: crypto.randomUUID(),
        nombre: newAfiliado.nombre,
        apellido: newAfiliado.apellido,
        telefono: '',
        email: newAfiliado.email,
        plan: newAfiliado.plan,
        valorEstimado: newAfiliado.cuotaMensual,
        prioridad: 'Media',
        diasInactividad: 0,
        stageId: 'nuevo',
        vendedorId: user?.email || '',
        zona: newAfiliado.zona,
      })
      addNotification('success', 'Nuevo Afiliado Registrado', `${newAfiliado.nombre} ${newAfiliado.apellido} — Plan ${newAfiliado.plan} ($${newAfiliado.cuotaMensual}/mes) añadido al pipeline.`)
      setIsSubmitting(false)
      setIsModalOpen(false)
    }, 800)
  }

  // ─── Row Actions ───
  function handleDelete(id: string) {
    const a = afiliados.find(x => x.id === id)
    deleteAfiliado(id)
    addNotification('warning', 'Afiliado Eliminado', `${a?.nombre} ${a?.apellido} fue removido del sistema.`)
  }

  function handleSuspend(id: string) {
    const a = afiliados.find(x => x.id === id)
    updateAfiliado(id, { estado: 'Vencido' } as Partial<Afiliado>)
    addNotification('warning', 'Afiliado Suspendido', `${a?.nombre} ${a?.apellido} fue marcado como Vencido.`)
  }

  function handleRegisterPayment() {
    if (!paymentAfiliado || !paymentDate) return
    const date = new Date(paymentDate)
    const days = Math.floor((Date.now() - date.getTime()) / 86400000)
    const relative = days === 0 ? 'Hoy' : days === 1 ? 'Ayer' : `Hace ${days} días`
    updateAfiliado(paymentAfiliado.id, {
      ultimoPago: paymentDate,
      ultimoPagoRelativo: relative,
      estado: 'Activo',
    } as Partial<Afiliado>)
    addNotification('success', 'Pago Registrado', `Pago de ${paymentAfiliado.nombre} ${paymentAfiliado.apellido} — $${paymentAfiliado.cuotaMensual} registrado.`)
    setPaymentAfiliado(null)
    setPaymentDate('')
  }

  // ─── Export CSV ───
  function handleExportCSV() {
    const headers = ['Nombre', 'Apellido', 'Cédula', 'Email', 'Plan', 'Cuota Mensual', 'Fecha Inicio', 'Último Pago', 'Estado', 'Clínica', 'Zona']
    const rows = sortedData.map(a => [a.nombre, a.apellido, a.cedula, a.email, a.plan, a.cuotaMensual, a.fechaInicio, a.ultimoPago || '', a.estado, a.clinica, a.zona])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `afiliados-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
    addNotification('info', 'Reporte Exportado', `${sortedData.length} afiliados exportados a CSV.`)
  }

  // ─── Download Template ───
  function handleDownloadTemplate() {
    const template = '"Nombre","Apellido","Cedula","Email","Plan","Zona","Clinica"\n"Juan","Pérez","V-12345678","juan@ejemplo.com","Bronce","Distrito Capital","Clínica El Ávila"'
    const blob = new Blob(['﻿' + template], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'plantilla-importacion-afiliados.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  // ─── Import CSV/Excel ───
  function parseRowsToAfiliados(rows: Record<string, string>[]): Afiliado[] {
    const get = (row: Record<string, string>, keys: string[]) => {
      for (const k of keys) {
        const found = Object.keys(row).find(rk => rk.toLowerCase().includes(k))
        if (found) return row[found]?.trim() || ''
      }
      return ''
    }
    return rows.map(row => {
      const rawPlan = get(row, ['plan']) || 'Bronce'
      const plan = (planCatalog[rawPlan as PlanType] ? rawPlan : 'Bronce') as PlanType
      const nombre = get(row, ['nombre', 'name', 'first'])
      if (!nombre) return null
      return {
        id: crypto.randomUUID(),
        nombre,
        apellido: get(row, ['apellido', 'last', 'surname']),
        cedula: get(row, ['cedula', 'documento', 'id', 'ci']),
        email: get(row, ['email', 'correo', 'mail']),
        plan,
        cuotaMensual: planCatalog[plan].price,
        fechaInicio: new Date().toISOString().split('T')[0],
        ultimoPago: '',
        ultimoPagoRelativo: 'Sin pagos',
        estado: 'Activo' as AfiliadoStatus,
        clinica: get(row, ['clinica', 'clínica', 'clinic']) || clinicas[0],
        zona: get(row, ['zona', 'estado', 'region', 'state']) || user?.zone || 'Nacional',
      }
    }).filter(Boolean) as Afiliado[]
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        let rows: Record<string, string>[]
        if (isExcel) {
          const data = new Uint8Array(event.target?.result as ArrayBuffer)
          const wb = XLSX.read(data, { type: 'array' })
          const ws = wb.Sheets[wb.SheetNames[0]]
          rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' })
        } else {
          const text = event.target?.result as string
          const wb = XLSX.read(text, { type: 'string' })
          const ws = wb.Sheets[wb.SheetNames[0]]
          rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' })
        }
        const imported = parseRowsToAfiliados(rows)
        if (imported.length === 0) {
          addNotification('error', 'Archivo Vacío', 'No se encontraron registros válidos. Descarga la plantilla para ver el formato correcto.')
          return
        }
        setImportPreview(imported)
        setShowImportModal(true)
      } catch {
        addNotification('error', 'Error de Importación', 'El archivo no pudo ser procesado. Verifica el formato.')
      }
    }
    if (isExcel) reader.readAsArrayBuffer(file)
    else reader.readAsText(file, 'utf-8')
    e.target.value = ''
  }

  function confirmImport() {
    importPreview.forEach(a => {
      addAfiliado(a)
      addProspect({
        id: crypto.randomUUID(),
        nombre: a.nombre, apellido: a.apellido, telefono: '',
        email: a.email, plan: a.plan, valorEstimado: a.cuotaMensual,
        prioridad: 'Media', diasInactividad: 0, stageId: 'nuevo',
        vendedorId: user?.email || '', zona: a.zona,
      })
    })
    addNotification('success', 'Importación Completada', `${importPreview.length} afiliados importados y añadidos al pipeline.`)
    setShowImportModal(false)
    setImportPreview([])
  }

  // ─── Sort + Select ───
  function handleSort(field: SortField) {
    setSort(prev => prev.field === field
      ? { field, direction: prev.direction === null ? 'asc' : prev.direction === 'asc' ? 'desc' : null }
      : { field, direction: 'asc' })
  }
  function toggleRow(id: string) { setSelectedRows(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next }) }
  function toggleAll() { setSelectedRows(selectedRows.size === paginatedData.length ? new Set() : new Set(paginatedData.map(a => a.id))) }

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Header ─── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>Gestión de Afiliados</h1>
          <p className="mt-1 text-sm text-text-muted">Administra y da seguimiento a todos tus afiliados y sus estados de póliza.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button onClick={handleDownloadTemplate} title="Descargar plantilla CSV" className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-canvas hover:text-text-primary">
            <FileDown className="h-4 w-4" /> Plantilla
          </button>
          <button onClick={() => importInputRef.current?.click()} className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-canvas">
            <FileUp className="h-4 w-4" /> Importar
          </button>
          <input ref={importInputRef} type="file" accept=".csv,.xlsx,.xls,.txt" className="hidden" onChange={handleImportFile} />
          <button onClick={handleExportCSV} className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-canvas">
            <Download className="h-4 w-4" /> Exportar
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
            <Plus className="h-4 w-4" /> Nueva Afiliación
          </button>
        </div>
      </div>

      {/* ─── Filters ─── */}
      <div className="card-re flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[280px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filtrar por cédula o nombre..." className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <SelectFilter label="Estado" value={statusFilter} options={statusOptions} onChange={setStatusFilter} />
        <SelectFilter label="Plan" value={planFilter} options={planOptions} onChange={setPlanFilter} />
        <SelectFilter label="Clínica" value={clinicaFilter} options={clinicas} onChange={setClinicaFilter} />
        {hasFilters && <button onClick={clearFilters} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-canvas hover:text-text-primary"><X className="h-3.5 w-3.5" /> Limpiar</button>}
      </div>

      {/* ─── Desktop Table ─── */}
      <div className="desktop-table-wrap">
        <div className="card-re overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-canvas">
                  <th className="w-12 px-4 py-3"><input type="checkbox" checked={selectedRows.size === paginatedData.length && paginatedData.length > 0} onChange={toggleAll} className="h-4 w-4 rounded border-border text-primary accent-primary" /></th>
                  <SortableHeader label="Afiliado" field="nombre" sort={sort} onSort={handleSort} className="min-w-[220px]" />
                  <SortableHeader label="Cédula" field="cedula" sort={sort} onSort={handleSort} />
                  <SortableHeader label="Plan" field="plan" sort={sort} onSort={handleSort} />
                  <SortableHeader label="Cuota Mensual" field="cuotaMensual" sort={sort} onSort={handleSort} className="text-right" />
                  <SortableHeader label="Fecha Inicio" field="fechaInicio" sort={sort} onSort={handleSort} />
                  <SortableHeader label="Último Pago" field="ultimoPago" sort={sort} onSort={handleSort} />
                  <SortableHeader label="Estado" field="estado" sort={sort} onSort={handleSort} />
                  <th className="w-12 px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {paginatedData.map(afiliado => {
                  const plan = planCatalog[afiliado.plan]
                  const status = statusConfig[afiliado.estado]
                  const isSelected = selectedRows.has(afiliado.id)
                  return (
                    <tr key={afiliado.id} className={cn('border-b border-border transition-colors', isSelected ? 'bg-primary/5' : 'hover:bg-canvas')}>
                      <td className="px-4 py-3"><input type="checkbox" checked={isSelected} onChange={() => toggleRow(afiliado.id)} className="h-4 w-4 rounded border-border text-primary accent-primary" /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{afiliado.nombre[0]}{afiliado.apellido[0]}</div>
                          <div className="min-w-0"><p className="truncate text-sm font-medium text-text-primary">{afiliado.nombre} {afiliado.apellido}</p><p className="truncate text-xs text-text-muted">{afiliado.email}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className="tabular-nums text-sm text-text-primary">{afiliado.cedula}</span></td>
                      <td className="px-4 py-3"><span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', plan.bgClass, plan.colorClass)}>{afiliado.plan}</span></td>
                      <td className="px-4 py-3 text-right"><span className="tabular-nums text-sm font-semibold text-text-primary">${afiliado.cuotaMensual.toFixed(2)}</span></td>
                      <td className="px-4 py-3"><span className="tabular-nums text-sm text-text-primary">{afiliado.fechaInicio}</span></td>
                      <td className="px-4 py-3"><div><span className="tabular-nums text-sm text-text-primary">{afiliado.ultimoPago || '—'}</span><p className="text-xs text-text-muted">{afiliado.ultimoPagoRelativo}</p></div></td>
                      <td className="px-4 py-3"><span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', status.bg, status.text)}><span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />{afiliado.estado}</span></td>
                      <td className="px-4 py-3">
                        <RowActions
                          afiliado={afiliado}
                          onDelete={() => handleDelete(afiliado.id)}
                          onSuspend={() => handleSuspend(afiliado.id)}
                          onPayment={() => { setPaymentAfiliado(afiliado); setPaymentDate(new Date().toISOString().split('T')[0]) }}
                          onView={() => setViewAfiliado(afiliado)}
                        />
                      </td>
                    </tr>
                  )
                })}
                {paginatedData.length === 0 && (
                  <tr><td colSpan={9} className="px-4 py-16 text-center"><p className="text-base font-medium text-text-primary">No hay afiliados registrados</p><p className="mt-1 text-sm text-text-muted">Usa "Nueva Afiliación" o importa tu libreta de clientes en CSV.</p></td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-canvas px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-muted">Mostrando {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, sortedData.length)} de <span className="font-medium text-text-primary">{sortedData.length}</span> afiliados</span>
              {selectedRows.size > 0 && <span className="text-sm text-text-muted">• {selectedRows.size} seleccionada(s)</span>}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft className="h-3.5 w-3.5" />Anterior</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={cn('flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors', page === currentPage ? 'bg-primary text-white' : 'text-text-muted hover:bg-canvas hover:text-text-primary')}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed">Siguiente<ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile Cards ─── */}
      <div className="mobile-card-list">
        {paginatedData.map(afiliado => {
          const plan = planCatalog[afiliado.plan]
          const status = statusConfig[afiliado.estado]
          return (
            <div key={afiliado.id} className="mobile-afiliado-card">
              <div className="mac-header">
                <div className="mac-name">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{afiliado.nombre[0]}{afiliado.apellido[0]}</div>
                  <div><p className="text-sm font-medium text-text-primary">{afiliado.nombre} {afiliado.apellido}</p><p className="text-xs text-text-muted">{afiliado.email}</p></div>
                </div>
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', status.bg, status.text)}><span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />{afiliado.estado}</span>
              </div>
              <div className="mac-fields">
                <div className="mac-field"><label>Cédula</label><span>{afiliado.cedula}</span></div>
                <div className="mac-field"><label>Plan</label><span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', plan.bgClass, plan.colorClass)}>{afiliado.plan}</span></div>
                <div className="mac-field"><label>Cuota</label><span>${afiliado.cuotaMensual.toFixed(2)}</span></div>
                <div className="mac-field"><label>Último Pago</label><span>{afiliado.ultimoPagoRelativo}</span></div>
              </div>
              <div className="mac-actions">
                <button onClick={() => setViewAfiliado(afiliado)}><Eye className="h-3.5 w-3.5" /> Ver</button>
                <button onClick={() => { setPaymentAfiliado(afiliado); setPaymentDate(new Date().toISOString().split('T')[0]) }}><CreditCard className="h-3.5 w-3.5" /> Pago</button>
                <button onClick={() => handleDelete(afiliado.id)} className="text-danger"><Trash2 className="h-3.5 w-3.5" /> Eliminar</button>
              </div>
            </div>
          )
        })}
        {paginatedData.length === 0 && <div className="text-center py-8"><p className="text-sm text-text-muted">No se encontraron afiliados.</p><button onClick={clearFilters} className="mt-2 text-sm font-medium text-primary hover:underline">Limpiar filtros</button></div>}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-muted">{((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, sortedData.length)} de {sortedData.length}</span>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center rounded-md border border-border bg-surface px-3 py-2 text-sm disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center rounded-md border border-border bg-surface px-3 py-2 text-sm disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Nueva Afiliación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="card-re relative w-[95vw] max-w-[500px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <h3 className="text-lg font-bold text-text-primary">Nueva Afiliación</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-danger"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddAffiliate} className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Nombre</label><input name="nombre" required type="text" placeholder="Ej: Juan" className="form-input text-sm" /></div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Apellido</label><input name="apellido" required type="text" placeholder="Ej: Pérez" className="form-input text-sm" /></div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cédula</label><input name="cedula" required type="text" placeholder="V-12345678" className="form-input text-sm" /></div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email</label><input name="email" required type="email" placeholder="juan@ejemplo.com" className="form-input text-sm" /></div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Plan de Salud</label>
                  <select name="plan" required className="form-input text-sm">
                    {planOptions.map(opt => <option key={opt} value={opt}>{opt} — ${planCatalog[opt].price}/mes</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Estado / Zona</label>
                  <select name="zona" required className="form-input text-sm" defaultValue={user?.zone && user.zone !== 'Nacional' ? user.zone : 'Distrito Capital'}>
                    <option value="Nacional">Nacional</option>
                    {estadosVenezuela.map(est => <option key={est} value={est}>{est}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Clínica Preferida</label>
                  <select name="clinica" required className="form-input text-sm">
                    {clinicas.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost py-2">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center gap-2 px-8 py-2">{isSubmitting ? 'Registrando...' : 'Finalizar Registro'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ver Perfil */}
      {viewAfiliado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setViewAfiliado(null)} />
          <div className="card-re relative w-[95vw] max-w-[480px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <h3 className="text-lg font-bold text-text-primary">Perfil del Afiliado</h3>
              <button onClick={() => setViewAfiliado(null)} className="text-text-muted hover:text-danger"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{viewAfiliado.nombre[0]}{viewAfiliado.apellido[0]}</div>
                <div>
                  <p className="text-lg font-bold text-text-primary">{viewAfiliado.nombre} {viewAfiliado.apellido}</p>
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', statusConfig[viewAfiliado.estado].bg, statusConfig[viewAfiliado.estado].text)}>
                    <span className={cn('h-1.5 w-1.5 rounded-full', statusConfig[viewAfiliado.estado].dot)} />{viewAfiliado.estado}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[['Cédula', viewAfiliado.cedula], ['Email', viewAfiliado.email], ['Plan', viewAfiliado.plan], ['Cuota Mensual', `$${viewAfiliado.cuotaMensual}/mes`], ['Fecha Inicio', viewAfiliado.fechaInicio], ['Último Pago', viewAfiliado.ultimoPago || 'Sin pagos'], ['Clínica', viewAfiliado.clinica], ['Zona', viewAfiliado.zona]].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-canvas p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{label}</p>
                    <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setPaymentAfiliado(viewAfiliado); setPaymentDate(new Date().toISOString().split('T')[0]); setViewAfiliado(null) }} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                  <CreditCard className="h-4 w-4" /> Registrar Pago
                </button>
                <button onClick={() => setViewAfiliado(null)} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-canvas">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registrar Pago */}
      {paymentAfiliado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setPaymentAfiliado(null)} />
          <div className="card-re relative w-[95vw] max-w-[400px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <h3 className="text-lg font-bold text-text-primary">Registrar Pago</h3>
              <button onClick={() => setPaymentAfiliado(null)} className="text-text-muted hover:text-danger"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-sm font-semibold text-text-primary">{paymentAfiliado.nombre} {paymentAfiliado.apellido}</p>
                <p className="text-xs text-text-muted">Plan {paymentAfiliado.plan} — ${paymentAfiliado.cuotaMensual}/mes</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Fecha del Pago</label>
                <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className="form-input text-sm" max={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleRegisterPayment} disabled={!paymentDate} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-success py-2.5 text-sm font-semibold text-white hover:bg-success/90 disabled:opacity-50">
                  <CheckCircle2 className="h-4 w-4" /> Confirmar Pago
                </button>
                <button onClick={() => setPaymentAfiliado(null)} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-canvas">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Importar Preview */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setShowImportModal(false)} />
          <div className="card-re relative w-[95vw] max-w-[560px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Confirmar Importación</h3>
                <p className="text-xs text-text-muted">{importPreview.length} afiliados detectados en el archivo</p>
              </div>
              <button onClick={() => setShowImportModal(false)} className="text-text-muted hover:text-danger"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="max-h-56 overflow-y-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-canvas sticky top-0"><tr className="border-b border-border">{['Nombre', 'Cédula', 'Plan', 'Zona'].map(h => <th key={h} className="px-3 py-2 text-left font-bold uppercase tracking-wider text-text-muted">{h}</th>)}</tr></thead>
                  <tbody>{importPreview.slice(0, 20).map(a => <tr key={a.id} className="border-b border-border last:border-0 hover:bg-canvas"><td className="px-3 py-2 font-medium">{a.nombre} {a.apellido}</td><td className="px-3 py-2 text-text-muted">{a.cedula || '—'}</td><td className="px-3 py-2"><span className={cn('rounded-full px-2 py-0.5 font-medium', planCatalog[a.plan].bgClass, planCatalog[a.plan].colorClass)}>{a.plan}</span></td><td className="px-3 py-2 text-text-muted">{a.zona}</td></tr>)}</tbody>
                </table>
                {importPreview.length > 20 && <p className="px-3 py-2 text-center text-xs text-text-muted">... y {importPreview.length - 20} más</p>}
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-xs text-primary">
                Todos los afiliados se añadirán también como prospectos en el pipeline en etapa "Nuevo Prospecto".
              </div>
              <div className="flex gap-3">
                <button onClick={confirmImport} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
                  <Upload className="h-4 w-4" /> Importar {importPreview.length} afiliados
                </button>
                <button onClick={() => setShowImportModal(false)} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-canvas">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
