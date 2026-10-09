'use client'
import SiteNav from './components/SiteNav'

import Image from 'next/image'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────
   SHOPPS — Full page rebuild from PSD
   Canvas: 2544 × 7286 px  |  Hero: 2544 × 887 px
   All hero children: position:absolute, no flexbox layout
   Card images: actual extracted PNGs, no CSS card designs
──────────────────────────────────────────────────────────── */

// ── Daily-rotating card carousel ─────────────────────────────────────────────
// Uses a date-based seed so server + client render identically (no hydration
// mismatch). Cards rotate each day; carousel rule: every 3rd slot = female.

function dateSeededRandom(seed: number) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}
function seededShuffle<T>(arr: T[], r: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Person indices by sex
const FEMALE_P = [21,25,26,28,30,31,32,33,34,35,36,38,39,40,41,42,44,46,47,49,53,59,60,66,70,74,80,89,96]
const MALE_P   = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,27,29,37,43,45,48,50,51,52,54,55,56,57,58,61,62,63,64,65,67,68,69,71,72,73,75,76,77,78,79,81,82,83,84,85,86,87,88,90,91,92,93,94,95,97,98]

// Person display names (P index → name)
const PERSON_NAME: Record<number, string> = {
  0:'Bart Szaniewski',        1:'Bear Handlon',           2:'Ben Cogan',
  3:'Chase Dimond',           4:'Sean Frank',             5:'Chad Janis',
  6:'Matthew Bertulli',       7:'Chris Hall',             8:'Mike Beckham',
  9:'Nick Shackelford',      10:'Ezra Firestone',        11:'John Roman',
 12:'Jimmy Kim',             13:'Zach Stuck',            14:'Andrew Youderian',
 15:'Ronak Shah',            16:'Josh Haskins',          17:'Isaac Medeiros',
 18:'Michael McVerry',       19:'Paul Jauregui',         20:'Robert Felder',
 21:'Jessica Berman',        22:'Jason Panzer',          23:'Brad Blankinship',
 24:'Scott Kramer',          25:'Katrina Lake',          26:'Cassandra Thurswell',
 27:'Drew Arciuolo',         28:'Bethany Catron Evans',  29:'Sean Riley',
 30:'Lindsay Shumlas',       31:'Andrea Faulkner Williams', 32:'Kimberley Ho',
 33:'Siffat Haider',         34:'Tiffani Carter',        35:'Erica Good',
 36:'Ariana Ferwerda',       37:'Rashad Hossain',        38:'Sophia Edelstein',
 39:'Jill Layfield',         40:'Gorjana Reidel',        41:'Anisha Raghavan',
 42:'Sarah Rahal',           43:'Andrew Benin',          44:'Katerina Schneider',
 45:'Jordan Nathan',         46:'Maradith Frenkel',      47:'Michelle Miller',
 48:'Jordan Menard',         49:'Vicky Williams Grahan', 50:'Andrew Faris',
 51:'Cody Plofker',          52:'Steven Borrelli',       53:'Kayti O\'Connell Carr',
 54:'Chris Lang',            55:'Bill D\'Alessandro',    56:'Brian Waddick',
 57:'The Normal Brand Team', 58:'Alejandro Chahin',      59:'Ariel Kaye',
 60:'Mari Llewellyn',        61:'Hudson Leogrande',      62:'Matteo Franceschetti',
 63:'Peter Rahal',           64:'Will Ahmed',            65:'Gurmer Chopra',
 66:'Nell Diamond',          67:'Justin Mares',          68:'Danny Yeung',
 69:'Tero Isokauppila',      70:'Sarah Paiji Yoo',       71:'Camron Collard',
 72:'Christian Guzman',      73:'Paul Hedrick',          74:'Cherene Aubert',
 75:'Mark Mastrandrea',      76:'Edward Wimmer IV',      77:'Ryan Babenzien',
 78:'Beav Brodie',           79:'Brian Garofalow',       80:'Katy Mimari',
 81:'Dean Brennan',          82:'Tyler McCann',          83:'Roman Khan',
 84:'Josh Shapiro',          85:'Bill Rom',              86:'Curtis Matsko',
 87:'Eric Girouard',         88:'Jordan Palmer',         89:'Ari Murray',
 90:'Bryan Cano',            91:'Kevin Lavelle',         92:'Victor Tam',
 93:'Eric Panofsky',         94:'Mehtab Bhogal',         95:'Freddy Ward',
 96:'Sienna McCormick',      97:'Taylor Holiday',        98:'Mystery Card',
}

const VARIANTS = ['green', 'teal', 'gold'] as const
type CardVariant = typeof VARIANTS[number]

function slabPath(p: number, v: CardVariant) {
  return `/slabs/slab-p${String(p).padStart(2,'0')}-${v}.jpg`
}
function cardFrontPath(p: number, r: () => number) {
  const offsets = [1, 3, 5]  // green, teal, gold fronts
  const offset  = offsets[Math.floor(r() * 3)]
  return `/cards/card-${String(8 * p + offset).padStart(3,'0')}.jpg`
}

// Seed from today's date — stable across server + client on the same day
const _today    = new Date()
const _dateSeed = _today.getFullYear() * 10000 + (_today.getMonth() + 1) * 100 + _today.getDate()
const _rand     = dateSeededRandom(_dateSeed)

// Shuffle both pools
const _shuffledMale   = seededShuffle([...MALE_P],   _rand)
const _shuffledFemale = seededShuffle([...FEMALE_P], _rand)

// ── Carousel: 14 unique cards, every 3rd position (2,5,8,11) = female ────────
const _carouselBase = (() => {
  let mi = 0, fi = 0
  return Array.from({ length: 14 }, (_, pos) => {
    const isFemale = pos % 3 === 2
    const pool     = isFemale ? _shuffledFemale : _shuffledMale
    const p        = pool[(isFemale ? fi++ : mi++) % pool.length]
    const v        = VARIANTS[Math.floor(_rand() * 3)]
    return { slab: slabPath(p, v), name: PERSON_NAME[p] ?? '' }
  })
})()

// Doubled for seamless infinite-scroll animation
const CAROUSEL_CARDS = [..._carouselBase, ..._carouselBase]

// ── Top 100 grid: 8 raw card fronts, alternating M / F ───────────────────────
// Continue pulling from the shuffled pools after carousel (10 males, 4 females used)
const TOP100_CARDS = (() => {
  let mi = 10, fi = 4
  return Array.from({ length: 8 }, (_, i) => {
    const isFemale = i % 2 === 1
    const pool     = isFemale ? _shuffledFemale : _shuffledMale
    const p        = pool[(isFemale ? fi++ : mi++) % pool.length]
    return { src: cardFrontPath(p, _rand), name: PERSON_NAME[p] ?? '' }
  })
})()

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

// CAROUSEL_CARDS is now defined above using date-seeded random (see top of file)

const EVENTS = [
  {
    month: 'OCT',
    day: '14',
    title: 'Live Break #7 – Founders Night',
    meta: '8:00 PM ET • Streaming IG Live & YouTube • 40 Packs on the table',
  },
  {
    month: 'OCT',
    day: '21',
    title: 'The Top 100 Show – Ep. 4',
    meta: '7:30 PM ET • Guest: A Top 10 Card, revealed live',
  },
  {
    month: 'OCT',
    day: '28',
    title: 'Live Break #8 – Chase Card Special',
    meta: '8:00 PM ET • A confirmed 1/1 is in tonight’s stack',
  },
]

export default function Home() {
  return (
    <>
      {/* ──────────────────── NAV ──────────────────── */}
      <SiteNav />

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
            <Link href="/set" className="btn-outline">See the set</Link>
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
          A physical trading card series celebrating 100 of the founders, operators, and leaders shaping DTC. Collect the people behind the brands and hunt down a free pack through live card breaks, player drops, and social contests.
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
            <Link href="/set" className="btn-outline-sm">View All 100</Link>
          </div>

          {/* 4×2 grid of front cards — daily-rotating, alternating M/F */}
          <div className="top100-card-grid">
            {TOP100_CARDS.map((card, i) => (
              <div key={i} className="top100-card-item">
                <img src={card.src} alt={card.name || `Card ${i + 1}`} draggable={false} />
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
          <p className="section-body" style={{maxWidth: '440px', marginBottom: '2.5vw'}}>
            Live breaks are where the packs move. Show up, play along, and watch chase cards come off the board in real time.
          </p>

          <div className="live-events-box">
            {EVENTS.map((event, i) => (
              <div key={i} className={`live-event${i < EVENTS.length - 1 ? ' live-event-divider' : ''}`}>
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

      {/* ──────────────────── CTA ──────────────────── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">
            734 Packs Left.<br />Zero for Sale.
          </h2>
          <p className="cta-body">
            Six chase cards are still out there &ndash; including{' '}
            <span style={{color: 'var(--olive)'}}>courtside seats</span>.
            Know where to look.
          </p>
          <button className="btn-cta-outline">How to Get a Pack</button>
        </div>
      </section>

      {/* ──────────────────── FOOTER ──────────────────── */}
      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">© 2026 SHOPPS. All rights reserved.</p>
      </footer>
    </>
  )
}
