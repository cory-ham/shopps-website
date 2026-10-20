'use client'
import SiteNav from '../components/SiteNav'

const STEPS = [
  {
    num: '01',
    title: 'FOLLOW THE DROP',
    body: 'Packs release through specific channels – never a store, never a checkout.',
    bullets: [
      'Player socials announce surprise drops',
      'Live breaks give packs away on stream',
      'Partner promos hide packs in the wild',
    ],
  },
  {
    num: '02',
    title: 'SHOW UP LIVE',
    body: 'Live card breaks are where most packs move. Tune in and play along.',
    bullets: [
      'Breaks run weekly during the season',
      'Winners are drawn from the live chat',
      'Chase-card breaks are announced in advance',
    ],
  },
  {
    num: '03',
    title: 'RIP YOUR PACK',
    body: 'Every pack holds five cards from the Top 100.',
    bullets: [
      'Base chrome in every pack',
      'Teal Foils in roughly one of four',
      'Ten Gold 1-of-1s across the whole series',
    ],
  },
  {
    num: '04',
    title: 'PULL & WIN',
    body: 'Chase cards come with real prizes attached – verified and coordinated directly.',
    bullets: [
      'Courtside seats, private dinners, funded ad budgets',
      'Claims verified within 48 hours',
      'Post the pull – best clips get featured',
    ],
  },
]

const CHANNELS = [
  {
    abbr: 'LB',
    title: 'LIVE BREAKS',
    body: 'Weekly streams where most of the 1,000 packs are given away, live on camera.',
  },
  {
    abbr: 'PD',
    title: 'PLAYER DROPS',
    body: 'The Top 100 themselves seed packs through their own channels and events.',
  },
  {
    abbr: 'PP',
    title: 'PARTNER PROMOS',
    body: 'Fulfil and Omnisend run surprise giveaways with packs on the line.',
  },
  {
    abbr: 'CM',
    title: 'COMMUNITY',
    body: 'Contests, scavenger drops, and rewards for the best fan content.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav />

      {/* ── Hero ── */}
      <div className="hiw-hero">
        <div className="hiw-hero-text">
          <p className="section-eyebrow">FREE. NEVER SOLD.</p>
          <h1 className="hiw-h1">HOW TO GET A PACK</h1>
          <p className="hiw-desc">
            You can't buy a SHOPPS pack. Only 1,000 exist, and they're given away–through
            the players, the shows, and the community. Here's the playbook.
          </p>
        </div>
        <div className="hiw-hero-pack">
          <img src="/shopps-packs-fan.png" alt="SHOPPS Packs" draggable={false} />
        </div>
      </div>

      {/* ── 4-step grid ── */}
      <div className="section-inner">
        <div className="hiw-steps-grid">
          {STEPS.map(step => (
            <div key={step.num} className="howto-step">
              <div className="howto-num">{step.num}</div>
              <h3 className="howto-title">{step.title}</h3>
              <p className="howto-body">{step.body}</p>
              <ul className="hiw-step-bullets">
                {step.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── ALWAYS FREE bar ── */}
        <div className="hiw-always-free">
          <span className="hiw-always-free-label">ALWAYS FREE</span>
          <span className="hiw-always-free-text">
            Packs are never sold – no purchase, ever. If someone's charging you for one, it's not us.
          </span>
        </div>
      </div>

      {/* ── WHERE PACKS DROP ── */}
      <section className="hiw-where-section">
        <div className="section-inner">
          <p className="section-eyebrow" style={{ marginBottom: '10px' }}>KNOW WHERE TO LOOK</p>
          <h2 className="section-heading" style={{ marginBottom: '2.5vw' }}>WHERE PACKS DROP</h2>
          <div className="hiw-channels-grid">
            {CHANNELS.map(ch => (
              <div key={ch.abbr} className="prize-card">
                <div className="hiw-channel-badge">{ch.abbr}</div>
                <h4 className="prize-card-title">{ch.title}</h4>
                <p className="prize-card-desc">{ch.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSOR STRIP ── */}
      <p style={{textAlign:'center',fontSize:'11px',letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',margin:'3vw 0 0.75rem',fontFamily:'inherit'}}>Brought to you by</p>
      <div className="ticker-wrap">
        {(['Fulfil','omnisend','CTC','Fulfil','omnisend','CTC'] as const).map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={label === 'Fulfil' ? '/fulfil-logo.svg' : label === 'CTC' ? '/ctc-icon.png' : '/omnisend-logo.svg'}
              alt={label}
              style={{
                height: label === 'CTC' ? '42px' : label === 'omnisend' ? '18px' : '20px',
                width: 'auto',
                opacity: 0.55,
                filter: label === 'omnisend' ? 'invert(1) brightness(2)' : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">
            734 Packs Left.<br />Zero for Sale.
          </h2>
          <p className="cta-body">
            Six chase cards are still out there – including{' '}
            <span style={{ color: 'var(--teal)' }}>courtside seats</span>.
            Know where to look.
          </p>
          <button className="btn-cta-outline">HOW TO GET A PACK</button>
        </div>
      </section>

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">© 2026 SHOPPS. All rights reserved.</p>
      </footer>
    </>
  )
}
