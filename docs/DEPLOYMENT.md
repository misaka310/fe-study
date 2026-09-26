# Deployment

この文書は、公開リポジトリに残してよい**一般化したデプロイ手順**だけを扱います。credential、token、個人端末の絶対パス、過去のdeployment IDや一時的な障害対応記録はリポジトリへ保存しません。

## 1. 先にローカル検証する

```bash
npm ci
npm run lint
npm test
npm run typecheck
npm run build
```

ブラウザ導線を変更した場合は、追加で次を実行します。

```bash
npx playwright install chromium
npm run test:e2e
```

デプロイする成果物は、これらの検証を通した同一コミットから作成します。

## 2. Firebase同期は任意

Firebase設定が無い場合、アプリはlocal-firstモードで動作し、Google同期UIは有効になりません。教材・問題演習・模試・学習履歴のローカル保存にはFirebaseは不要です。

Google同期を有効化する場合は、次のいずれかを環境変数で与えます。

- `FE_FIREBASE_CONFIG_JSON` — Firebase Web App設定をJSON文字列で指定
- `FE_FIREBASE_CONFIG_URL` — Firebase Web App設定をJSONまたは `export const firebaseConfig = {...}` 形式で返すURL

Firebase Web App設定はブラウザで利用する公開設定ですが、秘密鍵・サービスアカウント鍵・管理者credentialはこの仕組みに含めません。

## 3. ChatGPT Sites互換ビルド

`.openai/hosting.json` はホスティングプラグインが利用するプロジェクト紐付けです。人向け文書へproject IDを重複記載せず、この設定ファイルを参照します。

```bash
npm run build
```

デプロイ時は、利用しているホスティング環境の正規ツールで次を確認します。

1. デプロイ対象のcommit SHAが意図したものと一致する。
2. buildがそのcommitから作成されている。
3. deploymentが成功状態になっている。
4. 公開範囲・認証設定が意図した値になっている。

リポジトリの公開／非公開と、ホストしたサイトの公開範囲は別の設定として扱います。

## 4. リポジトリへ保存しないもの

- access token、credential、秘密鍵、サービスアカウントJSON
- 一時credential helperや一時clone
- 個人端末の絶対パス
- deployment ID、version ID、allowed account一覧などの運用履歴
- 障害対応中の一時回避設定
- `.env*`
- 生成された `public/firebase-config.json`

## 5. 完了確認

デプロイ完了は、テスト成功だけでなく「検証済みcommitとデプロイ成果物が対応していること」「意図した公開範囲であること」まで確認して判断します。公開リポジトリ内には、その確認方法だけを残し、アカウント固有の実績値は残しません。
