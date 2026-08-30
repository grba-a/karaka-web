'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/lib/gsap';
import { findUs, venue } from '@/content/site';
import { openState, SSR_STATE, type OpenState } from '@/lib/openState';
import Cta from './ui/Cta';

/**
 * Zatvaranje prodaje — lokacijska sekcija preko cijele širine.
 *
 * Umjesto ugrađene karte (koja povuče megabajt i kolačiće trećih strana) ide
 * fotografija same uličice preko cijelog kadra: gost vidi točno ono što treba
 * prepoznati kad dođe. Karta mu ionako ne treba — „Get directions" otvara
 * njegovu nativnu aplikaciju, što je na mobitelu brži put.
 *
 * Živi status se ponavlja ovdje, uz sam gumb, jer tu odluka i pada.
 */

const ICONS = {
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.06 6.24 12.4 6.5 12.71a.66.66 0 0 0 1 0C12.76 21.4 19 14.06 19 9a7 7 0 0 0-7-7Zm0 9.75A2.75 2.75 0 1 1 14.75 9 2.75 2.75 0 0 1 12 11.75Z',
  phone:
    'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.22 2.23Z',
  // Vanjski i unutarnji krug moraju ići u suprotnim smjerovima, inače se
  // brojčanik ispuni i ikona izgleda kao puna točka.
  clock:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z',
};

function InfoRow({
  icon,
  label,
  children,
  href,
}: {
  icon: keyof typeof ICONS;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <span
        aria-hidden
        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{ background: 'rgba(246,239,228,.1)', color: 'var(--color-brass-lit)' }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d={ICONS[icon]} />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="label opacity-45">{label}</span>
        <span className="display-sub text-[1.0625rem]">{children}</span>
      </span>
    </>
  );

  const cls = 'flex min-h-11 items-start gap-4 py-3';

  return href ? (
    <a
      href={href}
      {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`${cls} transition-opacity duration-300 hover:opacity-75`}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function FindUs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 82%');

  const [state, setState] = useState<OpenState>(SSR_STATE);
  useEffect(() => setState(openState()), []);

  return (
    <section
      id="find-us"
      ref={root}
      className="zone-dark relative isolate overflow-hidden py-16 md:py-28"
    >
      {/* ------------------------------------------------- pozadina uličice */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={`/img/${findUs.img}.webp`}
          alt={findUs.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to right, rgba(12,9,7,.95) 0%, rgba(12,9,7,.86) 46%, rgba(12,9,7,.6) 100%)',
              'linear-gradient(to bottom, rgba(12,9,7,.7) 0%, transparent 30%, rgba(12,9,7,.8) 100%)',
            ].join(', '),
          }}
        />
      </div>

      <div className="shell mx-auto max-w-[1500px]">
        <p data-fade className="label mb-6 opacity-45">
          {findUs.index} — {findUs.label}
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <h2 data-fade className="display max-w-[16ch] text-[clamp(2.1rem,5vw,3.75rem)]">
              {findUs.title}
            </h2>

            <p
              data-fade
              className="prose-lead mt-7 max-w-[44ch]"
              style={{ color: 'color-mix(in oklab, var(--fg) 74%, transparent)' }}
            >
              {findUs.body}
            </p>

            <div data-fade className="mt-9 flex flex-wrap gap-3">
              <Cta href={venue.maps} external className="max-sm:w-full">
                Get directions
              </Cta>
              <Cta
                href={`tel:${venue.phoneHref}`}
                variant="ghost"
                arrow={false}
                className="max-sm:w-full"
              >
                {venue.phone}
              </Cta>
            </div>
          </div>

          {/* ------------------------------------------------ kartica podataka */}
          <div
            data-fade
            className="rounded-[7px] p-6 backdrop-blur-md sm:p-7"
            style={{
              background: 'rgba(12,9,7,.5)',
              boxShadow: 'inset 0 0 0 1px rgb(var(--rule) / 0.16)',
            }}
          >
            <InfoRow icon="pin" label="Address" href={venue.maps}>
              {venue.street}
              <span className="mt-0.5 block text-[0.875rem] opacity-55">{venue.city}</span>
            </InfoRow>

            <span className="hairline my-1 block" />

            <InfoRow icon="phone" label="Telephone" href={`tel:${venue.phoneHref}`}>
              {venue.phone}
            </InfoRow>

            <span className="hairline my-1 block" />

            <InfoRow icon="clock" label="Open">
              <span className="flex items-center gap-2.5">
                {venue.hours}
                <span
                  aria-hidden
                  className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${state.open ? 'live-dot' : ''}`}
                  style={{ background: state.open ? '#4ade80' : '#c2703f' }}
                />
                <span className="mono text-[0.6875rem] opacity-55">
                  {state.open ? 'open now' : 'closed'}
                </span>
              </span>
              <span className="mt-0.5 block text-[0.875rem] opacity-55">{venue.hoursNote}</span>
            </InfoRow>
          </div>
        </div>
      </div>
    </section>
  );
}
