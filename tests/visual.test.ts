// tests/visual.test.ts
import puppeteer, { Browser, Page } from "puppeteer";

describe("Visual Tests", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Homepage screenshot", async () => {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("http://localhost:3000");

    // Wait for app to render
    await page.waitForSelector("#root");

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
