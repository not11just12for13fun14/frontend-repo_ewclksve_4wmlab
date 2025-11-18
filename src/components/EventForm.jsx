import { useState } from 'react'
import { api } from '../utils/api'

export default function EventForm({ token, onCreated, onClose }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const f = new FormData(e.currentTarget)
    const payload = {
      name: f.get('name'),
      date: f.get('date'),
      budget: f.get('budget') ? parseFloat(f.get('budget')) : null,
      participants: (f.get('participants') || '')
        .split(',')
        .map(s=>s.trim())
        .filter(Boolean),
    }
    try {
      const ev = await api('/api/events', { method: 'POST', body: payload, token })
      onCreated?.(ev)
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 text-white border border-white/10 shadow-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Create event</h3>
          <button onClick={onClose} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div>
            <label className="text-sm text-slate-300">Event name</label>
            <input name="name" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
          </div>
          <div>
            <label className="text-sm text-slate-300">Date</label>
            <input name="date" type="date" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
          </div>
          <div>
            <label className="text-sm text-slate-300">Budget (optional)</label>
            <input name="budget" type="number" step="0.01" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
          </div>
          <div>
            <label className="text-sm text-slate-300">Participants (comma-separated)</label>
            <textarea name="participants" rows={3} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400" placeholder="Alice, Bob, Charlie"/>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-slate-900 font-semibold px-4 py-2 disabled:opacity-60">
            {loading ? 'Creating...' : 'Create event'}
          </button>
        </form>
      </div>
    </div>
  )
}
