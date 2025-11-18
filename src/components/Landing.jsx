import { motion } from 'framer-motion'
import { ArrowRight, Gift, ShieldCheck, Zap } from 'lucide-react'

export default function Landing({ onOpenAuth }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(800px_circle_at_20%_10%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(700px_circle_at_80%_20%,rgba(34,197,94,0.12),transparent_35%)]"/>
      <header className="relative z-10">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 grid place-items-center shadow-lg shadow-blue-500/20">
              <Gift className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">GiftFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-200">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#how" className="hover:text-white">How it works</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onOpenAuth} className="px-4 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/15 border border-white/10">Log in</button>
            <a href="#get-started" onClick={(e)=>{e.preventDefault(); onOpenAuth?.();}} className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-slate-900 font-semibold shadow-md shadow-blue-500/30 hover:opacity-95">Get started</a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Make gift exchanges effortless with smart workflows
              </motion.h1>
              <p className="mt-6 text-lg text-slate-200 max-w-2xl">
                Plan, invite, match, and remind — all in one place. GiftFlow automates the busywork so you can focus on the fun.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#get-started" onClick={(e)=>{e.preventDefault(); onOpenAuth?.();}} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-slate-900 font-semibold px-5 py-3 shadow-lg shadow-blue-500/30 hover:opacity-95">
                  Start free <ArrowRight className="h-4 w-4"/>
                </a>
                <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3">
                  See features
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-300"/> Trusted & secure</div>
                <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-blue-300"/> Automation-ready</div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-teal-400/20 blur-2xl rounded-3xl"/>
                <div className="relative bg-slate-800/60 border border-white/10 rounded-3xl p-5 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {["Create Event","Invite","Match","Remind"].map((t,i)=> (
                      <div key={i} className="rounded-2xl bg-slate-900/60 border border-white/10 p-4">
                        <p className="text-slate-200 font-medium">{t}</p>
                        <p className="text-slate-400 text-sm mt-1">Automated via workflows</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-teal-400/10 border border-white/10 p-4">
                    <p className="text-slate-200 text-sm">Connect to n8n to power fully automated gift exchanges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="text-2xl font-semibold">Designed for smooth coordination</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Simple setup', desc: 'Create an event in under a minute with smart defaults.' },
              { title: 'Smart matching', desc: 'Fair, constraint-aware matching for Secret Santa.' },
              { title: 'Reminders', desc: 'Automatic emails and nudges so no one forgets.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-slate-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 p-8">
            <h2 className="text-2xl font-semibold">Simple, transparent pricing</h2>
            <p className="text-slate-300 mt-2">Free to start. Pro adds advanced automation.</p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h3 className="font-semibold">Free</h3>
                <p className="text-slate-300 text-sm mt-1">Plan one event, invite up to 10 participants.</p>
                <p className="mt-4 text-3xl font-bold">$0</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h3 className="font-semibold">Pro</h3>
                <p className="text-slate-300 text-sm mt-1">Unlimited events, advanced matching and automations.</p>
                <p className="mt-4 text-3xl font-bold">$12<span className="text-base font-normal text-slate-300">/mo</span></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-300 text-sm">
          <p>© {new Date().getFullYear()} GiftFlow</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
