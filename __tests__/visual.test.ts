// __tests__/visual.test.ts
import { Page } from "puppeteer";

declare const page: Page;

describe("Visual regression tests", () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
  });

  it("homepage should match snapshot", async () => {
    await page.goto("https://your-website.com");

    // Wait for any dynamic content to load
    await page.waitForSelector("#main-content");

    // Take a screenshot and compare it with the baseline
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: "__image_snapshots__",
      customSnapshotIdentifier: "homepage",
    });
  });

  it("about page should match snapshot", async () => {
    await page.goto("https://your-website.com/about");
    await page.waitForSelector("#about-content");

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: "__image_snapshots__",
      customSnapshotIdentifier: "about-page",
    });
  });
});
