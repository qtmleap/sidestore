import { type Dictionary, t } from 'intlayer'

const content = {
  key: 'app',
  content: {
    // Header
    today: t({
      en: 'Today',
      ja: 'Today'
    }),

    // Search
    searchPlaceholder: t({
      en: 'Games, Apps, Stories, etc.',
      ja: 'ゲーム、App、ストーリーなど'
    }),

    // Sections
    testApps: t({
      en: 'Sideloads',
      ja: 'サイドロード'
    }),
    recommended: t({
      en: 'Recommended',
      ja: 'おすすめ'
    }),

    // Buttons
    get: t({
      en: 'GET',
      ja: '入手'
    }),
    more: t({
      en: 'more',
      ja: '続きを読む'
    }),

    // App Detail Page
    appNotFound: t({
      en: 'App not found',
      ja: 'アプリが見つかりません'
    }),
    backToHome: t({
      en: 'Back to Home',
      ja: 'ホームに戻る'
    }),

    // Stats
    ratingsCount: t({
      en: ' Ratings',
      ja: '件の評価'
    }),
    age: t({
      en: 'Age',
      ja: '年齢'
    }),
    yearsOld: t({
      en: 'Years Old',
      ja: '歳以上'
    }),
    category: t({
      en: 'Category',
      ja: 'カテゴリ'
    }),
    developer: t({
      en: 'Developer',
      ja: 'デベロッパ'
    }),
    size: t({
      en: 'Size',
      ja: 'サイズ'
    }),

    // What's New
    whatsNew: t({
      en: "What's New",
      ja: '新機能'
    }),
    version: t({
      en: 'Version',
      ja: 'バージョン'
    }),

    // Preview
    preview: t({
      en: 'Preview',
      ja: 'プレビュー'
    }),
    screenshot: t({
      en: 'Screenshot',
      ja: 'スクリーンショット'
    }),

    // Information
    information: t({
      en: 'Information',
      ja: '情報'
    }),
    seller: t({
      en: 'Seller',
      ja: '販売元'
    }),
    releaseDate: t({
      en: 'Release Date',
      ja: 'リリース日'
    })
  }
} satisfies Dictionary

export default content
