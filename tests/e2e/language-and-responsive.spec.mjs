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
test("accessibility controls switch theme and text size", async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/");

  const themeButton = page.locator("[data-action='theme']");
  const decreaseButton = page.locator("[data-action='font-decrease']");
  const increaseButton = page.locator("[data-action='font-increase']");

  await expect(themeButton.locator(".icon")).toHaveCount(2);
  await expect(decreaseButton.locator(".icon")).toBeVisible();
  await expect(increaseButton.locator(".icon")).toBeVisible();
  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await themeButton.click();
  const toggledTheme = initialTheme === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", toggledTheme);
  await expect(themeButton).toHaveAttribute("aria-pressed", String(toggledTheme === "light"));

  await increaseButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-font-scale", "large");
  await expect(increaseButton).toBeEnabled();
  const largeTextSize = await page.locator(".hero-text").evaluate((element) => getComputedStyle(element).fontSize);

  await decreaseButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-font-scale", "normal");
  await expect(decreaseButton).toBeEnabled();
  await expect(page.locator(".hero-text")).not.toHaveCSS("font-size", largeTextSize);
});
