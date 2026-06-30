import React, { useState, useEffect } from 'react'
import { Plus, Receipt, Trash2, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

const STATUS_COLORS = {
  draft: 'text-muted bg-slate border-border',
  sent: 'text-warning bg-warning/10 border-warning/30',
  paid: 'text-success bg-success/10 border-success/30',
}

export default function Invoices({ user }) {
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data: inv } = await supabase.from('t88_invoices').select('*, t88_clients(name)').order('created_at', { ascending: false })
    const { data: cl } = await supabase.from('t88_clients').select('id, name')
    setInvoices(inv || [])
    setClients(cl || [])
  }

  const add = async () => {
    if (!amount || !clientId) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_invoices').insert({ user_id: profile?.id, client_id: clientId, amount: Number(amount), description, status: 'draft' })
    setAmount(''); setDescription('')
    load()
  }

  const updateStatus = async (id, status) => {
    await supabase.from('t88_invoices').update({ status }).eq('id', id)
    load()
  }

  const remove = async (id) => {
    await supabase.from('t88_invoices').delete().eq('id', id)
    load()
  }

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + Number(i.amount), 0)
  const totalPending = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + Number(i.amount), 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">INVOICES</h1>
        <p className="text-concrete text-sm mt-1">{invoices.length} invoices</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card">
          <div className="label mb-1">Paid</div>
          <div className="text-xl font-bold font-mono text-success">${totalPaid.toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="label mb-1">Pending</div>
          <div className="text-xl font-bold font-mono text-warning">${totalPending.toLocaleString()}</div>
        </div>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">New Invoice</div>
        <select className="input mb-2" value={clientId} onChange={e => setClientId(e.target.value)}>
          <option value="">Select client...</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input className="input mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="input mb-3" placeholder="Amount ($)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      <div className="space-y-2">
        {invoices.length === 0 && <div className="text-center text-muted text-sm py-8">No invoices yet.</div>}
        {invoices.map(inv => (
          <div key={inv.id} className="card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Receipt size={16} className="text-orange mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-bright">{inv.t88_clients?.name || 'Unknown client'}</div>
                  <div className="text-xs text-muted mt-0.5">{inv.description}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_COLORS[inv.status]}`}>{inv.status}</span>
                    <span className="text-xs text-bright font-mono">${Number(inv.amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => remove(inv.id)} className="text-muted hover:text-danger transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            {inv.status !== 'paid' && (
              <div className="flex gap-2 mt-3">
                {inv.status === 'draft' && (
                  <button onClick={() => updateStatus(inv.id, 'sent')} className="btn-ghost text-xs flex-1">Mark Sent</button>
                )}
                <button onClick={() => updateStatus(inv.id, 'paid')} className="btn-primary text-xs flex-1 flex items-center justify-center gap-1">
                  <Check size={12} /> Mark Paid
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
