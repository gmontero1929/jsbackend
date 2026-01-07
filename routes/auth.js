import express from "express";
import sql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDBMysql} from "../config/db.js";
import 'dotenv/config'
//import { connectDBSqlServer, connectDBMysql, sequelize } from "../config/db.js";

const router = express.Router();

//REGISTRAR UN USUARIO
router.post("/register", async (req, res) => {

  try {
    const {id ,usuario, pass, rol, email} = req.body;    
    const passhash = await bcrypt.hash(pass, 10);
    const db = await connectDBMysql();

    const [rowsUserInsert] = await db.query(
      `INSERT INTO Usuarios
      (id, usuario, clave, roll, email)
      VALUES(${id}, '${usuario}', '${passhash}', ${rol}, '${email}')          
      `);

    res.json({ message: "Usuario registrado" });    
  } catch (error) {
     res.json({ message: "Error registrando registro" });
  }
  
});


router.post("/login", async (req, res) => {
  try {
    const { usuario, pass } = req.body; 
    //const user = await queryReturnUsers(usuario);

    const db = await connectDBMysql();
    const [user] = await db.query(`SELECT * from Usuarios where usuario = '${usuario}'`);
    console.log(user);
        
    if (user.length === 0) {    
      return res.status(400).json({ error: "Usuario no existe" });
    }
    
    const ok = await bcrypt.compare(pass, user[0].clave);    
    if (!ok){     
      return res.status(400).json({ error: "Las credenciales son incorrectas" });
    }
    
    const token = jwt.sign(
      { id: user[0].id, rol: user[0].roll, user: user[0].usuario, 
        email:user[0].email, company:user[0].compania, isvalid:user[0].validado
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    ); 
    
    return res.status(200).json({ token });

  } catch (err) {
    console.log("ERROR EN LOGIN:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;