import React from 'react'
import { HardHat, Briefcase, DollarSign, Users, Calendar, FileText, Star, Check, Quote } from 'lucide-react'

const FEATURES = [
  { icon: Briefcase, title: 'Job Tracking', desc: 'Track every project from start to finish. Status, address, budget — all in one view.' },
  { icon: DollarSign, title: 'Budget Tracking', desc: 'Log expenses by category and job. Know exactly where your money is going.' },
  { icon: Users, title: 'Crew Management', desc: 'Manage your team, roles, contact info, and hourly rates in one place.' },
  { icon: Calendar, title: 'Job Scheduling', desc: 'Stay on top of deadlines and tasks across every active project.' },
  { icon: FileText, title: 'Document Storage', desc: 'Keep contracts, permits, and blueprints linked to the right job.' },
]

const TESTIMONIALS = [
  { name: 'Mike R.', handle: 'General Contractor', text: 'Finally a system that fits how I actually work. No more spreadsheets.', avatar: 'M' },
  { name: 'Carlos D.', handle: 'Renovation Co.', text: 'Tracking budgets across 5 active jobs used to be a nightmare. Now it just works.', avatar: 'C' },
]

export default function Landing({ onEnter }) {
  return (
    <div className="min-h-screen bg-charcoal">
      <nav className="bg-steel border-b border-border px-5 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center">
            <HardHat size={16} className="text-white" />
          </div>
          <span className="font-display text-bright">TITAN<span className="text-orange">88</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onEnter()} className="btn-ghost text-xs px-3 py-1.5">Sign In</button>
          <button onClick={() => onEnter()} className="btn-primary text-xs px-3 py-1.5">Start Free</button>
        </div>
      </nav>

      <section className="px-5 pt-16 pb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-3 py-1 mb-6">
          <Star size={10} className="text-orange fill-orange" />
          <span className="text-xs text-orange">AI Construction Operating System</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-bright leading-tight mb-5">
          ONE SYSTEM.<br />
          <span className="text-orange">EVERY JOB.</span>
        </h1>

        <p className="text-concrete text-lg leading-relaxed mb-8 max-w-lg mx-auto">
          Titan88 replaces spreadsheets, sticky notes, and a dozen disconnected apps with one operating system built for contractors who run the job, not just work it.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto mb-4">
          <button onClick={() => onEnter()} className="btn-primary py-3 text-base">
            Start Free — No Card Required
          </button>
        </div>
        <p className="text-xs text-muted">Free forever · Pro $29/mo · Cancel anytime</p>
      </section>

      <section className="px-5 py-16 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl text-bright mb-3">BUILT FOR THE JOB SITE</h2>
          <p className="text-muted text-base">Everything a contractor needs to run a tight operation</p>
        </div>
        <div className="grid gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:border-orange transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-orange" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-bright mb-1">{title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-steel border-y border-border px-5 py-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="font-display text-2xl text-bright mb-3">CONTRACTORS TRUST IT</h2>
        </div>
        <div className="max-w-2xl mx-auto grid gap-4">
          {TESTIMONIALS.map(({ name, handle, text, avatar }) => (
            <div key={name} className="card">
              <Quote size={16} className="text-orange mb-3" />
              <p className="text-sm text-concrete leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center">
                  <span className="text-orange font-bold text-sm">{avatar}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-bright">{name}</div>
                  <div className="text-xs text-muted">{handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 max-w-2xl mx-auto" id="pricing">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl text-bright mb-3">SIMPLE PRICING</h2>
        </div>
        <div className="grid gap-4 max-w-sm mx-auto">
          <div className="card">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-bright">FREE</h3>
              <span className="font-mono font-bold text-bright text-2xl">$0<span className="text-sm text-muted font-normal">/mo</span></span>
            </div>
            <div className="space-y-2 mb-5">
              {['3 active jobs', 'Basic budget tracking', 'Up to 5 crew members', 'Document storage'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-muted">
                  <Check size={12} className="text-muted flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
            <button onClick={() => onEnter()} className="btn-ghost w-full">Get Started Free</button>
          </div>

          <div className="card border-orange/50 bg-orange/5">
            <div className="text-xs text-orange font-bold uppercase tracking-wider mb-2">Most Popular</div>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-display text-bright">PRO</h3>
              <span className="font-mono font-bold text-orange text-2xl">$29<span className="text-sm text-muted font-normal">/mo</span></span>
            </div>
            <div className="space-y-2 mb-5">
              {['Unlimited jobs', 'Advanced budget reporting', 'Unlimited crew', 'Priority support', 'Invoice automation'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-concrete">
                  <Check size={12} className="text-orange flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
            <button onClick={() => onEnter()} className="btn-primary w-full">Upgrade to Pro</button>
          </div>
        </div>
      </section>

      <footer className="bg-steel border-t border-border px-5 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-bright text-sm">TITAN<span className="text-orange">88</span></span>
          <p className="text-xs text-muted">© 2026 Titan88 · Stardrop Supply Co.</p>
        </div>
      </footer>
    </div>
  )
}
