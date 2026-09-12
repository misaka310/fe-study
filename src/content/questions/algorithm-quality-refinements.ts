import type { Question } from '../../domain/types';

interface AlgorithmPatch {
  stem?: string;
  explanation?: string;
  correctChoice?: string;
  correctReason?: string;
  choices: readonly { index: number; choice: string; reason: string }[];
}

const patches: Record<string, AlgorithmPatch> = {
  'b-algorithm-009': {
    stem: '会員番号の配列を先頭から調べる。2番目の要素を調べ終えた時点、3番目を調べ終えた時点、最終返却時点の found の値をこの順に並べたものはどれか。次の擬似言語を追跡する。',
    explanation: '決め手はfoundの更新時点です。2番目の21まではfalse、3番目の34でtrueになり、その後はtrueのままなので(false, true, true)です。',
    correctChoice: '(false, true, true)',
    correctReason: '2番目までは一致せずfalse、3番目の34でtrueへ変わり、その後はtrueのまま返却されます。',
    choices: [
      { index: 1, choice: '(false, false, false)', reason: '3番目の34が一致した時点でfoundはtrueへ更新されるため、その後もfalseのままにはなりません。' },
      { index: 2, choice: '(true, true, true)', reason: 'foundの初期値はfalseであり、3番目の34を見るまではtrueになりません。' },
      { index: 3, choice: '(false, true, false)', reason: '一度trueへ更新されたfoundをfalseへ戻す処理はないため、最終返却時もtrueです。' },
    ],
  },
  'b-algorithm-030': {
    stem: '探索値23を番兵として末尾へ追加した線形探索について、ループ停止時の添字 i と、返却式 i <= 4 の値の組として最も適切なものはどれか。次の擬似言語を追跡する。',
    explanation: '決め手は23が元の4要素にはなく、追加した5番目の番兵で初めて一致する点です。停止時i=5で、5<=4はfalseなので(5, false)です。',
    correctChoice: '(5, false)',
    correctReason: '23は追加した5番目の番兵で初めて一致し、停止時i=5、返却式5<=4はfalseです。',
    choices: [
      { index: 0, choice: '(4, true)', reason: '4番目の値16は23と一致しないため、i=4では停止しません。' },
      { index: 2, choice: '(5, true)', reason: '停止位置は5ですが、5<=4はfalseなので真偽値の評価が誤っています。' },
      { index: 3, choice: '(4, false)', reason: '返却値の方向はfalseですが、ループは4番目では停止せず番兵の5番目まで進みます。' },
    ],
  },
  'b-algorithm-042': {
    choices: [
      { index: 0, choice: 'ボトムアップ法', reason: '小さい部分問題から表を埋める方法なら重複計算を避けられますが、提示コードは再帰呼出し結果をmemoへ保存して再利用するトップダウン方式です。' },
      { index: 2, choice: '単純再帰', reason: '結果を保存しない単純再帰では同じ引数の部分問題を繰り返し計算します。提示コードにはmemo参照と保存があります。' },
      { index: 3, choice: '分割統治法', reason: '部分問題を分割して独立に解く考え方ですが、同じ部分問題の結果をキャッシュして再利用する処理を指す名称ではありません。' },
    ],
  },
};

export function strengthenAlgorithmDistractors(questions: readonly Question[]): Question[] {
  return questions.map((question) => {
    const patch = patches[question.id];
    if (!patch) return question;

    const choices = [...question.choices];
    const choiceReasons = [...question.choiceReasons];
    const correctIndex = question.correct[0];
    if (patch.correctChoice) choices[correctIndex] = patch.correctChoice;
    if (patch.correctReason) choiceReasons[correctIndex] = patch.correctReason;

    for (const choicePatch of patch.choices) {
      if (question.correct.includes(choicePatch.index)) {
        throw new Error(`${question.id}: 正答位置をアルゴリズム品質パッチで変更できません`);
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
