'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useEffect } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Jedini scroll reveal na stranici.
 *
 * Hero se animira čistim CSS-om (vidi globals.css) jer mora biti nacrtan prije
 * nego JS stigne. Sve ispod heroja koristi ovo: fade + rise, stagger, jednom.
 *
 * Zamke koje su namjerno izbjegnute:
 *  - početni `y` se postavlja iz JS-a (gsap.set), ne Tailwindovim `translate-y-*`
 *    — Tailwind v4 to piše u `translate:`, koji GSAP ugasi čim preuzme element
 *  - nema pinnanja i nema scrub animacija, pa nema ni pin-spacera ni layout skokova
 */
export function revealOnScroll(scope: Element | null, start = 'top 82%') {
  if (!scope) return;
  const items = scope.querySelectorAll<HTMLElement>('[data-fade]');
  if (!items.length) return;

  gsap.set(items, { opacity: 0, y: 22 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.07,
    scrollTrigger: { trigger: scope, start, once: true },
  });
}

/** Skraćenica: cijela sekcija se otkrije kad uđe u kadar. */
export function useReveal(ref: React.RefObject<HTMLElement | null>, start?: string) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => revealOnScroll(ref.current, start), ref);
    return () => ctx.revert();
  }, [ref, start]);
}

export { gsap, ScrollTrigger };
