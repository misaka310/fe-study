import type { Question } from '../domain/types';

interface VocabularyCard {
  set: 1 | 2 | 3;
  term: string;
  meaning: string;
  materialId: string;
}

const cards: VocabularyCard[] = [
  { set: 1, term: 'CPU', meaning: 'Central Processing Unit（中央処理装置）。命令を解釈し、演算や制御を行うコンピュータの中心部', materialId: '03-computer' },
  { set: 1, term: 'ALU', meaning: 'Arithmetic Logic Unit（算術論理演算装置）。加減算や論理演算を実行するCPU内部の装置', materialId: '03-computer' },
  { set: 1, term: 'RAM', meaning: 'Random Access Memory。読み書きできるが、電源を切ると内容が失われる主記憶', materialId: '03-computer' },
  { set: 1, term: 'ROM', meaning: 'Read Only Memory。電源を切っても内容が保持され、基本制御プログラムなどを格納する記憶', materialId: '03-computer' },
  { set: 1, term: 'OS', meaning: 'Operating System（オペレーティングシステム）。ハードウェアを管理し、アプリケーションへ機能を提供する基本ソフトウェア', materialId: '04-software' },
  { set: 1, term: 'API', meaning: 'Application Programming Interface。別のプログラムから機能を呼び出すための規約や窓口', materialId: '04-software' },
  { set: 1, term: 'SQL', meaning: 'Structured Query Language。関係データベースの検索・追加・更新・削除などを行う言語', materialId: '06-database' },
  { set: 1, term: 'DBMS', meaning: 'Database Management System。データベースの定義、検索、更新、同時実行や障害回復を管理するソフトウェア', materialId: '06-database' },
  { set: 1, term: 'IPアドレス', meaning: 'ネットワーク上のインタフェースを論理的に識別し、パケットの宛先や経路選択に使う番号', materialId: '07-network' },
  { set: 1, term: 'DNS', meaning: 'Domain Name System。ドメイン名とIPアドレスなどの資源レコードを対応付ける仕組み', materialId: '07-network' },
  { set: 1, term: 'HTTP', meaning: 'Hypertext Transfer Protocol。Webの要求と応答で文書やAPIデータを転送する通信規約', materialId: '07-network' },
  { set: 1, term: 'TCP', meaning: 'Transmission Control Protocol。順序制御や再送制御を行う信頼性重視の通信プロトコル', materialId: '07-network' },
  { set: 1, term: 'UDP', meaning: 'User Datagram Protocol。接続確立や再送を省き、低遅延を重視して送る通信プロトコル', materialId: '07-network' },
  { set: 1, term: 'URL', meaning: 'Uniform Resource Locator。Web上の資源がどこにあり、どの方式で取得するかを示す文字列', materialId: '07-network' },
  { set: 1, term: 'HTML', meaning: 'HyperText Markup Language。Webページの文書構造や要素を記述するマークアップ言語', materialId: '04-software' },
  { set: 1, term: 'CSS', meaning: 'Cascading Style Sheets。HTMLなどで表した文書の色、配置、文字などの見た目を指定する仕組み', materialId: '04-software' },
  { set: 1, term: 'LAN', meaning: 'Local Area Network。建物や敷地など限られた範囲で構成するネットワーク', materialId: '07-network' },
  { set: 1, term: 'WAN', meaning: 'Wide Area Network。拠点間など広い地域を結ぶネットワーク', materialId: '07-network' },
  { set: 1, term: 'GUI', meaning: 'Graphical User Interface。アイコンやメニューなど視覚的な部品で操作する利用者インタフェース', materialId: '04-software' },
  { set: 1, term: 'CLI', meaning: 'Command Line Interface。文字でコマンドを入力して操作する利用者インタフェース', materialId: '04-software' },

  { set: 2, term: 'TTL', meaning: 'Time To Live（生存時間）。DNSキャッシュやパケットが有効でいられる期間・回数を表す値', materialId: '07-network' },
  { set: 2, term: 'TLS', meaning: 'Transport Layer Security。証明書による認証と暗号化で通信を保護するプロトコル', materialId: '07-network' },
  { set: 2, term: 'NAT', meaning: 'Network Address Translation。プライベートIPアドレスとグローバルIPアドレスを変換する技術', materialId: '07-network' },
  { set: 2, term: 'DHCP', meaning: 'Dynamic Host Configuration Protocol。IPアドレスやゲートウェイなどの設定を端末へ自動配布するプロトコル', materialId: '07-network' },
  { set: 2, term: 'ARP', meaning: 'Address Resolution Protocol。IPv4アドレスに対応するMACアドレスを問い合わせるプロトコル', materialId: '07-network' },
  { set: 2, term: 'VLAN', meaning: 'Virtual LAN。物理的な構成に依存せず、LANを論理的な複数のネットワークへ分割する技術', materialId: '07-network' },
  { set: 2, term: 'CDN', meaning: 'Content Delivery Network。利用者に近い分散拠点からコンテンツを配信する仕組み', materialId: '07-network' },
  { set: 2, term: 'WAF', meaning: 'Web Application Firewall。HTTP要求を検査し、Webアプリケーションへの攻撃を防ぐ仕組み', materialId: '08-security' },
  { set: 2, term: 'IDS', meaning: 'Intrusion Detection System。不正侵入や不審な通信を検知して通知する仕組み', materialId: '08-security' },
  { set: 2, term: 'IPS', meaning: 'Intrusion Prevention System。不正な通信を検知するだけでなく遮断する仕組み', materialId: '08-security' },
  { set: 2, term: '多要素認証', meaning: '知識・所持・生体など異なる認証要素を二種類以上組み合わせて本人確認する方法', materialId: '08-security' },
  { set: 2, term: '機密性', meaning: '許可された者だけが情報へアクセスできるようにする情報セキュリティの性質', materialId: '08-security' },
  { set: 2, term: '完全性', meaning: '情報が正確で、意図しない改ざんや欠損がない状態を維持する性質', materialId: '08-security' },
  { set: 2, term: '可用性', meaning: '許可された利用者が、必要なときに情報やサービスを利用できる性質', materialId: '08-security' },
  { set: 2, term: 'ハッシュ関数', meaning: '任意長のデータから固定長の値を計算し、改ざん検知などに使う関数', materialId: '08-security' },
  { set: 2, term: 'ディジタル署名', meaning: '秘密鍵で署名を作り、公開鍵で送信者と内容の改ざんを検証する仕組み', materialId: '08-security' },
  { set: 2, term: '公開鍵暗号', meaning: '暗号化と復号に数学的に関連する異なる鍵を使う暗号方式', materialId: '08-security' },
  { set: 2, term: '共通鍵暗号', meaning: '暗号化と復号に同じ秘密鍵を使い、大量データを高速に処理できる暗号方式', materialId: '08-security' },
  { set: 2, term: 'RAID 1', meaning: '同じデータを複数のディスクへ書き込むミラーリングで、耐障害性を高める方式', materialId: '03-computer' },
  { set: 2, term: 'バックアップ', meaning: '障害や誤操作に備え、データを別の媒体や場所へ複製して保管すること', materialId: '08-security' },

  { set: 3, term: '主キー', meaning: '表の各行を一意に識別し、NULLや値の重複を許さない属性', materialId: '06-database' },
  { set: 3, term: '外部キー', meaning: '別表の主キーなどを参照し、表同士の参照整合性を保つ属性', materialId: '06-database' },
  { set: 3, term: '第3正規形', meaning: '非キー属性間の推移的な関数従属を分離して整理した関係スキーマ', materialId: '06-database' },
  { set: 3, term: 'トランザクション', meaning: 'データベースで一体として成功または失敗させる処理の論理単位', materialId: '06-database' },
  { set: 3, term: 'WBS', meaning: 'Work Breakdown Structure。成果物と作業を管理可能な単位まで階層的に分解した構造', materialId: '10-management' },
  { set: 3, term: 'EVM', meaning: 'Earned Value Management。計画価値・出来高・実コストで費用と進捗を定量管理する手法', materialId: '10-management' },
  { set: 3, term: 'SLA', meaning: 'Service Level Agreement。可用性や応答時間など、サービス水準を合意した文書', materialId: '10-management' },
  { set: 3, term: 'KPI', meaning: 'Key Performance Indicator。目標の達成度を継続的に測る主要業績評価指標', materialId: '11-strategy' },
  { set: 3, term: 'SWOT分析', meaning: '強み・弱みという内部環境と、機会・脅威という外部環境を整理する手法', materialId: '11-strategy' },
  { set: 3, term: 'ERP', meaning: 'Enterprise Resource Planning。会計・販売・生産など基幹業務を統合管理する仕組み', materialId: '11-strategy' },
  { set: 3, term: 'CRM', meaning: 'Customer Relationship Management。顧客との関係や接点の情報を統合して活用する仕組み', materialId: '11-strategy' },
  { set: 3, term: 'SCM', meaning: 'Supply Chain Management。調達から生産・物流・販売までの供給連鎖を最適化する考え方', materialId: '11-strategy' },
  { set: 3, term: 'ROI', meaning: 'Return On Investment。投資額に対して得られた利益の割合で投資効率を評価する指標', materialId: '11-strategy' },
  { set: 3, term: 'UML', meaning: 'Unified Modeling Language。システムの構造や振る舞いを図で表す標準モデリング言語', materialId: '09-development' },
  { set: 3, term: 'MVC', meaning: 'Model・View・Controller。データ、表示、入力制御の責務を分離する設計パターン', materialId: '09-development' },
  { set: 3, term: 'アジャイル開発', meaning: '短い反復で動く成果を届け、利用者のフィードバックを取り込んで適応する開発方法', materialId: '09-development' },
  { set: 3, term: '回帰テスト', meaning: '変更によって既存機能へ予期しない影響が生じていないか再確認するテスト', materialId: '09-development' },
  { set: 3, term: 'ブラックボックステスト', meaning: '内部構造に依存せず、入力と出力の仕様からテストケースを設計する方法', materialId: '09-development' },
  { set: 3, term: 'リファクタリング', meaning: '外部から見た振る舞いを変えず、コード内部の構造を改善する活動', materialId: '09-development' },
  { set: 3, term: 'クリティカルパス', meaning: '遅延するとプロジェクト全体の完了が遅れる、所要時間が最長の作業経路', materialId: '10-management' },
];

function makeVocabularyQuestions(setCards: VocabularyCard[]): Question[] {
  return setCards.map((card, index) => {
    const position = (index % 4) as 0 | 1 | 2 | 3;
    const wrongCards = [1, 2, 3].map((offset) => setCards[(index + offset) % setCards.length]);
    const entries = wrongCards.map((wrong) => ({ term: wrong.term, reason: `不正解。${wrong.term}は「${wrong.meaning}」を表すため、説明とは一致しません。` }));
    entries.splice(position, 0, { term: card.term, reason: `正解。${card.term}は「${card.meaning}」を表す用語です。` });
    return {
      id: `vocabulary-set${card.set}-${String(index + 1).padStart(2, '0')}`,
      subject: 'A',
      domain: 'vocabulary',
      topic: `基礎単語・${card.term}`,
      stem: `次の意味・役割を表す用語はどれか。\n${card.meaning}`,
      choices: entries.map((entry) => entry.term),
      correct: [position],
      explanation: `決め手は、説明の中心となる意味が「${card.meaning}」であることです。${card.term}を見たら、この役割と結び付けて覚えます。`,
      choiceReasons: entries.map((entry) => entry.reason),
      materialId: card.materialId,
      difficulty: 1,
      practiceKind: 'vocabulary',
      vocabularySet: card.set,
    } satisfies Question;
  });
}

export const vocabularyQuestions = Object.freeze(cards.flatMap((card, index) => {
  const setStart = Math.floor(index / 20) * 20;
  return index % 20 === 0 ? makeVocabularyQuestions(cards.slice(setStart, setStart + 20)) : [];
}).flat());
