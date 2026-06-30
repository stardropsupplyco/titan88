import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HardHat, LayoutDashboard, Briefcase, DollarSign, Users, Calendar, FileText, UserCircle, Receipt, Menu, X, Crown } from 'lucide-react'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/budget', icon: DollarSign, label: 'Budget' },
  { to: '/crew', icon: Users, label: 'Crew' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/clients', icon: UserCircle, label: 'Clients' },
  { to: '/invoices', icon: Receipt, label: 'Invoices' },
]

export default function Layout({ children, user, plan }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-charcoal flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-steel">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-orange flex items-center justify-center">
            <HardHat size={14} className="text-white" />
          </div>
          <span className="font-display text-bright text-sm">TITAN<span className="text-orange">88</span></span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-bright">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside className={`${open ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-56 bg-steel border-b md:border-b-0 md:border-r border-border md:min-h-screen z-50`}>
        <div className="hidden md:flex items-center gap-2 px-5 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center">
            <HardHat size={16} className="text-white" />
          </div>
          <span className="font-display text-bright">TITAN<span className="text-orange">88</span></span>
        </div>

        <div className="px-5 py-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plan === 'pro' ? 'bg-orange text-white' : 'bg-slate text-muted border border-border'}`}>
            {plan === 'pro' ? '⚡ Pro' : 'Free Plan'}
          </span>
        </div>

        <nav className="flex-1 px-3 pb-4">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-colors ${isActive ? 'bg-slate text-orange border border-border' : 'text-concrete hover:text-bright hover:bg-slate'}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-border">
          <div className="text-xs text-muted">Signed in as</div>
          <div className="text-sm text-concrete truncate">{user?.email}</div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
