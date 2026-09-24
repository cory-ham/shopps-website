# Shopps Critical Build State — Sep 23 17:20

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website
- Domain: shoppscards.com (DNS not yet pointed)
- Project: ~/Downloads/shopps-website/

## CURRENT HERO STATE
- Scrolling card carousel: 24x same card, 55vh, 28s, infinite right-to-left
- Cards in generic dark sleeve case with SHOPPS logo top slot
- CSS class: .card-sleeve, .card-sleeve-top, .card-sleeve-bottom
- Current card image: /public/cards/rytis-center-clean.png (Omnisend guy — BEING REPLACED)

## REAL CARDS TO USE (from Cory Sep 23 17:19)
- Bart Szaniewski — Dad Gang Co. — green/chartreuse border — card-chrome-hq.png
- Bear Handlon — Born Primitive — teal border — card-cardstock-hq.png
- HQ versions at: /Users/coryhamilton/.openclaw/workspace/card-chrome-hq.png etc.
- Also at: ~/Downloads/shopps-website/public/cards/card-chrome.png (2400px HQ)
- Card design: S logo top-left, COMMON THREAD COLLECTIVE vertical right side, 
  SHOPPS diamond logo bottom-left, name + company bottom, colored border
- These are FLAT cards — no slab/case needed for the card itself

## CARD SLEEVE DESIGN (generic unbranded)
- Dark hard case: background #1a1e2c, border rgba(200,215,240,0.35)
- Top slot: SHOPPS logo (/public/shopps-logo.png)
- Bottom slot: card photo fills the window
- Corner circuit details (CSS spans)
- CSS in app/globals.css: .card-sleeve, .card-sleeve-top, .card-sleeve-bottom

## NEXT IMMEDIATE ACTION
- Copy Bart (card-chrome.png) and Bear (card-cardstock.png) to carousel
- Replace rytis-center-clean.png with alternating Bart + Bear cards
- Keep the generic sleeve wrapper

## KEY CSS
- --bg: #07090f, --teal: #039F9D, --white: #F5F8F8
- Fonts: Anton (headlines), Inter (body)
- Carousel: animation: carousel-scroll 28s linear infinite

## CARD PDF SOURCES
- ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/CTC_Chrome_master.pdf (Bart)
- ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/CTC_Cardstock_master.pdf (Bart cardstock)
- HQ extractions (2400px) in /Users/coryhamilton/.openclaw/workspace/card-*-hq.png
- Also copied to ~/Downloads/shopps-website/public/cards/ as card-chrome.png etc.

## OTHER PAGE SECTIONS (below hero — built, need review)
Ticker, What is SHOPPS, Value props, Top 100 grid, Prize board, How to get a pack, Live schedule, CTA/footer
