import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Configuration - modify these values as needed
const CONFIG = {
  baseUrl: process.env.TEST_URL || "http://localhost:3000",
  viewports: {
    desktop: { width: 1280, height: 800 },
    mobile: { width: 375, height: 667 },
  },
  waitForNetworkIdle: true,
  stabilizationTime: 300,
  maxDiffPixelRatio: 0.01,
  fullPage: true,
};

/**
 * Helper function to create a clean filename from a URL path
 */
function pathToFilename(urlPath: string): string {
  return (
    urlPath
      .replace(/^\//, "") // Remove leading slash
      .replace(/\/$/, "") // Remove trailing slash
      .replace(/\//g, "-") // Replace slashes with hyphens
      .replace(/[^a-zA-Z0-9-]/g, "_") || // Replace special chars
    "home"
  ); // Default for root path
}

const loadPaths = (): string[] => {
  const pathsFile = path.join(process.cwd(), "tests", "paths.json");
  const pathsData = JSON.parse(fs.readFileSync(pathsFile, "utf8"));
  if (!Array.isArray(pathsData)) {
    throw Error(`Invalid paths data in ${pathsFile}`);
  }
  return pathsData;
};

Object.entries(CONFIG.viewports).forEach(([deviceName, viewport]) => {
  const paths = loadPaths();

  test.describe(`${deviceName} viewport tests`, () => {
    // Set the viewport for all tests in this group
    test.use({ viewport });

    // Test each path
    paths.forEach((path) => {
      const url = new URL(path, CONFIG.baseUrl).toString();
      const name = pathToFilename(path);

      test(`URL: ${url}`, async ({ page }) => {
        console.log(`Testing ${deviceName} view of ${url}`);

        // Navigate to the URL
        await page.goto(url);

        // Wait for network to be idle if configured
        if (CONFIG.waitForNetworkIdle) {
          await page.waitForLoadState("networkidle");
        }

        // Additional wait time for any animations
        if (CONFIG.stabilizationTime > 0) {
          await page.waitForTimeout(CONFIG.stabilizationTime);
        }

        // Take screenshot and compare to baseline
        await expect(page).toHaveScreenshot(`${name}-${deviceName}.png`, {
          fullPage: CONFIG.fullPage,
          maxDiffPixelRatio: CONFIG.maxDiffPixelRatio,
        });
      });
    });
  });
});
