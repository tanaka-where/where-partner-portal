/**
 * 掲載資料。file は public/docs/ 配下のファイル名（BASE_URL が自動で付与される）。
 * 差し替え・追加はこの配列を編集し、対応PDFを public/docs/ に置く。
 */
export interface ResourceItem {
  title: string;
  description: string;
  type: string; // ラベル（PDF など）
  file: string; // public/docs/ からの相対パス
  pages?: string; // 補足（任意）
}

export const resources: ResourceItem[] = [
  {
    title: 'サービス紹介資料（Approach Book）',
    description:
      '事業全体像・プロダクト機能・料金体系・導入事例まで網羅した商談用の総合資料。紹介先への提案にそのままご利用いただけます。',
    type: 'PDF',
    file: 'docs/where-service-approachbook.pdf',
    pages: '商談用 / 47ページ',
  },
  {
    title: 'サービス概要（ペライチ）',
    description:
      '「衛星データ×AIで地権者と直接つながる」WHEREの価値を1枚に凝縮。最初の一枚として最適です。',
    type: 'PDF',
    file: 'docs/where-service-onepager.pdf',
    pages: 'サービス概要 / 2ページ',
  },
  {
    title: 'ご紹介資料（コンパクト版）',
    description:
      '「探索×行動管理×アプローチ」の仕組みと実績を、要点だけ短時間で把握できるダイジェスト版。',
    type: 'PDF',
    file: 'docs/where-service-compact.pdf',
    pages: 'ダイジェスト / 10ページ',
  },
];
