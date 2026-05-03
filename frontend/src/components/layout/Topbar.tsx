import { useState } from 'react'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface TopbarProps {
  readonly title?: string
  readonly onMenuToggle?: () => void
}

export default function Topbar({ title, onMenuToggle }: TopbarProps) {
  const { user, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD'
  const userName = user ? user.name : 'Administrador'

  return (
    <header className="topbar">
      {/* Left — Hamburger (mobile) + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="topbar-menu-btn"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-text-primary topbar-title">{title}</h1>
        )}
      </div>

      {/* Center — Search Bar (hidden on small mobile) */}
      <div className="topbar-search">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar cliente por cédula, nombre o póliza..."
            className="w-full rounded-lg border border-border bg-canvas py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right — Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative rounded-md p-2 text-text-muted transition-colors hover:bg-canvas hover:text-text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Divider - hidden on mobile */}
        <div className="topbar-divider" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-canvas"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {userInitials}
            </div>
            <span className="topbar-username">{userName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted topbar-chevron" />
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-surface py-1 shadow-lg">
              <div className="px-4 py-2 border-b border-border mb-1">
                <p className="text-sm font-semibold text-text-primary">{userName}</p>
                <p className="text-[10px] text-text-muted uppercase">{user?.role}</p>
              </div>
              <button 
                onClick={() => {
                  setIsProfileOpen(false)
                  logout()
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
