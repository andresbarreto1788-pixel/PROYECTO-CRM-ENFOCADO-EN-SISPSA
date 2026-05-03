import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

export default function LoginView() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) { setError('Por favor completa todos los campos.'); return }
    setIsSubmitting(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Credenciales inválidas. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">

      {/* ── Background SISPSA ── */}
      <div className="absolute inset-0 z-0">
        <img src="/sispsa-login-bg.svg" alt="" className="h-full w-full object-cover" aria-hidden="true" />
      </div>

      {/* ── Left panel — branding (desktop only) ── */}
      <div className="relative z-10 hidden lg:flex lg:w-1/2 flex-col items-start justify-between p-14">
        <img src="/sispsa-logo-white.svg" alt="SISPSA Red Empresarial" className="h-12 w-auto" />

        <div className="max-w-md">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 uppercase tracking-widest backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sistema CRM Activo
          </div>

          <h2 className="text-4xl font-extrabold leading-tight text-white">
            El ecosistema que<br />
            <span className="text-blue-300">impulsa tu red</span><br />
            de afiliados
          </h2>
          <p className="mt-4 text-base text-white/60 leading-relaxed">
            Gestiona prospectos, afiliados y tu equipo desde una sola plataforma.
            Diseñado para los asesores de{' '}
            <strong className="text-white/80">SISPSA Red Empresarial</strong>.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ['Afiliados', 'activos'],
              ['Pipeline', 'integrado'],
              ['Auditoría', 'en tiempo real'],
            ].map(([n, d]) => (
              <div key={n} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold text-white">{n}</p>
                <p className="mt-0.5 text-[11px] text-white/50">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-white/30 uppercase tracking-widest">
          © 2025 SISPSA · Red Empresarial · Powered by CON3XUZ
        </p>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2 lg:bg-white/95 lg:backdrop-blur-xl">

        {/* Logo */}
        <div className="mb-10 flex flex-col items-center text-center">
          <img src="/sispsa-logo.svg" alt="SISPSA" className="h-14 w-auto lg:h-16" />
          <div className="mt-5">
            <h1 className="text-2xl font-extrabold tracking-tight text-text-primary whitespace-nowrap">
              Acceso Asesores
            </h1>
            <p className="mt-1.5 text-sm font-medium text-text-muted max-w-[280px]">
              Ingresa a tu ecosistema corporativo{' '}
              <span className="text-primary font-bold">Red Empresarial</span>
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-[420px] rounded-[24px] border border-border bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.07)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-danger/10 p-4 text-xs font-bold text-danger border border-danger/20 animate-in fade-in zoom-in-95">
                <Shield size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted ml-1">
                Correo Corporativo
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ejemplo@sispsa.com.ve"
                  className={cn(
                    'w-full rounded-xl border bg-surface py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-primary/10',
                    error ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                  Contraseña
                </label>
                <button type="button" className="text-[11px] font-bold text-primary hover:underline">
                  ¿Olvidaste tu clave?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full rounded-xl border bg-surface py-3.5 pl-11 pr-12 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-primary/10',
                    error ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-3 rounded-xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 border-t border-border pt-8 text-center">
            <p className="text-[10px] leading-relaxed text-text-muted uppercase tracking-wider font-semibold">
              Solo personal autorizado SISPSA<br />
              Monitoreo de auditoría activo
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold text-white/60 lg:text-text-muted tracking-widest uppercase">
            Powered by <span className="text-white lg:text-text-primary">CON3XUZ</span> · v1.2.1
          </p>
          <div className="h-1 w-12 rounded-full bg-white/20 lg:bg-border" />
        </div>

      </div>
    </div>
  )
}
