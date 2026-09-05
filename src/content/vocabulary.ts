import type { Question } from '../domain/types';
import { conceptQuestions } from './questions/a-concepts';
import { supplementQuestions } from './questions/a-supplement';
import { theoryQuestions } from './questions/a-theory';

type BasicSet = 1 | 2 | 3 | 4 | 5;

const BASIC_SETS: readonly BasicSet[] = [1, 2, 3, 4, 5];

// 科目Aの主要9分野を毎セットに含める。セキュリティは出題範囲が広いため4問、
// それ以外は2問ずつにして、1セット20問にする。
const DOMAIN_PLAN = [
  { domain: 'theory', perSet: 2 },
  { domain: 'computer', perSet: 2 },
  { domain: 'software', perSet: 2 },
  { domain: 'database', perSet: 2 },
  { domain: 'network', perSet: 2 },
  { domain: 'security', perSet: 4 },
  { domain: 'development', perSet: 2 },
  { domain: 'management', perSet: 2 },
  { domain: 'strategy', perSet: 2 },
] as const;

const subjectAQuestions = [...theoryQuestions, ...conceptQuestions, ...supplementQuestions]
  .filter((question) => question.subject === 'A');

/**
 * 旧「基礎単語」カードは使わない。
 * 既存の独自科目A問題バンクから、分野ごとに重複しない問題を取り出して
 * 20問×5セットの「基本問題」として再構成する。
 *
 * IDは専用に振り直し、通常演習の履歴と基本問題の履歴を混ぜない。
 */
export const vocabularyQuestions = Object.freeze(BASIC_SETS.flatMap((set) => {
  let sequence = 0;

  return DOMAIN_PLAN.flatMap(({ domain, perSet }) => {
    const domainQuestions = subjectAQuestions.filter((question) => question.domain === domain);
    const start = (set - 1) * perSet;
    const selected = domainQuestions.slice(start, start + perSet);

    if (selected.length !== perSet) {
      throw new Error(`基本問題セットを構成できません: ${domain} に必要な問題数がありません`);
    }

    return selected.map((question): Question => {
      sequence += 1;
      return {
        ...question,
        id: `basic-set${set}-${String(sequence).padStart(2, '0')}`,
        practiceKind: 'vocabulary',
        vocabularySet: set,
      };
    });
  });
}));
