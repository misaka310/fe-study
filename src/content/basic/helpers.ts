import type { Question } from '../../domain/types';

export type BasicSet = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type BasicChoice = readonly [text: string, reason: string];

export interface BasicQuestionSeed {
  domain: 'theory' | 'computer' | 'software' | 'database' | 'network' | 'security' | 'development' | 'management' | 'strategy';
  materialId: string;
  topic: string;
  stem: string;
  choices: readonly [BasicChoice, BasicChoice, BasicChoice, BasicChoice];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: 2 | 3;
}

export function makeBasicSet(set: BasicSet, seeds: readonly BasicQuestionSeed[]): Question[] {
  if (seeds.length !== 20) throw new Error(`基本問題セット${set}は20問必要です`);

  return seeds.map((seed, index) => ({
    id: `basic-set${set}-${String(index + 1).padStart(2, '0')}`,
    subject: 'A',
    domain: seed.domain,
    topic: seed.topic,
    stem: seed.stem,
    choices: seed.choices.map(([text]) => text),
    correct: [seed.correct],
    explanation: /条件|決め手|要件/.test(seed.explanation)
      ? seed.explanation
      : `この問題の決め手は、設問の条件を具体的な仕組みへ当てはめることです。${seed.explanation}`,
    choiceReasons: seed.choices.map(([, reason], choiceIndex) => `${choiceIndex === seed.correct ? '正解' : '不正解'}。${reason}`),
    materialId: seed.materialId,
    difficulty: seed.difficulty,
    practiceKind: 'vocabulary',
    vocabularySet: set,
  }));
}
