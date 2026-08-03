'use client';

import { useEffect, useState } from 'react';
import { venue } from '@/content/site';

/**
 * Mobilna CTA traka.
 *
 * Tipičan gost Karake stoji u Starom gradu s mobitelom u ruci i traži uličicu.
 * Zato su jedine dvije akcije upute i poziv, i zato su uvijek na dohvat palca.
 *
 * Skrivena je dok gost čita hero — da ne pojede prvi dojam na malom ekranu —
 * pa klizne gore i ostane do kraja stranice. Samo ispod 768px (`md:hidden`).
 *
 * Namjerno bez GSAP-a: ScrollTrigger ovdje ne dobiva update jer scroll ide
 * kroz Lenis, a za obično pokaži/sakrij dovoljan je IntersectionObserver nad
 * herojem plus CSS tranzicija.
 */
export default function StickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      // traka se pojavi tek kad je od heroja ostalo manje od 15% ekrana
      { rootMargin: '-15% 0px 0px 0px', threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      id="sticky-cta"
      aria-hidden={!shown}
      className="
        pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3
        transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]
        md:hidden
      "
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        transform: shown ? 'translateY(0)' : 'translateY(130%)',
      }}
    >
      <div
        className="pointer-events-auto flex gap-2 rounded-full p-1.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,.45)] backdrop-blur-xl"
        style={{
          background: 'color-mix(in oklab, var(--bg) 84%, transparent)',
          border: '1px solid rgb(var(--rule) / 0.16)',
        }}
      >
        <a
          href={venue.maps}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={shown ? undefined : -1}
          className="label flex flex-1 items-center justify-center gap-2 rounded-full py-3.5"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          Directions
          <span aria-hidden>↗</span>
        </a>
        <a
          href={`tel:${venue.phoneHref}`}
          tabIndex={shown ? undefined : -1}
          className="label flex flex-1 items-center justify-center gap-2 rounded-full py-3.5"
          style={{ border: '1px solid rgb(var(--rule) / 0.22)', color: 'var(--fg)' }}
        >
          Call
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
