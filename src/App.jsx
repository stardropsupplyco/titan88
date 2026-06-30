import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Budget from './pages/Budget'
import Crew from './pages/Crew'
import Schedule from './pages/Schedule'
import Documents from './pages/Documents'
import Clients from './pages/Clients'
import Invoices from './pages/Invoices'
import Pricing from './pages/Pricing'

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.email)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.email)
        setShowAuth(false)
      } else {
        setUser(null); setProfile(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (email) => {
    const { data } = await supabase.from('t88_profiles').select('*').eq('email', email).single()
    if (data) setProfile(data)
    else {
      const { data: np } = await supabase.from('t88_profiles').insert({ email, plan: 'free' }).select().single()
      setProfile(np)
    }
  }

  const plan = profile?.plan || 'free'

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  if (showAuth) return <Auth onAuth={(u, p) => { setUser(u); setProfile(p); setShowAuth(false) }} />
  if (!user) return <Landing onEnter={() => setShowAuth(true)} />

  return (
    <BrowserRouter>
      <Layout user={user} plan={plan}>
        <Routes>
          <Route path="/" element={<Dashboard plan={plan} />} />
          <Route path="/jobs" element={<Jobs user={user} />} />
          <Route path="/budget" element={<Budget user={user} />} />
          <Route path="/crew" element={<Crew user={user} />} />
          <Route path="/schedule" element={<Schedule user={user} />} />
          <Route path="/documents" element={<Documents user={user} />} />
          <Route path="/clients" element={<Clients user={user} />} />
          <Route path="/invoices" element={<Invoices user={user} />} />
          <Route path="/pricing" element={<Pricing plan={plan} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
