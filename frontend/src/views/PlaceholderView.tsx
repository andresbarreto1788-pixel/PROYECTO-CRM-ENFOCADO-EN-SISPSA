import { Construction } from 'lucide-react'

interface PlaceholderViewProps {
  readonly title: string
  readonly description: string
}

export default function PlaceholderView({ title, description }: PlaceholderViewProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Construction className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      <p className="max-w-md text-center text-sm text-text-muted">{description}</p>
      <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
        Próximamente
      </span>
    </div>
  )
}
