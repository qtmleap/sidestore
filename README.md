# ビッカメ娘

Vite + React + TanStack Router + Cloudflare Workers を使用した TypeScript プロジェクト

## 技術スタック

- [Vite](https://vite.dev/) - ビルドツール
- [React](https://react.dev/) - UIライブラリ
- [TanStack Router](https://tanstack.com/router) - 型安全なルーター
- [TanStack Query](https://tanstack.com/query) - データフェッチング / キャッシュ
- [Jotai](https://jotai.org/) - 状態管理
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネント
- [Hono](https://hono.dev/) - 軽量Webフレームワーク
- [Cloudflare Workers](https://workers.cloudflare.com/) - エッジランタイム
- [Bun](https://bun.sh/) - JavaScript ランタイム / パッケージマネージャー
- [TypeScript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/) - Linter / Formatter

## セットアップ

```bash
bun install
```

## 開発

```bash
bun run dev
```

http://localhost:5173 でローカルサーバーが起動します。

## ビルド

```bash
bun run build
```

## デプロイ

```bash
bun run deploy
```

## プロジェクト構成

```
├── src/
│   ├── index.ts              # Honoエントリーポイント
│   ├── index.css             # グローバルスタイル
│   ├── app/
│   │   ├── main.tsx          # Reactエントリーポイント
│   │   ├── routeTree.gen.ts  # 自動生成ルートツリー
│   │   └── routes/           # ページコンポーネント
│   ├── components/           # UIコンポーネント
│   ├── stores/               # Jotai atoms
│   ├── schemas/              # Zodスキーマ
│   └── utils/                # ユーティリティ
├── public/                   # 静的ファイル
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.toml
└── biome.json
```
