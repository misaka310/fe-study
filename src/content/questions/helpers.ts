import type { Question, Subject } from '../../domain/types';
import { conceptConfusionGroups } from './concept-confusion-groups';
import { conceptDistractorOverrides } from './concept-distractor-overrides';

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
    const choiceTexts = [seed.answer, ...seed.wrong.map(([choice]) => choice)];
    if (new Set(choiceTexts).size !== 4) throw new Error(`${seed.id}: 選択肢は重複できません`);

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

function normalizeForSimilarity(value: string) {
  return value
    .replace(/[\s、。・/＋+()（）「」『』,:：・]/g, '')
    .toLocaleLowerCase('ja-JP');
}

function bigrams(value: string) {
  const normalized = normalizeForSimilarity(value);
  return new Set(Array.from({ length: Math.max(0, normalized.length - 1) }, (_, index) => normalized.slice(index, index + 2)));
}

function textSimilarity(left: string, right: string) {
  const a = bigrams(left);
  const b = bigrams(right);
  if (a.size === 0 || b.size === 0) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / new Set([...a, ...b]).size;
}

function pickNearbyConcepts(cards: ConceptCard[], index: number, prefix: string) {
  const source = cards[index];
  const group = conceptConfusionGroups[prefix]?.find((terms) => terms.includes(source.term));
  if (!group) {
    throw new Error(`${prefix}/${source.term}: 混同候補グループまたは明示オーバーライドが必要です`);
  }

  const candidates = cards
    .map((candidate, candidateIndex) => ({ candidate, candidateIndex }))
    .filter(({ candidate, candidateIndex }) => candidateIndex !== index && group.includes(candidate.term));
  if (candidates.length < 3) {
    throw new Error(`${prefix}/${source.term}: 混同候補は3件以上必要です`);
  }

  const sourceText = `${source.term} ${source.clue}`;
  return candidates
    .map(({ candidate, candidateIndex }) => ({
      candidate,
      candidateIndex,
      similarity: textSimilarity(sourceText, `${candidate.term} ${candidate.clue}`),
      distance: Math.abs(candidateIndex - index),
    }))
    .sort((left, right) => (
      right.similarity - left.similarity
      || left.distance - right.distance
      || left.candidateIndex - right.candidateIndex
    ))
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

export function makeConceptQuestions(
  subject: Subject,
  domain: string,
  materialId: string,
  prefix: string,
  cards: ConceptCard[],
): Question[] {
  if (cards.length < 5) throw new Error(`${prefix}: 概念カードは5件以上必要です`);
  return cards.map((card, index) => {
    const override = conceptDistractorOverrides[card.term];
    const nearby = override ? [] : pickNearbyConcepts(cards, index, prefix);
    const wrong: [string, string][] = override
      ? override.map(({ term, reason }): [string, string] => [term, reason])
      : nearby.map((candidate): [string, string] => [
        candidate.term,
        `${candidate.term}は「${candidate.clue}」を表すため、設問の役割・目的・処理段階とは一致しません。`,
      ]);

    const seed: QuestionSeed = {
      id: `${prefix}-${String(index + 1).padStart(3, '0')}`,
      topic: card.topic ?? card.term,
      stem: conceptStems[index % conceptStems.length](card.clue),
      answer: card.term,
      why: `${card.term}は「${card.clue}」を表す用語であり、設問の特徴を全て満たします。`,
      wrong,
      position: (index % 4) as 0 | 1 | 2 | 3,
      difficulty: card.difficulty ?? (index % 5 === 4 ? 2 : 1),
    };
    return makeQuestions(subject, domain, materialId, [seed])[0];
  });
}
