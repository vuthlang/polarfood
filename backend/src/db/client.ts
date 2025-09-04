import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { user } from './schema/user'
import { place } from './schema/place'
import { visit } from './schema/visit'

export const schema = {
  user,
  place,
  visit,
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })
