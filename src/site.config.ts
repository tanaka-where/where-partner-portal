/**
 * サイト全体の設定を集約するファイル。
 * 管理者はこのファイルの値を書き換えるだけで主要な差し替えができる。
 * （資料・事例・更新情報などの「中身」は Google スプレッドシートで管理する → sheets を参照）
 */

export interface SiteConfig {
  /** サイト名（ヘッダー/タイトル表示） */
  siteName: string;
  /** サイトの短い説明（meta description / ヒーロー補足） */
  description: string;
  /** 問い合わせ・通知先メール */
  contactEmail: string;

  /**
   * Google スプレッドシート連携設定。
   * コンテンツ種別ごとに「リンクを知っている全員が閲覧可」に設定したスプレッドシートのIDを指定する。
   * 各シートは先頭タブの1行目をヘッダーとして読み込む。
   */
  sheets: {
    resources: string; // 資料一覧
    videos: string; // 操作説明の録画
    updates: string; // 事例・アップデート情報
  };

  /** 勉強会申込フォームの送信先（GAS ウェブアプリの /exec URL） */
  formEndpoint: string;

  /** PLANER 埋め込み */
  planer: {
    /** iframe の src。空文字ならプレースホルダ表示 */
    embedUrl: string;
    /** 埋め込みできない場合の遷移先リンク（任意） */
    linkUrl: string;
  };

  /** 外部リンク類 */
  links: {
    whereWebsite: string;
  };
}

export const config: SiteConfig = {
  siteName: 'WHERE Partner Portal',
  description:
    'WHERE パートナー担当者が、紹介先へ提供すべき最新情報をいつでも取り出せる保管庫。',
  contactEmail: 'r.tanaka@pntwhere.com',

  sheets: {
    // ▼ 各スプレッドシートID（URL の /d/ と /edit の間の文字列）
    //    ※各シートを「リンクを知っている全員＝閲覧者」で共有すると表示される
    resources: '1g-mx_ODbBeCZw3P8pjY2im1r4wKJ2ztEYlCWVI68GD8',
    videos: '1pYOVwu2WQSjwMPPhqs8pGa4kW_bwOyLH-cm_twAWy7U',
    updates: '1CYNJqbMLR3sBlPTNWd0Ot8E6O2MsAm2rfB71Lr2cpcE',
  },

  // ▼ GAS ウェブアプリをデプロイ後に取得する /exec URL を設定する
  formEndpoint:
    'https://script.google.com/macros/s/AKfycbx6cS3PKKDJYM1dhn4uVyxI_r3khbJHLT89PsOCRdqDqzyN2iNOk38KLBi36KZFFAg/exec',

  planer: {
    // ▼ PLANER の埋め込み URL（iframe src）。枠内に表示しつつ別タブ導線も用意
    embedUrl:
      'https://product.plainer.co.jp/c/where/b2ffcebb-51dc-4b7f-bcbd-42934f265eec/3ecd9521-d4b1-4b8b-bab7-07acb889fc72#f101a1c7-57f4-4536-98b4-de2079233237',
    linkUrl:
      'https://product.plainer.co.jp/c/where/b2ffcebb-51dc-4b7f-bcbd-42934f265eec/3ecd9521-d4b1-4b8b-bab7-07acb889fc72#f101a1c7-57f4-4536-98b4-de2079233237',
  },

  links: {
    whereWebsite: 'https://www.pntwhere.com/',
  },
};
