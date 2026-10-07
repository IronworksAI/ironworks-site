// Bauhaus-style tile art built from shop shapes: quarter rounds, half pipes, blocks and I-beams.
// Seeded, so each card renders the same pattern every time.

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const S = 40;

// Same path as the logo in public/brand: I-beam cross-section with filleted inner corners.
const BEAM =
  "M8 8H56V20H44A6 6 0 0 0 38 26V38A6 6 0 0 0 44 44H56V56H8V44H20A6 6 0 0 0 26 38V26A6 6 0 0 0 20 20H8Z";

function tile(kind: number, rot: number, fill: string, key: string, x: number, y: number) {
  const t = `translate(${x * S} ${y * S}) rotate(${rot * 90} ${S / 2} ${S / 2})`;
  switch (kind) {
    case 0: // quarter round
      return <path key={key} transform={t} d={`M0 0H${S}A${S} ${S} 0 0 1 0 ${S}Z`} fill={fill} />;
    case 1: // half pipe
      return <path key={key} transform={t} d={`M0 ${S}A${S / 2} ${S / 2} 0 0 1 ${S} ${S}Z`} fill={fill} />;
    case 2: // block
      return <rect key={key} transform={t} width={S} height={S} fill={fill} />;
    case 3: // ramp
      return <path key={key} transform={t} d={`M0 0L${S} ${S}H0Z`} fill={fill} />;
    case 4: // I-beam, the logo mark (64-grid path, spans 8..56) fitted to 6..34 of the tile
      return <path key={key} transform={`${t} translate(6 6) scale(${28 / 48}) translate(-8 -8)`} d={BEAM} fill={fill} />;
    case 5: // dot
      return <circle key={key} transform={t} cx={S / 2} cy={S / 2} r={S / 2 - 4} fill={fill} />;
    default:
      return null;
  }
}

export function ShapeArt({
  seed,
  cols = 10,
  rows = 5,
  bg,
  colors,
  kinds = [0, 1, 2, 3, 4, 5],
  density = 0.7,
}: {
  seed: number;
  cols?: number;
  rows?: number;
  bg: string;
  colors: string[];
  kinds?: number[];
  density?: number;
}) {
  const rand = rng(seed);
  const tiles = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rand() > density) continue;
      const kind = kinds[Math.floor(rand() * kinds.length)];
      const r = Math.floor(rand() * 4);
      const rot = kind === 4 ? 0 : r; // I-beams stay upright, like the logo
      const fill = colors[Math.floor(rand() * colors.length)];
      tiles.push(tile(kind, rot, fill, `${x}-${y}`, x, y));
    }
  }
  return (
    <svg aria-hidden viewBox={`0 0 ${cols * S} ${rows * S}`} preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
      <rect width={cols * S} height={rows * S} fill={bg} />
      {tiles}
    </svg>
  );
}
