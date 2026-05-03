import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function UpdatePasswordView() {
  const navigate = useNavigate()
  const { updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('Mínimo 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('No coinciden.')
      return
    }

    setIsSubmitting(true)
    try {
      await updatePassword(password)
      navigate('/dashboard')
    } catch (err) {
      setError('Error al actualizar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#F8FAFC',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '400px', 
        padding: '40px', 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1A1B22', marginBottom: '10px' }}>Seguridad Red Empresarial</h1>
        <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '30px' }}>
          Establece tu contraseña permanente.
        </p>

        {error && <div style={{ color: 'red', fontSize: '12px', marginBottom: '15px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '10px',
              padding: '14px',
              backgroundColor: '#1E40AF',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Actualizando...' : 'Establecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}
