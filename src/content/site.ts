/**
 * Sav copy i podaci stranice na jednom mjestu.
 * Kad klijent potvrdi meni / cijene / raspored — mijenja se SAMO ova datoteka.
 *
 * `pending: true` označava podatak koji čeka klijentovu potvrdu.
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
  { id: 'route', label: 'The Route' },
  { id: 'tap', label: 'The Tap' },
  { id: 'tables', label: 'Tables' },
  { id: 'matchday', label: 'Matchday' },
  { id: 'alley', label: 'The Alley' },
] as const;

/* ---------------------------------------------------------------- 01 HERO */

export const hero = {
  eyebrow: 'Između polača 5 · Old Town Dubrovnik',
  lines: ['The oldest', 'Irish pub', 'in Dubrovnik'],
  lead:
    'Four hundred years ago Ragusan carracks left this harbour for Irish ports. ' +
    'The English called them argosies. One of them never sailed back — it moored ' +
    'in a stone lane off the Stradun and started pouring Guinness.',
  meta: [
    { k: 'Open', v: '09:00 — 02:00' },
    { k: 'Since', v: 'The oldest in town' },
    { k: 'Off', v: 'Stradun, 40 steps' },
  ],
};

/* --------------------------------------------------------------- 02 ROUTE */

export const route = {
  index: '01',
  title: 'Two ports, one bar',
  body: [
    'A *karaka* was a Ragusan merchant ship — three masts, deep hull, built here ' +
      'in the fifteenth century to cross open water. English sailors could not say ' +
      '"Ragusea", so they said *argosy*, and the word stayed in the language long ' +
      'after the ships were gone.',
    'Those argosies ran wine, wax and salt into Bristol, Liverpool and the Irish ' +
      'Sea. So an Irish pub in Dubrovnik called Karaka is not a costume. It is the ' +
      'oldest trade route between these two coasts, still open, now serving stout.',
  ],
  ledger: [
    { k: 'Ragusa', v: 'Home port' },
    { k: '15th c.', v: 'Three masts, deep hull' },
    { k: 'Argosy', v: 'From "Ragusea"' },
    { k: 'Cargo', v: 'Wine · wax · salt' },
    { k: 'Today', v: 'Stout · sport · song' },
  ],
};

/* ----------------------------------------------------------------- 03 TAP */

export const tap = {
  index: '02',
  title: 'The manifest',
  lead:
    'Six lines on draught, a wall of whiskey behind them, and a green board that ' +
    'gets rewritten whenever something better arrives.',
  // pending: ABV i puna lista rotirajućih craft piva
  lines: [
    { n: '01', name: "Guinness", origin: 'Dublin', note: 'Draught stout. Poured properly, or not at all.' },
    { n: '02', name: "O'Hara's", origin: 'Co. Carlow', note: 'Irish pale ale, the good kind of bitter.' },
    { n: '03', name: 'Erdinger', origin: 'Bavaria', note: 'Weissbier. Cloudy, cold, forgiving.' },
    { n: '04', name: 'Budweiser', origin: 'Missouri', note: 'For the table that cannot agree.' },
    { n: '05', name: 'Pan Zlatni', origin: 'Koprivnica', note: 'The Croatian one. Everybody orders it eventually.' },
    { n: '06', name: 'Carlsberg', origin: 'Copenhagen', note: 'Crisp lager, two taps, no queue.' },
  ],
  aside: {
    title: 'And behind the bar',
    items: [
      'Croatian craft, rotating',
      'Whiskey, three shelves deep',
      'Cocktails and spritzers',
      'Coffee from nine in the morning',
    ],
  },
};

/* -------------------------------------------------------------- 04 TABLES */

export const tables = {
  index: '03',
  title: 'Tables from everywhere',
  lead:
    'Look down. Every table in Karaka carries the crest of a different Irish pub — ' +
    'Florida, Texas, Dublin, places nobody here has been. Sit at one and you are ' +
    'drinking in two rooms at once.',
  crests: [
    { name: 'Saint James', place: 'Irish Pub', est: '1967', img: 'crest-saint-james' },
    { name: "Lynch's", place: 'Jax Beach, Florida', est: '1994', img: 'crest-lynchs' },
    { name: "O'Brien's", place: 'Irish Pub', est: '—', img: 'crest-obriens' },
    { name: 'The Inn Pub', place: 'Kerrville, Texas', est: '—', img: 'crest-inn' },
  ],
  footnote: 'Ask the bar what is written on yours.',
};

/* ------------------------------------------------------------ 05 MATCHDAY */

export const matchday = {
  index: '04',
  title: 'Every match that matters',
  lead:
    'Full HD screens, English commentary, and a room that will explain the offside ' +
    'rule to you whether you asked or not.',
  competitions: [
    'GAA League & Championship',
    'Premier League',
    'UEFA Champions League',
    'FA Cup',
    'Six Nations',
    'Rugby Union',
  ],
  channels: ['SkySports', 'FOX', 'ESPN', 'SuperSport'],
  // pending: raspored utakmica / imaju li fixture listu
  note: 'Fixtures on the board by the door. Ask us to put your match on — we usually can.',
};

/* ------------------------------------------------------------- 06 BITES */

export const bites = {
  index: '05',
  title: 'Something with that',
  lead: 'A short kitchen. Everything is meant to be eaten with one hand.',
  // pending: potvrditi meni i cijene — namjerno bez cijena dok ne stignu
  items: [
    { name: 'Falafel', note: 'Herbs, tahini, warm flatbread' },
    { name: 'Beetroot patty', note: 'The one the vegetarians come back for' },
    { name: 'Pulled beef', note: 'Slow, dark, generous' },
    { name: 'Classics', note: 'The list on the table, all day' },
  ],
  footnote: 'Full menu and prices at the table.',
};

/* -------------------------------------------------------------- 07 ALLEY */

export const alley = {
  index: '06',
  title: 'Forty steps off the Stradun',
  body:
    'Turn off the main street into Između polača and keep going until a lantern ' +
    'says IRISH PUB. Stone on both sides, tables in the lane, brick and a vaulted ' +
    'ceiling inside. If the lane is full, so is the pub — walk in anyway.',
};

/* ------------------------------------------------------------- 08 VOICES */

export const voices = [
  {
    quote: 'The best Irish bar in Dubrovnik. Excellent Guinness.',
    source: 'Tripadvisor',
  },
  {
    quote: 'Great music, great crowd, and a shockingly clean washroom.',
    source: 'Tripadvisor',
  },
  {
    quote: 'Friendly staff who remember you the second time you walk in.',
    source: 'Tripadvisor',
  },
  {
    quote: 'A lovely place to sit outside with a beer and watch the lane go by.',
    source: 'Tripadvisor',
  },
];

/* ------------------------------------------------------------- 09 FOOTER */

export const partners = [
  { name: 'Restaurant Sesame', href: 'https://sesame.hr/' },
  { name: 'Cafe Festival', href: 'https://cafefestival.hr/' },
  { name: 'Burger Tiger', href: null },
  { name: 'Pasta Lab', href: null },
];
