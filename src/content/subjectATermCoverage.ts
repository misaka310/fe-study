export const subjectATermCoverage = Object.freeze({
  theory: ['ベイズの定理', '標準偏差', '相関係数', '主成分分析', '仮説検定', '線形計画法', 'ニュートン法', 'マルコフ過程', '遷移確率', 'PID制御'],
  computer: ['RISC', 'CISC', 'SRAM', 'DRAM', 'フラッシュメモリ', 'メモリインタリーブ', 'PCI Express', 'USB', 'HDMI', 'PaaS'],
  software: ['フェールセーフ', 'フェールソフト', 'フールプルーフ', 'フォールトトレラント', 'SPOF', 'セマフォ', 'ミューテックス', 'スラッシング', '多相性'],
  database: ['DDL', 'DML', 'スキーマ', 'ビュー', '関係代数', '完全関数従属', '部分関数従属', '推移関数従属', 'E-Rモデル', 'エンティティ', 'アトリビュート'],
  network: ['CSMA/CD', 'CSMA/CA', 'SNMP', 'NTP', 'SDN', 'WDM', 'HDLC', 'IPv6', 'SSID', 'キャリアアグリゲーション', 'テザリング', 'HTTPS'],
  security: ['CVE', 'CVSS', 'SIEM', 'SOC', 'EDR', 'DMZ', 'PKI', 'CRL', 'OCSP', 'CSIRT', '暗号の危殆化'],
  development: ['SLCP', 'CMMI', 'MVC', 'SOLID', 'DDD', 'スクラム', 'XP', 'DevOps', 'ファジング', 'ローコード', 'プロダクトオーナ'],
  management: ['サービスデスク', 'SPOC', 'CMDB', 'AIOps', 'EVM', 'SLA', 'バーンダウンチャート', 'クラッシング', 'ファストトラッキング'],
  strategy: [
    'BSC', 'アンゾフの成長マトリクス', 'PEST分析', '3C分析', 'ファイブフォース分析',
    'MRP', 'JIT', 'SFA', 'ROE', 'ROA', 'EPS', 'キャッシュフロー計算書',
    '中小受託取引適正化法', '不正競争防止法', '営業秘密', 'JIS', 'ISO', 'デファクトスタンダード',
    'オムニチャネル', 'リテンション率', 'マーケットバスケット分析', 'ロングテール',
    'ファインチューニング', 'オプトアウト', 'ブレーンストーミング', '著作者人格権', 'カーボンフットプリント',
  ],
} as const);

export const subjectATermCoverageCount = Object.values(subjectATermCoverage).flat().length;
