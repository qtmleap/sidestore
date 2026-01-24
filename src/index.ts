import { Hono } from 'hono'
import type { Bindings, Variables } from './utils/env'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.use('*', async (_c, next) => {
  await next()
})

export default app
