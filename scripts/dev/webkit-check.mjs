/**
 * Mobilni test u PRAVOM WebKitu — Chrome mobile emulacija propušta bugove
 * koji ovise o engineu (npr. clip-path/mask ili timing GSAP tweenova).
 * Pokreni uz upaljen dev server: node scripts/dev/webkit-check.mjs
 */
import { webkit, devices } from 'playwright';

const URL = 'http://localhost:3400';
const browser = await webkit.launch();
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();

const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

await page.goto(URL, { waitUntil: 'load' });
await page.waitForTimeout(3000);

// mobile WebKit nema mouse.wheel — scroll ide kroz evaluate
const H = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y <= H; y += 400) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(70);
}
await page.waitForTimeout(1500);

// Nevidljiv sadržaj: broji SAMO ono što je stvarno u viewportu — sve ispod
// legitimno još nije prešlo svoj scroll trigger i daje lažne pozitivce.
const report = await page.evaluate(() => {
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.65 && r.bottom > 0 && r.width > 0;
  };
  const invisible = [...document.querySelectorAll('[data-fade], .reveal-line > span, h1, h2, p, li')]
    .filter(inView)
    .filter((el) => {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return true;
      if (parseFloat(cs.opacity) < 0.05) return true;
      return false;
    })
    .map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 40)}: "${(el.textContent || '').slice(0, 40)}"`);

  return {
    scrollY: window.scrollY,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    invisible,
    bg: getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(),
    fg: getComputedStyle(document.documentElement).getPropertyValue('--fg').trim(),
    floatingCta: (() => {
      const el = document.querySelector('a[aria-label*="Get directions"]');
      return el ? getComputedStyle(el).opacity : 'nema';
    })(),
  };
});

// vrati se na vrh i provjeri hero
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1400);
const hero = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const span = h1.querySelector('.hero-line > span');
  return {
    h1Transform: getComputedStyle(span).transform,
    h1Opacity: getComputedStyle(h1).opacity,
    heroImgs: document.querySelectorAll('#top img').length,
  };
});

await page.screenshot({ path: '/Users/grbaa/.playwright-mcp/webkit-hero.png' });

console.log(JSON.stringify({ errors, report, hero }, null, 2));
await browser.close();
