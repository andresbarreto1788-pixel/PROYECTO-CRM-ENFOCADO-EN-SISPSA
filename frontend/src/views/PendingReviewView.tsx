import React from 'react'
import { useAuth } from '@/context/AuthContext'

export default function PendingReviewView() {
  const { user, logout } = useAuth()

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#F8FAFC',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        padding: '40px', 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1A1B22', marginBottom: '20px' }}>Cuenta en Revisión</h1>
        <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6' }}>
          Hola, <strong>{user?.email || 'Asesor'}</strong>.<br/><br/>
          Tu cuenta está siendo revisada por el Administrador de <strong>Red Empresarial</strong>.
        </p>
        <button 
          onClick={logout}
          style={{
            marginTop: '30px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#1E40AF',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
