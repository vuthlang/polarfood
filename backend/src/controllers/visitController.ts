import { Context } from "hono";
import { visitService } from "../services/visitService";
import { visitSchema } from "../schemas/visit";

export const visitController = {
  create: async (c: any) => {
    try {
      const body = await c.req.json();
      body.visitDate = new Date(body.visitDate);
      const parsed = visitSchema.parse(body);
      const created = await visitService.create(parsed);
      return c.json(created, 201);
    } catch (err: any) {
      return c.json({ error: err.message || "Invalid input" }, 400);
    }
  },

  getById: async (c: any) => {
    try {
      const id = Number(c.req.param("id"));
      const visit = await visitService.getById(id);
      if (!visit) return c.json({ error: "Visit not found" }, 404);
      return c.json(visit);
    } catch (err: any) {
      return c.json({ error: err.message }, 500);
    }
  },

  getAll: async (c: any) => {
    try {
      const visits = await visitService.getAll();
      return c.json(visits);
    } catch (err: any) {
      return c.json({ error: err.message }, 500);
    }
  },

  update: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const updated = await visitService.update(id, body);
    if (!updated) {
      return c.json({ error: "Visit not found or not updated" }, 404);
    }
    return c.json(updated);
  },

  delete: async (c: Context) => {
    const id = Number(c.req.param("id"));
    const deleted = await visitService.delete(id);
    if (!deleted) {
      return c.json({ error: "Visit not found or not deleted" }, 404);
    }
    return c.json({ message: "Visit deleted successfully" });
  },
};
