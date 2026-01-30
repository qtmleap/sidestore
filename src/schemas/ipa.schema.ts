import { z } from '@hono/zod-openapi'

export const AppIdParamSchema = z.object({
  appId: z.coerce
    .number()
    .int()
    .positive()
    .openapi({
      param: { name: 'appId', in: 'path' },
      example: 333903271,
      description: 'App Store ID'
    })
})

export const FilenameParamSchema = z.object({
  appId: z.coerce
    .number()
    .int()
    .positive()
    .openapi({
      param: { name: 'appId', in: 'path' },
      example: 333903271,
      description: 'App Store ID'
    }),
  filename: z
    .string()
    .regex(/^\d+\.ipa$/)
    .openapi({
      param: { name: 'filename', in: 'path' },
      example: '333903271.ipa',
      description: 'IPA filename'
    })
})

export const AppInfoSchema = z.object({
  results: z.array(
    z.object({
      bundleId: z.string().nonempty(),
      version: z.string().nonempty(),
      trackName: z.string().nonempty(),
      artworkUrl512: z.url(),
      artworkUrl60: z.url()
    })
  )
})
