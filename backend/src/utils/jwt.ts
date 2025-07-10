import { sign } from 'hono/jwt'

export async function generateToken(userId: number) {
  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }

  return await sign(
    payload,
    process.env.JWT_SECRET!,
    'HS256'
  )
}
