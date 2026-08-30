'use client';

import Crest from './Crest';

/**
 * Znak stranice — zlatni ugravirani grb, isti u headeru i footeru.
 *
 * Vektorski je, pa je oštar na svakoj veličini i na svakom DPR-u. Fizička tabla
 * lokala ima drugi, rasterski logo (`assets/karaka-logo.png`, samo 160×192 px);
 * ako klijent pošalje vektorsku verziju tog znaka, mijenja se sadržaj ove
 * komponente i ništa drugo.
 *
 * U headeru se tekst po kružnici izostavlja — na 38 px se ionako ne čita, a
 * bez njega grb ostaje čist.
 */
export default function Logo({
  size = 40,
  compact = false,
  className = '',
}: {
  size?: number;
  /** true = bez teksta po kružnici (za male veličine) */
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#top"
      aria-label="Irish Pub Karaka — back to top"
      className={`inline-flex shrink-0 items-center justify-center transition-opacity duration-300 hover:opacity-75 ${className}`}
      style={{ height: size, width: size }}
    >
      <Crest
        mark={compact}
        className="h-full w-full"
        style={{ color: 'currentColor' }}
      />
    </a>
  );
}
