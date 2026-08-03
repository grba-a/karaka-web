'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, enterIn, scoped } from '@/lib/gsap';
import { tap } from '@/content/site';
import { SectionIndex } from './ui/Reveal';

/**
 * Točionik kao brodski manifest — numerirani redovi, hairline između njih,
 * mjedena linija koja klizi na aktivni red. Fotografija Guinness harfe se
 * mijenja ovisno o tome nad kojim je redom pokazivač (desktop).
 */

const ROW_IMAGE: Record<string, string> = {
  '01': 'tap-harp',
  '02': 'board-neon',
  '03': 'tap-pints',
  '04': 'tap-clink',
  '05': 'bar-counter',
  '06': 'tap-carlsberg',
};

export default function Tap() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState('01');

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);

      enterIn(root.current, q, { start: 'top 74%' });

      const rows = q('[data-tap-row]');
      gsap.set(rows, { opacity: 0, y: 18 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: EASE.soft,
        stagger: 0.06,
        scrollTrigger: { trigger: q('[data-tap-list]')[0], start: 'top 82%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tap" ref={root} data-tone="sand" className="relative py-24 md:py-36">
      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index={tap.index} label="The Tap" className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          {/* -------------------------------------------------- lijevo: media */}
          <div data-tap-media className="lg:sticky lg:top-24">
            {/* Fotke su naslagane jedna preko druge; mijenja se samo opacity,
                pa nema reflowa ni ponovnog učitavanja pri promjeni reda. */}
            <div className="reveal-mask relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]" data-reveal-image>
              {Object.entries(ROW_IMAGE).map(([n, img]) => (
                <Image
                  key={n}
                  src={`/img/${img}.webp`}
                  alt={
                    n === '01'
                      ? 'The lit Guinness harp tap at the bar of Irish Pub Karaka'
                      : 'Detail from the bar at Irish Pub Karaka'
                  }
                  width={1066}
                  height={1600}
                  sizes="(max-width: 1023px) 92vw, 38vw"
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ opacity: active === n ? 1 : 0 }}
                />
              ))}
            </div>

            <div className="mt-6 flex items-baseline justify-between gap-4">
              <p className="label opacity-55">Behind the bar</p>
              <p className="mono text-xs opacity-45">
                {Object.keys(ROW_IMAGE).indexOf(active) + 1} / {tap.lines.length}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------- desno: manifest */}
          <div>
            <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
              <span className="reveal-line">
                <span>{tap.title}</span>
              </span>
            </h2>

            <p
              data-fade
              className="prose-lead mt-8 max-w-[46ch]"
              style={{ color: 'color-mix(in oklab, var(--fg) 74%, transparent)' }}
            >
              {tap.lead}
            </p>

            <ul data-tap-list className="mt-12">
              {tap.lines.map((line) => {
                const on = active === line.n;
                return (
                  <li
                    key={line.n}
                    data-tap-row
                    onMouseEnter={() => setActive(line.n)}
                    onFocus={() => setActive(line.n)}
                    className="rule-b group relative py-5"
                  >
                    {/* mjedena linija koja se izvuče na aktivnom redu */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-[-1px] h-px origin-left transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                      style={{
                        background: 'var(--color-brass)',
                        transform: on ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setActive(line.n)}
                      className="flex w-full items-baseline gap-4 text-left sm:gap-7"
                    >
                      <span
                        className="mono w-7 shrink-0 text-xs transition-opacity duration-500"
                        style={{ opacity: on ? 1 : 0.4, color: on ? 'var(--color-brass)' : undefined }}
                      >
                        {line.n}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="display-sub text-[clamp(1.375rem,3vw,2rem)]">
                            {line.name}
                          </span>
                          <span className="label opacity-45">{line.origin}</span>
                        </span>
                        <span
                          className="mt-1.5 block max-w-[42ch] text-[0.9375rem] leading-relaxed transition-opacity duration-500"
                          style={{
                            color: 'color-mix(in oklab, var(--fg) 62%, transparent)',
                            opacity: on ? 1 : 0.6,
                          }}
                        >
                          {line.note}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div data-fade className="mt-12">
              <p className="label mb-5 opacity-55">{tap.aside.title}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-3">
                {tap.aside.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border px-4 py-2 text-[0.8125rem]"
                    style={{
                      borderColor: 'rgb(var(--rule) / 0.26)',
                      color: 'color-mix(in oklab, var(--fg) 78%, transparent)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
