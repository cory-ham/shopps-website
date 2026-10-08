'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

/* ─────────────────────────────────────────────────────────
   /set — The Top 100
   Card formula (8 pages per person):
     green front : card-${8*p+1}
     teal  front : card-${8*p+3}
     gold  front : card-${8*p+5}
   Cards exist up to 792 → cap at p=98
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

const PEOPLE = [
  { p: 0,  name: 'Bart Szaniewski',          company: 'Dad Gang Co.',             cat: 'founders',  oneOfOne: false },
  { p: 1,  name: 'Bear Handlon',             company: 'Born Primitive',           cat: 'founders',  oneOfOne: true  },
  { p: 2,  name: 'Ben Cogan',                company: 'Beanstalk',                cat: 'builders',  oneOfOne: false },
  { p: 3,  name: 'Chase Dimond',             company: 'Ecom Email Marketer',      cat: 'creators',  oneOfOne: false },
  { p: 4,  name: 'Sean Frank',               company: 'Ridge',                    cat: 'founders',  oneOfOne: true  },
  { p: 5,  name: 'Chad Janis',               company: 'Grüns',                    cat: 'founders',  oneOfOne: false },
  { p: 6,  name: 'Matthew Bertulli',         company: 'Pela',                     cat: 'founders',  oneOfOne: false },
  { p: 7,  name: 'Chris Hall',               company: 'Ecomm Cowboy',             cat: 'creators',  oneOfOne: false },
  { p: 8,  name: 'Mike Beckham',             company: 'Simple Modern',            cat: 'founders',  oneOfOne: true  },
  { p: 9,  name: 'Nick Shackelford',         company: 'Brez',                     cat: 'builders',  oneOfOne: false },
  { p: 10, name: 'Ezra Firestone',           company: 'Boom! Beauty',             cat: 'founders',  oneOfOne: true  },
  { p: 11, name: 'John Roman',               company: 'Battlbox',                 cat: 'founders',  oneOfOne: false },
  { p: 12, name: 'Jimmy Kim',                company: 'Commerce Roundtable',      cat: 'operators', oneOfOne: false },
  { p: 13, name: 'Zach Stuck',               company: 'Homestead',                cat: 'builders',  oneOfOne: false },
  { p: 14, name: 'Andrew Youderian',         company: 'eComFuel',                 cat: 'creators',  oneOfOne: false },
  { p: 15, name: 'Ronak Shah',               company: 'Obvi',                     cat: 'founders',  oneOfOne: false },
  { p: 16, name: 'Josh Haskins',             company: 'Hollow Socks',             cat: 'founders',  oneOfOne: false },
  { p: 17, name: 'Isaac Medeiros',           company: 'Content Forge',            cat: 'creators',  oneOfOne: false },
  { p: 18, name: 'Michael McVerry',          company: 'Urban Armor Gear',         cat: 'operators', oneOfOne: false },
  { p: 19, name: 'Paul Jauregui',            company: 'BK Beauty',                cat: 'founders',  oneOfOne: false },
  { p: 20, name: 'Robert Felder',            company: 'Bearbottom Clothing',      cat: 'founders',  oneOfOne: false },
  { p: 21, name: 'Jessica Berman',           company: 'BodyBio',                  cat: 'operators', oneOfOne: false },
  { p: 22, name: 'Jason Panzer',             company: 'HexClad',                  cat: 'operators', oneOfOne: false },
  { p: 23, name: 'Brad Blankinship',         company: 'Sun Day Red',              cat: 'operators', oneOfOne: false },
  { p: 24, name: 'Scott Kramer',             company: 'Naked & Thriving',         cat: 'operators', oneOfOne: false },
  { p: 25, name: 'Katrina Lake',             company: 'Stitch Fix',               cat: 'founders',  oneOfOne: true  },
  { p: 26, name: 'Cassandra Thurswell',      company: 'Kitsch',                   cat: 'founders',  oneOfOne: false },
  { p: 27, name: 'Drew Arciuolo',            company: 'VKTRY Gear',               cat: 'operators', oneOfOne: false },
  { p: 28, name: 'Bethany Catron Evans',     company: 'Rhone',                    cat: 'operators', oneOfOne: false },
  { p: 29, name: 'Sean Riley',               company: 'Dude Wipes',               cat: 'founders',  oneOfOne: false },
  { p: 30, name: 'Lindsay Shumlas',          company: 'Cotopaxi',                 cat: 'operators', oneOfOne: false },
  { p: 31, name: 'Andrea Faulkner Williams', company: 'Tubby Todd',               cat: 'founders',  oneOfOne: false },
  { p: 32, name: 'Kimberley Ho',             company: 'Everden',                  cat: 'founders',  oneOfOne: false },
  { p: 33, name: 'Siffat Haider',            company: 'Arrae',                    cat: 'founders',  oneOfOne: false },
  { p: 34, name: 'Tiffani Carter',           company: 'Pattern Beauty',           cat: 'operators', oneOfOne: false },
  { p: 35, name: 'Erica Good',               company: 'Momentous',                cat: 'founders',  oneOfOne: false },
  { p: 36, name: 'Ariana Ferwerda',          company: 'Halfdays',                 cat: 'founders',  oneOfOne: false },
  { p: 37, name: 'Rashad Hossain',           company: 'Ryze Superfoods',          cat: 'founders',  oneOfOne: false },
  { p: 38, name: 'Sophia Edelstein',         company: 'Pair Eyewear',             cat: 'founders',  oneOfOne: false },
  { p: 39, name: 'Jill Layfield',            company: 'Birdy Grey',               cat: 'founders',  oneOfOne: false },
  { p: 40, name: 'Gorjana Reidel',           company: 'Gorjana',                  cat: 'founders',  oneOfOne: false },
  { p: 41, name: 'Anisha Raghavan',          company: 'Seed Health',              cat: 'operators', oneOfOne: false },
  { p: 42, name: 'Sarah Rahal',              company: 'ARMRA',                    cat: 'founders',  oneOfOne: false },
  { p: 43, name: 'Andrew Benin',             company: 'Graza',                    cat: 'founders',  oneOfOne: false },
  { p: 44, name: 'Katerina Schneider',       company: 'Ritual',                   cat: 'founders',  oneOfOne: true  },
  { p: 45, name: 'Jordan Nathan',            company: 'Caraway Home',             cat: 'founders',  oneOfOne: false },
  { p: 46, name: 'Maradith Frenkel',         company: 'Little Sleepies',          cat: 'founders',  oneOfOne: false },
  { p: 47, name: 'Michelle Miller',          company: 'VEGAMOUR',                 cat: 'operators', oneOfOne: false },
  { p: 48, name: 'Jordan Menard',            company: 'Renoux',                   cat: 'founders',  oneOfOne: false },
  { p: 49, name: 'Vicky Williams Grahan',    company: 'Coyuchi',                  cat: 'operators', oneOfOne: false },
  { p: 50, name: 'Andrew Faris',             company: 'AJF Growth',               cat: 'builders',  oneOfOne: false },
  { p: 51, name: 'Cody Plofker',             company: 'Winks',                    cat: 'founders',  oneOfOne: false },
  { p: 52, name: 'Steven Borrelli',          company: 'CUTS',                     cat: 'founders',  oneOfOne: false },
  { p: 53, name: "Kayti O'Connell Carr",     company: 'MATE the Label',           cat: 'founders',  oneOfOne: false },
  { p: 54, name: 'Chris Lang',               company: 'Fresh Chile',              cat: 'founders',  oneOfOne: false },
  { p: 55, name: "Bill D'Alessandro",        company: 'Elements Brands',          cat: 'builders',  oneOfOne: false },
  { p: 56, name: 'Brian Waddick',            company: "SMACKIN'",                 cat: 'founders',  oneOfOne: false },
  { p: 57, name: 'The Normal Brand Team',    company: 'The Normal Brand',         cat: 'founders',  oneOfOne: false },
  { p: 58, name: 'Alejandro Chahin',         company: 'Mott & Bow',               cat: 'founders',  oneOfOne: false },
  { p: 59, name: 'Ariel Kaye',               company: 'Parachute Home',           cat: 'founders',  oneOfOne: false },
  { p: 60, name: 'Mari Llewellyn',           company: 'Bloom Nutrition',          cat: 'founders',  oneOfOne: false },
  { p: 61, name: 'Hudson Leogrande',         company: 'Comfrt',                   cat: 'founders',  oneOfOne: false },
  { p: 62, name: 'Matteo Franceschetti',     company: 'Eight Sleep',              cat: 'founders',  oneOfOne: true  },
  { p: 63, name: 'Peter Rahal',              company: 'David Protein',            cat: 'founders',  oneOfOne: false },
  { p: 64, name: 'Will Ahmed',               company: 'WHOOP',                    cat: 'founders',  oneOfOne: true  },
  { p: 65, name: 'Gurmer Chopra',            company: 'YoungLA',                  cat: 'founders',  oneOfOne: false },
  { p: 66, name: 'Nell Diamond',             company: 'Hill House Home',          cat: 'founders',  oneOfOne: false },
  { p: 67, name: 'Justin Mares',             company: 'Kettle & Fire',            cat: 'founders',  oneOfOne: false },
  { p: 68, name: 'Danny Yeung',              company: 'Prenetics',                cat: 'founders',  oneOfOne: false },
  { p: 69, name: 'Tero Isokauppila',         company: 'Four Sigmatic',            cat: 'founders',  oneOfOne: false },
  { p: 70, name: 'Sarah Paiji Yoo',          company: 'Blueland',                 cat: 'founders',  oneOfOne: false },
  { p: 71, name: 'Camron Collard',           company: 'MicroPerfumes',            cat: 'founders',  oneOfOne: false },
  { p: 72, name: 'Christian Guzman',         company: 'Alphalete Athletics',      cat: 'creators',  oneOfOne: false },
  { p: 73, name: 'Paul Hedrick',             company: 'Tecovas',                  cat: 'founders',  oneOfOne: false },
  { p: 74, name: 'Cherene Aubert',           company: 'Growth Capital',           cat: 'builders',  oneOfOne: false },
  { p: 75, name: 'Mark Mastrandrea',         company: 'Ikonick',                  cat: 'founders',  oneOfOne: false },
  { p: 76, name: 'Edward Wimmer IV',         company: 'Road ID',                  cat: 'founders',  oneOfOne: false },
  { p: 77, name: 'Ryan Babenzien',           company: 'Jolie',                    cat: 'founders',  oneOfOne: false },
  { p: 78, name: 'Beav Brodie',              company: 'Tactical Baby Gear',       cat: 'founders',  oneOfOne: false },
  { p: 79, name: 'Brian Garofalow',          company: 'Skullcandy',               cat: 'operators', oneOfOne: false },
  { p: 80, name: 'Katy Mimari',              company: 'Caden Lane',               cat: 'founders',  oneOfOne: false },
  { p: 81, name: 'Dean Brennan',             company: 'Heart & Soil',             cat: 'founders',  oneOfOne: false },
  { p: 82, name: 'Tyler McCann',             company: 'Taste Salud',              cat: 'founders',  oneOfOne: false },
  { p: 83, name: 'Roman Khan',               company: 'Raycon Global',            cat: 'founders',  oneOfOne: false },
  { p: 84, name: 'Josh Shapiro',             company: 'Baseball Lifestyle 101',   cat: 'founders',  oneOfOne: false },
  { p: 85, name: 'Bill Rom',                 company: 'Baseball Lifestyle 101',   cat: 'operators', oneOfOne: false },
  { p: 86, name: 'Curtis Matsko',            company: 'Portland Leather',         cat: 'founders',  oneOfOne: false },
  { p: 87, name: 'Eric Girouard',            company: 'BRUNT',                    cat: 'founders',  oneOfOne: false },
  { p: 88, name: 'Jordan Palmer',            company: 'Thread Performance',       cat: 'builders',  oneOfOne: false },
  { p: 89, name: 'Ari Murray',               company: 'Salt & Stone',             cat: 'builders',  oneOfOne: false },
  { p: 90, name: 'Bryan Cano',               company: 'Made Adaptive',            cat: 'founders',  oneOfOne: false },
  { p: 91, name: 'Kevin Lavelle',            company: 'Mizzen+Main',              cat: 'founders',  oneOfOne: false },
  { p: 92, name: 'Victor Tam',               company: 'Monos',                    cat: 'founders',  oneOfOne: false },
  { p: 93, name: 'Eric Panofsky',            company: 'SLTWTR',                   cat: 'founders',  oneOfOne: false },
  { p: 94, name: 'Mehtab Bhogal',            company: 'Karta Ventures',           cat: 'builders',  oneOfOne: false },
  { p: 95, name: 'Freddy Ward',              company: 'Wild',                     cat: 'founders',  oneOfOne: false },
  { p: 96, name: 'Sienna McCormick',         company: 'Create Wellness',          cat: 'founders',  oneOfOne: false },
  { p: 97, name: 'Taylor Holiday',           company: 'Common Thread Collective', cat: 'operators', oneOfOne: true  },
  { p: 98, name: 'Mystery Card',             company: 'Absolutely Ridiculous',    cat: 'founders',  oneOfOne: false },
]

type Variant = 0 | 1 | 2

const DOT_COLORS: Record<Variant, string> = {
  0: '#2d7a3a',
  1: '#039F9D',
  2: '#c9a227',
}

function cardSrc(p: number, variant: Variant): string {
  const offsets: [number, number, number] = [1, 3, 5]
  const num = 8 * p + offsets[variant]
  return `/cards/card-${String(num).padStart(3, '0')}.jpg`
}

const FILTERS = ['ALL', 'FOUNDERS', 'OPERATORS', 'BUILDERS', 'CREATORS', '1 OF 1'] as const

export default function SetPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [search, setSearch] = useState('')
  const [variants, setVariants] = useState<Record<number, Variant>>({})

  function getVariant(p: number): Variant {
    return (variants[p] ?? 0) as Variant
  }

  function cycleVariant(p: number) {
    setVariants(prev => ({
      ...prev,
      [p]: (((prev[p] ?? 0) + 1) % 3) as Variant,
    }))
  }

  const filtered = useMemo(() => {
    return PEOPLE.filter(person => {
      if (activeFilter === '1 OF 1') {
        if (!person.oneOfOne) return false
      } else if (activeFilter !== 'ALL') {
        if (person.cat !== activeFilter.toLowerCase()) return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        if (
          !person.name.toLowerCase().includes(q) &&
          !person.company.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [activeFilter, search])

  return (
    <>
      {/* ──────────────────── NAV ──────────────────── */}
      <nav className="site-nav">
        <div className="nav-left">
          <Link href="/set" className="nav-link" style={{ color: 'rgba(245,248,248,0.9)' }}>THE SET</Link>
          <a href="#" className="nav-link">GIVEAWAYS</a>
          <a href="#" className="nav-link">PULLS</a>
        </div>

        <div className="nav-logo-wrap">
          <img src="/shopps-logo.png" alt="SHOPPS" className="nav-logo" />
        </div>

        <div className="nav-right">
          <a href="#" className="nav-link">HOW IT WORKS</a>
          <a href="#" className="nav-link">NOMINATE</a>
          <a href="#" className="nav-live">LIVE</a>
        </div>

        <button
          className="nav-hamburger"
          aria-label="Menu"
          onClick={() => document.body.classList.toggle('nav-open')}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className="nav-drawer" onClick={() => document.body.classList.remove('nav-open')}>
        <div className="nav-drawer-inner" onClick={e => e.stopPropagation()}>
          <Link href="/set" className="nav-drawer-link" onClick={() => document.body.classList.remove('nav-open')}>The Set</Link>
          <a href="#" className="nav-drawer-link" onClick={() => document.body.classList.remove('nav-open')}>Giveaways</a>
          <a href="#" className="nav-drawer-link" onClick={() => document.body.classList.remove('nav-open')}>Pulls</a>
          <a href="#" className="nav-drawer-link" onClick={() => document.body.classList.remove('nav-open')}>How it Works</a>
          <a href="#" className="nav-drawer-link" onClick={() => document.body.classList.remove('nav-open')}>Nominate</a>
          <a href="#" className="nav-drawer-live" onClick={() => document.body.classList.remove('nav-open')}>LIVE</a>
        </div>
      </div>

      {/* ── SPONSOR STRIP — static ── */}
      <div className="ticker-wrap">
        {TICKER_ITEMS.map((item, i) => (
          <img
            key={i}
            src={item.label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
            alt={item.label}
            style={{
              height: item.label === 'Fulfil' ? '20px' : '18px',
              width: 'auto',
              display: 'block',
              opacity: 0.55,
              filter: item.label === 'omnisend' ? 'invert(1) brightness(2)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ──────────────────── PAGE HEADER ──────────────────── */}
      <div className="set-page-header">
        <p className="set-eyebrow">SERIES ONE · 2026 EDITION</p>
        <h1 className="set-h1">THE TOP 100</h1>
        <p className="set-intro">
          Every card in the set — the operators, founders, and builders shaping ecommerce right now. Tap any card for the full bio.
        </p>
        <div className="set-stat-pills">
          <span className="set-stat-pill">100 PLAYERS</span>
          <span className="set-stat-pill">3 TIERS</span>
          <span className="set-stat-pill">10 ONE-OF-ONES</span>
          <span className="set-stat-pill">4 CATEGORIES</span>
        </div>
      </div>

      {/* ──────────────────── FILTER BAR ──────────────────── */}
      <div className="set-filter-bar">
        <div className="set-filter-row">
          <div className="set-filter-pills">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`set-filter-pill${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            className="set-search-input"
            type="text"
            placeholder="Search a name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <p className="set-showing">SHOWING {filtered.length} OF {PEOPLE.length} CARDS</p>
      </div>

      {/* ──────────────────── CARD GRID ──────────────────── */}
      <div className="set-grid">
        {filtered.map(person => {
          const v = getVariant(person.p)
          const src = cardSrc(person.p, v)
          return (
            <div
              key={person.p}
              className="set-card-cell"
              onClick={() => cycleVariant(person.p)}
              title={`${person.name} — click to cycle variant`}
            >
              <img src={src} alt={person.name} draggable={false} />
              <div className="set-card-overlay">
                <p className="set-card-name">{person.name}</p>
                <p className="set-card-company">{person.company}</p>
              </div>
              <span
                className="set-variant-dot"
                style={{ background: DOT_COLORS[v] }}
              />
            </div>
          )
        })}
      </div>

      {/* ──────────────────── FOOTER ──────────────────── */}
      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">© 2026 SHOPPS. All rights reserved.</p>
      </footer>
    </>
  )
}
