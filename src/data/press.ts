/**
 * 導入事例・ニュース（PR TIMES 由来）。
 * 最新情報の反映はこの配列を編集する（PR TIMES: company_id/146022）。
 * category: 'case'（導入事例） | 'news'（ニュース）
 */
export interface PressItem {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  category: 'case' | 'news';
  excerpt: string;
  tag?: string; // サムネイル上のラベル
}

export const press: PressItem[] = [
  {
    title:
      '大東建託で、地権者とつながる不動産AIツール『WHERE』の運用を開始',
    url: 'https://prtimes.jp/main/html/rd/p/000000041.000146022.html',
    date: '2026-06-04',
    category: 'case',
    tag: '導入事例',
    excerpt:
      '衛星データ×AIによる探索から地権者へのアプローチまで一気通貫で支援し、営業DXを推進。',
  },
  {
    title:
      '(株)ライフコーポレーションにて、不動産AIツール『WHERE』の導入が決定',
    url: 'https://prtimes.jp/main/html/rd/p/000000032.000146022.html',
    date: '2026-02-19',
    category: 'case',
    tag: '導入事例',
    excerpt:
      'スーパーマーケットチェーンによる、仲介頼りの用地仕入れを改善する新たな打ち手として採用。',
  },
  {
    title:
      '『WHERE』新機能「ENERGYアップデート版」、リリース1か月で複数社に導入',
    url: 'https://prtimes.jp/main/html/rd/p/000000020.000146022.html',
    date: '2025-10-31',
    category: 'case',
    tag: '導入事例',
    excerpt:
      '再生可能エネルギー事業の効率化を支援する新機能が、複数社に採用されました。',
  },
  {
    title:
      'JAXA発スタートアップ・株式会社WHERE、不動産AIツール『WHERE』の導入社数200社を突破',
    url: 'https://prtimes.jp/main/html/rd/p/000000044.000146022.html',
    date: '2026-06-30',
    category: 'news',
    tag: 'プレスリリース',
    excerpt: '導入社数が200社を突破したことを発表しました。',
  },
  {
    title:
      '相続をきっかけとした不動産仕入れアプローチ、約8割が効果を実感',
    url: 'https://prtimes.jp/main/html/rd/p/000000043.000146022.html',
    date: '2026-06-25',
    category: 'news',
    tag: '調査レポート',
    excerpt:
      '不動産事業者300社への調査結果を公表。2026年10月の登記受付帳の制度変更にも言及。',
  },
  {
    title:
      '代表・阿久津岳生が、東京大学・染谷隆夫教授主査の研究会にて登壇',
    url: 'https://prtimes.jp/main/html/rd/p/000000042.000146022.html',
    date: '2026-06-19',
    category: 'news',
    tag: '登壇',
    excerpt:
      '宇宙からの視点と人間体験データの融合による、不動産評価の未来を提示。',
  },
  {
    title:
      'エンタープライズ向け新機能をリリース。商業登記簿の取得と管理者権限の設定が可能に',
    url: 'https://prtimes.jp/main/html/rd/p/000000040.000146022.html',
    date: '2026-05-13',
    category: 'news',
    tag: '新機能',
    excerpt: 'エンタープライズ企業の用地仕入れを強化する新機能を提供開始。',
  },
  {
    title:
      '株式会社WHEREと株式会社パワーエックスが業務提携',
    url: 'https://prtimes.jp/main/html/rd/p/000000039.000146022.html',
    date: '2026-05-07',
    category: 'news',
    tag: '業務提携',
    excerpt: '蓄電所開発の成果創出にコミットする「Deal Tech」体制を構築。',
  },
  {
    title:
      '『WHERE』、再生可能エネルギー事業者の導入50社を突破',
    url: 'https://prtimes.jp/main/html/rd/p/000000038.000146022.html',
    date: '2026-04-23',
    category: 'news',
    tag: 'プレスリリース',
    excerpt:
      '衛星データ×AI技術で再エネ事業を包括的に支援し、カーボンニュートラルの実現へ。',
  },
  {
    title:
      '人工衛星データと3D都市モデルを活用した、大規模震災の建物被害等推定システムを提供開始',
    url: 'https://prtimes.jp/main/html/rd/p/000000036.000146022.html',
    date: '2026-03-24',
    category: 'news',
    tag: '新サービス',
    excerpt:
      '3D都市モデルと衛星データを組み合わせ、物件単位の災害被害度分類を実現。',
  },
  {
    title:
      '(株)WHERE、(株)都市空間総合研究所とMOU締結',
    url: 'https://prtimes.jp/main/html/rd/p/000000035.000146022.html',
    date: '2026-03-09',
    category: 'news',
    tag: '産学協業',
    excerpt: '都市計画・空間情報の研究と事業化に向けた新たな産学協業モデルを構築。',
  },
  {
    title:
      '『WHERE』、全国の衛星データと不動産情報 約7,300万件をデータベース化',
    url: 'https://prtimes.jp/main/html/rd/p/000000034.000146022.html',
    date: '2026-02-25',
    category: 'news',
    tag: 'アップデート',
    excerpt: '条件に合う候補物件を最短1秒で可視化する大規模アップデートを実施。',
  },
  {
    title:
      'WHERE、住宅テックラボと業務提携。オーナーデータ連携でサービス展開を加速',
    url: 'https://prtimes.jp/main/html/rd/p/000000031.000146022.html',
    date: '2026-02-05',
    category: 'news',
    tag: '業務提携',
    excerpt: 'オーナーサーチデータの連携により、不動産関連事業者向け展開を加速。',
  },
  {
    title:
      'テクノロジー×オペレーションで取引創出にコミットする「Deal Tech」構想を本格始動',
    url: 'https://prtimes.jp/main/html/rd/p/000000029.000146022.html',
    date: '2026-01-05',
    category: 'news',
    tag: 'コーポレート',
    excerpt: 'テクノロジーとオペレーションの融合による不動産取引創出を本格化。',
  },
  {
    title:
      'みずほ銀行など計5行から4.6億円のデットファイナンスを実施',
    url: 'https://prtimes.jp/main/html/rd/p/000000028.000146022.html',
    date: '2025-12-25',
    category: 'news',
    tag: '資金調達',
    excerpt: '複数金融機関から約4.6億円の資金調達を実施。',
  },
  {
    title:
      'WHEREとスペースシフト、衛星データ活用の不動産ソリューション開発でMOU締結',
    url: 'https://prtimes.jp/main/html/rd/p/000000027.000146022.html',
    date: '2025-12-24',
    category: 'news',
    tag: '業務提携',
    excerpt: '人工衛星データを活用した不動産ソリューションの開発・提供で提携。',
  },
  {
    title: '『WHERE』、導入社数100社を突破',
    url: 'https://prtimes.jp/main/html/rd/p/000000026.000146022.html',
    date: '2025-12-23',
    category: 'news',
    tag: 'プレスリリース',
    excerpt: '導入後の成約・反響数の増加事例も多数報告。導入100社を達成。',
  },
  {
    title:
      '探索からDMアプローチまでワンストップで完結する新機能をリリース',
    url: 'https://prtimes.jp/main/html/rd/p/000000025.000146022.html',
    date: '2025-11-13',
    category: 'news',
    tag: '新機能',
    excerpt: '物件探索からDM送付依頼・進捗管理までをワンストップで実現。',
  },
  {
    title:
      '宇宙×不動産カンファレンス2025（SRC 2025）、セッション詳細・登壇者を発表',
    url: 'https://prtimes.jp/main/html/rd/p/000000023.000146022.html',
    date: '2025-11-06',
    category: 'news',
    tag: 'イベント',
    excerpt: '宇宙飛行士・野口聡一氏など豪華ゲストの登壇が決定。',
  },
  {
    title:
      '不動産仕入れの現場をスマホ1台で。『WHERE』が「モバイル版」を提供開始',
    url: 'https://prtimes.jp/main/html/rd/p/000000022.000146022.html',
    date: '2025-10-29',
    category: 'news',
    tag: '新機能',
    excerpt: '現地や移動中でも活用できるモバイル版の提供を開始。',
  },
];

export const cases = press.filter((p) => p.category === 'case');
export const news = press.filter((p) => p.category === 'news');
