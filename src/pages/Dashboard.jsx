import React, { useState, useEffect } from 'react'
import { Briefcase, DollarSign, Users, Clock, ArrowRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Dashboard({ plan }) {
  const [stats, setStats] = useState({ jobs: 0, budget: 0, crew: 0, overdue: 0 })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const { data: jobs } = await supabase.from('t88_jobs').select('*')
    const { data: crew } = await supabase.from('t88_crew').select('*')
    const totalBudget = jobs?.reduce((sum, j) => sum + (Number(j.budget) || 0), 0) || 0
    setStats({
      jobs: jobs?.length || 0,
      budget: totalBudget,
      crew: crew?.length || 0,
      overdue: jobs?.filter(j => j.status === 'overdue').length || 0,
    })
  }

  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const quickActions = [
    { label: 'New Job', desc: 'Start tracking a new project', to: '/jobs', icon: Briefcase },
    { label: 'Log Expense', desc: 'Add to your budget tracker', to: '/budget', icon: DollarSign },
    { label: 'Add Crew', desc: 'Manage your team', to: '/crew', icon: Users },
    { label: 'Create Invoice', desc: 'Bill a client', to: '/invoices', icon: Clock },
  ]

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs text-muted mb-1">{date}</p>
        <h1 className="font-display text-2xl text-bright">DASHBOARD</h1>
        <p className="text-concrete text-sm mt-1">Your construction command center</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Active Jobs', value: stats.jobs, color: 'text-orange' },
          { label: 'Total Budget', value: `$${stats.budget.toLocaleString()}`, color: 'text-success' },
          { label: 'Crew Members', value: stats.crew, color: 'text-bright' },
          { label: 'Overdue Items', value: stats.overdue, color: 'text-danger' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card">
            <div className="label mb-1">{label}</div>
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="label mb-3">Quick Actions</div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ label, desc, to, icon: Icon }) => (
            <Link key={label} to={to} className="card hover:border-orange transition-colors group">
              <div className="flex items-start justify-between">
                <Icon size={18} className="text-orange" />
                <ArrowRight size={14} className="text-muted group-hover:text-orange transition-colors" />
              </div>
              <div className="text-sm font-medium text-bright mt-2">{label}</div>
              <div className="text-xs text-muted mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {plan === 'free' && (
        <div className="card border-orange/30 bg-orange/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-orange">Unlock Pro</div>
              <div className="text-xs text-muted mt-0.5">Unlimited jobs, crew, and reporting — $29/mo</div>
            </div>
            <Link to="/pricing" className="btn-primary text-xs">Upgrade</Link>
          </div>
        </div>
      )}
    </div>
  )
}
