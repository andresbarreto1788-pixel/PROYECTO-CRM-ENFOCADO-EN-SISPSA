import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AppLayoutProps {
  readonly title?: string
}

export default function AppLayout({ title }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="app-main">
        <Topbar title={title} onMenuToggle={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="app-content">
          <Outlet />
          
          <footer className="mt-auto border-t border-border/50 py-6 text-center">
            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase">
              Powered by <span className="text-text-primary">CON3XUZ</span> | Versión 1.2.0
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
