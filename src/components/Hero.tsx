'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  useIsomorphicLayoutEffect,
  gsap,
  EASE,
  DESKTOP,
  prepReveal,
  scoped,
} from '@/lib/gsap';
import { hero, venue } from '@/content/site';
import Crest from './ui/Crest';
import Cta from './ui/Cta';

/**
 * Hero — vapnenac u devet ujutro.
 *
 * Fotografija je stvarna viseća tabla Karake snimljena na vapnenačkom zidu,
 * pa je maskirana radijalnim gradijentom: zid se stopi s pozadinom stranice
 * i ostane samo lampion koji visi u kompoziciju.
 */

/* Vapnenački zid iščezne u pozadinu stranice i ostane samo lampion.
   Elipsa je centrirana na lampion, pa se s desne i s donje strane presijeca
   s rubom okvira — dva linearna sloja to garantirano zatvaraju, inače ostane
   tanka vidljiva crta na rubu fotografije. */
const LANTERN_MASK = [
  'radial-gradient(56% 46% at 56% 50%, #000 34%, rgba(0,0,0,.6) 62%, transparent 86%)',
  'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
  'linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)',
].join(', ');

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      const { lines, fades } = prepReveal(q);

      const tl = gsap.timeline({ delay: 0.1 });

      // 1 — grb se iscrtava kao gravura
      const strokes = q('[data-crest] circle, [data-crest] path') as SVGGeometryElement[];
      strokes.forEach((p) => {
        const len = p.getTotalLength?.() ?? 0;
        if (len) gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      if (strokes.length) {
        tl.to(strokes, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', stagger: 0.015 }, 0);
      }
      tl.to(q('[data-crest-text]'), { opacity: 1, duration: 0.7 }, 0.85);

      // 2 — naslov, redak po redak
      tl.to(lines, { yPercent: 0, duration: 1.3, ease: EASE.out, stagger: 0.085 }, 0.2);

      // 3 — lampion se otkriva odozdo uz blago odzumiranje
      tl.fromTo(
        q('[data-hero-frame]'),
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: EASE.out },
        0.3,
      ).fromTo(
        q('[data-hero-img]'),
        { scale: 1.18 },
        { scale: 1, duration: 2, ease: EASE.out },
        0.3,
      );

      // 4 — ostalo
      tl.to(fades, { opacity: 1, y: 0, duration: 0.9, ease: EASE.soft, stagger: 0.07 }, 0.7);

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(q('[data-hero-media]'), { yPercent: 14, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-type]'), { yPercent: -6, opacity: 0.2, ease: 'none', scrollTrigger: st });
        gsap.to(q('[data-hero-crest]'), { rotate: 26, ease: 'none', scrollTrigger: st });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      data-tone="limestone"
      className="relative min-h-[100svh] overflow-hidden pb-8 pt-24 md:pt-28"
    >
      <div className="shell relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-[1500px] flex-col justify-between">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-start lg:gap-10">
          {/* ------------------------------------------------------ tipografija */}
          <div data-hero-type className="relative z-10 lg:pt-4">
            <p data-fade className="label mb-7">
              {hero.eyebrow}
            </p>

            <h1 className="display text-[clamp(2.9rem,9.6vw,7.75rem)]">
              {hero.lines.map((line) => (
                <span key={line} className="reveal-line">
                  <span>{line}</span>
                </span>
              ))}
            </h1>

            <p
              data-fade
              className="prose-lead mt-8 max-w-[40ch] lg:mt-10"
              style={{ color: 'color-mix(in oklab, var(--fg) 74%, transparent)' }}
            >
              {hero.lead}
            </p>

            {/* Na mobitelu samo primarni CTA preko cijele širine — dva
                naslagana gumba pojedu pola prvog ekrana, a Call ionako
                stiže u fiksnoj traci čim gost prođe hero. */}
            <div data-fade className="mt-8 flex flex-wrap gap-3">
              <Cta href={venue.maps} external className="max-sm:w-full max-sm:justify-center">
                Get directions
              </Cta>
              <Cta href="#tap" variant="ghost" className="max-sm:hidden">
                What&rsquo;s on tap
              </Cta>
            </div>
          </div>

          {/* ---------------------------------------------------------- lampion */}
          <div
            data-hero-media
            className="relative -mx-[var(--shell)] -mt-6 lg:mx-0 lg:-mt-16"
          >
            <figure
              data-hero-frame
              className="reveal-mask relative mx-auto aspect-[4/5] w-full max-w-[26rem] lg:aspect-[3/4.4] lg:max-w-none"
              style={{
                maskImage: LANTERN_MASK,
                WebkitMaskImage: LANTERN_MASK,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <Image
                data-hero-img
                src="/img/hero-lantern.webp"
                alt="The hanging lantern sign of Irish Pub Karaka on a limestone wall in Dubrovnik's Old Town"
                width={1066}
                height={1600}
                priority
                fetchPriority="high"
                sizes="(max-width: 1023px) 92vw, 30rem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>

            {/* Grb kao pečat u donjem desnom kutu fotografije — ugravira se
                na kraju uvodne animacije i polako se okreće na scrollu. */}
            <Crest
              draw
              data-hero-crest
              className="pointer-events-none absolute bottom-2 right-[6%] h-24 w-24 sm:h-28 sm:w-28 lg:bottom-6 lg:right-[4%] lg:h-36 lg:w-36"
              style={{ color: 'var(--color-brass)' }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------ ledger */}
        <div
          data-fade
          className="rule-t mt-10 grid grid-cols-2 gap-x-6 gap-y-4 pt-5 sm:grid-cols-3 lg:mt-12"
        >
          {hero.meta.map((m) => (
            <div key={m.k} className="flex flex-col gap-1.5">
              <span className="label opacity-50">{m.k}</span>
              <span className="display-sub text-[1.0625rem]">{m.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
