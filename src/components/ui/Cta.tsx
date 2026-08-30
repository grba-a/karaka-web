'use client';

import type { ReactNode } from 'react';

/**
 * Jedini gumb na stranici.
 *
 * Oblik je posuđen od emajlirane pub-table: pravokutnik s blagim radijusom i
 * uvučenom drugom linijom, umjesto generične pilule. Linija se na hoveru
 * raširi prema rubu — mali, opipljiv detalj koji pilula nema.
 *
 * Tri tona:
 *   light  — na tamnom scrimu heroja (fiksne boje, ne prate --fg)
 *   auto   — u sekcijama, prati zonu preko --fg/--bg
 *   brass  — naglasak u tamnoj zoni
 */

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  tone?: 'auto' | 'light' | 'brass';
  external?: boolean;
  arrow?: boolean;
  className?: string;
};

const FILL: Record<string, { bg: string; fg: string; line: string }> = {
  light: { bg: '#f6efe4', fg: '#14100d', line: 'rgba(20,16,13,.28)' },
  auto: { bg: 'var(--fg)', fg: 'var(--bg)', line: 'rgb(var(--rule) / 0)' },
  brass: { bg: 'var(--color-brass-lit)', fg: '#14100d', line: 'rgba(20,16,13,.3)' },
};

const OUTLINE: Record<string, { fg: string; edge: string; line: string }> = {
  light: { fg: '#f6efe4', edge: 'rgba(246,239,228,.42)', line: 'rgba(246,239,228,.22)' },
  auto: { fg: 'var(--fg)', edge: 'rgb(var(--rule) / 0.34)', line: 'rgb(var(--rule) / 0.18)' },
  brass: { fg: 'var(--color-brass-lit)', edge: 'rgba(217,180,120,.5)', line: 'rgba(217,180,120,.26)' },
};

export default function Cta({
  href,
  children,
  variant = 'solid',
  tone = 'auto',
  external = false,
  arrow = true,
  className = '',
}: Props) {
  const solid = variant === 'solid';
  const f = FILL[tone];
  const o = OUTLINE[tone];

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[5px] px-7 py-4 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[.985] ${className}`}
      style={
        solid
          ? { background: f.bg, color: f.fg }
          : { color: o.fg, boxShadow: `inset 0 0 0 1px ${o.edge}` }
      }
    >
      {/* uvučena druga linija — na hoveru se raširi prema rubu */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[4px] rounded-[2px] transition-[inset] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/cta:inset-[2px]"
        style={{ boxShadow: `inset 0 0 0 1px ${solid ? f.line : o.line}` }}
      />

      <span
        className="font-mono text-[0.75rem] uppercase leading-none tracking-[0.16em]"
        style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}
      >
        {children}
      </span>

      {arrow && (
        <span
          aria-hidden
          className="text-[0.8125rem] leading-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/cta:translate-x-1"
        >
          {external ? '↗' : '→'}
        </span>
      )}
    </a>
  );
}
