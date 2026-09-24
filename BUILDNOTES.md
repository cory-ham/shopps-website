# Shopps Critical Build State — Sep 23 17:27

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website
- Domain: shoppscards.com (DNS not yet pointed)
- Project: ~/Downloads/shopps-website/

## SLAB CASE (from Cory screenshot - exact design wanted)
- OUTER: thick chrome/silver ribbed border, multiple ridges, very 3D, rounded corners
- TOP HEADER BAR (black):
  - Left: large bold italic S logo (shopps-logo.png)
  - Center: "2026 COMMON THREAD COLLECTIVE" (tiny), person NAME (large bold white), title below
  - Right: "GEM MINT" label, large "10" with laurel wreath circle, "001/0100" serial
- BOTTOM: full card image visible in window
- Reference image saved: /Users/coryhamilton/.openclaw/workspace/media/inbound/openclaw-staged-012820fa-944a-4218-9bc5-fa42cdccc50e/input-56a11b1c-4b48-4a74-85cc-b8e9b3f73c7f.jpg

## CURRENT PAGE.TSX STATE (after last edit - not yet built/pushed)
- Carousel: 12 cards (Bart + Bear alternating) + 12 duplicate for loop
- Each card wrapped in .card-sleeve with full slab HTML structure:
  - .card-sleeve-top: logo + name block + badge
  - .card-sleeve-bottom: card image
- CSS updated in app/globals.css with chrome slab styling
- NEEDS: npm run build && git push

## CARD ASSETS
- bart-card.jpg: Bart Szaniewski, Dad Gang Co, green border
- bear-card.jpg: Bear Handlon, Born Primitive, teal border
- Both at: ~/Downloads/shopps-website/public/cards/
- HQ sources: /Users/coryhamilton/.openclaw/workspace/card-*-hq.png
- All card PDFs: ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/

## HERO TEXT COPY (from PSD)
- Headline: "the Top 100 In Ecommerce"
- Subhead: "Collect them all" (teal)
- Body: "Top 100 operators, founders, and legends of the industry – immortalized in a collector card series. Packs are 100% free but you can't buy them. You have to find them."
- Btn1: "How to Get a Pack" (teal fill), Btn2: "See the set" (outline)
- Pack: "LIVE PACK COUNT" / "of 1000 left"

## KEY CSS VARS
- --bg: #07090f, --teal: #039F9D, --white: #F5F8F8
- Anton (headlines), Inter (body)
- Carousel: 28s, 55vh cards, 2vw gap

## PSD FILE
- ~/Downloads/shopps-design.psd (35MB)
- Canvas: 2544x7286
- All page sections built but need copy review vs PSD

## WHAT STILL NEEDS BUILDING
1. Build + push current slab CSS changes
2. Review all sections below hero vs PSD
3. Domain DNS: point shoppscards.com to Vercel
4. When 100 cards ready: add all to carousel array
