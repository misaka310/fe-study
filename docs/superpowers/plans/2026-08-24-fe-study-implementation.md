# 基本情報技術者 合格ナビ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ITパスポート相当の学習者が基本情報技術者試験の科目A・Bを学び、200問以上の独自問題、本番形式模試、弱点復習をブラウザで完結できるPrivate GitHub／OpenAI Sites成果物を作る。

**Architecture:** OpenAI Sites標準scaffoldの単一ポータルを使い、画面状態と静的教材データを分離する。問題・教材・模試blueprintはTypeScriptデータ、学習履歴はlocalStorage、品質判定はVitestと決定論的データ検証、実ユーザー導線はPlaywrightで検証する。

**Tech Stack:** OpenAI Sites scaffold 0.2.0、Vinext、React、TypeScript、CSS、Vitest、Playwright、localStorage、GitHub CLI、OpenAI Sites hosting。

**Spec:** `docs/SPEC.md`

## Global Constraints

- 2026年8月時点のIPA公式情報と基本情報技術者試験シラバスVer.9.2を基準にする。
- 収録問題は独自作成し、IPA公開問題は公式リンクだけを掲載する。
- 合計200問以上、科目A 150問以上、科目B 50問以上を収録する。
- 科目A模試は60問・90分、科目B模試は20問・100分とする。
- 公式IRT得点を再現せず、サイト内結果は正答率による学習目安と明記する。
- 学習履歴はブラウザ内だけに保存し、認証・外部DB・個人情報収集を追加しない。
- GitHubリポジトリはPrivate、Sitesは所有者限定アクセスとする。
- 問題数、ID、選択肢、正答、全選択肢解説、類似度、模試構成、教材リンク、保存復元を自動検査する。

---

### Task 1: Sites基盤と検証入口

**Files:**
- Create through scaffold: `package.json`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `vite.config.ts`, `.openai/hosting.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `docs/SPEC.md`
- Produces: `npm run test`, `npm run typecheck`, `npm run build`, `npm run dev` の再現可能な入口。

- [ ] **Step 1: Scaffold Sites**

Run: `npm create --yes @openai/sites@0.2.0 . -- --yes --install`

Expected: `.openai/hosting.json` を含むSites標準構成とlockfileが生成される。既存の `AGENTS.md` と `docs/` は保持する。

- [ ] **Step 2: Add the test runner**

Run: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom`

Add scripts equivalent to:

```json
{
  "test": "vitest run",
  "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 3: Write a failing shell test**

Create `tests/app-shell.test.tsx` asserting that the page renders `基本情報技術者 合格ナビ`, `学習を始める`, `問題演習`, and `模擬試験`.

- [ ] **Step 4: Run the test and confirm the starter fails**

Run: `npm test -- tests/app-shell.test.tsx`

Expected: FAIL because the starter contains no FE product copy.

- [ ] **Step 5: Implement the minimum product shell**

Replace starter metadata and page content with an FE-specific header, a zeroed progress summary, and three primary navigation actions. Keep data-driven panels inert until later tasks.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- tests/app-shell.test.tsx`

Expected: PASS.

Commit: `feat: scaffold FE study portal`

### Task 2: Domain model, learning state, and backup safety

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/catalog.ts`
- Create: `src/learning/state.ts`
- Create: `src/learning/storage.ts`
- Create: `src/learning/backup.ts`
- Test: `tests/learning-state.test.ts`
- Test: `tests/backup.test.ts`

**Interfaces:**
- Produces: `Question`, `Material`, `Attempt`, `QuestionProgress`, `LearningState`, `ExamSession` types.
- Produces: `recordAttempt(state, questionId, picks, answeredAt)`, `buildWeaknessRanking(state, questions)`, `createExamSession(subject, questions, now, random)`, `serializeBackup(state)`, `parseBackup(json)`.
- `createExamSession('A', ...)` returns 60 unique IDs with `durationMinutes: 90`; subject B returns 20 unique IDs with `durationMinutes: 100`.

- [ ] **Step 1: Write failing state tests**

Cover cumulative wrong answers, a later correct answer preserving earlier errors, weakness ordering, subject-specific exam counts, timer restoration, and immutable source question data.

- [ ] **Step 2: Run state tests**

Run: `npm test -- tests/learning-state.test.ts`

Expected: FAIL because domain and state modules do not exist.

- [ ] **Step 3: Implement the state model**

Use a versioned object:

```ts
export interface LearningState {
  schemaVersion: 1;
  attempts: Record<string, Attempt[]>;
  activeExam: ExamSession | null;
}
```

Weakness priority is `wrong * 3 - correct`, then most recent wrong answer. Never erase previous attempts.

- [ ] **Step 4: Write failing backup tests**

Verify round-trip, unknown-key tolerance, bad JSON rejection, wrong schema rejection, invalid question IDs rejection, and preservation of the pre-import state on failure.

- [ ] **Step 5: Implement backup validation**

`parseBackup` returns `{ ok: true, state } | { ok: false, message }` and never writes storage. The UI writes only after an `ok: true` result.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- tests/learning-state.test.ts tests/backup.test.ts`

Expected: PASS.

Commit: `feat: add durable local learning state`

### Task 3: 教材12章と公式資料ナビゲーション

**Files:**
- Create: `src/content/materials/01-roadmap.ts` through `src/content/materials/12-final-review.ts`
- Create: `src/content/materials/index.ts`
- Create: `src/content/official-links.ts`
- Create: `src/components/MaterialReader.tsx`
- Test: `tests/materials.test.ts`

**Interfaces:**
- Produces: `materials: Material[]`, each with `id`, `order`, `title`, `summary`, `sections`, `relatedQuestionTopics`.
- Produces: `officialLinks`, containing IPA syllabus 9.2, exam outline, 2023–2026 public-question index, and 2027 continuation notice URLs.

- [ ] **Step 1: Write failing material coverage tests**

Assert 12 ordered chapters, non-empty multi-section bodies, all required syllabus areas, unique IDs, valid cross-links, code examples in the algorithm chapter, and only `ipa.go.jp` hosts for official links.

- [ ] **Step 2: Run the material tests**

Run: `npm test -- tests/materials.test.ts`

Expected: FAIL because the catalog is absent.

- [ ] **Step 3: Author chapters 1–6**

Write concrete explanations, comparison tables, worked calculations, common traps, and chapter checks for roadmap, theory, hardware, OS, algorithms, and databases.

- [ ] **Step 4: Author chapters 7–12**

Write concrete explanations, decision tables, pseudo-code walkthroughs, security cases, management/strategy distinctions, exam tactics, and final checklist for networking through final review.

- [ ] **Step 5: Implement the reader**

Support chapter list, keyword filtering, previous/next chapter, direct query `?material=<id>`, related-practice links, table/code rendering, and a visible load-error recovery message.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- tests/materials.test.ts`

Expected: PASS.

Commit: `feat: add complete FE learning materials`

### Task 4: 200問以上の独自問題バンク

**Files:**
- Create: `src/content/questions/a-theory.ts`
- Create: `src/content/questions/a-computer.ts`
- Create: `src/content/questions/a-software.ts`
- Create: `src/content/questions/a-database.ts`
- Create: `src/content/questions/a-network.ts`
- Create: `src/content/questions/a-security.ts`
- Create: `src/content/questions/a-development.ts`
- Create: `src/content/questions/a-management.ts`
- Create: `src/content/questions/a-strategy.ts`
- Create: `src/content/questions/b-algorithm.ts`
- Create: `src/content/questions/b-security.ts`
- Create: `src/content/questions/index.ts`
- Test: `tests/question-quality.test.ts`

**Interfaces:**
- Produces: `questions: readonly Question[]` with at least 150 subject-A and 50 subject-B records.
- Every record supplies `id`, `subject`, `domain`, `topic`, `stem`, `choices`, `correct`, `explanation`, `choiceReasons`, `materialId`, `difficulty`.

- [ ] **Step 1: Write failing structural tests**

Assert counts, unique IDs, four or more choices, in-range correct indexes, exact choice/reason count, minimum meaningful lengths, valid material IDs, required domain quotas, and no source-attribution field that could imply copied IPA text.

- [ ] **Step 2: Add semantic heuristics**

Calculate normalized character bigram similarity and fail at 0.62 or higher; reject identical choice sets; reject distractors using blanket cues such as `常に`, `絶対`, `必ず全て`; require subject-B algorithm questions to include pseudo-code or a trace table and subject-B security questions to include a scenario.

- [ ] **Step 3: Run quality tests**

Run: `npm test -- tests/question-quality.test.ts`

Expected: FAIL because the bank is absent.

- [ ] **Step 4: Author 150+ subject-A questions**

Meet minimum domain quotas: theory 18, computer 18, software 14, database 16, network 18, security 24, development 16, management 12, strategy 14. Every distractor receives a specific reason tied to the stem requirement.

- [ ] **Step 5: Author 50+ subject-B questions**

Include at least 40 algorithm/pseudo-code questions and 10 security scenarios. Cover trace execution, missing expressions, boundary conditions, arrays, lists, stack, queue, tree, search, sort, recursion, dynamic programming fundamentals, complexity, validation, authentication, authorization, logging, incident response, and secure design.

- [ ] **Step 6: Review failing heuristics and repair content**

Run: `npm test -- tests/question-quality.test.ts`

Expected: PASS with printed totals and per-domain distribution.

- [ ] **Step 7: Commit**

Commit: `content: add original FE question bank`

### Task 5: 問題演習、模試、弱点補強UI

**Files:**
- Create: `src/components/PracticeHub.tsx`
- Create: `src/components/QuestionCard.tsx`
- Create: `src/components/AnswerReview.tsx`
- Create: `src/components/ScorePanel.tsx`
- Create: `src/components/ExamRunner.tsx`
- Create: `src/components/BackupPanel.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/practice-ui.test.tsx`

**Interfaces:**
- Consumes: question catalog and learning-state functions from Tasks 2 and 4.
- Produces: query modes `all`, `subject`, `domain`, `unanswered`, `wrong`, `weakness`, `exam-a`, `exam-b`.

- [ ] **Step 1: Write failing interaction tests**

Cover unanswered submission, single/multiple selection, result text, all choice reasons, previous/next movement, related-material navigation, wrong-only filtering, weakness order, exam timer, timeout lock, exam resume, reset confirmation, backup export, bad import error, and successful import.

- [ ] **Step 2: Run UI tests**

Run: `npm test -- tests/practice-ui.test.tsx`

Expected: FAIL because practice components do not exist.

- [ ] **Step 3: Implement normal practice**

Render one question at a time. Before answer, do not expose prior picks or correctness. After answer, show `正解`/`不正解`, selected and correct choices, overall explanation, every choice reason, and related material.

- [ ] **Step 4: Implement progress and weakness UI**

Show answered count, correct rate, domain distribution, cumulative weak topics, wrong-question links, and an empty-state action back to all questions.

- [ ] **Step 5: Implement both exam runners**

Persist question IDs, current index, start time, picks, and subject. Display remaining time; on timeout lock answers and show a review summary. Label the result as a study estimate rather than an official score.

- [ ] **Step 6: Implement backup and recovery**

Download a dated JSON file. Validate imports before replacing state. Surface errors in an `aria-live` status region and preserve current data on failure.

- [ ] **Step 7: Verify and commit**

Run: `npm test -- tests/practice-ui.test.tsx`

Expected: PASS.

Commit: `feat: add practice exams and weakness review`

### Task 6: Product presentation, accessibility, and end-to-end proof

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `public/og.png`
- Create: `playwright.config.ts`
- Create: `e2e/happy-path.spec.ts`
- Create: `e2e/recovery.spec.ts`
- Create: `README.md`

**Interfaces:**
- Produces: recognizable responsive FE portal, site metadata/social preview, documented user entrance, automated browser proof.

- [ ] **Step 1: Complete the first meaningful preview**

Show a first viewport with title, current progress, `教材から始める`, `問題演習`, and `科目A模試`/`科目B模試`. Confirm the exact local URL returns a non-error response, then open one stable Codex browser tab.

- [ ] **Step 2: Apply the complete visual system**

Use a calm ink/navy base, cyan and amber accents, readable Japanese typography, clear cards, strong focus rings, non-color correctness icons/text, desktop side navigation, and a single-column mobile layout. Avoid third-party imagery when typography and CSS convey the product.

- [ ] **Step 3: Add metadata and social preview**

Set exact title and description in `app/layout.tsx`; create one branded `public/og.png` and wire Open Graph/X metadata without exposing private data.

- [ ] **Step 4: Write failing E2E tests**

Happy path: home → chapter → related practice → answer → weak review → subject-A exam start → persisted reload. Recovery: invalid backup does not erase progress; empty wrong filter returns to all; data load failure provides reload guidance.

- [ ] **Step 5: Run E2E and repair only observed failures**

Run: `npx playwright test`

Expected: PASS on desktop Chromium and a mobile viewport project.

- [ ] **Step 6: Write user-facing README**

Before deployment, omit the Sites link entirely; after deployment returns the real URL, add that exact URL. Document capabilities, learning order, original-question policy, official links, unofficial/IRT disclaimers, local run, tests, and license.

- [ ] **Step 7: Verify all local gates and commit**

Run: `npm test`

Run: `npm run typecheck`

Run: `npm run build`

Run: `npx playwright test`

Expected: all PASS.

Commit: `feat: complete FE study experience`

### Task 7: Private GitHub delivery and owner-only Sites hosting

**Files:**
- Modify: `.openai/hosting.json` with the opaque Sites `project_id`
- Modify: `README.md` with the final deployed URL
- Create outside repository: Sites deployment archive in the leased task work area

**Interfaces:**
- Consumes: exact validated Git HEAD and successful build output.
- Produces: Private GitHub repository remote and owner-only production Sites URL tied to the same final source state.

- [ ] **Step 1: Run Git delivery routing**

Use `github-codexpro-publish`; verify authenticated account, create `fe-study` as Private, add remote without exposing credentials, and confirm remote visibility from GitHub metadata.

- [ ] **Step 2: Create the Site once**

Call Sites `create_site` with the approved title/slug, persist only returned `project_id` plus null D1/R2 bindings in `.openai/hosting.json`, and never invent or recreate the ID.

- [ ] **Step 3: Rebuild and finalize source**

Run `npm test`, `npm run typecheck`, `npm run build`, and `npx playwright test`; update README with the returned Sites URL; commit the exact validated state.

- [ ] **Step 4: Push the exact source**

Push `main` to the Private GitHub repository, verify local HEAD equals remote `main`, and keep any Sites source credential out of Git config and remote URLs.

- [ ] **Step 5: Package and save one version**

Use the installed Sites skill `scripts/package-site.sh` against the project and a leased archive path. Save one version with the pushed HEAD SHA and exact archive.

- [ ] **Step 6: Deploy owner-only and poll**

Use `deploy_private_site_version`; poll deployment status until `succeeded` or a terminal error. On success, open the production URL in the existing stable Site tab.

- [ ] **Step 7: Final completion gates**

Request the production home, material view, practice view, and exam entrances. Verify GitHub visibility is Private, remote HEAD matches local HEAD, working tree is clean, third-party reference clone is unchanged, and CodexPro workspace finalization returns PASS or NO_GATE.

Commit after any URL-only correction: `docs: publish FE study site`
