import { Gift, CalendarRange, ListChecks, Settings } from 'lucide-react'

export default function Sidebar({ current = 'events', onNavigate }) {
  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onNavigate?.(id)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
        current === id ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="h-5 w-5"/>
      <span>{label}</span>
    </button>
  )

  return (
    <aside className="hidden md:block md:w-64 shrink-0">
      <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-white mb-4">
          <Gift className="h-5 w-5 text-blue-400"/>
          <span className="font-semibold">GiftFlow</span>
        </div>
        <nav className="grid gap-1.5">
          <NavItem id="events" icon={CalendarRange} label="Events" />
          <NavItem id="wishlist" icon={ListChecks} label="Wishlist" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </nav>
      </div>
    </aside>
  )
}
