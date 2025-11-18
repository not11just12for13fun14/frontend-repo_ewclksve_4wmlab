import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import { Plus, Calendar, Users, CheckCircle2 } from 'lucide-react'

export default function Dashboard({ token, user, onCreateEvent }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    (async () => {
      try {
        const data = await api('/api/events', { token })
        setEvents(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(800px_circle_at_80%_10%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(700px_circle_at_20%_20%,rgba(34,197,94,0.1),transparent_35%)]"/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome, {user?.name || 'Guest'}</h1>
            <p className="text-slate-300 text-sm">Manage your gift exchange events</p>
          </div>
          <button onClick={onCreateEvent} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-slate-900 font-semibold px-4 py-2 shadow-md">
            <Plus className="h-4 w-4"/> New Event
          </button>
        </header>

        <section className="mt-8">
          {loading ? (
            <p className="text-slate-300">Loading events...</p>
          ) : error ? (
            <p className="text-red-300">{error}</p>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-slate-300">No events yet. Create your first one!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(e => (
                <div key={e.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{e.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{e.status}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                    <Calendar className="h-4 w-4"/> <span>{e.date}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm text-slate-300">
                    <Users className="h-4 w-4"/> <span>{e.participants?.length || 0} participants</span>
                  </div>
                  {e.budget ? (
                    <div className="mt-2 flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4"/> <span>Budget: ${e.budget}</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
