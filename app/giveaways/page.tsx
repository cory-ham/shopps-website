'use client'
import SiteNav from '../components/SiteNav'

/* ─────────────────────────────────────────────────────────────────────────────
   /giveaways — The Prize Board
   Edit PRIZES to update prizes, status, and attached cards.
──────────────────────────────────────────────────────────────────────────────── */

type PrizeStatus = 'available' | 'claimed'

interface Prize {
  id: string
  tag: string
  title: string
  subtitle?: string
  description: string
  attached: string
  status: PrizeStatus
  puller?: string
  pulledDate?: string
  featured?: boolean
  cardImage?: string
}

const PRIZES: Prize[] = [
  {
    id: 'courtside-1',
    tag: 'THE BIG ONE · STILL OUT THERE',
    title: 'COURTSIDE SEATS',
    subtitle: 'OKC THUNDER',
    description: 'Pull the Rank #1 chase card and take two courtside seats at a marquee game — flights and hotel covered. The single biggest prize in Series One, and it\'s still in a pack somewhere.',
    attached: '1/1 CHASE · RANK #1',
    status: 'available',
    featured: true,
    cardImage: '/slabs/slab-p08-gold.png',
  },
  {
    id: 'dinner-top10',
    tag: 'STILL OUT THERE',
    title: 'DINNER WITH',
    subtitle: 'THE TOP 10',
    description: 'A seat at a private dinner with ten of the biggest names in the set. One card gets you in the room.',
    attached: '1/1 CHASE · RANK #7',
    status: 'available',
  },
  {
    id: 'ad-budget',
    tag: 'STILL OUT THERE',
    title: '$5,000.00 USD',
    subtitle: 'AD BUDGET',
    description: 'A funded ad account boost for your brand, plus a working session with a Top 100 media buyer.',
    attached: 'GOLD FOIL REDEMPTION',
    status: 'available',
  },
  {
    id: 'gift-card',
    tag: 'STILL OUT THERE',
    title: '$500.00 USD',
    subtitle: 'GIFT CARD',
    description: 'A $500 gift card redeemable at select partner brands.',
    attached: 'SILVER FOIL REDEMPTION',
    status: 'available',
  },
  {
    id: 'courtside-2',
    tag: 'STILL OUT THERE',
    title: 'COURTSIDE SEATS',
    subtitle: 'OKC THUNDER',
    description: 'Pull the Rank #1 chase card and take two courtside seats at a marquee game — flights and hotel covered.',
    attached: '1/1 CHASE · RANK #1',
    status: 'available',
  },
  {
    id: 'signed-set',
    tag: 'STILL OUT THERE',
    title: 'SIGNED SET BOX',
    subtitle: undefined,
    description: 'A full signed Series One box set — every card, signed.',
    attached: 'CHASE · RANK #3',
    status: 'available',
  },
]

const STATS = [
  { label: 'PACKS LEFT',      value: '6/10' },
  { label: 'ALREADY CLAIMED', value: '4'    },
  { label: 'TOTAL VALUE',     value: '$100K+' },
]

const STEPS = [
  {
    num: '01',
    title: 'PULL THE CARD',
    body: 'Chase cards and redemption foils are marked on the card face. If you\'re holding one, you\'ve won.',
  },
  {
    num: '02',
    title: 'VERIFY IT',
    body: 'Snap the card and its serial, submit through the claim form, and the committee verifies within 48 hours.',
  },
  {
    num: '03',
    title: 'CLAIM YOUR PRIZE',
    body: 'Once verified, we coordinate the prize directly with you. Claims stay open for 90 days after pull.',
  },
]

const featured = PRIZES.find(p => p.featured)!
const grid     = PRIZES  // all 6 in the grid

export default function GiveawaysPage() {
  return (
    <>
      <SiteNav />

      {/* ── Page header ── */}
      <div className="prizeboard-header">
        <p className="section-eyebrow" style={{ marginBottom: '10px' }}>$100K+ IN GIVEAWAYS</p>
        <h1 className="prizeboard-h1">THE PRIZE BOARD</h1>
        <p className="prizeboard-desc">
          Every chase card has a real prize attached. Grayed out means someone already
          pulled it — the rest are still in packs, waiting.
        </p>
        <div className="prizeboard-stats">
          {STATS.map(s => (
            <span key={s.label} className="prizeboard-stat">
              {s.value} <span className="prizeboard-stat-label">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="section-inner prizeboard-inner">

        {/* Featured hero prize */}
        <div className="prize-hero">
          <div className="prize-hero-text">
            <p className="prize-tag prize-tag--available">{featured.tag}</p>
            <h2 className="prize-hero-title">
              {featured.title}
              {featured.subtitle && <><br />{featured.subtitle}</>}
            </h2>
            <p className="prize-hero-desc">{featured.description}</p>
            <a href="#how" className="btn-teal prize-hero-btn">
              HOW TO GET A PACK
            </a>
          </div>
          {featured.cardImage && (
            <div className="prize-hero-card">
              <img src={featured.cardImage} alt="Chase card" draggable={false} />
            </div>
          )}
        </div>

        {/* Prize grid */}
        <h2 className="section-heading" style={{ marginBottom: '20px' }}>EVERY PRIZE IN THE SERIES</h2>
        <div className="prize-grid">
          {grid.map(prize => (
            <div
              key={prize.id}
              className={`prize-card${prize.status === 'claimed' ? ' prize-card--claimed' : ''}`}
            >
              <p className={`prize-tag${prize.status === 'claimed' ? ' prize-tag--claimed' : prize.tag.startsWith('1 OF 1') || prize.tag.startsWith('THE BIG ONE') ? ' prize-tag--one-of-one' : ' prize-tag--available'}`}>
                {prize.tag}
              </p>
              <h3 className="prize-card-title">
                {prize.title}
                {prize.subtitle && <><br /><span>{prize.subtitle}</span></>}
              </h3>
              <p className="prize-card-desc">{prize.description}</p>
              <p className="prize-attached">ATTACHED TO {prize.attached}</p>

              {prize.status === 'claimed' && (
                <div className="pulled-overlay">
                  <div className="pulled-stamp">PULLED</div>
                  {prize.puller && (
                    <p className="pulled-by">Pulled by {prize.puller} · {prize.pulledDate}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── How claiming works — reuses site's howto styles ── */}
      <section className="howto-section" id="how" style={{ background: 'var(--bg)', padding: '5vw 0 2vw', scrollMarginTop: '60px' }}>
        <div className="section-inner">
          <p className="section-eyebrow">PULLED A WINNER?</p>
          <h2 className="section-heading">HOW CLAIMING WORKS</h2>
          <div className="howto-steps howto-steps--3col">
            {STEPS.map(step => (
              <div key={step.num} className="howto-step">
                <div className="howto-num">{step.num}</div>
                <h4 className="howto-title">{step.title}</h4>
                <p className="howto-body">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="prize-disclaimer">
            All prize values are placeholder pending final sponsor confirmation. No purchase necessary — packs are free and distributed only through official SHOPPS channels. Full rules published before launch.
          </p>
        </div>
      </section>

      {/* ── SPONSOR BAR ── */}
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
      <section className="cta-section" style={{ paddingTop: '4vw' }}>
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">
            734 Packs Left.<br />Zero for Sale.
          </h2>
          <p className="cta-body">
            Six chase cards are still out there — including{' '}
            <span style={{ color: 'var(--teal)' }}>courtside seats</span>.
            Know where to look.
          </p>
          <a href="/how-it-works" className="btn-cta-outline" style={{display:'inline-block'}}>HOW TO GET A PACK</a>
        </div>
      </section>

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">© 2026 SHOPPS. All rights reserved.</p>
      </footer>
    </>
  )
}
