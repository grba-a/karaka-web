'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useEffect } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** useLayoutEffect koji ne viče na serveru. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
  inOut: 'power2.inOut',
} as const;

export const MOBILE = '(max-width: 767px)';
export const DESKTOP = '(min-width: 768px)';

/** Selektor iz gsap.context, ali s korisnim tipom (GSAP ga tipizira kao Function). */
export type Q = <T extends Element = HTMLElement>(sel: string) => T[];

/** `const q = scoped(self)` u svakoj sekciji. */
export function scoped(self: { selector?: unknown }): Q {
  return self.selector as Q;
}

/**
 * Početna stanja MORAJU proći kroz gsap.set, ne samo kroz CSS.
 *
 * CSS drži početno stanje da nema bljeska prije hidracije, ali
 * getComputedStyle vraća transform kao *matricu* — postotak iz
 * `translate3d(0, 105%, 0)` je već razriješen u piksele, pa ga GSAP upiše
 * u `y`. Tada `yPercent: 0` nema što animirati i tekst zauvijek ostane
 * dolje. Eksplicitan `y: 0` u setu briše taj naslijeđeni piksel-offset.
 *
 * Isto vrijedi za Tailwindov `translate-y-*` (v4 ga piše u `translate:`,
 * koji GSAP ionako gasi) — zato se on ne koristi na animiranim elementima.
 */
export function prepReveal(q: Q) {
  const lines = q('.reveal-line > span');
  if (lines.length) gsap.set(lines, { y: 0, yPercent: 105 });

  const fades = q('[data-fade]');
  if (fades.length) gsap.set(fades, { opacity: 0, y: 16 });

  const masks = q('[data-reveal-image]');
  if (masks.length) gsap.set(masks, { clipPath: 'inset(0% 0% 100% 0%)' });

  return { lines, fades, masks };
}

/** Otkrij naslov redak po redak. */
export function linesIn(targets: Element[], stagger = 0.08) {
  return {
    targets,
    vars: { yPercent: 0, duration: 1.15, ease: EASE.out, stagger },
  };
}

/** Standardni „ulazak u kadar" — naslov, pa slike, pa ostatak. */
export function enterIn(
  trigger: Element | null,
  q: Q,
  opts: { start?: string } = {},
) {
  const { lines, fades, masks } = prepReveal(q);
  const tl = gsap.timeline({
    scrollTrigger: { trigger: trigger ?? undefined, start: opts.start ?? 'top 74%', once: true },
  });

  if (lines.length) {
    tl.to(lines, { yPercent: 0, duration: 1.15, ease: EASE.out, stagger: 0.08 }, 0);
  }
  if (masks.length) {
    tl.to(masks, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: EASE.out, stagger: 0.1 }, 0.12);
  }
  if (fades.length) {
    tl.to(fades, { opacity: 1, y: 0, duration: 0.85, ease: EASE.soft, stagger: 0.06 }, 0.28);
  }
  return tl;
}

export { gsap, ScrollTrigger };
