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
    id: '389801252',
    name: 'Instagram',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4f/65/4d/4f654d6b-30ad-d39d-d822-f5c1f0e0dce1/Prod-0-0-1x_U007emarketing-0-7-0-85-220.png/100x100bb.jpg',
    category: '写真/ビデオ',
    developer: 'Meta Platforms, Inc.',
    price: '無料',
    rating: 4.7,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b6/d6/b4/b6d6b45b-9d2f-fd35-8c6e-74be562e0a5d/0af88d1f-3f15-4f72-9633-e87bb5cf0ed5_Apple_iPhone_14_Pro_Max_-_Screenshot_1.png/392x696bb.png'
    ]
  },
  {
    id: '284882215',
    name: 'Facebook',
    icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a9/4b/77/a94b77c4-bc06-4e8e-f0d2-e2c19c4a5c01/Icon-Production-0-0-1x_U007emarketing-0-7-0-85-220.png/100x100bb.jpg',
    category: 'ソーシャルネットワーキング',
    developer: 'Meta Platforms, Inc.',
    price: '無料',
    rating: 4.0,
    screenshots: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/1c/5e/06/1c5e062a-0a24-cf2e-8f75-96fa43a714ad/a83fbc7c-8d0f-4244-b14b-d32c64387d45_1_U00281_U0029.jpg/392x696bb.jpg'
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
  }
]
