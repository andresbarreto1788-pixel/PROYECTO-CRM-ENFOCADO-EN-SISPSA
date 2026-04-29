import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface AppLayoutProps {
  readonly title?: string
}

export default function AppLayout({ title }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-canvas">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <Topbar title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6" style={{ maxWidth: 'var(--content-max-width)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
