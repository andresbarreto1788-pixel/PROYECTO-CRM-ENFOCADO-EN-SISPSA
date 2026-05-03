// CON3XUZ - EquipoView
import React, { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  Search, 
  MoreVertical,
  Key
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

export default function EquipoView() {
  const { createUser, teamMembers } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const zone = formData.get('zone') as string
    const role = (formData.get('role') as string).toLowerCase() as any

    setIsSubmitting(true)
    
    try {
      await createUser({ name, email, zone, role })
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
      const form = e.target as HTMLFormElement
      form.reset()
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">Gestión de Equipo</h1>
          <p className="mt-1 text-sm text-text-muted">Administra el acceso de vendedores y supervisores.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Registration Form */}
        <div className="card-re p-6 lg:col-span-1">
          <div className="mb-6 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Alta de Nuevo Asesor</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Nombre Completo</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="Nombre y Apellido"
                className="w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Correo Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="usuario@sispsa.com.ve"
                  className="w-full rounded-lg border border-border bg-canvas py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Zona</label>
                <select name="zone" className="w-full rounded-lg border border-border bg-canvas px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option value="Trujillo">Trujillo</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Nacional">Nacional</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Rol</label>
                <select name="role" className="w-full rounded-lg border border-border bg-canvas px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option value="vendedor">Vendedor</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
              <div className="flex items-center gap-2 text-primary">
                <Key size={14} className="flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wide">Clave Temporal Asignada</span>
              </div>
              <p className="mt-1 text-sm font-mono font-bold text-primary">SISPSA2026</p>
              <p className="mt-1 text-[10px] text-text-muted italic">El usuario deberá cambiarla en su primer ingreso.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Dar de Alta</span>}
            </button>
          </form>
        </div>

        {/* Team List */}
        <div className="card-re p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Miembros de la Red</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o correo..."
                className="rounded-full border border-border bg-canvas py-1.5 pl-9 pr-4 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left">
              <thead className="bg-canvas text-xs font-bold uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-6 py-4">Nombre / Email</th>
                  <th className="px-6 py-4">Zona</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamMembers.map((member) => (
                  <tr key={member.email} className="hover:bg-canvas/50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                      <p className="text-xs text-text-muted">{member.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <MapPin size={12} className="text-primary" />
                        {member.zone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                        member.role === 'supervisor' ? 'bg-primary/10 text-primary' : 'bg-border text-text-muted'
                      )}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-muted hover:text-text-primary">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 flex animate-in slide-in-from-bottom-5 items-center gap-3 rounded-xl border border-success/30 bg-white p-4 shadow-2xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Vendedor creado exitosamente</p>
            <p className="text-xs text-text-muted">Comparta las credenciales temporales de forma segura.</p>
          </div>
        </div>
      )}
    </div>
  )
}
