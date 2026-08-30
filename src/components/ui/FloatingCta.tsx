'use client';

import { useEffect, useState } from 'react';
import { venue } from '@/content/site';

/**
 * Mali plutajući CTA, samo na mobitelu.
 *
 * Mobilna stranica je duga, a između heroja i dna nema akcije. Ovo je kompaktna
 * pilula u donjem desnom kutu — ne traka preko cijele širine, koja je prošli put
 * pojela previše ekrana.
 *
 * Pojavljivanje ide preko IntersectionObservera nad herojem, ne preko
 * ScrollTriggera: ScrollTrigger ovdje nije dobivao update i traka je ostajala
 * skrivena.
 */
export default function FloatingCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;

    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      rootMargin: '-20% 0px 0px 0px',
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={venue.maps}
      target="_blank"
      rel="noreferrer noopener"
      tabIndex={shown ? undefined : -1}
      aria-label="Get directions to Irish Pub Karaka"
      aria-hidden={!shown}
      className="
        fixed bottom-0 right-0 z-40 m-4 grid h-14 w-14 place-items-center
        rounded-full shadow-[0_10px_30px_-8px_rgba(0,0,0,.55)]
        transition-[transform,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)]
        md:hidden
      "
      style={{
        marginBottom: 'max(1rem, env(safe-area-inset-bottom))',
        background: '#f6efe4',
        color: '#14100d',
        transform: shown ? 'translateY(0) scale(1)' : 'translateY(140%) scale(.85)',
        opacity: shown ? 1 : 0,
      }}
    >
      <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="currentColor">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.06 6.24 12.4 6.5 12.71a.66.66 0 0 0 1 0C12.76 21.4 19 14.06 19 9a7 7 0 0 0-7-7Zm0 9.75A2.75 2.75 0 1 1 14.75 9 2.75 2.75 0 0 1 12 11.75Z" />
      </svg>
    </a>
  );
}
