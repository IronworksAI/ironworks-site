# Regenerate: python scripts/make_logo.py path/to/Figtree[wght].ttf public/brand  (needs: pip install fonttools uharfbuzz)
"""Generate Ironworks logo SVGs: I-beam mark, horizontal lockup, app icon, favicon.
Wordmark is Figtree (OFL) shaped with HarfBuzz and converted to outlines."""
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

FONT = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

INK = "#111111"
WHITE = "#FFFFFF"
WEIGHT = 620
TRACK = -0.02  # em, matches the site's tight display setting

# I-beam cross-section on a 64 grid, with concave fillets where the web meets the flanges.
BEAM = (
    "M8 8H56V20H44A6 6 0 0 0 38 26V38A6 6 0 0 0 44 44H56V56H8V44H20"
    "A6 6 0 0 0 26 38V26A6 6 0 0 0 20 20H8Z"
)

# --- Wordmark outlines -------------------------------------------------------
var = TTFont(FONT)
inst = instantiateVariableFont(var, {"wght": WEIGHT}, inplace=False)
upem = inst["head"].unitsPerEm
glyphset = inst.getGlyphSet()

blob = hb.Blob.from_file_path(str(FONT))
face = hb.Face(blob)
font = hb.Font(face)
font.set_variations({"wght": WEIGHT})
buf = hb.Buffer()
buf.add_str("Ironworks")
buf.guess_segment_properties()
hb.shape(font, buf, {"kern": True, "liga": True})

order = inst.getGlyphOrder()
x = 0.0
paths = []
for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
    name = order[info.codepoint]
    pen = SVGPathPen(glyphset)
    # flip Y (font units are y-up), place at pen position
    tpen = TransformPen(pen, (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset))
    glyphset[name].draw(tpen)
    paths.append(pen.getCommands())
    x += pos.x_advance + TRACK * upem
word_width = x - TRACK * upem
word_d = " ".join(paths)
cap = inst["OS/2"].sCapHeight or 700

# --- Lockup geometry (font units) ---------------------------------------------
mark_h = cap * 1.0           # mark matches cap height
scale = mark_h / 48          # beam spans 8..56 on the 64 grid (48 units)
gap = cap * 0.34
pad = cap * 0.08
mark_w = 48 * scale
total_w = pad + mark_w + gap + word_width + pad
top = -cap - pad
height = cap + 2 * pad


def lockup(color: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {top:.1f} {total_w:.1f} {height:.1f}" role="img" aria-label="Ironworks">
  <title>Ironworks</title>
  <g fill="{color}">
    <path transform="translate({pad:.1f} {-cap:.1f}) scale({scale:.4f}) translate(-8 -8)" d="{BEAM}"/>
    <path transform="translate({pad + mark_w + gap:.1f} 0)" d="{word_d}"/>
  </g>
</svg>
'''


def mark(color: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Ironworks">
  <title>Ironworks</title>
  <path fill="{color}" d="{BEAM}"/>
</svg>
'''


def app_icon() -> str:
    # iOS-style squircle-ish rounded square, beam at ~56% of the tile.
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-label="Ironworks">
  <title>Ironworks</title>
  <rect width="1024" height="1024" rx="230" fill="{INK}"/>
  <path fill="{WHITE}" transform="translate(512 512) scale(12) translate(-32 -32)" d="{BEAM}"/>
</svg>
'''


def favicon() -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="{INK}"/>
  <path fill="{WHITE}" transform="translate(32 32) scale(0.72) translate(-32 -32)" d="{BEAM}"/>
</svg>
'''


(OUT / "ironworks-logo.svg").write_text(lockup(INK))
(OUT / "ironworks-logo-white.svg").write_text(lockup(WHITE))
(OUT / "ironworks-mark.svg").write_text(mark(INK))
(OUT / "ironworks-mark-white.svg").write_text(mark(WHITE))
(OUT / "ironworks-app-icon.svg").write_text(app_icon())
(OUT / "favicon.svg").write_text(favicon())
print("wrote", sorted(p.name for p in OUT.iterdir()), "| word width", round(word_width), "cap", cap)
