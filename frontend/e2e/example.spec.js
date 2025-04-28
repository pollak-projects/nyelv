// @ts-check
import { test, expect } from "@playwright/test";

test("shows error message for invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Fill in invalid credentials and submit the form.
  await page.fill("input#username", "invalidUser");
  await page.fill("input#password", "wrongPassword");
  await page.click("button#login-button");

  // Expect an alert with the error message to be visible.
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toContain(/Hibás [a-z]*/);
    await dialog.dismiss();
  });
});

test("redirects to dashboard on successful login", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  // Fill in valid credentials and submit the form.
  await page.fill("input#username", "Zete");
  await page.fill("input#password", "Zete12345");
  await page.click("button#login-button");

  // Expect to be redirected to the dashboard.
  await expect(page).toHaveURL("http://localhost:5173/main");
});
