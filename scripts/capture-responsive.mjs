import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = path.resolve("responsive-audit");

const targets = [
  { name: "320x568", width: 320, height: 568, deviceScaleFactor: 2 },
  { name: "390x844", width: 390, height: 844, deviceScaleFactor: 3 },
  { name: "768x1024", width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: "1440x900", width: 1440, height: 900, deviceScaleFactor: 1 },
];

const routes = [
  { path: "/", label: "home" },
  { path: "/about", label: "about" },
  { path: "/about#experience", label: "about-experience" },
];

const zoomLevels = [1, 1.25, 1.5];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const target of targets) {
  const context = await browser.newContext({
    viewport: { width: target.width, height: target.height },
    deviceScaleFactor: target.deviceScaleFactor,
  });

  for (const route of routes) {
    const page = await context.newPage();

    for (const zoom of zoomLevels) {
      if (target.width > 480 && zoom > 1) continue;

      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1200);
      await page.evaluate((z) => {
        document.documentElement.style.zoom = String(z);
      }, zoom);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      }));

      const file = `${route.label}--${target.name}--zoom-${Math.round(zoom * 100)}.png`;
      await page.screenshot({
        path: path.join(outDir, file),
        fullPage: route.path.includes("#"),
      });

      console.log(
        JSON.stringify({
          file,
          overflow,
          route: route.path,
          viewport: target.name,
          zoom,
        }),
      );
    }

    await page.close();
  }

  await context.close();
}

await browser.close();
