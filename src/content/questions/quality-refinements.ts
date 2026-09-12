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
