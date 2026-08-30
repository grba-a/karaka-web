'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useReveal } from '@/lib/gsap';
import { proof, venue } from '@/content/site';

/**
 * Društveni dokaz — bez ocjene.
 *
 * Google je 4,1, Tripadvisor 3,5. Isticanje broja bi ovdje štetilo, pa dokaz
 * ide preko onoga što je stvarno jako: biranih citata gostiju i fotografija
 * pune sale. Nijedan podatak nije izmišljen.
 */
export default function Proof() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 82%');

  return (
    <section ref={root} className="zone-light relative pb-16 pt-4 md:pb-32">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="rule-t grid gap-10 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <p data-fade className="label mb-6 opacity-50">
              {proof.index} — {proof.label}
            </p>
            <h2 data-fade className="display text-[clamp(2.1rem,5vw,3.75rem)]">
              {proof.title}
            </h2>
          </div>
          <p
            data-fade
            className="prose-lead max-w-[46ch] lg:pt-2"
            style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
          >
            {proof.lead}
          </p>
        </div>

        {/* ------------------------------------------------------- fotke */}
        <ul className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
          {proof.gallery.map((g, i) => (
            <li
              key={g.img}
              data-fade
              className={`relative aspect-square overflow-hidden sm:aspect-[3/4] ${i % 2 ? 'md:translate-y-6' : ''}`}
            >
              <Image
                src={`/img/${g.img}.webp`}
                alt={g.alt}
                width={1066}
                height={1600}
                sizes="(max-width: 767px) 46vw, 23vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>

        {/* ------------------------------------------------------ citati */}
        <ul className="mt-12 grid gap-x-12 gap-y-9 md:mt-24 md:grid-cols-3">
          {proof.quotes.map((q) => (
            <li key={q.quote} data-fade>
              <blockquote className="display-sub text-[clamp(1.125rem,1.7vw,1.4375rem)]">
                <span aria-hidden className="mr-1" style={{ color: 'var(--accent)' }}>
                  &ldquo;
                </span>
                {q.quote}
              </blockquote>
              <p className="label mt-4 opacity-40">{q.source}</p>
            </li>
          ))}
        </ul>

        {/* Linkamo na platforme, ali ocjenu NE prikazujemo (Google 4,1 /
            Tripadvisor 3,5). Link daje kredibilitet, broj bi odbijao. */}
        <p data-fade className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-14">
          <span className="label opacity-40">{proof.reviewsCta}</span>
          {[
            ['Tripadvisor', venue.social.tripadvisor],
            ['Google', venue.reviews.google],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="tap label underline decoration-1 underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
            >
              {label} ↗
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}
