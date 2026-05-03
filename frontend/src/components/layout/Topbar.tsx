import { useState, useRef, useEffect } from 'react'
import { Search, Bell, ChevronDown, Menu, CheckCheck, Trash2, UserPlus, AlertTriangle, Info } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications, type AppNotification } from '@/context/NotificationContext'
import { cn } from '@/lib/utils'

interface TopbarProps {
  readonly title?: string
  readonly onMenuToggle?: () => void
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'Ahora'
  if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`
  if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`
  return `Hace ${Math.floor(seconds / 86400)}d`
}

const notifIcons: Record<AppNotification['type'], React.ReactNode> = {
  success: <UserPlus className="h-4 w-4 text-success" />,
  info:    <Info className="h-4 w-4 text-primary" />,
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  error:   <AlertTriangle className="h-4 w-4 text-danger" />,
}

const notifDot: Record<AppNotification['type'], string> = {
  success: 'bg-success',
  info:    'bg-primary',
  warning: 'bg-warning',
  error:   'bg-danger',
}

export default function Topbar({ title, onMenuToggle }: TopbarProps) {
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const userInitials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'
  const userName = user ? user.name : 'Administrador'

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="topbar">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="topbar-menu-btn" aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </button>
        {title && <h1 className="text-lg font-semibold text-text-primary topbar-title">{title}</h1>}
      </div>

      {/* Center — Search */}
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

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setIsNotifOpen(v => !v); setIsProfileOpen(false) }}
            className="relative rounded-md p-2 text-text-muted transition-colors hover:bg-canvas hover:text-text-primary"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-surface shadow-xl z-50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-text-primary" />
                  <span className="text-sm font-bold text-text-primary">Notificaciones</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">{unreadCount}</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Marcar todas
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <Bell className="h-8 w-8 text-border" />
                    <p className="text-sm text-text-muted">Sin notificaciones</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-canvas border-b border-border last:border-0',
                        !n.read && 'bg-primary/3'
                      )}
                    >
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-canvas">
                        {notifIcons[n.type]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-text-primary leading-tight">{n.title}</p>
                          {!n.read && <span className={cn('mt-1.5 h-2 w-2 flex-shrink-0 rounded-full', notifDot[n.type])} />}
                        </div>
                        <p className="mt-0.5 text-xs text-text-muted leading-relaxed">{n.message}</p>
                        <p className="mt-1 text-[10px] text-text-muted">{timeAgo(n.timestamp)}</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); removeNotification(n.id) }}
                        className="mt-0.5 flex-shrink-0 rounded p-0.5 text-text-muted opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="topbar-divider" />

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setIsProfileOpen(v => !v); setIsNotifOpen(false) }}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-canvas"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {userInitials}
            </div>
            <span className="topbar-username">{userName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-text-muted topbar-chevron" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-surface py-1 shadow-lg z-50">
              <div className="px-4 py-2 border-b border-border mb-1">
                <p className="text-sm font-semibold text-text-primary">{userName}</p>
                <p className="text-[10px] text-text-muted uppercase">{user?.role}</p>
              </div>
              <button
                onClick={() => { setIsProfileOpen(false); logout() }}
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
