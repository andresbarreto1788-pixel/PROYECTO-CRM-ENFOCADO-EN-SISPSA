import React, { useState } from 'react'
import {
  Users, Search, UserCheck, UserX, ShieldAlert,
  Filter, MoreVertical, CheckCircle2, XCircle, Clock,
  UserPlus, X
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import type { UserStatus, UserRole } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

interface CreateUserForm {
  name: string
  email: string
  role: UserRole
  zone: string
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'vendedor', label: 'Vendedor / Asesor' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'admin', label: 'Administrador' },
]

export default function UsuariosView() {
  const { teamMembers, updateUserStatus, createUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState<CreateUserForm>({ name: '', email: '', role: 'vendedor', zone: '' })
  const [successMsg, setSuccessMsg] = useState('')

  const filteredUsers = teamMembers.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVO':
        return <div className="flex items-center gap-1.5 text-success"><CheckCircle2 size={14} /><span>ACTIVO</span></div>
      case 'PENDIENTE':
        return <div className="flex items-center gap-1.5 text-warning"><Clock size={14} /><span>PENDIENTE</span></div>
      case 'BLOQUEADO':
        return <div className="flex items-center gap-1.5 text-danger"><XCircle size={14} /><span>BLOQUEADO</span></div>
    }
  }

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.zone) return
    setIsSubmitting(true)
    await createUser({ name: form.name, email: form.email, role: form.role, zone: form.zone })
    setIsSubmitting(false)
    setShowModal(false)
    setForm({ name: '', email: '', role: 'vendedor', zone: '' })
    setSuccessMsg(`Usuario ${form.email} creado exitosamente como ${form.role}.`)
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Gestión de Acceso</h1>
          <p className="text-sm text-text-muted">Aprobar o restringir acceso al ecosistema corporativo.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
        >
          <UserPlus size={16} />
          <span>Crear Usuario</span>
        </button>
      </div>

      {successMsg && (
        <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success">
          {successMsg}
        </div>
      )}

      {/* Modal Crear Usuario */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Crear Usuario Verificado</h2>
                <p className="text-xs text-text-muted">El usuario quedará activo de inmediato.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 hover:bg-canvas text-text-muted">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted uppercase tracking-wide">Nombre completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Carlos Mendoza"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-muted uppercase tracking-wide">Correo electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="usuario@empresa.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-muted uppercase tracking-wide">Rol</label>
                  <select
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value as UserRole }))}
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-text-muted uppercase tracking-wide">Zona</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Caracas"
                    value={form.zone}
                    onChange={e => setForm(f => ({ ...f, zone: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-xs text-primary">
                El usuario deberá cambiar su contraseña en el primer inicio de sesión.
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-canvas transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60 transition-colors"
                >
                  {isSubmitting ? 'Creando...' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users size={20} /></div>
            <div><p className="text-xs font-medium text-text-muted">Total Usuarios</p><p className="text-xl font-bold">{teamMembers.length}</p></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning"><Clock size={20} /></div>
            <div><p className="text-xs font-medium text-text-muted">Por Aprobar</p><p className="text-xl font-bold text-warning">{teamMembers.filter(u => u.status === 'PENDIENTE').length}</p></div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success"><UserCheck size={20} /></div>
            <div><p className="text-xs font-medium text-text-muted">Activos</p><p className="text-xl font-bold text-success">{teamMembers.filter(u => u.status === 'ACTIVO').length}</p></div>
          </div>
        </div>
      </div>

      {/* Table & Filter */}
      <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Buscar por correo o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-canvas py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-canvas">
            <Filter size={16} /><span>Filtros</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas border-b border-border text-[11px] font-bold uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol / Zona</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-muted italic">
                    No hay solicitudes de acceso pendientes.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.email} className="group hover:bg-canvas/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-text-primary">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium capitalize">{u.role}</span>
                        <span className="text-[11px] text-text-muted">{u.zone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] font-bold">
                      {getStatusBadge(u.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {u.status !== 'ACTIVO' && (
                          <button 
                            onClick={() => updateUserStatus(u.email, 'ACTIVO')}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-success text-white shadow-sm hover:scale-110 transition-transform"
                            title="Aprobar"
                          >
                            <UserCheck size={16} />
                          </button>
                        )}
                        {u.status !== 'BLOQUEADO' && (
                          <button 
                            onClick={() => updateUserStatus(u.email, 'BLOQUEADO')}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger text-white shadow-sm hover:scale-110 transition-transform"
                            title="Bloquear"
                          >
                            <UserX size={16} />
                          </button>
                        )}
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-canvas text-text-muted border border-border hover:text-text-primary">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
