import React, { useState } from 'react'
import { HardHat, Check, X } from 'lucide-react'

const STRIPE_PK = 'pk_live_51TciLK1GzCx7BlHpGTn4fa4TQfdyHRZ4scfVBV1gDZHC5384dKjdHunBdAoneJk9HxVIVHOvD0swN6yX0xiS7XOA00tP0L1mAr'

function loadStripe(pk) {
  return new Promise((resolve, reject) => {
    if (window.Stripe) return resolve(window.Stripe(pk))
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.onload = () => resolve(window.Stripe(pk))
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function UpgradeModal({ onClose }) {
  const [loading, setLoading] = useState(false)

  const checkout = async () => {
    setLoading(true)
    try {
      // NOTE: Titan88 Pro price needs to be created in Stripe and price ID added here
      alert('Stripe price ID needed for Titan88 Pro — let Claude know once created in Stripe.')
    } catch (e) {
      alert('Checkout failed.')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-steel border border-border rounded-2xl w-full max-w-sm">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="font-display text-bright">UPGRADE TO PRO</span>
          <button onClick={onClose} className="text-muted hover:text-bright"><X size={20} /></button>
        </div>
        <div className="p-5">
          <div className="text-3xl font-bold font-mono text-orange mb-4">$29<span className="text-sm text-muted">/mo</span></div>
          <button onClick={checkout} disabled={loading} className="btn-primary w-full">
            {loading ? 'Redirecting...' : 'Upgrade Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
