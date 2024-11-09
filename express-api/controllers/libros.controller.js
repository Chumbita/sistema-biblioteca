import pool from "../config/db";

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
    const [row] = await pool.query("SELECT * FROM libros WHERE ISBN", [isbn]);
    if (row.lenght === 1) {
      res.json(row[0]);
    } else {
      res.json({ message: "Producto no encontrado" });
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
    isbn,
    numero_estante,
    numero_repisa,
    fk_secciones,
    img,
  } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO libros (titulo, autor, genero, ISBN, numero_estante, numero_repisa, fk_secciones, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titulo,
        autor,
        genero,
        isbn,
        numero_estante,
        numero_repisa,
        fk_secciones,
        img,
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
    isbn,
    numero_estante,
    numero_repisa,
    fk_secciones,
    img,
  } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE libros SET titulo = ?, autor = ?, genero = ?, ISBN = ?, numero_estante = ?, numero_repisa = ?, fk_secciones = ?, img = ?, WHERE id = ?",
      [
        titulo,
        autor,
        genero,
        isbn,
        numero_estante,
        numero_repisa,
        fk_secciones,
        img,
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
    const [result] = pool.query("DELETE FROM libros WHERE id = ?", [id]);
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
