import { test, expect } from "@playwright/test";

test("should have title", async ({ page }) => {
  // given:
  await page.goto("https://playwright.dev/");

  // when/then:
  await expect(page).toHaveTitle(/Playwright/);
});

test("should have 'get started' link", async ({ page }) => {
  // given:
  await page.goto("https://playwright.dev/");

  // when:
  await page.getByRole("link", { name: "Get started" }).click();

  // then:
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("should have page", async ({ page }) => {
  // given:
  await page.goto("https://playwright.dev/");

  // when/then:
  await expect(page).toHaveScreenshot();
});
