/**
 * Sav copy i podaci stranice na jednom mjestu.
 * Kad klijent potvrdi meni, cijene ili raspored — mijenja se SAMO ova datoteka.
 *
 * Ton: obećanje, ne činjenica. Svaka sekcija odgovara na jedno gostovo pitanje
 * i gura ga bliže jednom činu — ući u lokal.
 */

export const venue = {
  name: 'Karaka',
  fullName: 'Irish Pub Karaka',
  tagline: 'The oldest Irish pub in Dubrovnik',
  street: 'Ul. Između polača 5',
  city: '20000 Dubrovnik, Croatia',
  phone: '+385 20 323 970',
  phoneHref: '+38520323970',
  email: 'info@irishpubkaraka.hr',
  hours: '09:00 — 02:00',
  hoursNote: 'Seven days a week', // pending: potvrditi s klijentom
  maps: 'https://maps.google.com/?q=Irish+Pub+Karaka+Dubrovnik',
  social: {
    instagram: 'https://www.instagram.com/irishpubkarakadubrovnik/',
    facebook: 'https://www.facebook.com/irishpubkaraka/',
  },
} as const;

export const nav = [
  { id: 'why', label: 'Why here' },
  { id: 'whats-on', label: "What's on" },
  { id: 'find-us', label: 'Find us' },
] as const;

/* ------------------------------------------------------------------- HERO */

export const hero = {
  eyebrow: 'The oldest Irish pub in Dubrovnik',
  /** H1 — obećanje. Svaki redak je zaseban za staggered reveal. */
  lines: ['A proper pint,', 'forty steps', 'off the Stradun.'],
  cta: 'Get directions',
  ctaSecondary: 'Call the bar',
};

/* ---------------------------------------------------------------- REASONS */

export const reasons = {
  index: '01',
  label: 'Why here',
  title: 'Three good reasons',
  items: [
    {
      n: '01',
      title: 'Guinness, poured properly',
      body:
        'Two-part pour, given the time it needs. Six lines on draught behind it, ' +
        'three shelves of whiskey behind those.',
      img: 'tap-harp',
      alt: 'The lit Guinness harp tap at the bar of Irish Pub Karaka',
    },
    {
      n: '02',
      title: 'Every match that matters',
      body:
        'GAA, Premier League, the Champions League, the Six Nations. Full HD, ' +
        'English commentary, and a room that cares about the result.',
      img: 'sport-wall',
      alt: 'Framed rugby and football photographs on the brick wall at Irish Pub Karaka',
    },
    {
      n: '03',
      title: 'Forty steps off the Stradun',
      body:
        'Turn into Između polača and keep walking until a lantern says IRISH PUB. ' +
        'Stone lane, tables outside, a vaulted brick room in.',
      img: 'alley-door',
      alt: 'The stone arch entrance to Irish Pub Karaka, guests seated in the lane',
    },
  ],
};

/* ------------------------------------------------------------------ PROOF */

export const proof = {
  index: '02',
  label: 'What people say',
  title: 'The room is usually full',
  lead:
    'It has been pouring here longer than most bars in the Old Town have been open. ' +
    'People keep coming back for the same three things.',
  // stvarni citati s Tripadvisora — bez ocjene, bez izmišljenih imena
  quotes: [
    { quote: 'The best Irish bar in Dubrovnik. Excellent Guinness.', source: 'Tripadvisor' },
    { quote: 'Great music, great crowd, and a shockingly clean washroom.', source: 'Tripadvisor' },
    { quote: 'Friendly staff who remember you the second time you walk in.', source: 'Tripadvisor' },
  ],
  gallery: [
    { img: 'bar-counter', alt: 'Guests at the bar of Irish Pub Karaka with a pint of Guinness' },
    { img: 'board-neon-guests', alt: 'Guests at a table beneath the green neon draught board' },
    { img: 'alley-couple', alt: 'A couple with beers under the stone arch outside Irish Pub Karaka' },
    { img: 'booth-yellow', alt: 'A yellow velvet booth beneath a hand-painted Sláinte portrait' },
  ],
};

/* ------------------------------------------------------------------ OFFER */

export const offer = {
  index: '03',
  label: "What's on",
  title: 'What you walk into',
  // pending: ABV i puna lista rotirajućih craft piva
  tap: {
    title: 'On tap',
    items: [
      { name: 'Guinness', note: 'Dublin' },
      { name: "O'Hara's", note: 'Irish pale ale' },
      { name: 'Erdinger', note: 'Weissbier' },
      { name: 'Budweiser', note: 'Lager' },
      { name: 'Pan Zlatni', note: 'The Croatian one' },
      { name: 'Carlsberg', note: 'Two taps, no queue' },
    ],
    footnote: 'Croatian craft rotating · cocktails · whiskey · coffee from nine',
  },
  screen: {
    title: 'On screen',
    items: [
      'GAA League & Championship',
      'Premier League',
      'UEFA Champions League',
      'FA Cup',
      'Six Nations',
      'Rugby Union',
    ],
    channels: ['SkySports', 'FOX', 'ESPN', 'SuperSport'],
    footnote: 'Ask us to put your match on. We usually can.',
    cta: 'Call the bar',
  },
  table: {
    title: 'On the table',
    // pending: potvrditi meni i cijene — namjerno bez cijena dok ne stignu
    items: [
      { name: 'Falafel', note: 'Herbs, tahini, warm flatbread' },
      { name: 'Beetroot patty', note: 'The one the vegetarians come back for' },
      { name: 'Pulled beef', note: 'Slow, dark, generous' },
      { name: 'Classics', note: 'The list on the table, all day' },
    ],
    footnote: 'Full menu and prices at the table.',
  },
};

/* ---------------------------------------------------------------- FIND US */

export const findUs = {
  index: '04',
  label: 'Find us',
  title: 'You are probably two minutes away',
  body:
    'Karaka sits in Između polača, a stone lane off the Stradun. If the lane is ' +
    'full, so is the pub — walk in anyway.',
  img: 'alley-crowd',
  alt: 'The narrow limestone lane Između polača, busy beneath the Irish Pub Karaka lantern',
};

/* ----------------------------------------------------------------- FOOTER */

export const footer = {
  /** Cijela priča o imenu, u jednoj rečenici. */
  story:
    'A karaka was a Ragusan ship. The English could not say “Ragusea”, so they ' +
    'called it an argosy, and they sailed it into Irish ports. The name stayed.',
};

export const partners = [
  { name: 'Restaurant Sesame', href: 'https://sesame.hr/' },
  { name: 'Cafe Festival', href: 'https://cafefestival.hr/' },
  { name: 'Burger Tiger', href: null },
  { name: 'Pasta Lab', href: null },
];
