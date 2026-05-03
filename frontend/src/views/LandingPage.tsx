import { useNavigate } from 'react-router-dom'
import { useState, lazy, Suspense } from 'react'
import {
  Shield, Building2, DollarSign, Zap, CheckCircle2,
  ClipboardList, UserPlus, BadgeCheck, MapPin, Phone,
  Mail, ChevronDown, ArrowRight, Heart, Star, Globe,
  Menu, X,
} from 'lucide-react'
import { planes, estadosVenezuela } from '@/data/clinicasData'

export default function LandingPage() {
  const navigate = useNavigate()
  const [selectedEstado, setSelectedEstado] = useState('')
  const [selectedCiudad, setSelectedCiudad] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const estado = estadosVenezuela.find((e) => e.nombre === selectedEstado)
  const ciudades = estado?.ciudades || []
  const ciudad = ciudades.find((c) => c.nombre === selectedCiudad)
  const clinicas = ciudad?.clinicas || []

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="landing-page">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-container nav-inner">
          <div className="nav-logo">
            <img src="/sispsa-logo.svg" alt="SISPSA Red Empresarial" className="h-10 w-auto" />
          </div>
          <div className="nav-links">
            <a href="#beneficios">Beneficios</a>
            <a href="#planes">Planes</a>
            <a href="#clinicas">Clínicas</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className="flex items-center gap-4 nav-cta-desktop">
            <button className="btn-ghost nav-access-btn" onClick={() => navigate('/login')}>Acceso Asesores</button>
            <button className="btn-primary nav-cta" onClick={() => navigate('/registro')}>Afíliate Ahora</button>
          </div>
          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}>
          <div className="mobile-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <div className="nav-logo">
                <img src="/sispsa-logo.svg" alt="SISPSA" className="h-9 w-auto" />
              </div>
              <button className="mobile-close-btn" onClick={closeMobileMenu} aria-label="Cerrar menú"><X size={24} /></button>
            </div>
            <div className="mobile-sheet-links">
              <a href="#beneficios" onClick={closeMobileMenu}>Beneficios</a>
              <a href="#planes" onClick={closeMobileMenu}>Planes</a>
              <a href="#clinicas" onClick={closeMobileMenu}>Clínicas</a>
              <a href="#contacto" onClick={closeMobileMenu}>Contacto</a>
            </div>
            <div className="flex flex-col gap-3 mt-auto">
              <button className="btn-primary btn-full btn-lg mobile-sheet-cta" onClick={() => { closeMobileMenu(); navigate('/registro') }}>
                <span>Afíliate Ahora</span><ArrowRight size={18} />
              </button>
              <button className="btn-ghost btn-full btn-lg" style={{ borderColor: '#1E40AF', color: '#1E40AF' }} onClick={() => { closeMobileMenu(); navigate('/login') }}>
                Acceso Asesores
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg-pattern" />
        <div className="landing-container hero-inner">
          <div className="hero-content">
            <div className="hero-badge"><Heart size={14} /><span>Red de Salud Corporativa #1 de Venezuela</span></div>
            <h1 className="hero-title">Tu Salud,<br /><span className="hero-accent">Nuestra Red</span></h1>
            <p className="hero-subtitle">Accede a la red de clínicas privadas más completa del país con planes corporativos desde <strong>$20/mes</strong>. Cobertura inmediata, sin períodos de espera.</p>
            <div className="hero-actions">
              <button className="btn-primary btn-lg" onClick={() => navigate('/registro')}><span>Comienza tu Afiliación</span><ArrowRight size={20} /></button>
              <button className="btn-ghost btn-lg hero-btn-secondary" onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}>Ver Planes</button>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><span className="stat-value">+150</span><span className="stat-label">Clínicas</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><span className="stat-value">24</span><span className="stat-label">Estados</span></div>
              <div className="stat-divider" />
              <div className="stat-item"><span className="stat-value">+50K</span><span className="stat-label">Afiliados</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="hero-float-card hfc-1"><Shield size={24} className="hfc-icon" /><div><span className="hfc-title">Cobertura Total</span><span className="hfc-sub">Sin períodos de espera</span></div></div>
              <div className="hero-float-card hfc-2"><CheckCircle2 size={24} className="hfc-icon hfc-success" /><div><span className="hfc-title">Póliza Activa</span><span className="hfc-sub">Plan Oro · Activo</span></div></div>
              <div className="hero-float-card hfc-3"><Star size={24} className="hfc-icon hfc-gold" /><div><span className="hfc-title">4.9/5 Satisfacción</span><span className="hfc-sub">+2,000 reseñas</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="section-benefits">
        <div className="landing-container">
          <div className="section-header"><span className="section-tag">¿Por qué elegir Red Empresarial?</span><h2 className="section-title">La red de salud que tu empresa necesita</h2></div>
          <div className="benefits-grid">
            <div className="benefit-card"><div className="benefit-icon"><Building2 size={28} /></div><h3>Red Nacional de Clínicas</h3><p>Más de 150 centros de salud en los 24 estados del país.</p></div>
            <div className="benefit-card"><div className="benefit-icon"><DollarSign size={28} /></div><h3>Planes desde $20/mes</h3><p>Opciones flexibles para todo presupuesto empresarial.</p></div>
            <div className="benefit-card"><div className="benefit-icon"><Zap size={28} /></div><h3>Cobertura Inmediata</h3><p>Tu póliza se activa desde el primer día, sin carencia.</p></div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planes" className="section-plans">
        <div className="landing-container">
          <div className="section-header"><span className="section-tag">Nuestros Planes</span><h2 className="section-title">Elige la protección ideal</h2></div>
          <div className="plans-grid">
            {planes.map((plan) => (
              <div key={plan.id} className={`plan-card ${plan.destacado ? 'plan-featured' : ''}`}>
                {plan.etiqueta && <div className="plan-tag" style={{ backgroundColor: plan.color, color: '#fff' }}>{plan.etiqueta}</div>}
                <div className="plan-header">
                  <h3 className="plan-name" style={{ color: plan.color }}>{plan.nombre}</h3>
                  <div className="plan-price"><span className="plan-currency">$</span><span className="plan-amount">{plan.precio}</span><span className="plan-period">/mes</span></div>
                </div>
                <ul className="plan-benefits">
                  {plan.beneficios.map((b, i) => (<li key={i}><CheckCircle2 size={16} style={{ color: plan.color }} /><span>{b}</span></li>))}
                </ul>
                <button className={plan.destacado ? 'btn-primary btn-full' : 'btn-outline btn-full'} onClick={() => navigate('/registro', { state: { planId: plan.id } })}> Seleccionar Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-howit">
        <div className="landing-container">
          <div className="section-header"><span className="section-tag">Proceso Simple</span><h2 className="section-title">¿Cómo funciona?</h2></div>
          <div className="steps-row">
            <div className="step-card"><div className="step-number">1</div><div className="step-icon"><ClipboardList size={32} /></div><h3>Elige tu Plan</h3><p>Compara las 6 opciones y selecciona la ideal.</p></div>
            <div className="step-connector" />
            <div className="step-card"><div className="step-number">2</div><div className="step-icon"><UserPlus size={32} /></div><h3>Registra tus Datos</h3><p>Completa tu información y carga tu cédula.</p></div>
            <div className="step-connector" />
            <div className="step-card"><div className="step-number">3</div><div className="step-icon"><BadgeCheck size={32} /></div><h3>Activa tu Cobertura</h3><p>Recibe tu carnet digital al instante.</p></div>
          </div>
        </div>
      </section>

      {/* Clinics Finder */}
      <section id="clinicas" className="section-clinics">
        <div className="landing-container">
          <div className="section-header"><span className="section-tag">Nuestra Red</span><h2 className="section-title">Red de Clínicas Afiliadas</h2></div>
          <div className="clinics-finder">
            <div className="finder-controls">
              <div className="finder-select-group">
                <label>Estado</label>
                <div className="select-wrapper">
                  <select value={selectedEstado} onChange={(e) => { setSelectedEstado(e.target.value); setSelectedCiudad('') }}>
                    <option value="">Selecciona un estado</option>
                    {estadosVenezuela.map((e) => <option key={e.nombre} value={e.nombre}>{e.nombre}</option>)}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>
              <div className="finder-select-group">
                <label>Ciudad</label>
                <div className="select-wrapper">
                  <select value={selectedCiudad} onChange={(e) => setSelectedCiudad(e.target.value)} disabled={!selectedEstado}>
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((c) => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>
            </div>
            {selectedCiudad && clinicas.length > 0 && (
              <div className="clinics-results">
                {clinicas.map((c) => (
                  <div key={c.id} className="clinic-card">
                    <div className="clinic-icon-wrap"><Building2 size={24} /></div>
                    <div className="clinic-info">
                      <h4>{c.nombre}</h4>
                      <p className="clinic-addr"><MapPin size={14} />{c.direccion}</p>
                      <p className="clinic-phone"><Phone size={14} />{c.telefono}</p>
                      <div className="clinic-tags">{c.especialidades.map((esp) => <span key={esp} className="clinic-tag">{esp}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedCiudad && clinicas.length === 0 && (
              <div className="clinics-reembolso">
                <Globe size={40} className="reembolso-icon" />
                <h3>Cobertura Nacional con Reembolso</h3>
                <p>No contamos con clínicas afiliadas en {selectedCiudad}. Puedes acudir a cualquier centro y solicitar el <strong>reembolso del 80%</strong>.</p>
                <button className="btn-primary" onClick={() => navigate('/registro')}>Afiliarte con Reembolso</button>
              </div>
            )}
            {!selectedCiudad && selectedEstado && (
              <div className="clinics-prompt"><MapPin size={32} className="prompt-icon" /><p>Selecciona una ciudad para ver clínicas</p></div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta">
        <div className="landing-container">
          <div className="cta-card">
            <div className="cta-content"><h2>¿Listo para proteger a tu equipo?</h2><p>Más de 500 empresas ya forman parte de Red Empresarial.</p></div>
            <button className="btn-primary btn-lg" onClick={() => navigate('/registro')}><span>Iniciar Registro</span><ArrowRight size={20} /></button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="landing-footer">
        <div className="landing-container footer-inner">
          <div className="footer-brand">
            <div className="nav-logo"><Shield size={24} className="nav-logo-icon" /><div><span className="nav-brand">Red Empresarial</span><span className="nav-sub">SISPSA</span></div></div>
            <p className="footer-desc">Sistema Integral de Salud Privada S.A. — Cobertura médica corporativa en Venezuela.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>Servicios</h4><a href="#planes">Planes</a><a href="#clinicas">Clínicas</a><a href="#beneficios">Beneficios</a></div>
            <div className="footer-col"><h4>Contacto</h4><a href="mailto:info@sispsa.com.ve"><Mail size={14} /> info@sispsa.com.ve</a><a href="tel:+582129000000"><Phone size={14} /> (0212) 900-0000</a></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Red Empresarial SISPSA | Desarrollado por CON3XUZ. Todos los derechos reservados.</p></div>
        </div>
      </footer>
    </div>
  )
}
