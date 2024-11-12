import { Router } from "express";
import { miembrosController } from "../controllers/miembros.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth.verifyToken, miembrosController.findAll);
router.get("/:id", auth.verifyToken, miembrosController.findById);
router.post("/", auth.verifyToken, miembrosController.create)
router.put("/:id", auth.verifyToken, miembrosController.update);
router.delete("/:id", auth.verifyToken, miembrosController.remove);

export default router;
