import { test, expect } from "@playwright/test";

test("homepage presents the professional profile and core navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Deivid Afonso | Engenheiro Fullstack .NET C# AWS — São Paulo, SP");
  await expect(page.locator("h1")).toContainText("Sistemas backend que");
  await expect(page.locator("body")).toContainText("Engenheiro Fullstack");
  await expect(page.locator("body")).toContainText("Basis Tecnologia");

  await page.getByRole("link", { name: "Projetos" }).click();
  await expect(page.locator("#projetos")).toBeInViewport();
  await expect(page.locator("#projetos .project-card")).toHaveCount(3);

  await page.getByRole("link", { name: "Notas" }).click();
  await expect(page.locator("#notas")).toBeInViewport();
  await expect(page.locator("#notas .note-card")).toHaveCount(3);
});
