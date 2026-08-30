'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/gsap';
import { findUs, venue } from '@/content/site';
import { openState, SSR_STATE, type OpenState } from '@/lib/openState';
import Cta from './ui/Cta';

/**
 * Zatvaranje prodaje.
 *
 * Zadnja prepreka je „gdje je to i je li još otvoreno", pa se živi status
 * ponavlja ovdje — točno uz gumb, gdje odluka i pada.
 */
export default function FindUs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 82%');

  const [state, setState] = useState<OpenState>(SSR_STATE);
  useEffect(() => setState(openState()), []);

  return (
    <section id="find-us" ref={root} className="zone-dark relative pb-20 pt-4 md:pb-28">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="rule-t grid gap-12 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] lg:gap-20">
          <div>
            <p data-fade className="label mb-6 opacity-45">
              {findUs.index} — {findUs.label}
            </p>

            <h2 data-fade className="display text-[clamp(2.1rem,5vw,3.75rem)]">
              {findUs.title}
            </h2>

            <p
              data-fade
              className="prose-lead mt-7 max-w-[44ch]"
              style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
            >
              {findUs.body}
            </p>

            <dl data-fade className="mt-10 grid gap-x-10 sm:grid-cols-2">
              <div className="rule-b py-4">
                <dt className="label mb-2 opacity-45">Address</dt>
                <dd className="display-sub text-[1.0625rem]">
                  {venue.street}
                  <span className="mt-0.5 block text-[0.875rem] opacity-50">{venue.city}</span>
                </dd>
              </div>
              <div className="rule-b py-4">
                <dt className="label mb-2 opacity-45">Today</dt>
                <dd className="display-sub flex items-center gap-2.5 text-[1.0625rem]">
                  <span
                    className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${state.open ? 'live-dot' : ''}`}
                    style={{ background: state.open ? '#4ade80' : '#c2703f' }}
                  />
                  {venue.hours}
                  <span className="mono text-[0.6875rem] opacity-50">
                    {state.open ? 'open now' : 'closed'}
                  </span>
                </dd>
              </div>
            </dl>

            <div data-fade className="mt-9 flex flex-wrap gap-3">
              <Cta href={venue.maps} external className="max-sm:w-full">
                Get directions
              </Cta>
              <Cta href={`tel:${venue.phoneHref}`} variant="ghost" arrow={false} className="max-sm:w-full">
                {venue.phone}
              </Cta>
            </div>
          </div>

          <div data-fade>
            <figure className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={`/img/${findUs.img}.webp`}
                alt={findUs.alt}
                width={1066}
                height={1600}
                sizes="(max-width: 1023px) 92vw, 38vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
            <p className="label mt-4 opacity-40">Između polača, mid-afternoon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
