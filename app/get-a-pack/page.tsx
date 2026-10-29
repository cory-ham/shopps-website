'use client'
import SiteNav from '../components/SiteNav'
import { useState } from 'react'

function PackSignupForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return (
    <p className="gap-signup-confirm">
      ✓ You&apos;re in. We&apos;ll let you know the moment packs drop.
    </p>
  )

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', gap: '10px', flexWrap: 'nowrap', alignItems: 'center' }}>
      <button type="submit" className="btn-teal" disabled={status === 'loading'} style={{ flexShrink: 0 }}>
        {status === 'loading' ? 'SIGNING UP…' : "DON'T MISS THE NEXT DROP"}
      </button>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="pack-drop-input"
      />
      {status === 'error' && <p style={{ width: '100%', color: '#e55', fontSize: '13px', marginTop: '6px' }}>Something went wrong. Try again.</p>}
    </form>
  )
}

const CHANNELS = [
  { abbr: 'LB', title: 'LIVE BREAKS',    body: 'The action happens live. Tune in to exclusive pack openings, chase rare pulls, and enter for your chance to win.' },
  { abbr: 'PD', title: 'PLAYER DROPS',   body: 'Your favorite leaders have packs to give away, too. Follow the featured players on X and LinkedIn for surprise drops and exclusive giveaways.' },
  { abbr: 'PP', title: 'PARTNER PROMOS', el: <>Our partners are getting in on the action. Look out for exclusive giveaways from <strong>FulFil</strong> and <strong>Omnisend</strong>, by following them and a chance to score a pack.</> },
  { abbr: 'CM', title: 'COMMUNITY',      body: "The chase doesn't stop when the stream ends. Join the player challenges, share your pulls, and even consider offering a trade of your own!" },
]

const BLOCK_COLORS = ['#0d0f13', '#0a1e1e', '#0d0f13', '#0a1e1e']

export default function GetAPackPage() {
  return (
    <>
      <SiteNav />

      {/* ── 1. Hero: YOU CAN'T BUY ONE ── */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="gap-hero">
          <div className="gap-hero-text">
            <p className="section-eyebrow">1,000 PACKS. ZERO FOR SALE.</p>
            <h1 className="gap-h1">
              You Can&apos;t Buy One.<br />You Have to Win One.
            </h1>
            <p className="section-body" style={{ marginBottom: '0' }}>
              Only 1,000 packs exist.<br />From live breaks and player giveaways to surprise drops, every pack is a chance to pull greatness. The chase is on. Don&apos;t miss your shot.
            </p>
            <PackSignupForm />
          </div>
          <div className="gap-hero-packs">
            <img src="/shopps-packs-fan.png" alt="SHOPPS Packs" draggable={false} />
          </div>
        </div>
      </div>

      {/* ── 2. WHERE PACKS DROP — alternating block colors ── */}
      <section style={{ padding: 'max(5vw, 80px) 0 0' }}>
        <div className="section-inner" style={{ marginBottom: '2.5vw' }}>
          <p className="section-eyebrow" style={{ marginBottom: '10px' }}>KNOW WHERE TO LOOK</p>
          <h2 className="section-heading">WHERE PACKS DROP</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CHANNELS.map((ch, i) => (
            <div
              key={ch.abbr}
              style={{
                background: BLOCK_COLORS[i],
                padding: '3.5vw max(24px, calc((100vw - 1200px) / 2 + 24px))',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '3vw',
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ width: '56px', flexShrink: 0, paddingTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-antonio)', fontSize: '13px', fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.1em' }}>{ch.abbr}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h4 className="prize-card-title" style={{ marginBottom: '10px' }}>{ch.title}</h4>
                <p className="prize-card-desc">{ch.el ?? ch.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Live Schedule ── */}
      <section className="live-section" style={{ background: '#13161f', padding: '4vw 0' }}>
        <div className="section-inner">
          <p className="section-eyebrow">JOIN IN LIVE</p>
          <h2 className="section-heading">DON&apos;T MISS A LIVE BREAK</h2>
          <p className="section-body" style={{ maxWidth: '440px', marginBottom: '2.5vw' }}>
            The biggest pulls may happen live. Tune in for exclusive pack openings, surprise giveaways, and your chance to watch rare cards get pulled in real time.
          </p>
          <div className="live-events-box">
            {[
              { month: 'OCT', day: '14', title: 'Live Break #7 – Founders Night',       meta: '8:00 PM ET • Streaming IG Live & YouTube • 40 Packs on the table' },
              { month: 'OCT', day: '21', title: 'The Top 100 Show – Ep. 4',            meta: '7:30 PM ET • Guest: A Top 10 Card, revealed live' },
              { month: 'OCT', day: '28', title: 'Live Break #8 – Chase Card Special',  meta: '8:00 PM ET • A confirmed 1/1 is in tonight's stack' },
            ].map((event, i, arr) => (
              <div key={i} className={'live-event' + (i < arr.length - 1 ? ' live-event-divider' : '')}>
                <div className="live-date">
                  <span className="live-date-month">{event.month}</span>
                  <span className="live-date-day">{event.day}</span>
                </div>
                <div className="live-event-body">
                  <p className="live-title">{event.title}</p>
                  <p className="live-meta"><span className="live-dot" />{event.meta}</p>
                </div>
                <button className="btn-remind">Remind Me</button>
              </div>
            ))}
          </div>
          <div className="live-email-bar">
            <input className="live-email-input" type="email" placeholder="you@email.com – never miss a break" />
            <button className="live-email-btn">Get Reminders</button>
          </div>
        </div>
      </section>

      {/* ── 4. Prize tease CTA ── */}
      <section className="cta-section" style={{ paddingTop: '3vw' }}>
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">734 Packs Left.<br />Zero for Sale.</h2>
          <p className="cta-body">
            Six chase cards are still out there — including{' '}
            <span style={{ color: 'var(--teal)' }}>courtside seats</span>.
          </p>
          <a href="/giveaways" className="btn-cta-outline" style={{ display: 'inline-block', marginTop: '2rem' }}>
            VIEW THE PRIZE BOARD
          </a>
        </div>
      </section>

      {/* ── Sponsor bar ── */}
      <p className="sponsor-label">Special thanks to our sponsors.</p>
      <div className="ticker-wrap">
        {(['Fulfil','omnisend','Fulfil','omnisend','Fulfil','omnisend'] as const).map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
              alt={label}
              style={{ height: label === 'omnisend' ? '18px' : '20px', width: 'auto', opacity: 0.55, filter: label === 'omnisend' ? 'invert(1) brightness(2)' : 'none' }}
            />
          </div>
        ))}
      </div>

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">2026 COMMON THREAD COLLECTIVE. ALL RIGHTS RESERVED. THIS PRODUCT IS NOT ENDORSED OR AFFILIATED WITH ANY ORGANIZATION OR TEAM. PRINTED IN THE U.S.A.</p>
        <img src="/ctc-icon.png" alt="Common Thread Collective" className="footer-ctc-logo" />
      </footer>
    </>
  )
}
