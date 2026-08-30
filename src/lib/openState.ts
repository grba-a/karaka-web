/**
 * Živi status lokala.
 *
 * Cijeli hero visi o ovome: gost mora u prvoj sekundi vidjeti da je OTVORENO
 * i kakav je pub baš sada. Sat se uvijek računa u Dubrovniku, bez obzira gdje
 * je gost i na koju je vremensku zonu namješten njegov mobitel — turist iz
 * Londona ne smije dobiti "Closed" jer je kod njega sat manje.
 */

export const OPENS = 9; // 09:00
export const CLOSES = 2; // 02:00 idućeg dana

export type Part = 'morning' | 'afternoon' | 'evening' | 'night' | 'closed';

export type OpenState = {
  part: Part;
  open: boolean;
  /** linija ispod naslova — mijenja se kroz dan */
  line: string;
  /** tekst u chipu, npr. "Open now · closes 02:00" */
  chip: string;
  /** true kad je vani mrak — hero tada prebacuje na noćnu fotografiju */
  dark: boolean;
};

/** Sat (0–23) u Dubrovniku, neovisno o zoni posjetitelja. */
export function dubrovnikHour(now: Date = new Date()): number {
  const h = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Zagreb',
    hour: '2-digit',
    hour12: false,
  }).format(now);
  // en-GB zna vratiti "24" za ponoć
  return Number(h) % 24;
}

const COPY: Record<Part, { line: string; chip: string }> = {
  morning: {
    line: 'The coffee is on and the lane is still quiet.',
    chip: 'Open now · until 02:00',
  },
  afternoon: {
    line: 'Sun off the lane, cold ones pouring.',
    chip: 'Open now · until 02:00',
  },
  evening: {
    line: 'First pints are down. Something is on the screens.',
    chip: 'Open now · until 02:00',
  },
  night: {
    line: 'Still going. Last orders at two.',
    chip: 'Open now · last orders at 02:00',
  },
  closed: {
    line: 'Sleeping it off. The taps open again at nine.',
    chip: 'Closed · opens 09:00',
  },
};

export function openState(now: Date = new Date()): OpenState {
  const h = dubrovnikHour(now);

  let part: Part;
  if (h >= CLOSES && h < OPENS) part = 'closed';
  else if (h >= OPENS && h < 12) part = 'morning';
  else if (h >= 12 && h < 17) part = 'afternoon';
  else if (h >= 17 && h < 22) part = 'evening';
  else part = 'night'; // 22–23 i 00–01

  return {
    part,
    open: part !== 'closed',
    dark: part === 'evening' || part === 'night' || part === 'closed',
    ...COPY[part],
  };
}

/** Stanje koje se renderira na serveru — najvjerojatniji sat posjeta. */
export const SSR_STATE: OpenState = {
  part: 'afternoon',
  open: true,
  dark: false,
  ...COPY.afternoon,
};
