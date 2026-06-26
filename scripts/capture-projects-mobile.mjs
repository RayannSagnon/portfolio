import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3000/#projects", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1800);
await page.locator("#projects").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: path.resolve("responsive-audit/projects-390x844.png") });
await browser.close();
