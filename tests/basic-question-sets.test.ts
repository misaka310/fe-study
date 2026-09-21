import { describe, expect, it } from 'vitest';
import { vocabularyQuestions } from '../src/content/vocabulary';

const definitionOnlyPatterns = [
  /^次の意味・役割を表す用語はどれか。/,
  /次の説明に該当する情報技術上の用語として、最も適切なものはどれか/,
  /次の性質を表す概念はどれか/,
  /見出しに置く用語はどれか/,
  /次の特徴を正しく分類するとき、該当する選択肢はどれか/,
];

describe('基本問題 20問×6セット', () => {
  it('120問を6セットに20問ずつ収録する', () => {
    expect(vocabularyQuestions).toHaveLength(120);
    for (const set of [1, 2, 3, 4, 5, 6]) {
      expect(vocabularyQuestions.filter((question) => question.vocabularySet === set)).toHaveLength(20);
    }
  });

  it('単純な用語当てではなくFE科目A相当の知識判断問題にする', () => {
    for (const question of vocabularyQuestions) {
      expect(question.subject).toBe('A');
      expect(question.domain).not.toBe('vocabulary');
      for (const pattern of definitionOnlyPatterns) expect(question.stem, question.id).not.toMatch(pattern);
      expect(question.stem.length, question.id).toBeGreaterThanOrEqual(28);
      expect(question.choices).toHaveLength(4);
      expect(question.correct).toHaveLength(1);
      expect(question.choiceReasons).toHaveLength(4);
      expect(question.choiceReasons.every((reason) => reason.length >= 12), question.id).toBe(true);
      expect(question.explanation.length, question.id).toBeGreaterThanOrEqual(28);
      expect(question.difficulty, question.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('各セットで主要9分野と難易度3を扱い、同じ問題や選択肢セットを使い回さない', () => {
    const stems = new Set<string>();
    const choiceSets = new Set<string>();
    for (const set of [1, 2, 3, 4, 5, 6]) {
      const setQuestions = vocabularyQuestions.filter((question) => question.vocabularySet === set);
      expect(new Set(setQuestions.map((question) => question.domain)).size).toBe(9);
      expect(setQuestions.filter((question) => question.difficulty === 3).length).toBeGreaterThanOrEqual(4);
      for (const question of setQuestions) {
        expect(stems.has(question.stem), question.id).toBe(false);
        stems.add(question.stem);
        const key = [...question.choices].sort().join('\n');
        expect(choiceSets.has(key), question.id).toBe(false);
        choiceSets.add(key);
      }
    }
  });

  it('誤答も同じ論点・比較軸で迷える現実的な選択肢にする', () => {
    const sqlInjection = vocabularyQuestions.find((question) => question.id === 'basic-set1-14');
    expect(sqlInjection).toBeDefined();
    expect(sqlInjection?.choices).toEqual([
      '入力値をプレースホルダへ渡すパラメータ化クエリを使う',
      '危険そうな文字だけを独自ルールで置換してから文字列連結する',
      'WAFでSQLインジェクションらしい要求を遮断し、アプリ側の文字列連結はそのままにする',
      '入力値を正規表現で検査した後、エスケープせずSQL文へ文字列連結する',
    ]);

    const outerJoin = vocabularyQuestions.find((question) => question.id === 'basic-set2-07');
    expect(outerJoin?.choices).toEqual([
      '顧客表を左側にしたLEFT OUTER JOIN',
      '顧客表を左側にしたINNER JOIN',
      '顧客表を左側にしたRIGHT OUTER JOIN',
      '顧客表と注文表のCROSS JOIN',
    ]);

    const unrelatedDistractors = [
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
    ];
    for (const question of vocabularyQuestions) {
      for (const choice of question.choices) {
        for (const pattern of unrelatedDistractors) expect(choice, `${question.id}: ${choice}`).not.toMatch(pattern);
      }
    }
  });
});
