#!/usr/bin/env python3
"""
render_slab.py — PSA-slab compositing for SHOPPS
Signature: render_slab(card_path, name, company, title, out_path)

Frame:  public/ChatGPT Image Sep 25, 2026, 02_04_36 PM (1).png (1024×1536 RGBA)
S icon: public/shopps-s-icon-v2.png  — black bg + teal S; lighten-blended
Badge:  public/gem-mint-badge.png    — black bg + silver badge; lighten-blended

Header window: HDR_L=159, HDR_T=147, HDR_R=864, HDR_B=344  (705×197 px)
Card window:   CRD_L=159, CRD_T=431, CRD_R=864, CRD_B=1382 (705×951 px)
"""

import os
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ─── paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
PUB         = os.path.normpath(os.path.join(SCRIPT_DIR, '..', 'public'))
FRAME_PATH  = os.path.join(PUB, 'ChatGPT Image Sep 25, 2026, 02_04_36 PM (1).png')
S_ICON_PATH = os.path.join(PUB, 'shopps-s-icon-v2.png')
BADGE_PATH  = os.path.join(PUB, 'gem-mint-badge.png')
FONTS_DIR      = os.path.join(PUB, 'fonts')
FONT_ANTONIO   = os.path.join(FONTS_DIR, 'Antonio-Bold.ttf')
FONT_IBM_BOLD  = os.path.join(FONTS_DIR, 'IBMPlexSans-Bold.ttf')
FONT_IBM_REG   = os.path.join(FONTS_DIR, 'IBMPlexSans-Regular.ttf')

# ─── layout constants ─────────────────────────────────────────────────────────
W, H = 1024, 1536

CRD_L, CRD_T, CRD_R, CRD_B = 159, 431, 864, 1382
HDR_L, HDR_T, HDR_R, HDR_B = 159, 147, 864, 344
HDR_W = HDR_R - HDR_L   # 705
HDR_H = HDR_B - HDR_T   # 197

# Measured from reference slabs (slab-bart.jpg, slab-bear.jpg):
#   S teal content: x≈173..306, y≈182..312
#   Badge silver:   x≈700..869, y≈180..310
#   Name text left edge: x=335
#   Label "2026…" top:   y_rel=44 from HDR_T
#   Name top:            y_rel=66 from HDR_T
ICON_H  = int(HDR_H * 0.66)                        # ≈130 px
ICON_W  = int(ICON_H * (1392 / 1130))              # ≈160 px (aspect-correct)
ICON_X  = HDR_L - 6                                # ≈153  (S content lands ~x=173)
ICON_Y  = HDR_T + (HDR_H - ICON_H) // 2           # vertically centred

BADGE_H = int(HDR_H * 0.80)                        # ≈157 px
BADGE_W = int(BADGE_H * (1350 / 1165))             # ≈182 px
BADGE_X = HDR_R - BADGE_W - 20                     # pulled left so badge stays inside frame
BADGE_Y = HDR_T + (HDR_H - BADGE_H) // 2          # vertically centred

# Text zone: after S icon, before badge
TXT_X0      = ICON_X + ICON_W + 14                 # ≈327 → lands ~335 of content
TXT_X1      = BADGE_X - 8                          # ≈669
TXT_ZONE_W  = TXT_X1 - TXT_X0                      # ≈342 px

# Relative y offsets (px from HDR_T) — measured from reference slabs
LABEL_Y_REL = 44    # "2026 COMMON THREAD COLLECTIVE"
NAME_Y_REL  = 66    # person name
# Company and title are computed dynamically after name placement.

# Text superscale factor for crispness
SCALE = 4

# ─── asset cache ──────────────────────────────────────────────────────────────
_frame = None
_s_icon = None
_badge = None


def _load_assets():
    global _frame, _s_icon, _badge
    if _frame is None:
        _frame = Image.open(FRAME_PATH).convert('RGBA')
    if _s_icon is None:
        raw = Image.open(S_ICON_PATH).convert('RGBA')
        _s_icon = raw.resize((ICON_W, ICON_H), Image.LANCZOS)
    if _badge is None:
        raw = Image.open(BADGE_PATH).convert('RGBA')
        _badge = raw.resize((BADGE_W, BADGE_H), Image.LANCZOS)


# ─── helpers ──────────────────────────────────────────────────────────────────
def _lighten_paste(canvas_arr: np.ndarray, overlay: Image.Image, ox: int, oy: int) -> None:
    """Paste overlay onto canvas_arr using CSS lighten blend (max per channel)."""
    ov = np.array(overlay, dtype=np.float32)
    oh, ow = ov.shape[:2]

    x1, y1 = max(0, ox), max(0, oy)
    x2 = min(canvas_arr.shape[1], ox + ow)
    y2 = min(canvas_arr.shape[0], oy + oh)
    if x2 <= x1 or y2 <= y1:
        return

    bx1, by1 = x1 - ox, y1 - oy
    bx2, by2 = bx1 + (x2 - x1), by1 + (y2 - y1)

    bg    = canvas_arr[y1:y2, x1:x2, :3].astype(np.float32)
    src   = ov[by1:by2, bx1:bx2, :3]
    alpha = ov[by1:by2, bx1:bx2, 3:4] / 255.0

    blended = np.maximum(bg, src)
    result  = bg * (1.0 - alpha) + blended * alpha
    canvas_arr[y1:y2, x1:x2, :3] = result.clip(0, 255).astype(np.uint8)


def _antonio(size_pt: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_ANTONIO, size_pt)

def _ibm_bold(size_pt: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_IBM_BOLD, size_pt)

def _ibm_reg(size_pt: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_IBM_REG, size_pt)


# ─── main compositor ──────────────────────────────────────────────────────────
def render_slab(card_path: str, name: str, company: str, title: str, out_path: str) -> None:
    """Render a PSA-slab composite and save as JPEG quality=95."""
    _load_assets()

    # 1. Black base canvas
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 255))

    # 2. Paste card image into card window (resize to exact window size)
    cw = CRD_R - CRD_L   # 705
    ch = CRD_B - CRD_T   # 951
    card = Image.open(card_path).convert('RGB')
    card = card.resize((cw, ch), Image.LANCZOS)
    canvas.paste(card, (CRD_L, CRD_T))

    # 3. Fill header zone with dark background colour
    draw = ImageDraw.Draw(canvas)
    draw.rectangle([HDR_L, HDR_T, HDR_R - 1, HDR_B - 1], fill=(10, 12, 16, 255))

    # 4. Alpha-composite the frame on top (chrome ridges visible; windows transparent)
    canvas = Image.alpha_composite(canvas, _frame)

    # 5. Lighten-paste S icon and badge into header
    canvas_arr = np.array(canvas).copy()
    _lighten_paste(canvas_arr, _s_icon, ICON_X, ICON_Y)
    _lighten_paste(canvas_arr, _badge,  BADGE_X, BADGE_Y)
    canvas = Image.fromarray(canvas_arr)

    # 6. Render text at SCALE× for crispness, then scale back down
    tz_w4 = TXT_ZONE_W * SCALE
    tz_h4 = HDR_H * SCALE
    txt_img = Image.new('RGBA', (tz_w4, tz_h4), (0, 0, 0, 0))
    tdraw   = ImageDraw.Draw(txt_img)

    # ── Measure all elements, then vertically center the block ───────────────
    # No label — clean slab, name gets more room.

    co_font = _ibm_bold(17 * SCALE)
    ti_font = _ibm_reg(14 * SCALE)
    co_bb   = tdraw.textbbox((0, 0), company.upper(), font=co_font)
    ti_bb   = tdraw.textbbox((0, 0), title.upper(), font=ti_font)

    # Largest name font that fits zone width
    name_fnt = _antonio(20 * SCALE)
    name_bb  = tdraw.textbbox((0, 0), name, font=name_fnt)
    for pt in range(52 * SCALE, 20 * SCALE - 1, -2):
        fnt = _antonio(pt)
        bb  = tdraw.textbbox((0, 0), name, font=fnt)
        if bb[2] - bb[0] <= tz_w4:
            name_fnt, name_bb = fnt, bb
            break

    name_h = name_bb[3] - name_bb[1]
    co_h   = co_bb[3]   - co_bb[1]
    ti_h   = ti_bb[3]   - ti_bb[1]

    GAP_NAME_CO = 10 * SCALE
    GAP_CO_DIV  = 12 * SCALE
    DIV_H       = SCALE
    GAP_DIV_TI  = 10 * SCALE

    total_h = name_h + GAP_NAME_CO + co_h + GAP_CO_DIV + DIV_H + GAP_DIV_TI + ti_h

    # Center the block vertically
    y = (tz_h4 - total_h) // 2

    # ── Name
    tdraw.text((0, y - name_bb[1]), name, font=name_fnt, fill=(255, 255, 255, 255))
    y += name_h + GAP_NAME_CO

    # ── Company (teal)
    tdraw.text((0, y - co_bb[1]), company.upper(), font=co_font, fill=(3, 159, 157, 255))
    y += co_h + GAP_CO_DIV

    # ── Divider line
    tdraw.line([(0, y), (tz_w4, y)], fill=(90, 95, 108, 220), width=SCALE)
    y += DIV_H + GAP_DIV_TI

    # ── Title
    tdraw.text((0, y - ti_bb[1]), title.upper(), font=ti_font, fill=(185, 190, 200, 255))
    # Scale text back to 1× and paste into canvas
    txt_final = txt_img.resize((TXT_ZONE_W, HDR_H), Image.LANCZOS)
    canvas.paste(txt_final, (TXT_X0, HDR_T), txt_final)

    # 7. Flatten onto black background and save as JPEG
    final = Image.new('RGB', (W, H), (0, 0, 0))
    flat  = Image.alpha_composite(Image.new('RGBA', (W, H), (0, 0, 0, 255)), canvas)
    final.paste(flat.convert('RGB'))
    os.makedirs(os.path.dirname(os.path.abspath(out_path)), exist_ok=True)
    final.save(out_path, 'JPEG', quality=95)
    print(f'  ✓ {os.path.basename(out_path)}')


# ─── CLI convenience ──────────────────────────────────────────────────────────
if __name__ == '__main__':
    if len(sys.argv) != 6:
        print('Usage: render_slab.py <card_path> <name> <company> <title> <out_path>')
        sys.exit(1)
    render_slab(*sys.argv[1:])
