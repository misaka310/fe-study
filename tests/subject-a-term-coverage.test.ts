import { describe, expect, it } from 'vitest';
import { materials } from '../src/content/materials';
import { questions } from '../src/content/questions';
import { subjectATermCoverage, subjectATermCoverageCount } from '../src/content/subjectATermCoverage';
import { subjectAOfficialPublicTermCoverage, subjectAOfficialPublicTermCoverageCount } from '../src/content/subjectAOfficialPublicTermCoverage';
import { vocabularyQuestions } from '../src/content/vocabulary';

const subjectAQuestions = questions.filter((question) => question.subject === 'A');
const learningText = JSON.stringify({ materials, subjectAQuestions, vocabularyQuestions });

describe('科目Aの現行重要用語カバレッジ', () => {
  it('主要9分野で110語以上を継続監査する', () => {
    expect(Object.keys(subjectATermCoverage)).toHaveLength(9);
    expect(subjectATermCoverageCount).toBeGreaterThanOrEqual(110);
  });

  it('監査対象語を教材または科目A問題のどこかで利用者へ提示する', () => {
    for (const [domain, terms] of Object.entries(subjectATermCoverage)) {
      for (const term of terms) {
        expect(learningText, `${domain}: ${term}`).toContain(term);
      }
    }
  });

  it('2023〜2026年度のIPA公式公開問題で重要な用語を継続監査する', () => {
    expect(subjectAOfficialPublicTermCoverageCount).toBeGreaterThanOrEqual(70);
    for (const [year, terms] of Object.entries(subjectAOfficialPublicTermCoverage)) {
      for (const term of terms) {
        expect(learningText, `${year}: ${term}`).toContain(term);
      }
    }
  });

});
