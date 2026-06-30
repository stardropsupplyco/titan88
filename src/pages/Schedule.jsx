import React, { useState, useEffect } from 'react'
import { Plus, Calendar, Trash2, CheckSquare, Square } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Schedule({ user }) {
  const [tasks, setTasks] = useState([])
  const [jobs, setJobs] = useState([])
  const [jobId, setJobId] = useState('')
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data: t } = await supabase.from('t88_schedule').select('*, t88_jobs(name)').order('due_date', { ascending: true })
    const { data: jb } = await supabase.from('t88_jobs').select('id, name')
    setTasks(t || [])
    setJobs(jb || [])
  }

  const add = async () => {
    if (!task.trim()) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_schedule').insert({ user_id: profile?.id, job_id: jobId || null, task, due_date: date || null, done: false })
    setTask(''); setDate('')
    load()
  }

  const toggle = async (id, done) => {
    await supabase.from('t88_schedule').update({ done: !done }).eq('id', id)
    load()
  }

  const remove = async (id) => {
    await supabase.from('t88_schedule').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">SCHEDULE</h1>
        <p className="text-concrete text-sm mt-1">{tasks.filter(t => !t.done).length} upcoming tasks</p>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">New Task</div>
        <input className="input mb-2" placeholder="Task description" value={task} onChange={e => setTask(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <select className="input" value={jobId} onChange={e => setJobId(e.target.value)}>
            <option value="">No job linked</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
          </select>
          <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Task
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 && <div className="text-center text-muted text-sm py-8">No tasks scheduled.</div>}
        {tasks.map(t => (
          <div key={t.id} className={`card flex items-start gap-3 ${t.done ? 'opacity-50' : ''}`}>
            <button onClick={() => toggle(t.id, t.done)} className="mt-0.5 flex-shrink-0">
              {t.done ? <CheckSquare size={18} className="text-orange" /> : <Square size={18} className="text-muted" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${t.done ? 'line-through text-muted' : 'text-bright'}`}>{t.task}</div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                {t.t88_jobs?.name && <span>{t.t88_jobs.name}</span>}
                {t.due_date && <span className="flex items-center gap-1"><Calendar size={10} /> {t.due_date}</span>}
              </div>
            </div>
            <button onClick={() => remove(t.id)} className="text-muted hover:text-danger transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
