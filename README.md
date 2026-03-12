# JOB PALETTE ウェブサイト

株式会社JOB PALETTEの採用支援サービスサイトです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **デプロイ**: Vercel推奨

## ページ構成

| URL | 説明 |
|-----|------|
| `/` | トップページ（ヒーロー・カテゴリ・求人・フロー・転職者の声） |
| `/jobs` | 求人一覧（カテゴリ・雇用形態フィルター、キーワード検索） |
| `/jobs/[id]` | 求人詳細 |
| `/voice` | 転職者の声一覧 |
| `/voice/[id]` | 転職者の声詳細 |
| `/services` | サービス案内・FAQ |
| `/contact` | 無料相談（LINE・電話） |

## セットアップ手順

### 1. パッケージインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` を編集して microCMS の情報を入力してください。

### 3. microCMS のコンテンツ設定

microCMS（https://microcms.io）で以下のAPIを作成してください：

#### 求人情報（API ID: `jobs`）
| フィールドID | 種類 | 説明 |
|---|---|---|
| `title` | テキスト | 求人タイトル |
| `category` | セレクトフィールド | `sales` / `office` / `manufacturing` / `it` / `service` / `logistics` / `medical` / `food` |
| `location` | テキスト | 勤務地 |
| `salaryMin` | 数値 | 給与下限（月給・円） |
| `salaryMax` | 数値 | 給与上限（月給・円） |
| `employmentType` | セレクトフィールド | `fulltime` / `parttime` / `contract` |
| `description` | リッチエディタ | 仕事内容 |
| `requirements` | リッチエディタ | 応募要件 |
| `companyName` | テキスト | 企業名 |
| `companyLogo` | 画像 | 企業ロゴ（任意） |
| `featured` | 真偽値 | 注目求人フラグ |
| `tags` | テキストリスト | タグ（任意） |

#### 転職者の声（API ID: `voices`）
| フィールドID | 種類 | 説明 |
|---|---|---|
| `name` | テキスト | お名前 |
| `age` | 数値 | 年齢 |
| `beforeJob` | テキスト | 転職前の職種 |
| `afterJob` | テキスト | 転職後の職種 |
| `comment` | テキストエリア | コメント |
| `photo` | 画像 | 写真（任意） |
| `featured` | 真偽値 | トップページ表示フラグ |

#### コンサルタント（API ID: `consultants`）
| フィールドID | 種類 | 説明 |
|---|---|---|
| `name` | テキスト | 名前 |
| `title` | テキスト | 肩書き |
| `bio` | テキストエリア | 自己紹介 |
| `photo` | 画像 | 写真（任意） |
| `specialties` | テキストリスト | 専門分野 |

### 4. 開発サーバー起動

```bash
npm run dev
```

http://localhost:3000 でアクセスできます。

## デプロイ（Vercel）

1. [Vercel](https://vercel.com) にリポジトリを接続
2. 環境変数 `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を設定
3. 自動デプロイが完了

## カスタマイズポイント

### ブランドカラー変更
`src/app/globals.css` の CSS変数を変更してください：
```css
:root {
  --color-primary: #e85d04;  /* メインカラー（オレンジ） */
  --color-dark: #1a1a2e;      /* ダークカラー */
}
```

### 会社情報変更
`src/components/Footer.tsx` の住所・電話番号・メールアドレスを更新してください。

### LINE URL変更
`src/app/contact/page.tsx` の LINE友達追加URLを更新してください。
