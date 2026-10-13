'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#07090f',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 360, padding: '0 24px' }}>
        <img src="/shopps-logo.png" alt="SHOPPS" style={{ height: 48, marginBottom: 40, objectFit: 'contain' }} />
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#12151f',
              border: error ? '1px solid #ff4444' : '1px solid #1e2433',
              borderRadius: 8,
              color: '#F5F8F8',
              fontSize: 16,
              letterSpacing: '0.1em',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: 12,
            }}
          />
          {error && (
            <p style={{ color: '#ff4444', fontSize: 13, marginBottom: 12 }}>Incorrect password</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#039F9D',
              border: 'none',
              borderRadius: 8,
              color: '#07090f',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
