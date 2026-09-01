'use client';

import Image from 'next/image';

/**
 * Znak stranice — pravi logo s fizičke table (kružni badge, script „Karaka",
 * djetelina). Isti u headeru i footeru, favicon i apple-icon su izvedeni iz
 * njega preko `scripts/images.mjs`.
 *
 * OGRANIČENJE: izvor je 160×192 px raster skinut sa starog WordPressa —
 * jedini koji postoji. Next/Image ga skalira dolje bez gubitka (nikad se ne
 * traži uvećanje preko izvorne veličine), ali gore od ~90 px visine počinje
 * omekšavati. Traži se vektor od klijenta; kad stigne, mijenja se samo
 * datoteka u `assets/` i ponovno se pokrene `npm run images`.
 *
 * Uvijek je link na vrh stranice.
 */
export default function Logo({
  size = 40,
  priority = false,
  className = '',
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#top"
      aria-label="Irish Pub Karaka — back to top"
      className={`inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Image
        src="/img/karaka-logo.webp"
        alt="Irish Pub Karaka"
        width={159}
        height={190}
        priority={priority}
        sizes={`${size * 2}px`}
        style={{ height: size, width: 'auto' }}
      />
    </a>
  );
}
