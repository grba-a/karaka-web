'use client';

import { useRef } from 'react';
import { useReveal } from '@/lib/gsap';
import { offer, venue } from '@/content/site';
import Cta from './ui/Cta';

/**
 * „Što točno dobivam" — tri stupca u jednoj tamnoj sekciji.
 *
 * U v1 su ovo bile tri zasebne sekcije (Tap, Matchday, Bites) i ~3500 px
 * scrolla. Gost koji je dovde došao je već zainteresiran; treba mu kratak
 * pregled, ne tri poglavlja.
 *
 * Ovdje počinje tamna zona — namjeran tvrd rez, „ulazak unutra".
 */
export default function Offer() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 84%');

  const channels = [...offer.screen.channels, ...offer.screen.channels];

  return (
    <section id="whats-on" ref={root} className="zone-dark relative py-14 md:py-28">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 data-fade className="display text-[clamp(2.1rem,5vw,3.75rem)]">
            {offer.title}
          </h2>
          <p data-fade className="label opacity-45">
            {offer.index} — {offer.label}
          </p>
        </div>

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          {/* ------------------------------------------------------ na točioniku */}
          <div data-fade>
            <h3 className="label mb-6 opacity-50">{offer.tap.title}</h3>
            <ul>
              {offer.tap.items.map((item) => (
                <li
                  key={item.name}
                  className="rule-b flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="display-sub text-[1.125rem]">{item.name}</span>
                  <span className="mono text-[0.6875rem] opacity-45">{item.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.875rem] leading-relaxed opacity-55">
              {offer.tap.footnote}
            </p>
          </div>

          {/* ---------------------------------------------------------- na ekranu */}
          <div data-fade>
            <h3 className="label mb-6 opacity-50">{offer.screen.title}</h3>
            <ul>
              {offer.screen.items.map((item) => (
                <li key={item} className="rule-b py-3">
                  <span className="display-sub text-[1.125rem]">{item}</span>
                </li>
              ))}
            </ul>

            {/* traka kanala — čisti CSS, bez GSAP-a */}
            <div className="marquee relative mt-6 overflow-hidden py-1">
              <div className="marquee-track flex w-max items-center gap-6">
                {channels.map((c, i) => (
                  <span key={i} className="flex shrink-0 items-center gap-6">
                    <span className="label opacity-60">{c}</span>
                    <span
                      aria-hidden
                      className="inline-block h-1 w-1 rotate-45"
                      style={{ background: 'var(--color-brass-lit)' }}
                    />
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Karaka nema kuhinju — bolje to reći nego pustiti gosta da nagađa. */}
        <p data-fade className="mt-10 text-[0.9375rem] leading-relaxed opacity-55">
          {offer.kitchen}
        </p>

        {/* CTA ima vlastitu traku preko cijele širine — u stupcu se čitao kao
            sitni link, a ovo je jedina akcija cijele sekcije. */}
        <div
          data-fade
          className="rule-t mt-16 flex flex-col items-start gap-7 pt-10 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-12"
        >
          <p className="display-sub max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.125rem)]">
            {offer.screen.footnote}
          </p>
          <Cta
            href={`tel:${venue.phoneHref}`}
            tone="brass"
            className="shrink-0 !px-9 !py-5 max-sm:w-full"
          >
            {offer.screen.cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}
