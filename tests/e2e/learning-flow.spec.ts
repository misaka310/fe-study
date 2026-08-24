import { expect, test, type Page } from '@playwright/test';

function rejectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`http ${response.status()}: ${response.url()}`); });
  return () => expect(errors, errors.join('\n')).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('トップから教材と公式資料へ移動できる', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=materials&material=05-algorithms');
  await expect(page.getByRole('heading', { name: /データ構造とアルゴリズム/ })).toBeVisible();
  await expect(page.getByRole('link', { name: '基本情報技術者試験 シラバス Ver.9.2' })).toHaveAttribute('target', '_blank');
  await expect(page.getByRole('link', { name: 'この章の問題を解く' })).toHaveAttribute('href', /view=practice/);
  assertNoErrors();
});

test('図解ギャラリーを開き教材内の関連画像を拡大できる', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '図解でつかむFEの全体像' })).toBeVisible();
  await expect(page.getByRole('figure', { name: /合格までの全体像/ }).getByRole('img')).toBeVisible();
  await page.getByRole('button', { name: 'アルゴリズムと擬似言語を拡大表示' }).click();
  await expect(page.getByRole('dialog', { name: 'アルゴリズムと擬似言語の拡大画像' })).toBeVisible();
  await page.getByRole('button', { name: '画像を閉じる' }).click();
  await page.goto('/?view=materials&material=08-security');
  await expect(page.getByRole('heading', { name: '情報セキュリティ' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '図解でつかむFEの全体像' })).toBeVisible();
  assertNoErrors();
});

test('各主要ページに学習画像が表示される', async ({ page }) => {
  for (const url of ['/?view=materials', '/?view=practice&mode=all', '/?view=exams', '/?view=dashboard']) {
    await page.goto(url);
    await expect(page.locator('.page-visual img')).toBeVisible();
  }
});

test('問題回答を保存して誤答復習と学習記録へ反映する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=practice&mode=all');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();
  await expect(page.getByRole('heading', { name: '不正解' })).toBeVisible();
  await expect(page.getByTestId('choice-reason')).toHaveCount(4);
  await page.goto('/?view=practice&mode=wrong');
  await expect(page.getByText(/誤答復習 · 1問/)).toBeVisible();
  await page.goto('/?view=dashboard');
  await expect(page.getByText(/1 \/ \d+問に回答/)).toBeVisible();
  assertNoErrors();
});

test('科目A模試を開始し再読込み後も順序と位置を復元する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=exams');
  await page.getByRole('button', { name: '科目A模試を開始' }).click();
  await expect(page.getByText('1 / 60')).toBeVisible();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '次へ' }).click();
  await expect(page.getByText('2 / 60')).toBeVisible();
  await page.reload();
  await expect(page.getByText('2 / 60')).toBeVisible();
  await expect(page.getByText('残り時間')).toBeVisible();
  assertNoErrors();
});
