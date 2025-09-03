import { Context } from "hono";
import { placeService } from "../services/placeService";

export const placeController = {
  create: async (c: Context) => {
    try {
      const body = await c.req.json();
      const newPlace = await placeService.createPlace(body);
      return c.json(newPlace, 201);
    } catch (error: any) {
      return c.json({ message: error.message }, 400);
    }
  },

  getById: async (c: Context) => {
    try {
      const id = Number.parseInt(c.req.param("id"), 10);
      const place = await placeService.getPlaceById(id);
      return c.json(place);
    } catch (error: any) {
      return c.json({ message: error.message }, 404);
    }
  },

  getAll: async (c: Context) => {
    try {
      const places = await placeService.getAllPlaces();
      return c.json(places);
    } catch (error: any) {
      return c.json({ message: error.message }, 500);
    }
  },
};
