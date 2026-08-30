'use client';

import { useRef } from 'react';
import { useReveal } from '@/lib/gsap';
import { venue, partners, footer, nav } from '@/content/site';
import Crest from './ui/Crest';

/**
 * Footer. Ovdje živi ono što je u v1 bila cijela sekcija: priča o imenu,
 * svedena na jednu rečenicu. Tko je došao do dna, zaslužio je i to.
 */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 88%');

  return (
    <footer ref={root} className="zone-dark relative pb-12 pt-16 md:pt-20">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="rule-t grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
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
                <a
                  href={`tel:${venue.phoneHref}`}
                  className="display-sub text-[1.0625rem] transition-opacity hover:opacity-70"
                >
                  {venue.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${venue.email}`}
                  className="text-[0.9375rem] opacity-60 transition-opacity hover:opacity-100"
                >
                  {venue.email}
                </a>
              </li>
              <li className="mono pt-2 text-[0.8125rem] opacity-55">
                {venue.hours} · every day
              </li>
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

        {/* --------------------------------- cijela priča o imenu, u jednoj rečenici */}
        <div
          data-fade
          className="rule-t mt-14 flex flex-col gap-8 pt-12 sm:flex-row sm:items-center sm:gap-12"
        >
          <Crest className="h-20 w-20 shrink-0 opacity-70" style={{ color: 'var(--color-brass)' }} />
          <p
            className="max-w-[62ch] text-[0.9375rem] leading-relaxed"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            {footer.story}
          </p>
        </div>

        <div className="rule-t mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-6">
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
