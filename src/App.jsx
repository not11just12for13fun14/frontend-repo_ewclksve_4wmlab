import { useState, useCallback } from 'react'
import Landing from './components/Landing'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'
import EventWizard from './components/EventWizard'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [session, setSession] = useState(()=>{
    const raw = localStorage.getItem('giftflow_session')
    return raw ? JSON.parse(raw) : null
  })
  const [bump, setBump] = useState(0) // trigger dashboard refetch after create

  const handleAuthed = (res) => {
    const s = { token: res.token, user: { name: res.name, email: res.email, id: res.userId } }
    setSession(s)
    localStorage.setItem('giftflow_session', JSON.stringify(s))
  }

  const handleCreateEvent = () => setWizardOpen(true)

  const handleEventCreated = useCallback(() => {
    setWizardOpen(false)
    // change a key to force dashboard to reload via key prop
    setBump((v)=>v+1)
  }, [])

  if (!session?.token) {
    return (
      <>
        <Landing onOpenAuth={()=>setAuthOpen(true)} />
        <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onAuthed={handleAuthed} />
      </>
    )
  }

  return (
    <>
      <Dashboard key={bump} token={session.token} user={session.user} onCreateEvent={handleCreateEvent} />
      {wizardOpen && (
        <EventWizard token={session.token} open={wizardOpen} onCreated={handleEventCreated} onClose={()=>setWizardOpen(false)} />
      )}
    </>
  )
}

export default App
