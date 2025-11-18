import { CalendarDays, Users, Clock, Share2, Edit3, Eye } from 'lucide-react'

function daysUntil(dateStr) {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target - now
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (isNaN(days)) return '—'
  if (days < 0) return 'Ended'
  if (days === 0) return 'Today'
  return `${days}d`
}

export default function EventCard({ event, onEdit, onView, onShare }) {
  const statusColor = {
    draft: 'bg-slate-700 text-slate-200',
    active: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
    completed: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
  }[event.status || 'draft']

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors shadow-sm hover:shadow-md p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white leading-tight">{event.name}</h3>
          <p className="text-xs text-slate-300 mt-1">{event.event_type || 'Secret Santa'}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${statusColor}`}>{(event.status || 'Draft').toString().replace(/^./, s=>s.toUpperCase())}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-slate-200">
        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/><span>{event.date}</span></div>
        <div className="flex items-center gap-2"><Users className="h-4 w-4"/><span>{event.participants?.length || 0} people</span></div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4"/><span>{daysUntil(event.date)}</span></div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button onClick={()=>onEdit?.(event)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition"><Edit3 className="h-3.5 w-3.5"/>Edit</button>
        <button onClick={()=>onView?.(event)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs transition"><Eye className="h-3.5 w-3.5"/>View</button>
        <button onClick={()=>onShare?.(event)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white text-xs transition"><Share2 className="h-3.5 w-3.5"/>Share</button>
      </div>
    </div>
  )
}
