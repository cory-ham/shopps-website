'use client'
import { useMemo, useRef, useEffect, useState } from 'react'
import SiteNav from '../components/SiteNav'

type PrizeStatus = 'available' | 'claimed'

interface Prize {
  id: string; tag: string; title: string; subtitle?: string
  description: string; attached: string; status: PrizeStatus
  puller?: string; pulledDate?: string; featured?: boolean; cardImage?: string
}

interface Giveaway {
  name: string; company: string; prize: string; cardImg?: string
}

const GIVEAWAYS: Giveaway[] = [
  { name: 'Bart Szaniewski',       company: 'Dad Gang Co.',          prize: 'A one-hour brand-growth consultation',                                          cardImg: '/cards/foil-sig-chrome-001.jpg' },
  { name: 'Bear Handlon',          company: 'Born Primitive',        prize: 'A $1,000 Born Primitive gift card and a 30-minute Zoom call',                   cardImg: '/cards/foil-sig-chrome-002.jpg' },
  { name: 'Ben Cogan',             company: 'Beanstalk',             prize: 'A ticket to Beanstalk',                                                         cardImg: '/cards/foil-sig-chrome-003.jpg' },
  { name: 'Sean Frank',            company: 'Ridge',                 prize: 'A $1,000 Ridge gift card',                                                      cardImg: '/cards/foil-sig-chrome-005.jpg' },
  { name: 'Chad Janis',            company: 'Grüns',                 prize: 'Dinner at any Austin restaurant, or a two-hour roundtable for up to 8',         cardImg: '/cards/foil-sig-chrome-006.jpg' },
  { name: 'Matthew Bertulli',      company: 'Pela',                  prize: 'A one-hour consultation',                                                       cardImg: '/cards/foil-sig-chrome-007.jpg' },
  { name: 'Chris Hall',            company: 'Ecomm Cowboy',          prize: 'Consulting call + show appearance + $1,500 matched ad credits + partner perks', cardImg: '/cards/foil-sig-chrome-008.jpg' },
  { name: 'Mike Beckham',          company: 'Simple Modern',         prize: 'Courtside OKC Thunder ticket + $200 drinkware + a year of Trevi',               cardImg: '/cards/foil-sig-chrome-009.jpg' },
  { name: 'Nick Shackelford',      company: 'Brez',                  prize: 'A 30-min consultation + 3 cases Cadence + 12 cases Drink Magna',                cardImg: '/cards/foil-sig-chrome-010.jpg' },
  { name: 'Ezra Firestone',        company: 'BOOM! Beauty',          prize: '30-min call + Navage Bundle + $1,000 in gift cards + Zipify AOV session',       cardImg: '/cards/foil-sig-chrome-011.jpg' },
  { name: 'John Roman',            company: 'BattlBox',              prize: 'Two one-hour consulting calls',                                                  cardImg: '/cards/foil-sig-chrome-012.jpg' },
  { name: 'Jimmy Kim',             company: 'Commerce Roundtable',   prize: 'Two tickets to Commerce Roundtable',                                            cardImg: '/cards/foil-sig-chrome-013.jpg' },
  { name: 'Zach Stuck',            company: 'Mars Men',              prize: 'A year of Mars Men + a 30-minute consultation',                                  cardImg: '/cards/foil-sig-chrome-014.jpg' },
  { name: 'Andrew Youderian',      company: 'eComFuel',              prize: 'One-year eComFuel membership (or $2,500 ECF Live ticket)',                       cardImg: '/cards/foil-sig-chrome-015.jpg' },
  { name: 'Ronak Shah',            company: 'Obvi',                  prize: 'Three 30-min calls + a year of Obvi + $100 to your chosen charity',              cardImg: '/cards/foil-sig-chrome-016.jpg' },
  { name: 'Josh Haskins',          company: 'Hollow Socks',          prize: 'A year of Hollow Socks + a 30-minute consultation',                              cardImg: '/cards/foil-sig-chrome-017.jpg' },
  { name: 'Isaac Medeiros',        company: 'Content Forge',         prize: 'Three Mini Katana-style videos',                                                 cardImg: '/cards/foil-sig-chrome-018.jpg' },
  { name: 'Michael McVerry',       company: 'Urban Armor Gear',      prize: '$250 in UAG/NomadGoods products + a 30-min ecommerce consultation',              cardImg: '/cards/foil-sig-chrome-019.jpg' },
  { name: 'Paul Jauregui',         company: 'BK Beauty',             prize: 'A $500 BK Beauty gift card',                                                    cardImg: '/cards/foil-sig-chrome-020.jpg' },
  { name: 'Robert Felder',         company: 'Bearbottom Clothing',   prize: 'A 30-minute consultation',                                                      cardImg: '/cards/foil-sig-chrome-021.jpg' },
  { name: 'Jessica Berman',        company: 'BodyBio',               prize: 'A year of BodyBio Cell Essentials + 30-min call + personalized supplement protocol', cardImg: '/cards/foil-sig-chrome-022.jpg' },
  { name: 'Jason Panzer',          company: 'HexClad',               prize: 'A 12-piece HexClad pots and pans set',                                          cardImg: '/cards/foil-sig-chrome-023.jpg' },
  { name: 'Brad Blankinship',      company: 'Sun Day Red',           prize: 'A Sun Day Red care package — polo, hat, and shoes',                              cardImg: '/cards/foil-sig-chrome-024.jpg' },
  { name: 'Scott Kramer',          company: 'Naked & Thriving',      prize: 'A Discovery Kit + 30-min AMA, growth audit, or TikTok Shop consult',             cardImg: '/cards/foil-sig-chrome-025.jpg' },
  { name: 'Drew Arciuolo',         company: 'VKTRY Gear',            prize: 'VKTRY Gold Insoles + Recovery Slides + a 60-minute consultation',                cardImg: '/cards/foil-sig-chrome-028.jpg' },
  { name: 'Sean Riley',            company: 'Dude Wipes',            prize: 'A year of DUDE Wipes + a 30-minute consultation',                               cardImg: '/cards/foil-sig-chrome-030.jpg' },
  { name: 'Rytis Lauris',          company: 'Omnisend',              prize: '30% off Omnisend for 3 months + complimentary migration',                       cardImg: '/cards/sponsor-rytis.jpg' },
  { name: 'Jordan Menard',         company: 'renoux',                prize: 'A one-hour consultation',                                                       cardImg: '/cards/foil-sig-chrome-049.jpg' },
  { name: 'Vicky Williams Grahan', company: 'Coyuchi',               prize: 'A set of Coyuchi sheets + a 30-minute consultation',                             cardImg: '/cards/foil-sig-chrome-050.jpg' },
  { name: 'Andrew Faris',          company: 'AJF Growth',            prize: 'A 30-minute consultation',                                                      cardImg: '/cards/foil-sig-chrome-051.jpg' },
  { name: 'Cody Plofker',          company: 'Winks',                 prize: 'A 12-week supply of Winks + a 30-minute call',                                   cardImg: '/cards/foil-sig-chrome-052.jpg' },
  { name: 'Steven Borrelli',       company: 'CUTS',                  prize: 'A $1,000 CUTS gift card + signed bat + one-hour Zoom call',                     cardImg: '/cards/foil-sig-chrome-053.jpg' },
  { name: "Kayti O'Connell Carr",  company: 'MATE the Label',        prize: 'A $500 MATE the Label gift card',                                                cardImg: '/cards/foil-sig-chrome-054.jpg' },
  { name: 'Chris Lang',            company: 'Fresh Chile',           prize: 'A year of Fresh Chile products + a 30-min ecommerce strategy call',              cardImg: '/cards/foil-sig-chrome-055.jpg' },
  { name: "Bill D'Alessandro",     company: 'Elements Brands',       prize: 'A limited-edition Natural Dog Company tumbler + a 30-min consultation',          cardImg: '/cards/foil-sig-chrome-056.jpg' },
  { name: 'Brian Waddick',         company: "SMACKIN'",              prize: "A year of SMACKIN' + a 30-minute consultation",                                  cardImg: '/cards/foil-sig-chrome-057.jpg' },
  { name: 'Alejandro Chahin',      company: 'Mott & Bow',            prize: 'A $1,000 Mott & Bow gift card + a one-hour consultation',                       cardImg: '/cards/foil-sig-chrome-059.jpg' },
  { name: 'Camron Collard',        company: 'MicroPerfumes',         prize: 'A $250 MicroPerfumes gift card + a hosted round of golf',                        cardImg: '/cards/foil-sig-chrome-072.jpg' },
  { name: 'Cherene Aubert',        company: 'Growth Capital',        prize: 'Two months of Oasis free + a 30-minute growth session',                          cardImg: '/cards/foil-sig-chrome-075.jpg' },
  { name: 'Mark Mastrandrea',      company: 'IKONICK',               prize: 'Two pieces of art from IKONICK',                                                 cardImg: '/cards/foil-sig-chrome-076.jpg' },
  { name: 'Edward Wimmer IV',      company: 'ROAD iD',               prize: '$200 gift card each for ROAD iD, DOG iD, and Rack Rabbit + 30-min consult',     cardImg: '/cards/foil-sig-chrome-077.jpg' },
  { name: 'Ryan Babenzien',        company: 'Jolie',                 prize: 'A Jolie showerhead + a year of filters + three 60-min consultation calls',       cardImg: '/cards/foil-sig-chrome-078.jpg' },
  { name: 'Brian Garofalow',       company: 'Skullcandy',            prize: 'Tony Hawk-signed skateboard deck + Skullcandy package + 30-min consult',         cardImg: '/cards/foil-sig-chrome-080.jpg' },
  { name: 'Dean Brennan',          company: 'Heart & Soil',          prize: 'Flights to Heart & Soil HQ + steak + one-year subscription (US only)',           cardImg: '/cards/foil-sig-chrome-082.jpg' },
  { name: 'Tyler McCann',          company: 'Taste Salud',           prize: 'A year of Taste Salud products + a 30-minute consultation',                      cardImg: '/cards/foil-sig-chrome-083.jpg' },
  { name: 'Jordan Palmer',         company: 'Thread Performance',    prize: 'A 30-minute leadership consultation',                                            cardImg: '/cards/foil-sig-chrome-089.jpg' },
  { name: 'Kevin Lavelle',         company: 'Mizzen+Main',           prize: 'A $750 Mizzen+Main gift card',                                                   cardImg: '/cards/foil-sig-chrome-092.jpg' },
  { name: 'Imagined by X',         company: 'Absolutely Ridiculous', prize: 'A one-of-one custom full-grain cowhide glove + 30-min phone consultation',       cardImg: '/cards/foil-sig-chrome-099.jpg' },
  { name: 'Bryan Cano',            company: 'Made Adaptive',         prize: 'A one-hour consultation',                                                        cardImg: '/cards/foil-sig-chrome-091.jpg' },
  { name: 'Victor Tam',            company: 'Monos',                 prize: 'An aluminum Monos carry-on + a 60-minute consultation',                          cardImg: '/cards/foil-sig-chrome-093.jpg' },
  { name: 'Eric Panofsky',         company: 'SLTWTR',                prize: 'A free site audit or 30 minutes of consulting',                                  cardImg: '/cards/foil-sig-chrome-094.jpg' },
  { name: 'Moiz Ali',              company: 'Native / Fulfil',        prize: 'A conversation with Moiz Ali, founder of Native (acquired by P&G for $100M)',   cardImg: '/cards/sponsor-moiz.jpg' },
]

const PRIZES: Prize[] = [
  {
    id: 'courtside-1',
    tag: 'THE BIG ONE · STILL OUT THERE',
    title: 'COURTSIDE SEATS',
    subtitle: 'OKC THUNDER',
    description: "Pull the Rank #1 chase card and take two courtside seats at a marquee game — flights and hotel covered. The single biggest prize in Series One, and it's still in a pack somewhere.",
    attached: '1/1 CHASE · RANK #1',
    status: 'available',
    featured: true,
    cardImage: '/slabs/slab-p08-gold.png',
  },
]

const STATS = [
  { label: 'GIVEAWAYS',       value: '51'    },
  { label: 'ALREADY CLAIMED', value: '0'     },
  { label: 'TOTAL VALUE',     value: '$100K+' },
]

const STEPS = [
  { num: '01', title: 'PULL THE CARD',    body: "Chase cards and redemption foils are marked on the card face. If you're holding one, you've won." },
  { num: '02', title: 'VERIFY IT',        body: 'Snap the card and its serial, submit through the claim form, and the committee verifies within 48 hours.' },
  { num: '03', title: 'CLAIM YOUR PRIZE', body: 'Once verified, we coordinate the prize directly with you. Claims stay open for 90 days after pull.' },
]

const featured = PRIZES[0]

export default function GiveawaysPage() {
  const shuffled = useMemo(() => {
    const arr = [...GIVEAWAYS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])


  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const isHovering = useRef(false)
  const [showArrows, setShowArrows] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const tick = () => {
      if (!isHovering.current) {
        el.scrollLeft += 0.8
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [shuffled])

  const onSectionEnter = () => { isHovering.current = true; setShowArrows(true) }
  const onSectionLeave = () => { isHovering.current = false; setShowArrows(false) }

  const scrollBy = (dir: number) => {
    containerRef.current?.scrollBy({ left: dir * 780, behavior: 'smooth' })
  }

  return (
    <>
      <SiteNav />

      {/* ── Page header ── */}
      <div className="prizeboard-header">
        <p className="section-eyebrow" style={{ marginBottom: '10px' }}>$100K+ IN GIVEAWAYS</p>
        <h1 className="prizeboard-h1">THE PRIZE BOARD</h1>
        <p className="prizeboard-desc">
          Every card in the set has a real prize attached to it. Pull a card, claim your prize.
          The bigger the rarity, the bigger the reward.
        </p>
        <div className="prizeboard-stats">
          {STATS.map(s => (
            <span key={s.label} className="prizeboard-stat">
              {s.value} <span className="prizeboard-stat-label">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured hero ── */}
      <div className="section-inner prizeboard-inner">
        <div className="prize-hero">
          <div className="prize-hero-text">
            <p className="prize-tag prize-tag--available">{featured.tag}</p>
            <h2 className="prize-hero-title">
              {featured.title}
              {featured.subtitle && <><br />{featured.subtitle}</>}
            </h2>
            <p className="prize-hero-desc">{featured.description}</p>
            <a href="#how" className="btn-teal prize-hero-btn">HOW TO GET A PACK</a>
          </div>
          {featured.cardImage && (
            <div className="prize-hero-card">
              <img src={featured.cardImage} alt="Chase card" draggable={false} />
            </div>
          )}
        </div>
      </div>

      {/* ── Auto-scroll giveaway ticker ── */}
      <style>{`
        div[style*="overflowX: scroll"]::-webkit-scrollbar { display: none; }
        div[style*="overflowX: scroll"]:active { cursor: grabbing; }

        .giveaway-track {
          display: flex;
          gap: 20px;
          width: max-content;
          /* animation handled by JS */
          align-items: flex-start;
          padding: 20px 0;
        }

        .giveaway-tile {
          width: 240px;
          flex-shrink: 0;
          background: var(--surface, #111);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: zoom 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          position: relative;
        }
        .giveaway-tile:hover {
          zoom: 1.12;
          z-index: 20;
          border-color: rgba(3, 159, 157, 0.6);
          box-shadow: 0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(3,159,157,0.4);
        }
        .giveaway-card-img {
          width: 100%;
          aspect-ratio: 864 / 1210;
          overflow: hidden;
          background: #0a0a0a;
          flex-shrink: 0;
        }
        .giveaway-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        .giveaway-text {
          min-height: 130px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-top: 2px solid #039F9D;
          box-sizing: border-box;
          flex-shrink: 0;
          overflow: hidden;
          transition: min-height 0.3s ease;
        }
        .giveaway-tile:hover .giveaway-text {
          min-height: 180px;
          overflow: visible;
        }
        .giveaway-tile:hover .prize-text {
          -webkit-line-clamp: unset !important;
          display: block !important;
        }
      `}</style>
      <div style={{ padding: '0 0 60px' }}>
        <div className="section-inner" style={{ paddingBottom: '16px' }}>
          <h2 className="section-heading" style={{ marginBottom: '6px' }}>EVERY GIVEAWAY IN THE SET</h2>
          <p className="prizeboard-desc" style={{ marginBottom: 0 }}>
            Pull the 1/1 Autograph Chrome card for any person below and the prize is yours.
          </p>
        </div>
        <div
          style={{ position: 'relative' }}
          onMouseEnter={onSectionEnter}
          onMouseLeave={onSectionLeave}
        >
          {/* Left arrow */}
          <button
            onClick={() => scrollBy(-1)}
            style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 30, background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '20px', lineHeight: 1,
              opacity: showArrows ? 1 : 0, transition: 'opacity 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Scroll left"
          >‹</button>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy(1)}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 30, background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '20px', lineHeight: 1,
              opacity: showArrows ? 1 : 0, transition: 'opacity 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Scroll right"
          >›</button>

          <div
            ref={containerRef}
            style={{
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%',
            }}
          >
          <div className="giveaway-track">
            {[...shuffled, ...shuffled].map((g, i) => (
              <div key={i} className="giveaway-tile">
                {g.cardImg && (
                  <div className="giveaway-card-img">
                    <img
                      src={g.cardImg}
                      alt={g.name}
                      draggable={false}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
                <div className="giveaway-text">
                  <p className="prize-text" style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: '#fff', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', letterSpacing: '-0.01em' }}>
                    {g.prize}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* ── How claiming works ── */}
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

      {/* ── GOLDEN TICKETS ── */}
      <div className="section-inner" style={{ paddingTop: '2vw', paddingBottom: '3vw' }}>
        <p className="section-eyebrow" style={{ marginBottom: '10px' }}>SPONSOR PRIZES</p>
        <h2 className="section-heading" style={{ marginBottom: '8px' }}>GOLDEN TICKETS</h2>
        <p className="prizeboard-desc" style={{ marginBottom: '28px' }}>
          Two sponsor Golden Tickets are hidden in packs — pull one and redeem for the prize below.
        </p>
        <div className="golden-tickets-grid">
          <div className="golden-ticket-card">
            <img src="/golden-ticket-fulfil.png" alt="Fulfil Golden Ticket" draggable={false} />
          </div>
          <div className="golden-ticket-card">
            <img src="/golden-ticket-omnisend.png" alt="Omnisend Golden Ticket" draggable={false} />
          </div>
        </div>
      </div>

      {/* ── SPONSOR BAR ── */}
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

      {/* ── CTA ── */}
      <section className="cta-section" style={{ paddingTop: '4vw' }}>
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">734 Packs Left.<br />Zero for Sale.</h2>
          <p className="cta-body">
            Every card has a prize attached.{' '}
            <span style={{ color: 'var(--teal)' }}>51 giveaways</span>. Know where to look.
          </p>
          <a href="/how-it-works" className="btn-cta-outline" style={{ display: 'inline-block' }}>HOW TO GET A PACK</a>
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
