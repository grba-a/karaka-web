'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, DESKTOP, enterIn, scoped } from '@/lib/gsap';
import { route } from '@/content/site';
import { Frame, SectionIndex } from './ui/Reveal';

/** Kurziv unutar copyja se piše kao *ovako* — pretvaramo ga u <em>. */
function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((chunk, i) =>
        chunk.startsWith('*') && chunk.endsWith('*') ? (
          <em key={i} className="display-sub not-italic" style={{ fontStyle: 'italic' }}>
            {chunk.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </>
  );
}

export default function Route() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);

      enterIn(root.current, q, { start: 'top 72%' });

      // ledger redovi se ispisuju kao popis tereta
      const rows = q('[data-ledger-row]');
      gsap.set(rows, { opacity: 0, x: -12 });
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: EASE.soft,
        stagger: 0.07,
        scrollTrigger: { trigger: q('[data-ledger]')[0], start: 'top 84%', once: true },
      });

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(q('[data-reveal-image]'), {
          yPercent: -9,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="route" ref={root} data-tone="limestone" className="relative py-24 md:py-36">
      <div className="brick-band mb-20 md:mb-28" aria-hidden />

      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index={route.index} label="The Route" className="mb-10" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-20">
          <div>
            <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
              {route.title.split(', ').map((line, i, arr) => (
                <span key={i} className="reveal-line">
                  <span>{i < arr.length - 1 ? `${line},` : line}</span>
                </span>
              ))}
            </h2>

            <div className="mt-10 max-w-[52ch] space-y-6 lg:mt-14">
              {route.body.map((p, i) => (
                <p
                  key={i}
                  data-fade
                  className="prose-lead"
                  style={{ color: 'color-mix(in oklab, var(--fg) 76%, transparent)' }}
                >
                  <Emphasised text={p} />
                </p>
              ))}
            </div>

            {/* manifest tereta */}
            <dl data-ledger className="mt-14 max-w-lg">
              {route.ledger.map((row) => (
                <div
                  key={row.k}
                  data-ledger-row
                  className="rule-b flex items-baseline justify-between gap-6 py-3.5"
                >
                  <dt className="label opacity-55">{row.k}</dt>
                  <dd className="display-sub text-right text-[1.0625rem]">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:pt-24">
            <Frame
              src="alley-door"
              alt="The stone arch entrance to Irish Pub Karaka in Između polača, guests seated in the lane"
              ratio="aspect-[3/4] lg:aspect-[2/3]"
              sizes="(max-width: 1023px) 92vw, 34vw"
            />
            <p data-fade className="label mt-5">
              Između polača, looking in
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
