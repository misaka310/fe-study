import type { Question } from '../domain/types';
import { glossary } from './glossary';

export interface QuestionAcronymEntry {
  term: string;
  expansion: string;
  meaning: string;
}

/**
 * 問題解説では、試験学習上「英語の正式名称まで覚える価値がある略語」だけを補足する。
 * CPU など、基本用語として十分に浸透しているもの、単位、SQL予約語、変数名などは表示しない。
 */
export const questionAcronymExclusions = Object.freeze(new Set([
  'CPU', 'GPU', 'PC', 'OS', 'IP', 'DB', 'ID', 'UI', 'GUI', 'URL', 'IT',
  'HTML', 'CSS', 'SVG', 'LAN', 'RAM', 'ROM', 'VM', 'VPN',
  'KB', 'MB', 'GB', 'TB',
  'AB', 'FE24', 'T1', 'T2', 'L2', 'L3',
  'AND', 'OR', 'NOT', 'XOR', 'NAND',
  'SELECT', 'WHERE', 'HAVING', 'GROUP', 'ORDER', 'BY', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS',
  'DISTINCT', 'VALUES', 'NULL', 'CHECK', 'UNIQUE', 'KEY', 'FOREIGN', 'SUM', 'CREATE', 'TABLE',
  'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'CHECKPOINT', 'REDO', 'UNDO',
  'TCP/IP', 'TCP/UDP', 'LZ77',
  // 科目Bの擬似コードで使うデータ文字列・配列ラベルであり、略語ではない。
  'CAD', 'ADE', 'BCA', 'A3B2C2', 'A3B3C1', 'ABC7', 'AI', 'CA', 'CD',
]));

const inheritedEntries = Object.fromEntries(
  Object.values(glossary)
    .filter((entry): entry is typeof entry & { expansion: string } => Boolean(entry.expansion))
    .map((entry) => [entry.term, { term: entry.term, expansion: entry.expansion, meaning: entry.meaning }]),
) as Record<string, QuestionAcronymEntry>;

export const questionAcronymGlossary: Readonly<Record<string, QuestionAcronymEntry>> = Object.freeze({
  ...inheritedEntries,
  ACID: { term: 'ACID', expansion: 'Atomicity, Consistency, Isolation, Durability', meaning: 'トランザクションの原子性・一貫性・独立性・永続性を表します。' },
  CRUD: { term: 'CRUD', expansion: 'Create, Read, Update, Delete', meaning: 'データの作成・参照・更新・削除という基本操作をまとめた呼び方です。' },
  ABI: { term: 'ABI', expansion: 'Application Binary Interface', meaning: 'バイナリレベルでの呼出し規約やデータ配置など、プログラム間の互換条件です。' },
  AC: { term: 'AC', expansion: 'Actual Cost', meaning: 'EVMで、ある時点までに実際に発生したコストです。' },
  AES: { term: 'AES', expansion: 'Advanced Encryption Standard', meaning: '共通鍵暗号方式の標準として広く使われるブロック暗号です。' },
  ALU: { term: 'ALU', expansion: 'Arithmetic Logic Unit', meaning: 'CPU内部で算術演算や論理演算を行う演算装置です。' },
  ARP: { term: 'ARP', expansion: 'Address Resolution Protocol', meaning: 'IPv4アドレスから同一リンク上のMACアドレスを求めるプロトコルです。' },
  BAC: { term: 'BAC', expansion: 'Budget at Completion', meaning: 'EVMで、プロジェクト完了までの総予算です。' },
  BCNF: { term: 'BCNF', expansion: 'Boyce-Codd Normal Form', meaning: '関係データベースの正規形の一つで、決定項が候補キーになることを求めます。' },
  BPR: { term: 'BPR', expansion: 'Business Process Re-engineering', meaning: '業務プロセスを抜本的に見直し、再設計する考え方です。' },
  CBC: { term: 'CBC', expansion: 'Cipher Block Chaining', meaning: 'ブロック暗号で直前の暗号文ブロックを次の処理へ連鎖させる利用モードです。' },
  CDN: { term: 'CDN', expansion: 'Content Delivery Network', meaning: '複数拠点からコンテンツを配信し、遅延や配信元負荷を減らす仕組みです。' },
  CI: { term: 'CI', expansion: 'Continuous Integration', meaning: '変更を頻繁に統合し、自動ビルドやテストで問題を早期検出する開発手法です。' },
  CLI: { term: 'CLI', expansion: 'Command Line Interface', meaning: '文字コマンドを入力して操作するインタフェースです。' },
  CNAME: { term: 'CNAME', expansion: 'Canonical Name', meaning: 'DNSで別の正式な名前への別名を定義するレコードです。' },
  COCOMO: { term: 'COCOMO', expansion: 'Constructive Cost Model', meaning: 'ソフトウェア規模などから開発工数を見積もるモデルです。' },
  CPI: { term: 'CPI', expansion: 'Cost Performance Index', meaning: 'EVMで EV÷AC として求めるコスト効率の指標です。' },
  CRC: { term: 'CRC', expansion: 'Cyclic Redundancy Check', meaning: 'データに検査値を付け、伝送や保存時の誤りを検出する方式です。' },
  CRL: { term: 'CRL', expansion: 'Certificate Revocation List', meaning: '失効したデジタル証明書を一覧化したリストです。' },
  CRM: { term: 'CRM', expansion: 'Customer Relationship Management', meaning: '顧客との関係を継続的に管理・改善する考え方や仕組みです。' },
  CSF: { term: 'CSF', expansion: 'Critical Success Factor', meaning: '目標達成のために特に重要となる成功要因です。' },
  CSRF: { term: 'CSRF', expansion: 'Cross-Site Request Forgery', meaning: 'ログイン済み利用者のブラウザに意図しない要求を送らせる攻撃です。' },
  DBMS: { term: 'DBMS', expansion: 'Database Management System', meaning: 'データベースの定義・検索・更新・保護などを管理するソフトウェアです。' },
  DCCP: { term: 'DCCP', expansion: 'Datagram Congestion Control Protocol', meaning: 'データグラム型通信に輻輳制御を提供するトランスポートプロトコルです。' },
  DHCP: { term: 'DHCP', expansion: 'Dynamic Host Configuration Protocol', meaning: 'IPアドレスなどのネットワーク設定を端末へ自動配布するプロトコルです。' },
  DKIM: { term: 'DKIM', expansion: 'DomainKeys Identified Mail', meaning: '送信ドメインがメールへ電子署名を付け、改ざんや送信元を検証しやすくする仕組みです。' },
  DMA: { term: 'DMA', expansion: 'Direct Memory Access', meaning: 'CPUが逐次転送せず、装置と主記憶の間で直接データ転送する仕組みです。' },
  DMARC: { term: 'DMARC', expansion: 'Domain-based Message Authentication, Reporting and Conformance', meaning: 'SPFやDKIMの結果を使い、メール認証ポリシーと報告を扱う仕組みです。' },
  EC: { term: 'EC', expansion: 'Electronic Commerce', meaning: 'インターネットなどの電子的な手段を使う商取引です。' },
  EDI: { term: 'EDI', expansion: 'Electronic Data Interchange', meaning: '企業間で受発注などの取引データを標準形式で電子交換する仕組みです。' },
  ERP: { term: 'ERP', expansion: 'Enterprise Resource Planning', meaning: '販売・購買・在庫・会計などの基幹業務を統合して管理する考え方です。' },
  EV: { term: 'EV', expansion: 'Earned Value', meaning: 'EVMで、完了した作業を予算額に換算した出来高です。' },
  EVM: { term: 'EVM', expansion: 'Earned Value Management', meaning: '予算・出来高・実コストを使って進捗とコストを定量管理する手法です。' },
  FIFO: { term: 'FIFO', expansion: 'First In, First Out', meaning: '先に入れたものを先に取り出す方式です。' },
  GC: { term: 'GC', expansion: 'Garbage Collection', meaning: '不要になったメモリ領域を自動的に回収する仕組みです。' },
  HMAC: { term: 'HMAC', expansion: 'Hash-based Message Authentication Code', meaning: '秘密鍵とハッシュ関数を使って改ざん検知と送信者確認を行う方式です。' },
  HTTPS: { term: 'HTTPS', expansion: 'Hypertext Transfer Protocol Secure', meaning: 'HTTP通信をTLSで保護して暗号化・相手確認を行う仕組みです。' },
  'I/O': { term: 'I/O', expansion: 'Input / Output', meaning: 'コンピュータへの入力と、コンピュータからの出力をまとめた表記です。' },
  IDS: { term: 'IDS', expansion: 'Intrusion Detection System', meaning: '不正侵入や攻撃の兆候を検知して通知する仕組みです。' },
  IPC: { term: 'IPC', expansion: 'Inter-Process Communication', meaning: '別々のプロセス間でデータや通知をやり取りする仕組みです。' },
  IPS: { term: 'IPS', expansion: 'Intrusion Prevention System', meaning: '不正通信を検知し、必要に応じて遮断まで行う仕組みです。' },
  IRR: { term: 'IRR', expansion: 'Internal Rate of Return', meaning: '投資の正味現在価値が0になる割引率で、投資収益性の評価に使います。' },
  'ISO/IEC': { term: 'ISO/IEC', expansion: 'International Organization for Standardization / International Electrotechnical Commission', meaning: '国際標準化機構と国際電気標準会議による国際規格で使われる表記です。' },
  JIT: { term: 'JIT', expansion: 'Just In Time', meaning: '必要な物を必要な時に必要な量だけ供給・生産する考え方です。' },
  KDF: { term: 'KDF', expansion: 'Key Derivation Function', meaning: 'パスワードなどから暗号鍵用途の値を導出する関数です。' },
  KGI: { term: 'KGI', expansion: 'Key Goal Indicator', meaning: '最終的な目標の達成度を測る重要目標達成指標です。' },
  KPI: { term: 'KPI', expansion: 'Key Performance Indicator', meaning: '最終目標へ向かう途中の進捗を継続測定する重要業績評価指標です。' },
  LIFO: { term: 'LIFO', expansion: 'Last In, First Out', meaning: '最後に入れたものを最初に取り出す方式です。' },
  LOC: { term: 'LOC', expansion: 'Lines of Code', meaning: 'ソースコードの行数をソフトウェア規模の目安として数える指標です。' },
  LRU: { term: 'LRU', expansion: 'Least Recently Used', meaning: '最も長く使われていない対象を置換・削除する方式です。' },
  MAC: { term: 'MAC', expansion: 'Media Access Control', meaning: 'LAN上のデータリンク層で機器を識別するMACアドレスなどに関わる方式です。' },
  MTBF: { term: 'MTBF', expansion: 'Mean Time Between Failures', meaning: '修理可能な機器で、故障から次の故障までの平均稼働時間です。' },
  MTTF: { term: 'MTTF', expansion: 'Mean Time To Failure', meaning: '使用開始から故障するまでの平均時間です。' },
  MTTR: { term: 'MTTR', expansion: 'Mean Time To Repair', meaning: '故障してから修理・復旧するまでの平均時間です。' },
  MX: { term: 'MX', expansion: 'Mail Exchange', meaning: 'DNSでメールの配送先メールサーバを示すレコードです。' },
  NDP: { term: 'NDP', expansion: 'Neighbor Discovery Protocol', meaning: 'IPv6で近隣探索やアドレス解決などを行う仕組みです。' },
  NPV: { term: 'NPV', expansion: 'Net Present Value', meaning: '将来のキャッシュフローを現在価値へ割り引き、投資価値を評価する指標です。' },
  OCSP: { term: 'OCSP', expansion: 'Online Certificate Status Protocol', meaning: 'デジタル証明書の失効状態をオンラインで照会するプロトコルです。' },
  OKR: { term: 'OKR', expansion: 'Objectives and Key Results', meaning: '目標と、その達成度を測る主要な成果をセットで管理する手法です。' },
  OLA: { term: 'OLA', expansion: 'Operational Level Agreement', meaning: 'サービス提供組織の内部部門間で運用上の役割や水準を定める合意です。' },
  OSI: { term: 'OSI', expansion: 'Open Systems Interconnection', meaning: '通信機能を階層化して整理する参照モデルの名称です。' },
  OSS: { term: 'OSS', expansion: 'Open Source Software', meaning: 'ソースコードが公開され、ライセンス条件の下で利用・改変・再配布できるソフトウェアです。' },
  PERT: { term: 'PERT', expansion: 'Program Evaluation and Review Technique', meaning: '作業の依存関係や所要時間からプロジェクト日程を分析する手法です。' },
  PEST: { term: 'PEST', expansion: 'Political, Economic, Social, Technological', meaning: '政治・経済・社会・技術の外部環境から事業環境を分析する枠組みです。' },
  PPM: { term: 'PPM', expansion: 'Product Portfolio Management', meaning: '市場成長率と相対的市場占有率などで事業を分類し、資源配分を検討する手法です。' },
  PTR: { term: 'PTR', expansion: 'Pointer', meaning: 'DNSの逆引きでIPアドレスに対応するホスト名を示すPTRレコードです。' },
  PV: { term: 'PV', expansion: 'Planned Value', meaning: 'EVMで、ある時点までに完了する予定だった作業の予算額です。' },
  QUIC: { term: 'QUIC', expansion: 'Quick UDP Internet Connections (original name)', meaning: 'UDP上で低遅延な接続確立や多重化を実現するトランスポートプロトコルです。' },
  RACI: { term: 'RACI', expansion: 'Responsible, Accountable, Consulted, Informed', meaning: '作業ごとの実行責任・説明責任・相談先・報告先を整理する役割分担表です。' },
  RAID: { term: 'RAID', expansion: 'Redundant Array of Independent Disks', meaning: '複数ディスクを組み合わせ、性能や耐障害性を高める方式です。' },
  REST: { term: 'REST', expansion: 'Representational State Transfer', meaning: 'HTTPなどを使うWeb API設計で広く使われるアーキテクチャスタイルです。' },
  RFC: { term: 'RFC', expansion: 'Request for Comments', meaning: 'インターネット技術の仕様や標準化文書として公開される文書系列です。' },
  RFP: { term: 'RFP', expansion: 'Request for Proposal', meaning: '発注側が候補ベンダへ提案を依頼するための文書です。' },
  ROA: { term: 'ROA', expansion: 'Return on Assets', meaning: '総資産に対してどれだけ利益を生んだかを見る収益性指標です。' },
  ROE: { term: 'ROE', expansion: 'Return on Equity', meaning: '自己資本に対してどれだけ利益を生んだかを見る収益性指標です。' },
  ROI: { term: 'ROI', expansion: 'Return on Investment', meaning: '投資額に対して得られた利益の割合を評価する指標です。' },
  'S/MIME': { term: 'S/MIME', expansion: 'Secure / Multipurpose Internet Mail Extensions', meaning: '電子メールへ暗号化やデジタル署名を提供する仕組みです。' },
  SCM: { term: 'SCM', expansion: 'Supply Chain Management', meaning: '調達・生産・在庫・物流など供給連鎖全体を最適化する考え方です。' },
  SCTP: { term: 'SCTP', expansion: 'Stream Control Transmission Protocol', meaning: '複数ストリームや複数経路を扱えるトランスポートプロトコルです。' },
  SFA: { term: 'SFA', expansion: 'Sales Force Automation', meaning: '営業活動の記録・案件・進捗などを支援・管理する仕組みです。' },
  SHA: { term: 'SHA', expansion: 'Secure Hash Algorithm', meaning: '改ざん検知などに使われる暗号学的ハッシュ関数群の名称です。' },
  SLA: { term: 'SLA', expansion: 'Service Level Agreement', meaning: 'サービス提供者と利用者の間で品質水準を定める合意です。' },
  SLO: { term: 'SLO', expansion: 'Service Level Objective', meaning: 'サービス品質について達成を目指す具体的な目標値です。' },
  SPF: { term: 'SPF', expansion: 'Sender Policy Framework', meaning: 'そのドメインのメール送信を許可された送信元IPをDNSで示す仕組みです。' },
  SPI: { term: 'SPI', expansion: 'Schedule Performance Index', meaning: 'EVMで EV÷PV として求める進捗効率の指標です。' },
  SWOT: { term: 'SWOT', expansion: 'Strengths, Weaknesses, Opportunities, Threats', meaning: '強み・弱み・機会・脅威の4観点で内部・外部環境を整理する分析です。' },
  TCO: { term: 'TCO', expansion: 'Total Cost of Ownership', meaning: '導入費だけでなく運用・保守・更新などを含めた総保有コストです。' },
  UML: { term: 'UML', expansion: 'Unified Modeling Language', meaning: 'ソフトウェアやシステムの構造・振る舞いを図で表すためのモデリング言語です。' },
  VLAN: { term: 'VLAN', expansion: 'Virtual Local Area Network', meaning: '物理構成とは別に、LANを論理的なブロードキャストドメインへ分割する技術です。' },
  WAF: { term: 'WAF', expansion: 'Web Application Firewall', meaning: 'HTTPリクエスト内容を検査し、Webアプリへの攻撃を検知・遮断する仕組みです。' },
  WBS: { term: 'WBS', expansion: 'Work Breakdown Structure', meaning: 'プロジェクトの成果物や作業を階層的に分解した構造です。' },
  AIOPS: { term: 'AIOPS', expansion: 'Artificial Intelligence for IT Operations', meaning: '運用データをAIで分析し、異常検知や運用自動化へ活用する考え方です。' },
  CMDB: { term: 'CMDB', expansion: 'Configuration Management Database', meaning: '構成アイテムとそれらの関係を記録・管理するデータベースです。' },
  CMMI: { term: 'CMMI', expansion: 'Capability Maturity Model Integration', meaning: '組織の開発プロセスを成熟度の観点から評価・改善するモデルです。' },
  CSMA: { term: 'CSMA', expansion: 'Carrier Sense Multiple Access', meaning: '通信路が空いているか確認してから送信する媒体アクセス制御方式です。' },
  'CSMA/CA': { term: 'CSMA/CA', expansion: 'Carrier Sense Multiple Access with Collision Avoidance', meaning: '無線LANなどで衝突をできるだけ避けて送信する方式です。' },
  'CSMA/CD': { term: 'CSMA/CD', expansion: 'Carrier Sense Multiple Access with Collision Detection', meaning: '共有型Ethernetで衝突を検出して再送する方式です。' },
  CVE: { term: 'CVE', expansion: 'Common Vulnerabilities and Exposures', meaning: '公開された脆弱性を共通の識別子で管理する仕組みです。' },
  CVSS: { term: 'CVSS', expansion: 'Common Vulnerability Scoring System', meaning: '脆弱性の深刻度を共通尺度で評価する方式です。' },
  DDD: { term: 'DDD', expansion: 'Domain-Driven Design', meaning: '業務ドメインのモデルを中心にソフトウェアを設計する考え方です。' },
  DDL: { term: 'DDL', expansion: 'Data Definition Language', meaning: '表やスキーマなどデータベース構造を定義する言語分類です。' },
  DML: { term: 'DML', expansion: 'Data Manipulation Language', meaning: 'データの検索・追加・更新・削除などを行う言語分類です。' },
  DMZ: { term: 'DMZ', expansion: 'Demilitarized Zone', meaning: '外部公開サーバを内部ネットワークから分離して配置するネットワーク領域です。' },
  DRAM: { term: 'DRAM', expansion: 'Dynamic Random Access Memory', meaning: 'リフレッシュが必要ですが高密度化しやすく、主記憶に広く使われるメモリです。' },
  EDR: { term: 'EDR', expansion: 'Endpoint Detection and Response', meaning: '端末上の不審な挙動を継続監視し、検知・調査・対応を支援する仕組みです。' },
  HDMI: { term: 'HDMI', expansion: 'High-Definition Multimedia Interface', meaning: '映像と音声をデジタル伝送するインタフェース規格です。' },
  ISO: { term: 'ISO', expansion: 'International Organization for Standardization', meaning: '国際規格の策定を行う国際標準化機構です。' },
  JIS: { term: 'JIS', expansion: 'Japanese Industrial Standards', meaning: '日本の産業製品や情報処理などに関する国家規格です。' },
  MRP: { term: 'MRP', expansion: 'Material Requirements Planning', meaning: '生産計画・部品表・在庫から資材の必要量と時期を計算する仕組みです。' },
  MVC: { term: 'MVC', expansion: 'Model-View-Controller', meaning: 'データ・表示・制御へ責務を分ける代表的な設計パターンです。' },
  NTP: { term: 'NTP', expansion: 'Network Time Protocol', meaning: 'ネットワーク上の機器の時刻を同期するプロトコルです。' },
  PCI: { term: 'PCI', expansion: 'Peripheral Component Interconnect', meaning: 'コンピュータ内部の拡張バス規格群に関係する名称です。' },
  PKI: { term: 'PKI', expansion: 'Public Key Infrastructure', meaning: '公開鍵証明書の発行・検証・失効管理などを支える信頼基盤です。' },
  POP3: { term: 'POP3', expansion: 'Post Office Protocol version 3', meaning: 'メールサーバからメールを受信するためのプロトコルです。' },
  SIEM: { term: 'SIEM', expansion: 'Security Information and Event Management', meaning: '複数システムのログやイベントを集約し、相関分析する仕組みです。' },
  SLCP: { term: 'SLCP', expansion: 'Software Life Cycle Process', meaning: 'ソフトウェアの企画から開発・運用・保守までのライフサイクルプロセスを整理する枠組みです。' },
  SNMP: { term: 'SNMP', expansion: 'Simple Network Management Protocol', meaning: 'ネットワーク機器の状態取得や管理に使うプロトコルです。' },
  SOC: { term: 'SOC', expansion: 'Security Operations Center', meaning: 'セキュリティ監視やインシデント対応を集中的に担う組織・機能です。' },
  SOLID: { term: 'SOLID', expansion: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion', meaning: '保守しやすいオブジェクト指向設計のための五つの原則をまとめた呼び方です。' },
  SPOC: { term: 'SPOC', expansion: 'Single Point of Contact', meaning: '利用者との連絡窓口を一つに集約する考え方です。' },
  SPOF: { term: 'SPOF', expansion: 'Single Point of Failure', meaning: 'そこが故障するとシステム全体の停止につながる単一障害点です。' },
  SRAM: { term: 'SRAM', expansion: 'Static Random Access Memory', meaning: 'リフレッシュ不要で高速なためCPUキャッシュなどに使われるメモリです。' },
  SSD: { term: 'SSD', expansion: 'Solid State Drive', meaning: 'フラッシュメモリなどを記憶媒体に用いる補助記憶装置です。' },
  USB: { term: 'USB', expansion: 'Universal Serial Bus', meaning: '周辺機器を接続するための汎用的なシリアルインタフェース規格です。' },
  XP: { term: 'XP', expansion: 'Extreme Programming', meaning: '短い反復、継続的なフィードバック、テストなどを重視するアジャイル開発手法です。' },
  XSS: { term: 'XSS', expansion: 'Cross-Site Scripting', meaning: 'Webページへ悪意あるスクリプトを混入させ、利用者のブラウザで実行させる攻撃です。' },
});

function questionSearchText(question: Question) {
  return [
    question.topic,
    question.stem,
    ...question.choices,
    question.explanation,
    ...question.choiceReasons,
  ].join('\n');
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsTerm(text: string, term: string) {
  const pattern = new RegExp(`(^|[^A-Z0-9])${escapeRegExp(term)}(?=$|[^A-Z0-9])`);
  return pattern.test(text);
}

export function questionAcronymEntries(question: Question): QuestionAcronymEntry[] {
  const text = questionSearchText(question);
  return Object.values(questionAcronymGlossary)
    .filter((entry) => !questionAcronymExclusions.has(entry.term) && containsTerm(text, entry.term))
    .sort((left, right) => text.indexOf(left.term) - text.indexOf(right.term));
}

export function extractQuestionAcronymTokens(question: Question): string[] {
  const text = questionSearchText(question);
  return [...new Set(text.match(/\b(?:[A-Z][A-Z0-9]+(?:\/[A-Z0-9]+)*|[A-Z]\/[A-Z0-9]+)\b/g) ?? [])];
}
