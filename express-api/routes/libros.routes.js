import {Router} from "express";
import {librosController} from "../controllers/libros.controller.js";
import {auth} from "../middleware/auth.js";

const router = Router();

router.get("/", auth.verifyToken, librosController.findAll);
router.get("/:isbn", auth.verifyToken, librosController.findByISBN);
router.post("/", auth.verifyToken, librosController.create);
router.put("/:id", auth.verifyToken, librosController.update);
router.delete("/:id", auth.verifyToken, librosController.remove);

export default router;
