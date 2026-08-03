'use client';

import { useState } from 'react';
import { useIsomorphicLayoutEffect, gsap, ScrollTrigger } from '@/lib/gsap';
import { nav, venue } from '@/content/site';

/**
 * Sticky traka. Kreće providna preko heroja, pa se na scrollu skupi i
 * dobije hairline. Na mobitelu se linkovi otvaraju u punom ekranu.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById('site-nav');
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, { yPercent: -110, duration: 1, ease: 'expo.out', delay: 1.15 });

      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onToggle: (self) => el.classList.toggle('is-stuck', self.isActive),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        id="site-nav"
        className="
          fixed inset-x-0 top-0 z-50
          transition-[background-color,backdrop-filter] duration-500
          [&.is-stuck]:backdrop-blur-xl
        "
        style={{ color: 'var(--fg)' }}
      >
        <div
          className="
            shell flex items-center justify-between gap-6
            py-5 transition-[padding] duration-500
            [.is-stuck_&]:py-3
          "
        >
          <a href="#top" className="group flex items-baseline gap-2.5 no-underline">
            <span
              className="display-sub text-[1.375rem] leading-none tracking-tight"
              style={{ color: 'var(--fg)' }}
            >
              Karaka
            </span>
            <span className="label hidden opacity-50 sm:inline">Irish Pub</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="label relative py-1 opacity-65 transition-opacity duration-300 hover:opacity-100"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 [a:hover>&]:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="mono hidden text-[0.75rem] opacity-50 xl:inline">
              {venue.hours}
            </span>
            <a
              href={venue.maps}
              target="_blank"
              rel="noreferrer noopener"
              className="group/nav label hidden items-center gap-2 rounded-full px-5 py-2.5 transition-opacity duration-300 hover:opacity-85 lg:inline-flex"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              Find us
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/nav:translate-x-0.5"
              >
                ↗
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label -mr-1 flex items-center gap-2 px-1 py-2 md:hidden"
            >
              {open ? 'Close' : 'Menu'}
              <span aria-hidden className="grid gap-[3px]">
                <span
                  className="block h-px w-4 bg-current transition-transform duration-300"
                  style={open ? { transform: 'translateY(2px) rotate(20deg)' } : undefined}
                />
                <span
                  className="block h-px w-4 bg-current transition-transform duration-300"
                  style={open ? { transform: 'translateY(-2px) rotate(-20deg)' } : undefined}
                />
              </span>
            </button>
          </div>
        </div>
        <div
          className="hairline mx-[var(--shell)] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [.is-stuck_&]:scale-x-100"
        />
      </header>

      {/* mobilni izbornik */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center gap-1 px-[var(--shell)] md:hidden"
        style={{ background: 'var(--bg)', color: 'var(--fg)' }}
      >
        {nav.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            className="display-sub border-b py-4 text-[2rem]"
            style={{
              borderColor: 'rgb(var(--rule) / 0.15)',
              animation: open ? `menu-in .5s cubic-bezier(.16,1,.3,1) ${i * 0.05}s both` : undefined,
            }}
          >
            {item.label}
          </a>
        ))}
        <div className="mt-10 flex gap-3">
          <a
            href={venue.maps}
            target="_blank"
            rel="noreferrer noopener"
            className="label flex-1 rounded-full py-4 text-center"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Directions ↗
          </a>
          <a
            href={`tel:${venue.phoneHref}`}
            className="label flex-1 rounded-full py-4 text-center"
            style={{ border: '1px solid rgb(var(--rule) / 0.24)' }}
          >
            Call
          </a>
        </div>
        <p className="label mt-4 opacity-50">
          {venue.hours} · {venue.street}
        </p>

        <style>{`@keyframes menu-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </>
  );
}
