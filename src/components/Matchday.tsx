'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, EASE, DESKTOP, enterIn, scoped } from '@/lib/gsap';
import { matchday, venue } from '@/content/site';
import { SectionIndex } from './ui/Reveal';
import Cta from './ui/Cta';

/**
 * Bottle-green panel preko cijele širine.
 *
 * Panel je neprozirn i pokriva cijeli ekran, pa se iza njega dogodi globalna
 * zamjena dana u noć (vidi DayNight.tsx) — oko nikad ne vidi trenutak kad
 * --bg i --fg prelaze jedno preko drugoga.
 *
 * Boje su ovdje fiksne, ne iz --fg: panel mora izgledati isto bez obzira gdje
 * ga scroll zatekne.
 */
export default function Matchday() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      enterIn(root.current, q, { start: 'top 72%' });

      const rows = q('[data-comp]');
      gsap.set(rows, { opacity: 0, y: 22 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE.soft,
        stagger: 0.05,
        scrollTrigger: { trigger: q('[data-comp-list]')[0], start: 'top 84%', once: true },
      });

      // beskonačni marquee kanala
      const track = q('[data-marquee-track]')[0] as HTMLElement | undefined;
      if (track) {
        const half = track.scrollWidth / 2;
        gsap.to(track, {
          x: -half,
          duration: 26,
          ease: 'none',
          repeat: -1,
          modifiers: { x: (x) => `${gsap.utils.wrap(-half, 0, parseFloat(x))}px` },
        });
      }

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(q('[data-md-img]'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const channels = [...matchday.channels, ...matchday.channels, ...matchday.channels];

  return (
    <section
      id="matchday"
      ref={root}
      data-tone="night"
      className="relative isolate overflow-hidden py-24 md:py-32"
      style={{ background: 'var(--color-bottle)', color: '#f1ece0' }}
    >
      {/* tanka mjedena linija na vrhu i dnu panela */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'rgba(217,180,120,.35)' }} />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(217,180,120,.35)' }} />

      <div className="shell mx-auto max-w-[1500px]">
        <SectionIndex index={matchday.index} label="Matchday" className="mb-10" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-start lg:gap-20">
          <div>
            <h2 className="display text-[clamp(2.4rem,6.5vw,5.25rem)]">
              {['Every match', 'that matters'].map((line) => (
                <span key={line} className="reveal-line">
                  <span>{line}</span>
                </span>
              ))}
            </h2>

            <p
              data-fade
              className="prose-lead mt-8 max-w-[44ch]"
              style={{ color: 'rgba(241,236,224,.74)' }}
            >
              {matchday.lead}
            </p>

            <ul data-comp-list className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {matchday.competitions.map((c, i) => (
                <li
                  key={c}
                  data-comp
                  className="flex items-baseline gap-4 border-b py-3.5"
                  style={{ borderColor: 'rgba(241,236,224,.14)' }}
                >
                  <span className="mono text-[0.6875rem]" style={{ color: 'var(--color-brass-lit)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="display-sub text-[1.0625rem]">{c}</span>
                </li>
              ))}
            </ul>

            <p data-fade className="mt-10 max-w-[46ch] text-[0.9375rem] leading-relaxed" style={{ color: 'rgba(241,236,224,.6)' }}>
              {matchday.note}
            </p>

            <div data-fade className="mt-7">
              <Cta href={`tel:${venue.phoneHref}`} tone="onDark">
                Call the bar
              </Cta>
            </div>
          </div>

          {/* -------------------------------------------------------- fotke */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <figure data-reveal-image className="reveal-mask relative aspect-[3/4] overflow-hidden lg:mt-16">
              <Image
                data-md-img
                src="/img/sport-wall.webp"
                alt="Framed rugby and football photographs on the exposed brick wall at Irish Pub Karaka"
                width={1066}
                height={1600}
                sizes="(max-width: 1023px) 44vw, 22vw"
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            </figure>
            <figure data-reveal-image className="reveal-mask relative aspect-[3/4] overflow-hidden">
              <Image
                data-md-img
                src="/img/sport-anfield.webp"
                alt="An Anfield Road street sign and a signed hurling stick displayed at Irish Pub Karaka"
                width={1600}
                height={1066}
                sizes="(max-width: 1023px) 44vw, 22vw"
                className="absolute inset-0 h-[112%] w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- marquee */}
      <div className="relative mt-16 overflow-hidden py-6 lg:mt-24" aria-hidden>
        <span
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'rgba(241,236,224,.14)' }}
        />
        <div data-marquee-track className="flex w-max items-center gap-12 will-change-transform">
          {channels.map((c, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="display-sub whitespace-nowrap text-[clamp(1.5rem,3.4vw,2.75rem)] opacity-90">
                {c}
              </span>
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rotate-45"
                style={{ background: 'var(--color-brass-lit)' }}
              />
            </span>
          ))}
        </div>
        <span
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'rgba(241,236,224,.14)' }}
        />
      </div>
      <p className="label mt-4 text-center" style={{ color: 'rgba(241,236,224,.45)' }}>
        Live, with English commentary
      </p>
    </section>
  );
}
