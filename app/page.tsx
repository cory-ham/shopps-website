'use client'

import Image from 'next/image'

/* ─────────────────────────────────────────────────────────
   SHOPPS — Full page rebuild from PSD
   Canvas: 2544 × 7286 px  |  Hero: 2544 × 887 px
   All hero children: position:absolute, no flexbox layout
   Card images: actual extracted PNGs, no CSS card designs
──────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
  { icon: '𝓕', label: 'Fulfil' },
  { icon: '⬛', label: 'omnisend' },
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
    label: '1 of 1 • Still Out There',
    rank: 'Pull the Rank #1 Chase Card',
    name: 'Courtside Seats OKC Thunder',
    desc: 'Two courtside seats to an Oklahoma City Thunder home game. The ultimate eCommerce night out.',
    puller: null,
  },
  {
    status: 'out-there',
    label: 'Still Out There',
    rank: '1 of 1 Chase Card',
    name: 'Dinner with the Top 10',
    desc: 'A seat at a private dinner with the Top 10 ranked cards in the set. Relationships over everything.',
    puller: null,
  },
  {
    status: 'out-there',
    label: 'Still Out There',
    rank: '1 of 1 Chase Card',
    name: '$5,000 Ad Budget',
    desc: 'A funded ad account boost — $5,000 USD to put to work on your next campaign.',
    puller: null,
  },
  {
    status: 'claimed',
    label: 'Claimed',
    rank: 'Week 2 Live Break',
    name: '$500 USD Gift Card',
    desc: null,
    puller: 'Pulled by Kerri J. on week 2 live break.',
  },
  {
    status: 'out-there',
    label: 'Still Out There',
    rank: 'Rank #1 Chase Card',
    name: 'Courtside Seats OKC Thunder',
    desc: 'Pull the Rank #1 chase card. The seats are waiting.',
    puller: null,
  },
  {
    status: 'claimed',
    label: 'Claimed',
    rank: 'Week 2 Live Break',
    name: 'Signed Set Box',
    desc: null,
    puller: 'Pulled by Jim H. on week 2 live break.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Follow the Drop',
    body: 'Packs release through specific channels — player socials, live shows, and community posts. Follow to catch drops as they happen.',
  },
  {
    num: '02',
    title: 'Show Up Live',
    body: 'Live card breaks and shows are where most packs move. Show up, play along, and watch your stack grow.',
  },
  {
    num: '03',
    title: 'Rip Your Pack',
    body: 'Every pack holds cards from the Top 100 — base, foil, and the rare chase cards with real prizes attached.',
  },
  {
    num: '04',
    title: 'Pull & Win',
    body: 'Chase cards come with real prizes attached — courtside seats, ad budgets, dinners with operators. Pull it, claim it.',
  },
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
          <Image
            src="/shopps-logo.png"
            alt="SHOPPS"
            width={160}
            height={54}
            className="nav-logo"
            priority
          />
        </div>

        <div className="nav-right">
          <a href="#" className="nav-link">How It Works</a>
          <a href="#" className="nav-link">Nominate</a>
          <a href="#" className="nav-live">Live</a>
        </div>
      </nav>

      {/* ──────────────────── HERO ─────────────────── */}
      {/*
        Canvas 2544×887 hero — ALL children position:absolute
        Card measurements from PSD (verified):
          Layer 15 (center/Rytis): left=53.4%, w=15.1vw  → left: 53.4%
          Layer 2 copy (strip): 5.5%–94.5%
          Text block: left=26.5%, top=188/887=21%
      */}
      <section className="hero">

        {/* Blue radial glow — behind cards */}
        <div className="hero-glow" />

        {/* ── CARD FAN (all position:absolute via .card classes) ── */}

        {/* Outer-left: Rytis dark, 47° rotateY, 44vh, left:-2% */}
        <img
          src="/cards/rytis.png"
          alt="Card"
          className="card card-outer-left"
          draggable={false}
        />

        {/* Mid-left: Marcus, 29° rotateY, 55vh, left:11% */}
        <img
          src="/cards/marcus.png"
          alt="Card"
          className="card card-mid-left"
          draggable={false}
        />

        {/* Inner-left: Olivia, 14° rotateY, 65vh, left:30% */}
        <img
          src="/cards/olivia.png"
          alt="Card"
          className="card card-inner-left"
          draggable={false}
        />

        {/* Center featured: Rytis Lauris, no rotation, 75vh, left:53.4% */}
        <img
          src="/cards/rytis-center.png"
          alt="Rytis Lauris — Co-Founder & CEO, Omnisend"
          className="card card-center"
          draggable={false}
        />

        {/* Inner-right: Samantha, −14° rotateY, 65vh, left:68.5% */}
        <img
          src="/cards/samantha.png"
          alt="Card"
          className="card card-inner-right"
          draggable={false}
        />

        {/* Mid-right: Jordan, −29° rotateY, 55vh, left:79% */}
        <img
          src="/cards/jordan.png"
          alt="Card"
          className="card card-mid-right"
          draggable={false}
        />

        {/* Outer-right: Michael, −47° rotateY, 44vh, left:89% */}
        <img
          src="/cards/michael.png"
          alt="Card"
          className="card card-outer-right"
          draggable={false}
        />

        {/* ── CROSSHAIR MARKERS ── */}
        {/* PSD: small teal + marks scattered at fixed positions */}
        <span className="crosshair" style={{ left: '22%', top: '68%' }}>+</span>
        <span className="crosshair" style={{ left: '46%', top: '26%' }}>+</span>
        <span className="crosshair" style={{ left: '76%', top: '32%' }}>+</span>
        <span className="crosshair" style={{ left: '90%', top: '65%' }}>+</span>
        <span className="crosshair" style={{ left: '8%',  top: '72%' }}>+</span>

        {/* ── TEXT BLOCK ──
          PSD: left=673px (26.5%), top=188px (~21% of hero)
          Instruction: left:26.5%, top:50%, transform:translateY(-50%), width:22vw, zIndex:20
        */}
        <div className="hero-text" style={{ zIndex: 20 }}>
          {/* "THE TOP 100 IN ECOMMERCE" — Anton, uppercase, ~4.5vw */}
          <h1 className="hero-headline">
            The Top 100<br />In Ecommerce
          </h1>

          {/* "COLLECT THEM ALL" — teal, 1.2vw, weight 800, uppercase */}
          <p className="hero-collect-label">Collect Them All</p>

          {/* Body — PSD: "Top 100 operators, founders..." y=485-553 */}
          <p className="hero-body" style={{ marginTop: '1vw' }}>
            Top 100 operators, founders, and legends of the
            industry — immortalized in a collector card series.
            Packs are 100% free but you can&apos;t buy them. You have
            to find them.
          </p>

          {/* Buttons — PSD: y=592-645 (See the set layer: 674,592,1118,645) */}
          <div className="hero-buttons">
            <button className="btn-teal">How to Get a Pack</button>
            <button className="btn-outline">See the Set</button>
          </div>

          {/* Pack Counter — PSD "Rectangle 1 copy": (674,674,872,814)
              Instruction: Anton digits, dark box bg:#050608 */}
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

      {/* ──────────────────── TICKER STRIP ──────────────────── */}
      {/* PSD Layer 4: (0,886,2544,945) — 59px tall, full width
          Logos: Fulfil + omnisend, alternating, scrolling */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {/* Duplicate items for seamless infinite scroll */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-logo-icon" aria-hidden="true">
                {item.label === 'Fulfil' ? (
                  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" rx="3" fill="rgba(255,255,255,0.15)" />
                    <text x="10" y="15" textAnchor="middle" fill="white" fontSize="12" fontFamily="Georgia, serif">ƒ</text>
                  </svg>
                ) : (
                  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" rx="3" fill="rgba(255,255,255,0.15)" />
                    <text x="10" y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">a</text>
                  </svg>
                )}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────── WHAT IS SHOPPS? ──────────────────── */}
      {/* PSD: Layer 13 video area (929,1057,1618,1444), text (1101,1513,1446,1563) */}
      <section className="shopps-section">
        {/* Video thumbnail */}
        <div className="shopps-video-wrap">
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0d1020 0%, #060810 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <div className="shopps-play-btn">
            <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </div>

        <p className="shopps-eyebrow">About</p>
        <h2 className="shopps-heading">What is SHOPPS?</h2>
        <p className="shopps-body">
          Top 100 operators, founders, and legends of the industry — immortalized
          in a collector card series. Packs are 100% free but you can&apos;t buy them.
          You have to find them. Show up, earn them, collect them all.
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
      {/* PSD: text (673,2475,906,2525), card grid Layer 5 (643,2622,1899,3460) */}
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

          {/* 4-column, 2-row card grid */}
          <div className="top100-card-grid">
            {TOP100_CARDS.map((card, i) => (
              <div key={i} className="top100-card-item">
                <img src={card.src} alt={card.name} />
              </div>
            ))}
          </div>

          <div className="top100-footer-row">
            <button className="btn-outline-sm" style={{ padding: '0.8vw 3vw' }}>
              Browse the Set
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRIZE BOARD ──────────────────── */}
      {/* PSD: heading (673,3824,1004,3874), cards at y=4014-4642 */}
      <section className="prize-section">
        <div className="section-inner">
          <p className="section-eyebrow">$100k+ in Giveaways</p>
          <h2 className="section-heading">The Prize Board</h2>
          <p className="section-body">
            Every chase card has a real prize attached. Grayed out means someone already pulled it.
            The rest are still out there.
          </p>

          <div className="prize-grid">
            {PRIZES.map((prize, i) => (
              <div
                key={i}
                className={`prize-card ${prize.status === 'claimed' ? 'claimed' : ''}`}
              >
                <span
                  className={`prize-badge ${prize.status === 'claimed' ? 'claimed-badge' : 'out-there'}`}
                >
                  {prize.status === 'claimed' ? '● Claimed' : '○ Still Out There'}
                </span>
                <p className="prize-rank">{prize.rank}</p>
                <p className={`prize-name ${prize.status === 'claimed' ? 'greyed' : ''}`}>
                  {prize.name}
                </p>
                {prize.desc && <p className="prize-desc">{prize.desc}</p>}
                {prize.puller && <p className="prize-puller">{prize.puller}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── HOW TO GET A PACK ──────────────────── */}
      {/* PSD: heading (676,4918,1050,4968), steps at y=5085-5450 */}
      <section className="howto-section">
        <div className="section-inner">
          <p className="section-eyebrow">How it Works</p>
          <h2 className="section-heading">How to Get a Pack</h2>
          <p className="section-body">
            The packs are not for sale. You must follow the players, shows, and community to find them.
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

          {/* "Always Free" disclaimer — PSD: (709,5500,1363,5524) */}
          <div className="howto-disclaimer">
            <strong>Always Free</strong> — Packs are never sold. No purchase, ever.
            If someone is selling a pack, it&apos;s not official. Report it to us immediately.
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
