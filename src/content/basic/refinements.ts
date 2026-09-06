import type { Question } from '../../domain/types';

interface ChoicePatch {
  index: 0 | 1 | 2 | 3;
  choice: string;
  reason: string;
}

const patches: Record<string, readonly ChoicePatch[]> = {
  'basic-set1-14': [
    { index: 1, choice: '危険そうな文字だけを独自ルールで置換してから文字列連結する', reason: '入力漏れやDB方言差が生じやすく、SQL構造と値を分離するパラメータ化クエリより堅牢性が低い方法です。' },
    { index: 2, choice: 'WAFでSQLインジェクションらしい要求を遮断し、アプリ側の文字列連結はそのままにする', reason: 'WAFは防御層として有効でも回避や誤検知があり、脆弱なSQL組立て自体を解消する直接策にはなりません。' },
    { index: 3, choice: '入力値を正規表現で検査した後、エスケープせずSQL文へ文字列連結する', reason: '検査条件から漏れる入力があればSQL構造へ混入するため、値をSQL構文から分離する要件を満たしません。' },
  ],
  'basic-set2-10': [
    { index: 1, choice: 'DNSサーバのアドレス', reason: '名前解決だけの問題なら疑いますが、別サブネットのIPアドレスへも到達できない症状なら優先度は下がります。' },
    { index: 2, choice: 'ARPキャッシュの保持時間', reason: '同一リンク上のMAC解決には関係しますが、全ての別サブネット宛て通信が失敗する主因としてはゲートウェイ設定を先に確認します。' },
    { index: 3, choice: 'DHCPリースの残り時間', reason: 'IPアドレスとサブネットマスクが正しく有効なら、リース残時間そのものは外部宛て経路の設定値ではありません。' },
  ],
  'basic-set2-20': [
    { index: 1, choice: '年間売上高だけを年末に確認する', reason: '最終成果そのものはKGIに近く、途中の改善状況を継続的に把握する先行・中間指標としては弱い選択です。' },
    { index: 2, choice: '月間ページビュー数だけを追う', reason: '流入量は分かりますが、購入へつながった割合や注文単価が分からず、売上増加との関係を十分評価できません。' },
    { index: 3, choice: '問い合わせ件数だけを追う', reason: '顧客接点の変化は見られますが、購入転換や売上単価を直接測る指標ではなく、売上目標との結び付きが弱いです。' },
  ],
  'basic-set3-10': [
    { index: 1, choice: '送信元と宛先のMACアドレス', reason: 'MACアドレスは同一リンク上のフレーム転送に使われ、複数の外向きTCP/UDP通信を一つのグローバルIP上で識別する情報としては不足します。' },
    { index: 2, choice: 'DNSの問い合わせ名', reason: '名前解決時には使いますが、NAPTが変換表で個々のトランスポート通信を識別する主情報ではありません。' },
    { index: 3, choice: 'VLAN ID', reason: 'L2ネットワークを論理分割する識別子であり、外向き通信を一つのグローバルIPv4アドレスへ多重化するキーではありません。' },
  ],
  'basic-set3-11': [
    { index: 1, choice: 'そのハッシュ値を公表した相手の真正性', reason: 'ハッシュ値だけでは公表者が本物かを証明できず、真正性確認には署名など別の信頼手段が必要です。' },
    { index: 2, choice: 'ファイル内容の機密性', reason: 'ハッシュは一方向の要約値で、ファイル本体を暗号化して第三者から読めなくする仕組みではありません。' },
    { index: 3, choice: '改ざん前のファイル内容の復元', reason: 'ハッシュ値から元データを復元することは目的ではなく、比較によって変更有無を確認する用途です。' },
  ],
  'basic-set3-12': [
    { index: 1, choice: 'ネットワーク層のファイアウォールだけで送信元IPとポートを制御する', reason: '通信先の制限には有効でも、許可されたHTTP通信の本文に含まれるSQLiやXSSパターンをアプリ層で判定する用途には不足します。' },
    { index: 2, choice: 'IDSで攻撃らしいHTTP通信を検知して通知するだけにする', reason: '検知には役立ちますが、設問は入口で遮断したいので、通知だけでは要件を満たしません。' },
    { index: 3, choice: 'TLS終端だけを行うリバースプロキシを置く', reason: '暗号化通信を終端できても、HTTP内容を攻撃ルールで検査・遮断する機能がなければWAFの役割を満たしません。' },
  ],
  'basic-set3-13': [
    { index: 1, choice: '出力時にHTMLエスケープだけを行う', reason: 'XSS対策には重要ですが、認証済みブラウザから意図しない状態変更要求を送らせるCSRFの直接対策ではありません。' },
    { index: 2, choice: 'SQLを全てパラメータ化クエリへ変更する', reason: 'SQLインジェクション対策には有効ですが、正規の送金URLへ偽リクエストを送らせるCSRFは防げません。' },
    { index: 3, choice: 'Content-Security-Policyだけを厳格化する', reason: '主にスクリプト等の読み込み制御でXSS被害を抑える仕組みで、CSRF要求の正当性検証を直接代替しません。' },
  ],
  'basic-set3-20': [
    { index: 1, choice: '採用予定バージョンに既知の脆弱性がないか', reason: '安全性確認として重要ですが、配布時の表示義務やソース提供義務など法的・契約上の条件を判断する情報ではありません。' },
    { index: 2, choice: '性能ベンチマークが自社要件を満たすか', reason: '技術選定には必要でも、OSSの再配布に伴うライセンス義務を確認する代わりにはなりません。' },
    { index: 3, choice: '保守が継続していて最新版が公開されているか', reason: '運用リスク評価には有用ですが、製品へ組み込んで配布できる条件や表示義務を決めるのはライセンスです。' },
  ],
};

export function refineBasicQuestions(questions: readonly Question[]): Question[] {
  return questions.map((question) => {
    const questionPatches = patches[question.id];
    if (!questionPatches) return question;

    const choices = [...question.choices];
    const choiceReasons = [...question.choiceReasons];
    for (const patch of questionPatches) {
      choices[patch.index] = patch.choice;
      choiceReasons[patch.index] = `不正解。${patch.reason}`;
    }
    return { ...question, choices, choiceReasons };
  });
}
