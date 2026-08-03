'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, DESKTOP, enterIn, scoped } from '@/lib/gsap';
import { tables } from '@/content/site';
import { SectionIndex } from './ui/Reveal';
import Crest from './ui/Crest';

/**
 * ⭐ Signature sekcija.
 *
 * Svaki stol u Karaki nosi ugraviran grb drugog irskog puba iz svijeta.
 * Ovdje su ti grbovi nacrtani kao gravure; kad pređeš preko jednog, kroz
 * njegov prsten se otvori stvarna fotografija tog stola.
 *
 * Grbovi su posloženi u ciglasti vez (svaki drugi pomaknut), pa se motiv
 * cigle iz puba ponavlja i u rasporedu.
 */
export default function Tables() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      enterIn(root.current, q, { start: 'top 76%' });

      const cards = q('[data-crest-card]');
      gsap.set(cards, { opacity: 0, y: 40, rotate: -4 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.05,
        ease: EASE.out,
        stagger: 0.09,
        scrollTrigger: { trigger: q('[data-crest-grid]')[0], start: 'top 82%', once: true },
      });

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        // grbovi se lagano okreću dok sekcija prolazi — kao da se stol vrti
        cards.forEach((card, i) => {
          const svg = card.querySelector('svg');
          if (!svg) return;
          gsap.to(svg, {
            rotate: i % 2 ? -14 : 14,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tables" ref={root} data-tone="clay" className="relative py-24 md:py-36">
      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index={tables.index} label="Tables" className="mb-10" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34ch)] lg:items-end lg:gap-16">
          <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
            {['Tables from', 'everywhere'].map((line) => (
              <span key={line} className="reveal-line">
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p
            data-fade
            className="prose-lead lg:pb-3"
            style={{ color: 'color-mix(in oklab, var(--fg) 76%, transparent)' }}
          >
            {tables.lead}
          </p>
        </div>

        {/* ---------------------------------------------------- ciglasti vez */}
        <ul
          data-crest-grid
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-6"
        >
          {tables.crests.map((crest, i) => {
            const on = active === i;
            return (
              // Pomak ide na <button>, ne na <li>: GSAP animira <li> i pritom
              // gasi Tailwindov `translate:` (v4), pa bi running bond nestao.
              <li key={crest.name} data-crest-card>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(on ? null : i)}
                  className={`group block w-full text-left ${i % 2 ? 'lg:translate-y-16' : ''}`}
                  aria-label={`${crest.name}, ${crest.place}`}
                >
                  <span className="relative block aspect-square w-full">
                    {/* stvarna fotografija stola — otvara se kroz prsten grba */}
                    <span
                      aria-hidden
                      className="absolute inset-0 overflow-hidden rounded-full transition-[clip-path,opacity] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]"
                      style={{
                        clipPath: on ? 'circle(50% at 50% 50%)' : 'circle(28% at 50% 50%)',
                        opacity: on ? 1 : 0,
                      }}
                    >
                      <Image
                        src={`/img/${crest.img}.webp`}
                        alt=""
                        width={1066}
                        height={1600}
                        sizes="(max-width: 1023px) 44vw, 22vw"
                        className="h-full w-full object-cover"
                      />
                    </span>

                    <Crest
                      top={crest.name.toUpperCase()}
                      bottom={crest.place.toUpperCase()}
                      center={crest.est === '—' ? '' : `EST. ${crest.est}`}
                      core={!on}
                      className="absolute inset-0 h-full w-full transition-[color,opacity] duration-700"
                      style={{
                        color: on ? 'var(--color-brass-lit)' : 'var(--fg)',
                        opacity: on ? 1 : 0.8,
                      }}
                    />
                  </span>

                  <span className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="display-sub text-[1.0625rem]">{crest.name}</span>
                    <span className="mono text-[0.6875rem] opacity-45">{crest.est}</span>
                  </span>
                  <span className="label mt-1 block opacity-45">{crest.place}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p data-fade className="label mt-24 text-center opacity-55 lg:mt-36">
          {tables.footnote}
        </p>
      </div>
    </section>
  );
}
