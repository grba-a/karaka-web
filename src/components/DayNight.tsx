'use client';

import { useIsomorphicLayoutEffect, gsap, ScrollTrigger, MOBILE, DESKTOP } from '@/lib/gsap';

/**
 * Vizualni luk dana: vapnenac (09:00) → pijesak → glina → noć (02:00).
 *
 * Ton se NE računa iz postotka scrolla nego se veže na sekcije: svaka nosi
 * `data-tone`, a ovdje se za svaku napravi jedan scrubbani ScrollTrigger.
 * Razlog: kad se --bg i --fg križaju na sredini stranice, na trenutak dobiješ
 * sivi tekst na bež podlozi (nečitljivo). Ovako prijelaz iz svijetlog u tamno
 * pada točno na Matchday, koji ima vlastiti neprozirni bottle-green panel —
 * zamjena se dogodi iza njega i oko nikad ne vidi loš kontrast.
 */

export type Tone = 'limestone' | 'sand' | 'clay' | 'night';

const TONES: Record<Tone, { bg: string; fg: string; rule: string; accent: string }> = {
  limestone: { bg: '#ede6d8', fg: '#171412', rule: '23 20 18', accent: '#9c4a2f' },
  sand: { bg: '#ddd0b9', fg: '#171412', rule: '23 20 18', accent: '#8a3f28' },
  clay: { bg: '#c9b49b', fg: '#1a1310', rule: '26 19 16', accent: '#6e3020' },
  night: { bg: '#14100d', fg: '#efe6d9', rule: '239 230 217', accent: '#d9b478' },
};

/** Na mobitelu je scroll dulji i sekcije uže — glina se preskače. */
const MOBILE_ALIAS: Partial<Record<Tone, Tone>> = { clay: 'sand' };

export default function DayNight() {
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;

    const ctx = gsap.context(() => {
      const build = (alias: Partial<Record<Tone, Tone>>) => {
        const sections = gsap.utils.toArray<HTMLElement>('[data-tone]');
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section, i) => {
          const raw = section.dataset.tone as Tone;
          const tone = TONES[alias[raw] ?? raw];
          if (!tone) return;

          const st = ScrollTrigger.create({
            trigger: section,
            // prijelaz se dogodi dok sekcija ulazi u gornju polovicu ekrana
            start: i === 0 ? 'top top' : 'top 72%',
            end: i === 0 ? 'top top' : 'top 28%',
            scrub: 0.5,
            invalidateOnRefresh: true,
            animation: gsap.fromTo(
              root,
              {},
              {
                '--bg': tone.bg,
                '--fg': tone.fg,
                '--rule': tone.rule,
                '--accent': tone.accent,
                ease: 'none',
                immediateRender: false,
              },
            ),
          });
          triggers.push(st);
        });

        return () => triggers.forEach((t) => t.kill());
      };

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => build({}));
      mm.add(MOBILE, () => build(MOBILE_ALIAS));

      // theme-color u statusnoj traci prati podlogu
      const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (meta) {
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: () => {
            const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
            if (bg) meta.content = bg;
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
