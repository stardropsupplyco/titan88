import React, { useState, useEffect } from 'react'
import { Plus, Briefcase, Trash2, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'

const STATUS_COLORS = {
  active: 'text-success bg-success/10 border-success/30',
  pending: 'text-warning bg-warning/10 border-warning/30',
  completed: 'text-concrete bg-slate border-border',
  overdue: 'text-danger bg-danger/10 border-danger/30',
}

export default function Jobs({ user }) {
  const [jobs, setJobs] = useState([])
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [budget, setBudget] = useState('')
  const [status, setStatus] = useState('pending')

  useEffect(() => { loadJobs() }, [])

  const loadJobs = async () => {
    const { data } = await supabase.from('t88_jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
  }

  const add = async () => {
    if (!name.trim()) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_jobs').insert({ user_id: profile?.id, name, address, budget: Number(budget) || 0, status })
    setName(''); setAddress(''); setBudget('')
    loadJobs()
  }

  const remove = async (id) => {
    await supabase.from('t88_jobs').delete().eq('id', id)
    loadJobs()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">JOBS</h1>
        <p className="text-concrete text-sm mt-1">{jobs.length} jobs tracked</p>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">New Job</div>
        <input className="input mb-2" placeholder="Job name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input mb-2" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <input className="input" placeholder="Budget ($)" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
          <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Job
        </button>
      </div>

      <div className="space-y-2">
        {jobs.length === 0 && <div className="text-center text-muted text-sm py-8">No jobs yet. Add one above.</div>}
        {jobs.map(job => (
          <div key={job.id} className="card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Briefcase size={16} className="text-orange mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-bright">{job.name}</div>
                  {job.address && (
                    <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
                      <MapPin size={10} /> {job.address}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_COLORS[job.status]}`}>{job.status}</span>
                    <span className="text-xs text-concrete font-mono">${Number(job.budget).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => remove(job.id)} className="text-muted hover:text-danger transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
