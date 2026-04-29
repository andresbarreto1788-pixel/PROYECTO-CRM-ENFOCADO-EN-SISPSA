import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  Users,
  LayoutGrid,
  Calendar,
  GraduationCap,
  Settings,
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
}

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen flex-col justify-between bg-sidebar text-white"
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* ─── Brand Header ─── */}
      <div>
        <div className="flex flex-col items-center gap-2 px-6 pt-6 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white">
            <span className="text-lg font-extrabold tracking-tight text-primary">RE</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            Red Empresarial
          </span>
          <span className="text-[10px] uppercase tracking-wider text-sidebar-text">
            Health Insurance CRM
          </span>
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
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
            {currentUser.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{currentUser.name}</p>
            <p className="truncate text-xs text-sidebar-text">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
