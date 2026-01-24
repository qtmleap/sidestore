# Hono + Bun

TypeScript + Bun を使用した TypeScript プロジェクト

## 技術スタック

- [Hono](https://hono.dev/) - 軽量Webフレームワーク
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

http://localhost:8787 でローカルサーバーが起動します。

## デプロイ

```bash
bun run deploy
```

## プロジェクト構成

```
├── src/
│   └── index.ts        # エントリーポイント
├── package.json
├── tsconfig.json
└── biome.json
```
