# WHERE Partner Portal

WHERE のパートナー担当者が、紹介先へ提供すべき最新情報をいつでも取り出せる「保管庫」。
URL を知っていれば誰でも閲覧でき、資料・事例・更新情報は **Google スプレッドシートを編集するだけ** で更新できる。

- フレームワーク: [Astro](https://astro.build/) + Tailwind CSS v4（静的サイト）
- ホスティング: GitHub Pages（`main` への push で GitHub Actions が自動デプロイ）
- コンテンツ管理: Google スプレッドシート（資料/録画/事例）＋ Google Drive（ファイル本体）
- 申込フォーム: Google Apps Script（メール通知 + 任意でシート記録）

---

## ディレクトリ構成

```
src/
  site.config.ts        ← まずここを設定（最重要）
  layouts/Base.astro
  components/            ← 各セクション（Hero / About / Persona / Planer / Resources / Videos / Updates / Workshop ...）
  lib/sheet.ts          ← スプレッドシート取得ロジック
  styles/global.css     ← WHERE デザインシステム（色・フォント）
gas/Code.gs             ← 申込フォーム受信用 GAS
.github/workflows/deploy.yml  ← Pages 自動デプロイ
```

---

## セットアップ（初回のみ）

### 1. コンテンツ用スプレッドシートを用意

1. Google スプレッドシートを新規作成し、シート（タブ）を 3 つ用意して以下の通り名前を付ける。
   - `resources`（資料一覧） / `videos`（操作録画） / `updates`（事例・更新）
2. 各シートの **1 行目をヘッダー** とし、次の列を作る。

   **resources タブ**
   | category | title | description | type | url | updated |
   |----------|-------|-------------|------|-----|---------|
   | 概要 | サービス概要資料 | 紹介先への最初の一枚 | PDF | （Drive 共有リンク） | 2026-06 |

   - `type` は `PDF` / `スライド` / `チラシ` / `動画` などの自由記入（カードのラベルになる）
   - `category` でフィルタタブが自動生成される

   **videos タブ**
   | title | description | url | thumbnail | duration |
   |-------|-------------|-----|-----------|----------|
   | 基本操作 | ログインから検索まで | （YouTube/Drive リンク） | （任意） | 5:30 |

   - YouTube リンクならサムネイルは自動取得される

   **updates タブ**
   | date | category | title | summary | url |
   |------|----------|-------|---------|-----|
   | 2026-06-20 | 事例 | ○○市での活用事例 | 概要テキスト | （詳細リンク） |

   - `date` 降順で自動ソート。`category` に「事例」「アップデート」を含むとバッジ色が変わる

3. **共有設定**: 右上「共有」→「リンクを知っている全員」→「閲覧者」にする
   （※サイトはこのシートを閲覧専用で読むだけ。編集権限は渡らない）
4. スプレッドシートの URL から **ID** を控える
   `https://docs.google.com/spreadsheets/d/`**`ここがID`**`/edit`

### 2. Drive にファイルを置く

- 配布資料（PDF・スライド・チラシ）や録画を Google Drive に置き、各ファイルを
  「リンクを知っている全員（閲覧者）」で共有 → その共有リンクをスプレッドシートの `url` 列に貼る。

### 3. 申込フォーム（GAS）をデプロイ

1. [script.google.com](https://script.google.com/) で新規プロジェクトを作成
2. `gas/Code.gs` の中身を貼り付け
3. 先頭の `NOTIFY_TO`（通知先メール）と、必要なら `SHEET_ID`（申込ログ用シート）を設定
4. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
   - 実行ユーザー: **自分**
   - アクセスできるユーザー: **全員**
5. 初回は権限承認（メール送信の許可）を行う
6. 発行された **`/exec` で終わる URL** を控える

### 4. site.config.ts を設定

`src/site.config.ts` を開き、以下を設定する。

```ts
sheets: { spreadsheetId: '（手順1のID）' },
formEndpoint: '（手順3の /exec URL）',
planer: { embedUrl: '（PLANER の埋め込みURL）', linkUrl: '' },
```

### 5. 反映（再デプロイ）

現在の公開方式は **`gh-pages` ブランチへ `dist/` を配置** する方式（GitHub Pages の
ソース＝`gh-pages` / ルート）。`src/` や `site.config.ts` を変更したら、次のコマンドで再ビルド & 公開する。

```bash
npm run build
touch dist/.nojekyll          # _astro フォルダを配信させるために必須
npx gh-pages -d dist -b gh-pages   # もしくは下記スクリプト相当の手動 push
```

> **補足**: GitHub Actions による自動デプロイにも対応可能（`docs/github-actions-deploy.yml.example` 参照）。
> その場合は `gh auth refresh -s workflow` でトークンに `workflow` 権限を付与し、ファイルを
> `.github/workflows/deploy.yml` に戻して push、Pages のソースを「GitHub Actions」に変更する。
> 以後は `main` への push だけで自動ビルド & 公開される。

公開 URL: **https://tanaka-where.github.io/where-partner-portal/**
（GitHub の **Settings → Pages** でも確認できる）

---

## 日々の更新（管理者の運用）

| やりたいこと | 操作 | 再デプロイ |
|---|---|---|
| 資料・録画・事例を追加/差し替え | スプレッドシートの行を編集 | **不要**（即時反映） |
| 配布ファイルそのものを差し替え | Drive のファイルを更新（同じ共有リンクのまま） | 不要 |
| オンボーディング本文・ペルソナの文言 | `src/components/About.astro` / `Persona.astro` を編集 | 必要（push） |
| PLANER 埋め込み先・通知先・サイト名 | `src/site.config.ts` を編集 | 必要（push） |

> スプレッドシート由来のコンテンツはブラウザから直接読み込むため、**シートを直せば再ビルド不要**で反映される。

---

## ローカル開発

```bash
npm install
npm run dev      # http://localhost:4321/where-partner-portal
npm run build    # dist/ に静的出力
npm run preview  # ビルド結果の確認
```

## 独自ドメインに変える場合

`astro.config.mjs` の `site` を独自ドメインに、`base` を `'/'` に変更し、
GitHub Pages のカスタムドメイン設定を行う。
