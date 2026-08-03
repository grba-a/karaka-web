'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Jedina Lenis instanca u aplikaciji, spojena na gsap.ticker tako da
 * ScrollTrigger i Lenis dijele isti raf loop (inače se rasinkroniziraju
 * i pinnane sekcije podrhtavaju).
 *
 * Poštuje prefers-reduced-motion: tada se Lenis uopće ne pokreće i
 * ostaje native scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      root.classList.add('is-static');
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // anchor linkovi moraju ići kroz Lenis, ne kroz native scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -12, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    // fontovi mijenjaju visinu → ScrollTrigger mora preračunati
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
