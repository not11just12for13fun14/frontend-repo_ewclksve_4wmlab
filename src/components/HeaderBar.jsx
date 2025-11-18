import { Bell, ChevronDown, UserCircle } from 'lucide-react'

export default function HeaderBar({ user, onNewEvent }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome, {user?.name || 'Guest'}</h1>
        <p className="text-slate-300 text-sm">Manage your gift exchange events</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
          <Bell className="h-5 w-5 text-slate-200"/>
          <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">3</span>
        </button>
        <button onClick={onNewEvent} className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-500/90 text-white font-semibold px-4 py-2 shadow-md">
          Create New Event
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <UserCircle className="h-6 w-6 text-slate-200"/>
          <div className="text-left">
            <div className="text-sm leading-none">{user?.name || 'User'}</div>
            <div className="text-[11px] text-slate-400 leading-none">{user?.email}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-300"/>
        </div>
      </div>
    </header>
  )
}
