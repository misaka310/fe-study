# Contributing

このリポジトリを変更する場合は、ユーザー向け仕様・実装・検証・公開文書を同じ変更で整合させてください。

## 開発環境

- Node.js 22.13以上
- npm

```bash
npm ci
npm run dev
```

ローカルでは `http://localhost:3000` を使用します。

## Firebase同期は任意

教材・問題演習・模試・学習履歴のローカル保存はFirebase設定なしで動作します。Googleログインによる同期を有効化する場合だけ、`FE_FIREBASE_CONFIG_JSON` または `FE_FIREBASE_CONFIG_URL` を設定してください。

設定が無い開発環境やCIで、Firebase同期を理由にbuildを失敗させないことを製品境界とします。

## 検証

通常の変更では、次を実行します。

```bash
npm run lint
npm test
npm run typecheck
npm run build
```

ブラウザ導線を変更した場合はPlaywrightも実行します。

```bash
npx playwright install chromium
npm run test:e2e
```

`npm run verify:ai` はE2E一式の短縮エントリポイントです。失敗時のtraceやスクリーンショットは `artifacts/verify/` に保存され、Gitには含めません。

## 仕様とコンテンツのルール

- 仕様の正本は [`docs/SPEC.md`](./docs/SPEC.md) です。
- 問題作成・選択肢レビューは [`docs/QUESTION_AUTHORING.md`](./docs/QUESTION_AUTHORING.md) に従います。
- 教材、問題、正答、解説、用語、模試設計は分離し、自動検査可能な状態を維持します。
- IPA公開問題の本文は転載せず、公式ページへのリンクだけを掲載します。
- 問題数など正本データから導出できる表示値は固定値として重複記載しません。
- 教材内の章移動では、本文・URL履歴・スクロール位置・戻る／進むの整合性をE2Eで確認します。
- 説明図は内容理解に寄与するものだけを採用し、意味が不明確な画像は残しません。

## データとプライバシー

未ログイン時の学習履歴はブラウザの `localStorage` に保存します。Firebase設定がある環境で利用者がGoogleログインを選んだ場合だけ、利用者別のFirestore領域へ同期します。外部解析サービスは追加しません。

## 公開リポジトリとしてのルール

- 端末固有パス、credential、token、個人専用の設定、過去のdeployment IDを文書へ残さないでください。
- 一時生成物、キャッシュ、ログ、ローカル設定はコミットしません。
- デプロイ先固有のIDやURLは、必要な設定ファイルまたは環境変数へ閉じ込め、一般手順へ埋め込みません。
- READMEは公開サイトの有無に依存せず、クローンした第三者がローカルで評価できる内容を維持します。

## デプロイ

一般的な手順と公開リポジトリで扱う範囲は [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) を参照してください。認証情報やアカウント固有のdeployment履歴はリポジトリへ保存しません。
