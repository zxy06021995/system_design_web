import { expect, test } from "@playwright/test";

test("home page loads and shows title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "系统设计面试题库" })).toBeVisible();
});

test("question page loads and renders markdown heading", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/question/1"]').first().click();
  await expect(page).toHaveURL(/\/question\/1$/);
  await expect(page.getByRole("button", { name: "返回列表" })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("加载中...")).toHaveCount(0, { timeout: 20_000 });
  await expect(page.getByText("暂无详细内容")).toHaveCount(0);
});
