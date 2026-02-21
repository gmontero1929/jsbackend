import express from "express";
import sql from "mssql";
import { authRequired, requirePermission } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authRequired, requirePermission("productos_view"), async (req, res) => {
  const result = await sql.query`SELECT * FROM Productos ORDER BY Id DESC`;
  res.json(result.recordset);
});

router.post("/", authRequired, requirePermission("productos_create"), async (req, res) => {
  const { Nombre, Descripcion, Precio } = req.body;

  await sql.query`
    INSERT INTO Productos (Nombre, Descripcion, Precio)
    VALUES (${Nombre}, ${Descripcion}, ${Precio})
  `;

  res.json({ message: "Producto creado" });
});

router.put("/:id", authRequired, requirePermission("productos_edit"), async (req, res) => {
  const { id } = req.params;
  const { Nombre, Descripcion, Precio } = req.body;

  await sql.query`
    UPDATE Productos SET
    Nombre = ${Nombre}, Descripcion = ${Descripcion}, Precio = ${Precio}
    WHERE Id = ${id}
  `;

  res.json({ message: "Producto actualizado" });
});

router.delete("/:id", authRequired, requirePermission("productos_delete"), async (req, res) => {
  const { id } = req.params;

  await sql.query`DELETE FROM Productos WHERE Id = ${id}`;

  res.json({ message: "Producto eliminado" });
});

export default router;