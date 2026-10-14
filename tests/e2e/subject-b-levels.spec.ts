import { expect, test } from '@playwright/test';

test('科目Bを基礎から本番レベルへ進め、模試は本番レベル16問＋4問で構成する', async ({ page }) => {
  await page.goto('/?view=practice&mode=all&subject=B&tier=foundation');

  await expect(page.getByText('科目B・基礎 · 全問題')).toBeVisible();
  await expect(page.getByText('科目B・基礎の全問題：100問')).toBeVisible();
  await expect(page.getByRole('link', { name: '基礎（100問）' })).toHaveAttribute('aria-current', 'page');

  await page.getByRole('link', { name: '本番レベル（40問）' }).click();
  await expect(page).toHaveURL(/view=practice&mode=all&subject=B&tier=exam/);
  await expect(page.getByText('科目B・本番レベル · 全問題')).toBeVisible();
  await expect(page.getByText('科目B・本番レベルの全問題：40問')).toBeVisible();
  await expect(page.getByRole('link', { name: '本番レベル（40問）' })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.practice-meta-row').getByText('本番レベル', { exact: true })).toBeVisible();

  await page.goto('/?view=exams');
  await expect(page.getByText('本番レベル問題からアルゴリズム16問・セキュリティ4問を出題します。')).toBeVisible();
  await page.getByRole('button', { name: '科目B模試を開始' }).click();
  await expect(page.getByText('1 / 20')).toBeVisible();

  const questionIds = await page.evaluate(() => {
    const raw = localStorage.getItem('fe-study-learning-state-v1');
    if (!raw) return [];
    return JSON.parse(raw).activeExam?.questionIds ?? [];
  });

  expect(questionIds).toHaveLength(20);
  expect(questionIds.filter((id: string) => id.startsWith('b-exam-algorithm-'))).toHaveLength(16);
  expect(questionIds.filter((id: string) => id.startsWith('b-exam-security-'))).toHaveLength(4);
  expect(questionIds.every((id: string) => id.startsWith('b-exam-'))).toBe(true);
});
