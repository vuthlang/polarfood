import { Hono } from "hono";
import { placeController } from "../controllers/placeController";

const place = new Hono();

place.post("/", placeController.create);
place.get("/:id", placeController.getById);
place.get("/", placeController.getAll);

export default place;
