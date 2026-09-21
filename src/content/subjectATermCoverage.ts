export const subjectATermCoverage = Object.freeze({
  theory: ['ベイズの定理', '標準偏差', '相関係数', '主成分分析', '仮説検定', '線形計画法', 'ニュートン法', 'マルコフ過程'],
  computer: ['RISC', 'CISC', 'SRAM', 'DRAM', 'フラッシュメモリ', 'メモリインタリーブ', 'PCI Express', 'USB', 'HDMI'],
  software: ['フェールセーフ', 'フェールソフト', 'フールプルーフ', 'フォールトトレラント', 'SPOF', 'セマフォ', 'ミューテックス'],
  database: ['DDL', 'DML', 'スキーマ', 'ビュー', '関係代数', '完全関数従属', '部分関数従属', '推移関数従属'],
  network: ['CSMA/CD', 'CSMA/CA', 'SNMP', 'NTP', 'SDN', 'WDM', 'HDLC', 'IPv6'],
  security: ['CVE', 'CVSS', 'SIEM', 'SOC', 'EDR', 'DMZ', 'PKI', 'CRL', 'OCSP'],
  development: ['SLCP', 'CMMI', 'MVC', 'SOLID', 'DDD', 'スクラム', 'XP', 'DevOps', 'ファジング'],
  management: ['サービスデスク', 'SPOC', 'CMDB', 'AIOps', 'EVM', 'SLA'],
  strategy: [
    'BSC', 'アンゾフの成長マトリクス', 'PEST分析', '3C分析', 'ファイブフォース分析',
    'MRP', 'JIT', 'SFA', 'ROE', 'ROA', 'EPS', 'キャッシュフロー計算書',
    '中小受託取引適正化法', '不正競争防止法', '営業秘密', 'JIS', 'ISO', 'デファクトスタンダード',
  ],
} as const);

export const subjectATermCoverageCount = Object.values(subjectATermCoverage).flat().length;
