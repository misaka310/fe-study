# 解説画像100枚の再生成・差し替え

対象は科目B本番レベル40問（`b-exam-algorithm-001..032`、`b-exam-security-001..008`）と基本問題セット6〜8の各20問、計100問。既存のWebPは、新画像の内容検品が完了するまで保全する。

## 完了条件

1. 100問それぞれの問題内容と正答に合った日本語図解PNGを生成する。
2. 100枚すべてについて、実画像を開いて日本語文字・計算・構造図を確認し、元の問題と矛盾する画像を修正する。
3. 検品済みPNGだけをWebPへ変換して問題IDと一対一で差し替え、既存画像は`artifacts/image-regeneration-batch/originals/`へ保全する。
4. 既存テストと画像完全性テストに加え、lint、型チェック、build、対象画像の404がないことと実画面の読みやすさを検証する。
5. 検証済み統合HEADを既定branchへpushし、`docs/DEPLOYMENT.md`に従って同じ完全SHAをowner-privateのSitesへデプロイする。

## 準備と再開

```text
node scripts/image-regeneration-batch.mjs plan
node scripts/image-regeneration-batch.mjs status
```

上記は`src/content/questions/b-exam.ts`と`src/content/basic/set6.ts`〜`set8.ts`の**最終問題データ**を読み、100問のマニフェストと各画像プロンプトを`artifacts/image-regeneration-batch/`以下に作る。生成成功枚数は、既存WebPの枚数ではなく`pending/<ID>.png`の実在・PNG署名・IEND・全ピクセルのデコード成功で数える。破損/途中ダウンロードPNGはエラーとして数えない。問題を更新した場合は、マニフェストを再作成し、古いプロンプトとその検品記録を流用しない。

## ブラウザとフォーカスの必須条件

このバッチのChatGPT Web経路は、**メインChromeの認証を利用する一方で、現在表示中のタブとOSの前面ウィンドウを一度も変更しない**ことを必要とする。旧`chatgpt_web_fallback.py`は`tab new`および`tab <番号>`で前面化するため、そのままバッチ実行しない。背景タブ作成だけのCDPプローブ合格は、生成中のブラウザ操作まで非前面化される証明ではない。認証Cookieの書き出し、メインプロファイルの複製、既存タブ再利用を代替手段としない。

### 非前面化ブラウザ経路の復旧状況（2026-09-23）

- 既存の `agent-browser-stealth 0.27.0-fork.11` で、ログイン済みメインChromeからPNGを**1枚生成・保存できた**。ただし旧runnerの `tab new` と `tab <ID>` がユーザーの前面タブを奪うため、旧runnerをそのままバッチ実行しない。
- `chrome-use 1.5.136` の公式Windows配布物はSHA-256照合済みで、`%USERPROFILE%\\.local\\bin\\chrome-use.exe` にある。Native Messagingホスト登録は済みだが、拡張のrelayは未接続。**専用拡張は任意の選択肢であり、必須ではない。**
- 拡張なしの既存Chrome接続を検証した。`chrome://inspect/#remote-debugging` が公開する `127.0.0.1:9222` はChromeプロセスが待ち受け、HTTP `/json/version` は404。これは新しいChromeのWebSocket-onlyモードと整合し、`chrome-use --session fe117-background connect ws://127.0.0.1:9222/devtools/browser --json` は実際に `success:true` を返した。単に `connect 9222` とするとHTTP discovery経由でタイムアウトするので使わない。
- **背景タブ操作とOS前面不変はまだ未証明**。接続直後の `tab list` でCodexProのArtifact Visual lifecycle gateエラーが発生し、再試行もタイムアウトした。後続の `chrome-use connect` はCDP WebSocket接続のHTTP 403で失敗。接続成功だけで100枚の生成へ進まない。Gateが拒否した操作を迂回しない。
- 拡張なしの代替として、公式 `browser-harness 0.1.13` をユーザー環境に追加した。匿名テレメトリは無効、ローカル画面記録はデフォルトOFF。一度は**既存12タブの読取専用一覧取得に成功し、前面ウィンドウも不変**だった。一方、後続の背景タブ作成試験ではCDP WebSocket接続時にHTTP 403が発生し、非前面での新規タブ作成・画像生成は未証明。診断用の一時スクリプトは成果物から除外し、この事実だけを記録する。
- 再開時はユーザーの既存Chrome側でリモートデバッグが許可されているか確認する。403が継続する場合、権限・Chrome側の診断を優先し、拒否を回避する独自CDP実装やCookie抽出はしない。接続許可後、読取専用一覧→非前面タブ1件→OS前面不変→試験画像1件→実PNG保存→100件へ進む。既存ユーザータブは採用・選択・遷移せず、新規背景タブだけを使用し、`bringToFront`も使わない。
- 拡張経路へ切り替えるのはユーザーが明示的に選んだときのみ。別プロファイル、認証Cookie抽出、メインChromeのプロファイル複製も自動代替にしない。
- **2026-09-24一時停止:** ユーザー指示により画像生成・画像差し替え・Sitesデプロイは行わない。生成バッチは0/100。再開に備えて、プロンプト/manifest生成スクリプト、PNG検品・統合スクリプト、テストと本書だけをGit管理する。既存WebPは変更しない。後処理時の確認は21ファイル・87テスト、lint、typecheck、buildが成功。試験用の背景操作スクリプト3本は削除し、接続試験結果のみ本書に残した。

実行器が非前面化を**画像生成・取得までの全操作で**実証できてから、各`prompts/<ID>.txt`を一件ずつ送り、成功したPNGだけを`pending/<ID>.png`へ原子的に保存する。失敗時は成功済みファイルを保持し、未生成IDのみ再試行する。

## 画像検品・差し替え

実画像を確認後、`artifacts/image-regeneration-batch/review.json`を次の形で記録する。`pngSha256`は**実際に確認した**`pending/<ID>.png`のSHA-256と完全一致させる。

```json
{
  "items": {
    "b-exam-algorithm-001": {
      "verdict": "PASS",
      "pngSha256": "<64桁のSHA-256>",
      "textVerified": true,
      "conceptVerified": true
    }
  }
}
```

差し替えは`node scripts/image-regeneration-batch.mjs integrate --id <ID>`、または全件検品済みなら`integrate`。PNGの署名・寸法、検品SHA、未変更の既存WebPのSHAをチェックし、1254×1254のWebPへ変換する。検品がないIDは上書きしない。出力の存在だけでは視覚品質の合格としない。

この作業をデプロイ完了とするには、作成・検品・置換が100/100となり、受入条件とSitesのSHA照合まで成立している必要がある。
