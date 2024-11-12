import {Router} from "express";
import { seccionesController } from "../controllers/secciones.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth.verifyToken, seccionesController.findAll);
router.post("/", auth.verifyToken, seccionesController.create);
router.put("/:id", auth.verifyToken, seccionesController.update);
router.delete("/:id", auth.verifyToken, seccionesController.remove);

export default router;