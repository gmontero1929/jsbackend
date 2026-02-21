import express from "express";
import sql from "mssql";
import { authRequired, requirePermission } from "../middleware/auth.middleware.js";
//import { connectDBSqlServer, connectDBMysql, sequelize } from "../config/db.js";
import { connectDBMysql} from "../config/db.js";

const router = express.Router();

//CONSULTAR TODOS LOS PRODUCTOS
async function queryReturnProductos(){    
   try {
    const db = await connectDBMysql();
    const [results] =  await db.query(`Select * from Productos`);                
          
    return results;
   } catch (error) {
    return [];
   }
} 


//GUARDAR PRODUCTO
async function querySaveProductos(producto){    
    const db =  await connectDBMysql()
    try {
      const [results] =  await db.query(`
            INSERT INTO Productos 
                (codpro, nombre, descripcion, costoVenta, categoria, 
                imagen, condicion, ubicacion)
            VALUES (${producto.Codigo},'${producto.Nombre}', '${producto.Descripcion}', 
                ${producto.Precio}, '${producto.Categoria}', '${producto.Imagen}',
                '${producto.Condicion}', '${producto.Ubicacion}')
    `);  
    
    return results;
    } catch (error) {
      return [];
    }  
}


//router.get("/", authRequired, requirePermission("productos_view"), async (req, res) => {
//CONSULTAR PRODUCTOS  
router.get("/", async (req, res) => {
  try {
      const datos = await queryReturnProductos(); 
      res.json(datos);
  } catch (error) {
    res.json({message:'Error consultando datos'});
  }

});


//router.post("/", authRequired, requirePermission("productos_create"), async (req, res) => {
//INSERTANDO PRODUCTO
router.post("/", async (req, res) => {
  try {
    
    const { Codigo, Nombre, Descripcion, Precio, Categoria, Imagen, Condicion, Ubicacion } = req.body;   
    const producto = { Codigo, Nombre, Descripcion, Precio, Categoria, Imagen, Condicion, Ubicacion }
    const datos = await querySaveProductos(producto);
    res.json({ message: "Producto creado" });

  } catch (error) {
    res.json({ message: "Error Producto creado" });
  }
 
});


//router.put("/:id", authRequired, requirePermission("productos_edit"), async (req, res) => {
//ACTUALIZANDO PRODUCTO
router.put("/:id", async (req, res) => {
  const db =  await connectDBMysql();
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio, Ubicacion, Condicion } = req.body;
    
    await db.query(`
      UPDATE Productos SET
      nombre = '${Nombre}', descripcion = '${Descripcion}', costoventa = ${Precio},
      ubicacion = '${Ubicacion}', condicion = '${Condicion}'
      WHERE Id = ${id}
    `);

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.json({ message: "Error actualizando registro." + error});
  }
  
});


//authRequired, requirePermission("productos_delete"),
//ELIMINADO PRODUCTO
router.delete("/:id",  async (req, res) => {
  const db =  await connectDBMysql();
  try {
    const { id } = req.params;     
    const result = await db.query(`DELETE FROM Productos WHERE id = ${id}`);

    if(result[0].affectedRows===0){
      res.json({ message: "No existe registro para eliminar" });  
      return;
    }

    res.json({ message: "Registro eliminado" });  
  } catch (error) {
    res.json({ message: "Error eliminando registro." });
  }  
});

export default router;