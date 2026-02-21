import jwt from "jsonwebtoken";
import sql from "mssql";

export const authRequired = async (req, res, next) => {
  const hdr = req.headers.authorization;
  if (!hdr) return res.status(401).json({ error: "Token requerido" });

  const token = hdr.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Obtener permisos del usuario
    const permisos = await sql.query`
      SELECT P.Nombre 
      FROM RolePermisos RP
      JOIN Permisos P ON RP.PermisoId = P.Id
      WHERE RP.RolId = ${decoded.rol}
    `;

    req.permisos = permisos.recordset.map((p) => p.Nombre);

    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};

export const requirePermission = (perm) => {
  return (req, res, next) => {
    if (!req.permisos.includes(perm)) {
      return res.status(403).json({ error: "Permiso denegado" });
    }
    next();
  };
};