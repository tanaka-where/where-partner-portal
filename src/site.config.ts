/**
 * サイト全体の設定。値を書き換えるだけで主要な差し替えができる。
 * 掲載コンテンツ（資料/事例/ニュース/動画）は src/data/ で管理する。
 */
export const config = {
  siteName: 'WHERE ポータルサイト',
  siteNameShort: 'WHERE Portal',
  description:
    'WHERE パートナー企業様に向けた各種資料を取り揃えています。',

  /** 面談申し込みの通知先（GAS 側でも同じ宛先を設定） */
  contactEmail: 'r.tanaka@pntwhere.com',
  notifyEmails: [
    'r.tanaka@pntwhere.com',
    't.hagiwara@pntwhere.com',
    'k.ochiai@pntwhere.com',
  ],

  /** 面談申し込みフォームの送信先（GAS ウェブアプリ /exec URL） */
  formEndpoint:
    'https://script.google.com/macros/s/AKfycbx6cS3PKKDJYM1dhn4uVyxI_r3khbJHLT89PsOCRdqDqzyN2iNOk38KLBi36KZFFAg/exec',

  /** PLANER 埋め込み */
  planer: {
    embedUrl:
      'https://product.plainer.co.jp/c/where/b2ffcebb-51dc-4b7f-bcbd-42934f265eec/3ecd9521-d4b1-4b8b-bab7-07acb889fc72#f101a1c7-57f4-4536-98b4-de2079233237',
    linkUrl:
      'https://product.plainer.co.jp/c/where/b2ffcebb-51dc-4b7f-bcbd-42934f265eec/3ecd9521-d4b1-4b8b-bab7-07acb889fc72#f101a1c7-57f4-4536-98b4-de2079233237',
  },

  links: {
    whereWebsite: 'https://pntwhere.com',
    prtimes: 'https://prtimes.jp/main/html/searchrlp/company_id/146022',
  },
};
