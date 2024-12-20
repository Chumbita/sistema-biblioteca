import pool from "../config/db.js";

const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM libros");
    res.json(rows);
  } catch (e) {
    res.json(e.message);
  }
};

const findByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const [row] = await pool.query("SELECT * FROM libros WHERE ISBN = ?", [
      isbn,
    ]);
    if (row.length === 1) {
      res.json(row[0]);
    } else {
      res.json({ message: "Libro no encontrado" });
    }
  } catch (e) {
    res.json(e.message);
  }
};

const create = async (req, res) => {
  const {
    titulo,
    autor,
    genero,
    ISBN,
    numero_estante,
    numero_repisa,
    fk_secciones,
    imagen,
    estado,
  } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO libros (titulo, autor, genero, ISBN, numero_estante, numero_repisa, fk_secciones, imagen, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titulo,
        autor,
        genero,
        ISBN,
        numero_estante,
        numero_repisa,
        fk_secciones,
        imagen,
        estado,
      ]
    );
    res.json({ id: result.insertId });
  } catch (e) {
    res.json(e.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    autor,
    genero,
    ISBN,
    numero_estante,
    numero_repisa,
    fk_secciones,
    imagen,
    estado,
  } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE libros SET titulo = ?, autor = ?, genero = ?, ISBN = ?, numero_estante = ?, numero_repisa = ?, fk_secciones = ?, imagen = ?, estado = ? WHERE id = ?",
      [
        titulo,
        autor,
        genero,
        ISBN,
        numero_estante,
        numero_repisa,
        fk_secciones,
        imagen,
        estado,
        id,
      ]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Libro actualizado" });
    } else {
      res.json({ message: "Libro inexistente" });
    }
  } catch (e) {
    res.json(e.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM libros WHERE id = ?", [id]);
    if (result.affectedRows === 1) {
      res.json({ message: "Libro eliminado" });
    } else {
      res.json({ message: "Libro inexistente" });
    }
  } catch (e) {
    res.json(e.message);
  }
};

export const librosController = {
  findAll,
  findByISBN,
  create,
  update,
  remove,
};
