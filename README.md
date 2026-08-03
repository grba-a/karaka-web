# Irish Pub Karaka — „Port of Call"

Novi web za **Irish Pub Karaka**, Ul. Između polača 5, Stari grad Dubrovnik.
Jedan landing page, engleski, Next.js App Router.

**Dev:** `http://localhost:3400`

---

## Koncept

Karaka je bio dubrovački trgovački jedrenjak 15.–16. stoljeća; engleski ga je
zapamtio kao *argosy* (od „Ragusea"), a te su karake plovile u britanske i irske
luke. Irski pub u Dubrovniku koji se zove Karaka zato nije kostim nego najstarija
trgovačka ruta između ta dva mora.

Drugi, fizički dio priče: **svaki stol u pubu nosi ugraviran grb drugog irskog
puba iz svijeta** — Saint James 1967, Lynch's (Jax Beach), O'Brien's, The Inn Pub
(Kerrville, Texas). Taj ugravirani grb je signature motiv cijelog weba.

### Vizualni luk: dan → noć

Stranica kreće na vapnenačkoj podlozi (uličica u 9 ujutro) i scrollom se zatamnjuje
do noćnog puba (02:00). Ton se ne računa iz postotka scrolla nego se veže na
sekcije preko `data-tone`; prijelaz iz svijetlog u tamno pada točno na Matchday,
koji ima vlastiti neprozirni bottle-green panel, pa se zamjena dogodi iza njega.

### Paleta i pismo

| Token | Uloga |
|---|---|
| `#EDE6D8` vapnenac | dan, vrh stranice |
| `#DDD0B9` pijesak · `#C9B49B` glina | prijelaz |
| `#14100D` noć | dno stranice |
| `#1E3A2B` bottle green | Matchday panel |
| `#B08A4A` mjed | gravure, brojevi, linije |

**Fraunces** (display) · **Archivo** (tekst) · **DM Mono** (labeli, manifest liste)

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
├── components/     jedna komponenta po sekciji stranice
│   ├── SmoothScroll.tsx   Lenis ↔ gsap.ticker most
│   ├── DayNight.tsx       globalni --bg/--fg luk po data-tone
│   ├── StickyBar.tsx      mobilna CTA traka (Directions | Call)
│   └── ui/                Crest, Cta, Reveal, Grain
├── content/site.ts SAV copy i podaci — jedina datoteka koju treba dirati
│                   kad klijent pošalje meni, cijene ili raspored
└── lib/gsap.ts     registracija plugina, prepReveal/enterIn helperi
```

### Slike

`npm run images` čita `~/Desktop/Karaka slike`, preimenuje po `MAP` u
`scripts/images.mjs` i izbaci webp u `public/img`. Generirani `public/img` i
`public/video` su u repozitoriju da build ne ovisi o lokalnom folderu.

Izvori su WhatsApp-komprimirani (1066×1600, uglavnom portret) i videa 576×1024 —
zato je layout portretno-prvi. **Originali iz fotoaparata bi web podigli za razred.**

---

## Animacije

GSAP 3 + ScrollTrigger, Lenis za smooth scroll. Sve u `useLayoutEffect` +
`gsap.context()` s cleanupom.

Tri zamke koje su već riješene i ne treba ih ponovno uvoditi:

1. **Početno stanje ne smije ostati samo u CSS-u.** `getComputedStyle` vraća
   transform kao matricu, pa GSAP postotak iz `translate3d(0,105%,0)` upiše kao
   piksele i `yPercent: 0` nema što animirati. Zato `prepReveal()` radi
   `gsap.set(..., { y: 0, yPercent: 105 })`.
2. **Tailwind v4 `translate-y-*` se ne miješa s GSAP-om** — v4 to piše u
   `translate:`, koji GSAP ugasi. Na animiranim elementima se ne koristi.
3. **ScrollTrigger ne dobiva update od programatskog scrolla** dok scroll ide kroz
   Lenis. Za obično pokaži/sakrij (mobilna CTA traka) koristi se
   IntersectionObserver, ne ScrollTrigger.

Mobitel (`gsap.matchMedia()`, `< 768px`): bez pinnanja i paralaksa, horizontalna
traka postaje native swipe, tonski luk ima dvije stanice umjesto četiri.
`prefers-reduced-motion` gasi Lenis i sve reveal animacije.

---

## Provjere

```bash
npm run build
node scripts/dev/webkit-check.mjs   # traži: npm i -D playwright
```

WebKit provjera je odvojena jer Chrome mobile emulacija propušta bugove ovisne o
engineu. `playwright` namjerno **nije** u `devDependencies` — njegov postinstall
skida browsere i usporio bi Vercel build.

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
