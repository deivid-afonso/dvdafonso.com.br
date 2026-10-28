import { test, expect } from "@playwright/test";

test("contact form validates required data and preserves contact options", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const form = page.locator("#contact-form");
  await form.locator("button[type='submit']").click();
  await expect(form.locator("input[name='name']")).toBeFocused();

  await form.locator("input[name='name']").fill("Visitante QA");
  await form.locator("input[name='email']").fill("qa@example.com");
  await form.locator("textarea[name='message']").fill("Mensagem de teste do fluxo de contato.");
  await expect(form).toHaveAttribute("action", "contact.php");
  await expect(page.locator('a[href^="https://wa.me/"]')).toHaveAttribute("href", /text=/);
  await expect(page.locator('a[href^="tel:"]')).toHaveAttribute("href", "tel:+5511932333534");
});

test("SEO metadata and structured profile are exposed", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://dvdafonso.com.br/");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Engenheiro Fullstack/);
  const structuredProfile = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(structuredProfile).toContain("Deivid Afonso");
  expect(structuredProfile).toContain("https://github.com/deivid-afonso");
});
