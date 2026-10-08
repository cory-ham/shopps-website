'use client'

import Image from 'next/image'

/* ─────────────────────────────────────────────────────────
   SHOPPS — Full page rebuild from PSD
   Canvas: 2544 × 7286 px  |  Hero: 2544 × 887 px
   All hero children: position:absolute, no flexbox layout
   Card images: actual extracted PNGs, no CSS card designs
──────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  { label: 'Fulfil' },
  { label: 'omnisend' },
  { label: 'Fulfil' },
  { label: 'omnisend' },
  { label: 'Fulfil' },
  { label: 'omnisend' },
  { label: 'Fulfil' },
  { label: 'omnisend' },
]

const TOP100_CARDS = [
  { src: '/cards/rytis.png', name: 'Rytis Lauris' },
  { src: '/cards/marcus.png', name: 'Marcus Ahlin' },
  { src: '/cards/olivia.png', name: 'Olivia Hart' },
  { src: '/cards/samantha.png', name: 'Samantha Lee' },
  { src: '/cards/jordan.png', name: 'Jordan Mitchell' },
  { src: '/cards/michael.png', name: 'Michael Thompson' },
  { src: '/cards/extra.png', name: 'Card #7' },
  { src: '/cards/rytis-center.png', name: 'Rytis Lauris Alt' },
]

const PRIZES = [
  {
    status: 'out-there',
    badge: '1 OF 1 · STILL OUT THERE',
    name: 'Courtside Seats OKC Thunder',
    desc: 'Pull the Rank #1 chase card and take two courtside seats at a marquee game – flights and hotel covered.',
    attached: '1/1 CHASE + RANK #1',
    puller: null,
    pulledDate: null,
  },
  {
    status: 'out-there',
    badge: 'STILL OUT THERE',
    name: 'Dinner With The Top 10',
    desc: 'A seat at a private dinner with ten of the biggest names in the set. One card gets you in the room.',
    attached: '1/1 CHASE + RANK #7',
    puller: null,
    pulledDate: null,
  },
  {
    status: 'out-there',
    badge: 'STILL OUT THERE',
    name: '$5,000.00 USD Ad Budget',
    desc: 'A funded ad account boost for your brand, plus a working session with a Top 100 media buyer.',
    attached: 'GOLD FOIL REDEMPTION',
    puller: null,
    pulledDate: null,
  },
  {
    status: 'claimed',
    badge: 'CLAIMED',
    name: '$500.00 USD Gift Card',
    desc: null,
    attached: null,
    puller: 'Pulled by J. Marshall',
    pulledDate: 'SEP. 15TH',
  },
  {
    status: 'out-there',
    badge: 'STILL OUT THERE',
    name: 'Courtside Seats OKC Thunder',
    desc: 'Pull the Rank #1 chase card and take two courtside seats at a marquee game – flights and hotel covered.',
    attached: '1/1 CHASE + RANK #1',
    puller: null,
    pulledDate: null,
  },
  {
    status: 'claimed',
    badge: 'CLAIMED',
    name: 'Signed Set Box',
    desc: null,
    attached: null,
    puller: 'Pulled by K. Ross',
    pulledDate: 'SEP. 15TH',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Follow the Drop',
    body: 'Packs release through specific channels – player socials, live breaks, and partner drops. Know where to look.',
  },
  {
    num: '02',
    title: 'Show Up Live',
    body: 'Live card breaks and shows are where most packs move. Tune in, play along, win packs on stream.',
  },
  {
    num: '03',
    title: 'Rip Your Pack',
    body: 'Every pack holds cards from the Top 100 – base, foils, and if you’re lucky, one of the ten 1-of-1 chase cards.',
  },
  {
    num: '04',
    title: 'Pull & Win',
    body: 'Chase cards come with real prizes attached – courtside seats, gift cards, once-ever experiences. Post the pull.',
  },
]

const CAROUSEL_CARDS = [
  // 10 unique fronts — varied colors (green / teal / gold)
  { slab: '/slabs/slab-bart.jpg',        name: 'Bart Szaniewski'   },  // green
  { slab: '/slabs/slab-bear-teal.jpg',   name: 'Bear Handlon'      },  // teal
  { slab: '/slabs/slab-ben.jpg',         name: 'Ben Cogan'         },  // teal
  { slab: '/slabs/slab-chase.jpg',       name: 'Chase Dimond'      },  // green
  { slab: '/slabs/slab-bart-gold.jpg',   name: 'Bart Szaniewski'   },  // gold
  { slab: '/slabs/slab-matthew.jpg',     name: 'Matthew Bertulli'  },  // green
  { slab: '/slabs/slab-mike-teal.jpg',   name: 'Mike Beckham'      },  // teal
  { slab: '/slabs/slab-ezra.jpg',        name: 'Ezra Firestone'    },  // gold
  { slab: '/slabs/slab-bear-gold.jpg',   name: 'Bear Handlon'      },  // gold
  { slab: '/slabs/slab-jimmy.jpg',       name: 'Jimmy Kim'         },  // gold
  { slab: '/slabs/slab-ronak.jpg',       name: 'Ronak Shah'        },  // green
  { slab: '/slabs/slab-bart-teal.jpg',   name: 'Bart Szaniewski'   },  // teal
  { slab: '/slabs/slab-isaac.jpg',       name: 'Isaac Medeiros'    },  // green
  { slab: '/slabs/slab-mike.jpg',        name: 'Mike Beckham'      },  // green
  // Duplicated for infinite scroll
  { slab: '/slabs/slab-bart.jpg',        name: 'Bart Szaniewski'   },
  { slab: '/slabs/slab-bear-teal.jpg',   name: 'Bear Handlon'      },
  { slab: '/slabs/slab-ben.jpg',         name: 'Ben Cogan'         },
  { slab: '/slabs/slab-chase.jpg',       name: 'Chase Dimond'      },
  { slab: '/slabs/slab-bart-gold.jpg',   name: 'Bart Szaniewski'   },
  { slab: '/slabs/slab-matthew.jpg',     name: 'Matthew Bertulli'  },
  { slab: '/slabs/slab-mike-teal.jpg',   name: 'Mike Beckham'      },
  { slab: '/slabs/slab-ezra.jpg',        name: 'Ezra Firestone'    },
  { slab: '/slabs/slab-bear-gold.jpg',   name: 'Bear Handlon'      },
  { slab: '/slabs/slab-jimmy.jpg',       name: 'Jimmy Kim'         },
  { slab: '/slabs/slab-ronak.jpg',       name: 'Ronak Shah'        },
  { slab: '/slabs/slab-bart-teal.jpg',   name: 'Bart Szaniewski'   },
  { slab: '/slabs/slab-isaac.jpg',       name: 'Isaac Medeiros'    },
  { slab: '/slabs/slab-mike.jpg',        name: 'Mike Beckham'      },
]

const EVENTS = [
  {
    month: 'SEP',
    day: '04',
    title: 'Live Break #7 – Founders Night',
    meta: '8:00 PM ET • Streaming IG Live & YouTube',
  },
  {
    month: 'SEP',
    day: '14',
    title: 'The Top 100 Show – Ep. 4',
    meta: '7:30 PM ET • Guest: A Top 10 Card, revealed live',
  },
  {
    month: 'SEP',
    day: '23',
    title: 'Live Break #8 – Chase Card Special',
    meta: '8:00 PM ET • A confirmed 1/1 is in the pool',
  },
]

export default function Home() {
  return (
    <>
      {/* ──────────────────── NAV ──────────────────── */}
      <nav className="site-nav">
        <div className="nav-left">
          <a href="#" className="nav-link">The Set</a>
          <a href="#" className="nav-link">Giveaways</a>
          <a href="#" className="nav-link">Pulls</a>
        </div>

        {/* Center logo — absolute within nav */}
        <div className="nav-logo-wrap">
          <img src="/shopps-logo-v2.png" alt="SHOPPS" className="nav-logo" />
        </div>

        <div className="nav-right">
          <a href="#" className="nav-link">How it works</a>
          <a href="#" className="nav-link">Nominate</a>
          <a href="#" className="nav-live">LIVE</a>
        </div>
      </nav>

      {/* ──────────────────── HERO ─────────────────── */}
      <section className="hero">
        <div className="hero-glow" />

        {/* Crosshairs */}
        <span className="crosshair" style={{ left: '8%',  top: '70%' }}>+</span>
        <span className="crosshair" style={{ left: '23%', top: '25%' }}>+</span>
        <span className="crosshair" style={{ right: '14%', top: '30%' }}>+</span>
        <span className="crosshair" style={{ right: '8%',  top: '65%' }}>+</span>

        {/* SCROLLING CARD CAROUSEL — pre-rendered slab images */}
        <div className="card-carousel">
          <div className="card-carousel-track">
            {CAROUSEL_CARDS.map((card, i) => (
              <div key={i} className="card-sleeve-img-wrap">
                <img src={card.slab} alt={card.name} className="card-slab-img" draggable={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-fade-left" />
        {/* Right fade mask */}
        <div className="carousel-fade-right" />

        {/* TEXT BLOCK — sits on top of carousel */}
        <div className="hero-text">
          <h1 className="hero-headline">The Top 100<br />In Ecommerce</h1>
          <p className="hero-collect-label">Collect them all</p>
          <p className="hero-body">
            Top 100 operators, founders, and legends of the industry – immortalized in a collector card series. Packs are 100% free but you can&apos;t buy them. You have to find them.
          </p>
          <div className="hero-buttons">
            <button className="btn-teal">How to Get a Pack</button>
            <button className="btn-outline">See the set</button>
          </div>
          <div className="pack-counter">
            <div className="pack-label">
              <span className="pack-label-dot" />
              Live Pack Count
            </div>
            <div className="pack-digits">
              <span className="pack-digit">7</span>
              <span className="pack-digit">3</span>
              <span className="pack-digit">4</span>
            </div>
            <p className="pack-of">of 1000 left</p>
          </div>
        </div>

      </section>

      {/* ── SPONSOR STRIP — static ── */}
      <div className="ticker-wrap">
        {TICKER_ITEMS.map((item, i) => (
          <img
            key={i}
            src={item.label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
            alt={item.label}
            style={{
              height: '20px',
              width: 'auto',
              display: 'block',
              opacity: 0.55,
              filter: item.label === 'omnisend' ? 'invert(1) brightness(2)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ──────────────────── WHAT IS SHOPPS? ──────────────────── */}
      {/* PSD: Layer 13 video area (929,1057,1618,1444), text (1101,1513,1446,1563) */}
      <section className="shopps-section">
        {/* Responsive card grid background — auto-fill so no cutoffs */}
        <div className="shopps-card-grid" aria-hidden="true">
          {Array.from({length: 80}).map((_, i) => (
            <div key={i} className="shopps-bg-card" />
          ))}
        </div>

        <div className="shopps-video-wrap">
          <div className="shopps-play-btn">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.5" strokeOpacity="0.7"/>
              <polygon points="21,17 37,26 21,35" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
        </div>

        <h2 className="shopps-heading">What is SHOPPS?</h2>
        <p className="shopps-body">
          Top 100 operators, founders, and legends of the industry &mdash; immortalized
          in a collector card series. Packs are 100% free but you can&apos;t buy them.
          You have to find them.
        </p>
      </section>

      {/* ──────────────────── VALUE PROPS ──────────────────── */}
      {/* PSD Layer 6 bg: (0,1783,2544,2299). 3 icons: Layer 14 variants */}
      <div className="value-section">
        <div className="value-grid" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6.5%' }}>

          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#039F9D" strokeWidth="1.5" />
                <path d="M10 16 L14 20 L22 12" stroke="#039F9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="value-label">Always Free</p>
            <p className="value-title">Value Prop 1</p>
            <p className="value-body">
              Placeholder copy to explain what the value is — why this thing matters to the collector.
            </p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M6 26 L16 6 L26 26" stroke="#039F9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20 L23 20" stroke="#039F9D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="value-label">Real Prizes</p>
            <p className="value-title">Value Prop 2</p>
            <p className="value-body">
              Placeholder copy to explain what the value is — why this thing matters to the collector.
            </p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="18" rx="2" stroke="#039F9D" strokeWidth="1.5" />
                <path d="M4 13 L28 13" stroke="#039F9D" strokeWidth="1.5" />
                <circle cx="16" cy="20" r="3" stroke="#039F9D" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="value-label">100 Icons</p>
            <p className="value-title">Value Prop 3</p>
            <p className="value-body">
              Placeholder copy to explain what the value is — why this thing matters to the collector.
            </p>
          </div>

        </div>
      </div>

      {/* ──────────────────── THE TOP 100 ──────────────────── */}
      <section className="top100-section">
        <div className="section-inner">
          <div className="top100-header">
            <div>
              <p className="section-eyebrow">2026 Edition</p>
              <h2 className="section-heading">The Top 100</h2>
              <p className="section-body">
                Every card in the set — operators, founders, and builders shaping eCommerce right now.
              </p>
            </div>
            <button className="btn-outline-sm">View All 100</button>
          </div>

          {/* 4×2 grid of front cards — no slab, no case */}
          <div className="top100-card-grid">
            {[
              '/cards/card-033.jpg',  // Sean Frank (Ridge) — GREEN — MAN
              '/cards/card-211.jpg',  // Cassandra Thurswell (Kitsch) — TEAL — WOMAN
              '/cards/card-165.jpg',  // Robert Felder (Bearbottom) — GOLD (clean) — MAN
              '/cards/card-169.jpg',  // Jessica Berman (BodyBio) — GREEN — WOMAN
              '/cards/card-043.jpg',  // Chad Janis (Grüns) — TEAL — MAN
              '/cards/card-205.jpg',  // Katrina Lake (Stitch Fix) — GOLD — WOMAN
              '/cards/card-057.jpg',  // Chris Hall (Ecomm Cowboy) — GREEN — MAN
              '/cards/card-227.jpg',  // Bethany Catron Evans (Rhone) — TEAL — WOMAN
            ].map((src, i) => (
              <div key={i} className="top100-card-item">
                <img src={src} alt={`Card ${i + 1}`} draggable={false} />
              </div>
            ))}
          </div>

          <div className="top100-footer-row">
            <button className="btn-teal">Browse the Set</button>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRIZE BOARD ──────────────────── */}
      {/* PSD: heading (673,3824,1004,3874), cards at y=4014-4642 */}
      <section className="prize-section">
        <div className="section-inner">
          <p className="section-eyebrow">$100k+ In Giveaways</p>
          <h2 className="section-heading">The Prize Board</h2>
          <p className="section-body" style={{maxWidth: '420px'}}>
            Every chase card has a real prize attached. Grayed out means someone already pulled it &ndash; the rest are still in packs, waiting.
          </p>

          <div className="prize-grid">
            {PRIZES.map((prize, i) => (
              <div key={i} className={`prize-card${prize.status === 'claimed' ? ' claimed' : ''}`}>
                {/* Badge */}
                <p className={`prize-badge${prize.status === 'claimed' ? ' claimed-badge' : ''}`}>
                  {prize.badge}
                </p>
                {/* Prize name */}
                <h3 className="prize-name">{prize.name}</h3>
                {/* Description */}
                {prize.desc && <p className="prize-desc">{prize.desc}</p>}
                {/* Attached to */}
                {prize.attached && (
                  <p className="prize-attached">
                    <span className="prize-attached-label">ATTACHED TO </span>
                    {prize.attached}
                  </p>
                )}
                {/* PULLED overlay for claimed cards */}
                {prize.status === 'claimed' && (
                  <div className="pulled-overlay">
                    <div className="pulled-frame">
                      <span className="pulled-text">PULLED</span>
                    </div>
                    {prize.puller && <p className="pulled-by">{prize.puller}</p>}
                    {prize.pulledDate && <p className="pulled-date">PULLED: {prize.pulledDate}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── HOW TO GET A PACK ──────────────────── */}
      {/* PSD: heading (676,4918,1050,4968), steps at y=5085-5450 */}
      <section className="howto-section">
        <div className="section-inner">
          <h2 className="section-heading">How to Get a Pack</h2>
          <p className="section-body" style={{maxWidth: '480px', marginBottom: '3vw'}}>
            The packs are not for sale. You must follow the players, shows, and community.
          </p>

          <div className="howto-steps">
            {STEPS.map((step, i) => (
              <div key={i} className="howto-step">
                <div className="howto-num">{step.num}</div>
                <p className="howto-title">{step.title}</p>
                <p className="howto-body">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="howto-disclaimer">
            <span className="howto-free-label">ALWAYS FREE</span>
            {' '}Packs are never sold - no purchase, ever. If someone&apos;s charging you for one, it&apos;s not us.
          </div>
        </div>
      </section>

      {/* ──────────────────── LIVE SCHEDULE ──────────────────── */}
      {/* PSD: heading (676,5820,962,5870), events at y=5998-6280 */}
      <section className="live-section">
        <div className="section-inner">
          <p className="section-eyebrow">Breaks &amp; Shows</p>
          <h2 className="section-heading">Live Schedule</h2>
          <p className="section-body">
            Live breaks are where the packs move. Show up, play along, and watch the chase cards hit.
          </p>

          <div className="live-events">
            {EVENTS.map((event, i) => (
              <div key={i} className="live-event">
                <div className="live-date">
                  <span className="live-date-month">{event.month}</span>
                  <span className="live-date-day">{event.day}</span>
                </div>
                <div>
                  <p className="live-title">{event.title}</p>
                  <p className="live-meta">{event.meta}</p>
                </div>
                <button className="btn-remind">Remind Me</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CTA ──────────────────── */}
      {/* PSD: (1113,6656,1430,6764) "734 Packs Left. Zero for sale." */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Image
            src="/shopps-logo.png"
            alt="SHOPPS"
            width={120}
            height={40}
            className="cta-logo"
          />
          <h2 className="cta-heading">
            734 Packs Left.<br />Zero for Sale.
          </h2>
          <p className="cta-body">
            Six chase cards are still out there — including courtside seats,
            a $5,000 ad budget, and a seat at a private dinner with the Top 10.
            You have to find them.
          </p>
          <button className="btn-teal-lg">How to Get a Pack</button>
        </div>
      </section>

      {/* ──────────────────── FOOTER ──────────────────── */}
      <footer className="site-footer">
        <Image
          src="/shopps-logo.png"
          alt="SHOPPS"
          width={90}
          height={30}
          className="footer-logo"
        />
        <p className="footer-copy">© 2026 SHOPPS. All rights reserved.</p>
      </footer>
    </>
  )
}
