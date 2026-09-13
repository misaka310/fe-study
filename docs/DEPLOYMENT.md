# ChatGPT Sites private deployment runbook

> **最優先:** このリポジトリをChatGPT Sitesへデプロイするときは、最初にこの手順を読む。フォルダ名や過去のSite名から対象Projectを推測しない。

## 完了条件

デプロイは、次の4条件をすべて確認するまで完了扱いにしない。

1. Sites source repository の対象branch HEADが、デプロイしたい**完全40桁SHA**と一致している。
2. そのSHAで保存されたSite versionが存在する。
3. そのversionのdeploymentが `succeeded` になっている。
4. Siteがowner-privateのままで、意図しない外部公開が発生していない。

## このリポジトリの正しいSite

`.openai/hosting.json` を必ず読み、ここにある `project_id` を正本とする。

現在の正本:

- project_id: `appgprj_6a8b8f380cb481919638c3af7a1dafc8`
- live URL: `https://fe-study.misaka310.chatgpt.site`
- audience: owner-private

ローカルの親フォルダ名、以前使った別Site、別リポジトリの `project_id` は使わない。

## 成功した手順

### 1. デプロイ対象の完全SHAを確定する

GitHub / source repository の対象branch HEADを確認し、短縮SHAではなく完全40桁SHAを使う。

```bash
git rev-parse --verify HEAD
```

以後、source push、build、version保存、deployment確認まで同じSHAを使う。途中でsourceが変わった場合は最初からやり直す。

### 2. buildを通す

既存checkoutへ直接入った場合は、Sites pluginのportable execution profileを先に設定する。

```bash
node <sites-plugin-root>/scripts/configure-execution-profile.mjs --execution-profile portable
npm ci
npm run build
```

必要に応じて通常の受入確認も実行する。

```bash
npm run lint
npm test
npm run typecheck
npm run test:e2e
```

### 3. Sites source repositoryの現在HEADを確認する

`sites.create_source_repository_write_credential` を使って、このProject専用の一時credentialを取得する。

重要:

- tokenをファイル、remote URL、Git設定、ログへ保存しない。
- credentialはSites source repositoryへの1回の操作だけに使う。
- branch名、remote URLはconnectorが返した値をそのまま使う。

push前に `ls-remote` でSites側branchの現在HEADを取得し、`old_sha` として保持する。

### 4. 完全SHAをSites source repositoryへpushする

通常pushがfast-forwardならそのままpushする。

履歴が分岐している場合は、**plain `--force` は使わず**、直前に確認した `old_sha` を使って `--force-with-lease` する。

概念上は次の更新になる。

```text
refs/heads/main: old_sha -> target_full_sha
```

成功後、もう一度 `ls-remote` し、Sites側HEADが `target_full_sha` と完全一致することを確認する。

### 5. `Invalid revision range OLD..NEW` が出た場合

今回実際に発生した原因は、Sitesサーバーではなく、Windows側のグローバル `pre-push` hookがSites専用Gitにも適用され、ローカルに存在しないSites旧SHAへ

```text
git diff OLD..NEW
```

を実行して失敗したことだった。

Git traceで `pre-push` の直後に `Invalid revision range` が出る場合は、グローバルhookや本体repositoryを変更しない。**Sites送信用の使い捨てcloneだけ**を作り、そのcloneにだけ空のhookディレクトリを設定する。

```bash
git clone --no-checkout https://github.com/misaka310/fe-study.git <temp-clone>
git -C <temp-clone> checkout --detach <target_full_sha>
mkdir <temp-clone>/.sites-no-hooks
git -C <temp-clone> config --local core.hooksPath <temp-clone>/.sites-no-hooks
```

その使い捨てcloneから、Sites credentialを使って同じ `target_full_sha` をpushする。

この回避は**使い捨てcloneだけ**に限定する。

- `~/.gitconfig` の `core.hooksPath` を変更しない。
- 本体repositoryのhookを無効化しない。
- GitHub remoteへこの回避設定でpushしない。
- `--force-with-lease` の期待値は必ず直前に読んだSites remote HEADを使う。

### 6. Site versionを保存する

Sites source repositoryのbranch HEADが完全SHAと一致したことを確認してから、`sites.save_site_version` を実行する。

入力の要点:

```text
project_id = .openai/hosting.json の project_id
commit_sha = push済みの完全40桁SHA
```

`stale_commit_sha` が返った場合は保存を繰り返さず、Sites source branch HEADを再確認する。

archiveを添付できる正規経路では、同じSHAからbuildしたarchiveを使う。ローカルpackagingが完了していても呼び出し層がfile parameterを扱えない場合は、Sitesが許可するremote-build fallbackを使う。

### 7. private deployする

保存されたversion IDをそのまま `sites.deploy_private_site_version` へ渡す。

同じversionに既存deploymentがある場合は、重複deployせず、そのdeploymentを再利用してstatus確認へ進む。

### 8. `succeeded` まで確認する

初期応答がterminalでなければ、`sites.get_deployment_status` を同じdeployment IDでpollする。

成功条件:

```text
status = succeeded
failure_message = null
```

`failed` は完了扱いにしない。

### 9. 最後に独立照合する

ローカル共通ツールが使える環境では、最後に次を実行する。

```bash
node C:/00_dev/.agents/tools/sites-direct-status.mjs \
  --project-id <project_id> \
  --commit-sha <target_full_sha> \
  --require-succeeded \
  --require-owner-private \
  --json
```

最終結果が次をすべて満たした場合だけ完了とする。

```text
ok = true
checks.commit_match = true
checks.deployment_succeeded = true
checks.owner_private = true
```

## 2026-09-13 成功実績

この手順で実際に本番反映まで成功した記録。

- source SHA: `6b311da5676bd57fef7abc5a925838b8cd405cb0`
- Site version: `24`
- version ID: `appgprj_6a8b8f380cb481919638c3af7a1dafc8~appgver_886fcb4e0f70819182b5af6a37192dd9`
- deployment ID: `appgdep_6aa66db2b0a88191b05d330f9d94d45f`
- deployment status: `succeeded`
- live URL: `https://fe-study.misaka310.chatgpt.site`
- commit match: `true`
- owner-private: `true`
- allowed account count: `1`
- external visitor count: `0`
- allowed group count: `0`

### このとき実際に解決した問題

1. 最初に別Siteの `project_id` を見ていたため、`.openai/hosting.json` の正しいProjectへ切り替えた。
2. Sites source `main` が旧SHAだったため、完全SHAをpushする必要があった。
3. `Invalid revision range` はSites側障害ではなく、グローバル `pre-push` hookの誤適用だった。
4. Sites送信用の使い捨てcloneだけ `core.hooksPath` を空ディレクトリへ切り替え、`--force-with-lease` でSites source `main` を更新した。
5. Version 24を保存し、private deploy後に `succeeded` までpollした。
6. `sites-direct-status.mjs` の最終照合で `ok: true` を確認した。

## やってはいけないこと

- フォルダ名や過去の記憶だけでSites Projectを選ばない。
- 短縮SHAをversion保存へ使わない。
- Sites source pushが完了していないのに `save_site_version` を実行しない。
- plain `--force` を使わない。
- グローバルGit hookをSitesデプロイのために無効化しない。
- credential tokenをremote URL、Git config、ファイル、ドキュメントへ保存しない。
- deploy応答を失ったときに、確認せず同じversionを重複deployしない。
- `succeeded` とowner-privateの最終照合前に「完了」と報告しない。

## 後片付け

成功後は、Sites送信用に作った一時clone、credential helper、archiveなどの一時物を削除する。削除前に、本体repositoryや共有ファイルが含まれていないことを確認する。
