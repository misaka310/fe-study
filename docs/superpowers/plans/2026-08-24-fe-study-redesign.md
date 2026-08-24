# FE Study Learning Experience Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** FE学習サイトを、用語・判断軸・比較・説明図・問題解説がつながる教材ポータルへ全面刷新する。

**Architecture:** 既存のURLルーティング、問題ID、localStorage学習履歴、模試仕様を維持し、教材表示・用語表示・図解表示・出題順だけを責務ごとに拡張する。本文の明示マーカーを `GlossaryTooltip` が解決し、教材セクションの構造化フィールドが「判断軸」「比較」「注意点」を描画する。図解はima2生成ファイルと `visuals.ts` のメタデータを組み合わせて表示する。

**Tech Stack:** React 19, Next/Vinext, TypeScript, CSS, Vitest, Testing Library, Playwright, ima2。

**Spec:** `docs/SPEC.md` / `docs/superpowers/specs/2026-08-24-fe-study-redesign-design.md`

## Global Constraints

- AWS SAAの文章、問題、画像、コードはコピーしない。
- 既存の問題ID、学習履歴スキーマ、模試の問題数・制限時間を維持する。
- 用語チップは明示マーカーだけを対象にし、未登録語で表示を壊さない。
- 画像は通常のima2経路で生成し、画像利用上限以外の失敗で別プロバイダへ切り替えない。
- 認証、外部解析、サーバー側個人データ保存、不要な依存追加を行わない。
- すべてのタスクでテストまたは実ブラウザ確認を実行し、未確認事項を残さない。

---

### Task 1: 既存教材と問題の品質基盤を構造化する

**Files:** `src/domain/types.ts`, `src/content/materials/*.ts`, `src/content/materials/index.ts`, `src/content/questions/*.ts`, `tests/materials.test.ts`, `tests/question-quality.test.ts`

- [ ] **Step 1: Write failing assertions for structured explanations and problem invariants.** Add tests that assert every material has a decision axis, every glossary marker is registered, every question has four choices and four choice reasons, and each explanation contains a decision cue.
- [ ] **Step 2: Run `npm test -- tests/materials.test.ts tests/question-quality.test.ts` and confirm the new assertions fail.**
- [ ] **Step 3: Extend `MaterialSection` with optional `takeaways`, `decisionAxes`, `contrast`, and `pitfalls` arrays, then revise all 12 chapter files.** Use markers such as `[[TTL]]`, `[[TCP]]`, `[[UDP]]`, `[[DNS]]`, `[[NAT]]`, `[[NAPT]]`, `[[TLS]]`, `[[HTTP]]`, `[[SQL]]`, `[[ACID]]`, `[[CAP]]`, `[[RTO]]`, `[[RPO]]`, `[[OS]]`, `[[API]]`, and `[[CRUD]]`.
- [ ] **Step 4: Rewrite ambiguous question stems and add definition, comparison, condition-application, calculation/trace, and error-detection forms.** Preserve existing IDs and answer compatibility; make each `choiceReasons[index]` name the conflicting requirement.
- [ ] **Step 5: Run the focused tests again and confirm the content gate passes.**

### Task 2: Glossary data and accessible term popovers

**Files:** `src/content/glossary.ts`, `src/components/GlossaryTooltip.tsx`, `src/components/RichText.tsx`, `src/components/MaterialReader.tsx`, `tests/glossary.test.ts`, `tests/material-reader.test.tsx`

- [ ] **Step 1: Add failing tests for `[[TTL]]` parsing, `Time To Live` expansion, unknown-marker fallback, click-open, Escape-close, and focus return.**
- [ ] **Step 2: Run `npm test -- tests/glossary.test.ts tests/material-reader.test.tsx` and confirm failure.**
- [ ] **Step 3: Implement `GlossaryEntry`, the glossary map, and marker parsing.** Render only registered markers as accessible buttons with `aria-expanded`, `aria-controls`, a close button, Escape handling, and outside-click handling.
- [ ] **Step 4: Render all material paragraphs and bullets through `RichText`; add semantic blocks for takeaways, decision axes, contrasts, pitfalls, and code.**
- [ ] **Step 5: Run the focused tests and `npm run typecheck`; both must pass.**

### Task 3: Generate and integrate explanatory ima2 diagrams

**Files:** `public/images/fe-dns-ttl.png`, `public/images/fe-tcp-udp.png`, `public/images/fe-subnet-routing.png`, `public/images/fe-auth-access-control.png`, `src/content/visuals.ts`, `src/components/VisualGallery.tsx`, `src/components/PageVisual.tsx`, `src/components/MaterialReader.tsx`, `tests/e2e/learning-flow.spec.ts`

- [ ] **Step 1: Verify `C:\00_dev\_tools\run-ima2-headless.ps1` and `C:\00_dev\_tools\gpt-image-2-existing`, then query the actual ima2 service through the documented headless wrapper.**
- [ ] **Step 2: Generate four labeled diagrams: DNS query/cache/TTL expiry; TCP handshake/retransmission vs UDP datagram; subnet mask/network-host split and longest-prefix routing; authentication/authorization/MFA/least-privilege flow.**
- [ ] **Step 3: Visually inspect each output, regenerate through ima2 for incorrect labels or semantics, and only then copy selected current outputs into `public/images/`.**
- [ ] **Step 4: Add accurate alt text, descriptions, `relatedMaterialIds`, material filtering, and an accessible lightbox.**
- [ ] **Step 5: Run visual component tests and the browser gallery flow; all four images must load and open.**

### Task 4: Rebuild the portal UI around purpose and learning state

**Files:** `app/page.tsx`, `app/globals.css`, `src/components/ProgressSummary.tsx`, `src/components/PracticeRunner.tsx`, `src/components/ExamCenter.tsx`, `src/components/LearningDashboard.tsx`, `src/components/PageVisual.tsx`, `tests/app-shell.test.tsx`, `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Add failing shell assertions for purpose cards `教材`, `問題演習`, `弱点補強`, `模試`, `学習記録` and decision-oriented headings.**
- [ ] **Step 2: Run the focused shell and responsive tests to confirm failure.**
- [ ] **Step 3: Replace the generic hero with a paper-like learning dashboard: compact masthead, progress card, purpose cards, exam facts, and explanatory gallery.** Keep the existing query routes and accessible names for core actions.
- [ ] **Step 4: Replace the CSS with warm paper background, navy text, orange actions, teal information accents, comparison cards, 375px stacking, local table scrolling, and viewport-fitting popovers.
- [ ] **Step 5: Run focused tests, `npm run lint`, and `npm run typecheck`; all must pass.**

### Task 5: Make practice order and review experience resistant to memorization

**Files:** `src/components/PracticeRunner.tsx`, `src/learning/state.ts`, `src/domain/types.ts`, `tests/practice-runner.test.tsx`, `tests/learning-state.test.ts`, `tests/e2e/learning-flow.spec.ts`

- [ ] **Step 1: Add failing tests for stable seeded shuffle, different seeds producing different large-pool order, and decision-first answer panels.**
- [ ] **Step 2: Run `npm test -- tests/practice-runner.test.tsx tests/learning-state.test.ts` and confirm failure.**
- [ ] **Step 3: Add a small seeded hash/shuffle helper, initialize one seed per mounted practice session, and derive stable order from `question.id` plus seed.** Do not alter `schemaVersion: 1` or stored attempts.
- [ ] **Step 4: Add visible `条件`, `決め手`, `正答の理由`, `選択肢ごとの判定`, and `関連教材` labels using existing explanation data and safe fallbacks.
- [ ] **Step 5: Run focused tests and the learning-flow E2E path; answer, wrong-review, dashboard, and mock resume must pass.**

### Task 6: Documentation, full verification, and completion evidence

**Files:** `README.md`, `docs/SPEC.md`, `tests/e2e/learning-flow.spec.ts`, `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Extend E2E coverage for glossary, explanatory images, all choice reasons, related material, and no horizontal overflow at 375px.**
- [ ] **Step 2: Run `npm run lint`, `npm test`, `npm run typecheck`, `npm run build`, and `npm run verify:ai` from `C:\00_dev\117_fe-study`.**
- [ ] **Step 3: Open landing, network, security, practice, exam, and dashboard pages at desktop and mobile sizes; visually confirm current ima2 outputs, readable labels, usable tooltips, and visible next actions.**
- [ ] **Step 4: Update README, run `git diff --check`, `git status --short`, and `git diff --stat`, and exclude generated caches, secrets, unrelated changes, and copied SAA assets.**
- [ ] **Step 5: Run the available workspace completion/finalization gate before reporting completion.**
