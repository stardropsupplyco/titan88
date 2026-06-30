import React, { useState, useEffect } from 'react'
import { Plus, User, Trash2, Phone, Wrench } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Crew({ user }) {
  const [crew, setCrew] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const [rate, setRate] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data } = await supabase.from('t88_crew').select('*').order('created_at', { ascending: false })
    setCrew(data || [])
  }

  const add = async () => {
    if (!name.trim()) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_crew').insert({ user_id: profile?.id, name, role, phone, hourly_rate: Number(rate) || 0 })
    setName(''); setRole(''); setPhone(''); setRate('')
    load()
  }

  const remove = async (id) => {
    await supabase.from('t88_crew').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">CREW</h1>
        <p className="text-concrete text-sm mt-1">{crew.length} team members</p>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">Add Crew Member</div>
        <input className="input mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input mb-2" placeholder="Role (e.g. Carpenter, Electrician)" value={role} onChange={e => setRole(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <input className="input" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className="input" placeholder="Hourly rate ($)" type="number" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Crew Member
        </button>
      </div>

      <div className="space-y-2">
        {crew.length === 0 && <div className="text-center text-muted text-sm py-8">No crew added yet.</div>}
        {crew.map(c => (
          <div key={c.id} className="card flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-slate flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-orange" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-bright">{c.name}</div>
              <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
                <Wrench size={10} /> {c.role || 'No role set'}
              </div>
              <div className="flex items-center gap-3 mt-1">
                {c.phone && <span className="flex items-center gap-1 text-xs text-concrete"><Phone size={10} /> {c.phone}</span>}
                {c.hourly_rate > 0 && <span className="text-xs text-orange font-mono">${c.hourly_rate}/hr</span>}
              </div>
            </div>
            <button onClick={() => remove(c.id)} className="text-muted hover:text-danger transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
