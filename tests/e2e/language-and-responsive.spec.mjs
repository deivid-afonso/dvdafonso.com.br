import { test, expect } from "@playwright/test";

test("language switch changes content and restores Portuguese", async ({ page }) => {
  await page.goto("/");
  const languageButton = page.locator(".language-switch");

  await languageButton.click();
  await expect(page).toHaveTitle("Deivid Afonso | Technology, projects and ideas");
  await expect(page.locator("h1")).toContainText("Technology, projects and ideas");
  await expect(page.locator(".site-nav").getByRole("link", { name: "About", exact: true })).toBeVisible();

  await languageButton.click();
  await expect(page).toHaveTitle("Deivid Afonso | Tecnologia, projetos e ideias");
  await expect(page.locator("h1")).toContainText("Tecnologia, projetos e ideias");
});

test("mobile navigation opens and exposes the contact route", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuToggle = page.locator(".menu-toggle");
  await expect(menuToggle).toBeVisible();
  await menuToggle.click();
  await expect(page.locator(".site-nav")).toHaveClass(/is-open/);

  await page.getByRole("link", { name: "Contato" }).click();
  await expect(page.locator("#contato")).toBeInViewport();
});

test("accessibility controls switch theme, contrast and text size", async ({ page }) => {
  await page.goto("/");

  const themeButton = page.locator("[data-action='theme']");
  const contrastButton = page.locator("[data-action='contrast']");
  const fontButton = page.locator("[data-action='font']");

  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(themeButton).toHaveAttribute("aria-pressed", "true");

  await contrastButton.click();
  await expect(page.locator("html")).toHaveClass(/high-contrast/);
  await expect(contrastButton).toHaveAttribute("aria-pressed", "true");

  await fontButton.click();
  await expect(page.locator("html")).toHaveClass(/large-text/);
  await expect(fontButton).toHaveAttribute("aria-pressed", "true");
});
