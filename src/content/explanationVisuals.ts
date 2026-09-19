import type { ExplanationVisual, Question } from '../domain/types';

export const explanationVisuals: Readonly<Record<string, ExplanationVisual>> = Object.freeze({
  "a-theory-003": {
    "src": "/images/explanations/a-theory-003.webp",
    "alt": "補数について、問題文の条件と解説の流れを図解した説明画像",
    "label": "補数の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-theory-006": {
    "src": "/images/explanations/a-theory-006.webp",
    "alt": "集合について、問題文の条件と解説の流れを図解した説明画像",
    "label": "集合の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-theory-007": {
    "src": "/images/explanations/a-theory-007.webp",
    "alt": "確率について、問題文の条件と解説の流れを図解した説明画像",
    "label": "確率の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-theory-014": {
    "src": "/images/explanations/a-theory-014.webp",
    "alt": "待ち行列について、問題文の条件と解説の流れを図解した説明画像",
    "label": "待ち行列の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-theory-016": {
    "src": "/images/explanations/a-theory-016.webp",
    "alt": "グラフについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "グラフの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-theory-018": {
    "src": "/images/explanations/a-theory-018.webp",
    "alt": "有限オートマトンについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "有限オートマトンの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-computer-005": {
    "src": "/images/explanations/a-computer-005.webp",
    "alt": "RAMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "RAMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-computer-010": {
    "src": "/images/explanations/a-computer-010.webp",
    "alt": "パイプラインについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "パイプラインの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-computer-015": {
    "src": "/images/explanations/a-computer-015.webp",
    "alt": "RAID 5について、問題文の条件と解説の流れを図解した説明画像",
    "label": "RAID 5の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-software-005": {
    "src": "/images/explanations/a-software-005.webp",
    "alt": "ラウンドロビンについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ラウンドロビンの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-software-010": {
    "src": "/images/explanations/a-software-010.webp",
    "alt": "ローダについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ローダの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-database-005": {
    "src": "/images/explanations/a-database-005.webp",
    "alt": "第3正規形について、問題文の条件と解説の流れを図解した説明画像",
    "label": "第3正規形の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-database-010": {
    "src": "/images/explanations/a-database-010.webp",
    "alt": "インデックスについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "インデックスの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-database-015": {
    "src": "/images/explanations/a-database-015.webp",
    "alt": "ロールバックについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ロールバックの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-network-005": {
    "src": "/images/explanations/a-network-005.webp",
    "alt": "ARPについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ARPの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-network-010": {
    "src": "/images/explanations/a-network-010.webp",
    "alt": "UDPについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "UDPの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-network-015": {
    "src": "/images/explanations/a-network-015.webp",
    "alt": "VLANについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "VLANの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-security-005": {
    "src": "/images/explanations/a-security-005.webp",
    "alt": "最小権限の原則について、問題文の条件と解説の流れを図解した説明画像",
    "label": "最小権限の原則の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-security-010": {
    "src": "/images/explanations/a-security-010.webp",
    "alt": "認証局について、問題文の条件と解説の流れを図解した説明画像",
    "label": "認証局の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-security-015": {
    "src": "/images/explanations/a-security-015.webp",
    "alt": "IPSについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "IPSの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-security-020": {
    "src": "/images/explanations/a-security-020.webp",
    "alt": "標的型攻撃について、問題文の条件と解説の流れを図解した説明画像",
    "label": "標的型攻撃の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-development-005": {
    "src": "/images/explanations/a-development-005.webp",
    "alt": "モジュール結合度について、問題文の条件と解説の流れを図解した説明画像",
    "label": "モジュール結合度の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-development-010": {
    "src": "/images/explanations/a-development-010.webp",
    "alt": "ブラックボックステストについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ブラックボックステストの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-development-015": {
    "src": "/images/explanations/a-development-015.webp",
    "alt": "リファクタリングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "リファクタリングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-management-005": {
    "src": "/images/explanations/a-management-005.webp",
    "alt": "EVMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "EVMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-management-010": {
    "src": "/images/explanations/a-management-010.webp",
    "alt": "キャパシティ管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "キャパシティ管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-strategy-005": {
    "src": "/images/explanations/a-strategy-005.webp",
    "alt": "ベンチマーキングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ベンチマーキングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-strategy-010": {
    "src": "/images/explanations/a-strategy-010.webp",
    "alt": "損益分岐点について、問題文の条件と解説の流れを図解した説明画像",
    "label": "損益分岐点の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-001": {
    "src": "/images/explanations/a-supp-001.webp",
    "alt": "半加算器について、問題文の条件と解説の流れを図解した説明画像",
    "label": "半加算器の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-002": {
    "src": "/images/explanations/a-supp-002.webp",
    "alt": "直列システム稼働率について、問題文の条件と解説の流れを図解した説明画像",
    "label": "直列システム稼働率の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-003": {
    "src": "/images/explanations/a-supp-003.webp",
    "alt": "並列システム稼働率について、問題文の条件と解説の流れを図解した説明画像",
    "label": "並列システム稼働率の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-004": {
    "src": "/images/explanations/a-supp-004.webp",
    "alt": "稼働率について、問題文の条件と解説の流れを図解した説明画像",
    "label": "稼働率の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-007": {
    "src": "/images/explanations/a-supp-007.webp",
    "alt": "サブネットについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "サブネットの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-009": {
    "src": "/images/explanations/a-supp-009.webp",
    "alt": "暗号方式について、問題文の条件と解説の流れを図解した説明画像",
    "label": "暗号方式の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-012": {
    "src": "/images/explanations/a-supp-012.webp",
    "alt": "EVMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "EVMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-013": {
    "src": "/images/explanations/a-supp-013.webp",
    "alt": "バックアップについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "バックアップの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-014": {
    "src": "/images/explanations/a-supp-014.webp",
    "alt": "損益分岐点について、問題文の条件と解説の流れを図解した説明画像",
    "label": "損益分岐点の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "a-supp-015": {
    "src": "/images/explanations/a-supp-015.webp",
    "alt": "労働者派遣と請負について、問題文の条件と解説の流れを図解した説明画像",
    "label": "労働者派遣と請負の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-001": {
    "src": "/images/explanations/b-algorithm-001.webp",
    "alt": "ループについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ループの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-002": {
    "src": "/images/explanations/b-algorithm-002.webp",
    "alt": "条件分岐について、問題文の条件と解説の流れを図解した説明画像",
    "label": "条件分岐の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-003": {
    "src": "/images/explanations/b-algorithm-003.webp",
    "alt": "剰余について、問題文の条件と解説の流れを図解した説明画像",
    "label": "剰余の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-004": {
    "src": "/images/explanations/b-algorithm-004.webp",
    "alt": "カウントについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "カウントの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-005": {
    "src": "/images/explanations/b-algorithm-005.webp",
    "alt": "whileについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "whileの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-006": {
    "src": "/images/explanations/b-algorithm-006.webp",
    "alt": "文字列について、問題文の条件と解説の流れを図解した説明画像",
    "label": "文字列の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-007": {
    "src": "/images/explanations/b-algorithm-007.webp",
    "alt": "累乗について、問題文の条件と解説の流れを図解した説明画像",
    "label": "累乗の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-008": {
    "src": "/images/explanations/b-algorithm-008.webp",
    "alt": "最大公約数について、問題文の条件と解説の流れを図解した説明画像",
    "label": "最大公約数の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-009": {
    "src": "/images/explanations/b-algorithm-009.webp",
    "alt": "フラグについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "フラグの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-010": {
    "src": "/images/explanations/b-algorithm-010.webp",
    "alt": "偶奇について、問題文の条件と解説の流れを図解した説明画像",
    "label": "偶奇の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-011": {
    "src": "/images/explanations/b-algorithm-011.webp",
    "alt": "配列更新について、問題文の条件と解説の流れを図解した説明画像",
    "label": "配列更新の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-012": {
    "src": "/images/explanations/b-algorithm-012.webp",
    "alt": "二重ループについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "二重ループの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-013": {
    "src": "/images/explanations/b-algorithm-013.webp",
    "alt": "添字について、問題文の条件と解説の流れを図解した説明画像",
    "label": "添字の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-014": {
    "src": "/images/explanations/b-algorithm-014.webp",
    "alt": "平均との差について、問題文の条件と解説の流れを図解した説明画像",
    "label": "平均との差の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-015": {
    "src": "/images/explanations/b-algorithm-015.webp",
    "alt": "隣接差について、問題文の条件と解説の流れを図解した説明画像",
    "label": "隣接差の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-016": {
    "src": "/images/explanations/b-algorithm-016.webp",
    "alt": "頻度表について、問題文の条件と解説の流れを図解した説明画像",
    "label": "頻度表の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-017": {
    "src": "/images/explanations/b-algorithm-017.webp",
    "alt": "累積和について、問題文の条件と解説の流れを図解した説明画像",
    "label": "累積和の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-018": {
    "src": "/images/explanations/b-algorithm-018.webp",
    "alt": "交換について、問題文の条件と解説の流れを図解した説明画像",
    "label": "交換の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-019": {
    "src": "/images/explanations/b-algorithm-019.webp",
    "alt": "行列について、問題文の条件と解説の流れを図解した説明画像",
    "label": "行列の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-020": {
    "src": "/images/explanations/b-algorithm-020.webp",
    "alt": "重複除去について、問題文の条件と解説の流れを図解した説明画像",
    "label": "重複除去の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-021": {
    "src": "/images/explanations/b-algorithm-021.webp",
    "alt": "線形探索について、問題文の条件と解説の流れを図解した説明画像",
    "label": "線形探索の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-022": {
    "src": "/images/explanations/b-algorithm-022.webp",
    "alt": "二分探索について、問題文の条件と解説の流れを図解した説明画像",
    "label": "二分探索の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-023": {
    "src": "/images/explanations/b-algorithm-023.webp",
    "alt": "バブルソートについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "バブルソートの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-024": {
    "src": "/images/explanations/b-algorithm-024.webp",
    "alt": "選択ソートについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "選択ソートの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-025": {
    "src": "/images/explanations/b-algorithm-025.webp",
    "alt": "挿入ソートについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "挿入ソートの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-026": {
    "src": "/images/explanations/b-algorithm-026.webp",
    "alt": "マージについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "マージの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-027": {
    "src": "/images/explanations/b-algorithm-027.webp",
    "alt": "探索量について、問題文の条件と解説の流れを図解した説明画像",
    "label": "探索量の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-028": {
    "src": "/images/explanations/b-algorithm-028.webp",
    "alt": "ハッシュについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ハッシュの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-029": {
    "src": "/images/explanations/b-algorithm-029.webp",
    "alt": "衝突について、問題文の条件と解説の流れを図解した説明画像",
    "label": "衝突の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-030": {
    "src": "/images/explanations/b-algorithm-030.webp",
    "alt": "番兵について、問題文の条件と解説の流れを図解した説明画像",
    "label": "番兵の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-031": {
    "src": "/images/explanations/b-algorithm-031.webp",
    "alt": "スタックについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "スタックの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-032": {
    "src": "/images/explanations/b-algorithm-032.webp",
    "alt": "キューについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "キューの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-033": {
    "src": "/images/explanations/b-algorithm-033.webp",
    "alt": "連結リストについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "連結リストの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-034": {
    "src": "/images/explanations/b-algorithm-034.webp",
    "alt": "木の走査について、問題文の条件と解説の流れを図解した説明画像",
    "label": "木の走査の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-035": {
    "src": "/images/explanations/b-algorithm-035.webp",
    "alt": "二分探索木について、問題文の条件と解説の流れを図解した説明画像",
    "label": "二分探索木の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-036": {
    "src": "/images/explanations/b-algorithm-036.webp",
    "alt": "再帰について、問題文の条件と解説の流れを図解した説明画像",
    "label": "再帰の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-037": {
    "src": "/images/explanations/b-algorithm-037.webp",
    "alt": "再帰トレースについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "再帰トレースの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-038": {
    "src": "/images/explanations/b-algorithm-038.webp",
    "alt": "深さ優先探索について、問題文の条件と解説の流れを図解した説明画像",
    "label": "深さ優先探索の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-039": {
    "src": "/images/explanations/b-algorithm-039.webp",
    "alt": "幅優先探索について、問題文の条件と解説の流れを図解した説明画像",
    "label": "幅優先探索の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-040": {
    "src": "/images/explanations/b-algorithm-040.webp",
    "alt": "計算量について、問題文の条件と解説の流れを図解した説明画像",
    "label": "計算量の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-041": {
    "src": "/images/explanations/b-algorithm-041.webp",
    "alt": "二重反復の計算量について、問題文の条件と解説の流れを図解した説明画像",
    "label": "二重反復の計算量の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-algorithm-042": {
    "src": "/images/explanations/b-algorithm-042.webp",
    "alt": "メモ化について、問題文の条件と解説の流れを図解した説明画像",
    "label": "メモ化の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-001": {
    "src": "/images/explanations/b-security-001.webp",
    "alt": "フィッシング対応について、問題文の条件と解説の流れを図解した説明画像",
    "label": "フィッシング対応の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-002": {
    "src": "/images/explanations/b-security-002.webp",
    "alt": "権限管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "権限管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-003": {
    "src": "/images/explanations/b-security-003.webp",
    "alt": "ランサムウェアについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ランサムウェアの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-004": {
    "src": "/images/explanations/b-security-004.webp",
    "alt": "Web脆弱性について、問題文の条件と解説の流れを図解した説明画像",
    "label": "Web脆弱性の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-005": {
    "src": "/images/explanations/b-security-005.webp",
    "alt": "認証強化について、問題文の条件と解説の流れを図解した説明画像",
    "label": "認証強化の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-006": {
    "src": "/images/explanations/b-security-006.webp",
    "alt": "委託先管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "委託先管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-007": {
    "src": "/images/explanations/b-security-007.webp",
    "alt": "ログ監視について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ログ監視の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-008": {
    "src": "/images/explanations/b-security-008.webp",
    "alt": "バックアップについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "バックアップの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-009": {
    "src": "/images/explanations/b-security-009.webp",
    "alt": "脆弱性対応について、問題文の条件と解説の流れを図解した説明画像",
    "label": "脆弱性対応の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "b-security-010": {
    "src": "/images/explanations/b-security-010.webp",
    "alt": "情報持出しについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "情報持出しの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-01": {
    "src": "/images/explanations/basic-set1-01.webp",
    "alt": "ALUの論理演算について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ALUの論理演算の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-02": {
    "src": "/images/explanations/basic-set1-02.webp",
    "alt": "CPU性能について、問題文の条件と解説の流れを図解した説明画像",
    "label": "CPU性能の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-03": {
    "src": "/images/explanations/basic-set1-03.webp",
    "alt": "キャッシュメモリについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "キャッシュメモリの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-04": {
    "src": "/images/explanations/basic-set1-04.webp",
    "alt": "RAIDについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "RAIDの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-05": {
    "src": "/images/explanations/basic-set1-05.webp",
    "alt": "仮想記憶について、問題文の条件と解説の流れを図解した説明画像",
    "label": "仮想記憶の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-06": {
    "src": "/images/explanations/basic-set1-06.webp",
    "alt": "排他制御について、問題文の条件と解説の流れを図解した説明画像",
    "label": "排他制御の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-07": {
    "src": "/images/explanations/basic-set1-07.webp",
    "alt": "正規化について、問題文の条件と解説の流れを図解した説明画像",
    "label": "正規化の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-08": {
    "src": "/images/explanations/basic-set1-08.webp",
    "alt": "トランザクションについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "トランザクションの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-09": {
    "src": "/images/explanations/basic-set1-09.webp",
    "alt": "サブネットについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "サブネットの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-10": {
    "src": "/images/explanations/basic-set1-10.webp",
    "alt": "DNSについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "DNSの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-11": {
    "src": "/images/explanations/basic-set1-11.webp",
    "alt": "ディジタル署名について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ディジタル署名の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-12": {
    "src": "/images/explanations/basic-set1-12.webp",
    "alt": "パスワード保護について、問題文の条件と解説の流れを図解した説明画像",
    "label": "パスワード保護の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-13": {
    "src": "/images/explanations/basic-set1-13.webp",
    "alt": "多要素認証について、問題文の条件と解説の流れを図解した説明画像",
    "label": "多要素認証の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-14": {
    "src": "/images/explanations/basic-set1-14.webp",
    "alt": "SQLインジェクションについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "SQLインジェクションの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-15": {
    "src": "/images/explanations/basic-set1-15.webp",
    "alt": "テスト技法について、問題文の条件と解説の流れを図解した説明画像",
    "label": "テスト技法の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-16": {
    "src": "/images/explanations/basic-set1-16.webp",
    "alt": "回帰テストについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "回帰テストの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-17": {
    "src": "/images/explanations/basic-set1-17.webp",
    "alt": "EVMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "EVMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-18": {
    "src": "/images/explanations/basic-set1-18.webp",
    "alt": "クリティカルパスについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "クリティカルパスの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-19": {
    "src": "/images/explanations/basic-set1-19.webp",
    "alt": "SWOT分析について、問題文の条件と解説の流れを図解した説明画像",
    "label": "SWOT分析の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set1-20": {
    "src": "/images/explanations/basic-set1-20.webp",
    "alt": "投資評価について、問題文の条件と解説の流れを図解した説明画像",
    "label": "投資評価の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-01": {
    "src": "/images/explanations/basic-set2-01.webp",
    "alt": "2の補数について、問題文の条件と解説の流れを図解した説明画像",
    "label": "2の補数の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-02": {
    "src": "/images/explanations/basic-set2-02.webp",
    "alt": "浮動小数点誤差について、問題文の条件と解説の流れを図解した説明画像",
    "label": "浮動小数点誤差の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-03": {
    "src": "/images/explanations/basic-set2-03.webp",
    "alt": "パイプラインについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "パイプラインの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-04": {
    "src": "/images/explanations/basic-set2-04.webp",
    "alt": "DMAについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "DMAの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-05": {
    "src": "/images/explanations/basic-set2-05.webp",
    "alt": "CPUスケジューリングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "CPUスケジューリングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-06": {
    "src": "/images/explanations/basic-set2-06.webp",
    "alt": "デッドロックについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "デッドロックの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-07": {
    "src": "/images/explanations/basic-set2-07.webp",
    "alt": "外部結合について、問題文の条件と解説の流れを図解した説明画像",
    "label": "外部結合の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-08": {
    "src": "/images/explanations/basic-set2-08.webp",
    "alt": "インデックスについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "インデックスの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-09": {
    "src": "/images/explanations/basic-set2-09.webp",
    "alt": "TCPとUDPについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "TCPとUDPの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-10": {
    "src": "/images/explanations/basic-set2-10.webp",
    "alt": "デフォルトゲートウェイについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "デフォルトゲートウェイの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-11": {
    "src": "/images/explanations/basic-set2-11.webp",
    "alt": "TLS証明書について、問題文の条件と解説の流れを図解した説明画像",
    "label": "TLS証明書の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-12": {
    "src": "/images/explanations/basic-set2-12.webp",
    "alt": "ハイブリッド暗号について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ハイブリッド暗号の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-13": {
    "src": "/images/explanations/basic-set2-13.webp",
    "alt": "最小権限について、問題文の条件と解説の流れを図解した説明画像",
    "label": "最小権限の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-14": {
    "src": "/images/explanations/basic-set2-14.webp",
    "alt": "ランサムウェア対策について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ランサムウェア対策の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-15": {
    "src": "/images/explanations/basic-set2-15.webp",
    "alt": "UMLについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "UMLの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-16": {
    "src": "/images/explanations/basic-set2-16.webp",
    "alt": "同値分割について、問題文の条件と解説の流れを図解した説明画像",
    "label": "同値分割の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-17": {
    "src": "/images/explanations/basic-set2-17.webp",
    "alt": "SLAについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "SLAの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-18": {
    "src": "/images/explanations/basic-set2-18.webp",
    "alt": "リスク評価について、問題文の条件と解説の流れを図解した説明画像",
    "label": "リスク評価の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-19": {
    "src": "/images/explanations/basic-set2-19.webp",
    "alt": "ERPについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ERPの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set2-20": {
    "src": "/images/explanations/basic-set2-20.webp",
    "alt": "KPIについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "KPIの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-01": {
    "src": "/images/explanations/basic-set3-01.webp",
    "alt": "標本化定理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "標本化定理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-02": {
    "src": "/images/explanations/basic-set3-02.webp",
    "alt": "データ圧縮について、問題文の条件と解説の流れを図解した説明画像",
    "label": "データ圧縮の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-03": {
    "src": "/images/explanations/basic-set3-03.webp",
    "alt": "稼働率について、問題文の条件と解説の流れを図解した説明画像",
    "label": "稼働率の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-04": {
    "src": "/images/explanations/basic-set3-04.webp",
    "alt": "ページングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ページングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-05": {
    "src": "/images/explanations/basic-set3-05.webp",
    "alt": "言語処理系について、問題文の条件と解説の流れを図解した説明画像",
    "label": "言語処理系の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-06": {
    "src": "/images/explanations/basic-set3-06.webp",
    "alt": "ジャーナリングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ジャーナリングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-07": {
    "src": "/images/explanations/basic-set3-07.webp",
    "alt": "SQL集計について、問題文の条件と解説の流れを図解した説明画像",
    "label": "SQL集計の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-08": {
    "src": "/images/explanations/basic-set3-08.webp",
    "alt": "トランザクション分離について、問題文の条件と解説の流れを図解した説明画像",
    "label": "トランザクション分離の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-09": {
    "src": "/images/explanations/basic-set3-09.webp",
    "alt": "ARPとDNSについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ARPとDNSの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-10": {
    "src": "/images/explanations/basic-set3-10.webp",
    "alt": "NAPTについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "NAPTの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-11": {
    "src": "/images/explanations/basic-set3-11.webp",
    "alt": "ハッシュ関数について、問題文の条件と解説の流れを図解した説明画像",
    "label": "ハッシュ関数の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-12": {
    "src": "/images/explanations/basic-set3-12.webp",
    "alt": "WAFについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "WAFの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-13": {
    "src": "/images/explanations/basic-set3-13.webp",
    "alt": "CSRFについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "CSRFの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-14": {
    "src": "/images/explanations/basic-set3-14.webp",
    "alt": "メール認証について、問題文の条件と解説の流れを図解した説明画像",
    "label": "メール認証の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-15": {
    "src": "/images/explanations/basic-set3-15.webp",
    "alt": "アジャイル開発について、問題文の条件と解説の流れを図解した説明画像",
    "label": "アジャイル開発の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-16": {
    "src": "/images/explanations/basic-set3-16.webp",
    "alt": "継続的インテグレーションについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "継続的インテグレーションの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-17": {
    "src": "/images/explanations/basic-set3-17.webp",
    "alt": "WBSについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "WBSの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-18": {
    "src": "/images/explanations/basic-set3-18.webp",
    "alt": "変更管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "変更管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-19": {
    "src": "/images/explanations/basic-set3-19.webp",
    "alt": "TCOについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "TCOの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set3-20": {
    "src": "/images/explanations/basic-set3-20.webp",
    "alt": "OSSライセンスについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "OSSライセンスの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-01": {
    "src": "/images/explanations/basic-set4-01.webp",
    "alt": "最短経路について、問題文の条件と解説の流れを図解した説明画像",
    "label": "最短経路の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-02": {
    "src": "/images/explanations/basic-set4-02.webp",
    "alt": "組合せについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "組合せの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-03": {
    "src": "/images/explanations/basic-set4-03.webp",
    "alt": "アムダールの法則について、問題文の条件と解説の流れを図解した説明画像",
    "label": "アムダールの法則の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-04": {
    "src": "/images/explanations/basic-set4-04.webp",
    "alt": "エンディアンについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "エンディアンの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-05": {
    "src": "/images/explanations/basic-set4-05.webp",
    "alt": "仮想化とコンテナについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "仮想化とコンテナの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-06": {
    "src": "/images/explanations/basic-set4-06.webp",
    "alt": "ガベージコレクションについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ガベージコレクションの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-07": {
    "src": "/images/explanations/basic-set4-07.webp",
    "alt": "デッドロックについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "デッドロックの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-08": {
    "src": "/images/explanations/basic-set4-08.webp",
    "alt": "障害回復について、問題文の条件と解説の流れを図解した説明画像",
    "label": "障害回復の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-09": {
    "src": "/images/explanations/basic-set4-09.webp",
    "alt": "VLANについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "VLANの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-10": {
    "src": "/images/explanations/basic-set4-10.webp",
    "alt": "CDNについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "CDNの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-11": {
    "src": "/images/explanations/basic-set4-11.webp",
    "alt": "暗号方式について、問題文の条件と解説の流れを図解した説明画像",
    "label": "暗号方式の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-12": {
    "src": "/images/explanations/basic-set4-12.webp",
    "alt": "証明書失効について、問題文の条件と解説の流れを図解した説明画像",
    "label": "証明書失効の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-13": {
    "src": "/images/explanations/basic-set4-13.webp",
    "alt": "ゼロトラストについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ゼロトラストの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-14": {
    "src": "/images/explanations/basic-set4-14.webp",
    "alt": "脆弱性管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "脆弱性管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-15": {
    "src": "/images/explanations/basic-set4-15.webp",
    "alt": "静的解析について、問題文の条件と解説の流れを図解した説明画像",
    "label": "静的解析の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-16": {
    "src": "/images/explanations/basic-set4-16.webp",
    "alt": "テストダブルについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "テストダブルの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-17": {
    "src": "/images/explanations/basic-set4-17.webp",
    "alt": "PERTについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "PERTの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-18": {
    "src": "/images/explanations/basic-set4-18.webp",
    "alt": "EVMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "EVMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-19": {
    "src": "/images/explanations/basic-set4-19.webp",
    "alt": "PEST分析について、問題文の条件と解説の流れを図解した説明画像",
    "label": "PEST分析の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set4-20": {
    "src": "/images/explanations/basic-set4-20.webp",
    "alt": "調達について、問題文の条件と解説の流れを図解した説明画像",
    "label": "調達の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-01": {
    "src": "/images/explanations/basic-set5-01.webp",
    "alt": "情報量について、問題文の条件と解説の流れを図解した説明画像",
    "label": "情報量の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-02": {
    "src": "/images/explanations/basic-set5-02.webp",
    "alt": "論理演算について、問題文の条件と解説の流れを図解した説明画像",
    "label": "論理演算の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-03": {
    "src": "/images/explanations/basic-set5-03.webp",
    "alt": "CPU性能について、問題文の条件と解説の流れを図解した説明画像",
    "label": "CPU性能の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-04": {
    "src": "/images/explanations/basic-set5-04.webp",
    "alt": "キャッシュ書込み方式について、問題文の条件と解説の流れを図解した説明画像",
    "label": "キャッシュ書込み方式の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-05": {
    "src": "/images/explanations/basic-set5-05.webp",
    "alt": "セマフォについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "セマフォの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-06": {
    "src": "/images/explanations/basic-set5-06.webp",
    "alt": "プロセスとスレッドについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "プロセスとスレッドの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-07": {
    "src": "/images/explanations/basic-set5-07.webp",
    "alt": "直列可能性について、問題文の条件と解説の流れを図解した説明画像",
    "label": "直列可能性の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-08": {
    "src": "/images/explanations/basic-set5-08.webp",
    "alt": "参照整合性について、問題文の条件と解説の流れを図解した説明画像",
    "label": "参照整合性の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-09": {
    "src": "/images/explanations/basic-set5-09.webp",
    "alt": "IPv4サブネットについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "IPv4サブネットの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-10": {
    "src": "/images/explanations/basic-set5-10.webp",
    "alt": "DNSレコードについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "DNSレコードの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-11": {
    "src": "/images/explanations/basic-set5-11.webp",
    "alt": "リプレイ攻撃について、問題文の条件と解説の流れを図解した説明画像",
    "label": "リプレイ攻撃の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-12": {
    "src": "/images/explanations/basic-set5-12.webp",
    "alt": "HMACについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "HMACの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-13": {
    "src": "/images/explanations/basic-set5-13.webp",
    "alt": "RPOとRTOについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "RPOとRTOの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-14": {
    "src": "/images/explanations/basic-set5-14.webp",
    "alt": "監査ログについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "監査ログの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-15": {
    "src": "/images/explanations/basic-set5-15.webp",
    "alt": "API互換性について、問題文の条件と解説の流れを図解した説明画像",
    "label": "API互換性の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-16": {
    "src": "/images/explanations/basic-set5-16.webp",
    "alt": "分岐網羅について、問題文の条件と解説の流れを図解した説明画像",
    "label": "分岐網羅の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-17": {
    "src": "/images/explanations/basic-set5-17.webp",
    "alt": "クラッシングについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "クラッシングの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-18": {
    "src": "/images/explanations/basic-set5-18.webp",
    "alt": "インシデント管理について、問題文の条件と解説の流れを図解した説明画像",
    "label": "インシデント管理の解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-19": {
    "src": "/images/explanations/basic-set5-19.webp",
    "alt": "ROIについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "ROIの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  },
  "basic-set5-20": {
    "src": "/images/explanations/basic-set5-20.webp",
    "alt": "SCMについて、問題文の条件と解説の流れを図解した説明画像",
    "label": "SCMの解き方",
    "description": "問題文の条件から答えへ進む判断の流れを図で確認できます。"
  }
} satisfies Record<string, ExplanationVisual>);

const explanationPreloadCache = new Map<string, { image: HTMLImageElement; promise: Promise<void> }>();

export function attachExplanationVisual(question: Question): Question {
  const visual = explanationVisuals[question.id];
  return visual ? { ...question, explanationVisual: visual } : question;
}

export function preloadExplanationVisual(visual?: ExplanationVisual): Promise<void> {
  if (!visual || typeof Image === 'undefined') return Promise.resolve();
  const cached = explanationPreloadCache.get(visual.src);
  if (cached) return cached.promise;

  const image = new Image();
  const promise = new Promise<void>((resolve) => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    image.onload = settle;
    image.onerror = () => {
      explanationPreloadCache.delete(visual.src);
      settle();
    };
    image.src = visual.src;
    if (image.complete) settle();
  });
  explanationPreloadCache.set(visual.src, { image, promise });
  return promise;
}
