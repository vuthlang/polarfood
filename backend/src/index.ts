import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import authRouter from './routes/auth'
import placeRouter from './routes/place'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', authRouter)
app.route('/place', placeRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
