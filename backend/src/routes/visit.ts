import { Hono } from "hono";
import { visitController } from "../controllers/visitController";
import { authMiddleware } from "../middlewares/authMiddleware";

const visit = new Hono();

visit.use("*", authMiddleware);
visit.post("/", visitController.create);
visit.get("/:id", visitController.getById);
visit.get("/", visitController.getAll);
visit.put("/:id", visitController.update);
visit.delete("/:id", visitController.delete);

export default visit;
