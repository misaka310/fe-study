# 基本情報技術者 合格ナビ

ITパスポート相当の基礎知識から、基本情報技術者試験（FE）の科目A・科目Bを学ぶための日本語学習サイトです。12章の教材、202問の独自問題、弱点復習、本番と同じ問題数・制限時間の模擬試験をブラウザだけで利用できます。

> **非公式教材です。** 情報処理推進機構（IPA）による承認・後援を受けたものではありません。サイト内の正答率は学習上の目安であり、公式のIRT評価点は再現しません。

## ▶ 所有者限定サイトを開く

### [基本情報技術者 合格ナビ →](https://fe-study.misaka310.chatgpt.site)

- [教材から始める](https://fe-study.misaka310.chatgpt.site/?view=materials)
- [217問の問題演習を始める](https://fe-study.misaka310.chatgpt.site/?view=practice&mode=all)
- [科目A・科目B模試を開く](https://fe-study.misaka310.chatgpt.site/?view=exams)
- [弱点補強を開く](https://fe-study.misaka310.chatgpt.site/?view=practice&mode=weakness)
- [学習記録を開く](https://fe-study.misaka310.chatgpt.site/?view=dashboard)

Sitesは所有者限定、GitHubリポジトリはPrivateです。

## この教材でできること

- 12章の教材で、基礎理論から科目Bの擬似言語・セキュリティ事例まで学習
- 独自問題 **202問**（科目A 150問・科目B 52問）
- 全問、科目別、分野別、未回答、誤答、弱点優先の各演習モード
- 全問題で、総合解説と4選択肢それぞれの採否理由を確認
- 科目A **60問 / 90分**、科目B **20問 / 100分**の模擬試験
- 回答履歴、累積正答率、分野別成績、弱点ランキングをブラウザ内へ保存
- 学習履歴をJSONで書き出し・復元
- IPAシラバスVer.9.2、試験要綱、2023〜2026年度公開問題への公式リンク

## 推奨学習順

1. 「教材」の01 合格ロードマップで学習計画を決める。
2. 各章を読み、「この章の問題を解く」で理解を確認する。
3. 「未回答」で一周し、「誤答復習」で判断理由を言語化する。
4. 学習記録の分野別成績と弱点トピックから復習する。
5. 科目A・科目B模試を本番時間で解き、結果から教材へ戻る。

## 教材構成

1. 合格ロードマップ
2. 基礎理論・情報表現
3. コンピュータ構成要素
4. OS・ソフトウェア
5. データ構造とアルゴリズム
6. データベース
7. ネットワーク
8. 情報セキュリティ
9. システム開発・設計
10. マネジメント
11. ストラテジ・企業活動
12. 科目B攻略・直前確認

## ローカルで使う

Node.js 22.13以上が必要です。

```bash
npm install
npm run dev
```

`http://localhost:3000` を開きます。回答履歴はサーバーへ送信されず、利用中のブラウザのlocalStorageだけに保存されます。

## 検証

```bash
npm run lint
npm test
npm run typecheck
npm run build
npm run verify:ai
```

`verify:ai` は実際のChromiumとローカルサーバーを使い、教材、問題回答、誤答復習、学習記録、模試再開、モバイル表示を検証します。失敗時のtraceとスクリーンショットだけを `artifacts/verify/` に保存します。

## データと設計

- 教材: `src/content/materials/`
- 問題: `src/content/questions/`
- 学習状態・バックアップ: `src/learning/`
- 仕様の正本: [`docs/SPEC.md`](./docs/SPEC.md)
- 実装計画: [`docs/superpowers/plans/2026-08-24-fe-study-implementation.md`](./docs/superpowers/plans/2026-08-24-fe-study-implementation.md)

問題は全て本リポジトリ向けに独自作成しています。IPA公開問題の本文は収録せず、公式ページへのリンクだけを掲載しています。

## 公式情報

- [IPA 試験要綱・シラバス](https://www.ipa.go.jp/shiken/syllabus/gaiyou.html)
- [IPA SG・FE公開問題一覧](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/index.html)
- [IPA 2026年度FE公開問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/2026r08.html)
- [IPA 2027年度以降の試験制度見直し](https://www.ipa.go.jp/shiken/syllabus/henkou/2025/20260331.html)
