'use client'
export const dynamic = 'force-dynamic'
import { PACKS_REMAINING } from '../lib/pack-count'
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
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
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

export default function GetAPackPage() {
  return (
    <>
      <SiteNav />

      <div className="gap-hero" style={{ paddingTop: 'clamp(80px, 8vw, 120px)' }}>
        <div className="gap-hero-text">
          <h2 className="gap-h1">
            <span>You Can&apos;t Buy One.</span>
            <span>You Have to Win One.</span>
          </h2>
          <p className="section-body" style={{ marginBottom: '0' }}>
            <span style={{color:'var(--olive)'}}>Only 1,000 packs exist.</span><br />From live breaks and player giveaways to surprise drops, every pack is a chance to pull greatness. The chase is on. Don&apos;t miss your shot.
          </p>
        </div>
        <div className="gap-hero-packs">
          <img src="/shopps-packs-fan.png" alt="SHOPPS Packs" draggable={false} />
        </div>
      </div>


      {/* ── WHERE PACKS DROP (moved from How It Works) ── */}
      <section className="hiw-where-section" style={{ paddingTop: 'max(5vw, 80px)', paddingBottom: '4vw', background: '#13161f' }}>
        <div className="section-inner">
          <p className="section-eyebrow" style={{ marginBottom: '10px' }}>KNOW WHERE TO LOOK</p>
          <h1 className="section-heading" style={{ marginBottom: '2.5vw' }}>WHERE PACKS DROP</h1>
          <div className="hiw-channels-grid">
            {[
              { abbr: 'LB', title: 'LIVE BREAKS',    body: 'The action happens live. Tune in to exclusive pack openings, chase rare pulls, and enter for your chance to win.' },
              { abbr: 'PD', title: 'PLAYER DROPS',   body: 'Your favorite leaders have packs to give away, too. Follow the featured players on X and LinkedIn for surprise drops and exclusive giveaways.' },
              { abbr: 'PP', title: 'PARTNER PROMOS', el: <>Our partners are getting in on the action. Look out for exclusive giveaways from <strong>FulFil</strong> and <strong>Omnisend</strong>, by following them and a chance to score a pack.</> },
              { abbr: 'CM', title: 'COMMUNITY',      body: "The chase doesn't stop when the stream ends. Join the player challenges, share your pulls, and even consider offering a trade of your own!" },
            ].map(ch => (
              <div key={ch.abbr} className="prize-card">
                <h4 className="prize-card-title">{ch.title}</h4>
                <p className="prize-card-desc">{ch.el ?? ch.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Schedule ── */}
      <section className="live-section" style={{ background: 'var(--bg)', padding: '4vw 0' }}>
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
              { month: 'OCT', day: '28', title: 'Live Break #8 – Chase Card Special',  meta: '8:00 PM ET • A confirmed 1/1 is in tonight’s stack' },
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

      {/* ── Hero: packs + signup ── */}
      <div style={{ background: 'var(--bg)' }}>

      </div>

      {/* ── Prize tease CTA ── */}
      {/* ── Sponsor bar ── */}
      <p className="sponsor-label">Special thanks to our sponsors.</p>
      <div className="ticker-wrap">
        {(['Fulfil','omnisend','Fulfil','omnisend','Fulfil','omnisend'] as const).map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
              alt={label}
              style={{ height: label === 'omnisend' ? '18px' : '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ paddingTop: '3vw' }}>
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">{PACKS_REMAINING} Packs Left.<br />Zero for Sale.</h2>
          <p className="cta-body">
            Six chase cards are still out there &mdash;{' '}
            <span style={{ color: 'var(--teal)' }}>courtside seats</span>.
          </p>
          <a href="/giveaways" className="btn-cta-outline" style={{ display: 'inline-block', marginTop: '2rem' }}>
            VIEW THE PRIZE BOARD
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">2026 COMMON THREAD COLLECTIVE. ALL RIGHTS RESERVED. THIS PRODUCT IS NOT ENDORSED OR AFFILIATED WITH ANY ORGANIZATION OR TEAM. PRINTED IN THE U.S.A.</p>
        <img src="/ctc-icon.png" alt="Common Thread Collective" className="footer-ctc-logo" />
      </footer>
    </>
  )
}
