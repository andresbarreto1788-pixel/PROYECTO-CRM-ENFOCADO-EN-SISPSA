import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement & EventTarget>) => {
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
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #0d1b3e 0%, #152347 50%, #1a2d5a 100%)' }}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center">

        {/* Logo SISPSA real */}
        <div className="mb-2 w-full max-w-[340px]">
          <img
            src="/sispsa-logo-real.png"
            alt="SISPSA - Sistema Integral de Salud"
            className="w-full object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))' }}
          />
        </div>

        {/* Divider */}
        <div className="mb-8 flex items-center gap-3 w-full px-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">Portal de Asesores</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form card */}
        <div className="w-full rounded-2xl bg-white p-7 shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {error && (
              <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm font-medium text-red-600 animate-in fade-in zoom-in-95">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Correo Corporativo
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="usuario@sispsa.com.ve"
                  className={cn(
                    'w-full rounded-xl border py-3.5 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-300',
                    'focus:ring-4',
                    error
                      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100'
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Contraseña
                </label>
                <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline">
                  ¿Olvidaste tu clave?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full rounded-xl border py-3.5 pl-10 pr-11 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-300',
                    'focus:ring-4',
                    error
                      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 bg-slate-50 focus:border-blue-500 focus:bg-white focus:ring-blue-100'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #1a2d5a 0%, #1e3a8a 100%)' }}
            >
              {isSubmitting
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : <><span>Iniciar Sesión</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-300">
            Acceso exclusivo · Personal autorizado SISPSA
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-widest text-white/20">
          Powered by <span className="text-white/35">CON3XUZ</span> · v1.2.1
        </p>
      </div>
    </div>
  )
}
