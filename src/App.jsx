import { useState } from 'react'
import Landing from './components/Landing'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'
import EventForm from './components/EventForm'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [eventOpen, setEventOpen] = useState(false)
  const [session, setSession] = useState(()=>{
    const raw = localStorage.getItem('giftflow_session')
    return raw ? JSON.parse(raw) : null
  })

  const handleAuthed = (res) => {
    const s = { token: res.token, user: { name: res.name, email: res.email, id: res.userId } }
    setSession(s)
    localStorage.setItem('giftflow_session', JSON.stringify(s))
  }

  const handleCreateEvent = () => setEventOpen(true)

  const handleEventCreated = (ev) => {
    // Optimistic UX; dashboard refetch handles actual state
    setEventOpen(false)
  }

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
      <Dashboard token={session.token} user={session.user} onCreateEvent={handleCreateEvent} />
      {eventOpen && (
        <EventForm token={session.token} onCreated={handleEventCreated} onClose={()=>setEventOpen(false)} />
      )}
    </>
  )
}

export default App
