import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.json({message: "Acceso denegado. Token no proporcionado."});

  token = token.split(" ")[1];

  try {
    const { uid, username } = jwt.verify(token, process.env.JWT_SECRET); // devuelve el payload (carga util)
    req.uid = uid;
    req.user = username;
    //req.rol_id = rol_id;

    next();
  } catch (error) {
    return res.json({ message: "Token no valido" });
  }
};

export const auth = {verifyToken};