import { attachExplanationVisual } from '../explanationVisuals';
import { theoryQuestions } from './a-theory';
import { conceptQuestions } from './a-concepts';
import { supplementQuestions } from './a-supplement';
import { algorithmQuestions } from './b-algorithm';
import { securityCaseQuestions } from './b-security';
import { additionalAlgorithmQuestions, additionalSecurityCaseQuestions } from './b-additional';
import { examAlgorithmQuestions, examSecurityCaseQuestions } from './b-exam';
import { strengthenQuestionDistractors } from './quality-refinements';
import { strengthenAlgorithmDistractors } from './algorithm-quality-refinements';

export const questions = Object.freeze(strengthenAlgorithmDistractors(strengthenQuestionDistractors([
  ...theoryQuestions,
  ...conceptQuestions,
  ...supplementQuestions,
  ...algorithmQuestions,
  ...securityCaseQuestions,
  ...additionalAlgorithmQuestions,
  ...additionalSecurityCaseQuestions,
  ...examAlgorithmQuestions,
  ...examSecurityCaseQuestions,
])).map((question) => question.subject === 'B' && !question.practiceTier ? { ...question, practiceTier: 'foundation' as const } : question).map(attachExplanationVisual));
