#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Renders PNG covers directly with Pillow — no browser required."""

import os
from PIL import Image, ImageDraw, ImageFont

# ── Configuration ───────────────────────────────────────────────
W, H = 1240, 1754
NAVY  = (10, 30, 46)        # #0A1E2E
CREAM = (237, 230, 211)     # #EDE6D3
TEAL  = (63, 168, 155)      # #3FA89B

# Rule line / dots / alphas (float 0-1 → 0-255)
DOT_RGBA  = (237, 230, 211, int(round(0.04 * 255)))   # ≈ (237,230,211,10)
RULE_RGBA = (237, 230, 211, int(round(0.18 * 255)))   # ≈ (237,230,211,46)

INSET_BORDER  = 56
INSET_CONTENT = 96
CONTENT_W     = W - 2 * INSET_CONTENT   # 1048
CENTRE_X      = W // 2

FONT_DIR    = '/home/claude/repo/fonts'
OSWALD_PATH = os.path.join(FONT_DIR, 'Oswald-VF.ttf')
MONO_PATH   = os.path.join(FONT_DIR, 'JetBrainsMono-Regular.ttf')
LOGO_PATH   = '/home/claude/repo/project/assets/logo-horizontal.png'

# ── Font helpers ────────────────────────────────────────────────
def oswald(size, weight=400):
    """Load Oswald at a specific weight using the VF axis."""
    f = ImageFont.truetype(OSWALD_PATH, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f

def mono(size):
    return ImageFont.truetype(MONO_PATH, size)

# ── Text with letter-spacing ────────────────────────────────────
def text_width(text, font, letter_spacing=0):
    if not text:
        return 0
    total = 0
    for ch in text:
        total += font.getlength(ch)
    total += letter_spacing * (len(text) - 1)
    return total

def draw_spaced(draw, pos, text, font, fill, letter_spacing=0):
    x, y = pos
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + letter_spacing

# ── Discipline font-size auto-fit ───────────────────────────────
def fit_discipline_size(text_upper):
    """Largest size ≤ 82 that still fits within CONTENT_W (letter-spacing 1)."""
    for size in range(82, 31, -1):
        f = oswald(size, weight=600)
        if text_width(text_upper, f, letter_spacing=1) <= CONTENT_W:
            return size
    return 32

# ── Dot pattern background ──────────────────────────────────────
def draw_dot_pattern(canvas):
    """Draw the subtle dot grid directly onto the canvas."""
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(0, H, 24):
        for x in range(0, W, 24):
            od.rectangle([x, y, x + 1, y + 1], fill=DOT_RGBA)
    canvas.alpha_composite(overlay)

# ── Main render ─────────────────────────────────────────────────
def create_cover(disciplina, ano, output_path):
    img = Image.new('RGBA', (W, H), NAVY + (255,))

    # 1. Dot pattern (alpha 0.04 cream)
    draw_dot_pattern(img)

    # 2. Inner border at inset 56
    draw = ImageDraw.Draw(img, 'RGBA')
    draw.rectangle(
        [INSET_BORDER, INSET_BORDER, W - INSET_BORDER - 1, H - INSET_BORDER - 1],
        outline=RULE_RGBA, width=1,
    )

    # 3. Logo at top
    logo = Image.open(LOGO_PATH).convert('RGBA')
    LOGO_H = 80
    logo_w = int(round(LOGO_H * logo.width / logo.height))
    logo = logo.resize((logo_w, LOGO_H), Image.LANCZOS)
    logo_x = CENTRE_X - logo_w // 2
    logo_y = INSET_CONTENT
    img.paste(logo, (logo_x, logo_y), logo)
    logo_bottom = logo_y + LOGO_H

    # 4. Footer — compute sizes + positions
    disc_upper = disciplina.upper()
    disc_fs = fit_discipline_size(disc_upper)
    f_disc = oswald(disc_fs, weight=600)
    f_year = oswald(52, weight=300)

    # Heights: discipline ≈ font_size; year with line-height 1.2
    disc_h = disc_fs
    year_h = int(round(52 * 1.2))
    footer_content_h = disc_h + 16 + year_h
    footer_total_h = 1 + 28 + footer_content_h  # border + padding + content

    footer_top = (H - INSET_CONTENT) - footer_total_h

    # Footer top-border
    draw.rectangle(
        [INSET_CONTENT, footer_top, W - INSET_CONTENT, footer_top + 1],
        fill=RULE_RGBA,
    )

    # Discipline (centered)
    disc_y = footer_top + 1 + 28
    disc_w = text_width(disc_upper, f_disc, letter_spacing=1)
    draw_spaced(draw, (CENTRE_X - disc_w / 2, disc_y),
                disc_upper, f_disc, CREAM, letter_spacing=1)

    # Year (centered, below)
    year_str = str(ano)
    year_y = disc_y + disc_h + 16
    year_w = text_width(year_str, f_year, letter_spacing=8)
    draw_spaced(draw, (CENTRE_X - year_w / 2, year_y),
                year_str, f_year, TEAL, letter_spacing=8)

    # 5. Centre (title block) — vertically centered between logo and footer
    title_fs = 124
    f_t1 = oswald(title_fs, weight=700)
    f_t2 = oswald(title_fs, weight=300)
    f_sub = mono(16)

    line1 = "JURISPRUDÊNCIA"
    line2 = "ESQUEMATIZADA"
    sub   = "INFORMATIVOS DO STJ E STF"

    # Use actual font bboxes for clean visual spacing — ignore the
    # CSS line-height magic since PIL draws from em-box top.
    l1_bbox = f_t1.getbbox(line1)     # (x0, y0, x1, y1)
    l2_bbox = f_t2.getbbox(line2)
    sub_bbox = f_sub.getbbox(sub)

    l1_visible_h = l1_bbox[3] - l1_bbox[1]
    l2_visible_h = l2_bbox[3] - l2_bbox[1]
    sub_visible_h = sub_bbox[3] - sub_bbox[1]

    GAP_1_2   = 18   # gap between line 1 bottom and line 2 top (visible)
    GAP_2_SUB = 40   # gap between line 2 bottom and subtitle top

    title_block_h = (
        l1_visible_h + GAP_1_2 + l2_visible_h + GAP_2_SUB + sub_visible_h
    )

    centre_top    = logo_bottom
    centre_bottom = footer_top
    centre_h      = centre_bottom - centre_top
    tb_top        = centre_top + (centre_h - title_block_h) // 2

    # Line 1 (cream, bold) — draw so visible top sits at tb_top
    l1_w = text_width(line1, f_t1, letter_spacing=1)
    l1_draw_y = tb_top - l1_bbox[1]   # compensate for bbox-top offset
    draw_spaced(draw, (CENTRE_X - l1_w / 2, l1_draw_y), line1, f_t1, CREAM, 1)
    l1_bottom_visible = tb_top + l1_visible_h

    # Line 2 (teal, light)
    l2_top_visible = l1_bottom_visible + GAP_1_2
    l2_draw_y = l2_top_visible - l2_bbox[1]
    l2_w = text_width(line2, f_t2, letter_spacing=1)
    draw_spaced(draw, (CENTRE_X - l2_w / 2, l2_draw_y), line2, f_t2, TEAL, 1)
    l2_bottom_visible = l2_top_visible + l2_visible_h

    # Subtitle (teal, mono, wide tracking)
    sub_top_visible = l2_bottom_visible + GAP_2_SUB
    sub_draw_y = sub_top_visible - sub_bbox[1]
    sub_w = text_width(sub, f_sub, letter_spacing=5)
    draw_spaced(draw, (CENTRE_X - sub_w / 2, sub_draw_y), sub, f_sub, TEAL, 5)

    # Save
    img.convert('RGB').save(output_path, 'PNG', optimize=True)


# ── Generate all covers ─────────────────────────────────────────
DISCIPLINES = [
    'Direito Administrativo',
    'Direito Administrativo Militar',
    'Direito Ambiental',
    'Direito Civil',
    'Direito Constitucional',
    'Direito da Criança e do Adolescente',
    'Direito do Consumidor',
    'Direito do Trabalho e Processual do Trabalho',
    'Direito econômico',
    'Direito Eleitoral',
    'Direito Empresarial',
    'Direito Financeiro',
    'Direito Internacional',
    'Direito Notarial e Registral',
    'Direito Penal',
    'Direito Penal e Processual Penal Militar',
    'Direito Previdenciário',
    'Direito Processual Civil',
    'Direito Processual Penal',
    'Direito Tributário',
]
YEARS = [2021, 2022, 2023, 2024, 2025, 2026]
BASE  = '/home/claude/repo/capas'

if __name__ == '__main__':
    count = 0
    for d in DISCIPLINES:
        folder = os.path.join(BASE, d)
        os.makedirs(folder, exist_ok=True)
        for y in YEARS:
            path = os.path.join(folder, f'{y}.png')
            create_cover(d, y, path)
            count += 1
            print(f'  OK  {d}/{y}.png')
    print(f'\n✓ {count} PNGs gerados em {BASE}/')
