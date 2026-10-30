'use client'
import { useState } from 'react'

export default function PackSignupForm() {
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
    <p className="gap-signup-confirm">✓ You&apos;re in. We&apos;ll let you know when packs drop.</p>
  )

  return (
    <form onSubmit={submit} style={{ marginTop: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required className="pack-drop-input" autoComplete="email" />
      <button type="submit" className="btn-teal" disabled={status === 'loading'} style={{ flexShrink: 0 }}>
        {status === 'loading' ? 'SIGNING UP…' : status === 'error' ? 'TRY AGAIN' : 'WIN YOUR NEXT PACK'}
      </button>
    </form>
  )
}
