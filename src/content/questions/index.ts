import { theoryQuestions } from './a-theory';
import { conceptQuestions } from './a-concepts';
import { supplementQuestions } from './a-supplement';
import { algorithmQuestions } from './b-algorithm';
import { securityCaseQuestions } from './b-security';

export const questions = Object.freeze([
  ...theoryQuestions,
  ...conceptQuestions,
  ...supplementQuestions,
  ...algorithmQuestions,
  ...securityCaseQuestions,
]);
