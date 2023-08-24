import { test, expect } from "@playwright/test";

test("ページにアクセスして入力した文字を母音に変換する", async ({ page }) => {
  await page.goto("https://vowel-craft.vercel.app/");

  await expect(page).toHaveTitle(/Vowel Craft/);

  await page.locator('[placeholder="母音に変換したい文字"]').click();
  await page
    .locator('[placeholder="母音に変換したい文字"]')
    .fill("国語算数理科社会");

  await page.locator('.hope-button:has-text("母音に変換する")').last().click();

  if (
    (await page
      .locator('[placeholder="おいんい えんあんいあい おい"]')
      .inputValue()) === ""
  ) {
    await expect(page.locator(".hope-notification__title").first()).toHaveText(
      "変換に失敗しました。もう一度実行してください。"
    );
  } else {
    await expect(
      await page
        .locator('[placeholder="おいんい えんあんいあい おい"]')
        .inputValue()
    ).toEqual("おうおあんうう いあああい");
  }
});
