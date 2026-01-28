/**
 * public/app/{country}/{appId}.json からアプリデータを取得するユーティリティ
 */

import { z } from 'zod'

// 数値を短縮形式でフォーマット（1K, 10M など）
export const formatCount = (count: number): string => {
  if (count >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(count >= 10_000_000_000 ? 0 : 1).replace(/\.0$/, '')}B`
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(count >= 10_000_000 ? 0 : 1).replace(/\.0$/, '')}M`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(count >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`
  }
  return count.toString()
}

export const AppStoreAppSchema = z
  .object({
    trackId: z.number().int(),
    trackName: z.string().nonempty(),
    bundleId: z.string().nonempty(),
    sellerName: z.string().nonempty(),
    primaryGenreName: z.string().nonempty(),
    artworkUrl512: z.string().nonempty(),
    screenshotUrls: z.array(z.string().nonempty()),
    ipadScreenshotUrls: z.array(z.string().nonempty()),
    description: z.string().nonempty(),
    version: z.string().nonempty(),
    fileSizeBytes: z.string().nonempty(),
    averageUserRating: z.number(),
    userRatingCount: z.number(),
    trackContentRating: z.string().nonempty(),
    releaseDate: z.string().nonempty(),
    currentVersionReleaseDate: z.string().nonempty(),
    releaseNotes: z.string().optional()
  })
  .passthrough()

export type AppStoreApp = z.infer<typeof AppStoreAppSchema>

export const AppStoreResultSchema = z.object({
  resultCount: z.number(),
  results: z.array(AppStoreAppSchema)
})

export type AppStoreResult = z.infer<typeof AppStoreResultSchema>

// デフォルトの国コード
const DEFAULT_COUNTRY = 'jp'

/**
 * アプリが存在するかどうかを確認する
 * @param appId アプリID
 * @param country 国コード（デフォルト: jp）
 * @returns アプリが存在する場合はtrue
 */
export async function checkAppExists(appId: string, country: string = DEFAULT_COUNTRY): Promise<boolean> {
  try {
    const response = await fetch(`/app/${country}/${appId}.json`, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * アプリデータを取得する
 * @param appId アプリID
 * @param country 国コード（デフォルト: jp）
 * @returns アプリデータ（存在しない場合はnull）
 */
export async function fetchApp(appId: string, country: string = DEFAULT_COUNTRY): Promise<AppStoreApp | null> {
  try {
    const response = await fetch(`/app/${country}/${appId}.json`)
    if (!response.ok) {
      return null
    }
    const json = await response.json()
    const data = AppStoreResultSchema.parse(json)
    if (data.resultCount === 0 || !data.results[0]) {
      return null
    }
    return data.results[0]
  } catch {
    return null
  }
}

/**
 * AppStoreAppをUI表示用の形式に変換する
 */
export function formatAppForDisplay(app: AppStoreApp) {
  const fileSizeBytes = Number.parseInt(app.fileSizeBytes, 10)
  const sizeInMB = (fileSizeBytes / (1024 * 1024)).toFixed(1)

  // iPhone向けのスクリーンショットを優先、なければiPad向けを使用
  const screenshots = app.screenshotUrls.length > 0 ? app.screenshotUrls : app.ipadScreenshotUrls

  return {
    id: String(app.trackId),
    name: app.trackName,
    developer: app.sellerName,
    bundleId: app.bundleId,
    category: app.primaryGenreName,
    icon: app.artworkUrl512,
    screenshots,
    description: app.description,
    version: app.version,
    size: `${sizeInMB} MB`,
    rating: app.averageUserRating ?? 0,
    ratingCount: app.userRatingCount ?? 0,
    ageRating: app.trackContentRating,
    releaseDate: app.releaseDate,
    currentVersionReleaseDate: app.currentVersionReleaseDate,
    releaseNotes: app.releaseNotes
  }
}
