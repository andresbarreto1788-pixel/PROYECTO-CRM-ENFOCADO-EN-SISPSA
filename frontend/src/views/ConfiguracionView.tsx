import { useState } from 'react'
import {
  User,
  Bell,
  Lock,
  Smartphone,
  Globe,
  Database,
  ShieldCheck,
  MessageCircle,
  Mail,
  Camera,
  Save,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Eye,
  EyeOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Setting Card Component ─── */
interface SettingCardProps {
  readonly title: string
  readonly description: string
  readonly icon: React.ReactNode
  readonly children: React.ReactNode
}

function SettingCard({ title, description, icon, children }: SettingCardProps) {
  return (
    <div className="card-re p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-muted">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW: Configuración
   ═══════════════════════════════════════════ */

export default function ConfiguracionView() {
  const [activeSection, setActiveSection] = useState<'perfil' | 'notificaciones' | 'seguridad' | 'integraciones'>('perfil')
  const [showPassword, setShowPassword] = useState(false)

  const navItems = [
    { id: 'perfil', label: 'Mi Perfil', icon: <User className="h-4 w-4" /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell className="h-4 w-4" /> },
    { id: 'seguridad', label: 'Seguridad', icon: <Lock className="h-4 w-4" /> },
    { id: 'integraciones', label: 'Integraciones', icon: <Globe className="h-4 w-4" /> },
  ] as const

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>
          Configuración del Sistema
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Administra tu perfil, preferencias de notificación y seguridad de tu cuenta en Red Empresarial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                activeSection === item.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 translate-x-1'
                  : 'text-text-muted hover:bg-canvas hover:text-text-primary'
              )}
            >
              {item.icon}
              {item.label}
              {activeSection === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
          
          <div className="h-px bg-border my-4" />
          
          <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-error hover:bg-error/10 transition-all">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>

        {/* Main Content Area (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          
          {/* Section: Perfil */}
          {activeSection === 'perfil' && (
            <SettingCard
              title="Información Personal"
              description="Actualiza tu foto, nombre y datos de contacto profesional."
              icon={<User className="h-5 w-5" />}
            >
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl bg-slate-200 overflow-hidden border-2 border-border shadow-inner">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg border-2 border-surface transition-transform hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Carlos Mendoza</h4>
                  <p className="text-xs text-text-muted">Asesor Senior — Red Empresarial Caracas</p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">ACTIVO</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">ID: RE-1042</span>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Nombre Completo</label>
                  <input
                    type="text"
                    defaultValue="Carlos Mendoza"
                    className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Corporativo</label>
                  <input
                    type="email"
                    defaultValue="carlos.mendoza@redempresarial.com"
                    className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">WhatsApp Profesional</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      defaultValue="+58 412-1234567"
                      className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Zona de Trabajo</label>
                  <select className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <option>Caracas (Distrito Capital)</option>
                    <option>Valencia (Carabobo)</option>
                    <option>Maracaibo (Zulia)</option>
                    <option>Barquisimeto (Lara)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-md shadow-primary/10">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </button>
              </div>
            </SettingCard>
          )}

          {/* Section: Notificaciones */}
          {activeSection === 'notificaciones' && (
            <SettingCard
              title="Centro de Notificaciones"
              description="Elige qué alertas quieres recibir y por qué canal."
              icon={<Bell className="h-5 w-5" />}
            >
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Nuevos Prospectos', desc: 'Recibir alerta cuando un lead entra por la web o IA.', default: true },
                  { title: 'Vencimientos de Póliza', desc: 'Aviso 15, 7 y 1 día antes del vencimiento.', default: true },
                  { title: 'Citas Médicas', desc: 'Recordatorio de citas programadas para tus afiliados.', default: true },
                  { title: 'Pagos Registrados', desc: 'Notificar cuando un cliente confirma un pago.', default: false },
                  { title: 'Mensajes de WhatsApp', desc: 'Sincronizar alertas de mensajes entrantes.', default: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3">
                    <div className="max-w-[400px]">
                      <h4 className="text-sm font-bold text-text-primary">{item.title}</h4>
                      <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked={item.default} />
                      <div className="peer h-6 w-11 rounded-full bg-border transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                    </label>
                  </div>
                ))}
              </div>
            </SettingCard>
          )}

          {/* Section: Seguridad */}
          {activeSection === 'seguridad' && (
            <SettingCard
              title="Seguridad y Acceso"
              description="Gestiona tu contraseña y la autenticación de dos pasos."
              icon={<ShieldCheck className="h-5 w-5" />}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Contraseña Actual</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full rounded-lg border border-border bg-surface py-2.5 px-4 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Nueva Contraseña</label>
                      <input
                        type="password"
                        className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmar Nueva Contraseña</label>
                      <input
                        type="password"
                        className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">Autenticación en Dos Pasos (2FA)</h4>
                      <p className="text-xs text-text-muted">Protege tu cuenta con un código enviado a tu celular.</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 transition-all">
                    Activar 2FA
                  </button>
                </div>
              </div>
            </SettingCard>
          )}

          {/* Section: Integraciones */}
          {activeSection === 'integraciones' && (
            <SettingCard
              title="Integraciones del Ecosistema"
              description="Conecta el CRM con herramientas externas para automatizar tu flujo."
              icon={<Globe className="h-5 w-5" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'WhatsApp Business', desc: 'Envío masivo y sincronización de chats.', status: 'Conectado', color: 'bg-emerald-500', icon: <MessageCircle className="h-5 w-5" /> },
                  { name: 'Google Calendar', desc: 'Sincronizar citas médicas y recordatorios.', status: 'Pendiente', color: 'bg-slate-400', icon: <Globe className="h-5 w-5" /> },
                  { name: 'Email Marketing', desc: 'Campañas de nutrición de prospectos.', status: 'Conectado', color: 'bg-blue-500', icon: <Mail className="h-5 w-5" /> },
                  { name: 'Base de Datos SISPSA', desc: 'Sincronización de afiliados históricos.', status: 'Desconectado', color: 'bg-red-500', icon: <Database className="h-5 w-5" /> },
                ].map((app, idx) => (
                  <div key={idx} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/20 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        {app.icon}
                      </div>
                      <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold text-white uppercase', app.color)}>
                        {app.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">{app.name}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{app.desc}</p>
                    </div>
                    <button className="mt-2 text-xs font-bold text-primary hover:underline self-start">
                      {app.status === 'Conectado' ? 'Configurar' : 'Conectar Ahora'}
                    </button>
                  </div>
                ))}
              </div>
            </SettingCard>
          )}
        </div>
      </div>
    </div>
  )
}
