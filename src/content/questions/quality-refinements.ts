import type { Question } from '../../domain/types';

interface ChoicePatch {
  index: number;
  choice: string;
  reason: string;
}

interface QuestionPatch {
  stem?: string;
  explanation?: string;
  correctChoice?: string;
  correctReason?: string;
  choices?: readonly ChoicePatch[];
}

const patches: Record<string, QuestionPatch> = {
  'a-theory-005': {
    stem: 'A=1、B=0のとき、(A XOR B)、(NOT B)、(A XOR B) AND (NOT B) の3値をこの順に並べたものはどれか。',
    explanation: '決め手は各演算を順に追うことです。A XOR Bは1、NOT Bも1、その二つのANDも1なので(1, 1, 1)です。',
    correctChoice: '(1, 1, 1)',
    correctReason: 'A XOR Bは1、NOT Bは1、その二つのANDも1なので、3値は(1, 1, 1)です。',
    choices: [
      { index: 0, choice: '(1, 0, 0)', reason: 'B=0なのでNOT Bは1です。NOTの反転を落とした追跡になっています。' },
      { index: 1, choice: '(0, 1, 0)', reason: 'A=1とB=0は異なるためA XOR Bは1です。XORを同値判定のように扱った結果です。' },
      { index: 3, choice: '(1, 1, 0)', reason: '二つの中間値がどちらも1なら最後のANDも1です。最終演算だけを誤っています。' },
    ],
  },
  'a-theory-010': {
    choices: [
      { index: 3, choice: '-3ビット', reason: 'log2(1/8)は-3ですが、自己情報量では先頭のマイナスを付けて正の3ビットにします。' },
    ],
  },
  'a-theory-011': {
    stem: '記号ごとの出現頻度を基に、頻度が最小の二つのノードを繰り返し統合して接頭語木を作り、頻度の高い記号ほど短い符号になりやすくする方式はどれか。',
    explanation: '決め手は、最小頻度の二つを繰り返し統合して木を作る手順です。この方法で最適な接頭語符号を構成する代表的な方式がハフマン符号です。',
    choices: [
      { index: 1, choice: 'シャノン・ファノ符号', reason: '頻度を使う可変長符号ですが、頻度順の集合を上位から分割して構成する方式で、最小二ノードを下位から統合する手順とは異なります。' },
      { index: 2, choice: '算術符号', reason: '記号列全体を確率に応じた区間へ対応付けて表現する方式で、二ノードを繰り返し統合して接頭語木を作る方式ではありません。' },
      { index: 3, choice: 'LZ77', reason: '既出の文字列を距離と長さなどで参照する辞書型圧縮で、記号頻度から二分木を作る方式ではありません。' },
    ],
  },
  'a-theory-016': {
    choices: [
      { index: 3, choice: 'ワーシャル・フロイド法', reason: '全頂点対の最短経路を求める代表的手法で、単一始点からの非負重み最短経路という設問の条件とは対象範囲が異なります。' },
    ],
  },
  'a-theory-017': {
    choices: [
      { index: 0, choice: 'CRC', reason: '生成多項式による複数ビットの検査値を付加する方式で、1ビットだけの検査情報を使う方式ではありません。' },
      { index: 1, choice: 'ハミング符号', reason: '複数の検査ビットを配置して誤り位置の特定や訂正まで行える方式で、1ビットの検査情報だけを使う条件とは異なります。' },
      { index: 2, choice: 'チェックサム', reason: 'データを一定単位で加算するなどして検査値を作る方式で、奇数個のビット反転を1検査ビットで判定する方式ではありません。' },
    ],
  },
  'a-supp-005': {
    stem: 'ファイルパスの指定方法について、絶対パスの説明として最も適切なものはどれか。',
    explanation: '決め手は現在の作業位置に依存せず、ファイルシステムのルートを起点に目的位置までを指定することです。',
    correctChoice: 'ルートディレクトリを起点に、目的ファイルまでの全経路を記述する',
    correctReason: '現在の作業ディレクトリに依存せず、ルートから完全な経路を指定するので絶対パスの説明です。',
    choices: [
      { index: 1, choice: '現在の作業ディレクトリを起点に、目的ファイルまでの経路を記述する', reason: '現在位置を基準にする指定は相対パスで、ルートからの完全な指定ではありません。' },
      { index: 2, choice: '親ディレクトリを表す「..」を起点に、目的ファイルまでの経路を記述する', reason: '親ディレクトリ記号を現在位置から解釈するため相対指定であり、ルート起点の絶対パスではありません。' },
      { index: 3, choice: '別のパスを指すシンボリックリンクを作成し、そのリンク名だけを記述する', reason: 'リンクは参照先を間接指定する仕組みで、ルートからの完全な経路を記述する絶対パスの定義ではありません。' },
    ],
  },
  'a-supp-006': {
    choices: [
      { index: 3, choice: 'HAVING句', reason: 'GROUP BY後の集約結果へ条件を指定する用途で使う句で、通常の行を集約前に絞り込むWHERE句とは適用段階が異なります。' },
    ],
  },
  'a-supp-008': {
    choices: [
      { index: 0, choice: 'ルータはMACアドレス、L2スイッチはIPアドレスを主に使って転送先を決める', reason: '判断に使う情報が逆です。ルータはIP、L2スイッチはMACアドレスを主に使います。' },
      { index: 1, choice: 'ルータもL2スイッチもIPアドレスを使い、違いは転送速度だけである', reason: 'L2スイッチは基本的にMACアドレスでフレームを転送するため、違いを速度だけにはできません。' },
      { index: 2, choice: 'ルータは異なるネットワーク間を中継し、L2スイッチもルーティングテーブルで別ネットワークへ中継する', reason: '前半は正しいですが、通常のL2スイッチはルーティングテーブルで別IPネットワークへ中継する装置ではありません。' },
    ],
  },
  'a-supp-009': {
    choices: [
      { index: 1, choice: '共通鍵暗号は同じ鍵を使うが、公開鍵暗号は公開鍵だけで暗号化と復号の両方を行う', reason: '公開鍵暗号では公開鍵と秘密鍵の対を使い分けるため、公開鍵だけで両方を行う説明は誤りです。' },
      { index: 2, choice: '共通鍵暗号は事前の鍵共有が不要で、公開鍵暗号は同じ秘密鍵を双方で事前共有する', reason: '鍵共有上の特徴が逆です。共通鍵暗号では安全な共通鍵共有が課題になり、公開鍵暗号は公開鍵を公開できます。' },
      { index: 3, choice: '公開鍵暗号は共通鍵暗号より一般に高速なので、大量データ本体の暗号化へ優先して使う', reason: '一般には共通鍵暗号の方が高速で、大量データ本体には共通鍵暗号を使う構成が適します。' },
    ],
  },
  'a-supp-011': {
    choices: [
      { index: 0, choice: 'LOC法', reason: 'ソースコード行数を規模尺度にする方法で、利用者から見た入出力などの機能数を点数化する方法ではありません。' },
      { index: 1, choice: 'COCOMO', reason: '主にソフトウェア規模などを入力として工数や期間を見積もるモデルで、機能数そのものを数えて規模化する方法ではありません。' },
      { index: 3, choice: '類推見積法', reason: '過去の類似案件を基に規模や工数を見積もる方法で、入出力やファイルなどを機能点へ換算する方法ではありません。' },
    ],
  },
  'a-supp-012': {
    choices: [
      { index: 2, choice: 'BAC（完了時総予算）', reason: 'BACはプロジェクト全体について承認された総予算で、ある時点までに計画上完了しているべき作業の価値であるPVとは異なります。' },
    ],
  },
  'a-supp-013': {
    choices: [
      { index: 1, choice: '差分バックアップは、直前に取得したバックアップ以降の変更分だけを保存する', reason: 'これは増分バックアップの説明です。差分は直前のフルバックアップ以降の変更分を保存します。' },
      { index: 2, choice: '差分バックアップの復元には、フルバックアップとその後の全ての差分バックアップが必要である', reason: '差分は各回が直前のフル以降の変更を含むため、復元には基準フルと最新差分があれば足ります。' },
      { index: 3, choice: 'フルバックアップは変更されたデータだけを保存するため、差分バックアップより取得時間が短い', reason: 'フルは対象データ全体を保存します。変更分だけを対象にするという説明はフルバックアップの特徴ではありません。' },
    ],
  },
  'a-supp-015': {
    choices: [
      { index: 0, choice: '労働者派遣では派遣元だけが日常の作業指示を行い、請負では発注者が請負業者の労働者へ直接指示する', reason: '指揮命令関係が逆です。派遣では派遣先が業務上の指揮命令を行えますが、請負では発注者が請負業者の労働者へ直接指示しません。' },
      { index: 1, choice: '労働者派遣と請負のどちらでも発注者が直接指揮命令でき、違いは成果物の有無だけである', reason: '請負で発注者が請負業者の労働者へ直接指揮命令することを前提にはできず、指揮命令関係は重要な相違点です。' },
      { index: 3, choice: '労働者派遣と請負のどちらでも発注者は直接指揮命令できず、違いは契約期間だけである', reason: '派遣では派遣先による業務上の指揮命令が認められるため、両者とも直接指示できないという説明は誤りです。' },
    ],
  },
  'b-security-004': {
    choices: [
      { index: 0, choice: '入力値を許可リストで検証するが、SQL文は文字列連結のまま組み立てる', reason: '入力検証は防御層になりますが、SQL構造と値が分離されず、根本原因である文字列連結が残ります。' },
      { index: 1, choice: 'DBアカウントの権限を必要最小限にするが、SQL文の組立て方は変更しない', reason: '被害範囲の限定には有効でも、入力値がSQL構造へ混入する脆弱性そのものは解消しません。' },
      { index: 2, choice: 'WAFでSQLインジェクションらしい要求を遮断し、アプリ側のSQL文字列連結は残す', reason: 'WAFは補助的な防御として有効でも回避される可能性があり、脆弱なSQL組立てを直す根本対策にはなりません。' },
    ],
  },
  'b-security-005': {
    choices: [
      { index: 1, choice: 'パスワードの最小文字数だけを増やし、認証要素はパスワード一つのままにする', reason: '新規推測への耐性は上げられても、既に漏えいした正しいパスワードだけでログインできる状態は残ります。' },
      { index: 2, choice: 'ログイン失敗回数の制限だけを追加し、第二の認証要素は導入しない', reason: '総当たり攻撃には有効ですが、漏えいした正しいパスワードを使う不正ログインへの追加確認にはなりません。' },
      { index: 3, choice: '利用者名を推測しにくい形式へ変更し、パスワード認証自体はそのままにする', reason: '識別子を推測しにくくしても、利用者名とパスワードが漏えいしている場合の本人確認強化には不足します。' },
    ],
  },
  'b-security-006': {
    choices: [
      { index: 0, choice: '委託先がISO/IEC 27001認証を持つことだけ確認し、事故報告や再委託条件は契約で定めない', reason: '認証取得は参考になりますが、個別契約で必要な責任分界・事故報告・再委託条件を定める代わりにはなりません。' },
      { index: 1, choice: '秘密保持契約だけ締結し、安全管理策の実施状況や監査方法は確認しない', reason: '秘密保持義務だけでは、委託先が実施すべき技術的・組織的な安全管理策の実効性を確認できません。' },
      { index: 3, choice: '安全管理策を口頭で確認し、責任分界や事故時連絡はサービス開始後に調整する', reason: '重要な責任分界と事故対応を開始前に合意できず、問題発生時の対応が不明確なままになります。' },
    ],
  },
  'b-security-007': {
    choices: [
      { index: 0, choice: '認証失敗の送信元IPだけを確認し、成功後の操作ログは調べない', reason: '侵入元の手掛かりは得られても、成功した管理者セッションで何が行われたかを把握できず影響範囲を判断できません。' },
      { index: 2, choice: '管理者パスワードの変更だけを行い、成功後の操作履歴の確認は省略する', reason: '追加利用の抑止には役立ちますが、既に実行された操作や侵害範囲の確認が欠けます。' },
      { index: 3, choice: '認証失敗件数と成功件数を別々に集計し、時系列の相関は取らない', reason: '個別集計だけでは、多数失敗の直後に同じ送信元や対象で成功したという攻撃の流れを結び付けられません。' },
    ],
  },
  'b-security-009': {
    choices: [
      { index: 1, choice: '影響対象を確認する前に、全ての公開サーバへ修正プログラムを一斉適用する', reason: '対象外システムまで変更し、互換性や停止影響を評価しないため、緊急性があっても安全な展開手順として不足します。' },
      { index: 2, choice: '暫定的な緩和策だけを恒久対応として運用し、正式な修正プログラムは評価しない', reason: '短期的に悪用リスクを下げられても、脆弱性自体を解消する正式修正を評価・適用する工程が欠けます。' },
      { index: 3, choice: '対象資産と影響は確認するが、検証環境を通さず本番へ修正プログラムを直接適用する', reason: '対象特定はできても、互換性や副作用を確認せず本番変更するため、安定運用との両立ができません。' },
    ],
  },
  'b-security-010': {
    choices: [
      { index: 0, choice: '退職予定者のアカウントを直ちに無効化するが、送信ログや端末証拠を保全せず調査を開始する', reason: '追加流出の抑止には有効でも、事実関係や流出範囲を確認するための証拠保全が欠けます。' },
      { index: 1, choice: '証拠保全を優先し、調査完了まで当該利用者の権限と外部通信をそのまま維持する', reason: '証拠保全は必要ですが、追加持出しを防ぐ権限制御・通信制御も並行して行う必要があります。' },
      { index: 3, choice: '本人への聞き取りを先に行い、その後でログと端末の証拠保全を始める', reason: '聞き取り前に客観的証拠を保全しないと、ログ消失や端末状態変化で調査可能性を損なうおそれがあります。' },
    ],
  },
};

export function strengthenQuestionDistractors(questions: readonly Question[]): Question[] {
  return questions.map((question) => {
    const patch = patches[question.id];
    if (!patch) return question;

    const choices = [...question.choices];
    const choiceReasons = [...question.choiceReasons];
    const correctIndex = question.correct[0];
    if (patch.correctChoice) choices[correctIndex] = patch.correctChoice;
    if (patch.correctReason) choiceReasons[correctIndex] = patch.correctReason;

    for (const choicePatch of patch.choices ?? []) {
      if (question.correct.includes(choicePatch.index)) {
        throw new Error(`${question.id}: 正答位置を品質パッチで変更できません`);
      }
      choices[choicePatch.index] = choicePatch.choice;
      choiceReasons[choicePatch.index] = `不正解。${choicePatch.reason}`;
    }

    return {
      ...question,
      ...(patch.stem ? { stem: patch.stem } : {}),
      ...(patch.explanation ? { explanation: patch.explanation } : {}),
      choices,
      choiceReasons,
    };
  });
}
