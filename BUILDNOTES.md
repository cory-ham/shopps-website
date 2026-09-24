# Shopps Critical Build State — Sep 23 17:40

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website (main branch)
- Domain: shoppscards.com (DNS not yet pointed)
- Project: ~/Downloads/shopps-website/
- PSD: ~/Downloads/shopps-design.psd (35MB, 2544x7286)

## WHAT CORY WANTS
- Clear plastic card case over each card — like a transparent top-loader
- Black top header bar (LIKED): SHOPPS logo + person name + GEM MINT 10 badge
- Slab frame PNG with transparent window ready: public/slab-frame.png (848x1264 RGBA)
- Card layered BEHIND the slab frame overlay

## CURRENT PAGE.TSX CAROUSEL STATE (updated, NOT YET PUSHED)
- 24 cards: 12 Bart+Bear alternating + 12 duplicate for seamless loop
- Structure per card:
    <div className="card-sleeve">
      <div className="card-sleeve-top">  ← CSS black header (KEEP)
        shopps-logo + name block + GEM MINT badge
      </div>
      <div className="card-sleeve-window">  ← NEW div (not yet in CSS)
        <img src="/cards/bart-card.jpg" className="card-behind" />  ← z-index:1
        <img src="/slab-frame.png" className="slab-overlay" />  ← z-index:2
      </div>
    </div>
- bart-card.jpg: Bart Szaniewski, Dad Gang Co, green border (125KB)
- bear-card.jpg: Bear Handlon, Born Primitive, teal border (140KB)

## CSS NEEDED (add to globals.css — NOT YET DONE)
.card-sleeve-window {
  position: relative;
  flex: 1;
  overflow: visible;
  background: #07090f;
}
.card-behind {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  display: block;
}
.slab-overlay {
  position: absolute;
  inset: -8% -10%;
  width: 120%;
  height: 116%;
  pointer-events: none;
  z-index: 2;
  object-fit: fill;
}

## .card-sleeve CSS (replace current chrome gradient with clear plastic)
.card-sleeve {
  flex-shrink: 0;
  height: 55vh;
  width: calc(55vh * 0.72);
  position: relative;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  background: transparent;  /* no chrome gradient */
  border: none;
  padding: 0;
  box-shadow: 0 20px 60px rgba(0,0,0,0.85);
}

## HERO TEXT (working, from PSD)
- "The Top 100 In Ecommerce" (Anton, 5vw, uppercase)
- "Collect them all" (teal, 1.4vw)
- "How to Get a Pack" (teal fill) + "See the set" (outline)
- LIVE PACK COUNT / 7 3 4 / of 1000 left

## KEY CSS VARS
- --bg: #07090f, --teal: #039F9D, --white: #F5F8F8
- Anton + Inter fonts
- Carousel: animation: carousel-scroll 28s linear infinite

## OTHER SECTIONS (built, below hero)
- Ticker, What is SHOPPS, Value props (3col), Top 100 grid (4x2)
- Prize board (6 prizes), How to get a pack (4 steps), Live schedule (3 events)
- CTA: "734 Packs Left. Zero for Sale." + Footer

## ALL CARD PDF SOURCES
- ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/
- CTC_Chrome_master.pdf (Bart green), CTC_Cardstock_master.pdf (Bart cardstock)
- CTC_Cardstock_Sponsor.pdf (Moiz Ali blue), ctc_dual_auto_chrome.pdf, ctc_dual_auto_cardstock.pdf
- HQ PNGs: /Users/coryhamilton/.openclaw/workspace/card-*-hq.png (2400px)
- When 100 cards ready: add all to the cards array in page.tsx carousel
