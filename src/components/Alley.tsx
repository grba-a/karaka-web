'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, DESKTOP, enterIn, scoped } from '@/lib/gsap';
import { alley, venue } from '@/content/site';
import { Frame, SectionIndex } from './ui/Reveal';
import Cta from './ui/Cta';

/** Kontakt / lokacija. Karta se učitava tek na klik — bez Google iframea u LCP-u. */
export default function Alley() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      enterIn(root.current, q, { start: 'top 76%' });

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(q('[data-alley-img] img'), {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const details = [
    { k: 'Address', v: venue.street, sub: venue.city },
    { k: 'Open', v: venue.hours, sub: venue.hoursNote },
    { k: 'Phone', v: venue.phone, href: `tel:${venue.phoneHref}` },
    { k: 'Email', v: venue.email, href: `mailto:${venue.email}` },
  ];

  return (
    <section id="alley" ref={root} data-tone="night" className="relative py-24 md:py-32">
      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index="06" label="Find Us" className="mb-10" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-20">
          <div>
            <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
              {['Forty steps', 'off the Stradun'].map((line) => (
                <span key={line} className="reveal-line">
                  <span>{line}</span>
                </span>
              ))}
            </h2>

            <p
              data-fade
              className="prose-lead mt-8 max-w-[46ch]"
              style={{ color: 'color-mix(in oklab, var(--fg) 74%, transparent)' }}
            >
              {alley.body}
            </p>

            <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.k} data-fade className="rule-b py-4">
                  <dt className="label mb-2 opacity-45">{d.k}</dt>
                  <dd className="display-sub text-[1.0625rem]">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="underline decoration-[color:var(--color-brass)] decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                      >
                        {d.v}
                      </a>
                    ) : (
                      d.v
                    )}
                    {d.sub && (
                      <span className="mt-0.5 block text-[0.875rem] opacity-50">{d.sub}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-fade className="mt-10 flex flex-wrap gap-3">
              <Cta href={venue.maps} external>
                Get directions
              </Cta>
              <Cta href={`tel:${venue.phoneHref}`} variant="ghost">
                Call the bar
              </Cta>
            </div>
          </div>

          <div data-alley-img className="lg:pt-8">
            <Frame
              src="alley-crowd"
              alt="The narrow limestone lane Između polača, busy with people beneath the Irish Pub Karaka lantern"
              ratio="aspect-[3/4]"
              sizes="(max-width: 1023px) 92vw, 40vw"
            />
            <p data-fade className="label mt-5 opacity-45">
              Između polača, mid-afternoon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
