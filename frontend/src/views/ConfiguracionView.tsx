import { useState } from 'react'
import {
  User, Bell, Lock, Smartphone, Globe, Database, ShieldCheck,
  MessageCircle, Mail, Camera, Save, ChevronRight, LogOut,
  Eye, EyeOff, X, CheckCircle2, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import { useNavigate } from 'react-router-dom'

/* ─── Types ─── */
type IntegrationKey = 'whatsapp' | 'calendar' | 'email' | 'sispsa'
type IntegrationStatus = 'Conectado' | 'Pendiente' | 'Desconectado'

interface IntegrationConfig {
  name: string
  desc: string
  icon: React.ReactNode
  colorClass: string
  badgeClass: string
  fields: { label: string; key: string; type: string; placeholder: string }[]
}

const INTEGRATIONS: Record<IntegrationKey, IntegrationConfig> = {
  whatsapp: {
    name: 'WhatsApp Business',
    desc: 'Envío masivo y sincronización de chats con tus afiliados.',
    icon: <MessageCircle className="h-5 w-5" />,
    colorClass: 'text-emerald-600',
    badgeClass: 'bg-emerald-500',
    fields: [
      { label: 'Número de Teléfono', key: 'phone', type: 'tel', placeholder: '+58 412-0000000' },
      { label: 'API Key (Business)', key: 'apiKey', type: 'text', placeholder: 'whatsapp_api_key_...' },
    ],
  },
  calendar: {
    name: 'Google Calendar',
    desc: 'Sincroniza citas médicas y recibe recordatorios automáticos.',
    icon: <Globe className="h-5 w-5" />,
    colorClass: 'text-blue-600',
    badgeClass: 'bg-blue-500',
    fields: [
      { label: 'Email de Google', key: 'email', type: 'email', placeholder: 'tu@gmail.com' },
      { label: 'Calendar ID', key: 'calendarId', type: 'text', placeholder: 'primary' },
    ],
  },
  email: {
    name: 'Email Marketing',
    desc: 'Campañas automáticas de nutrición para tus prospectos.',
    icon: <Mail className="h-5 w-5" />,
    colorClass: 'text-blue-500',
    badgeClass: 'bg-blue-500',
    fields: [
      { label: 'Servidor SMTP', key: 'smtp', type: 'text', placeholder: 'smtp.gmail.com' },
      { label: 'Email Remitente', key: 'from', type: 'email', placeholder: 'asesor@empresa.com' },
      { label: 'Contraseña / App Password', key: 'password', type: 'password', placeholder: '••••••••••••' },
    ],
  },
  sispsa: {
    name: 'Base de Datos SISPSA',
    desc: 'Sincroniza afiliados históricos desde el sistema central SISPSA.',
    icon: <Database className="h-5 w-5" />,
    colorClass: 'text-violet-600',
    badgeClass: 'bg-violet-500',
    fields: [
      { label: 'URL de Conexión', key: 'url', type: 'text', placeholder: 'https://db.sispsa.com.ve/api' },
      { label: 'Token de Acceso', key: 'token', type: 'password', placeholder: 'sispsa_token_...' },
    ],
  },
}

const STORAGE_KEY = 'crm_integrations'

function loadIntegrations(): Record<IntegrationKey, Record<string, string>> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { whatsapp: {}, calendar: {}, email: {}, sispsa: {} }
  } catch { return { whatsapp: {}, calendar: {}, email: {}, sispsa: {} } }
}

/* ─── SettingCard ─── */
function SettingCard({ title, description, icon, children }: { title: string; description: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="card-re p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
          <div><h3 className="text-base font-bold text-text-primary">{title}</h3><p className="text-sm text-text-muted">{description}</p></div>
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  )
}

/* ─── Integration Modal ─── */
interface IntegrationModalProps {
  integrationKey: IntegrationKey
  onClose: () => void
  onSave: (key: IntegrationKey, data: Record<string, string>) => void
  initialData: Record<string, string>
}

function IntegrationModal({ integrationKey, onClose, onSave, initialData }: IntegrationModalProps) {
  const config = INTEGRATIONS[integrationKey]
  const [formData, setFormData] = useState<Record<string, string>>(initialData)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 900))
    onSave(integrationKey, formData)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100', config.colorClass)}>{config.icon}</div>
            <div><p className="text-sm font-bold text-text-primary">{config.name}</p><p className="text-xs text-text-muted">Configurar integración</p></div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-text-muted hover:bg-canvas"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-text-muted">{config.desc}</p>
          {config.fields.map(f => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={formData[f.key] || ''}
                onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full rounded-lg border border-border bg-canvas px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
          {integrationKey === 'calendar' && (
            <a href="https://calendar.google.com/calendar/r/settings" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
              <ExternalLink className="h-3.5 w-3.5" /> Obtener Calendar ID en Google Calendar
            </a>
          )}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60">
              {saving ? 'Conectando...' : <><CheckCircle2 className="h-4 w-4" /> Guardar y Conectar</>}
            </button>
            <button onClick={onClose} className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-canvas">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW
   ═══════════════════════════════════════════ */

export default function ConfiguracionView() {
  const { user, logout } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<'perfil' | 'notificaciones' | 'seguridad' | 'integraciones'>('perfil')
  const [showPassword, setShowPassword] = useState(false)
  const [activeModal, setActiveModal] = useState<IntegrationKey | null>(null)
  const [integrationData, setIntegrationData] = useState(loadIntegrations)
  const [integrationStatus, setIntegrationStatus] = useState<Record<IntegrationKey, IntegrationStatus>>(() => {
    const saved = loadIntegrations()
    return {
      whatsapp: saved.whatsapp?.apiKey ? 'Conectado' : 'Desconectado',
      calendar: saved.calendar?.email ? 'Conectado' : 'Pendiente',
      email: saved.email?.smtp ? 'Conectado' : 'Desconectado',
      sispsa: saved.sispsa?.token ? 'Conectado' : 'Desconectado',
    }
  })

  const navItems = [
    { id: 'perfil' as const, label: 'Mi Perfil', icon: <User className="h-4 w-4" /> },
    { id: 'notificaciones' as const, label: 'Notificaciones', icon: <Bell className="h-4 w-4" /> },
    { id: 'seguridad' as const, label: 'Seguridad', icon: <Lock className="h-4 w-4" /> },
    { id: 'integraciones' as const, label: 'Integraciones', icon: <Globe className="h-4 w-4" /> },
  ]

  function handleSaveIntegration(key: IntegrationKey, data: Record<string, string>) {
    const updated = { ...integrationData, [key]: data }
    setIntegrationData(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setIntegrationStatus(prev => ({ ...prev, [key]: 'Conectado' }))
    setActiveModal(null)
    addNotification('success', `${INTEGRATIONS[key].name} Conectado`, 'La integración fue configurada exitosamente.')
  }

  function handleDisconnect(key: IntegrationKey) {
    const updated = { ...integrationData, [key]: {} }
    setIntegrationData(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setIntegrationStatus(prev => ({ ...prev, [key]: 'Desconectado' }))
    addNotification('warning', `${INTEGRATIONS[key].name} Desconectado`, 'La integración fue desactivada.')
  }

  const statusBadge: Record<IntegrationStatus, string> = {
    'Conectado':     'bg-emerald-500',
    'Pendiente':     'bg-slate-400',
    'Desconectado':  'bg-red-500',
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary" style={{ letterSpacing: '-0.02em' }}>Configuración del Sistema</h1>
        <p className="mt-1 text-sm text-text-muted">Administra tu perfil, notificaciones, seguridad e integraciones de Red Empresarial.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Nav */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)} className={cn('flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all', activeSection === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20 translate-x-1' : 'text-text-muted hover:bg-canvas hover:text-text-primary')}>
              {item.icon}{item.label}{activeSection === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
          <div className="h-px bg-border my-4" />
          <button onClick={() => { logout(); navigate('/') }} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-danger hover:bg-danger/10 transition-all">
            <LogOut className="h-4 w-4" /> Cerrar Sesión
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 flex flex-col gap-8">

          {/* Perfil */}
          {activeSection === 'perfil' && (
            <SettingCard title="Información Personal" description="Actualiza tu foto, nombre y datos de contacto profesional." icon={<User className="h-5 w-5" />}>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl bg-slate-200 overflow-hidden border-2 border-border shadow-inner">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'asesor'}`} alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg border-2 border-surface transition-transform hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{user?.name || 'Asesor'}</h4>
                  <p className="text-xs text-text-muted capitalize">{user?.role?.replace('_', ' ')} — {user?.zone}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">ACTIVO</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">{user?.role?.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Nombre Completo</label>
                  <input type="text" defaultValue={user?.name || ''} className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Corporativo</label>
                  <input type="email" defaultValue={user?.email || ''} className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">WhatsApp Profesional</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input type="text" placeholder="+58 412-0000000" className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Zona de Trabajo</label>
                  <input type="text" defaultValue={user?.zone || ''} className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => addNotification('success', 'Perfil Actualizado', 'Tus datos de perfil fueron guardados correctamente.')} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-md shadow-primary/10">
                  <Save className="h-4 w-4" /> Guardar Cambios
                </button>
              </div>
            </SettingCard>
          )}

          {/* Notificaciones */}
          {activeSection === 'notificaciones' && (
            <SettingCard title="Centro de Notificaciones" description="Elige qué alertas quieres recibir y por qué canal." icon={<Bell className="h-5 w-5" />}>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Nuevos Prospectos', desc: 'Recibir alerta cuando un lead entra por la web o IA.', default: true },
                  { title: 'Vencimientos de Póliza', desc: 'Aviso 15, 7 y 1 día antes del vencimiento.', default: true },
                  { title: 'Citas Médicas', desc: 'Recordatorio de citas programadas para tus afiliados.', default: true },
                  { title: 'Pagos Registrados', desc: 'Notificar cuando un cliente confirma un pago.', default: false },
                  { title: 'Mensajes de WhatsApp', desc: 'Sincronizar alertas de mensajes entrantes.', default: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
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

          {/* Seguridad */}
          {activeSection === 'seguridad' && (
            <SettingCard title="Seguridad y Acceso" description="Gestiona tu contraseña y la autenticación de dos pasos." icon={<ShieldCheck className="h-5 w-5" />}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Contraseña Actual</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} className="w-full rounded-lg border border-border bg-surface py-2.5 px-4 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-text-muted uppercase tracking-wider">Nueva Contraseña</label><input type="password" className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirmar Nueva Contraseña</label><input type="password" className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => addNotification('success', 'Contraseña Actualizada', 'Tu contraseña fue cambiada exitosamente.')} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
                      <Save className="h-4 w-4" /> Cambiar Contraseña
                    </button>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Smartphone className="h-5 w-5" /></div>
                    <div><h4 className="text-sm font-bold text-text-primary">Autenticación en Dos Pasos (2FA)</h4><p className="text-xs text-text-muted">Protege tu cuenta con un código enviado a tu celular.</p></div>
                  </div>
                  <button onClick={() => addNotification('info', '2FA Activado', 'La autenticación de dos pasos está habilitada.')} className="rounded-lg border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 transition-all">Activar 2FA</button>
                </div>
              </div>
            </SettingCard>
          )}

          {/* Integraciones */}
          {activeSection === 'integraciones' && (
            <SettingCard title="Integraciones del Ecosistema" description="Conecta el CRM con herramientas externas para automatizar tu flujo de trabajo." icon={<Globe className="h-5 w-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Object.keys(INTEGRATIONS) as IntegrationKey[]).map(key => {
                  const app = INTEGRATIONS[key]
                  const status = integrationStatus[key]
                  return (
                    <div key={key} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/20 hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100', app.colorClass)}>{app.icon}</div>
                        <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white uppercase', statusBadge[status])}>{status}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-primary">{app.name}</h4>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{app.desc}</p>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => setActiveModal(key)} className="flex-1 rounded-lg bg-primary py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors">
                          {status === 'Conectado' ? 'Reconfigurar' : 'Conectar Ahora'}
                        </button>
                        {status === 'Conectado' && (
                          <button onClick={() => handleDisconnect(key)} className="rounded-lg border border-danger/30 px-3 py-2 text-xs font-bold text-danger hover:bg-danger/5 transition-colors">
                            Desconectar
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </SettingCard>
          )}
        </div>
      </div>

      {/* Integration Modal */}
      {activeModal && (
        <IntegrationModal
          integrationKey={activeModal}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveIntegration}
          initialData={integrationData[activeModal] || {}}
        />
      )}
    </div>
  )
}
