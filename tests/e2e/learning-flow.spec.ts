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

test('教材左ペインで章を切り替えるとURLを更新してページ上部へ戻る', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=materials&material=05-algorithms');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300);

  await page.getByRole('navigation', { name: '教材一覧' }).getByRole('link', { name: '06 データベース' }).click();

  await expect(page).toHaveURL(/view=materials&material=06-database/);
  await expect(page.getByRole('heading', { name: '06 データベース' })).toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(80);
  assertNoErrors();
});

test('教材一覧URLへ戻ると先頭章へ復元する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=materials');
  await expect(page.getByRole('heading', { name: '01 合格ロードマップ' })).toBeVisible();

  await page.getByRole('navigation', { name: '教材一覧' }).getByRole('link', { name: '02 基礎理論・情報表現' }).click();
  await expect(page).toHaveURL(/view=materials&material=02-theory/);
  await expect(page.getByRole('heading', { name: '02 基礎理論・情報表現' })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\?view=materials$/);
  await expect(page.getByRole('heading', { name: '01 合格ロードマップ' })).toBeVisible();
  assertNoErrors();
});

test('説明図ギャラリーを開き教材内の関連画像を拡大できる', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '図解画像一覧' })).toBeVisible();
  await expect(page.locator('.visual-section').getByRole('figure', { name: /DNSとTTLのしくみ/ }).getByRole('img')).toBeVisible();
  await page.getByRole('button', { name: 'DNSとTTLのしくみを拡大表示' }).click();
  await expect(page.getByRole('dialog', { name: 'DNSとTTLのしくみの拡大画像' })).toBeVisible();
  await page.getByRole('button', { name: '画像を閉じる' }).click();
  await page.goto('/?view=materials&material=08-security');
  await expect(page.getByRole('heading', { name: '情報セキュリティ' })).toBeVisible();
  await expect(page.locator('.markdown-visual img')).toHaveCount(1);
  await expect(page.locator('.markdown-visual button')).toHaveCount(0);
  await page.locator('.markdown-visual img').first().click();
  await expect(page.locator('.visual-lightbox')).toHaveCount(0);
  assertNoErrors();
});

test('ネットワーク教材でTTLの略語と意味を確認できる', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=materials&material=07-network');
  await page.getByRole('button', { name: 'TTL 用語解説' }).click();
  await expect(page.getByRole('dialog')).toContainText('Time To Live');
  await expect(page.getByRole('dialog')).toContainText('キャッシュの有効期間');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  assertNoErrors();
});

test('共通目的ナビから主要画面へ移動でき、教材本文の途中に図が表示される', async ({ page }) => {
  await page.goto('/?view=materials&material=07-network');
  await expect(page.getByRole('navigation', { name: '主な機能' })).toBeVisible();
  await expect(page.locator('.markdown-visual img')).toHaveCount(3);
  for (const link of ['問題演習', '弱点補強', '模試', '学習記録']) {
    await expect(page.getByRole('link', { name: link }).first()).toHaveAttribute('href', /view=/);
  }
});

test('問題回答を保存して誤答復習と学習記録へ反映する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=practice&mode=all');
  let sawWrong = false;
  let answeredCount = 0;
  for (let attempt = 0; attempt < 20 && !sawWrong; attempt += 1) {
    await page.getByRole('radio').first().check();
    await page.getByRole('button', { name: '解答する' }).click();
    answeredCount += 1;
    await expect(page.getByText(/^(正解|不正解)$/)).toBeVisible();
    sawWrong = await page.getByText('不正解', { exact: true }).count() > 0;
    if (!sawWrong) await page.getByRole('button', { name: '次へ' }).click();
  }
  expect(sawWrong).toBe(true);
  await expect(page.getByText('条件', { exact: true })).toBeVisible();
  await expect(page.getByText('決め手', { exact: true })).toBeVisible();
  await expect(page.getByTestId('choice-reason')).toHaveCount(4);
  await expect(page.getByRole('button', { name: '解説を見る' })).toHaveCount(0);
  await page.goto('/?view=practice&mode=wrong');
  await expect(page.getByText(/全科目の間違いだけ：1問/)).toBeVisible();
  await page.goto('/?view=dashboard');
  await expect(page.getByText(new RegExp(`${answeredCount} / \\d+問に回答`))).toBeVisible();
  assertNoErrors();
});

test('基本問題の20問セットを選び、回答直後の解説を確認して次へ進める', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=2');
  await expect(page.getByText('基本問題 · セット2')).toBeVisible();
  await expect(page.getByText('基本問題 · 20問')).toBeVisible();
  await expect(page.getByText('セット1（20問）')).toBeVisible();
  await expect(page.getByText('セット3（20問）')).toBeVisible();
  await expect(page.getByText('セット5（20問）')).toBeVisible();
  const questionHeading = page.locator('.practice-question-card h2');
  const stemBeforeAnswer = await questionHeading.innerText();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();
  await expect(page.getByText(/^(正解|不正解)$/)).toBeVisible();
  await expect(questionHeading).toHaveText(stemBeforeAnswer);
  await expect(page.getByRole('button', { name: '解説を見る' })).toHaveCount(0);
  await expect(page.getByText('決め手', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '次へ' }).click();
  await expect(questionHeading).not.toHaveText(stemBeforeAnswer);
  assertNoErrors();
});

test('TCO問題の解説では正式名称を表示し、CPUのような基本略語は増やさない', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.evaluate(() => {
    localStorage.setItem('fe-study-practice-sessions-v1', JSON.stringify({
      'practice-v2|vocabulary|||strategy|3': {
        seed: 1,
        questionIds: ['basic-set3-19'],
        answeredIds: [],
      },
    }));
  });
  await page.goto('/?view=practice&mode=vocabulary&vocabSet=3&domain=strategy');
  await expect(page.locator('.practice-question-card h2')).toContainText('5年間');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();

  await expect(page.getByText('略語メモ', { exact: true })).toBeVisible();
  const acronymList = page.locator('.practice-acronym-list');
  await expect(acronymList).toContainText('TCO');
  await expect(acronymList).toContainText('Total Cost of Ownership');
  await expect(acronymList).toContainText('総保有コスト');
  await expect(acronymList).not.toContainText('CPU');
  assertNoErrors();
});

test('未回答だけで回答した直後も同じ問題の結果を表示する', async ({ page }) => {
  const assertNoErrors = rejectBrowserErrors(page);
  await page.goto('/?view=practice&mode=unanswered');
  const questionHeading = page.locator('.practice-question-card h2');
  const stemBeforeAnswer = await questionHeading.innerText();
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: '解答する' }).click();
  await expect(page.getByText(/^(正解|不正解)$/)).toBeVisible();
  await expect(questionHeading).toHaveText(stemBeforeAnswer);
  await page.getByRole('button', { name: '次へ' }).click();
  await expect(questionHeading).not.toHaveText(stemBeforeAnswer);
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
