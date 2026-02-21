import { connectDBMysql} from "../config/db.js";

export class Company {
  constructor(parameters) {
    
  }
}

export const getAllCompany = async () => {
    try {                    
        const dbConexion = await connectDBMysql();
        const [companies] = await dbConexion.query(`SELECT * from compania`);
                  
        if (Object.keys(companies).length === 0) {    
          return { "users":{}, "message": "No existe data" };
        }                 
        
        return { "companies":companies,"message": "Ok" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};