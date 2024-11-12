import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const findByUsername = async (username) => {
  const [row] = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [
    username,
  ]);
  return row[0];
};

export const register = async (req, res) => {
  const { username, name, surname, email, password } = req.body;

  try {
    const user = await findByUsername(username);
    if (user) {
      return res.json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (usuario, nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?, ?)",
      [username, name, surname, email, hashedPassword]
    );
    res.json({ message: "Usuario registrado exitosamente" });
  } catch (e) {
    res.json(e.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsername(username);
    if (!user) {
      return res.json({ message: "Usuario y/o contraseña son incorrecta." });
    }
    const isValid = await bcrypt.compare(password, user.contraseña);
    if (!isValid) {
      return res.json({ message: "Usuario y/o contraseña son incorrectos" });
    }

    const token = jwt.sign(
      { uid: user.uid, username: user.usuario},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token: token });
  } catch (e) {
    console.log(e.message);
  }
};
