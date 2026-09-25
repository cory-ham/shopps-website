# Shopps Critical Build State — Sep 23 17:45

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website (main branch)
- Domain: shoppscards.com (DNS not yet pointed to Vercel)
- Project: ~/Downloads/shopps-website/
- PSD: ~/Downloads/shopps-design.psd (35MB, 2544x7286)

## CURRENT STATE
- Carousel: Bart + Bear alternating, 24 cards, 28s, 55vh, right-to-left
- Current case: ugly chrome overlay (slab-frame.png) — needs replacement
- Black header bar (Cory LIKED): SHOPPS logo + person name + GEM MINT 10 badge
- Cory choosing between case options

## CARD ASSETS
- public/cards/bart-card.jpg (Bart Szaniewski, Dad Gang Co, green border, 125KB)
- public/cards/bear-card.jpg (Bear Handlon, Born Primitive, teal border, 140KB)
- public/slab-frame.png (848x1264, chrome frame with transparent window)
- public/shopps-logo.png (SHOPPS logo)
- HQ PDFs: ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/
- HQ PNGs: /Users/coryhamilton/.openclaw/workspace/card-*-hq.png (2400px)

## CSS CARD SLEEVE STRUCTURE (current page.tsx)
  <div className="card-sleeve">
    <div className="card-sleeve-top"> ← KEEP: black header, SHOPPS logo, name, GEM MINT badge
    </div>
    <div className="card-sleeve-window">
      <img className="card-behind" />  ← card photo, z-index:1
      <img className="slab-overlay" src="/slab-frame.png" /> ← z-index:2 (REPLACE THIS)
    </div>
  </div>

## KEY CSS VARS
- --bg: #07090f, --teal: #039F9D, --white: #F5F8F8
- Anton + Inter fonts
- Carousel: animation: carousel-scroll 28s linear infinite

## CASE OPTIONS (Cory choosing)
A: No case — bare card, drop shadow only
B: Thin top-loader — 1px light border, subtle plastic glare line  
C: Dark matte — clean dark border, minimal premium
D: Holographic — rainbow foil border

## HERO TEXT (working from PSD)
- "The Top 100 In Ecommerce" (Anton, 5vw, uppercase)
- "Collect them all" (teal, 1.4vw)
- Buttons + pack counter 7-3-4 working

## OTHER SECTIONS (built below hero)
- Ticker, What is SHOPPS, Value props (3col), Top 100 grid (4x2)
- Prize board (6 prizes), How to get a pack (4 steps), Live schedule (3 events)  
- CTA: "734 Packs Left. Zero for Sale." + Footer

## WHEN 100 CARDS READY
- Add all 100 PNGs to public/cards/
- Update cards array in page.tsx: [{src, name, title}] for each

## DNS SETUP (when ready)
- Add shoppscards.com in Vercel → Project Settings → Domains
- At registrar: CNAME → cname.vercel-dns.com OR A record → 76.76.21.21

## CARD CASE DECISION (Sep 23 17:44)
Cory wants to see multiple case style options as images before deciding.
Options to generate/show:
A - No case (bare card + drop shadow)
B - Clear plastic top-loader (thin border, glass glare)
C - Dark matte border (clean minimal black frame)  
D - Holographic foil border (rainbow iridescent)

Key constraint: Cory liked the BLACK HEADER BAR (SHOPPS logo + name + GEM MINT 10 badge)
He hated: the chrome CSS gradient (looked fake/AI-generated)
He hated: the generated slab PNG overlay (also looked AI/fake)

BEST PATH: Just implement CSS options directly on the site rather than generating images.
Each option = just change .card-sleeve CSS. No new assets needed.
Quickest is to build a demo page or just push each style sequentially.

## CRITICAL — SLAB INVESTIGATION Sep 23 17:54
- Cory confirmed: the slab photo IS in the PSD (Layer 15 = Rytis Lauris in slab)
- Layer 15 bbox=(1358,189,1742,813) — 384x624px
- This is a COMPOSITE image — the slab chrome border + card inside + header all baked together
- Question: is the slab a Smart Object that contains sub-layers (card separated from chrome)?
- If it IS a smart object with sub-layers: can extract just the chrome border without Rytis's card
- Then composite Bart/Bear card BEHIND the chrome border = perfect result

## PLAN
1. Check if Layer 15 is a Smart Object with extractable sub-layers
2. If yes: extract just the chrome slab border (without the card photo)
3. That becomes our slab-frame.png (real photo quality chrome)
4. Composite each card (Bart/Bear) behind the chrome frame
5. Use resulting composite images in the carousel

## PSD FILE LOCATION
- ~/Downloads/shopps-design.psd (35MB)
- Layer 15 is the only isolated hero card (clean slab with Rytis inside)
- All other card content is in "Layer 2 copy" which is a flat strip (no sub-layers)
