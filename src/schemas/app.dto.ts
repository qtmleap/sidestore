import { z } from 'zod'

export const AppSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  icon: z.url(),
  category: z.string().nonempty(),
  developer: z.string().nonempty(),
  price: z.string().nonempty(),
  rating: z.number().min(0).max(5),
  screenshots: z.array(z.url())
})

export type App = z.infer<typeof AppSchema>

export const mockApps: App[] = [
  {
    id: '333903271',
    name: 'X',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3c/c7/2d/3cc72d17-ee6d-751f-54a8-63017806c3ad/ProductionAppIcon-0-0-1x_U007emarketing-0-8-0-0-0-85-220.png/100x100bb.jpg',
    category: 'ソーシャルネットワーキング',
    developer: 'X Corp.',
    price: '無料',
    rating: 4.3,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c7/cd/0a/c7cd0a81-ad02-5af9-8ef2-f1418f518f4e/1242x2688-1.jpg/392x696bb.jpg'
    ]
  },
  {
    id: '333903272',
    name: 'X (Login Fix)',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3c/c7/2d/3cc72d17-ee6d-751f-54a8-63017806c3ad/ProductionAppIcon-0-0-1x_U007emarketing-0-8-0-0-0-85-220.png/100x100bb.jpg',
    category: 'ソーシャルネットワーキング',
    developer: 'X Corp.',
    price: '無料',
    rating: 4.3,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c7/cd/0a/c7cd0a81-ad02-5af9-8ef2-f1418f518f4e/1242x2688-1.jpg/392x696bb.jpg'
    ]
  },
  {
    id: '333903273',
    name: 'NeoFreeBird',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3c/c7/2d/3cc72d17-ee6d-751f-54a8-63017806c3ad/ProductionAppIcon-0-0-1x_U007emarketing-0-8-0-0-0-85-220.png/100x100bb.jpg',
    category: 'ソーシャルネットワーキング',
    developer: 'X Corp.',
    price: '無料',
    rating: 4.3,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/c7/cd/0a/c7cd0a81-ad02-5af9-8ef2-f1418f518f4e/1242x2688-1.jpg/392x696bb.jpg'
    ]
  },
  {
    id: '544007664',
    name: 'YouTube',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/db/2e/78/db2e7829-31f6-f9d8-9db8-6f6bd1d11126/logo_youtube_2024_q4_color-0-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220.png/100x100bb.jpg',
    category: '写真/ビデオ',
    developer: 'Google',
    price: '無料',
    rating: 4.7,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e8/5d/12/e85d121e-8bcf-4f57-cf07-ed23b57f1b30/f1192f1f-430d-469a-b032-cdf77b8b04c7_iOS-5.5-in_1.jpg/392x696bb.jpg'
    ]
  },
  {
    id: '985746746',
    name: 'Discord',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/35/ee/fe/35eefe62-0a84-170c-054a-fe7e2c424a5c/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg',
    category: 'ソーシャルネットワーキング',
    developer: 'Discord, Inc.',
    price: '無料',
    rating: 4.7,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/97/36/47/9736477d-a4be-7b86-88b7-1f9e29f490c8/41cec5a2-fe2e-41c2-b775-4e037998e0a0_1_GroupChat_Tile_JA_5-5.png/392x696bb.png'
    ]
  }
]
