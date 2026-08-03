'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, enterIn, scoped } from '@/lib/gsap';
import { bites } from '@/content/site';
import { Frame, SectionIndex } from './ui/Reveal';

/**
 * Kratka kuhinja.
 *
 * Namjerno bez cijena i bez fotografija jela — klijent ih još nije potvrdio,
 * a lažne cijene ili stock fotke hrane bile bi gore od tipografske liste.
 * Kad cijene stignu, mijenja se samo `bites` u content/site.ts.
 */
export default function Bites() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      enterIn(root.current, q, { start: 'top 76%' });

      const rows = q('[data-bite]');
      gsap.set(rows, { opacity: 0, y: 20 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE.soft,
        stagger: 0.07,
        scrollTrigger: { trigger: q('[data-bite-list]')[0], start: 'top 84%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-tone="night" className="relative py-24 md:py-32">
      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index={bites.index} label="Bites" className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-20">
          <div>
            <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
              {['Something', 'with that'].map((line) => (
                <span key={line} className="reveal-line">
                  <span>{line}</span>
                </span>
              ))}
            </h2>

            <p
              data-fade
              className="prose-lead mt-8 max-w-[42ch]"
              style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
            >
              {bites.lead}
            </p>

            <ul data-bite-list className="mt-12 max-w-3xl">
              {bites.items.map((item) => (
                <li key={item.name} data-bite className="rule-b py-5">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="display-sub text-[clamp(1.375rem,3vw,1.875rem)]">
                      {item.name}
                    </span>
                    <span
                      className="text-[0.9375rem]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
                    >
                      {item.note}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <p data-fade className="label mt-8 opacity-50">
              {bites.footnote}
            </p>
          </div>

          <div className="lg:pt-10">
            <Frame
              src="drink-martini"
              alt="Two cocktails on an engraved pub table at Irish Pub Karaka"
              ratio="aspect-[3/4]"
              sizes="(max-width: 1023px) 92vw, 22rem"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
