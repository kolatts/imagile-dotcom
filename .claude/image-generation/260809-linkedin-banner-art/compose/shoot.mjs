import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// [file, outfile, cssWidth, cssHeight, scale]
const jobs = JSON.parse(process.argv[2]);

const browser = await chromium.launch();
for (const [file, out, w, h, scale] of jobs) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: scale,
  });
  await page.goto('file:///' + path.join(here, file).replace(/\\/g, '/'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.locator('#shot').screenshot({ path: path.join(here, out) });
  console.log('wrote', out, `${w * scale}x${h * scale}`);
  await page.close();
}
await browser.close();
