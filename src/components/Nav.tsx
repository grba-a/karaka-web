'use client';

import { useEffect, useState } from 'react';
import { nav, venue } from '@/content/site';
import Cta from './ui/Cta';
import Logo from './ui/Logo';

/**
 * Traka. Preko heroja je providna (hero ima tamni scrim pa je tekst svijetao),
 * a čim gost prođe hero dobiva podlogu i skupi se.
 *
 * Bez GSAP-a i ScrollTriggera — jedan scroll listener je dovoljan, a i
 * pouzdaniji je (ScrollTrigger je u v1 znao ne dobiti update).
 */
export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // otvoren izbornik ne smije dopustiti scroll ispod sebe
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500"
        style={
          stuck
            ? {
                background: 'color-mix(in oklab, var(--color-night) 86%, transparent)',
                backdropFilter: 'blur(14px)',
                color: 'var(--color-cream)',
              }
            : { color: '#f6efe4' }
        }
      >
        <div
          className={`shell flex items-center justify-between gap-6 transition-[padding] duration-500 ${
            stuck ? 'py-3' : 'py-5'
          }`}
        >
          <Logo size={44} priority />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="tap label transition-opacity duration-300 hover:opacity-100"
                style={
                  stuck
                    ? { opacity: 0.7 }
                    : { opacity: 0.95, textShadow: '0 1px 10px rgba(10,7,5,.6)' }
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden md:block">
              <Cta href={venue.maps} tone="light" external className="!px-5 !py-2.5">
                Get directions
              </Cta>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label -mr-2 flex min-h-11 items-center gap-2 px-2 md:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------- mobilni izbornik */}
      {open && (
        <div
          id="mobile-menu"
          className="zone-dark fixed inset-0 z-40 flex flex-col justify-center px-[var(--shell)] md:hidden"
        >
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="display-sub rule-b py-5 text-[2rem]"
              style={{ animation: `fade-up .5s cubic-bezier(.16,1,.3,1) ${i * 60}ms both` }}
            >
              {item.label}
            </a>
          ))}

          <div className="mt-10 flex gap-3">
            <Cta href={venue.maps} external className="flex-1">
              Directions
            </Cta>
            <Cta href={`tel:${venue.phoneHref}`} variant="ghost" arrow={false} className="flex-1">
              Call
            </Cta>
          </div>
          <p className="label mt-5 opacity-50">
            {venue.hours} · {venue.street}
          </p>
        </div>
      )}
    </>
  );
}
