'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { hero, venue } from '@/content/site';
import { openState, SSR_STATE, type OpenState } from '@/lib/openState';
import Cta from './ui/Cta';

/**
 * Hero — wow efekt stranice.
 *
 * Wow nije animacija nego to što je stranica ŽIVA: gost odmah vidi da je
 * otvoreno, koliko još, i kakav je pub baš u ovom satu. To je ujedno i
 * najjači prodajni argument („otvoreno je, dva si koraka daleko").
 *
 * Fotografija: SSR uvijek renderira dnevnu (najvjerojatniji sat posjeta,
 * `priority` zbog LCP-a). Tek ako je u Dubrovniku mrak, klijent dovuče noćnu
 * i crossfadea. Gost koji dođe danju noćnu fotku nikad ni ne skine.
 *
 * Cijela uvodna animacija je u CSS-u (globals.css), ne u GSAP-u — hero se
 * mora nacrtati prije nego JS stigne.
 */

const DAY = { src: 'alley-crowd', alt: 'The busy stone lane Između polača beneath the Irish Pub Karaka lantern' };
const NIGHT = { src: 'board-neon-guests', alt: 'Guests at a table beneath the green neon draught board inside Irish Pub Karaka' };

export default function Hero() {
  // SSR i prvi paint idu na neutralno popodne; živo stanje stiže na mountu,
  // pa nema hydration mismatcha.
  const [state, setState] = useState<OpenState>(SSR_STATE);

  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    // status se sam osvježi ako netko drži stranicu otvorenu preko punog sata
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="zone-light relative isolate min-h-[100svh] overflow-hidden">
      {/* ------------------------------------------------------- pozadina */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={`/img/${DAY.src}.webp`}
          alt={DAY.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-img object-cover object-[50%_38%]"
        />
        {/* noćna varijanta se dovlači tek kad je stvarno mrak u Dubrovniku */}
        {state.dark && (
          <Image
            src={`/img/${NIGHT.src}.webp`}
            alt={NIGHT.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_45%] transition-opacity duration-1000"
          />
        )}

        {/* Scrim radi dvije stvari: drži kontrast teksta i skriva to što su
            izvori portretni 1066×1600 pa se na širokom ekranu uvećavaju. */}
        <div
          className="hero-scrim absolute inset-0"
          style={{
            // Tama se koncentrira tamo gdje sjedi tekst (dolje lijevo).
            // Gornji desni kut ostaje sunčan — fotka je vedra uličica i tako
            // mora i djelovati, inače hero izgleda kao sumrak.
            background: [
              'linear-gradient(to top, rgba(10,7,5,.92) 0%, rgba(10,7,5,.62) 28%, rgba(10,7,5,.12) 58%, transparent 78%)',
              'linear-gradient(to right, rgba(10,7,5,.72) 0%, rgba(10,7,5,.24) 40%, transparent 62%)',
              // kratki gradijent samo iza trake — bez njega se linkovi gube na
              // osunčanom dijelu zida
              'linear-gradient(to bottom, rgba(10,7,5,.5) 0%, transparent 15%)',
            ].join(', '),
          }}
        />
      </div>

      {/* --------------------------------------------------------- sadržaj */}
      <div className="shell relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end pb-12 pt-32 md:pb-16">
        <div className="max-w-[46rem]">
          <h1
            className="display text-[clamp(2.4rem,6.4vw,5.5rem)]"
            style={{ color: '#f6efe4' }}
          >
            {hero.lines.map((line, i) => (
              <span key={line} className="hero-line">
                <span style={{ '--i': i } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>

          <p
            className="hero-up prose-lead mt-7 max-w-[34ch]"
            style={{ '--d': '620ms', color: 'rgba(246,239,228,.82)' } as React.CSSProperties}
          >
            {state.line}
          </p>
        </div>

        {/* -------------------------------------------------------- akcije */}
        <div
          className="hero-up mt-9 flex flex-wrap items-center gap-3"
          style={{ '--d': '740ms' } as React.CSSProperties}
        >
          <Cta href={venue.maps} tone="light" external className="max-sm:w-full">
            {hero.cta}
          </Cta>
          <Cta href={`tel:${venue.phoneHref}`} tone="light" variant="ghost" arrow={false} className="max-sm:w-full">
            {hero.ctaSecondary}
          </Cta>
        </div>

        {/* ------------------------------------------------------ podnožje */}
        <div
          className="hero-up mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t pt-6"
          style={{ '--d': '860ms', borderColor: 'rgba(246,239,228,.18)' } as React.CSSProperties}
        >
          <span className="label" style={{ color: 'rgba(246,239,228,.55)' }}>
            {hero.eyebrow}
          </span>
          <span className="mono text-[0.75rem]" style={{ color: 'rgba(246,239,228,.42)' }}>
            {venue.street} · {venue.hours}
          </span>
        </div>
      </div>
    </section>
  );
}
