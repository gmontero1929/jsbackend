import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from 'path'

//import { connectDBSqlServer, sequelize} from "./config/db.js";
import {DataTypes} from 'sequelize'

import authRoutes from "./routes/auth.js";
import productosRoutes from "./routes/productos.js";
import serviciosRoutes from "./routes/servicios.js";
import ofertasRoutes from "./routes/ofertas.js";
//import helmet from "helmet";

dotenv.config();

//connectDB();

/*
const usuario  = sequelize.define('usuario2',{
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,        
    },
  usuario:DataTypes.STRING,
  clave: DataTypes.STRING,  
},{
  tableName: 'usuario2',  
  createdAt: false,
  updatedAt: false,  
  id: false,
})
*/
 ///const Jesandry = await usuario.create({id: 12, usuario: 'Jesandry', clave: 'daniela'})    

 //const users = await usuario.findAll();
// const users = await usuario.findAll({where:{usuario:'Emilin'}}); // Uso de where 
 //console.log('All users:', JSON.stringify(users, null, 2));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 4000;


const storage = multer.diskStorage({
  destination: "uploads/",        // carpeta donde guardar
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.split(".")[0] + path.extname(file.originalname));       
  },
});

const upload = multer({ 
  storage, 
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB por imagen
    files: 15,                  // máximo 50 imágenes
  }
});

app.post("/upload", upload.array("images", 15), (req, res) => {
  res.json({ 
    message: "Imagen subida correctamente",
    files: req.files 
  });
});

app.delete("/delete-multiple", (req, res) => {
  const { files } = req.body;

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({ message: "Lista de archivos no válida" });
  }

  files.forEach((filename) => {
    const filePath = path.join(__dirname, "uploads", filename);

    fs.unlink(filePath, (err) => {
      if (err) console.error("Error eliminando:", filename);
    });
  });

  res.json({ message: "Imágenes eliminadas", count: files.length });
});

app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/ofertas", ofertasRoutes);

app.listen(PORT, () => console.log(`Backend en http://localhost:${PORT}`));