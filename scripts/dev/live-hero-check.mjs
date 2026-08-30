/**
 * Provjera živog heroja kroz svih pet stanja dana.
 *
 * Sat se lažira tako da se u stranicu ubaci override Date-a PRIJE nego se
 * učita bilo koji skript (addInitScript), pa openState() vidi lažni sat.
 * Traži: npm i -D playwright && dev server na 3400.
 */
import { webkit } from 'playwright';

const CASES = [
  { hour: 10, expect: 'morning' },
  { hour: 14, expect: 'afternoon' },
  { hour: 19, expect: 'evening' },
  { hour: 23, expect: 'night' },
  { hour: 5, expect: 'closed' },
];

const browser = await webkit.launch();
const out = [];

for (const c of CASES) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    timezoneId: 'Europe/Zagreb',
  });
  // fiksiraj sat u Zagrebu na traženi sat
  await ctx.addInitScript(`{
    const fake = new Date();
    fake.setHours(${c.hour}, 30, 0, 0);
    const RealDate = Date;
    class FakeDate extends RealDate {
      constructor(...a) { return a.length ? new RealDate(...a) : new RealDate(fake); }
      static now() { return fake.getTime(); }
    }
    globalThis.Date = FakeDate;
  }`);

  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('http://localhost:3400', { waitUntil: 'load' });
  await page.waitForTimeout(2200);

  const got = await page.evaluate(() => {
    const chip = document.querySelector('#top .label')?.textContent?.trim();
    const line = document.querySelector('#top h1 + p, #top p.prose-lead')?.textContent?.trim();
    const imgs = [...document.querySelectorAll('#top img')].map((i) =>
      new URL(i.currentSrc || i.src, location.href).searchParams.get('url'),
    );
    const dot = document.querySelector('#top span[class*="rounded-full"]');
    return { chip, line, imgs, dotColor: dot ? getComputedStyle(dot).backgroundColor : null };
  });

  out.push({ hour: c.hour, expect: c.expect, ...got, errors });
  await page.screenshot({ path: `/Users/grbaa/.playwright-mcp/live-${c.expect}.jpeg`, quality: 80, type: 'jpeg' });
  await ctx.close();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
