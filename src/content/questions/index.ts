import { theoryQuestions } from './a-theory';
import { conceptQuestions } from './a-concepts';
import { supplementQuestions } from './a-supplement';
import { algorithmQuestions } from './b-algorithm';
import { securityCaseQuestions } from './b-security';
import { strengthenQuestionDistractors } from './quality-refinements';
import { strengthenAlgorithmDistractors } from './algorithm-quality-refinements';

export const questions = Object.freeze(strengthenAlgorithmDistractors(strengthenQuestionDistractors([
  ...theoryQuestions,
  ...conceptQuestions,
  ...supplementQuestions,
  ...algorithmQuestions,
  ...securityCaseQuestions,
])));
