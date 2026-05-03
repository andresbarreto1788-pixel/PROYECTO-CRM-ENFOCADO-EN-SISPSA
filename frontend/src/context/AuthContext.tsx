import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'vendedor' | 'supervisor' | 'admin' | 'super_admin'
export type UserStatus = 'PENDIENTE' | 'ACTIVO' | 'BLOQUEADO'

interface User {
  email: string
  name: string
  role: UserRole
  zone: string
  status: UserStatus
  mustChangePassword?: boolean
}

interface AuditLog {
  id: string
  event: string
  user: string
  timestamp: string
  details: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password?: string) => Promise<void>
  logout: () => void
  updatePassword: (newPassword: string) => Promise<void>
  isLoading: boolean
  auditLogs: AuditLog[]
  addAuditLog: (event: string, details: string) => void
  // New User Management
  teamMembers: User[]
  updateUserStatus: (email: string, newStatus: UserStatus) => void
  createUser: (userData: Omit<User, 'status' | 'mustChangePassword'>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Reset sessions for V1.2.0 if not already reset
const VERSION_KEY = 'con3xuz_version'
const CURRENT_VERSION = '1.2.1'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [teamMembers, setTeamMembers] = useState<User[]>([])

  useEffect(() => {
    // Session Hard Reset Logic
    const savedVersion = localStorage.getItem(VERSION_KEY)
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.removeItem('sispsa_session')
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
    }

    const savedUser = localStorage.getItem('sispsa_session')
    const savedLogs = localStorage.getItem('sispsa_audit_logs')
    const savedTeam = localStorage.getItem('sispsa_team')
    
    try {
      if (savedUser) setUser(JSON.parse(savedUser))
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs))
      if (savedTeam) setTeamMembers(JSON.parse(savedTeam))
    } catch (error) {
      console.error('Error loading session:', error)
      localStorage.removeItem('sispsa_session')
    }
    
    setIsLoading(false)
  }, [])

  const addAuditLog = (event: string, details: string) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      event,
      user: user?.email || 'Sistema',
      timestamp: new Date().toLocaleString(),
      details
    }
    const updatedLogs = [newLog, ...auditLogs].slice(0, 100)
    setAuditLogs(updatedLogs)
    localStorage.setItem('sispsa_audit_logs', JSON.stringify(updatedLogs))
  }

  const login = async (email: string, password?: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    let role: UserRole = 'vendedor'
    let status: UserStatus = 'PENDIENTE'
    let zone = 'Nacional'
    let mustChangePassword = false

    // Super Admin Maestro (Andrés Gudiño or @sispsa domain)
    const isSuperEmail = email.toLowerCase() === 'andresgudino@gmail.com' || 
                        email.toLowerCase().endsWith('@sispsa.com.ve') ||
                        email.toLowerCase().endsWith('@con3xuz.com')

    if (isSuperEmail) {
      role = 'super_admin'
      status = 'ACTIVO' // Super Admin always active
    } else {
      // Check if user exists in teamMembers
      const existing = teamMembers.find(m => m.email === email)
      if (existing) {
        role = existing.role
        status = existing.status
        zone = existing.zone
      }
    }

    const name = email.split('@')[0].split('.')[0].replace(/^\w/, (c) => c.toUpperCase())
    const newUser: User = { 
      email, 
      name, 
      role, 
      zone, 
      status: 'ACTIVO', 
      mustChangePassword: false 
    }
    setUser(newUser)
    localStorage.setItem('sispsa_session', JSON.stringify(newUser))
    addAuditLog('Inicio de Sesión', `Acceso con rol ${role.toUpperCase()} - Estado: ${status}`)
    setIsLoading(false)
  }

  const logout = () => {
    addAuditLog('Cierre de Sesión', 'Desconexión de usuario')
    setUser(null)
    localStorage.removeItem('sispsa_session')
  }

  const updateUserStatus = (email: string, newStatus: UserStatus) => {
    const updatedTeam = teamMembers.map(m => m.email === email ? { ...m, status: newStatus } : m)
    setTeamMembers(updatedTeam)
    localStorage.setItem('sispsa_team', JSON.stringify(updatedTeam))
    addAuditLog('Aprobación de Cuentas', `Usuario ${email} actualizado a ${newStatus}`)
    
    // If current user is the one updated, sync session
    if (user?.email === email) {
      const updatedUser = { ...user, status: newStatus }
      setUser(updatedUser)
      localStorage.setItem('sispsa_session', JSON.stringify(updatedUser))
    }
  }

  const createUser = async (userData: Omit<User, 'status' | 'mustChangePassword'>) => {
    const newUser: User = { 
      ...userData, 
      status: 'ACTIVO', 
      mustChangePassword: true 
    }
    const updatedTeam = [...teamMembers, newUser]
    setTeamMembers(updatedTeam)
    localStorage.setItem('sispsa_team', JSON.stringify(updatedTeam))
    addAuditLog('Creación de Personal', `Asesor ${userData.email} creado como ${userData.role}`)
  }

  const updatePassword = async (newPassword: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    if (user) {
      const updatedUser: User = { ...user, mustChangePassword: false }
      setUser(updatedUser)
      localStorage.setItem('sispsa_session', JSON.stringify(updatedUser))
      addAuditLog('Seguridad', 'Contraseña actualizada')
    }
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, updatePassword, isLoading, auditLogs, addAuditLog,
      teamMembers, updateUserStatus, createUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
