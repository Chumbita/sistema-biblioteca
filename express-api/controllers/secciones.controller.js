import pool from "../config/db";

const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM secciones");
    res.json(rows);
  } catch (error) {
    res.json(error.message);
  }
};

const create = async (req, res) => {
  const { nombre_seccion } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO secciones (nombre_seccion) VALUES (?)",
      [nombre_seccion]
    );
    res.json({ id: result.insertId });
  } catch (error) {
    res.json(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nombre_seccion } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE secciones SET nombre_seccion = ?",
      [nombre_seccion]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Sección actualizada" });
    } else {
      res.json({ message: "Sección inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM secciones WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 1) {
      res, json({ message: "Sección eliminada" });
    } else {
      res.json({ message: "Sección inexistente" });
    }
  } catch (error) {
    res.json(error.message);
  }
};

export const clientesController = { findAll, finById, create, update, remove };
