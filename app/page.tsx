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

// ── Tweet feed data ───────────────────────────────────────────────────
const TWEET_COLORS = ['#2d7a3a', '#039F9D', '#c9a227']

const TWEETS = [
  {
    name: 'Taylor Holiday',
    handle: '@TaylorHoliday',
    avatar: 'https://pbs.twimg.com/profile_images/1493453071807967234/KLa4U1A8_normal.jpg',
    text: 'Marketing is gonna hate me for this leak…\n\nBut I\'m too excited.\n\n#SHOPPS Season 1 dropping so soon.',
    images: [
      'https://pbs.twimg.com/media/HUrjf2aaAAE2KZi?format=jpg&name=large',
      'https://pbs.twimg.com/amplify_video_thumb/2110749511719243776/img/davSLKmJL5ZiYUZz?format=webp&name=medium',
    ],
    likes: '79',
    retweets: '6.4K views',
    date: 'Oct 15',
    url: 'https://x.com/TaylorHoliday/status/2110749556275351942',
  },
  {
    name: 'Mehtab | Karta Ventures',
    handle: '@MehtabKarta',
    avatar: 'https://pbs.twimg.com/profile_images/2013096438251524096/tvL3UYB0_normal.jpg',
    text: 'Look carefully and u might see me eating crayons',
    images: ['https://pbs.twimg.com/media/HUrjf2aaAAE2KZi?format=jpg&name=large'],
    likes: '',
    retweets: '',
    date: 'Oct 15',
    url: 'https://x.com/MehtabKarta/status/2110759297286386137',
  },
  {
    name: 'Nick Shackelford',
    handle: '@iamshackelford',
    avatar: 'https://pbs.twimg.com/profile_images/2095715047033237504/oCljBMkJ_normal.jpg',
    text: 'Okay! Which one of you guys got the limited edition 1 of 1 Tattoo Chinese Peptide Card 🥹',
    images: ['https://pbs.twimg.com/media/HUwrQ6SbAAEbuds?format=jpg&name=large'],
    likes: '',
    retweets: '',
    date: 'Oct 16',
    url: 'https://x.com/iamshackelford/status/2111109898838962320',
  },
  {
    name: 'Bryan MacDonald',
    handle: '@DTCbromozi',
    avatar: 'https://pbs.twimg.com/profile_images/1885708673856499712/3SebwehN_normal.jpg',
    text: 'For those who missed the greatest live unboxing in @LinkedIn history last time… You have a chance to redeem yourself. Thursday, November 12 at 12 noon EST we are doing it again!',
    images: ['https://pbs.twimg.com/media/HUw4PboWAAAdfhk?format=jpg&name=large'],
    likes: '',
    retweets: '',
    date: 'Oct 16',
    url: 'https://x.com/DTCbromozi/status/2111124168854962373',
  },
  {
    name: 'Bryan MacDonald',
    handle: '@DTCbromozi',
    avatar: 'https://pbs.twimg.com/profile_images/1885708673856499712/3SebwehN_normal.jpg',
    text: 'Some say @TaylorHoliday is just a nerd. Numbers guy. A wizard. Taylor Potter some people call him. (Not verified)\n\nHowever, let\'s not forget that the man can sell and market the shit out of anything.\n\nPut a C on his chest and some respect on his name.',
    images: ['https://pbs.twimg.com/media/HUrjf2aaAAE2KZi?format=jpg&name=large'],
    likes: '',
    retweets: '',
    date: 'Oct 15',
    url: 'https://x.com/DTCbromozi/status/2110816970769596445',
  },
]

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
  return `/slabs/slab-p${String(p).padStart(2,'0')}-${v}.png`
}
function cardFrontPath(p: number, r: () => number) {
  const offsets = [1, 3, 5]  // green, teal, gold fronts
  const offset  = offsets[Math.floor(r() * 3)]
  return `/cards/card-${String(8 * p + offset).padStart(3,'0')}.jpg`
}
function cardBackPath(p: number, v: CardVariant) {
  // back offsets match front: green=2, teal=4, gold=6
  const backOffset = v === 'green' ? 2 : v === 'teal' ? 4 : 6
  return `/cards/card-${String(8 * p + backOffset).padStart(3,'0')}.jpg`
}

// Seed from today's date — stable across server + client on the same day
const _today    = new Date()
const _dateSeed = _today.getFullYear() * 10000 + (_today.getMonth() + 1) * 100 + _today.getDate()
const _rand     = dateSeededRandom(_dateSeed)

// Shuffle both pools
const _shuffledMale   = seededShuffle([...MALE_P],   _rand)
const _shuffledFemale = seededShuffle([...FEMALE_P], _rand)

// ── Carousel: 14 slab fronts, every 3rd position (2,5,8,11) = female ────────
const _carouselBase = (() => {
  // Build 14 slab cards first
  let mi = 0, fi = 0
  const slabs: { src: string; name: string }[] = []
  for (let pos = 0; pos < 14; pos++) {
    const isFemale = pos % 3 === 2
    const pool     = isFemale ? _shuffledFemale : _shuffledMale
    const p        = pool[(isFemale ? fi++ : mi++) % pool.length]
    const v        = VARIANTS[Math.floor(_rand() * 3)]
    slabs.push({ src: slabPath(p, v), name: PERSON_NAME[p] ?? '' })
  }
  // Interleave: pack card pack card (alternating)
  const PACK = { src: '/shopps-pack-carousel.png', name: '', isPack: true }
  const result: { src: string; name: string; isPack?: boolean }[] = []
  for (let i = 0; i < slabs.length; i++) {
    result.push(PACK)
    result.push(slabs[i])
  }
  return result
})()

// Doubled for seamless infinite-scroll animation
const CAROUSEL_CARDS = [..._carouselBase, ..._carouselBase] as { src: string; name: string; isPack?: boolean }[]

// ── Top 100 grid: 8 raw card fronts, alternating M / F ───────────────────────
// Continue pulling from the shuffled pools after carousel (10 males, 4 females used)
const TOP100_CARDS = (() => {
  // Sponsor cards always shown (p=99 Moiz Ali, p=100 Rytis Lauris)
  const sponsors = [
    { p: 99,  src: '/cards/card-793.jpg', back: '/cards/card-794.jpg', name: 'Moiz Ali' },
    { p: 100, src: '/cards/card-801.jpg', back: '/cards/card-802.jpg', name: 'Rytis Lauris' },
  ]
  // 6 random cards from the daily pool
  let mi = 10, fi = 4
  const random = Array.from({ length: 6 }, (_, i) => {
    const isFemale = i % 2 === 1
    const pool     = isFemale ? _shuffledFemale : _shuffledMale
    const p        = pool[(isFemale ? fi++ : mi++) % pool.length]
    const v: CardVariant = 'green'
    return { p, src: cardFrontPath(p, _rand), back: cardBackPath(p, v), name: PERSON_NAME[p] ?? '' }
  })
  // Shuffle sponsors into random positions
  const all = [...random, ...sponsors]
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(_rand() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]]
  }
  return all
})()

const TICKER_ITEMS = [
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
    title: 'WATCH LIVE BREAKS',
    body: 'Tune in to live pack openings on YouTube, LinkedIn, and X for your chance to win packs, chase autograph cards, and unlock exclusive prizes.',
  },
  {
    num: '02',
    title: 'Join the conversation',
    body: 'Follow the players and Common Thread Collective on LinkedIn and X for surprise drops, pack giveaways, and chances to nominate fellow colleagues.',
  },
  {
    num: '03',
    title: 'Follow the players',
    body: 'Your favorite founders have packs to give away, too. Follow the featured players for exclusive drops and chances to score a pack.',
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
              <div key={i} className={card.isPack ? 'card-sleeve-img-wrap card-pack-wrap' : 'card-sleeve-img-wrap'}>
                <img src={card.src} alt={card.name} className={card.isPack ? 'card-pack-img' : 'card-slab-img'} draggable={false} />
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-fade-left" />
        {/* Right fade mask */}
        <div className="carousel-fade-right" />

        {/* TEXT BLOCK — sits on top of carousel */}
        <div className="hero-text">
          <h1 className="hero-headline" style={{marginBottom:'1.25rem'}}><span style={{display:'block'}}>TRADING CARDS</span><span style={{display:'block'}}>FOR ECOMMERCE</span></h1>
          <p className="hero-collect-label" style={{marginBottom:'1.5rem'}}>Built To Lead. Made To Collect.</p>
          <p className="hero-body" style={{marginBottom:'2rem'}}>
            Meet the leaders and innovators changing the game of DTC. Collect their cards, chase the ultra-rares, and unlock over $50,000 in real prizes.
          </p>
          <div className="hero-buttons">
            <a href="/how-it-works" className="btn-teal">Get a Pack</a>
            <Link href="/set" className="btn-outline">View the Collection</Link>
          </div>

        </div>

      </section>


      {/* ──────────────────── WHAT IS SHOPPS? ──────────────────── */}
      {/* PSD: Layer 13 video area (929,1057,1618,1444), text (1101,1513,1446,1563) */}
      <section className="shopps-section">
        {/* Responsive card grid background — auto-fill so no cutoffs */}
        <div className="shopps-card-grid" aria-hidden="true">
          {Array.from({length: 80}).map((_, i) => (
            <div key={i} className="shopps-bg-card" />
          ))}
        </div>

        <div className="shopps-content-row" style={{alignItems:'center'}}>
          <div className="shopps-copy">
            <h2 className="shopps-heading">What is <span style={{color:'#039F9D'}}>SHOPPS</span>?</h2>
            <p className="shopps-body">
              Not every legend wears a jersey.<br /><br />
              SHOPPS is a limited-edition trading card collection celebrating the founders, leaders, and icons shaping ecommerce.<br /><br />
              100 players. 1,000 packs. 10 randomized cards per pack.<br /><br />
              From base cards and chrome parallels to ultra-rare numbered cards and exclusive 1-of-1 autographs.<br /><br />
              <strong>Every pack is a chance to pull greatness.</strong>
            </p>
            <div className="pack-counter" style={{marginTop:'2rem'}}>
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
          <div className="shopps-video-wrap">
            <video
              src="/shopps-intro.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
            />
          </div>
        </div>

      </section>

      {/* ──────────────────── VALUE PROPS ──────────────────── */}
      {/* PSD Layer 6 bg: (0,1783,2544,2299). 3 icons: Layer 14 variants */}
      <div className="value-section">
        <h2 className="section-heading" style={{textAlign:'center',marginBottom:'3rem',padding:'0 6.5%'}}>Built to Lead <span style={{color:'#039F9D'}}>Made to Collect</span></h2>
        <div className="value-grid" style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6.5%' }}>

          <div className="value-item">

            <p className="value-title">Only 1,000 packs exist</p>
            <p className="value-body">
              100 players. 10 cards per pack. Rare parallels, numbered cards, and exclusive 1-of-1s.<br /><br />Every pack is different. Every pull is a chance at something legendary.
            </p>
          </div>

          <div className="value-item">

            <p className="value-title">$50,000 in real prizes</p>
            <p className="value-body">
              Some cards are worth more than the pull.<br /><br />Chase authenticated autograph cards from some of the biggest names in ecommerce, with exclusive products, gift cards, and unforgettable experiences up for grabs.
            </p>
          </div>

          <div className="value-item">

            <p className="value-title">Never for sale</p>
            <p className="value-body">
              You can&apos;t buy a pack. You have to win one.<br /><br />Packs drop through live breaks, exclusive events, player giveaways, and community challenges.<br /><br />Stay ready. You never know when the next pack will drop.
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
              <h2 className="section-heading">Meet the Players</h2>
              <p className="section-body">
                The leaders. The innovators. The game changers.<br /><br />One legendary collection.<br /><br />Explore the full roster and discover who&apos;s in the set.
              </p>
            </div>

          </div>

          {/* 3×2 grid — 4 random + 2 sponsors, click to flip */}
          <div className="top100-card-grid">
            {TOP100_CARDS.map((card, i) => (
              <div key={i} className="top100-card-item top100-flip-card"
                onClick={e => {
                  const el = e.currentTarget
                  el.classList.toggle('flipped')
                }}>
                <div className="top100-flip-inner">
                  <div className="top100-flip-front">
                    <img src={card.src} alt={card.name || ('Card ' + (i + 1))} draggable={false} />
                  </div>
                  <div className="top100-flip-back">
                    <img src={card.back} alt={card.name + ' back'} draggable={false} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="top100-footer-row" style={{justifyContent:'flex-start'}}>
            <a href="/set" className="btn-teal">VIEW THE COLLECTION</a>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRIZE BOARD ──────────────────── */}
      {/* PSD: heading (673,3824,1004,3874), cards at y=4014-4642 */}
      <section className="prize-section" style={{display:'none'}}>
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
      <section className="howto-section howto-section--split">
        <div className="howto-pack-layout">

          {/* Left: headline + vertical step cards + button */}
          <div className="howto-pack-left">
            <h2 className="section-heading" style={{marginBottom:'1vw'}}>How to Get a Pack</h2>
            <p className="section-body" style={{marginBottom:'2vw'}}>
              You can&apos;t buy a pack. You have to win one. Here&apos;s how to get in on the action.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {STEPS.map((step, i) => (
                <div key={i} className="howto-step">
                  <p className="howto-title">{step.title}</p>
                  <p className="howto-body">{step.body}</p>
                </div>
              ))}
            </div>
            <div style={{marginTop:'2rem'}}>
              <a href="/how-it-works" className="btn-teal">DON&apos;T MISS THE NEXT DROP</a>
            </div>
          </div>

          {/* Right: packs fill to screen edge */}
          <div className="howto-pack-right">
            <img src="/shopps-packs-fan.png" alt="SHOPPS Packs" draggable={false} />
          </div>

        </div>
      </section>

      {/* ──────────────────── LIVE SCHEDULE ──────────────────── */}
      {/* PSD: heading (676,5820,962,5870), events at y=5998-6280 */}
      <section className="live-section" style={{display:'none'}}>
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
      {/* ── SPONSOR STRIP — static ── */}
      <p className="sponsor-label">Brought to you by</p>
      <div className="ticker-wrap">
        {TICKER_ITEMS.map((item, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={item.label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
              alt={item.label}
              style={{
                height: item.label === 'CTC' ? '36px' : item.label === 'omnisend' ? '18px' : '20px',
                width: 'auto',
                opacity: 0.55,
                filter: item.label === 'omnisend' ? 'invert(1) brightness(2)' : 'none',
              }}
            />
          </div>
        ))}
      </div>

      {/* ────────────────────── TWEET FEED ──────────────────── */}
      <section className="tweet-section">
        <div className="section-inner">
          <h2 className="section-heading">In the Wild</h2>
          <p className="section-body" style={{marginTop:'0.75rem'}}>The packs. The pulls. The chase.<br /><br />See what the community is opening, collecting, and trading.<br /><br />Show us your favorites with <span style={{color:'#039F9D'}}>#SHOPPS</span>.</p>
        </div>
        <div className="tweet-track-wrap">
          <div className="tweet-track">
            {[...TWEETS,...TWEETS,...TWEETS,...TWEETS,...TWEETS].map((t, i) => (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tweet-card"
                style={{ borderColor: TWEET_COLORS[i % TWEET_COLORS.length] }}
              >
                {/* Side label */}
                <span className="tweet-card-side-text">SHOPPS COMMUNITY CARD</span>

                {/* Top badge */}
                <div className="tweet-card-top">
                  <div className="tweet-card-s-badge" style={{ background: TWEET_COLORS[i % TWEET_COLORS.length] }}>
                    <img src="/shopps-s-icon-v2.png" alt="S" />
                  </div>
                  <svg className="tweet-card-x-badge" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>

                {/* Full-bleed photo */}
                <div className={`tweet-card-photo ${t.images && t.images.length > 1 ? 'tweet-card-photo-split' : ''}`}>
                  {t.images && t.images.length > 1 ? (
                    <>
                      <img src={t.images[0]} alt="" draggable={false} className="tweet-split-img" />
                      <div className="tweet-split-gap" />
                      <img src={t.images[1]} alt="" draggable={false} className="tweet-split-img" />
                    </>
                  ) : t.images && t.images.length === 1 ? (
                    <img src={t.images[0]} alt="" draggable={false} />
                  ) : (
                    <div className="tweet-card-no-photo" />
                  )}
                  {/* Tweet text overlay */}
                  <div className="tweet-card-text-overlay">
                    <p className="tweet-card-quote">&ldquo;{t.text}&rdquo;</p>
                  </div>
                </div>

                {/* Bottom nameplate */}
                <div className="tweet-card-nameplate" style={{ borderTopColor: TWEET_COLORS[i % TWEET_COLORS.length] }}>
                  <div className="tweet-card-shopps-logo">
                    <img src="/shopps-logo-v2.png" alt="SHOPPS" />
                  </div>
                  <div className="tweet-card-identity">
                    <p className="tweet-card-name">{t.name}</p>
                    <p className="tweet-card-handle">{t.handle}</p>
                  </div>
                  {t.avatar && (
                    <img src={t.avatar} alt={t.name} className="tweet-card-avatar" />
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CTA ──────────────────── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" style={{marginBottom:'2rem'}} />
          <h2 className="cta-heading">
            ONLY 1,000 PACKS EXIST.<br />XXX PACKS REMAIN.
          </h2>
          <p className="cta-body" style={{marginTop:'1.5rem',marginBottom:'1rem'}}>The chase is on.</p>
          <a href="/set" className="btn-cta-outline" style={{marginTop:'1.5rem', display:'inline-block'}}>START COLLECTING</a>
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
