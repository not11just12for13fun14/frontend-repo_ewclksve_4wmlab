import { useEffect, useState, useCallback } from 'react'
import { api } from '../utils/api'
import Sidebar from './Sidebar'
import HeaderBar from './HeaderBar'
import Stats from './Stats'
import EventCard from './EventCard'

export default function Dashboard({ token, user, onCreateEvent }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [section, setSection] = useState('events')

  const load = useCallback(async () => {
    if (!token) return
    setLoading(true)
    setError('')
    try {
      const data = await api('/api/events', { token })
      setEvents(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { load() }, [load])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(800px_circle_at_80%_10%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(700px_circle_at_20%_20%,rgba(34,197,94,0.1),transparent_35%)]"/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          <Sidebar current={section} onNavigate={setSection} />

          <main className="flex-1">
            <HeaderBar user={user} onNewEvent={onCreateEvent} />

            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Overview</h2>
                <button onClick={onCreateEvent} className="sm:hidden inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-500/90 text-white font-semibold px-4 py-2 shadow-md">New Event</button>
              </div>
              <Stats events={events} />
            </section>

            <section className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent events</h2>
              </div>
              {loading ? (
                <p className="text-slate-300">Loading events...</p>
              ) : error ? (
                <p className="text-red-300">{error}</p>
              ) : events.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                  <p className="text-slate-300">No events yet. Create your first one!</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(e => (
                    <EventCard key={e.id} event={e} onEdit={()=>{}} onView={()=>{}} onShare={()=>{}} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
