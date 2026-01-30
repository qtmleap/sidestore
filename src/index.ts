import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { AppIdParamSchema, AppInfoSchema } from './schemas/ipa.schema'
import type { Bindings, Variables } from './utils/env'

const app = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>()

// Handlers
app.openapi(
  createRoute({
    method: 'get',
    path: '/ipa/:appId/manifest.plist',
    tags: ['OTA'],
    summary: 'Generate manifest.plist for OTA installation',
    request: {
      params: AppIdParamSchema
    },
    responses: {
      200: {
        description: 'Manifest plist for iOS OTA installation',
        content: {
          'application/xml': {
            schema: z.string()
          }
        }
      },
      404: {
        description: 'App not found'
      }
    }
  }),
  async (c) => {
    const { appId } = c.req.valid('param')

    // JSONからアプリ情報を取得
    const jsonUrl = new URL(`/app/jp/${appId}.json`, c.req.url)
    const response = await c.env.ASSETS.fetch(jsonUrl)

    if (!response.ok) {
      return c.text('App not found', 404)
    }

    const data = AppInfoSchema.parse(await response.json())
    const appInfo = data.results[0]

    if (!appInfo) {
      return c.text('App not found', 404)
    }

    // 57x57アイコンURLを生成（60を57に変換）
    const icon57Url = appInfo.artworkUrl60.replace('/60x60bb.', '/57x57bb.')
    const baseUrl = new URL(c.req.url).origin

    const manifest = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>${baseUrl}/ipa/${appId}/${appId}.ipa</string>
        </dict>
        <dict>
          <key>kind</key>
          <string>display-image</string>
          <key>url</key>
          <string>${icon57Url}</string>
        </dict>
        <dict>
          <key>kind</key>
          <string>full-size-image</string>
          <key>url</key>
          <string>${appInfo.artworkUrl512}</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>jp.qleap.${appInfo.bundleId.split('.').pop()}</string>
        <key>bundle-version</key>
        <string>${appInfo.version}</string>
        <key>kind</key>
        <string>software</string>
        <key>title</key>
        <string>${appInfo.trackName}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`

    return c.body(manifest, 200, {
      'Content-Type': 'application/xml'
    })
  }
)

app.openapi(
  createRoute({
    method: 'get',
    path: '/ipa/:appId/:filename',
    tags: ['OTA'],
    summary: 'Download IPA file from R2',
    request: {
      params: z.object({
        appId: z.coerce.number().int().positive(),
        filename: z.string()
      })
    },
    responses: {
      200: {
        description: 'IPA file stream',
        content: {
          'application/octet-stream': {
            schema: z.instanceof(ReadableStream)
          }
        }
      },
      400: {
        description: 'Bad Request'
      },
      404: {
        description: 'IPA not found'
      }
    }
  }),
  async (c) => {
    const { appId, filename } = c.req.valid('param')

    const object = await c.env.R2_BUCKET.get(`${appId}/${filename}`)

    if (!object) {
      return c.text('Not Found', 404)
    }

    return new Response(object.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': object.size.toString(),
        'Cache-Control': 'public, max-age=3600'
      }
    })
  }
)

// OpenAPI documentation endpoint
app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    title: 'IPA Distribution API',
    version: '1.0.0',
    description: 'API for OTA distribution of iOS apps'
  }
})

// Scalar API Reference UI
app.get(
  '/docs',
  apiReference({
    url: '/openapi.json',
    pageTitle: 'IPA Distribution API'
  })
)

export default app
