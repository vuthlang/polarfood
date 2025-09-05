import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Non autorisé. Token manquant." }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!);
    c.set("user", decoded);
    await next();
  } catch (err) {
    return c.json({ error: "Token invalide ou expiré." }, 401);
  }
};
