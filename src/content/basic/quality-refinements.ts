import type { Question } from '../../domain/types';
import { qualitySet1 } from './quality-refinements-set1';
import { qualitySet2 } from './quality-refinements-set2';
import { qualitySet3 } from './quality-refinements-set3';
import { qualitySet4 } from './quality-refinements-set4';
import { qualitySet5 } from './quality-refinements-set5';

interface ChoicePatch {
  index: number;
  choice: string;
  reason: string;
}

const patches = {
  ...qualitySet1,
  ...qualitySet2,
  ...qualitySet3,
  ...qualitySet4,
  ...qualitySet5,
} as Record<string, readonly ChoicePatch[]>;

export function strengthenBasicDistractors(questions: readonly Question[]): Question[] {
  return questions.map((question) => {
    const questionPatches = patches[question.id];
    if (!questionPatches) return question;

    const choices = [...question.choices];
    const choiceReasons = [...question.choiceReasons];
    for (const patch of questionPatches) {
      if (patch.index < 0 || patch.index >= choices.length) continue;
      choices[patch.index] = patch.choice;
      choiceReasons[patch.index] = `不正解。${patch.reason}`;
    }
    return { ...question, choices, choiceReasons };
  });
}
