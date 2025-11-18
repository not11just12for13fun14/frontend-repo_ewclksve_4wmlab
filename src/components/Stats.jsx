import { CalendarDays, Users, Gift } from 'lucide-react'

export default function Stats({ events = [] }) {
  const active = events.filter(e => e.status === 'active').length
  const upcoming = events.filter(e => new Date(e.date) >= new Date()).length
  const totalParticipants = events.reduce((acc, e) => acc + (e.participants?.length || 0), 0)

  const Card = ({ icon: Icon, label, value, color }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${color}`}>
        <Icon className="h-5 w-5"/>
      </div>
      <div>
        <div className="text-sm text-slate-300">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card icon={Gift} label="Active events" value={active} color="bg-blue-500/20 text-blue-300" />
      <Card icon={CalendarDays} label="Upcoming exchanges" value={upcoming} color="bg-emerald-500/20 text-emerald-300" />
      <Card icon={Users} label="Participants total" value={totalParticipants} color="bg-teal-500/20 text-teal-300" />
    </div>
  )
}
