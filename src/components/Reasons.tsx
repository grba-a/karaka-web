'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useReveal } from '@/lib/gsap';
import { reasons } from '@/content/site';

/**
 * Argument u pet sekundi.
 *
 * Gost je upravo vidio da je otvoreno; sad treba znati zašto baš ovdje.
 * Tri razloga, svaki jedan pogled: fotka, broj, naslov, jedna rečenica.
 * Bez pinnanja i paralaksa — sve što bi usporilo skeniranje radi protiv prodaje.
 */
export default function Reasons() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 80%');

  return (
    <section id="why" ref={root} className="zone-light relative py-20 md:py-28">
      <div className="shell mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 data-fade className="display text-[clamp(2.1rem,5vw,3.75rem)]">
            {reasons.title}
          </h2>
          <p data-fade className="label opacity-50">
            {reasons.index} — {reasons.label}
          </p>
        </div>

        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-7">
          {reasons.items.map((item) => (
            <li key={item.n} data-fade className="group">
              <figure className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                <Image
                  src={`/img/${item.img}.webp`}
                  alt={item.alt}
                  width={1066}
                  height={1600}
                  sizes="(max-width: 767px) 92vw, 31vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                />
                <figcaption
                  className="label absolute left-4 top-4 rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(20,16,13,.62)', color: '#efe6d9', backdropFilter: 'blur(6px)' }}
                >
                  {item.n}
                </figcaption>
              </figure>

              <h3 className="display-sub mt-6 text-[clamp(1.375rem,2.4vw,1.75rem)]">
                {item.title}
              </h3>
              <p
                className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed"
                style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
              >
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
