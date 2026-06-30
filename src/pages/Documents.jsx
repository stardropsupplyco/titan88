import React, { useState, useEffect } from 'react'
import { Plus, FileText, Trash2, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Documents({ user }) {
  const [docs, setDocs] = useState([])
  const [jobs, setJobs] = useState([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [jobId, setJobId] = useState('')
  const [type, setType] = useState('Contract')

  useEffect(() => { load() }, [])

  const load = async () => {
    const { data: d } = await supabase.from('t88_documents').select('*, t88_jobs(name)').order('created_at', { ascending: false })
    const { data: jb } = await supabase.from('t88_jobs').select('id, name')
    setDocs(d || [])
    setJobs(jb || [])
  }

  const add = async () => {
    if (!name.trim()) return
    const { data: profile } = await supabase.from('t88_profiles').select('id').eq('email', user.email).single()
    await supabase.from('t88_documents').insert({ user_id: profile?.id, job_id: jobId || null, name, url, type })
    setName(''); setUrl('')
    load()
  }

  const remove = async (id) => {
    await supabase.from('t88_documents').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-bright">DOCUMENTS</h1>
        <p className="text-concrete text-sm mt-1">{docs.length} documents stored</p>
      </div>

      <div className="card mb-6">
        <div className="label mb-3">Add Document</div>
        <input className="input mb-2" placeholder="Document name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input mb-2" placeholder="Link (Google Drive, Dropbox, etc.)" value={url} onChange={e => setUrl(e.target.value)} />
        <div className="grid grid-cols-2 gap-2 mb-3">
          <select className="input" value={type} onChange={e => setType(e.target.value)}>
            {['Contract', 'Permit', 'Insurance', 'Blueprint', 'Invoice', 'Other'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="input" value={jobId} onChange={e => setJobId(e.target.value)}>
            <option value="">No job linked</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
          </select>
        </div>
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Add Document
        </button>
      </div>

      <div className="space-y-2">
        {docs.length === 0 && <div className="text-center text-muted text-sm py-8">No documents added yet.</div>}
        {docs.map(d => (
          <div key={d.id} className="card flex items-start gap-3">
            <FileText size={16} className="text-orange mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-bright">{d.name}</div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                <span>{d.type}</span>
                {d.t88_jobs?.name && <span>· {d.t88_jobs.name}</span>}
              </div>
            </div>
            {d.url && (
              <a href={d.url} target="_blank" rel="noreferrer" className="text-muted hover:text-orange transition-colors">
                <ExternalLink size={14} />
              </a>
            )}
            <button onClick={() => remove(d.id)} className="text-muted hover:text-danger transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
