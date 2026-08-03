'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, prepReveal, scoped } from '@/lib/gsap';
import { voices } from '@/content/site';

/** Stvarni citati gostiju. Kratki, bez zvjezdica i bez izmišljenih imena. */
export default function Voices() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      prepReveal(q);

      gsap.to(q('[data-fade]'), {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE.soft,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-tone="night" className="relative py-20 md:py-28">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="brick-band mb-16" aria-hidden />

        <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {voices.map((v) => (
            <li key={v.quote} data-fade>
              <blockquote className="display-sub text-[clamp(1.125rem,1.6vw,1.375rem)]">
                <span
                  aria-hidden
                  className="mr-1 inline-block"
                  style={{ color: 'var(--color-brass)' }}
                >
                  “
                </span>
                {v.quote}
              </blockquote>
              <p className="label mt-4 opacity-40">{v.source}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
