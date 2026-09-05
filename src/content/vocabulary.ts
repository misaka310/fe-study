import { basicSet1 } from './basic/set1';
import { basicSet2 } from './basic/set2';
import { basicSet3 } from './basic/set3';
import { basicSet4 } from './basic/set4';
import { basicSet5 } from './basic/set5';

/**
 * 旧「基礎単語」カードは廃止済み。
 * 基本情報技術者 科目Aで問われる知識を、計算・比較・設計判断・障害対応などの
 * 条件付き四肢択一問題として独自作成した20問×5セットを公開する。
 */
export const vocabularyQuestions = Object.freeze([
  ...basicSet1,
  ...basicSet2,
  ...basicSet3,
  ...basicSet4,
  ...basicSet5,
]);
