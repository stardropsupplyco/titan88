import React, { useState, useEffect } from 'react'
import { Plus, DollarSign, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Budget({ user }) {
  const [expenses, setExpenses] = useState([])
  const [jobs, setJobs] = useState([])
  const [jobId, setJobId] = useState('')
  const [category, setCategory] = useState('Materials')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const { data: exp } = await supabase.from('t88_expenses').select('*, t88_jobs(name)').order('created_at', { ascending: false })
    const { data: jb } = await supabase.from('t88_jobs').select('id, name')
    setExpenses(exp || [])
    setJobs(jb || [])
  }

  const add = async () => {
    if (!amount || !jobId) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_expenses').insert({ user_id: profile?.id, job_id: jobId, category, amount: Number(amount), note })
    setAmount(''); setNote('')
    loadData()
  }

  const remove = async (id) => {
    await supabase.from('t88_expenses').delete().eq('id', id)
    loadData()
  }

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">BUDGET</h1>
        <p className="text-concrete text-sm mt-1">Track costs across every job</p>
      </div>

      <div className="card border-orange/30 bg-orange/5 mb-6">
        <div className="label mb-1">Total Tracked Expenses</div>
        <div className="text-3xl font-bold font-mono text-orange">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        <div className="text-xs text-muted mt-1">{expenses.length} entries</div>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">Log Expense</div>
        <select className="input mb-2" value={jobId} onChange={e => setJobId(e.target.value)}>
          <option value="">Select job...</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
            {['Materials', 'Labor', 'Equipment', 'Permits', 'Subcontractor', 'Other'].map(c => <option key={c}>{c}</option>)}
          </select>
          <input className="input" placeholder="Amount ($)" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <input className="input mb-3" placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Log Expense
        </button>
      </div>

      <div className="space-y-2">
        {expenses.map(e => (
          <div key={e.id} className="card flex items-center gap-3">
            <DollarSign size={16} className="text-success flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-bright">{e.category}</span>
                <span className="text-sm font-mono text-orange">${Number(e.amount).toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted mt-0.5">{e.t88_jobs?.name || 'Unknown job'}{e.note ? ` · ${e.note}` : ''}</div>
            </div>
            <button onClick={() => remove(e.id)} className="text-muted hover:text-danger transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
