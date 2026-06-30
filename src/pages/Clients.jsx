import React, { useState, useEffect } from 'react'
import { Plus, UserCircle, Trash2, Phone, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Clients({ user }) {
  const [clients, setClients] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data } = await supabase.from('t88_clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
  }

  const add = async () => {
    if (!name.trim()) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_clients').insert({ user_id: profile?.id, name, email, phone, notes })
    setName(''); setEmail(''); setPhone(''); setNotes('')
    load()
  }

  const remove = async (id) => {
    await supabase.from('t88_clients').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">CLIENTS</h1>
        <p className="text-concrete text-sm mt-1">{clients.length} clients</p>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">Add Client</div>
        <input className="input mb-2" placeholder="Client name" value={name} onChange={e => setName(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <input className="input mb-3" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Client
        </button>
      </div>

      <div className="space-y-2">
        {clients.length === 0 && <div className="text-center text-muted text-sm py-8">No clients yet.</div>}
        {clients.map(c => (
          <div key={c.id} className="card flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-slate flex items-center justify-center flex-shrink-0">
              <UserCircle size={18} className="text-orange" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-bright">{c.name}</div>
              <div className="flex items-center gap-3 mt-1">
                {c.email && <span className="flex items-center gap-1 text-xs text-muted"><Mail size={10} /> {c.email}</span>}
                {c.phone && <span className="flex items-center gap-1 text-xs text-muted"><Phone size={10} /> {c.phone}</span>}
              </div>
              {c.notes && <div className="text-xs text-concrete mt-1">{c.notes}</div>}
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
