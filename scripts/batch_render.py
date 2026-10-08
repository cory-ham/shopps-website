#!/usr/bin/env python3
"""
batch_render.py — Render all slab images for the SHOPPS carousel.

Card formula: 8*P + offset (1-indexed cards, zero-indexed persons)
  green front  = 8*P + 1
  teal  front  = 8*P + 3
  gold  front  = 8*P + 5

Output: public/slabs/slab-pNN-green.jpg  (NN = zero-padded person index)
         public/slabs/slab-pNN-teal.jpg
         public/slabs/slab-pNN-gold.jpg
"""

import os, sys, time

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO       = os.path.normpath(os.path.join(SCRIPT_DIR, '..'))
sys.path.insert(0, SCRIPT_DIR)

from render_slab import render_slab

SLABS_OUT = os.path.join(REPO, 'public', 'slabs')
CARDS_DIR = os.path.join(REPO, 'public', 'cards')

# ── Full people database (P = 0..98)
# Format: P, name, company, title, sex (M/F)
PEOPLE = [
    (0,  'BART SZANIEWSKI',         'DAD GANG CO.',             'CO-FOUNDER & CEO',                  'M'),
    (1,  'BEAR HANDLON',            'BORN PRIMITIVE',           'FOUNDER & CEO',                     'M'),
    (2,  'BEN COGAN',               'BEANSTALK',                'CO-FOUNDER',                        'M'),
    (3,  'CHASE DIMOND',            'ECOM EMAIL MARKETER',      'CO-FOUNDER',                        'M'),
    (4,  'SEAN FRANK',              'RIDGE',                    'CEO',                               'M'),
    (5,  'CHAD JANIS',              'GRUNS',                    'FOUNDER & CEO',                     'M'),
    (6,  'MATTHEW BERTULLI',        'PELA',                     'CO-FOUNDER',                        'M'),
    (7,  'CHRIS HALL',              'ECOMM COWBOY',             'HOST',                              'M'),
    (8,  'MIKE BECKHAM',            'SIMPLE MODERN',            'CEO',                               'M'),
    (9,  'NICK SHACKELFORD',        'BREZ',                     'PARTNER',                           'M'),
    (10, 'EZRA FIRESTONE',          'BOOM! BEAUTY',             'CEO',                               'M'),
    (11, 'JOHN ROMAN',              'BATTLBOX',                 'CEO',                               'M'),
    (12, 'JIMMY KIM',               'COMMERCE ROUNDTABLE',      'CEO',                               'M'),
    (13, 'ZACH STUCK',              'HOMESTEAD',                'CO-FOUNDER',                        'M'),
    (14, 'ANDREW YOUDERIAN',        'ECOMFUEL',                 'FOUNDER & CHIEF INSTIGATOR',        'M'),
    (15, 'RONAK SHAH',              'OBVI',                     'CO-FOUNDER & CEO',                  'M'),
    (16, 'JOSH HASKINS',            'HOLLOW SOCKS',             'CEO',                               'M'),
    (17, 'ISAAC MEDEIROS',          'CONTENT FORGE',            'CEO & FOUNDER',                     'M'),
    (18, 'MICHAEL MCVERRY',         'URBAN ARMOR GEAR',         'SVP ECOMMERCE',                     'M'),
    (19, 'PAUL JAUREGUI',           'BK BEAUTY',                'CO-FOUNDER',                        'M'),
    (20, 'ROBERT FELDER',           'BEARBOTTOM CLOTHING',      'CEO',                               'M'),
    (21, 'JESSICA BERMAN',          'BODYBIO',                  'OWNER, CMO',                        'F'),
    (22, 'JASON PANZER',            'HEXCLAD',                  'PRESIDENT & CFO',                   'M'),
    (23, 'BRAD BLANKINSHIP',        'SUN DAY RED',              'PRESIDENT',                         'M'),
    (24, 'SCOTT KRAMER',            'NAKED & THRIVING',         'CMO',                               'M'),
    (25, 'KATRINA LAKE',            'STITCH FIX',               'FOUNDER & BOARD CHAIR',             'F'),
    (26, 'CASSANDRA THURSWELL',     'KITSCH',                   'CEO',                               'F'),
    (27, 'DREW ARCIUOLO',           'VKTRY GEAR',               'CMO',                               'M'),
    (28, 'BETHANY CATRON EVANS',    'RHONE',                    'CHIEF MARKETING OFFICER',           'F'),
    (29, 'SEAN RILEY',              'DUDE WIPES',               'CHIEF EXECUTIVE DUDE',              'M'),
    (30, 'LINDSAY SHUMLAS',         'COTOPAXI',                 'CEO',                               'F'),
    (31, 'ANDREA FAULKNER WILLIAMS','TUBBY TODD',               'CO-FOUNDER & PRESIDENT',            'F'),
    (32, 'KIMBERLEY HO',            'EVERDEN',                  'CO-FOUNDER & CEO',                  'F'),
    (33, 'SIFFAT HAIDER',           'ARRAE',                    'CO-FOUNDER & CO-CEO',               'F'),
    (34, 'TIFFANI CARTER',          'PATTERN BEAUTY',           'CHIEF MARKETING OFFICER',           'F'),
    (35, 'ERICA GOOD',              'MOMENTOUS',                'CO-FOUNDER & PRESIDENT',            'F'),
    (36, 'ARIANA FERWERDA',         'HALFDAYS',                 'CO-FOUNDER & CEO',                  'F'),
    (37, 'RASHAD HOSSAIN',          'RYZE SUPERFOODS',          'FOUNDER & CEO',                     'M'),
    (38, 'SOPHIA EDELSTEIN',        'PAIR EYEWEAR',             'CO-FOUNDER & CO-CEO',               'F'),
    (39, 'JILL LAYFIELD',           'BIRDY GREY',               'CHIEF EXECUTIVE OFFICER',           'F'),
    (40, 'GORJANA REIDEL',          'GORJANA',                  'CO-FOUNDER & PRESIDENT',            'F'),
    (41, 'ANISHA RAGHAVAN',         'SEED HEALTH',              'CHIEF MARKETING OFFICER',           'F'),
    (42, 'SARAH RAHAL',             'ARMRA',                    'FOUNDER & CEO',                     'F'),
    (43, 'ANDREW BENIN',            'GRAZA',                    'CO-FOUNDER & CEO',                  'M'),
    (44, 'KATERINA SCHNEIDER',      'RITUAL',                   'FOUNDER & CEO',                     'F'),
    (45, 'JORDAN NATHAN',           'CARAWAY HOME',             'FOUNDER & CEO',                     'M'),
    (46, 'MARADITH FRENKEL',        'LITTLE SLEEPIES',          'FOUNDER & EXEC. CHAIRWOMAN',        'F'),
    (47, 'MICHELLE MILLER',         'VEGAMOUR',                 'CHIEF MARKETING OFFICER',           'F'),
    (48, 'JORDAN MENARD',           'RENOUX',                   'CEO & CO-FOUNDER',                  'M'),
    (49, 'VICKY WILLIAMS GRAHAN',   'COYUCHI',                  'PRESIDENT',                         'F'),
    (50, 'ANDREW FARIS',            'AJF GROWTH',               'CEO',                               'M'),
    (51, 'CODY PLOFKER',            'WINKS',                    'CO-FOUNDER',                        'M'),
    (52, 'STEVEN BORRELLI',         'CUTS',                     'FOUNDER & CEO',                     'M'),
    (53, 'KAYTI O\'CONNELL CARR',   'MATE THE LABEL',           'FOUNDER & CEO',                     'F'),
    (54, 'CHRIS LANG',              'FRESH CHILE',              'PARTNER',                           'M'),
    (55, 'BILL D\'ALESSANDRO',      'ELEMENTS BRANDS',          'FOUNDER',                           'M'),
    (56, 'BRIAN WADDICK',           'SMACKIN\'',                'FOUNDER & CEO',                     'M'),
    (57, 'THE NORMAL BRAND TEAM',   'THE NORMAL BRAND',         'CO-OWNERS',                         'M'),
    (58, 'ALEJANDRO CHAHIN',        'MOTT & BOW',               'CEO',                               'M'),
    (59, 'ARIEL KAYE',              'PARACHUTE HOME',           'FOUNDER',                           'F'),
    (60, 'MARI LLEWELLYN',          'BLOOM NUTRITION',          'CO-FOUNDER',                        'F'),
    (61, 'HUDSON LEOGRANDE',        'COMFRT',                   'FOUNDER',                           'M'),
    (62, 'MATTEO FRANCESCHETTI',    'EIGHT SLEEP',              'CEO',                               'M'),
    (63, 'PETER RAHAL',             'DAVID PROTEIN',            'CEO',                               'M'),
    (64, 'WILL AHMED',              'WHOOP',                    'CEO',                               'M'),
    (65, 'GURMER CHOPRA',           'YOUNGLA',                  'CO-FOUNDER & OWNER',                'M'),
    (66, 'NELL DIAMOND',            'HILL HOUSE HOME',          'FOUNDER & CEO',                     'F'),
    (67, 'JUSTIN MARES',            'KETTLE & FIRE',            'FOUNDER',                           'M'),
    (68, 'DANNY YEUNG',             'PRENETICS',                'CEO',                               'M'),
    (69, 'TERO ISOKAUPPILA',        'FOUR SIGMATIC',            'FOUNDER & CEO',                     'M'),
    (70, 'SARAH PAIJI YOO',         'BLUELAND',                 'CO-FOUNDER & CEO',                  'F'),
    (71, 'CAMRON COLLARD',          'MICROPERFUMES',            'CO-FOUNDER & COO',                  'M'),
    (72, 'CHRISTIAN GUZMAN',        'ALPHALETE ATHLETICS',      'FOUNDER & CEO',                     'M'),
    (73, 'PAUL HEDRICK',            'TECOVAS',                  'FOUNDER',                           'M'),
    (74, 'CHERENE AUBERT',          'GROWTH CAPITAL',           'CEO',                               'F'),
    (75, 'MARK MASTRANDREA',        'IKONICK',                  'CEO & CO-FOUNDER',                  'M'),
    (76, 'EDWARD WIMMER IV',        'ROAD ID',                  'CO-FOUNDER',                        'M'),
    (77, 'RYAN BABENZIEN',          'JOLIE',                    'FOUNDER & CEO',                     'M'),
    (78, 'BEAV BRODIE',             'TACTICAL BABY GEAR',       'FOUNDER & CEO',                     'M'),
    (79, 'BRIAN GAROFALOW',         'SKULLCANDY',               'CEO',                               'M'),
    (80, 'KATY MIMARI',             'CADEN LANE',               'FOUNDER & CEO',                     'F'),
    (81, 'DEAN BRENNAN',            'HEART & SOIL',             'CEO',                               'M'),
    (82, 'TYLER MCCANN',            'TASTE SALUD',              'CO-FOUNDER',                        'M'),
    (83, 'ROMAN KHAN',              'RAYCON GLOBAL',            'FOUNDER & CMO',                     'M'),
    (84, 'JOSH SHAPIRO',            'BASEBALL LIFESTYLE 101',   'CEO',                               'M'),
    (85, 'BILL ROM',                'BASEBALL LIFESTYLE 101',   'CMO',                               'M'),
    (86, 'CURTIS MATSKO',           'PORTLAND LEATHER',         'CEO',                               'M'),
    (87, 'ERIC GIROUARD',           'BRUNT',                    'FOUNDER & CEO',                     'M'),
    (88, 'JORDAN PALMER',           'THREAD PERFORMANCE',       'CO-FOUNDER',                        'M'),
    (89, 'ARI MURRAY',              'SALT & STONE',             'CDO',                               'F'),
    (90, 'BRYAN CANO',              'MADE ADAPTIVE',            'FOUNDER',                           'M'),
    (91, 'KEVIN LAVELLE',           'MIZZEN+MAIN',              'FOUNDER & CEO',                     'M'),
    (92, 'VICTOR TAM',              'MONOS',                    'CEO & CO-FOUNDER',                  'M'),
    (93, 'ERIC PANOFSKY',           'SLTWTR',                   'CO-FOUNDER & CEO',                  'M'),
    (94, 'MEHTAB BHOGAL',           'KARTA VENTURES',           'FOUNDER',                           'M'),
    (95, 'FREDDY WARD',             'WILD',                     'CO-FOUNDER & CEO',                  'M'),
    (96, 'SIENNA MCCORMICK',        'CREATE WELLNESS',          'CO-FOUNDER & CO-CEO',               'F'),
    (97, 'TAYLOR HOLIDAY',          'COMMON THREAD COLLECTIVE', 'CEO',                               'M'),
    (98, 'MYSTERY CARD',            'ABSOLUTELY RIDICULOUS',    'FOUNDER & ARTIST',                  'M'),
]

VARIANTS = [
    ('green', 1),
    ('teal',  3),
    ('gold',  5),
]

def card_path(p: int, offset: int) -> str:
    num = 8 * p + offset
    return os.path.join(CARDS_DIR, f'card-{num:03d}.jpg')

def slab_path(p: int, variant: str) -> str:
    return os.path.join(SLABS_OUT, f'slab-p{p:02d}-{variant}.jpg')

def main():
    total = len(PEOPLE) * len(VARIANTS)
    done  = 0
    t0    = time.time()
    errors = []

    for p, name, company, title, _ in PEOPLE:
        for variant, offset in VARIANTS:
            cp = card_path(p, offset)
            sp = slab_path(p, variant)
            done += 1

            # Skip if card doesn't exist
            if not os.path.exists(cp):
                print(f'  [skip] {cp} not found')
                continue

            try:
                render_slab(cp, name, company, title, sp)
            except Exception as e:
                msg = f'  [ERROR] P={p} {variant}: {e}'
                print(msg)
                errors.append(msg)

            if done % 30 == 0:
                elapsed = time.time() - t0
                eta = elapsed / done * (total - done)
                print(f'  Progress: {done}/{total}  ({elapsed:.0f}s elapsed, ~{eta:.0f}s remaining)')

    elapsed = time.time() - t0
    print(f'\nDone! {done} renders in {elapsed:.1f}s')
    if errors:
        print(f'{len(errors)} errors:')
        for e in errors:
            print(e)


if __name__ == '__main__':
    main()
