import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("responsive-audit");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { w: 390, h: 844, name: "390x844" },
  { w: 320, h: 568, name: "320x568" },
]) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto("http://localhost:3000/#about-teaser", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(1500);
  await page.locator("#about-teaser").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, `about-teaser-${vp.name}.png`) });

  const metrics = await page.evaluate(() => {
    const section = document.querySelector("#about-teaser");
    const tiles = [...document.querySelectorAll(".about-teaser-tile")];
    const grid = document.querySelector(".about-teaser-grid");
    return {
      sectionHeight: section?.getBoundingClientRect().height,
      tileCount: tiles.length,
      tileHeights: tiles.slice(0, 4).map((t) => Math.round(t.getBoundingClientRect().height)),
      cols: grid ? getComputedStyle(grid).gridTemplateColumns : null,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    };
  });
  console.log(vp.name, JSON.stringify(metrics));
  await page.close();
}

await browser.close();
