import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../utils/api'

const Stepper = ({ step }) => (
  <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
    {['Basic', 'Participants', 'Rules', 'Review'].map((label, i) => {
      const idx = i + 1
      const active = step === idx
      const done = step > idx
      return (
        <div key={label} className="flex items-center gap-2">
          <div className={`h-6 px-2 rounded-full border ${active ? 'bg-blue-500 text-white border-blue-400' : done ? 'bg-emerald-600/30 text-emerald-200 border-emerald-500/40' : 'bg-white/5 text-slate-200 border-white/10'}`}>{label}</div>
          {i < 3 && <div className="w-6 h-px bg-white/10" />}
        </div>
      )
    })}
  </div>
)

export default function EventWizard({ token, open, onClose, onCreated }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [basic, setBasic] = useState({ name: '', event_type: 'Secret Santa', date: '', budget: '' })
  const [participants, setParticipants] = useState([])
  const [bulk, setBulk] = useState('')
  const [rules, setRules] = useState({ allow_wishlists: true, collect_addresses: false, custom_message: '' })

  const canNext = useMemo(() => {
    if (step === 1) return basic.name && basic.date
    if (step === 2) return true
    if (step === 3) return true
    return true
  }, [step, basic])

  const addParticipant = (email) => {
    const e = (email || '').trim()
    if (!e) return
    if (participants.includes(e)) return
    setParticipants((prev) => [...prev, e])
  }

  const removeParticipant = (email) => setParticipants((prev) => prev.filter(p => p !== email))

  const addBulk = () => {
    const emails = bulk.split(/\n|,|;/).map(s => s.trim()).filter(Boolean)
    const set = new Set([...participants, ...emails])
    setParticipants([...set])
    setBulk('')
  }

  const create = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        name: basic.name,
        event_type: basic.event_type,
        date: basic.date,
        budget: basic.budget ? Number(basic.budget) : null,
        participants,
        allow_wishlists: rules.allow_wishlists,
        collect_addresses: rules.collect_addresses,
        custom_message: rules.custom_message || null,
      }
      const ev = await api('/api/events', { method: 'POST', body: payload, token })
      onCreated?.(ev)
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setBasic({ name: '', event_type: 'Secret Santa', date: '', budget: '' })
    setParticipants([])
    setBulk('')
    setRules({ allow_wishlists: true, collect_addresses: false, custom_message: '' })
    onClose?.()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <motion.div initial={{y:16,opacity:0}} animate={{y:0,opacity:1}} exit={{y:16,opacity:0}} className="w-full max-w-2xl rounded-2xl bg-slate-900 text-white border border-white/10 shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Create a new event</h3>
              <button onClick={resetAndClose} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15">Close</button>
            </div>

            <div className="mt-4">
              <Stepper step={step} />
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} exit={{opacity:0, x: -20}} className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-300">Event name</label>
                        <input value={basic.name} onChange={e=>setBasic(v=>({...v, name:e.target.value}))} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
                      </div>
                      <div>
                        <label className="text-sm text-slate-300">Event type</label>
                        <select value={basic.event_type} onChange={e=>setBasic(v=>({...v, event_type:e.target.value}))} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400">
                          <option>Secret Santa</option>
                          <option>Wishlist</option>
                          <option>Birthday</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-300">Exchange date</label>
                        <input type="date" value={basic.date} onChange={e=>setBasic(v=>({...v, date:e.target.value}))} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
                      </div>
                      <div>
                        <label className="text-sm text-slate-300">Budget</label>
                        <input type="number" min="0" step="1" value={basic.budget} onChange={e=>setBasic(v=>({...v, budget:e.target.value}))} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400" placeholder="$25"/>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} exit={{opacity:0, x: -20}} className="grid gap-4">
                    <div className="flex gap-2">
                      <input type="email" placeholder="name@example.com" onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); addParticipant(e.currentTarget.value); e.currentTarget.value=''} }} className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
                      <button onClick={()=>{ const el = document.querySelector('#bulk-add'); el?.focus(); }} className="px-3 rounded-lg bg-white/10 hover:bg-white/15">Add multiple</button>
                    </div>
                    <div className="rounded-xl border border-white/10 p-3 max-h-40 overflow-auto">
                      {participants.length === 0 ? (
                        <p className="text-sm text-slate-400">No participants yet.</p>
                      ) : (
                        <ul className="grid gap-1">
                          {participants.map(p => (
                            <li key={p} className="flex items-center justify-between text-sm text-slate-200">
                              <span>{p}</span>
                              <button onClick={()=>removeParticipant(p)} className="text-red-300 hover:text-red-200">Remove</button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-slate-300">Bulk add (paste comma or line-separated emails)</label>
                      <textarea id="bulk-add" rows={3} value={bulk} onChange={e=>setBulk(e.target.value)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400" placeholder="alice@example.com, bob@example.com"/>
                      <div className="mt-2 text-right">
                        <button onClick={addBulk} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm">Add</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} exit={{opacity:0, x: -20}} className="grid gap-4">
                    <label className="inline-flex items-center gap-3 text-slate-200">
                      <input type="checkbox" checked={rules.allow_wishlists} onChange={e=>setRules(v=>({...v, allow_wishlists: e.target.checked}))} />
                      Allow wishlists
                    </label>
                    <label className="inline-flex items-center gap-3 text-slate-200">
                      <input type="checkbox" checked={rules.collect_addresses} onChange={e=>setRules(v=>({...v, collect_addresses: e.target.checked}))} />
                      Collect shipping addresses
                    </label>
                    <div>
                      <label className="text-sm text-slate-300">Custom message</label>
                      <textarea rows={3} value={rules.custom_message} onChange={e=>setRules(v=>({...v, custom_message: e.target.value}))} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400" placeholder="Welcome to our exchange!"/>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{opacity:0, x: 20}} animate={{opacity:1, x: 0}} exit={{opacity:0, x: -20}} className="grid gap-4 text-sm">
                    <div className="rounded-xl border border-white/10 p-4">
                      <div className="font-semibold text-white">{basic.name}</div>
                      <div className="text-slate-300">{basic.event_type} • {basic.date} • {basic.budget ? `$${basic.budget}` : 'No budget set'}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4">
                      <div className="font-semibold text-white">Participants ({participants.length})</div>
                      <div className="text-slate-300 mt-2 grid gap-1">
                        {participants.length === 0 ? 'No participants added' : participants.map(p=> <div key={p}>{p}</div>)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4">
                      <div className="font-semibold text-white">Rules</div>
                      <div className="text-slate-300 mt-2">
                        <div>Wishlists: {rules.allow_wishlists ? 'Allowed' : 'Disabled'}</div>
                        <div>Collect addresses: {rules.collect_addresses ? 'Yes' : 'No'}</div>
                        <div>Message: {rules.custom_message || '—'}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && <p className="text-sm text-red-300 mt-3">{error}</p>}

            <div className="mt-6 flex items-center justify-between">
              <button disabled={step===1 || loading} onClick={()=>setStep(s=>Math.max(1, s-1))} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-50">Back</button>
              {step < 4 ? (
                <button disabled={!canNext || loading} onClick={()=>setStep(s=>Math.min(4, s+1))} className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-500/90 text-white disabled:opacity-50 transition">Next</button>
              ) : (
                <button disabled={loading} onClick={create} className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-500/90 text-white transition">{loading ? 'Creating...' : 'Create Event'}</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
