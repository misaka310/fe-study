import type { Question, Subject } from '../../domain/types';

export interface QuestionSeed {
  id: string;
  topic: string;
  stem: string;
  answer: string;
  why: string;
  wrong: [choice: string, reason: string][];
  position: 0 | 1 | 2 | 3;
  difficulty: 1 | 2 | 3;
  code?: string;
}

export interface ConceptCard {
  term: string;
  clue: string;
  topic?: string;
  difficulty?: 1 | 2 | 3;
}

export function makeQuestions(
  subject: Subject,
  domain: string,
  materialId: string,
  seeds: QuestionSeed[],
): Question[] {
  return seeds.map((seed) => {
    if (seed.wrong.length !== 3) throw new Error(`${seed.id}: 誤答は3件必要です`);
    const entries: [string, string, boolean][] = seed.wrong.map(([choice, reason]) => [choice, reason, false]);
    entries.splice(seed.position, 0, [seed.answer, seed.why, true]);
    return {
      id: seed.id,
      subject,
      domain,
      topic: seed.topic,
      stem: seed.stem,
      choices: entries.map(([choice]) => choice),
      correct: entries.flatMap(([, , correct], index) => (correct ? [index] : [])),
      explanation: /条件|決め手|要件/.test(seed.why) ? seed.why : `この問題の決め手は、設問の条件にあります。${seed.why}`,
      choiceReasons: entries.map(([, reason]) => reason),
      materialId,
      difficulty: seed.difficulty,
      ...(seed.code ? { code: seed.code } : {}),
    };
  });
}

const conceptStems = [
  (clue: string) => `次の説明に該当する情報技術上の用語として、最も適切なものはどれか。${clue}`,
  (clue: string) => `ある担当者が技術要素を整理している。次の性質を表す概念はどれか。${clue}`,
  (clue: string) => `システムの設計資料に次の説明を記載する場合、見出しに置く用語はどれか。${clue}`,
  (clue: string) => `基本情報技術者として次の特徴を正しく分類するとき、該当する選択肢はどれか。${clue}`,
];

export function makeConceptQuestions(
  subject: Subject,
  domain: string,
  materialId: string,
  prefix: string,
  cards: ConceptCard[],
): Question[] {
  if (cards.length < 5) throw new Error(`${prefix}: 概念カードは5件以上必要です`);
  return cards.map((card, index) => {
    const wrongCards = [1, 3, 5].map((offset) => cards[(index + offset) % cards.length]);
    const seed: QuestionSeed = {
      id: `${prefix}-${String(index + 1).padStart(3, '0')}`,
      topic: card.topic ?? card.term,
      stem: conceptStems[index % conceptStems.length](card.clue),
      answer: card.term,
      why: `${card.term}は「${card.clue}」を表す用語であり、設問の特徴を全て満たします。`,
      wrong: wrongCards.map((wrong) => [
        wrong.term,
        `${wrong.term}は「${wrong.clue}」を表すため、設問で示された特徴とは一致しません。`,
      ]),
      position: (index % 4) as 0 | 1 | 2 | 3,
      difficulty: card.difficulty ?? (index % 5 === 4 ? 2 : 1),
    };
    return makeQuestions(subject, domain, materialId, [seed])[0];
  });
}
