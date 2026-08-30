# Irish Pub Karaka — „Port of Call"

Novi web za **Irish Pub Karaka**, Ul. Između polača 5, Stari grad Dubrovnik.
Jedna prodajna stranica, engleski, Next.js App Router.

**v2 — KISS.** v1 je bila magazin (12 500 px, esej o etimologiji prije ijednog
razloga za dolazak). v2 ima šest sekcija i jedan cilj: **dovesti gosta u lokal
sada**. Primarni CTA je *Get directions*, i sve prije njega samo skida prepreke.

**Dev:** `http://localhost:3400`

---

## Koncept

Stranica ima jedan posao: gost šeće Starim gradom, žedan je, i mora završiti u
Karaki. Zato je struktura AIDA, a ne magazin:

| # | Sekcija | Na koje gostovo pitanje odgovara |
|---|---|---|
| 1 | **Hero** | „Je li otvoreno i gdje je?" |
| 2 | **Reasons** | „Zašto baš ovdje?" |
| 3 | **Proof** | „Je li stvarno dobro?" |
| 4 | **Offer** | „Što točno dobivam?" |
| 5 | **Find Us** | „Kako da dođem?" |

Ime nosi jednu rečenicu priče u footeru: karaka je bio dubrovački jedrenjak koji
je engleski zapamtio kao *argosy* i koji je plovio u irske luke. Ugravirani grb
(`ui/Crest.tsx`) preživio je kao mala oznaka u footeru i kao favicon.

**Ocjene se namjerno ne prikazuju.** Google je 4,1, Tripadvisor 3,5 — isticanje
broja bi štetilo, pa dokaz ide preko biranih citata i fotografija pune sale.

### Paleta i pismo

| Token | Uloga |
|---|---|
| `#EDE6D8` vapnenac | svijetla zona (hero, razlozi, dokaz) |
| `#14100D` noć | tamna zona (ponuda, lokacija, footer) |
| `#B08A4A` / `#D9B478` mjed | naglasak, gumbi u tamnoj zoni |
| `#9C4A2F` cigla | naglasak u svijetloj zoni |

**Fraunces** (display) · **Familjen Grotesk** (tekst) · **DM Mono** (labeli)

Gumbi (`ui/Cta.tsx`) su emajlirana pub-tabla: pravokutnik s uvučenom drugom
linijom koja se na hoveru raširi prema rubu — ne generična pilula.

---

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3400
```

> Na macOS-u s npm 11.9.x instalacija zna pasti s `Invalid Version:` zbog
> oštećenog `~/.npm/_cacache`. Popravak, ovim redom:
> `rm -f package-lock.json && npm install --cache /tmp/npm-clean-cache`

---

## Struktura

```
src/
├── app/            layout (fontovi, JSON-LD), globals.css, icon.svg
├── lib/
│   ├── openState.ts  živi status po satu u Dubrovniku
│   └── gsap.ts       jedini scroll reveal na stranici
├── content/site.ts   SAV copy i podaci — jedina datoteka koju treba dirati
│                     kad klijent pošalje meni, cijene ili raspored
└── components/
    ├── Hero.tsx      živi hero (CSS intro, dnevna/noćna fotka)
    ├── Reasons.tsx   tri razloga za dolazak
    ├── Proof.tsx     citati gostiju + fotke pune sale
    ├── Offer.tsx     na točioniku / na ekranu / na stolu
    ├── FindUs.tsx    zatvaranje: adresa, radno vrijeme, upute
    ├── Nav.tsx  Footer.tsx
    └── ui/           Cta, Crest, Reveal
```

### Živi hero

`lib/openState.ts` računa sat **u Dubrovniku** (`Intl.DateTimeFormat` s
`timeZone: 'Europe/Zagreb'`), neovisno o tome gdje je gost — turist iz Londona
ne smije dobiti „Closed" jer je kod njega sat manje. Radno vrijeme 09:00–02:00
daje pet stanja (morning / afternoon / evening / night / closed), a svako mijenja
rečenicu ispod naslova.

Fotografija: SSR uvijek renderira **dnevnu** (`priority`, zbog LCP-a). Tek kad je
u Dubrovniku mrak klijent dovuče **noćnu** i crossfadea. Gost koji dođe danju
noćnu fotku nikad ni ne skine. Živo stanje se računa u `useEffect` (SSR default =
popodne), pa nema hydration mismatcha.

Provjera svih pet stanja: `node scripts/dev/live-hero-check.mjs`.

### Boja bez mašinerije

Dvije fiksne zone — `.zone-light` (vapnenac + tinta) i `.zone-dark` (noć + krem).
Granica je namjeran tvrd rez između Proofa i Offera, „ulazak unutra". Nula JS-a i
nula trenutaka u kojima se tekst i podloga križaju u nečitljivu sivu.

### Slike

`npm run images` čita `~/Desktop/Karaka slike`, preimenuje po `MAP` u
`scripts/images.mjs` i izbaci webp u `public/img`. Generirani `public/img` i
`public/video` su u repozitoriju da build ne ovisi o lokalnom folderu.

Izvori su WhatsApp-komprimirani (1066×1600, uglavnom portret) — zato hero ima jak
scrim, a layout je portretno-prvi. **Originali iz fotoaparata bi web podigli za
razred.**

---

## Animacije

Namjerno malo. Hero je **čisti CSS** (`globals.css`) jer se mora nacrtati prije
nego JS stigne — isti naslov na GSAP-u je na drugom projektu digao mobilni LCP na
5 s. Sve ispod heroja koristi jedan zajednički reveal iz `lib/gsap.ts` (fade +
rise, jednom). Traka kanala je CSS animacija.

Nema Lenisa, pinnanja, paralaksa ni horizontalnog scrolla.
`prefers-reduced-motion` gasi sve.

Zamke koje su riješene i ne treba ih ponovno uvoditi:

1. **Početno stanje ne smije ostati samo u CSS-u.** `getComputedStyle` vraća
   transform kao matricu, pa GSAP postotak iz `translate3d(0,105%,0)` upiše kao
   piksele i `yPercent: 0` nema što animirati.
2. **Tailwind v4 `translate-y-*` se ne miješa s GSAP-om** — v4 to piše u
   `translate:`, koji GSAP ugasi. Na animiranim elementima se ne koristi.
3. **Tailwindov `hidden` ne pobjeđuje pouzdano `inline-flex` iz baze komponente** —
   sakrivanje ide na omotač (`<span className="hidden md:block">`), ne na `Cta`.

---

## Provjere

```bash
npm run build
node scripts/dev/live-hero-check.mjs   # pet stanja živog heroja
node scripts/dev/webkit-check.mjs      # mobilni WebKit
```

Oba skripta traže `npm i -D playwright` lokalno. `playwright` namjerno **nije** u
`devDependencies` — njegov postinstall skida browsere i usporio bi Vercel build.

---

## Deploy

Statični Next.js build, bez env varijabli i bez backenda. Na Vercelu radi s
default postavkama (Framework preset: Next.js, Build Command: `next build`).

---

## Čeka potvrdu klijenta

Sve označeno s `pending:` u `src/content/site.ts`:

1. Meni hrane i cijene — služe li sami ili preko Burger Tigera / Pasta Laba
2. Puna lista točionika s ABV-om i rotirajućim craft pivima
3. Ima li još live musica i po kojem rasporedu
4. Vektorski logo (trenutno postoji samo raster)
5. Originalne fotografije + fotke hrane i eksterijera navečer
6. Potvrda radnog vremena 09:00 — 02:00 svaki dan
