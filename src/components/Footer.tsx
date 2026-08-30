'use client';

import { useRef } from 'react';
import { useReveal } from '@/lib/gsap';
import { venue } from '@/content/site';
import Logo from './ui/Logo';
import SocialIcon from './ui/SocialIcon';

/**
 * Footer, sveden na ono što gost stvarno traži na dnu: gdje su, kad rade,
 * kako doći do njih i gdje ih pratiti.
 *
 * Namjerno NEMA: ponovljene navigacije (stranica je jedna i traka je uvijek
 * gore), „Back to top" gumba (znak je link na vrh), popisa partnerskih lokala
 * (spomenuti su tamo gdje su relevantni — uz rečenicu da nema kuhinje) i priče
 * o imenu. Sve to je bio šum ispod zadnjeg CTA-a.
 */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useReveal(root, 'top 92%');

  return (
    <footer ref={root} className="zone-dark relative pb-10 pt-14 md:pt-16">
      <div className="shell mx-auto flex max-w-[1500px] flex-col items-center gap-8 text-center">
        <Logo size={72} className="text-[var(--color-brass)]" />

        <address data-fade className="flex flex-col gap-1.5 not-italic">
          <span className="display-sub text-[1.125rem]">{venue.street}</span>
          <span className="text-[0.9375rem] opacity-55">{venue.city}</span>
        </address>

        <div data-fade className="flex flex-wrap items-center justify-center gap-x-6">
          <a
            href={`tel:${venue.phoneHref}`}
            className="tap display-sub text-[1.0625rem] transition-opacity hover:opacity-70"
          >
            {venue.phone}
          </a>
          <a
            href={`mailto:${venue.email}`}
            className="tap text-[0.9375rem] opacity-60 transition-opacity hover:opacity-100"
          >
            {venue.email}
          </a>
        </div>

        <p data-fade className="mono text-[0.8125rem] opacity-55">
          {venue.hours} · {venue.hoursNote.toLowerCase()}
        </p>

        <div data-fade className="flex gap-2">
          <SocialIcon network="instagram" href={venue.social.instagram} />
          <SocialIcon network="facebook" href={venue.social.facebook} />
          <SocialIcon network="tripadvisor" href={venue.social.tripadvisor} />
        </div>

        <p className="rule-t mt-4 w-full pt-6 text-center">
          <span className="label opacity-30">
            © {new Date().getFullYear()} {venue.fullName}
          </span>
        </p>
      </div>
    </footer>
  );
}
