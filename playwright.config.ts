import { defineConfig, devices } from "@playwright/test";

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,

  testDir: "./tests",
  outputDir: "./.playwright/tests-results",
  reporter: [
    ["list"],
    ["json", { outputFile: "./.playwright/tests-results.json" }],
  ],

  projects: [
    {
      name: "safari",
      use: {
        ...devices["Desktop Safari"],
        deviceScaleFactor: 2,
      },
    },
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: 2,
      },
      testIgnore: "**/*",
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        deviceScaleFactor: 2,
      },
      testIgnore: "**/*",
    },
  ],

  timeout: 30000, // 30 seconds timeout for each test.
  expect: {
    timeout: 5000, // 5 seconds timeout for each expect.
    toHaveScreenshot: {
      maxDiffPixels: 10,
      scale: "device",
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.1,
    },
  },
});
