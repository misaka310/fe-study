import { expect, test } from '@playwright/test';

test('科目Aの用語補強セット6を20問で開ける', async ({ page }) => {
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=6');

  await expect(page.getByText('基本問題 · セット6')).toBeVisible();
  await expect(page.getByText('基本問題 · 20問')).toBeVisible();
  await expect(page.getByRole('link', { name: 'セット6・用語補強（20問）' })).toHaveAttribute('aria-current', 'page');

  const pageText = await page.locator('main').innerText();
  expect(pageText).toMatch(/ベイズの定理|標準偏差|SRAM|CSMA|SNMP|NTP|CVE|SLCP|サービスデスク|中小受託取引適正化法|JIS/);
});

test('科目Aの実戦用語補強セット7を20問で開ける', async ({ page }) => {
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=7');

  await expect(page.getByText('基本問題 · セット7')).toBeVisible();
  await expect(page.getByText('基本問題 · 20問')).toBeVisible();
  await expect(page.getByRole('link', { name: 'セット7・実戦用語補強（20問）' })).toHaveAttribute('aria-current', 'page');

  const pageText = await page.locator('main').innerText();
  expect(pageText).toMatch(/遷移確率|PID制御|クラウドサービスモデル|多相性|スラッシング|E-Rモデル|無線LAN用語|HTTPS|CSIRT|暗号の危殆化|ローコード開発|プロダクトオーナ|バーンダウンチャート|期間短縮手法|オムニチャネル|販売データ分析|生成AI利用|発想法|著作者人格権|カーボンフットプリント/);
});
