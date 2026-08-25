import type { Material } from '../../domain/types';

export const algorithms: Material = {
  id: '05-algorithms', order: 5, title: '05 データ構造とアルゴリズム', category: '科目B',
  summary: '科目Bの擬似言語を、変数表、境界条件、データ構造、計算量の四つの視点で一行ずつ追跡する方法を身につけます。',
  relatedQuestionTopics: ['擬似言語', '探索', '整列', 'データ構造', '計算量'],
  sections: [
    { heading: '擬似言語の読み方', paragraphs: ['擬似言語は記号を眺めず、入力、出力、更新される変数、不変条件へ分けます。配列の添字が0始まりか1始まりか、繰返しの終端を含むか、整数除算か実数除算かを最初に印付けします。小さな入力で変数表を作り、各行を実行した直後の値だけを書けば、頭の中だけで追うより境界の誤りを発見できます。'], decisionAxes: ['添字の開始値、終端条件、更新順序を最初に固定する', '各行の直後の変数値と、処理が終わったときの戻り値を分けて追う'], contrast: ['コードの見た目から推測するのではなく、入力例を一行ずつ実行する'], pitfalls: ['ループ終端の含む・含まない、整数除算、空配列を確認しないまま答えを選ばない'], code: 'sum ← 0\nfor i を 0 から length(values) - 1 まで増やす\n  sum ← sum + values[i]\nendfor\nreturn sum' },
    { heading: '探索アルゴリズム', paragraphs: ['線形探索は先頭から比較するため最大比較回数は要素数に比例します。二分探索は整列済み配列の中央と比較して範囲を半分にしますが、未整列データへそのまま適用できません。ループ条件をleft以下rightとし、中央値更新後に探索範囲が必ず狭くなることを確認すると無限ループを防げます。'], code: 'left ← 0\nright ← length(a) - 1\nwhile left ≦ right\n  mid ← (left + right) div 2\n  if a[mid] = key then return mid\n  elseif a[mid] < key then left ← mid + 1\n  else right ← mid - 1\n  endif\nendwhile\nreturn -1' },
    { heading: '整列と計算量', paragraphs: ['選択ソートは未整列部分から最小値を選び、バブルソートは隣接要素を交換し、挿入ソートは整列済み部分へ挿入します。入力規模nに対する増え方をO記法で表し、定数や低次項は無視します。二重ループでも内側の回数が毎回一定ならO(n)であり、形だけでO(nの2乗)と決めないことが重要です。'], code: 'for i を 0 から length(a) - 2 まで増やす\n  min ← i\n  for j を i + 1 から length(a) - 1 まで増やす\n    if a[j] < a[min] then min ← j endif\n  endfor\n  a[i] と a[min] を交換する\nendfor' },
    { heading: 'データ構造と再帰', paragraphs: ['スタックは後入れ先出しで関数呼出しや深さ優先探索、キューは先入れ先出しで待ち行列や幅優先探索に向きます。連結リストは挿入削除で周辺ポインタを更新し、木は親子関係を持ちます。再帰では終了条件、問題が小さくなる更新、戻り値の組合せを確認し、呼出しごとの局所変数を表に分けます。'] },
  ],
};
