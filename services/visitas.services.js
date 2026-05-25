
import { db } from "../config/db.js";
import 'dotenv/config'

getAllVisitas = async () => {
    try {                            
        const [visitas] = await db.query(`SELECT * from visitas`);
                
        return { "users":visitas,"message": "Ok" };
            
      } catch (err) {
        console.log("ERROR EN VISITAS:", err);
        return { Error: "Error interno del servidor" + err};
      }

};