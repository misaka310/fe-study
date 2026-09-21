export type Subject = 'A' | 'B';

export interface ExplanationVisual {
  src: string;
  alt: string;
  label: string;
  description: string;
}

export interface Question {
  id: string;
  subject: Subject;
  domain: string;
  topic: string;
  stem: string;
  choices: string[];
  correct: number[];
  explanation: string;
  choiceReasons: string[];
  materialId: string;
  difficulty: 1 | 2 | 3;
  code?: string;
  explanationVisual?: ExplanationVisual;
  practiceKind?: 'standard' | 'vocabulary';
  practiceTier?: 'foundation' | 'exam';
  vocabularySet?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface MaterialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  code?: string;
  visualId?: string;
  takeaways?: string[];
  decisionAxes?: string[];
  contrast?: string[];
  pitfalls?: string[];
}

export interface Material {
  id: string;
  order: number;
  title: string;
  summary: string;
  category: string;
  visualId?: string;
  sections: MaterialSection[];
  relatedQuestionTopics: string[];
}

export interface Attempt {
  picks: number[];
  correct: boolean;
  answeredAt: string;
}

export interface ExamSession {
  subject: Subject;
  questionIds: string[];
  currentIndex: number;
  startedAt: string;
  durationMinutes: number;
  picks: Record<string, number[]>;
  completedAt: string | null;
}

export interface LearningState {
  schemaVersion: 1;
  attempts: Record<string, Attempt[]>;
  activeExam: ExamSession | null;
}

export interface WeaknessSummary {
  topic: string;
  wrong: number;
  correct: number;
  score: number;
  latestWrongAt: string;
}
