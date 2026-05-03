import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, User, CreditCard, MapPin, Upload, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RegistroAsesorView() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cedulaType, setCedulaType] = useState('V')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Solicitud Enviada</h1>
          <p className="mt-3 text-text-muted">
            Tu postulación ha sido recibida correctamente. El equipo de <span className="font-bold text-primary">Red Empresarial</span> validará tus datos en breve y te contactará por correo.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 rounded-lg bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <Link to="/login" className="mb-6 flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Volver al Login
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-md">
            <Shield size={22} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-text-primary">Postulación de Asesores</h1>
          <p className="mt-1 text-sm text-text-muted">Únete a la red líder de salud corporativa en Venezuela.</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-white p-8 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Nombre Completo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  required
                  type="text"
                  placeholder="Juan Perez"
                  className="w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Cédula */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Documento de Identidad</label>
              <div className="flex gap-2">
                <select 
                  value={cedulaType}
                  onChange={(e) => setCedulaType(e.target.value)}
                  className="rounded-lg border border-border bg-surface px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                  <option value="G">G</option>
                </select>
                <div className="relative flex-1">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    required
                    type="text"
                    placeholder="Número de cédula o RIF"
                    className="w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Zona de Operación */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Zona de Operación</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <select 
                  required
                  className="w-full appearance-none rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Selecciona una zona</option>
                  <option value="trujillo">Trujillo</option>
                  <option value="valencia">Valencia</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
            </div>

            {/* Carga de Documento */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Carga de Cédula / RIF</label>
              <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface p-8 transition-all hover:border-primary hover:bg-primary/5">
                <Upload className="mb-2 h-8 w-8 text-text-muted group-hover:text-primary" />
                <span className="text-xs font-medium text-text-muted">Haz clic para subir o arrastra el archivo</span>
                <span className="mt-1 text-[10px] text-text-muted">PDF, JPG o PNG (Máx 5MB)</span>
                <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary-dark disabled:opacity-70 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Enviar Postulación</span>}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted italic">
          Al postularte, aceptas nuestros términos de servicio y política de privacidad para asesores.
        </p>
      </div>
    </div>
  )
}
