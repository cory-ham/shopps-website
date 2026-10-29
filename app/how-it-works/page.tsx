'use client'
import { PACKS_REMAINING } from '../lib/pack-count'
import SiteNav from '../components/SiteNav'

const STEPS = [
  {
    num: '01',
    title: 'FOLLOW THE DROPS',
    lines: [
      { text: 'You never know when the next pack will drop.', bold: false },
      { el: <>Follow the featured Players and Common Thread Collective on <a href="https://x.com/CommnThreadCo" target="_blank" rel="noopener noreferrer">X</a>, <a href="https://www.youtube.com/channel/UCjtbFqsqVORPBJMein0zLWQ" target="_blank" rel="noopener noreferrer">YouTube</a>, and <a href="https://www.linkedin.com/company/common-thread-collective" target="_blank" rel="noopener noreferrer">LinkedIn</a> for surprise giveaways, exclusive drops, and your chance to score a pack.</>, bold: false },
    ],
  },
  {
    num: '02',
    title: 'SHOW UP LIVE',
    lines: [
      { text: 'The best pulls may happen live.', bold: false },
      { el: <>Tune in to exclusive pack breaks on <a href="https://x.com/CommnThreadCo" target="_blank" rel="noopener noreferrer">X</a>, <a href="https://www.youtube.com/channel/UCjtbFqsqVORPBJMein0zLWQ" target="_blank" rel="noopener noreferrer">YouTube</a>, and <a href="https://www.linkedin.com/company/common-thread-collective" target="_blank" rel="noopener noreferrer">LinkedIn</a>. Watch the cards fly, chase rare pulls, and enter for your chance to win.</>, bold: false },
    ],
  },
  {
    num: '03',
    title: 'RIP YOUR PACK',
    lines: [
      { text: 'This is where the fun begins.', bold: false },
      { text: 'Every pack holds a randomized collection of cards featuring the biggest names in ecommerce.', bold: false },
      { text: 'From base cards and chrome parallels to ultra-rare numbered cards and exclusive 1-of-1s.', bold: false },
      { text: 'Every pack is a chance to pull greatness.', bold: true },
    ],
  },
  {
    num: '04',
    title: 'PULL & WIN',
    lines: [
      { text: 'Some cards come with more than bragging rights.', bold: false },
      { text: 'Chase authenticated autograph cards with real prizes attached, from exclusive products and gift cards to unforgettable experiences.', bold: false },
      { text: 'Over $50,000 in prizes waiting to be unlocked.', bold: true },
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
            Only 1,000 packs exist. And you can't buy one.<br /><span style={{color:'var(--teal)',fontWeight:700}}>You have to win one.</span><br />From exclusive drops and live breaks to player giveaways, here's how to get in on the action.
          </p>
        </div>
        <div className="hiw-hero-pack">
          <img src="/shopps-packs-fan.png" alt="SHOPPS Packs" draggable={false} />
        </div>
      </div>

      {/* ── 4-step grid ── */}
      <div style={{ background: '#13161f' }}>
      <div className="section-inner">
        <div className="hiw-steps-grid">
          {STEPS.map(step => (
            <div key={step.num} className="howto-step">

              <h3 className="howto-title">{step.title}</h3>
              {step.lines.map((line, i) => (
                <p key={i} className="howto-body">
                  {line.bold ? <strong>{line.el ?? line.text}</strong> : (line.el ?? line.text)}
                </p>
              ))}
            </div>
          ))}
        </div>


      </div>



      {/* ── SPONSOR STRIP ── */}
      <p className="sponsor-label">Thanks to our sponsors</p>
      <div className="ticker-wrap">
        {(['Fulfil','omnisend','Fulfil','omnisend','Fulfil','omnisend'] as const).map((label, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={label === 'Fulfil' ? '/fulfil-logo.svg' : '/omnisend-logo.svg'}
              alt={label}
              style={{
                height: label === 'omnisend' ? '18px' : '20px',
                width: 'auto',
                
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
            <span style={{color:'var(--olive)'}}>{PACKS_REMAINING}</span> Packs Left.<br />Zero for Sale.
          </h2>
          <p className="cta-body">
            <strong><em>The chase isn&apos;t over.</em></strong> <em>Rare cards. Exclusive prizes. 1-of-1 pulls.</em><br />
            <em>And your next chance to win could be right around the corner.</em>
          </p>
          <a href="/get-a-pack" className="btn-cta-outline" style={{display:'inline-block'}}>DON&apos;T MISS THE NEXT DROP</a>
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