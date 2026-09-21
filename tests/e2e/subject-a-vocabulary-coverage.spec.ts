import { expect, test } from '@playwright/test';

test('科目Aの用語補強セット6を20問で開ける', async ({ page }) => {
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=6');

  await expect(page.getByText('基本問題 · セット6')).toBeVisible();
  await expect(page.getByText('基本問題 · 20問')).toBeVisible();
  await expect(page.getByRole('link', { name: 'セット6・用語補強（20問）' })).toHaveAttribute('aria-current', 'page');

  const pageText = await page.locator('main').innerText();
  expect(pageText).toMatch(/ベイズの定理|標準偏差|SRAM|CSMA|SNMP|NTP|CVE|SLCP|サービスデスク|中小受託取引適正化法|JIS/);
});
