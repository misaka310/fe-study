import { expect, test, type Page } from '@playwright/test';

function rejectBrowserErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`http ${response.status()}: ${response.url()}`); });
  return () => expect(errors, errors.join('\n')).toEqual([]);
}

test('基本問題の20問セットを途中で再読込みしても未回答の続きから再開する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=2');
  await expect(page.getByText('基本問題 · セット2')).toBeVisible();
  await expect(page.getByText('基本問題 · 20問')).toBeVisible();

  const questionHeading = page.locator('.practice-question-card h2');
  const stemBeforeAnswer = await questionHeading.innerText();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();
  await expect(page.getByText(/^(正解|不正解)$/)).toBeVisible();
  await expect(questionHeading).toHaveText(stemBeforeAnswer);

  await page.reload();
  await expect(page.getByText('2 / 20')).toBeVisible();
  await expect(questionHeading).not.toHaveText(stemBeforeAnswer);
  await expect(page.getByText('保存済みの学習履歴を読み取れなかったため、新しい状態で開始しました。')).toHaveCount(0);
  assertNoErrors();
});
