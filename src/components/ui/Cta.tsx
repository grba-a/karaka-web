'use client';

import type { ReactNode } from 'react';

/**
 * Jedini gumb na stranici, u dvije težine.
 *
 * Karaka ne prima rezervacije, pa nema „Book a table". Prave akcije su
 * pronaći uličicu i nazvati šank — zato su svi CTA-i na webu jedno od to
 * dvoje, i zato izgledaju isto gdje god se pojave.
 *
 * `tone="onDark"` se koristi na bottle-green Matchday panelu, koji ne prati
 * globalni --fg nego ima vlastite boje.
 */

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  tone?: 'auto' | 'onDark';
  external?: boolean;
  className?: string;
};

export default function Cta({
  href,
  children,
  variant = 'primary',
  tone = 'auto',
  external = false,
  className = '',
}: Props) {
  const onDark = tone === 'onDark';

  const base =
    'group/cta label inline-flex items-center gap-3 rounded-full px-6 py-4 ' +
    'transition-[background-color,color,border-color,transform] duration-500 ' +
    'ease-[cubic-bezier(.16,1,.3,1)] active:scale-[.98]';

  const style =
    variant === 'primary'
      ? onDark
        ? { background: 'var(--color-brass-lit)', color: '#14100d', border: '1px solid var(--color-brass-lit)' }
        : { background: 'var(--fg)', color: 'var(--bg)', border: '1px solid var(--fg)' }
      : onDark
        ? { background: 'transparent', color: '#f1ece0', border: '1px solid rgba(241,236,224,.34)' }
        : {
            background: 'transparent',
            color: 'var(--fg)',
            border: '1px solid rgb(var(--rule) / 0.3)',
          };

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`${base} ${variant === 'primary' ? 'hover:opacity-85' : 'hover:border-current'} ${className}`}
      style={style}
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/cta:translate-x-1"
      >
        {external ? '↗' : '→'}
      </span>
    </a>
  );
}
