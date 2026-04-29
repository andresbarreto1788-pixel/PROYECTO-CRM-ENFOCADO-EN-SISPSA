import { useState, useMemo } from 'react'
import {
  Play,
  Download,
  FileText,
  Search,
  Filter,
  Eye,
  Clock,
  BookOpen,
  FileVideo,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  videoTutorials,
  resourceFiles,
  categoryLabels,
  type VideoTutorial,
  type ResourceFile,
} from '@/data/academiaData'

/* ─── Video Card Component ─── */
interface VideoCardProps {
  readonly video: VideoTutorial
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group flex flex-col gap-3 card-re overflow-hidden p-0 transition-all hover:shadow-[var(--shadow-elevated)] border-transparent hover:border-primary/20">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 pt-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {categoryLabels[video.category]}
          </span>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-text-primary group-hover:text-primary transition-colors min-h-[40px]">
          {video.title}
        </h3>
        <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {video.date}
            </span>
          </div>
          <button className="text-primary hover:underline font-medium">Ver ahora</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Resource Item Component ─── */
interface ResourceItemProps {
  readonly resource: ResourceFile
}

function ResourceItem({ resource }: ResourceItemProps) {
  const fileColors: Record<string, string> = {
    PDF: 'text-red-500 bg-red-50',
    PNG: 'text-blue-500 bg-blue-50',
    XLS: 'text-emerald-500 bg-emerald-50',
    PPT: 'text-amber-500 bg-amber-50',
  }

  return (
    <div className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:bg-canvas hover:border-primary/20">
      <div className="flex items-center gap-4 min-w-0">
        <div className={cn(
          'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg font-bold text-xs',
          fileColors[resource.type]
        )}>
          {resource.type}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-medium text-text-primary">{resource.title}</h4>
          <div className="mt-1 flex items-center gap-3 text-xs text-text-muted uppercase tracking-wider">
            <span>{resource.category}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{resource.size}</span>
          </div>
        </div>
      </div>
      <button className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-all hover:bg-primary hover:text-white">
        <Download className="h-4 w-4" />
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN VIEW: Academia
   ═══════════════════════════════════════════ */

export default function AcademiaView() {
  const [activeTab, setActiveTab] = useState<'todos' | 'ventas' | 'crm' | 'producto'>('todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVideos = useMemo(() => {
    return videoTutorials.filter(v => {
      const matchesTab = activeTab === 'todos' || v.category === activeTab
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  return (
    <div className="flex flex-col gap-8">
      {/* ─── Hero Section ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-8 text-white lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Especialización Red Empresarial
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              Academia de Ventas y Recursos
            </h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Domina las herramientas del CRM, perfecciona tus técnicas de cierre y accede a todo el material gráfico oficial para potenciar tus ventas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-dark shadow-lg shadow-primary/20">
                Ver Tutoriales CRM
              </button>
              <button className="rounded-lg bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">
                Descargar Material 2024
              </button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white">45+</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Videos</div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white">120</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Recursos</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Video Tutorials (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <FileVideo className="h-5 w-5 text-primary" />
              Tutoriales y Capacitación
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar tutorial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg border border-border bg-surface py-2 pl-9 pr-4 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 min-w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {(['todos', 'ventas', 'crm', 'producto'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium transition-all',
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-surface border border-border text-text-muted hover:bg-canvas hover:text-text-primary'
                )}
              >
                {tab === 'todos' ? 'Ver Todos' : categoryLabels[tab]}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
            {filteredVideos.length === 0 && (
              <div className="col-span-full py-12 text-center card-re border-dashed">
                <p className="text-text-muted">No se encontraron videos con esos criterios.</p>
              </div>
            )}
          </div>
          
          <button className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-4 text-sm font-semibold text-text-primary transition-all hover:bg-canvas">
            Ver Biblioteca Completa
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Column: Resources & Downloads (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recursos Descargables
            </h2>
            <button className="text-xs font-medium text-primary hover:underline">Ver todo</button>
          </div>

          <div className="flex flex-col gap-3">
            {resourceFiles.map((resource) => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </div>

          {/* Tips Card */}
          <div className="card-re p-6 bg-slate-900 border-slate-800 text-white mt-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/20 blur-2xl" />
            <h4 className="relative z-10 text-sm font-bold flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              Tip del Día
            </h4>
            <p className="relative z-10 text-xs text-slate-400 leading-relaxed">
              "El plan Diamante es ideal para familias grandes. Destaca que la cobertura odontológica no tiene deducible."
            </p>
            <button className="relative z-10 mt-4 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
              Explorar más tips
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
