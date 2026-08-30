'use client';

/**
 * Ugravirani grb — signature motiv cijelog weba.
 *
 * Preslikava ono što je stvarno ugravirano u stolovima Karake: dvostruki
 * prsten, tekst po kružnici, jedra u sredini, godina dolje.
 *
 * Geometrija (viewBox 200×200), tri pojasa koja se ne smiju presijecati:
 *   r 96 / 91  — vanjski prstenovi
 *   r 78       — lukovi za tekst, između vanjskog i unutarnjeg prstena
 *   r 63       — unutarnji prsten; sve unutra je jedrenjak + godina
 *
 * `draw` priprema za GSAP stroke-dash animaciju (tekst kreće nevidljiv).
 */

type Props = {
  /** tekst po gornjem luku */
  top?: string;
  /** tekst po donjem luku */
  bottom?: string;
  /** velika oznaka u sredini, ispod jedrenjaka (npr. godina).
   *  Prazan string = bez natpisa (undefined bi pokupio default). */
  center?: string;
  /** mala oznaka pod njom; izostavi je ako nema što reći */
  sub?: string;
  /** false = prikaži samo vanjske prstenove i lukove teksta (okvir za fotku) */
  core?: boolean;
  /** true = verzija za male veličine (header, ~44 px).
   *  Deblji potezi, bez teksta po kružnici, bez unutarnjeg prstena i bočnih
   *  jarbola — na 44 px se ti detalji ionako pretvore u mrlju. */
  mark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  draw?: boolean;
  'data-hero-crest'?: boolean;
};

import { useId } from 'react';

export default function Crest({
  top = 'IRISH PUB KARAKA',
  bottom = 'IZMEĐU POLAČA · DUBROVNIK',
  center = 'PORT OF CALL',
  sub,
  core = true,
  mark = false,
  className,
  style,
  draw = false,
  ...rest
}: Props) {
  // Jedinstven id po instanci: dva grba na istoj stranici ne smiju dijeliti
  // <path> za textPath. useId je hydration-safe (obični brojač ne bi bio),
  // a dvotočke iz njega izbacujemo da id ostane čist za href="#…".
  const uid = `crest-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const hidden = draw ? { opacity: 0 } : undefined;
  // potezi se u mark načinu podebljaju da znak preživi 44 px
  const w = (n: number) => (mark ? n * 2.1 : n);
  const coreStyle = {
    opacity: core ? 1 : 0,
    transition: 'opacity 600ms cubic-bezier(.16,1,.3,1)',
  };

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      data-crest={draw ? 'draw' : undefined}
      fill="none"
      {...rest}
    >
      <defs>
        {/* gornji luk čita se lijevo→desno preko vrha */}
        <path id={`${uid}-t`} d="M100 100 m-78 0 a78 78 0 0 1 156 0" />
        {/* donji luk je obrnut da tekst ostane uspravan */}
        <path id={`${uid}-b`} d="M100 100 m-78 0 a78 78 0 0 0 156 0" />
      </defs>

      <g stroke="currentColor">
        {!mark && <circle cx="100" cy="100" r="96" strokeWidth="0.75" opacity="0.5" />}
        <circle cx="100" cy="100" r={mark ? 88 : 91} strokeWidth={w(2.25)} />
        {!mark && (
          <circle
            cx="100"
            cy="100"
            r="63"
            strokeWidth="0.75"
            opacity="0.5"
            style={coreStyle}
          />
        )}
      </g>

      {!mark && (
      <g fill="currentColor" stroke="none" data-crest-text style={hidden}>
        <text fontSize="11" letterSpacing="3.2" fontFamily="var(--font-mono), monospace">
          <textPath href={`#${uid}-t`} startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text
          fontSize="8.5"
          letterSpacing="2.4"
          fontFamily="var(--font-mono), monospace"
          opacity="0.72"
        >
          <textPath href={`#${uid}-b`} startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>
      </g>
      )}

      {/* jedrenjak — tri jarbola karake svedena na tri trokuta.
          Bez središnjeg natpisa spusti se da ostane optički u sredini. */}
      <g
        stroke="currentColor"
        strokeLinejoin="round"
        data-crest-sail
        strokeWidth={w(1.5)}
        // u mark načinu jedrenjak se poveća oko vlastitog središta (~100,86) da
        // ispuni prsten — inače na 44 px pluta kao mrvica usred kruga
        transform={
          mark
            ? 'translate(100 86) scale(1.45) translate(-100 -86)'
            : center
              ? undefined
              : 'translate(0 14)'
        }
        style={coreStyle}
      >
        <path d="M100 48 L100 106" strokeWidth={w(1.1)} opacity="0.55" />
        {!mark && <path d="M76 58 L76 102" strokeWidth="0.9" opacity="0.38" />}
        {!mark && <path d="M124 58 L124 102" strokeWidth="0.9" opacity="0.38" />}
        <path d="M100 50 L115 96 L100 96 Z" />
        <path d="M100 50 L85 96 L100 96 Z" opacity={mark ? 0.75 : 0.5} />
        {!mark && <path d="M76 62 L86 98 L76 98 Z" opacity="0.36" />}
        {!mark && <path d="M124 62 L114 98 L124 98 Z" opacity="0.36" />}
        {/* trup */}
        <path d="M70 106 Q100 120 130 106 L126 100 L74 100 Z" strokeWidth={w(1.4)} />
        {/* val */}
        {!mark && <path d="M68 116 q9 5 18 0 t18 0 t18 0" strokeWidth="0.9" opacity="0.45" />}
      </g>

      {!mark && (
      <g
        fill="currentColor"
        stroke="none"
        textAnchor="middle"
        data-crest-text
        style={{ ...hidden, ...coreStyle }}
      >
        <text
          x="100"
          y={sub ? 136 : 141}
          fontSize="11"
          letterSpacing="3"
          fontFamily="var(--font-mono), monospace"
        >
          {center || null}
        </text>
        {sub && (
          <text
            x="100"
            y="148"
            fontSize="7.5"
            letterSpacing="2.8"
            opacity="0.65"
            fontFamily="var(--font-mono), monospace"
          >
            {sub}
          </text>
        )}
      </g>
      )}
    </svg>
  );
}
