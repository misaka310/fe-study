import { theoryQuestions } from './a-theory';
import { conceptQuestions } from './a-concepts';
import { algorithmQuestions } from './b-algorithm';
import { securityCaseQuestions } from './b-security';

export const questions = Object.freeze([
  ...theoryQuestions,
  ...conceptQuestions,
  ...algorithmQuestions,
  ...securityCaseQuestions,
]);
