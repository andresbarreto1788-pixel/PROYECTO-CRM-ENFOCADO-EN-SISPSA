import React from 'react'
import { useAuth } from '@/context/AuthContext'

export default function DashboardView() {
  const { user } = useAuth()

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1B22' }}>
          Buenos días, {user?.name || 'Asesor'} 👋
        </h1>
        <p style={{ color: '#64748B', marginTop: '4px' }}>
          Bienvenido al centro operativo de <span style={{ color: '#1E40AF', fontWeight: 'bold' }}>CON3XUZ</span>.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '20px' 
      }}>
        {[
          { label: 'Comisiones', value: '$0.00' },
          { label: 'Afiliados', value: '0' },
          { label: 'Pólizas', value: '0' },
          { label: 'Meta', value: '0%' }
        ].map((kpi) => (
          <div key={kpi.label} style={{ 
            padding: '24px', 
            backgroundColor: 'white', 
            border: '1px solid #E2E8F0', 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <p style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>{kpi.label}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A1B22', marginTop: '8px' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '32px', 
        padding: '32px', 
        backgroundColor: '#EFF6FF', 
        border: '1px solid #BFDBFE', 
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#1E40AF', fontSize: '18px' }}>Ecosistema en Blanco</h2>
        <p style={{ color: '#1E40AF', opacity: 0.8, fontSize: '14px', marginTop: '8px' }}>
          El sistema ha sido reseteado para producción. Comience a cargar sus afiliados para ver métricas reales.
        </p>
      </div>
    </div>
  )
}
