import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor completa todos los campos.')
      return
    }

    setIsSubmitting(true)
    setError('')
    
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Credenciales inválidas. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 py-12">
      {/* Centered wrapper to ensure max-width is respected */}
      <div className="flex w-full flex-col items-center">
        
        {/* Logo Section - Wider to prevent vertical breaking */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
            <Shield size={32} />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-text-primary whitespace-nowrap">
              Acceso Asesores
            </h1>
            <p className="mt-2 text-sm font-medium text-text-muted max-w-[280px]">
              Ingresa a tu ecosistema corporativo <span className="text-primary font-bold">Red Empresarial</span>
            </p>
          </div>
        </div>

        {/* Login Card - Solid max-width and internal padding */}
        <div className="w-full max-w-[420px] rounded-[24px] border border-border bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@sispsa.com.ve"
                  className={cn(
                    "w-full rounded-xl border bg-surface py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-primary/10",
                    error ? "border-danger focus:border-danger" : "border-border focus:border-primary"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-xl border bg-surface py-3.5 pl-11 pr-12 text-sm font-medium outline-none transition-all focus:ring-4 focus:ring-primary/10",
                    error ? "border-danger focus:border-danger" : "border-border focus:border-primary"
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
              Solo personal autorizado SISPSA <br />
              Monitoreo de auditoría activo
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold text-text-muted tracking-widest uppercase">
            Powered by <span className="text-text-primary">CON3XUZ</span> | Versión 1.2.0
          </p>
          <div className="h-1 w-12 rounded-full bg-border" />
        </div>
      </div>
    </div>
  )
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
