'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect, gsap, DESKTOP, MOBILE, prepReveal, scoped } from '@/lib/gsap';

/**
 * Vodoravna traka koja se pomiče uz vertikalni scroll.
 *
 * Materijal je gotovo sav portretan (1066×1600) i tri vertikalna videa
 * 576×1024, pa je traka od visokih kadrova jedini format u kojem ti izvori
 * izgledaju namjerno, a ne razvučeno.
 *
 * Videa se učitavaju tek kad uđu u kadar (preload="none" + IntersectionObserver)
 * — inače bi tri mp4-a od ~2.5 MB visjela na svakom učitavanju stranice.
 */

type Item =
  | { kind: 'img'; src: string; alt: string; caption: string }
  | { kind: 'video'; src: string; poster: string; caption: string };

const STRIP: Item[] = [
  { kind: 'img', src: 'bar-arch', alt: 'The green arch and gold K monogram above the bar at Irish Pub Karaka', caption: 'The arch' },
  { kind: 'video', src: 'ambience-1', poster: 'board-neon-guests', caption: 'A Tuesday' },
  { kind: 'img', src: 'booth-yellow', alt: 'A yellow velvet booth beneath a hand-painted Sláinte portrait', caption: 'The booth' },
  { kind: 'img', src: 'bar-bottles', alt: 'The lit bottle wall behind the bar', caption: 'Three shelves' },
  { kind: 'video', src: 'ambience-2', poster: 'bar-counter', caption: 'Last orders' },
  { kind: 'img', src: 'drink-hand', alt: 'A long drink held against the stone wall of the lane', caption: 'Outside' },
  { kind: 'img', src: 'slainte', alt: 'The hand-painted Sláinte portrait on the brick wall', caption: 'Sláinte' },
  { kind: 'video', src: 'ambience-3', poster: 'alley-couple', caption: 'The lane' },
  { kind: 'img', src: 'sign-carved', alt: 'The carved wooden Karaka Irish Pub sign inside the pub', caption: 'Carved' },
];

export default function Ambience() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = scoped(self);
      prepReveal(q);

      gsap.to(q('[data-fade]'), {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });

      const mm = gsap.matchMedia();

      // Desktop: traka se vuče vodoravno dok se sekcija pinna.
      mm.add(DESKTOP, () => {
        const el = track.current;
        if (!el) return;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => tween.scrollTrigger?.kill();
      });

      // Mobitel: nema pinnanja — obični native swipe.
      mm.add(MOBILE, () => {
        gsap.set(track.current, { clearProps: 'transform' });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // videa se pale tek kad uđu u kadar
  useIsomorphicLayoutEffect(() => {
    const vids = root.current?.querySelectorAll('video');
    if (!vids?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: '200px' },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={root}
      data-tone="night"
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Inside the pub"
    >
      <div className="shell mx-auto mb-10 flex max-w-[1500px] items-end justify-between gap-8">
        <p data-fade className="label opacity-60">
          Inside · nine in the morning to two at night
        </p>
        <p data-fade className="label hidden opacity-40 md:block">
          Scroll →
        </p>
      </div>

      <ul
        ref={track}
        className="
          flex w-max gap-4 pl-[var(--shell)] pr-[var(--shell)] md:gap-6
          max-md:w-auto max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto
          max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden
        "
      >
        {STRIP.map((item, i) => (
          <li
            key={i}
            data-fade
            className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[22rem] lg:w-[24rem]"
          >
            <figure className="relative aspect-[2/3] overflow-hidden">
              {item.kind === 'img' ? (
                <Image
                  src={`/img/${item.src}.webp`}
                  alt={item.alt}
                  width={1066}
                  height={1600}
                  sizes="(max-width: 767px) 68vw, 24rem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <video
                  data-src={`/video/${item.src}.mp4`}
                  poster={`/img/${item.poster}.webp`}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </figure>
            <figcaption className="label mt-3 opacity-45">{item.caption}</figcaption>
          </li>
        ))}
      </ul>
    </section>
  );
}
