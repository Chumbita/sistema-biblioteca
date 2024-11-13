import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import miembrosRoutes from "./routes/miembros.routes.js"
import seccionesRoutes from "./routes/secciones.routes.js"
import prestamosRoutes from "./routes/prestamos.routes.js"
import librosRoutes from "./routes/libros.routes.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/libros", librosRoutes);
app.use("/miembros", miembrosRoutes);
app.use("/secciones", seccionesRoutes);
app.use("/prestamos", prestamosRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
