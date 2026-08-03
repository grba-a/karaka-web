/**
 * Karaka — asset pipeline.
 *
 * Klijentove fotke stižu s WhatsAppa (1066×1600, besmislena imena). Ovaj skript ih
 * preimenuje u semantička imena i izbaci webp u dvije širine za srcset.
 *
 *   npm run images
 *
 * MAP je jedini dio koji se dira kad stignu nove/bolje fotke.
 */
import sharp from 'sharp';
import { mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SRC = '/Users/grbaa/Desktop/Karaka slike';
const OUT = path.join(process.cwd(), 'public', 'img');
const VIDEO_OUT = path.join(process.cwd(), 'public', 'video');

/** index u sortiranoj listi *.jpeg  →  semantičko ime */
const MAP = {
  19: 'hero-lantern',        // viseća lampionska tabla na vapnencu — hero
  7: 'alley-crowd',          // uličica Između polača, gužva, tabla
  11: 'alley-door',          // kameni luk s ulazom, gosti vani
  35: 'alley-couple',        // par s pivom pod kamenim lukom
  8: 'tap-harp',             // Guinness harfa, osvijetljena u mraku
  16: 'tap-carlsberg',       // Carlsberg točionici
  1: 'tap-pints',            // dvije zlatne krigle
  4: 'tap-clink',            // nazdravljanje Guinnessima nad grbom
  17: 'bar-counter',         // šank, gosti, Guinness
  0: 'bar-arch',             // zeleni luk + zlatni K monogram
  24: 'bar-bottles',         // zid s bocama
  3: 'bar-spirits',          // Chivas polica, topla svjetla
  15: 'board-neon',          // zelena neonska ploča točionika na cigli
  27: 'board-neon-guests',   // ista ploča, gosti za stolom
  31: 'crest-saint-james',   // grb Saint James est. 1967 — frontalno
  10: 'crest-lynchs',        // Lynch's Irish Pub, Jax Beach 1994
  5: 'crest-obriens',        // O'Brien's Irish Pub
  2: 'crest-inn',            // The Inn Pub, Kerrville TX
  14: 'crest-booth',         // grb sa žutim baršunastim separeom
  6: 'sport-wall',           // zid ragbi fotografija + stol
  20: 'sport-anfield',       // Anfield Road tabla + hurling štap
  21: 'sign-carved',         // izrezbarena Karaka tabla
  33: 'sign-carved-detail',
  13: 'booth-yellow',        // žuti separe, Sláinte slika
  38: 'slainte',             // Sláinte oslikani portret
  22: 'leprechaun',
  18: 'drink-martini',
  29: 'drink-hand',          // koktel u ruci, kameni zid
  32: 'drink-skull',         // Don Julio lubanja
  34: 'interior-dark',
  30: 'guests-lamp',
};

const files = readdirSync(SRC)
  .filter((f) => f.toLowerCase().endsWith('.jpeg'))
  .sort();

mkdirSync(OUT, { recursive: true });
mkdirSync(VIDEO_OUT, { recursive: true });

let n = 0;
for (const [idx, name] of Object.entries(MAP)) {
  const src = files[Number(idx)];
  if (!src) {
    console.warn(`  ⚠ index ${idx} (${name}) ne postoji u ${SRC}`);
    continue;
  }
  const input = path.join(SRC, src);
  const meta = await sharp(input).metadata();

  // Jedan izvor po imenu, u punoj rezoluciji. next/image sam radi
  // srcset i resize — vlastite širine bi ovdje samo bile mrtvi bajtovi
  // (izvori su 1066px pa se ionako ne smiju uvećavati).
  await sharp(input)
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`));

  console.log(`  ✓ ${name}  ${meta.width}×${meta.height}`);
  n++;
}

// Videa su već H.264/AAC iz WhatsAppa — nema HEVC zamke, samo ih kopiramo.
const vids = readdirSync(SRC).filter((f) => f.toLowerCase().endsWith('.mp4')).sort();
['ambience-1', 'ambience-2', 'ambience-3'].forEach((name, i) => {
  if (!vids[i]) return;
  const dest = path.join(VIDEO_OUT, `${name}.mp4`);
  if (!existsSync(dest)) copyFileSync(path.join(SRC, vids[i]), dest);
  console.log(`  ✓ ${name}.mp4`);
});

console.log(`\n${n} slika → ${OUT}`);
