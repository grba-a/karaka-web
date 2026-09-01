/**
 * OG slika 1200×630 za dijeljenje.
 *
 * Portretna fotka se na WhatsAppu i Instagramu ružno reže, a publika je mobilna
 * i dijeli linkove. Ovdje je kadar iz hero fotke + scrim + logo + obećanje,
 * složeno u omjer koji sve platforme očekuju.
 *
 *   npm run og
 */
import sharp from 'sharp';
import path from 'node:path';

const W = 1200;
const H = 630;
const OUT = path.join(process.cwd(), 'public', 'og.jpg');

const photo = await sharp(path.join(process.cwd(), 'public', 'img', 'alley-crowd.webp'))
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .toBuffer();

const scrim = Buffer.from(`<svg width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"   stop-color="#0a0705" stop-opacity=".94"/>
      <stop offset="45%"  stop-color="#0a0705" stop-opacity=".72"/>
      <stop offset="100%" stop-color="#0a0705" stop-opacity=".30"/>
    </linearGradient>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0a0705" stop-opacity=".72"/>
      <stop offset="60%"  stop-color="#0a0705" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#l)"/>
</svg>`);

const type = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="72" y="404" fill="#F6EFE4" font-family="Georgia, 'Times New Roman', serif"
        font-size="78" font-weight="600" letter-spacing="-2">A proper pint,</text>
  <text x="72" y="482" fill="#F6EFE4" font-family="Georgia, 'Times New Roman', serif"
        font-size="78" font-weight="600" letter-spacing="-2">forty steps off the Stradun.</text>
  <text x="72" y="546" fill="#F6EFE4" fill-opacity=".62"
        font-family="ui-monospace, 'SF Mono', Menlo, monospace"
        font-size="21" letter-spacing="4">THE OLDEST IRISH PUB IN DUBROVNIK</text>
</svg>`);

// Isti pravi logo kao Logo.tsx (public/img/karaka-logo.webp).
const crest = await sharp(path.join(process.cwd(), 'public', 'img', 'karaka-logo.webp'))
  .resize(null, 130)
  .toBuffer();

await sharp(photo)
  .composite([
    { input: scrim },
    { input: type },
    { input: crest, top: 46, left: 72 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

const { size } = await sharp(OUT).metadata();
console.log(`  ✓ public/og.jpg  ${W}×${H}  ${Math.round((size ?? 0) / 1024)} kB`);
