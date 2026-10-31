'use client'
import { PACKS_REMAINING } from '../lib/pack-count'
import { useMemo, useRef, useEffect, useState } from 'react'
import SiteNav from '../components/SiteNav'

type PrizeStatus = 'available' | 'claimed'

interface Prize {
  id: string; tag: string; title: string; subtitle?: string
  description: string; attached: string; status: PrizeStatus
  puller?: string; pulledDate?: string; featured?: boolean; cardImage?: string
}

interface Giveaway {
  name: string; company: string; prize: string; cardImg?: string; backImg?: string; backColor?: string
}

const GIVEAWAYS: Giveaway[] = [
  { name: 'Bart Szaniewski',       company: 'Dad Gang Co.',          prize: 'A one-hour brand-growth consultation',                                          cardImg: '/cards/foil-sig-chrome-001.jpg', backImg: '/giveaway-backs/giveaway-back-v2-008.jpg' },
  { name: 'Bear Handlon',          company: 'Born Primitive',        prize: 'A $1,000 Born Primitive gift card and a 30-minute Zoom call',                   cardImg: '/cards/foil-sig-chrome-002.jpg', backImg: '/giveaway-backs/giveaway-back-v2-016.jpg' },
  { name: 'Ben Cogan',             company: 'Beanstalk',             prize: 'A ticket to Beanstalk',                                                         cardImg: '/cards/foil-sig-chrome-003.jpg', backImg: '/giveaway-backs/giveaway-back-v2-024.jpg' },
  { name: 'Sean Frank',            company: 'Ridge',                 prize: 'A $1,000 Ridge gift card',                                                      cardImg: '/cards/foil-sig-chrome-005.jpg', backImg: '/giveaway-backs/giveaway-back-v2-040.jpg' },
  { name: 'Chad Janis',            company: 'Grüns',                 prize: 'Dinner at any Austin restaurant, or a two-hour roundtable for up to 8',         cardImg: '/cards/foil-sig-chrome-006.jpg', backImg: '/giveaway-backs/giveaway-back-v2-048.jpg' },
  { name: 'Matthew Bertulli',      company: 'Pela',                  prize: 'A one-hour consultation',                                                       cardImg: '/cards/foil-sig-chrome-007.jpg', backImg: '/giveaway-backs/giveaway-back-v2-056.jpg' },
  { name: 'Chris Hall',            company: 'Ecomm Cowboy',          prize: 'Consulting call + show appearance + $1,500 matched ad credits + partner perks', cardImg: '/cards/foil-sig-chrome-008.jpg', backImg: '/giveaway-backs/giveaway-back-v2-064.jpg' },
  { name: 'Mike Beckham',          company: 'Simple Modern',         prize: 'Courtside OKC Thunder ticket + $200 drinkware + a year of Trevi',               cardImg: '/cards/foil-sig-chrome-009.jpg', backImg: '/giveaway-backs/giveaway-back-v2-072.jpg' },
  { name: 'Nick Shackelford',      company: 'Brez',                  prize: 'A 30-min consultation + 3 cases Cadence + 12 cases Drink Magna',                cardImg: '/cards/foil-sig-chrome-010.jpg', backImg: '/giveaway-backs/giveaway-back-v2-080.jpg' },
  { name: 'Ezra Firestone',        company: 'BOOM! Beauty',          prize: '30-min call + Navage Bundle + $1,000 in gift cards + Zipify AOV session',       cardImg: '/cards/foil-sig-chrome-011.jpg', backImg: '/giveaway-backs/giveaway-back-v2-088.jpg' },
  { name: 'John Roman',            company: 'BattlBox',              prize: 'Two one-hour consulting calls',                                                  cardImg: '/cards/foil-sig-chrome-012.jpg', backImg: '/giveaway-backs/giveaway-back-v2-096.jpg' },
  { name: 'Jimmy Kim',             company: 'Commerce Roundtable',   prize: 'Two tickets to Commerce Roundtable',                                            cardImg: '/cards/foil-sig-chrome-013.jpg', backImg: '/giveaway-backs/giveaway-back-v2-104.jpg' },
  { name: 'Zach Stuck',            company: 'Mars Men',              prize: 'A year of Mars Men + a 30-minute consultation',                                  cardImg: '/cards/foil-sig-chrome-014.jpg', backImg: '/giveaway-backs/giveaway-back-v2-112.jpg' },
  { name: 'Andrew Youderian',      company: 'eComFuel',              prize: 'One-year eComFuel membership (or $2,500 ECF Live ticket)',                       cardImg: '/cards/foil-sig-chrome-015.jpg', backImg: '/giveaway-backs/giveaway-back-v2-120.jpg' },
  { name: 'Ronak Shah',            company: 'Obvi',                  prize: 'Three 30-min calls + a year of Obvi + $100 to your chosen charity',              cardImg: '/cards/foil-sig-chrome-016.jpg', backImg: '/giveaway-backs/giveaway-back-v2-128.jpg' },
  { name: 'Josh Haskins',          company: 'Hollow Socks',          prize: 'A year of Hollow Socks + a 30-minute consultation',                              cardImg: '/cards/foil-sig-chrome-017.jpg', backImg: '/giveaway-backs/giveaway-back-v2-136.jpg' },
  { name: 'Isaac Medeiros',        company: 'Content Forge',         prize: 'Three Mini Katana-style videos',                                                 cardImg: '/cards/foil-sig-chrome-018.jpg', backImg: '/giveaway-backs/giveaway-back-v2-144.jpg' },
  { name: 'Michael McVerry',       company: 'Urban Armor Gear',      prize: '$250 in UAG/NomadGoods products + a 30-min ecommerce consultation',              cardImg: '/cards/foil-sig-chrome-019.jpg', backImg: '/giveaway-backs/giveaway-back-v2-152.jpg' },
  { name: 'Paul Jauregui',         company: 'BK Beauty',             prize: 'A $500 BK Beauty gift card',                                                    cardImg: '/cards/foil-sig-chrome-020.jpg', backImg: '/giveaway-backs/giveaway-back-v2-160.jpg' },
  { name: 'Robert Felder',         company: 'Bearbottom Clothing',   prize: 'A 30-minute consultation',                                                      cardImg: '/cards/foil-sig-chrome-021.jpg', backImg: '/giveaway-backs/giveaway-back-v2-168.jpg' },
  { name: 'Jessica Berman',        company: 'BodyBio',               prize: 'A year of BodyBio Cell Essentials + 30-min call + personalized supplement protocol', cardImg: '/cards/foil-sig-chrome-022.jpg', backImg: '/giveaway-backs/giveaway-back-v2-176.jpg' },
  { name: 'Jason Panzer',          company: 'HexClad',               prize: 'A 12-piece HexClad pots and pans set',                                          cardImg: '/cards/foil-sig-chrome-023.jpg', backImg: '/giveaway-backs/giveaway-back-v2-184.jpg' },
  { name: 'Brad Blankinship',      company: 'Sun Day Red',           prize: 'A Sun Day Red care package — polo, hat, and shoes',                              cardImg: '/cards/foil-sig-chrome-024.jpg', backImg: '/giveaway-backs/giveaway-back-v2-192.jpg' },
  { name: 'Scott Kramer',          company: 'Naked & Thriving',      prize: 'A Discovery Kit + 30-min AMA, growth audit, or TikTok Shop consult',             cardImg: '/cards/foil-sig-chrome-025.jpg', backImg: '/giveaway-backs/giveaway-back-v2-200.jpg' },
  { name: 'Drew Arciuolo',         company: 'VKTRY Gear',            prize: 'VKTRY Gold Insoles + Recovery Slides + a 60-minute consultation',                cardImg: '/cards/foil-sig-chrome-028.jpg', backImg: '/giveaway-backs/giveaway-back-v2-224.jpg' },
  { name: 'Sean Riley',            company: 'Dude Wipes',            prize: 'A year of DUDE Wipes + a 30-minute consultation',                               cardImg: '/cards/foil-sig-chrome-030.jpg', backImg: '/giveaway-backs/giveaway-back-v2-240.jpg' },
  { name: 'Jordan Menard',         company: 'renoux',                prize: 'A one-hour consultation',                                                       cardImg: '/cards/foil-sig-chrome-049.jpg', backImg: '/giveaway-backs/giveaway-back-v2-392.jpg' },
  { name: 'Vicky Williams Grahan', company: 'Coyuchi',               prize: 'A set of Coyuchi sheets + a 30-minute consultation',                             cardImg: '/cards/foil-sig-chrome-050.jpg', backImg: '/giveaway-backs/giveaway-back-v2-400.jpg' },
  { name: 'Andrew Faris',          company: 'AJF Growth',            prize: 'A 30-minute consultation',                                                      cardImg: '/cards/foil-sig-chrome-051.jpg', backImg: '/giveaway-backs/giveaway-back-v2-408.jpg' },
  { name: 'Cody Plofker',          company: 'Winks',                 prize: 'A 12-week supply of Winks + a 30-minute call',                                   cardImg: '/cards/foil-sig-chrome-052.jpg', backImg: '/giveaway-backs/giveaway-back-v2-416.jpg' },
  { name: 'Steven Borrelli',       company: 'CUTS',                  prize: 'A $1,000 CUTS gift card + signed bat + one-hour Zoom call',                     cardImg: '/cards/foil-sig-chrome-053.jpg', backImg: '/giveaway-backs/giveaway-back-v2-424.jpg' },
  { name: "Kayti O'Connell Carr",  company: 'MATE the Label',        prize: 'A $500 MATE the Label gift card',                                                cardImg: '/cards/foil-sig-chrome-054.jpg', backImg: '/giveaway-backs/giveaway-back-v2-432.jpg' },
  { name: 'Chris Lang',            company: 'Fresh Chile',           prize: 'A year of Fresh Chile products + a 30-min ecommerce strategy call',              cardImg: '/cards/foil-sig-chrome-055.jpg', backImg: '/giveaway-backs/giveaway-back-v2-440.jpg' },
  { name: "Bill D'Alessandro",     company: 'Elements Brands',       prize: 'A limited-edition Natural Dog Company tumbler + a 30-min consultation',          cardImg: '/cards/foil-sig-chrome-056.jpg', backImg: '/giveaway-backs/giveaway-back-v2-448.jpg' },
  { name: 'Brian Waddick',         company: "SMACKIN'",              prize: "A year of SMACKIN' + a 30-minute consultation",                                  cardImg: '/cards/foil-sig-chrome-057.jpg', backImg: '/giveaway-backs/giveaway-back-v2-456.jpg' },
  { name: 'Alejandro Chahin',      company: 'Mott & Bow',            prize: 'A $1,000 Mott & Bow gift card + a one-hour consultation',                       cardImg: '/cards/foil-sig-chrome-059.jpg', backImg: '/giveaway-backs/giveaway-back-v2-472.jpg' },
  { name: 'Camron Collard',        company: 'MicroPerfumes',         prize: 'A $250 MicroPerfumes gift card + a hosted round of golf',                        cardImg: '/cards/foil-sig-chrome-072.jpg', backImg: '/giveaway-backs/giveaway-back-v2-576.jpg' },
  { name: 'Cherene Aubert',        company: 'Growth Capital',        prize: 'Two months of Oasis free + a 30-minute growth session',                          cardImg: '/cards/foil-sig-chrome-075.jpg', backImg: '/giveaway-backs/giveaway-back-v2-600.jpg' },
  { name: 'Mark Mastrandrea',      company: 'IKONICK',               prize: 'Two pieces of art from IKONICK',                                                 cardImg: '/cards/foil-sig-chrome-076.jpg', backImg: '/giveaway-backs/giveaway-back-v2-608.jpg' },
  { name: 'Edward Wimmer IV',      company: 'ROAD iD',               prize: '$200 gift card each for ROAD iD, DOG iD, and Rack Rabbit + 30-min consult',     cardImg: '/cards/foil-sig-chrome-077.jpg', backImg: '/giveaway-backs/giveaway-back-v2-616.jpg' },
  { name: 'Ryan Babenzien',        company: 'Jolie',                 prize: 'A Jolie showerhead + a year of filters + three 60-min consultation calls',       cardImg: '/cards/foil-sig-chrome-078.jpg', backImg: '/giveaway-backs/giveaway-back-v2-624.jpg' },
  { name: 'Brian Garofalow',       company: 'Skullcandy',            prize: 'Tony Hawk-signed skateboard deck + Skullcandy package + 30-min consult',         cardImg: '/cards/foil-sig-chrome-080.jpg', backImg: '/giveaway-backs/giveaway-back-v2-640.jpg' },
  { name: 'Dean Brennan',          company: 'Heart & Soil',          prize: 'Flights to Heart & Soil HQ + steak + one-year subscription (US only)',           cardImg: '/cards/foil-sig-chrome-082.jpg', backImg: '/giveaway-backs/giveaway-back-v2-656.jpg' },
  { name: 'Tyler McCann',          company: 'Taste Salud',           prize: 'A year of Taste Salud products + a 30-minute consultation',                      cardImg: '/cards/foil-sig-chrome-083.jpg', backImg: '/giveaway-backs/giveaway-back-v2-664.jpg' },
  { name: 'Jordan Palmer',         company: 'Thread Performance',    prize: 'A 30-minute leadership consultation',                                            cardImg: '/cards/foil-sig-chrome-089.jpg', backImg: '/giveaway-backs/giveaway-back-v2-712.jpg' },
  { name: 'Kevin Lavelle',         company: 'Mizzen+Main',           prize: 'A $750 Mizzen+Main gift card',                                                   cardImg: '/cards/foil-sig-chrome-092.jpg', backImg: '/giveaway-backs/giveaway-back-v2-736.jpg' },
  { name: 'Imagined by X',         company: 'Absolutely Ridiculous', prize: 'A one-of-one custom full-grain cowhide glove + 30-min phone consultation',       cardImg: '/cards/foil-sig-chrome-099.jpg', backImg: '/giveaway-backs/giveaway-back-v2-792.jpg' },
  { name: 'Bryan Cano',            company: 'Made Adaptive',         prize: 'A one-hour consultation',                                                        cardImg: '/cards/foil-sig-chrome-091.jpg', backImg: '/giveaway-backs/giveaway-back-v2-728.jpg' },
  { name: 'Victor Tam',            company: 'Monos',                 prize: 'An aluminum Monos carry-on + a 60-minute consultation',                          cardImg: '/cards/foil-sig-chrome-093.jpg', backImg: '/giveaway-backs/giveaway-back-v2-744.jpg' },
  { name: 'Eric Panofsky',         company: 'SLTWTR',                prize: 'A free site audit or 30 minutes of consulting',                                  cardImg: '/cards/foil-sig-chrome-094.jpg', backImg: '/giveaway-backs/giveaway-back-v2-752.jpg' }
]

const PRIZES: Prize[] = [
  {
    id: 'courtside-1',
    tag: 'WHAT YOU COULD WIN',
    title: 'COURTSIDE SEATS',
    subtitle: 'OKC THUNDER',
    description: "Win Mike Beckham's 1/1 autograph card and get two courtside seats at an Oklahoma City Thunder game. The single biggest prize and it's still in a pack somewhere.",
    attached: '1/1 CHASE · RANK #1',
    status: 'available',
    featured: true,
    cardImage: '/slabs/slab-p08-chrome.png',
  }
]

const TOTAL_GIVEAWAYS = 51
const CLAIMED_GIVEAWAYS = 0

const STEPS = [
  { num: '01', title: 'PHOTOGRAPH YOUR CARD', body: 'Take a clear photo of<br />your Golden Ticket.' },
  { num: '02', title: 'EMAIL YOUR PHOTO',      body: 'Email your photo for verification:<br /><a href="mailto:hello@commonthreadco.com" style="color:#039F9D;text-decoration:none">hello@commonthreadco.com</a>' },
  { num: '03', title: 'CLAIM YOUR PRIZE',      body: "Once verified, we'll coordinate<br />your Golden Ticket prize." }
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
    let visible = false
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    observer.observe(el)
    const tick = () => {
      if (!isHovering.current && visible) {
        el.scrollLeft += 0.8
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); observer.disconnect() }
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
      <div className="prizeboard-header" style={{ maxWidth: 'none', padding: '80px 6vw 32px' }}>
        <h1 className="prizeboard-h1">$50K IN REAL PRIZES</h1>
        <p className="prizeboard-desc" style={{ maxWidth: '680px' }}>
          Win any 1/1 autograph card or pull a Golden Ticket,<br />and the products, gift cards, or experiences attached are yours.<br /><br />
          <strong style={{color:'var(--olive)',fontWeight:700}}>Keep the card. Claim what comes with it.</strong>
        </p>
        <div className="prizeboard-tracker">
          <div className="prizeboard-tracker-labels">
            <span className="prizeboard-tracker-count"><span style={{color:'var(--teal)'}}>{CLAIMED_GIVEAWAYS}</span> <span className="prizeboard-tracker-label">CLAIMED</span></span>
            <span className="prizeboard-tracker-count"><span style={{color:'var(--white)'}}>{TOTAL_GIVEAWAYS}</span> <span className="prizeboard-tracker-label">TOTAL</span></span>
          </div>
          <div className="prizeboard-track">
            <div className="prizeboard-fill" style={{width: `${Math.round((CLAIMED_GIVEAWAYS / TOTAL_GIVEAWAYS) * 100)}%`}} />
          </div>
          <p className="prizeboard-tracker-sub">{TOTAL_GIVEAWAYS - CLAIMED_GIVEAWAYS} STILL UNCLAIMED</p>
        </div>
      </div>

      {/* ── Featured hero ── */}
      <div style={{ padding: '40px 6vw 48px', maxWidth: 'none' }}>
        <div className="prize-hero">
          <div className="prize-hero-text">
            <p className="prize-tag prize-tag--available">{featured.tag}</p>
            <h2 className="prize-hero-title">
              {featured.title}
              {featured.subtitle && <><br />{featured.subtitle}</>}
            </h2>
            <p className="prize-hero-desc" style={{ maxWidth: '520px' }}>{featured.description}</p>

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
        @keyframes giveaway-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        div[style*="overflowX: scroll"]::-webkit-scrollbar { display: none; }
        div[style*="overflowX: scroll"]:active { cursor: grabbing; }

        .giveaway-track {
          display: flex;
          gap: 20px;
          width: max-content;
          align-items: flex-start;
          padding: 20px 24px;
        }

        /* Flip card */
        .giveaway-tile {
          width: 240px;
          aspect-ratio: 864 / 1210;
          flex-shrink: 0;
          perspective: 1000px;
          cursor: pointer;
        }
        .giveaway-tile:hover { z-index: 20; }

        .giveaway-flipper {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 8px;
        }
        .giveaway-flipper { transform: rotateY(180deg); }
        .giveaway-tile:hover .giveaway-flipper {
          transform: rotateY(0deg);
        }

        .giveaway-face {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .giveaway-face-front img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .giveaway-face-back {
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 20px 16px 14px;
          text-align: center;
          box-sizing: border-box;
        }
        .giveaway-back-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .giveaway-back-name {
          font-family: var(--font-antonio, sans-serif);
          font-size: 18px;
          font-weight: 900;
          color: #0d0d0d;
          text-transform: uppercase;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .giveaway-back-company {
          font-family: var(--font-antonio, sans-serif);
          font-size: 11px;
          font-weight: 700;
          color: #0d0d0d;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          opacity: 0.75;
        }
        .giveaway-back-box {
          background: #fff;
          border-radius: 6px;
          padding: 14px 14px 16px;
          flex: 1;
          margin: 12px 0;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .giveaway-back-label {
          background: #0d0d0d;
          color: #fff;
          font-family: var(--font-antonio, sans-serif);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 20px;
        }
        .giveaway-back-prize {
          font-size: 14px;
          font-weight: 700;
          color: #0d0d0d;
          line-height: 1.45;
          text-align: center;
        }
      `}</style>
      <div style={{ padding: '0 0 60px' }}>
        <div className="section-inner" style={{ paddingBottom: '16px' }}>
          <h2 className="section-heading" style={{ marginBottom: '6px' }}>EVERY PRIZE IN THE SET</h2>
          <p className="prizeboard-desc" style={{ marginBottom: 0 }}>
            Here&apos;s what the leaders behind <span style={{color:'var(--teal)'}}>&#35;SHOPPS</span> are sharing with the community.
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
                <div className="giveaway-flipper">
                  {/* Front */}
                  <div className="giveaway-face giveaway-face-front">
                    {g.cardImg && (
                      <img src={g.cardImg} alt={g.name} draggable={false}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    )}
                  </div>
                  {/* Back — rendered giveaway card back image */}
                  <div className="giveaway-face giveaway-face-back">
                    {g.backImg ? (
                      <img src={g.backImg} alt={g.name + ' giveaway'} draggable={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '4px' }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: g.backColor ?? '#e8a111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', boxSizing: 'border-box', borderRadius: '4px' }}>
                        <p style={{ margin: 0, fontFamily: 'var(--font-antonio)', fontSize: '11px', fontWeight: 900, color: '#0d0d0d', textTransform: 'uppercase', textAlign: 'center' }}>{g.name}</p>
                        <p style={{ margin: '3px 0 8px', fontFamily: 'var(--font-antonio)', fontSize: '9px', color: '#0d0d0d', textTransform: 'uppercase', textAlign: 'center' }}>{g.company}</p>
                        <div style={{ background: '#fff', borderRadius: '8px', flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                          <p style={{ margin: 0, fontFamily: 'var(--font-antonio)', fontSize: '10px', color: '#0d0d0d', textAlign: 'center', lineHeight: 1.3 }}>{g.prize}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* ── GOLDEN TICKETS ── */}
      <div className="section-inner" style={{ paddingTop: '2vw', paddingBottom: '3vw' }}>
        <h2 className="section-heading" style={{ marginBottom: '8px' }}>GOLDEN TICKETS</h2>
        <p className="prizeboard-desc" style={{ marginBottom: '28px' }} dangerouslySetInnerHTML={{__html: 'Pull one from a pack and claim a prize from our sponsors, <a href="https://www.fulfil.io/" target="_blank" rel="noopener noreferrer" style="color:#039F9D;text-decoration:none">Fulfil</a> and <a href="https://www.omnisend.com/" target="_blank" rel="noopener noreferrer" style="color:#039F9D;text-decoration:none">Omnisend</a>.'}} />
        <div className="golden-tickets-grid">
          <div className="golden-ticket-card">
            <img src="/golden-ticket-fulfil.png" alt="Fulfil Golden Ticket" draggable={false} />
          </div>
          <div className="golden-ticket-card">
            <img src="/golden-ticket-omnisend.png" alt="Omnisend Golden Ticket" draggable={false} />
          </div>
        </div>
      </div>

      {/* ── How claiming works ── */}
      <section className="howto-section" id="how" style={{ background: 'var(--bg)', padding: '5vw 0 2vw', scrollMarginTop: '60px' }}>
        <div className="section-inner">
          <p className="section-eyebrow">PULLED A GOLDEN TICKET?</p>
          <h2 className="section-heading">How Claiming Works</h2>
          <div className="howto-steps howto-steps--3col">
            {STEPS.map(step => (
              <div key={step.num} className="howto-step">
                <div className="howto-num">{step.num}</div>
                <h4 className="howto-title">{step.title}</h4>
                <p className="howto-body" dangerouslySetInnerHTML={{__html: step.body}} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SPONSOR BAR ── */}
      <p className="sponsor-label" style={{fontSize:'18px',fontWeight:'700',letterSpacing:'0.12em'}}>THANK YOU TO OUR SPONSORS</p>
      <div className="ticker-wrap">
        {(['Fulfil','omnisend','Fulfil','omnisend','Fulfil','omnisend'] as const).map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', minWidth: 0 }}>
            <img
              src={label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
              alt={label}
              style={{ height: label === 'omnisend' ? '18px' : '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ paddingTop: '4vw' }}>
        <div className="cta-glow" />
        <div className="cta-inner">
          <img src="/shopps-s-icon-v2.png" alt="S" className="cta-s-icon" />
          <h2 className="cta-heading">ONLY 1,000 PACKS EXIST.<br /><span style={{color:'var(--olive)'}}>{PACKS_REMAINING}</span> PACKS REMAIN.</h2>

          <a href="/get-a-pack" className="btn-cta-outline" style={{ display: 'inline-block' }}>GET A PACK</a>
        </div>
      </section>

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">2026 COMMON THREAD COLLECTIVE. ALL RIGHTS RESERVED. THIS PRODUCT IS NOT ENDORSED OR AFFILIATED WITH ANY ORGANIZATION OR TEAM. PRINTED IN THE U.S.A.</p>
        <a href="https://commonthreadco.com/" target="_blank" rel="noopener noreferrer"><img src="/ctc-icon.png" alt="Common Thread Collective" className="footer-ctc-logo" /></a>
      </footer>
    </>
  )
}
