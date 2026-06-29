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

  /** Google スプレッドシート連携設定 */
  sheets: {
    /** 公開（リンクを知っている全員が閲覧可）に設定したスプレッドシートのID */
    spreadsheetId: string;
    /** 各コンテンツが入っているシート（タブ）名 */
    tabs: {
      resources: string; // 資料一覧
      videos: string; // 操作説明の録画
      updates: string; // 事例・アップデート情報
    };
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
    // ▼ セットアップ後にスプレッドシートIDを設定する（URL の /d/ と /edit の間の文字列）
    spreadsheetId: '',
    tabs: {
      resources: 'resources',
      videos: 'videos',
      updates: 'updates',
    },
  },

  // ▼ GAS ウェブアプリをデプロイ後に取得する /exec URL を設定する
  formEndpoint: '',

  planer: {
    // ▼ PLANER の埋め込み URL（iframe src）を設定する
    embedUrl: '',
    linkUrl: '',
  },

  links: {
    whereWebsite: 'https://www.pntwhere.com/',
  },
};
