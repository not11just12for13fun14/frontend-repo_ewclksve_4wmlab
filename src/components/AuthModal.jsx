import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { api } from '../utils/api'

export default function AuthModal({ open, onClose, onAuthed }) {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
      const res = await api(endpoint, { method: 'POST', body: data })
      onAuthed?.(res)
      onClose?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
          <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} className="w-full max-w-md rounded-2xl bg-slate-900 text-white border border-white/10 shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><X className="h-5 w-5"/></button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-sm text-slate-300">Name</label>
                  <input name="name" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
                </div>
              )}
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input name="email" type="email" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
              </div>
              <div>
                <label className="text-sm text-slate-300">Password</label>
                <input name="password" type="password" required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 ring-blue-400"/>
              </div>

              {error && <p className="text-sm text-red-300">{error}</p>}

              <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-slate-900 font-semibold px-4 py-2 disabled:opacity-60">
                {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <p className="text-sm text-slate-300 mt-4 text-center">
              {mode === 'login' ? (
                <>New here? <button onClick={()=>setMode('signup')} className="text-teal-300 hover:underline">Create an account</button></>
              ) : (
                <>Already have an account? <button onClick={()=>setMode('login')} className="text-teal-300 hover:underline">Log in</button></>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
