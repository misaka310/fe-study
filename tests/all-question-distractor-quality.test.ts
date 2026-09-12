import { describe, expect, it } from 'vitest';
import { vocabularyQuestions } from '../src/content/vocabulary';
import { questions } from '../src/content/questions';
import { conceptConfusionGroups } from '../src/content/questions/concept-confusion-groups';
import { conceptDistractorOverrides } from '../src/content/questions/concept-distractor-overrides';

const allQuestions = [...questions, ...vocabularyQuestions];
const conceptQuestionPattern = /^a-(computer|software|database|network|security|development|management|strategy)-\d{3}$/;

const unrelatedFillerPatterns = [
  /画面のリフレッシュレート/,
  /キーボード配列/,
  /ファイル名の拡張子/,
  /CPU温度/,
  /サーバラックの色/,
  /作者の好きな色/,
  /開発PCの壁紙/,
  /異なる文字コード/,
  /画像を自動圧縮/,
  /テーブル名を短い名前/,
  /列名を変更/,
  /全列を一つの文字列/,
  /ページサイズを必ず1バイト/,
  /主記憶が不要/,
  /割込みが完全になくなる/,
  /ファイル名を連番/,
  /データベースの列名を短く/,
  /HTTPレスポンスをgzip圧縮/,
  /背景画像を毎月変更/,
  /入力欄の表示幅/,
  /文字色だけ/,
  /検索欄の横幅/,
];

describe('全問題バンクの選択肢品質', () => {
  it('通常217問と基本100問の合計317問を同じ監査対象にする', () => {
    expect(questions).toHaveLength(217);
    expect(vocabularyQuestions).toHaveLength(100);
    expect(allQuestions).toHaveLength(317);
  });

  it('設問と無関係な埋め草を317問の選択肢へ入れない', () => {
    for (const question of allQuestions) {
      for (const choice of question.choices) {
        for (const pattern of unrelatedFillerPatterns) {
          expect(choice, `${question.id}: ${choice}`).not.toMatch(pattern);
        }
      }
    }
  });

  it('全317問で選択肢重複と理由欠落を許さない', () => {
    for (const question of allQuestions) {
      expect(new Set(question.choices).size, question.id).toBe(question.choices.length);
      expect(question.choiceReasons).toHaveLength(question.choices.length);
      expect(question.choiceReasons.every((reason) => reason.trim().length >= 10), question.id).toBe(true);
    }
  });

  it('自動生成する用語問題は混同候補グループか明示オーバーライドの中だけから誤答を選ぶ', () => {
    const conceptQuestions = questions.filter((question) => conceptQuestionPattern.test(question.id));
    expect(conceptQuestions.length).toBeGreaterThan(100);

    for (const question of conceptQuestions) {
      const correctIndex = question.correct[0];
      const correctChoice = question.choices[correctIndex];
      const wrongChoices = question.choices.filter((_, index) => index !== correctIndex);
      const override = conceptDistractorOverrides[correctChoice];

      if (override) {
        expect([...wrongChoices].sort(), question.id).toEqual(override.map(({ term }) => term).sort());
        continue;
      }

      const prefix = question.id.replace(/-\d{3}$/, '');
      const group = conceptConfusionGroups[prefix]?.find((terms) => terms.includes(correctChoice));
      expect(group, `${question.id}: ${correctChoice}`).toBeDefined();
      expect(wrongChoices.every((choice) => group?.includes(choice)), question.id).toBe(true);
    }
  });

  it('過去に簡単すぎた通常問題を同じ比較軸の選択肢へ固定する', () => {
    const booleanTrace = questions.find((question) => question.id === 'a-theory-005');
    expect(booleanTrace?.choices).toEqual(['(1, 0, 0)', '(0, 1, 0)', '(1, 1, 1)', '(1, 1, 0)']);

    const huffman = questions.find((question) => question.id === 'a-theory-011');
    expect(huffman?.choices).toEqual(['ハフマン符号', 'シャノン・ファノ符号', '算術符号', 'LZ77']);

    const errorDetection = questions.find((question) => question.id === 'a-theory-017');
    expect(errorDetection?.choices).toEqual(['CRC', 'ハミング符号', 'チェックサム', 'パリティチェック']);

    const absolutePath = questions.find((question) => question.id === 'a-supp-005');
    expect(absolutePath?.choices).toEqual([
      'ルートディレクトリを起点に、目的ファイルまでの全経路を記述する',
      '現在の作業ディレクトリを起点に、目的ファイルまでの経路を記述する',
      '親ディレクトリを表す「..」を起点に、目的ファイルまでの経路を記述する',
      '別のパスを指すシンボリックリンクを作成し、そのリンク名だけを記述する',
    ]);

    const whereClause = questions.find((question) => question.id === 'a-supp-006');
    expect(whereClause?.choices).toEqual(['ORDER BY句', 'WHERE句', 'GROUP BY句', 'HAVING句']);

    const sizing = questions.find((question) => question.id === 'a-supp-011');
    expect(sizing?.choices).toEqual(['LOC法', 'COCOMO', 'ファンクションポイント法', '類推見積法']);

    const evm = questions.find((question) => question.id === 'a-supp-012');
    expect(evm?.choices).toEqual([
      '実際に発生した費用の累計',
      '実際に完了した作業量を金額換算した価値',
      'BAC（完了時総予算）',
      '計画時点で、その時点までに完了しているべき作業に割り当てられた予算(価値)',
    ]);

    const sqlInjection = questions.find((question) => question.id === 'b-security-004');
    expect(sqlInjection?.choices).toEqual([
      '入力値を許可リストで検証するが、SQL文は文字列連結のまま組み立てる',
      'DBアカウントの権限を必要最小限にするが、SQL文の組立て方は変更しない',
      'WAFでSQLインジェクションらしい要求を遮断し、アプリ側のSQL文字列連結は残す',
      'プレースホルダを用いたパラメータ化クエリへ変更する',
    ]);

    const leakedPassword = questions.find((question) => question.id === 'b-security-005');
    expect(leakedPassword?.choices).toEqual([
      '認証アプリなどを使った多要素認証を必須にする',
      'パスワードの最小文字数だけを増やし、認証要素はパスワード一つのままにする',
      'ログイン失敗回数の制限だけを追加し、第二の認証要素は導入しない',
      '利用者名を推測しにくい形式へ変更し、パスワード認証自体はそのままにする',
    ]);

    const vendor = questions.find((question) => question.id === 'b-security-006');
    expect(vendor?.choices).toContain('委託先がISO/IEC 27001認証を持つことだけ確認し、事故報告や再委託条件は契約で定めない');

    const logMonitoring = questions.find((question) => question.id === 'b-security-007');
    expect(logMonitoring?.choices).toContain('認証失敗の送信元IPだけを確認し、成功後の操作ログは調べない');

    const vulnerability = questions.find((question) => question.id === 'b-security-009');
    expect(vulnerability?.choices).toContain('対象資産と影響は確認するが、検証環境を通さず本番へ修正プログラムを直接適用する');

    const exfiltration = questions.find((question) => question.id === 'b-security-010');
    expect(exfiltration?.choices).toContain('証拠保全を優先し、調査完了まで当該利用者の権限と外部通信をそのまま維持する');
  });

  it('プログラム問題は同じ返却型・同じ追跡軸で迷える選択肢にする', () => {
    const booleanTrace = questions.find((question) => question.id === 'b-algorithm-009');
    expect(booleanTrace?.choices).toEqual([
      '(false, true, true)',
      '(false, false, false)',
      '(true, true, true)',
      '(false, true, false)',
    ]);

    const sentinel = questions.find((question) => question.id === 'b-algorithm-030');
    expect(sentinel?.choices).toEqual(['(4, true)', '(5, false)', '(5, true)', '(4, false)']);

    const memoization = questions.find((question) => question.id === 'b-algorithm-042');
    expect(memoization?.choices).toEqual(['ボトムアップ法', 'メモ化', '単純再帰', '分割統治法']);
  });

  it('用語問題の孤立概念は明示した近接概念で比較させる', () => {
    const dma = questions.find((question) => question.id === 'a-computer-012');
    expect(dma?.choices).toEqual(['割込み駆動I/O', 'ポーリングI/O', 'メモリマップドI/O', 'DMA']);

    const raid1 = questions.find((question) => question.id === 'a-computer-014');
    expect(raid1?.choices).toEqual(['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6']);

    const mtbf = questions.find((question) => question.id === 'a-computer-018');
    expect(mtbf?.choices).toEqual(['MTTR', 'MTBF', 'MTTF', '稼働率']);

    const firstNormalForm = questions.find((question) => question.id === 'a-database-003');
    expect(firstNormalForm?.choices).toEqual(['第1正規形', '第2正規形', '第3正規形', 'BCNF']);

    const osi = questions.find((question) => question.id === 'a-network-001');
    expect(osi?.choices).toEqual(['OSI基本参照モデル', 'TCP/IPモデル', '5層インターネットモデル', 'DoDモデル']);

    const riskTransfer = questions.find((question) => question.id === 'a-management-004');
    expect(riskTransfer?.choices).toEqual(['リスク回避', 'リスク低減', 'リスク受容', 'リスク移転']);

    const patent = questions.find((question) => question.id === 'a-strategy-013');
    expect(patent?.choices).toEqual(['特許権', '実用新案権', '意匠権', '商標権']);
  });

  it('基本問題側の外部結合も同じ比較軸を維持する', () => {
    const outerJoin = vocabularyQuestions.find((question) => question.id === 'basic-set2-07');
    expect(outerJoin?.choices).toEqual([
      '顧客表を左側にしたLEFT OUTER JOIN',
      '顧客表を左側にしたINNER JOIN',
      '顧客表を左側にしたRIGHT OUTER JOIN',
      '顧客表と注文表のCROSS JOIN',
    ]);
  });
});
