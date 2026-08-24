import { describe, expect, it } from 'vitest';
import { materials } from '../src/content/materials';
import { questions } from '../src/content/questions';

const normalize = (value: string) => value.replace(/[\s、。・/＋+()（）「」『』]/g, '').toLocaleLowerCase('ja-JP');
const bigrams = (value: string) => {
  const normalized = normalize(value);
  return new Set(Array.from({ length: Math.max(0, normalized.length - 1) }, (_, index) => normalized.slice(index, index + 2)));
};
const similarity = (left: string, right: string) => {
  const a = bigrams(left);
  const b = bigrams(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
};

describe('独自問題バンクの品質', () => {
  it('科目A 150問以上、科目B 50問以上を収録する', () => {
    expect(questions.length).toBeGreaterThanOrEqual(200);
    expect(questions.filter((question) => question.subject === 'A').length).toBeGreaterThanOrEqual(150);
    expect(questions.filter((question) => question.subject === 'B').length).toBeGreaterThanOrEqual(50);
  });

  it('科目Aの分野別最低数を満たす', () => {
    const expected: Record<string, number> = {
      theory: 18, computer: 18, software: 14, database: 16, network: 18,
      security: 24, development: 16, management: 12, strategy: 14,
    };
    for (const [domain, minimum] of Object.entries(expected)) {
      expect(questions.filter((question) => question.subject === 'A' && question.domain === domain).length, domain)
        .toBeGreaterThanOrEqual(minimum);
    }
  });

  it('全問題が一意で解答可能な完全データを持つ', () => {
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    const materialIds = new Set(materials.map((material) => material.id));
    for (const question of questions) {
      expect(question.stem.length, question.id).toBeGreaterThanOrEqual(24);
      expect(question.choices.length, question.id).toBeGreaterThanOrEqual(4);
      expect(new Set(question.choices).size, question.id).toBe(question.choices.length);
      expect(question.correct.length, question.id).toBeGreaterThanOrEqual(1);
      expect(question.correct.every((index) => Number.isInteger(index) && index >= 0 && index < question.choices.length), question.id).toBe(true);
      expect(question.explanation.length, question.id).toBeGreaterThanOrEqual(20);
      expect(question.choiceReasons.length, question.id).toBe(question.choices.length);
      expect(question.choiceReasons.every((reason) => reason.length >= 10), question.id).toBe(true);
      expect(materialIds.has(question.materialId), question.id).toBe(true);
      expect(Object.hasOwn(question, 'source'), question.id).toBe(false);
    }
  });

  it('問題文と選択肢が過度に重複しない', () => {
    const choiceSets = new Set<string>();
    for (const question of questions) {
      const key = [...question.choices].sort().join('\n');
      expect(choiceSets.has(key), question.id).toBe(false);
      choiceSets.add(key);
    }
    for (let left = 0; left < questions.length; left += 1) {
      for (let right = left + 1; right < questions.length; right += 1) {
        expect(similarity(questions[left].stem, questions[right].stem), `${questions[left].id}/${questions[right].id}`)
          .toBeLessThan(0.62);
      }
    }
  });

  it('露骨な誤答ヒントを選択肢へ入れない', () => {
    const banned = [/絶対に/, /常に/, /必ず全て/, /何もしない/, /無条件で/, /root access key/i];
    for (const question of questions) {
      for (const choice of question.choices) {
        for (const pattern of banned) expect(choice, `${question.id}: ${choice}`).not.toMatch(pattern);
      }
    }
  });

  it('科目Bは40問以上の擬似言語と10問以上のセキュリティ事例を持つ', () => {
    const algorithm = questions.filter((question) => question.subject === 'B' && question.domain === 'algorithm');
    const security = questions.filter((question) => question.subject === 'B' && question.domain === 'security-case');
    expect(algorithm.length).toBeGreaterThanOrEqual(40);
    expect(security.length).toBeGreaterThanOrEqual(10);
    expect(algorithm.every((question) => question.code && /for|while|if|return|手続/.test(question.code))).toBe(true);
    expect(security.every((question) => /社|組織|担当|利用者|システム|サービス/.test(question.stem))).toBe(true);
  });
});
