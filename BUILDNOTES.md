# Shopps Build State — Sep 23 17:00

## URLs
- Live: https://shopps-website.vercel.app/
- GitHub: https://github.com/cory-ham/shopps-website
- Domain: shoppscards.com (DNS not yet pointed)
- Project: ~/Downloads/shopps-website/

## Hero state
- Scrolling card carousel: works, 28s, infinite right-to-left
- Cards: blurry (low-res), need HQ re-extraction
- Cards need slab/case frame around them
- Card height: 55vh, opacity: 0.75
- Fade masks on left/right edges

## Card assets on disk
- PDFs source: ~/Downloads/shopps-cards-extracted/Randall_These are absolutely done/
- Also: ~/Desktop/CTC_Chrome_master.pdf (Cory sent directly)
- HQ extractions done: /Users/coryhamilton/.openclaw/workspace/card-*-hq.png
- Current carousel cards (blurry): ~/Downloads/shopps-website/public/cards/card-*.png

## Card designs
- CTC_Chrome_master.pdf: Bart Szaniewski, green/chartreuse border, S logo, name bottom
- CTC_Cardstock_master.pdf: same person, cardstock finish
- CTC_Cardstock_Sponsor.pdf: Moiz Ali (Fulfil), blue/dark design  
- ctc_dual_auto_chrome.pdf: Bill Ham + Josh Shapiro, gold/dark, horizontal
- ctc_dual_auto_cardstock.pdf: same, green border, horizontal

## Next steps
1. Re-extract all card PDFs at high resolution (2x or 3x current)
2. Add CSS slab frame around each card (chrome gradient border, GEM MINT badge)
3. Push to Vercel
4. Then: review other page sections below hero

## Key CSS
- --bg: #07090f
- --teal: #039F9D
- --white: #F5F8F8
- Fonts: Anton (headlines), Inter (body)
- Carousel: animation: carousel-scroll 28s linear infinite
