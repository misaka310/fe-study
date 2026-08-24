export interface GlossaryEntry {
  term: string;
  expansion?: string;
  meaning: string;
  examCue: string;
  contrast?: string;
  related?: string[];
}

export const glossary: Record<string, GlossaryEntry> = {
  TTL: { term: 'TTL', expansion: 'Time To Live', meaning: 'DNSなどのキャッシュの有効期間を何秒とみなすかを示します。', examCue: '名前解決の変更がいつ反映されるかを問われたら、TTLが短いほど再問い合わせが起きやすいと考えます。', contrast: 'DNSレコードそのものではなく、キャッシュの保持時間です。', related: ['DNS'] },
  DNS: { term: 'DNS', expansion: 'Domain Name System', meaning: 'ドメイン名とIPアドレスなどの情報を対応付ける仕組みです。', examCue: '名前は解決できるが通信できない場合、DNSとTCP/IPの問題を分けて考えます。', contrast: 'DNSは名前解決であり、Webページの転送はHTTPが担当します。', related: ['TTL', 'HTTP'] },
  TCP: { term: 'TCP', expansion: 'Transmission Control Protocol', meaning: '接続を確立し、順序制御・再送・流量制御を行う通信プロトコルです。', examCue: '到達性や順序の信頼性が必要な条件ではTCPを選びます。', contrast: 'UDPは標準の再送や順序制御を行わず、遅延を抑えやすい方式です。', related: ['UDP'] },
  UDP: { term: 'UDP', expansion: 'User Datagram Protocol', meaning: '接続を確立せず、少ない制御でデータグラムを送るプロトコルです。', examCue: '遅延を抑えたい、再送をアプリケーション側で制御する条件に向きます。', contrast: 'TCPのような標準の到達保証・順序制御はありません。', related: ['TCP'] },
  HTTP: { term: 'HTTP', expansion: 'Hypertext Transfer Protocol', meaning: 'Webの要求と応答で文書やAPIデータを転送するプロトコルです。', examCue: 'HTTPSはHTTPをTLSで保護したものとして、役割を分けて答えます。', contrast: 'TLSは保護、HTTPはアプリケーションの要求と応答を担当します。', related: ['TLS'] },
  TLS: { term: 'TLS', expansion: 'Transport Layer Security', meaning: '通信相手の確認と暗号化によってアプリケーション通信を保護します。', examCue: 'HTTPSの安全性を問われたら、証明書による認証と暗号化を確認します。', contrast: '暗号化は機密性、ディジタル署名は送信者確認と改ざん検知が中心です。', related: ['HTTP'] },
  SMTP: { term: 'SMTP', expansion: 'Simple Mail Transfer Protocol', meaning: 'メールの送信やメールサーバ間の転送に使うプロトコルです。', examCue: '送信と受信を分ける問題では、SMTPは送信側だと判断します。', contrast: 'POP3やIMAPは受信・同期側のプロトコルです。', related: ['IMAP'] },
  IMAP: { term: 'IMAP', expansion: 'Internet Message Access Protocol', meaning: 'メールをサーバ側に保ち、複数端末で状態を同期して読むプロトコルです。', examCue: '複数端末で既読状態やフォルダを同期したい条件に向きます。', contrast: 'POP3は端末へダウンロードして読む使い方が基本です。', related: ['SMTP'] },
  NAT: { term: 'NAT', expansion: 'Network Address Translation', meaning: 'プライベートIPアドレスとグローバルIPアドレスを変換します。', examCue: 'アドレス変換の有無と、ポート番号まで変換するかを区別します。', contrast: 'NAPTは一つのグローバルIPを複数端末で共有しやすくする方式です。', related: ['NAPT'] },
  NAPT: { term: 'NAPT', expansion: 'Network Address Port Translation', meaning: 'IPアドレスに加えてポート番号も変換するアドレス変換方式です。', examCue: '複数の内部端末が一つのグローバルIPを共有する条件で確認します。', contrast: 'NATはアドレス変換、NAPTはポート番号も含む変換です。', related: ['NAT'] },
  SQL: { term: 'SQL', expansion: 'Structured Query Language', meaning: '関係データベースの定義・検索・更新を行う言語です。', examCue: 'SELECTの句の順序と、WHEREとHAVINGの適用対象を確認します。', contrast: 'SQLインジェクションはSQLそのものではなく、入力を悪用する攻撃です。', related: ['ACID'] },
  ACID: { term: 'ACID', meaning: 'トランザクションが満たす原子性・一貫性・独立性・永続性の性質です。', examCue: '障害や同時実行の条件では、どの性質が守られるかを特定します。', contrast: 'ACIDは処理の性質であり、バックアップや冗長化そのものではありません。', related: ['SQL'] },
  RTO: { term: 'RTO', expansion: 'Recovery Time Objective', meaning: '障害発生からどれだけの時間で復旧させるかという目標です。', examCue: '短いRTOほど、待機系や自動化など復旧の準備が必要になります。', contrast: 'RPOは復旧時点で許容するデータ損失量の目標です。', related: ['RPO'] },
  RPO: { term: 'RPO', expansion: 'Recovery Point Objective', meaning: '復旧時にどの時点までのデータを戻せればよいかという目標です。', examCue: '許容できるデータ損失時間を問われたらRPOを選びます。', contrast: 'RTOは時間、RPOはデータの復旧時点です。', related: ['RTO'] },
  OS: { term: 'OS', expansion: 'Operating System', meaning: 'CPU・メモリ・入出力・ファイルなどの資源を管理し、アプリケーションへ実行環境を提供します。', examCue: '資源管理やプロセス状態の問題ではOSの役割を確認します。', contrast: 'アプリケーションは業務処理、OSは共通の資源管理を担当します。', related: ['API'] },
  API: { term: 'API', expansion: 'Application Programming Interface', meaning: 'ソフトウェアの機能を他のプログラムから利用するための呼出し規約です。', examCue: '内部実装を隠したまま機能を連携する境界として考えます。', contrast: 'ユーザーインタフェースは人向け、APIはプログラム間の利用窓口です。', related: ['OS'] },
  CRUD: { term: 'CRUD', meaning: 'データ操作のCreate・Read・Update・Deleteをまとめた呼び方です。', examCue: 'データの作成・参照・更新・削除のどの操作かを分類します。', contrast: 'SQLの命令名そのものではなく、データ操作の基本分類です。', related: ['SQL'] },
};

export const glossaryTerms = Object.freeze(Object.keys(glossary));
