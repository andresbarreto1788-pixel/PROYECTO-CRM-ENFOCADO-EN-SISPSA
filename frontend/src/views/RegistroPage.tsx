import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  ChevronDown, MapPin, Phone, Building2, Globe,
  CheckCircle2, Upload, ArrowLeft, ArrowRight, User, FileText,
} from 'lucide-react'
import { estadosVenezuela, planes } from '@/data/clinicasData'

type StepId = 1 | 2 | 3
const STEP_LABELS = ['Ubicación y Clínica', 'Selección de Plan', 'Datos Personales']
const STEP_LABELS_SHORT = ['Ubicación', 'Plan', 'Datos']

export default function RegistroPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialPlan = (location.state as { planId?: string })?.planId || ''

  const [step, setStep] = useState<StepId>(initialPlan ? 2 : 1)

  // Step 1 state
  const [selectedEstado, setSelectedEstado] = useState('')
  const [selectedCiudad, setSelectedCiudad] = useState('')
  const [selectedClinica, setSelectedClinica] = useState('')

  // Step 2 state
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)

  // Step 3 state
  const [formData, setFormData] = useState({
    nombre: '', tipoDoc: 'V', cedula: '',
    email: '', telefono: '', fechaNacimiento: '',
    aceptaTerminos: false,
  })
  const [cedulaFront, setCedulaFront] = useState<File | null>(null)
  const [cedulaBack, setCedulaBack] = useState<File | null>(null)
  const frontRef = useRef<HTMLInputElement>(null)
  const backRef = useRef<HTMLInputElement>(null)

  // Derived
  const estado = estadosVenezuela.find((e) => e.nombre === selectedEstado)
  const ciudades = estado?.ciudades || []
  const ciudad = ciudades.find((c) => c.nombre === selectedCiudad)
  const clinicasList = ciudad?.clinicas || []

  const canNext1 = selectedEstado && selectedCiudad
  const canNext2 = !!selectedPlan
  const canSubmit = formData.nombre && formData.cedula && formData.email && formData.telefono && formData.fechaNacimiento && formData.aceptaTerminos

  function handleSubmit() {
    alert('¡Registro completado exitosamente! Un asesor se comunicará contigo para activar tu cobertura.')
    navigate('/')
  }

  return (
    <div className="registro-page">
      {/* Header */}
      <header className="registro-header">
        <div className="landing-container reg-header-inner">
          <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="flex items-center rounded-lg px-3 py-1.5" style={{ background: '#152347' }}>
              <img src="/sispsa-logo-real.png" alt="SISPSA" className="h-9 w-auto object-contain" />
            </div>
          </div>
          <button className="btn-ghost btn-sm" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Volver al Inicio
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="landing-container">
          <div className="progress-bar-wrap">
            {STEP_LABELS.map((label, i) => {
              const n = (i + 1) as StepId
              const isActive = step === n
              const isDone = step > n
              return (
                <div key={n} className={`progress-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                  <div className="progress-circle">{isDone ? <CheckCircle2 size={20} /> : n}</div>
                  <span className="progress-label progress-label-full">{label}</span>
                  <span className="progress-label progress-label-short">{STEP_LABELS_SHORT[i]}</span>
                </div>
              )
            })}
            <div className="progress-line"><div className="progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} /></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="registro-main">
        <div className="landing-container">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="reg-step fade-in">
              <div className="reg-step-header">
                <MapPin size={28} className="step-header-icon" />
                <div><h2>Ubicación y Clínica</h2><p>Selecciona tu ubicación para ver las clínicas disponibles</p></div>
              </div>
              <div className="reg-form-grid">
                <div className="form-group">
                  <label className="form-label">Estado <span className="req">*</span></label>
                  <div className="select-wrapper">
                    <select value={selectedEstado} onChange={(e) => { setSelectedEstado(e.target.value); setSelectedCiudad(''); setSelectedClinica('') }}>
                      <option value="">Selecciona un estado</option>
                      {estadosVenezuela.map((e) => <option key={e.nombre} value={e.nombre}>{e.nombre}</option>)}
                    </select>
                    <ChevronDown size={16} className="select-icon" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Ciudad <span className="req">*</span></label>
                  <div className="select-wrapper">
                    <select value={selectedCiudad} onChange={(e) => { setSelectedCiudad(e.target.value); setSelectedClinica('') }} disabled={!selectedEstado}>
                      <option value="">Selecciona una ciudad</option>
                      {ciudades.map((c) => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
                    </select>
                    <ChevronDown size={16} className="select-icon" />
                  </div>
                </div>
              </div>

              {selectedCiudad && clinicasList.length > 0 && (
                <div className="clinicas-selector">
                  <label className="form-label">Clínica de Preferencia</label>
                  <div className="clinicas-list">
                    {clinicasList.map((c) => (
                      <label key={c.id} className={`clinica-option ${selectedClinica === c.id ? 'selected' : ''}`}>
                        <input type="radio" name="clinica" value={c.id} checked={selectedClinica === c.id} onChange={() => setSelectedClinica(c.id)} />
                        <div className="clinica-option-inner">
                          <div className="clinic-icon-wrap"><Building2 size={20} /></div>
                          <div className="clinic-info">
                            <h4>{c.nombre}</h4>
                            <p className="clinic-addr"><MapPin size={12} />{c.direccion}</p>
                            <p className="clinic-phone"><Phone size={12} />{c.telefono}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedCiudad && clinicasList.length === 0 && (
                <div className="clinics-reembolso compact">
                  <Globe size={32} className="reembolso-icon" />
                  <h3>Cobertura Nacional con Reembolso</h3>
                  <p>No hay clínicas afiliadas en {selectedCiudad}. Podrás solicitar reembolso del <strong>80%</strong> en cualquier centro de salud.</p>
                </div>
              )}

              <div className="reg-actions">
                <div />
                <button className="btn-primary btn-lg" disabled={!canNext1} onClick={() => setStep(2)}>
                  <span>Siguiente</span><ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="reg-step fade-in">
              <div className="reg-step-header">
                <FileText size={28} className="step-header-icon" />
                <div><h2>Selección de Plan</h2><p>Elige el plan que mejor se adapte a tus necesidades</p></div>
              </div>
              <div className="plans-grid reg-plans">
                {planes.map((plan) => (
                  <div key={plan.id} className={`plan-card ${plan.destacado ? 'plan-featured' : ''} ${selectedPlan === plan.id ? 'plan-selected' : ''}`} onClick={() => setSelectedPlan(plan.id)}>
                    {plan.etiqueta && <div className="plan-tag" style={{ backgroundColor: plan.color, color: '#fff' }}>{plan.etiqueta}</div>}
                    <div className="plan-header">
                      <h3 className="plan-name" style={{ color: plan.color }}>{plan.nombre}</h3>
                      <div className="plan-price"><span className="plan-currency">$</span><span className="plan-amount">{plan.precio}</span><span className="plan-period">/mes</span></div>
                    </div>
                    <ul className="plan-benefits">
                      {plan.beneficios.map((b, i) => (<li key={i}><CheckCircle2 size={14} style={{ color: plan.color }} /><span>{b}</span></li>))}
                    </ul>
                    {selectedPlan === plan.id && <div className="plan-check"><CheckCircle2 size={24} /></div>}
                  </div>
                ))}
              </div>
              <div className="reg-actions">
                <button className="btn-ghost btn-lg" onClick={() => setStep(1)}><ArrowLeft size={18} /><span>Anterior</span></button>
                <button className="btn-primary btn-lg" disabled={!canNext2} onClick={() => setStep(3)}><span>Siguiente</span><ArrowRight size={18} /></button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="reg-step fade-in">
              <div className="reg-step-header">
                <User size={28} className="step-header-icon" />
                <div><h2>Datos Personales</h2><p>Completa tu información para finalizar el registro</p></div>
              </div>
              <div className="reg-form-card">
                <div className="reg-form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Nombre Completo <span className="req">*</span></label>
                    <input type="text" className="form-input" placeholder="Ej: María González Pérez" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cédula / RIF <span className="req">*</span></label>
                    <div className="input-with-prefix">
                      <select className="prefix-select" value={formData.tipoDoc} onChange={(e) => setFormData({ ...formData, tipoDoc: e.target.value })}>
                        <option value="V">V</option><option value="E">E</option><option value="J">J</option><option value="G">G</option>
                      </select>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" className="form-input" placeholder="12345678" value={formData.cedula} onChange={(e) => setFormData({ ...formData, cedula: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fecha de Nacimiento <span className="req">*</span></label>
                    <input type="date" className="form-input" value={formData.fechaNacimiento} onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo Electrónico <span className="req">*</span></label>
                    <input type="email" className="form-input" placeholder="correo@ejemplo.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teléfono <span className="req">*</span></label>
                    <input type="tel" inputMode="tel" className="form-input" placeholder="0412-1234567" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                  </div>
                </div>

                <div className="upload-section">
                  <label className="form-label">Documento de Identidad</label>
                  <div className="upload-grid">
                    <div className="upload-zone" onClick={() => frontRef.current?.click()}>
                      <input ref={frontRef} type="file" accept="image/*,.pdf" hidden onChange={(e) => setCedulaFront(e.target.files?.[0] || null)} />
                      <Upload size={24} className="upload-icon" />
                      <span className="upload-text">{cedulaFront ? cedulaFront.name : 'Cédula (Frente)'}</span>
                      <span className="upload-hint">JPG, PNG o PDF</span>
                    </div>
                    <div className="upload-zone" onClick={() => backRef.current?.click()}>
                      <input ref={backRef} type="file" accept="image/*,.pdf" hidden onChange={(e) => setCedulaBack(e.target.files?.[0] || null)} />
                      <Upload size={24} className="upload-icon" />
                      <span className="upload-text">{cedulaBack ? cedulaBack.name : 'Cédula (Reverso)'}</span>
                      <span className="upload-hint">JPG, PNG o PDF</span>
                    </div>
                  </div>
                </div>

                <label className="terms-check">
                  <input type="checkbox" checked={formData.aceptaTerminos} onChange={(e) => setFormData({ ...formData, aceptaTerminos: e.target.checked })} />
                  <span>Acepto los <a href="#" className="terms-link">Términos y Condiciones</a> y la <a href="#" className="terms-link">Política de Privacidad</a> de Red Empresarial.</span>
                </label>
              </div>

              <div className="reg-actions">
                <button className="btn-ghost btn-lg" onClick={() => setStep(2)}><ArrowLeft size={18} /><span>Anterior</span></button>
                <button className="btn-primary btn-lg" disabled={!canSubmit} onClick={handleSubmit}><span>Completar Registro</span><CheckCircle2 size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
