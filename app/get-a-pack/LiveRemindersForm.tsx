'use client'
import { useState } from 'react'

export default function LiveRemindersForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/5507026/a3670688-2592-4f58-bdfb-0a78a2b0eb42',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
            context: { pageUri: 'shoppscards.com/get-a-pack', pageName: 'SHOPPS Pack Drop' },
          }),
        }
      )
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return (
    <div className="live-email-bar">
      <p style={{ color: 'var(--teal)', fontFamily: 'var(--font-antonio)', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        ✓ You&apos;re in — we&apos;ll remind you before every break.
      </p>
    </div>
  )

  return (
    <form onSubmit={submit} className="live-email-bar">
      <input className="live-email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com – never miss a break" required autoComplete="email" />
      <button type="submit" className="live-email-btn" disabled={status === 'loading'}>
        {status === 'loading' ? 'SIGNING UP…' : status === 'error' ? 'TRY AGAIN' : 'GET REMINDERS'}
      </button>
    </form>
  )
}
