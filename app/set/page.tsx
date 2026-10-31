'use client'
import SiteNav from '../components/SiteNav'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

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
]

const PEOPLE = [
  { p: 0,  name: 'Bart Szaniewski',          company: 'Dad Gang Co.',             cat: 'base',  oneOfOne: false },
  { p: 1,  name: 'Bear Handlon',             company: 'Born Primitive',           cat: 'base',  oneOfOne: true  },
  { p: 2,  name: 'Ben Cogan',                company: 'Beanstalk',                cat: 'base',  oneOfOne: false },
  { p: 3,  name: 'Chase Dimond',             company: 'Ecom Email Marketer',      cat: 'base',  oneOfOne: false },
  { p: 4,  name: 'Sean Frank',               company: 'Ridge',                    cat: 'base',  oneOfOne: true  },
  { p: 5,  name: 'Chad Janis',               company: 'Grüns',                    cat: 'base',  oneOfOne: false },
  { p: 6,  name: 'Matthew Bertulli',         company: 'Pela',                     cat: 'base',  oneOfOne: false },
  { p: 7,  name: 'Chris Hall',               company: 'Ecomm Cowboy',             cat: 'base',  oneOfOne: false },
  { p: 8,  name: 'Mike Beckham',             company: 'Simple Modern',            cat: 'base',  oneOfOne: true  },
  { p: 9,  name: 'Nick Shackelford',         company: 'Brez',                     cat: 'base',  oneOfOne: false },
  { p: 10, name: 'Ezra Firestone',           company: 'Boom! Beauty',             cat: 'base',  oneOfOne: true  },
  { p: 11, name: 'John Roman',               company: 'Battlbox',                 cat: 'base',  oneOfOne: false },
  { p: 12, name: 'Jimmy Kim',                company: 'Commerce Roundtable',      cat: 'base', oneOfOne: false },
  { p: 13, name: 'Zach Stuck',               company: 'Homestead',                cat: 'base',  oneOfOne: false },
  { p: 14, name: 'Andrew Youderian',         company: 'eComFuel',                 cat: 'base',  oneOfOne: false },
  { p: 15, name: 'Ronak Shah',               company: 'Obvi',                     cat: 'base',  oneOfOne: false },
  { p: 16, name: 'Josh Haskins',             company: 'Hollow Socks',             cat: 'base',  oneOfOne: false },
  { p: 17, name: 'Isaac Medeiros',           company: 'Content Forge',            cat: 'base',  oneOfOne: false },
  { p: 18, name: 'Michael McVerry',          company: 'Urban Armor Gear',         cat: 'base', oneOfOne: false },
  { p: 19, name: 'Paul Jauregui',            company: 'BK Beauty',                cat: 'base',  oneOfOne: false },
  { p: 20, name: 'Robert Felder',            company: 'Bearbottom Clothing',      cat: 'base',  oneOfOne: false },
  { p: 21, name: 'Jessica Berman',           company: 'BodyBio',                  cat: 'base', oneOfOne: false },
  { p: 22, name: 'Jason Panzer',             company: 'HexClad',                  cat: 'base', oneOfOne: false },
  { p: 23, name: 'Brad Blankinship',         company: 'Sun Day Red',              cat: 'base', oneOfOne: false },
  { p: 24, name: 'Scott Kramer',             company: 'Naked & Thriving',         cat: 'base', oneOfOne: false },
  { p: 25, name: 'Katrina Lake',             company: 'Stitch Fix',               cat: 'base',  oneOfOne: true  },
  { p: 26, name: 'Cassandra Thurswell',      company: 'Kitsch',                   cat: 'base',  oneOfOne: false },
  { p: 27, name: 'Drew Arciuolo',            company: 'VKTRY Gear',               cat: 'base', oneOfOne: false },
  { p: 28, name: 'Bethany Catron Evans',     company: 'Rhone',                    cat: 'base', oneOfOne: false },
  { p: 29, name: 'Sean Riley',               company: 'Dude Wipes',               cat: 'base',  oneOfOne: false },
  { p: 30, name: 'Lindsay Shumlas',          company: 'Cotopaxi',                 cat: 'base', oneOfOne: false },
  { p: 31, name: 'Andrea Faulkner Williams', company: 'Tubby Todd',               cat: 'base',  oneOfOne: false },
  { p: 32, name: 'Kimberley Ho',             company: 'Everden',                  cat: 'base',  oneOfOne: false },
  { p: 33, name: 'Siffat Haider',            company: 'Arrae',                    cat: 'base',  oneOfOne: false },
  { p: 34, name: 'Tiffani Carter',           company: 'Pattern Beauty',           cat: 'base', oneOfOne: false },
  { p: 35, name: 'Erica Good',               company: 'Momentous',                cat: 'base',  oneOfOne: false },
  { p: 36, name: 'Ariana Ferwerda',          company: 'Halfdays',                 cat: 'base',  oneOfOne: false },
  { p: 37, name: 'Rashad Hossain',           company: 'Ryze Superfoods',          cat: 'base',  oneOfOne: false },
  { p: 38, name: 'Sophia Edelstein',         company: 'Pair Eyewear',             cat: 'base',  oneOfOne: false },
  { p: 39, name: 'Jill Layfield',            company: 'Birdy Grey',               cat: 'base',  oneOfOne: false },
  { p: 40, name: 'Gorjana Reidel',           company: 'Gorjana',                  cat: 'base',  oneOfOne: false },
  { p: 41, name: 'Anisha Raghavan',          company: 'Seed Health',              cat: 'base', oneOfOne: false },
  { p: 42, name: 'Sarah Rahal',              company: 'ARMRA',                    cat: 'base',  oneOfOne: false },
  { p: 43, name: 'Andrew Benin',             company: 'Graza',                    cat: 'base',  oneOfOne: false },
  { p: 44, name: 'Katerina Schneider',       company: 'Ritual',                   cat: 'base',  oneOfOne: true  },
  { p: 45, name: 'Jordan Nathan',            company: 'Caraway Home',             cat: 'base',  oneOfOne: false },
  { p: 46, name: 'Maradith Frenkel',         company: 'Little Sleepies',          cat: 'base',  oneOfOne: false },
  { p: 47, name: 'Michelle Miller',          company: 'VEGAMOUR',                 cat: 'base', oneOfOne: false },
  { p: 48, name: 'Jordan Menard',            company: 'Renoux',                   cat: 'base',  oneOfOne: false },
  { p: 49, name: 'Vicky Williams Grahan',    company: 'Coyuchi',                  cat: 'base', oneOfOne: false },
  { p: 50, name: 'Andrew Faris',             company: 'AJF Growth',               cat: 'base',  oneOfOne: false },
  { p: 51, name: 'Cody Plofker',             company: 'Winks',                    cat: 'base',  oneOfOne: false },
  { p: 52, name: 'Steven Borrelli',          company: 'CUTS',                     cat: 'base',  oneOfOne: false },
  { p: 53, name: "Kayti O'Connell Carr",     company: 'MATE the Label',           cat: 'base',  oneOfOne: false },
  { p: 54, name: 'Chris Lang',               company: 'Fresh Chile',              cat: 'base',  oneOfOne: false },
  { p: 55, name: "Bill D'Alessandro",        company: 'Elements Brands',          cat: 'base',  oneOfOne: false },
  { p: 56, name: 'Brian Waddick',            company: "SMACKIN'",                 cat: 'base',  oneOfOne: false },
  { p: 57, name: 'The Normal Brand Team',    company: 'The Normal Brand',         cat: 'base',  oneOfOne: false },
  { p: 58, name: 'Alejandro Chahin',         company: 'Mott & Bow',               cat: 'base',  oneOfOne: false },
  { p: 59, name: 'Ariel Kaye',               company: 'Parachute Home',           cat: 'base',  oneOfOne: false },
  { p: 60, name: 'Mari Llewellyn',           company: 'Bloom Nutrition',          cat: 'base',  oneOfOne: false },
  { p: 61, name: 'Hudson Leogrande',         company: 'Comfrt',                   cat: 'base',  oneOfOne: false },
  { p: 62, name: 'Matteo Franceschetti',     company: 'Eight Sleep',              cat: 'base',  oneOfOne: true  },
  { p: 63, name: 'Peter Rahal',              company: 'David Protein',            cat: 'base',  oneOfOne: false },
  { p: 64, name: 'Will Ahmed',               company: 'WHOOP',                    cat: 'base',  oneOfOne: true  },
  { p: 65, name: 'Gurmer Chopra',            company: 'YoungLA',                  cat: 'base',  oneOfOne: false },
  { p: 66, name: 'Nell Diamond',             company: 'Hill House Home',          cat: 'base',  oneOfOne: false },
  { p: 67, name: 'Justin Mares',             company: 'Kettle & Fire',            cat: 'base',  oneOfOne: false },
  { p: 68, name: 'Danny Yeung',              company: 'Prenetics',                cat: 'base',  oneOfOne: false },
  { p: 69, name: 'Tero Isokauppila',         company: 'Four Sigmatic',            cat: 'base',  oneOfOne: false },
  { p: 70, name: 'Sarah Paiji Yoo',          company: 'Blueland',                 cat: 'base',  oneOfOne: false },
  { p: 71, name: 'Camron Collard',           company: 'MicroPerfumes',            cat: 'base',  oneOfOne: false },
  { p: 72, name: 'Christian Guzman',         company: 'Alphalete Athletics',      cat: 'base',  oneOfOne: false },
  { p: 73, name: 'Paul Hedrick',             company: 'Tecovas',                  cat: 'base',  oneOfOne: false },
  { p: 74, name: 'Cherene Aubert',           company: 'Growth Capital',           cat: 'base',  oneOfOne: false },
  { p: 75, name: 'Mark Mastrandrea',         company: 'Ikonick',                  cat: 'base',  oneOfOne: false },
  { p: 76, name: 'Edward Wimmer IV',         company: 'Road ID',                  cat: 'base',  oneOfOne: false },
  { p: 77, name: 'Ryan Babenzien',           company: 'Jolie',                    cat: 'base',  oneOfOne: false },
  { p: 78, name: 'Beav Brodie',              company: 'Tactical Baby Gear',       cat: 'base',  oneOfOne: false },
  { p: 79, name: 'Brian Garofalow',          company: 'Skullcandy',               cat: 'base', oneOfOne: false },
  { p: 80, name: 'Katy Mimari',              company: 'Caden Lane',               cat: 'base',  oneOfOne: false },
  { p: 81, name: 'Dean Brennan',             company: 'Heart & Soil',             cat: 'base',  oneOfOne: false },
  { p: 82, name: 'Tyler McCann',             company: 'Taste Salud',              cat: 'base',  oneOfOne: false },
  { p: 83, name: 'Roman Khan',               company: 'Raycon Global',            cat: 'base',  oneOfOne: false },
  { p: 84, name: 'Josh Shapiro',             company: 'Baseball Lifestyle 101',   cat: 'base',  oneOfOne: false },
  { p: 85, name: 'Bill Rom',                 company: 'Baseball Lifestyle 101',   cat: 'base', oneOfOne: false },
  { p: 86, name: 'Curtis Matsko',            company: 'Portland Leather',         cat: 'base',  oneOfOne: false },
  { p: 87, name: 'Eric Girouard',            company: 'BRUNT',                    cat: 'base',  oneOfOne: false },
  { p: 88, name: 'Jordan Palmer',            company: 'Thread Performance',       cat: 'base',  oneOfOne: false },
  { p: 89, name: 'Ari Murray',               company: 'Salt & Stone',             cat: 'base',  oneOfOne: false },
  { p: 90, name: 'Bryan Cano',               company: 'Made Adaptive',            cat: 'base',  oneOfOne: false },
  { p: 91, name: 'Kevin Lavelle',            company: 'Mizzen+Main',              cat: 'base',  oneOfOne: false },
  { p: 92, name: 'Victor Tam',               company: 'Monos',                    cat: 'base',  oneOfOne: false },
  { p: 93, name: 'Eric Panofsky',            company: 'SLTWTR',                   cat: 'base',  oneOfOne: false },
  { p: 94, name: 'Mehtab Bhogal',            company: 'Karta Ventures',           cat: 'base',  oneOfOne: false },
  { p: 95, name: 'Freddy Ward',              company: 'Wild',                     cat: 'base',  oneOfOne: false },
  { p: 96, name: 'Sienna McCormick',         company: 'Create Wellness',          cat: 'base',  oneOfOne: false },
  { p: 97, name: 'Taylor Holiday',           company: 'Common Thread Collective', cat: 'base', oneOfOne: true  },
  { p: 98,  name: 'Mystery Card',             company: 'Absolutely Ridiculous',    cat: 'base',  oneOfOne: false },
  { p: 99,  name: 'Moiz Ali',                  company: 'Native / Fulfil',           cat: 'base',  oneOfOne: false },
  { p: 100, name: 'Rytis Lauris',              company: 'Omnisend',                  cat: 'base',  oneOfOne: false },
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

const FILTERS = ['ALL', 'AUTOGRAPHS · 1/1', 'CHROME · /5', 'CHROME · /6', 'CHROME · 1/1', 'BASE · /10', 'BASE · /5'] as const
const FILTER_LABELS: Partial<Record<string, string>> = { 'ALL': 'BASE', 'BASE · /10': 'BLUE · /10', 'BASE · /5': 'GOLD · /5' }

const VARIANTS_META = [
  { key: 'base-green',  label: 'Base (Green)',       color: '#2d7a3a' },
  { key: 'base-teal',   label: 'Base (Teal)',         color: '#039F9D' },
  { key: 'chrome',      label: '1/1 Auto Chrome',     color: '#c9a227' },
  { key: 'pack5-green', label: '/5 Chrome (Green)',   color: '#2d7a3a' },
  { key: 'pack5-teal',  label: '/5 Chrome (Teal)',    color: '#039F9D' },
  { key: 'pack6-green', label: '/6 Chrome (Green)',   color: '#2d7a3a' },
  { key: 'pack6-teal',  label: '/6 Chrome (Teal)',    color: '#039F9D' },
  { key: 'pack1',       label: '1/1 Chrome',          color: '#c9a227' },
  { key: 'blue-green',  label: '/10 Blue (Green)',    color: '#1f3753' },
  { key: 'blue-teal',   label: '/10 Blue (Teal)',     color: '#3659ab' },
  { key: 'gold-green',  label: '/5 Gold (Green)',     color: '#2d7a3a' },
  { key: 'gold-teal',   label: '/5 Gold (Teal)',      color: '#039F9D' },
]

const STORAGE_KEY = 'shopps_checklist_v1'

function SetChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [filter, setFilter] = useState<string>('base')
  const [onlyMissing, setOnlyMissing] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setChecked(JSON.parse(saved))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] }
    if (!next[id]) delete next[id]
    setChecked(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  const total = PEOPLE.length * 12
  const owned = Object.keys(checked).length

  const CARD_VARIETIES = [
    { key: 'base',    label: 'BASE' },
    { key: 'chrome',  label: '1/1 AUTOGRAPH CHROME' },
    { key: 'pack5',   label: 'CHROME · /5' },
    { key: 'pack6',   label: 'CHROME · /6' },
    { key: 'pack1',   label: 'CHROME · 1/1' },
    { key: 'blue10',  label: 'BASE · /10' },
    { key: 'gold5',   label: 'BASE · /5' },
  ]
  const visible = PEOPLE.filter(p =>
    (!onlyMissing || VARIANTS_META.some(v => !checked[`${p.p}-${v.key}`]))
  )

  return (
    <section className="checklist-section">
      <div className="section-inner">
        <div className="checklist-header" onClick={() => setOpen(o => !o)}>
          <div>
            <p className="section-eyebrow" style={{ marginBottom: '6px' }}>COLLECTOR TOOL</p>
            <h2 className="section-heading" style={{ margin: 0 }}>COMPLETE CHECKLIST</h2>
          </div>
          <div className="checklist-progress">
            <span className="checklist-count">{owned} <span className="checklist-total">/ {total}</span></span>
            <div className="checklist-bar"><div className="checklist-fill" style={{ width: `${(owned/total)*100}%` }} /></div>
            <span className="checklist-toggle-btn">{open ? '▲ HIDE' : '▼ SHOW'}</span>
          </div>
        </div>

        {open && (
          <>
            <div className="checklist-controls">
              <div className="checklist-filters">
                {CARD_VARIETIES.map(v => (
                  <button key={v.key} className={'checklist-filter-btn' + (filter === v.key ? ' active' : '')} onClick={() => setFilter(v.key)}>
                    {v.label}
                  </button>
                ))}
              </div>
              <label className="checklist-missing-toggle">
                <input type="checkbox" checked={onlyMissing} onChange={e => setOnlyMissing(e.target.checked)} />
                Show missing only
              </label>
            </div>

            <div className="checklist-table-wrap">
              <table className="checklist-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>COMPANY</th>
                    {VARIANTS_META.map(v => <th key={v.key} style={{ color: v.color }}>{v.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {visible.map(person => (
                    <tr key={person.p} className="checklist-row">
                      <td className="checklist-num">{String(person.p + 1).padStart(3, '0')}</td>
                      <td className="checklist-name">{person.name}</td>
                      <td className="checklist-co">{person.company}</td>
                      {VARIANTS_META.map(v => {
                        const id = `${person.p}-${v.key}`
                        const has = !!checked[id]
                        return (
                          <td key={v.key} className="checklist-check-cell">
                            <button
                              className={'checklist-check' + (has ? ' checked' : '')}
                              onClick={() => toggle(id)}
                              title={has ? 'Mark as missing' : 'Mark as owned'}
                              style={{ borderColor: has ? v.color : undefined, background: has ? v.color + '22' : undefined }}
                            >
                              {has ? '✓' : ''}
                            </button>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default function SetPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL')
  const [search, setSearch] = useState('')
  const [variants, setVariants] = useState<Record<number, Variant>>(() => {
    // Seed by date so mix is stable on load but rotates daily
    const today = new Date()
    let s = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
    const v: Record<number, Variant> = {}
    const cols = 4 // desktop grid columns
    const grid: number[] = []
    for (let i = 0; i < 99; i++) {
      // Exclude same color as left neighbor and top neighbor
      const forbidden = new Set<number>()
      if (i % cols !== 0) forbidden.add(grid[i - 1])       // left
      if (i >= cols)       forbidden.add(grid[i - cols])    // above
      const available = ([0, 1] as Variant[]).filter(x => !forbidden.has(x))
      const pick = available[Math.floor(rand() * available.length)]
      grid[i] = pick
      v[i] = pick
    }
    return v
  })

  function getVariant(p: number): Variant {
    return (variants[p] ?? 0) as Variant
  }

  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  function toggleFlip(p: number) {
    setFlipped(prev => {
      const next = new Set(prev)
      next.has(p) ? next.delete(p) : next.add(p)
      return next
    })
  }

  // Shuffle once per page load — new order every visit
  const [shuffled, setShuffled] = useState<typeof PEOPLE>(() => {
    const arr = [...PEOPLE]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })

  useEffect(() => {
    setShuffled(prev => {
      const arr = [...prev]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    })
  }, [activeFilter])

  const filtered = useMemo(() => {
    return shuffled.filter(person => {
      if (activeFilter === 'AUTOGRAPHS · 1/1') {
        const CHROME_PEOPLE = new Set([0,1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,27,29,48,49,50,51,52,53,54,55,56,58,71,74,75,76,77,79,81,82,88,90,91,92,93,98])
        if (!CHROME_PEOPLE.has(person.p)) return false
      } else if (activeFilter === 'AUTOGRAPH') {
        // all 99 people have an autograph card — show everyone
      } else if (activeFilter === 'CHROME · /5' || activeFilter === 'CHROME · /6' || activeFilter === 'CHROME · 1/1' || activeFilter === 'BASE · /10' || activeFilter === 'BASE · /5') {
        if (person.p > 96) return false
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

  const displayList = useMemo(() => {
    if (activeFilter === 'BASE · /10' || activeFilter === 'BASE · /5') {
      return filtered.map((p, i) => ({ ...p, blueVariant: i % 2 === 0 ? 'green' : 'teal' }))
    }
    return filtered as any[]
  }, [filtered, activeFilter])

  return (
    <>
      {/* ──────────────────── NAV ──────────────────── */}
      <SiteNav />

      {/* ──────────────────── PAGE HEADER ──────────────────── */}
      <div className="set-page-header">
        <p className="section-eyebrow">2026 EDITION</p>
        <h1 className="set-h1">Who&apos;s in the Set?</h1>
        <p className="set-intro">
          Click a card to flip it and learn about the leader&apos;s role in shaping ecommerce.
        </p>

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
                {FILTER_LABELS[f] ?? f}
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
        {displayList.map((person) => {
          const isAutograph = activeFilter === 'AUTOGRAPH'
          const isChrome = activeFilter === 'AUTOGRAPHS · 1/1'
          const isPackGreen = activeFilter === 'CHROME · /5'
          const isPackTeal = activeFilter === 'CHROME · /6'
          const isPackGold = activeFilter === 'CHROME · 1/1'
          const isPack = isPackGreen || isPackTeal || isPackGold
          const isBlue = activeFilter === 'BASE · /10'
          const isGold = activeFilter === 'BASE · /5'
          const v = getVariant(person.p)
          const isFlipped = flipped.has(person.p)
          // Back card offsets: green=2, teal=4, gold=6; autograph back=8p+8
          const backOffsets: [number,number,number] = [2, 4, 6]
          const packColor = isPackGreen ? 'green' : isPackTeal ? 'teal' : 'gold'
          const frontSrc = isChrome
            ? `/cards/foil-sig-chrome-${String(person.p + 1).padStart(3, '0')}.jpg`
            : isAutograph
            ? `/cards/onyx-signed-p${String(person.p).padStart(2, '0')}.jpg`
            : isPack
            ? `/cards/pack-chrome-${String(person.p + 1).padStart(3, '0')}-${packColor}.jpg`
            : isBlue
            ? `/cards/blue-${String(person.p + 1).padStart(3, '0')}-${(person as any).blueVariant ?? 'green'}.jpg`
            : isGold
            ? `/cards/gold-${String(person.p + 1).padStart(3, '0')}-${(person as any).blueVariant ?? 'green'}.jpg`
            : cardSrc(person.p, v)
          const packBackOffset = isPackGreen ? 2 : isPackTeal ? 4 : 6
          const backNum = isAutograph || isChrome ? 8*person.p+8 : isPack ? 8*person.p+packBackOffset : 8*person.p+backOffsets[v]
          const backSrc = `/cards/card-${String(backNum).padStart(3,'0')}.jpg`
          return (
            <div
              key={person.p + '-' + ((person as any).blueVariant ?? '')}
              className={`set-card-cell set-card-flip-wrap${isFlipped ? ' is-flipped' : ''}`}
              onClick={() => toggleFlip(person.p)}
              title={`${person.name} — click to flip`}
            >
              <div className="set-card-flipper">
                <div className="set-card-front">
                  <img src={frontSrc} alt={person.name} draggable={false} />
                  <div className="set-card-overlay">
                    <p className="set-card-name">{person.name}</p>
                    <p className="set-card-company">{person.company}</p>
                  </div>
                  {!isAutograph && !isPack && !isBlue && !isGold && (
                    <span className="set-variant-dot" style={{ background: DOT_COLORS[v] }} />
                  )}
                </div>
                <div className="set-card-back">
                  <img src={backSrc} alt={`${person.name} back`} draggable={false} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── SPONSOR STRIP ── */}
      <div className="marquee-wrap">
        <p className="marquee-label">THANK YOU TO OUR SPONSORS</p>
        <div className="marquee-outer">
          <div className="marquee-track">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="marquee-item">
                <span className="marquee-logo-wrap"><img src="/fulfil-logo.svg" alt={i === 0 ? "Fulfil" : ""} className="marquee-logo marquee-logo--fulfil" /></span>
                <span className="marquee-logo-wrap"><img src="/omnisend-logo.svg" alt={i === 0 ? "Omnisend" : ""} className="marquee-logo marquee-logo--omnisend" /></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────── FOOTER ──────────────────── */}
      {/* ── CHECKLIST ── */}
      <SetChecklist />

      <footer className="site-footer">
        <img src="/shopps-logo-v2.png" alt="SHOPPS" className="footer-logo" />
        <p className="footer-copy">2026 COMMON THREAD COLLECTIVE. ALL RIGHTS RESERVED. THIS PRODUCT IS NOT ENDORSED OR AFFILIATED WITH ANY ORGANIZATION OR TEAM. PRINTED IN THE U.S.A.</p>
        <a href="https://commonthreadco.com/" target="_blank" rel="noopener noreferrer"><img src="/ctc-icon.png" alt="Common Thread Collective" className="footer-ctc-logo" /></a>
      </footer>
    </>
  )
}
