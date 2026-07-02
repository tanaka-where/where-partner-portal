# WHERE ポータルサイト

WHERE パートナー企業様向けの情報ポータル。各種資料・PLANER・出演動画・導入事例・ニュース・面談申し込みをまとめています。

- フレームワーク: [Astro](https://astro.build/) + Tailwind CSS v4（静的サイト）
- デザイン: ライトテーマ（`DESIGN (1).md` 準拠 / Inter・近白 #fcfcfc・アクセント #145aff）
- ホスティング: GitHub Pages（`gh-pages` ブランチに `dist` を配置）
- 公開URL: **https://tanaka-where.github.io/where-partner-portal/**

## 構成

```
src/
  site.config.ts     ← サイト名/通知先/フォーム/PLANER URL
  data/
    resources.ts     ← 資料（PDF）一覧
    media.ts         ← 出演動画（YouTube）
    press.ts         ← 導入事例・ニュース（PR TIMES 由来）
  components/         ← 各セクション
  styles/global.css  ← デザイントークン
public/docs/         ← 配布PDFの置き場（下記）
gas/Code.gs          ← 面談申し込み受信用 GAS
```

## コンテンツの差し替え（管理者）

| やりたいこと | 編集場所 |
|---|---|
| 資料の追加/差し替え | `src/data/resources.ts` を編集し、PDFを `public/docs/` に置く |
| 出演動画の変更 | `src/data/media.ts`（YouTube動画IDを指定） |
| 導入事例・ニュースの更新 | `src/data/press.ts`（category: 'case' / 'news'） |
| WHEREとは/ユースケースの文言 | `src/components/About.astro` / `UseCases.astro` |
| PLANER・通知先・サイト名 | `src/site.config.ts` |

編集後、`main` に push（または下記の再デプロイ）で反映されます。

## 資料PDFの配置（必須）

`public/docs/` に次の名前でPDFを置いてください（`src/data/resources.ts` の `file` と一致）。

| 置くファイル名 | 元ファイル |
|---|---|
| `where-service-approachbook.pdf` | WHERE_APB…商談用（Approach Book） |
| `where-service-onepager.pdf` | WHERE_ペライチ資料（サービス概要） |
| `where-service-compact.pdf` | WHEREご紹介資料_コンパクト版 |

## 面談申し込みフォーム（GAS）

`gas/Code.gs` は **通知先3名**（`r.tanaka@` / `t.hagiwara@` / `k.ochiai@pntwhere.com`）への
メール通知と**スプレッドシート記録**を行います。既存の GAS プロジェクトに貼り替え、
「デプロイを管理」→ 既存ウェブアプリを**新しいバージョン**で更新してください（/exec URLは不変）。
`SHEET_ID` を空のまま実行すると初回にスプレッドシートを自動作成し、そのIDを実行ログに出力します。

## 再デプロイ

```bash
npm run build
touch dist/.nojekyll
npx gh-pages -d dist -b gh-pages   # もしくは dist を gh-pages ブランチへ push
```

## ローカル開発

```bash
npm install
npm run dev      # http://localhost:4321/where-partner-portal
npm run build
```
