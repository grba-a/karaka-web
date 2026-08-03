'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';

/* -------------------------------------------------------------- Lines --- */

/**
 * Naslov razlomljen na retke koji se otkrivaju odozdo.
 * Svaki string = jedan redak; GSAP ih pokreće preko `.reveal-line > span`.
 */
export function Lines({
  lines,
  className,
  as: Tag = 'h2',
}: {
  lines: readonly string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  return (
    <Tag className={className} data-reveal-lines>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------- Frame --- */

type FrameProps = {
  src: string;
  alt: string;
  /** aspect ratio kao Tailwind klasa, npr. "aspect-[3/4]" */
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
};

/**
 * Slika u okviru koji se otkriva clip-pathom.
 * Izvorne fotke su 1066×1600 (portret) pa je default 2:3.
 */
export function Frame({
  src,
  alt,
  ratio = 'aspect-[2/3]',
  className = '',
  priority = false,
  sizes = '(max-width: 767px) 90vw, 40vw',
  width = 1066,
  height = 1600,
  children,
}: FrameProps) {
  return (
    <figure
      className={`reveal-mask relative overflow-hidden ${ratio} ${className}`}
      data-reveal-image
    >
      <Image
        src={`/img/${src}.webp`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {children}
    </figure>
  );
}

/* --------------------------------------------------------------- Index --- */

/** Numerirano zaglavlje sekcije — „01 / THE ROUTE". */
export function SectionIndex({
  index,
  label,
  className = '',
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`label flex items-center gap-3 opacity-70 ${className}`}
      data-fade
    >
      <span className="mono">{index}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      <span>{label}</span>
    </div>
  );
}
