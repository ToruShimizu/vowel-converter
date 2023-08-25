import { test, expect } from "@playwright/test";

test("ページにアクセスして入力した文字を母音に変換する", async ({ page }) => {
  await page.goto("https://vowel-craft.vercel.app/");

  await expect(page).toHaveTitle(/Vowel Craft/);

  await page.getByPlaceholder("母音に変換したい文字").fill("国語算数理科社会");
  await page.getByRole("button", { name: "変換する" }).click();

  if (
    (await page
      .getByPlaceholder("母音に変換された文字が表示されます")
      .inputValue()) === ""
  ) {
    await expect(
      page.getByText("変換に失敗しました。もう一度実行してください。")
    ).toBeVisible();
  } else {
    await expect(
      await page
        .getByPlaceholder("母音に変換された文字が表示されます")
        .inputValue()
    ).toEqual("おうおあんうう いあああい");
  }
});
