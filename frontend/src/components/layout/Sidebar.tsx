import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  Home,
  Users,
  LayoutGrid,
  Calendar,
  GraduationCap,
  Settings,
  X,
  LogOut,
  ShieldCheck,
  Activity,
  UserCog,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigationItems, bottomNavItems, currentUser } from '@/data/mockData'

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  LayoutGrid,
  Calendar,
  GraduationCap,
  Settings,
  ShieldCheck,
  Activity,
  UserCog,
}

interface SidebarProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/')
  }

  return (
    <aside className={cn(
      'sidebar-container',
      isOpen && 'sidebar-open'
    )}>
      {/* ─── Brand Header ─── */}
      <div>
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex flex-col items-center gap-3 w-full">
            <img src="/sispsa-logo-white.svg" alt="SISPSA Red Empresarial" className="h-10 w-auto" />
            <span className="text-[10px] uppercase tracking-wider text-sidebar-text">
              Health Insurance CRM
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="sidebar-close-btn"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ─── Navigation Menu ─── */}
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon]
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path))

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'sidebar-item-active'
                    : 'border-l-3 border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                )}
              >
                {Icon && <Icon className="h-[18px] w-[18px]" />}
                <span>{item.label}</span>
              </NavLink>
            )
          })}
          
          {/* Admin specific items */}
          {user?.role === 'admin' && (
            <NavLink
              to="/equipo"
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                location.pathname === '/equipo'
                  ? 'sidebar-item-active'
                  : 'border-l-3 border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              )}
            >
              <ShieldCheck className="h-[18px] w-[18px]" />
              <span>Gestión de Equipo</span>
            </NavLink>
          )}

          {/* Super Admin specific items (V1.2.0) */}
          {user?.role === 'super_admin' && (
            <>
              <div className="mx-3 mt-4 mb-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Master Control
              </div>
              <NavLink
                to="/usuarios"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  location.pathname === '/usuarios'
                    ? 'sidebar-item-active'
                    : 'border-l-3 border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                )}
              >
                <UserCog className="h-[18px] w-[18px]" />
                <span>Gestión de Usuarios</span>
              </NavLink>
              <NavLink
                to="/auditoria"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  location.pathname === '/auditoria'
                    ? 'sidebar-item-active'
                    : 'border-l-3 border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                )}
              >
                <Activity className="h-[18px] w-[18px]" />
                <span>Centro de Auditoría</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* ─── Bottom Section ─── */}
      <div className="px-3 pb-4">
        {/* Settings */}
        {bottomNavItems.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'sidebar-item-active'
                  : 'border-l-3 border-transparent text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              )}
            >
              {Icon && <Icon className="h-[18px] w-[18px]" />}
              <span>{item.label}</span>
            </NavLink>
          )
        })}

        {/* User Profile */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {user ? user.email[0].toUpperCase() : currentUser.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user ? user.email.split('@')[0] : currentUser.name}</p>
              <p className="truncate text-xs text-sidebar-text">{user ? 'Asesor' : currentUser.role}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-text transition-all duration-150 hover:bg-danger/20 hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
