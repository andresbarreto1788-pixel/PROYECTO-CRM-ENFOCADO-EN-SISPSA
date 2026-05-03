import { useState, useMemo, useRef, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Eye,
  CreditCard,
  Upload,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCRM } from '@/context/CRMContext'
import {
  clinicas,
  estadosVenezuela,
  planOptions,
  statusOptions,
  planCatalog,
  type Afiliado,
  type AfiliadoStatus,
  type PlanType,
} from '@/data/afiliadosData'

/* ─── Types ─── */
type SortField = 'nombre' | 'cedula' | 'plan' | 'cuotaMensual' | 'fechaInicio' | 'ultimoPago' | 'estado'
type SortDirection = 'asc' | 'desc' | null

interface SortConfig {
  field: SortField
  direction: SortDirection
}

/* ─── Constants ─── */
const ROWS_PER_PAGE = 10

const statusConfig: Record<AfiliadoStatus, { dot: string; bg: string; text: string }> = {
  Activo:    { dot: 'bg-success',  bg: 'bg-success/10',  text: 'text-success' },
  Pendiente: { dot: 'bg-warning',  bg: 'bg-warning/10',  text: 'text-warning' },
  Vencido:   { dot: 'bg-danger',   bg: 'bg-danger/10',   text: 'text-danger' },
}

/* ─── Custom Select Component ─── */
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
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm transition-colors hover:bg-canvas',
          value !== 'Todos' && 'border-primary/50 bg-primary/5'
        )}
      >
        <span className="text-text-muted">{label}:</span>
        <span className="font-medium text-text-primary">{value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-lg border border-border bg-surface py-1 shadow-[var(--shadow-overlay)]">
          <button
            onClick={() => { onChange('Todos'); setOpen(false) }}
            className={cn(
              'flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-canvas',
              value === 'Todos' && 'bg-primary/5 font-medium text-primary'
            )}
          >
            Todos
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-canvas',
                value === opt && 'bg-primary/5 font-medium text-primary'
              )}
            >
              {label === 'Estado' && (
                <span className={cn('h-2 w-2 rounded-full', statusConfig[opt as AfiliadoStatus]?.dot)} />
              )}
              {label === 'Plan' && (
                <span className={cn('h-2 w-2 rounded-full', planCatalog[opt as PlanType]?.bgClass.replace('/10', ''))} />
              )}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Row Actions Dropdown ─── */
interface RowActionsProps {
  readonly afiliado: Afiliado
}

function RowActions({ afiliado }: RowActionsProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-canvas hover:text-text-primary"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-surface py-1 shadow-[var(--shadow-overlay)]">
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas"
          >
            <Eye className="h-4 w-4 text-text-muted" />
            Ver Perfil
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas"
          >
            <CreditCard className="h-4 w-4 text-text-muted" />
            Registrar Pago
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-canvas"
          >
            <Upload className="h-4 w-4 text-text-muted" />
            Cargar Documento
          </button>
          <div className="my-1 border-t border-border" />
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/5"
          >
            <AlertTriangle className="h-4 w-4" />
            Suspender
          </button>
        </div>
      )}
    </div>
  )
}

/* ─── Sortable Column Header ─── */
interface SortableHeaderProps {
  readonly label: string
  readonly field: SortField
  readonly sort: SortConfig
  readonly onSort: (field: SortField) => void
  readonly className?: string
}

function SortableHeader({ label, field, sort, onSort, className }: SortableHeaderProps) {
  const isActive = sort.field === field && sort.direction !== null
  return (
    <th
      className={cn(
        'cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary',
        className
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        {isActive ? (
          sort.direction === 'asc' ? (
            <ChevronUp className="h-3.5 w-3.5 text-primary" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-primary" />
          )
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
        )}
      </div>
    </th>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW: Afiliados
   ═══════════════════════════════════════════ */

export default function AfiliadosView() {
  const { user } = useAuth()
  const { afiliados, addAfiliado, deleteAfiliado } = useCRM()
  
  // ─── State ───
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [planFilter, setPlanFilter] = useState('Todos')
  const [clinicaFilter, setClinicaFilter] = useState('Todos')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<SortConfig>({ field: 'nombre', direction: null })
  const [currentPage, setCurrentPage] = useState(1)

  // ─── Filtering ───
  const filteredData = useMemo(() => {
    return afiliados.filter((a) => {
      // Role-based segmentation
      if (user?.role === 'vendedor' && a.zona !== user.zone) {
        return false
      }

      const matchesSearch =
        searchQuery === '' ||
        `${a.nombre} ${a.apellido}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.cedula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'Todos' || a.estado === statusFilter
      const matchesPlan = planFilter === 'Todos' || a.plan === planFilter
      const matchesClinica = clinicaFilter === 'Todos' || a.clinica === clinicaFilter

      return matchesSearch && matchesStatus && matchesPlan && matchesClinica
    })
  }, [searchQuery, statusFilter, planFilter, clinicaFilter, user])

  // ─── Sorting ───
  const sortedData = useMemo(() => {
    if (sort.direction === null) return filteredData

    return [...filteredData].sort((a, b) => {
      let valA: string | number = ''
      let valB: string | number = ''

      switch (sort.field) {
        case 'nombre':
          valA = `${a.nombre} ${a.apellido}`
          valB = `${b.nombre} ${b.apellido}`
          break
        case 'cuotaMensual':
          valA = a.cuotaMensual
          valB = b.cuotaMensual
          break
        default:
          valA = a[sort.field]
          valB = b[sort.field]
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sort.direction === 'asc' ? valA - valB : valB - valA
      }
      return sort.direction === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    })
  }, [filteredData, sort])

  // ─── Pagination ───
  const totalPages = Math.ceil(sortedData.length / ROWS_PER_PAGE)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  )

  // Reset page on filter change
  useMemo(() => { setCurrentPage(1) }, [searchQuery, statusFilter, planFilter, clinicaFilter])

  // ─── Handlers ───
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleAddAffiliate(e: React.FormEvent<HTMLFormElement>) {
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
      plan: plan,
      cuotaMensual: planCatalog[plan]?.price || 0,
      fechaInicio: new Date().toISOString().split('T')[0],
      ultimoPago: '',
      ultimoPagoRelativo: 'Sin pagos',
      estado: 'Pendiente',
      clinica: formData.get('clinica') as string,
      zona: formData.get('zona') as string || user?.zone || 'Nacional'
    }

    setTimeout(() => {
      addAfiliado(newAfiliado)
      setIsSubmitting(false)
      setIsModalOpen(false)
    }, 800)
  }

  function handleSort(field: SortField) {
    setSort((prev) => {
      if (prev.field === field) {
        const next = prev.direction === null ? 'asc' : prev.direction === 'asc' ? 'desc' : null
        return { field, direction: next }
      }
      return { field, direction: 'asc' }
    })
  }

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((a) => a.id)))
    }
  }

  const hasFilters = searchQuery || statusFilter !== 'Todos' || planFilter !== 'Todos' || clinicaFilter !== 'Todos'

  function clearFilters() {
    setSearchQuery('')
    setStatusFilter('Todos')
    setPlanFilter('Todos')
    setClinicaFilter('Todos')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Page Header ─── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>
            Gestión de Afiliados
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Administra y da seguimiento a todos tus afiliados y sus estados de póliza.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-canvas">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Nueva Afiliación
          </button>
        </div>
      </div>

      {/* ─── Filters Bar ─── */}
      <div className="card-re flex flex-wrap items-center gap-3 p-4">
        {/* Search */}
        <div className="relative min-w-[280px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar por cédula o nombre..."
            className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Status filter */}
        <SelectFilter
          label="Estado"
          value={statusFilter}
          options={statusOptions}
          onChange={setStatusFilter}
        />

        {/* Plan filter */}
        <SelectFilter
          label="Plan"
          value={planFilter}
          options={planOptions}
          onChange={setPlanFilter}
        />

        {/* Clinica filter */}
        <SelectFilter
          label="Clínica"
          value={clinicaFilter}
          options={clinicas}
          onChange={setClinicaFilter}
        />

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-canvas hover:text-text-primary"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* ─── Data Table (Desktop) ─── */}
      <div className="desktop-table-wrap">
      <div className="card-re overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead>
              <tr className="border-b border-border bg-canvas">
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                </th>
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

            {/* Body */}
            <tbody>
              {paginatedData.map((afiliado) => {
                const plan = planCatalog[afiliado.plan]
                const status = statusConfig[afiliado.estado]
                const isSelected = selectedRows.has(afiliado.id)
                const initials = `${afiliado.nombre[0]}${afiliado.apellido[0]}`

                return (
                  <tr
                    key={afiliado.id}
                    className={cn(
                      'border-b border-border transition-colors',
                      isSelected ? 'bg-primary/5' : 'hover:bg-canvas'
                    )}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(afiliado.id)}
                        className="h-4 w-4 rounded border-border text-primary accent-primary"
                      />
                    </td>

                    {/* Afiliado (Avatar + Name + Email) */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-text-primary">
                            {afiliado.nombre} {afiliado.apellido}
                          </p>
                          <p className="truncate text-xs text-text-muted">{afiliado.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Cédula */}
                    <td className="px-4 py-3">
                      <span className="tabular-nums text-sm text-text-primary">{afiliado.cedula}</span>
                    </td>

                    {/* Plan Badge */}
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', plan.bgClass, plan.colorClass)}>
                        {afiliado.plan}
                      </span>
                    </td>

                    {/* Cuota Mensual */}
                    <td className="px-4 py-3 text-right">
                      <span className="tabular-nums text-sm font-semibold text-text-primary">
                        ${afiliado.cuotaMensual.toFixed(2)}
                      </span>
                    </td>

                    {/* Fecha Inicio */}
                    <td className="px-4 py-3">
                      <span className="tabular-nums text-sm text-text-primary">{afiliado.fechaInicio}</span>
                    </td>

                    {/* Último Pago */}
                    <td className="px-4 py-3">
                      <div>
                        <span className="tabular-nums text-sm text-text-primary">
                          {afiliado.ultimoPago || '—'}
                        </span>
                        <p className="text-xs text-text-muted">{afiliado.ultimoPagoRelativo}</p>
                      </div>
                    </td>

                    {/* Estado Badge */}
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', status.bg, status.text)}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                        {afiliado.estado}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <RowActions afiliado={afiliado} />
                    </td>
                  </tr>
                )
              })}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center">
                    <p className="text-base font-medium text-text-primary">No hay afiliados registrados</p>
                    <p className="mt-1 text-sm text-text-muted">Inicie la gestión de equipo o cargue nuevos datos para ver información.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Table Footer ─── */}
        <div className="flex items-center justify-between border-t border-border bg-canvas px-4 py-3">
          {/* Count */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">
              Mostrando {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, sortedData.length)} de{' '}
              <span className="font-medium text-text-primary">{sortedData.length}</span> afiliados
            </span>
            {selectedRows.size > 0 && (
              <span className="text-sm text-text-muted">
                • {selectedRows.size} fila(s) seleccionada(s)
              </span>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:bg-canvas hover:text-text-primary'
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* ─── Mobile Card List ─── */}
      <div className="mobile-card-list">
        {paginatedData.map((afiliado) => {
          const plan = planCatalog[afiliado.plan]
          const status = statusConfig[afiliado.estado]
          const initials = `${afiliado.nombre[0]}${afiliado.apellido[0]}`
          return (
            <div key={afiliado.id} className="mobile-afiliado-card">
              <div className="mac-header">
                <div className="mac-name">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{afiliado.nombre} {afiliado.apellido}</p>
                    <p className="text-xs text-text-muted">{afiliado.email}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', status.bg, status.text)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                  {afiliado.estado}
                </span>
              </div>
              <div className="mac-fields">
                <div className="mac-field">
                  <label>Cédula</label>
                  <span>{afiliado.cedula}</span>
                </div>
                <div className="mac-field">
                  <label>Plan</label>
                  <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium', plan.bgClass, plan.colorClass)}>{afiliado.plan}</span>
                </div>
                <div className="mac-field">
                  <label>Cuota</label>
                  <span>${afiliado.cuotaMensual.toFixed(2)}</span>
                </div>
                <div className="mac-field">
                  <label>Último Pago</label>
                  <span>{afiliado.ultimoPagoRelativo}</span>
                </div>
              </div>
              <div className="mac-actions">
                <button><Eye className="h-3.5 w-3.5" /> Ver</button>
                <button><CreditCard className="h-3.5 w-3.5" /> Pago</button>
                <button className="mac-whatsapp"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</button>
              </div>
            </div>
          )
        })}

        {paginatedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-text-muted">No se encontraron afiliados.</p>
            <button onClick={clearFilters} className="mt-2 text-sm font-medium text-primary hover:underline">Limpiar filtros</button>
          </div>
        )}

        {/* Mobile Pagination */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-text-muted">{((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, sortedData.length)} de {sortedData.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center rounded-md border border-border bg-surface px-3 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center rounded-md border border-border bg-surface px-3 py-2 text-sm disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Registration Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="card-re relative w-[95vw] max-w-[500px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-canvas px-6 py-4">
              <h3 className="text-lg font-bold text-text-primary">Nueva Afiliación</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-danger">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddAffiliate} className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Nombre</label>
                  <input name="nombre" required type="text" placeholder="Ej: Juan" className="form-input text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Apellido</label>
                  <input name="apellido" required type="text" placeholder="Ej: Pérez" className="form-input text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Cédula</label>
                  <input name="cedula" required type="text" placeholder="V-12345678" className="form-input text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Email</label>
                  <input name="email" required type="email" placeholder="juan@ejemplo.com" className="form-input text-sm" />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Plan de Salud</label>
                  <select name="plan" required className="form-input text-sm">
                    {planOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Estado / Zona</label>
                  <select name="zona" required className="form-input text-sm" defaultValue={user?.zone !== 'Nacional' ? user?.zone : ''}>
                    <option value="" disabled>Seleccione un estado</option>
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
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center gap-2 px-8 py-2">
                  {isSubmitting ? 'Registrando...' : 'Finalizar Registro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
