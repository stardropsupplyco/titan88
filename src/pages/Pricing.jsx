import React, { useState } from 'react'
import { Check, HardHat } from 'lucide-react'
import UpgradeModal from '../components/UpgradeModal'

export default function Pricing({ plan }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl text-bright">PRICING</h1>
        <p className="text-muted text-sm mt-1">Simple plans for every crew size</p>
      </div>
      <div className="card border-orange/50 bg-orange/5 max-w-sm mx-auto">
        <div className="text-3xl font-bold font-mono text-orange mb-4">$29<span className="text-sm text-muted">/mo</span></div>
        <div className="space-y-2 mb-5">
          {['Unlimited jobs', 'Advanced reporting', 'Unlimited crew', 'Priority support'].map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-concrete">
              <Check size={12} className="text-orange" /> {f}
            </div>
          ))}
        </div>
        {plan === 'free' ? (
          <button onClick={() => setShowModal(true)} className="btn-primary w-full">Upgrade to Pro</button>
        ) : (
          <div className="text-center text-sm text-orange">You're on Pro ✓</div>
        )}
      </div>
      {showModal && <UpgradeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
