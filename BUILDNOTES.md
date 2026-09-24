# Shopps Build State — Sep 23 17:03

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website
- Domain: shoppscards.com (DNS not yet pointed)
- Project: ~/Downloads/shopps-website/

## Card sleeve design (from Cory's screenshot)
- Clear/translucent plastic card case — like a BGS/PSA hard case
- Dark charcoal/near-black background version needed
- TOP SECTION: small rectangular window at top (~20% height) — this is where SHOPPS logo goes
- BOTTOM SECTION: large rectangular window (~75% height) — this is where the card photo goes
- Border: thin silver/white line, rounded corners, circuit-board style corner details
- The case itself is the frame — clean, minimal, no text except SHOPPS logo in top slot
- Overall feel: premium card grading case, dark version

## SHOPPS logo placement
- In the top rectangular window of the case
- Logo file: /public/shopps-logo.png
- Keep it small, centered in that top slot

## Card assets
- Current carousel: rytis-center-clean.png (single card, transparent bg)
- Real card PDFs: ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/
- HQ extractions: /Users/coryhamilton/.openclaw/workspace/card-*-hq.png
- When 100 cards ready: swap in all 100 PNGs

## Current hero state
- Scrolling carousel: 24x same card, 55vh, 28s, infinite right-to-left
- Switching img tags to .card-sleeve wrapper divs
- CSS sleeve: dark version of the clear case in screenshot

## Key CSS vars
- --bg: #07090f
- --teal: #039F9D
- --white: #F5F8F8
- Font: Anton (headlines), Inter (body)
- Carousel speed: 28s

## Other sections (below hero, already built)
- Ticker strip, What is SHOPPS, Value props, Top 100 grid, Prize board, How to get a pack, Live schedule, CTA/footer
- All need copy review against PSD
