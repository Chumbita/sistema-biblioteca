import {Router} from "express";
import {prestamosController} from "../controllers/prestamos.controller.js";
import {auth} from "../middleware/auth.js";

const router = Router();

router.get("/", auth.verifyToken, prestamosController.getPrestamos);
router.post("/", auth.verifyToken, prestamosController.crearPrestamo);
router.put("/:id", auth.verifyToken, prestamosController.devolverLibro);

export default router;