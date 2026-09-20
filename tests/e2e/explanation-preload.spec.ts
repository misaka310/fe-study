import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('次へで次問のWebP解説画像を先読みし、回答直後の解説で表示できる', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`); });
  page.on('pageerror', (error) => browserErrors.push(`page: ${error.message}`));
  page.on('response', (response) => { if (response.status() >= 400) browserErrors.push(`http ${response.status()}: ${response.url()}`); });

  await page.goto('/?view=practice&mode=all&subject=B&tier=foundation&domain=algorithm');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();

  const preloadRequest = page.waitForRequest((request) => /\/images\/explanations\/b-algorithm-\d{3}\.webp$/.test(request.url()));
  await page.getByRole('button', { name: '次へ' }).click();
  const request = await preloadRequest;
  expect(request.url()).toMatch(/\/images\/explanations\/b-algorithm-\d{3}\.webp$/);

  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();

  const image = page.locator('.practice-explanation-visual img');
  await expect(image).toBeVisible();
  const src = await image.getAttribute('src');
  expect(src).toMatch(/^\/images\/explanations\/b-algorithm-\d{3}\.webp$/);

  const response = await page.request.get(src!);
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/webp');
  expect(browserErrors, browserErrors.join('\n')).toEqual([]);
});
