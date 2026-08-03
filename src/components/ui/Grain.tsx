/**
 * Papirnata zrnatost preko cijele stranice.
 * SVG feTurbulence umjesto PNG-a — nula mrežnih zahtjeva, skalira se
 * na svaki DPR. `mix-blend-mode: overlay` znači da radi i na svijetloj
 * vapnenačkoj i na tamnoj noćnoj podlozi.
 */
export default function Grain() {
  return (
    <svg className="grain-layer" aria-hidden="true">
      <filter id="karaka-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.55" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#karaka-grain)" />
    </svg>
  );
}
