import { expect, test } from '@playwright/test';

test('モバイル幅で主要導線と解答操作が横にはみ出さない', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '基本情報技術者 合格ナビ' })).toBeVisible();
  await page.getByRole('link', { name: '問題演習' }).click();
  await expect(page.getByRole('heading', { name: '問題演習' })).toBeVisible();
  await page.getByRole('radio').first().check();
  await expect(page.getByRole('button', { name: '解答する' })).toBeEnabled();
  const sizes = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
  expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
});
