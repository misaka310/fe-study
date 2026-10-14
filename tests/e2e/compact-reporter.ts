import type { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';

export default class CompactReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    const outcome = result.status === 'passed' ? 'PASS' : 'FAIL';
    const artifact = result.status === 'passed' ? '' : `: artifacts/verify/playwright/`;
    console.log(`${outcome} ${test.title}${artifact}`);
  }

  onEnd(result: FullResult) {
    console.log(result.status === 'passed' ? 'PASS FE study browser verification' : 'FAIL FE study browser verification');
  }
}
