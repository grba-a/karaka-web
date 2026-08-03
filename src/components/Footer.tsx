'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, prepReveal, scoped } from '@/lib/gsap';
import { venue, partners, nav } from '@/content/site';
import Crest from './ui/Crest';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      const { lines } = prepReveal(q);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
      });
      tl.to(lines, { yPercent: 0, duration: 1.2, ease: EASE.out, stagger: 0.08 })
        .to(q('[data-fade]'), { opacity: 1, y: 0, duration: 0.8, ease: EASE.soft, stagger: 0.05 }, 0.2);

      // grb se iscrtava kao pečat na kraju stranice
      const strokes = q('[data-crest] circle, [data-crest] path') as SVGGeometryElement[];
      strokes.forEach((p) => {
        const len = p.getTotalLength?.() ?? 0;
        if (len) gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (strokes.length) {
        tl.to(strokes, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.015 }, 0.1)
          .to(q('[data-crest-text]'), { opacity: 1, duration: 0.6 }, 0.9);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} data-tone="night" className="relative pb-28 pt-20 md:pb-12 md:pt-28">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p data-fade className="label mb-8 opacity-45">
              {venue.tagline}
            </p>
            <p className="display text-[clamp(3rem,11vw,9rem)]">
              <span className="reveal-line">
                <span>Sláinte</span>
              </span>
            </p>
          </div>

          <Crest
            draw
            className="hidden h-40 w-40 lg:block"
            style={{ color: 'var(--color-brass)' }}
          />
        </div>

        <div className="rule-t mt-16 grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div data-fade>
            <p className="label mb-4 opacity-45">Find us</p>
            <address className="not-italic leading-relaxed">
              <span className="display-sub block text-[1.0625rem]">{venue.street}</span>
              <span className="block text-[0.9375rem] opacity-60">{venue.city}</span>
            </address>
            <a
              href={venue.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="label mt-3 inline-block underline decoration-1 underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
            >
              Open in Maps ↗
            </a>
          </div>

          <div data-fade>
            <p className="label mb-4 opacity-45">Say hello</p>
            <ul className="space-y-1.5">
              <li>
                <a href={`tel:${venue.phoneHref}`} className="display-sub text-[1.0625rem] transition-opacity hover:opacity-70">
                  {venue.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${venue.email}`} className="text-[0.9375rem] opacity-60 transition-opacity hover:opacity-100">
                  {venue.email}
                </a>
              </li>
              <li className="mono pt-2 text-[0.8125rem] opacity-55">{venue.hours} · every day</li>
            </ul>
          </div>

          <div data-fade>
            <p className="label mb-4 opacity-45">Follow</p>
            <ul className="space-y-1.5">
              {[
                ['Instagram', venue.social.instagram],
                ['Facebook', venue.social.facebook],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="display-sub text-[1.0625rem] transition-opacity hover:opacity-70"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-fade>
            <p className="label mb-4 opacity-45">Next door</p>
            <ul className="space-y-1.5 text-[0.9375rem]">
              {partners.map((p) => (
                <li key={p.name} className="opacity-60">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="transition-opacity hover:opacity-100"
                    >
                      {p.name} ↗
                    </a>
                  ) : (
                    p.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-t mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-6">
          <p className="label opacity-35">
            © {new Date().getFullYear()} {venue.fullName}
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="label opacity-45 transition-opacity hover:opacity-90"
              >
                {item.label}
              </a>
            ))}
            <a href="#top" className="label opacity-45 transition-opacity hover:opacity-90">
              Back to top ↑
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
