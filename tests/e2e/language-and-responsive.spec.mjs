import { test, expect } from "@playwright/test";

test("language switch changes content and restores Portuguese", async ({ page }) => {
  await page.goto("/");
  const languageButton = page.locator(".language-switch");

  await languageButton.click();
  await expect(page).toHaveTitle("Deivid Afonso | Backend Engineer .NET C# AWS — São Paulo, Brazil");
  await expect(page.locator("h1")).toContainText("Backend systems that");
  await expect(page.locator(".site-nav").getByRole("link", { name: "About", exact: true })).toBeVisible();

  await languageButton.click();
  await expect(page).toHaveTitle("Deivid Afonso | Engenheiro Backend .NET C# AWS — São Paulo, SP");
  await expect(page.locator("h1")).toContainText("Sistemas backend que");
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
test("accessibility controls switch theme and text size", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/");

  const themeToggle = page.locator("#theme-toggle");
  const fontDown = page.locator("#font-down");
  const fontUp = page.locator("#font-up");

  await expect(themeToggle).toBeVisible();
  await expect(fontDown).toBeVisible();
  await expect(fontUp).toBeVisible();

  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await themeToggle.click();
  const toggledTheme = initialTheme === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", toggledTheme);

  await fontUp.click();
  await expect(page.locator("html")).toHaveAttribute("data-font-scale", "large");
  await expect(fontUp).toBeEnabled();
  const largeTextSize = await page.locator(".hero-text").evaluate((el) => getComputedStyle(el).fontSize);

  await fontDown.click();
  await expect(page.locator("html")).toHaveAttribute("data-font-scale", "normal");
  await expect(fontDown).toBeEnabled();
  await expect(page.locator(".hero-text")).not.toHaveCSS("font-size", largeTextSize);
});
