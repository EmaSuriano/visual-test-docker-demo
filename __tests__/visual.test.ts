// __tests__/visual.test.ts
import { Page } from "puppeteer";

declare const page: Page;

describe("Visual regression tests", () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 });
  });

  it("homepage should match snapshot", async () => {
    // Connect to your local development server instead of an external URL
    await page.goto("http://localhost:3000");

    // Wait for React to render content
    await page.waitForSelector("#root", { visible: true });

    // Optional: Wait for any animations to complete
    await page.waitForTimeout(500);

    // Take a screenshot and compare it with the baseline
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: "homepage",
    });
  });
});
