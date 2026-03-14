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

export const getCompany_ByCode = async (codigo) => {
    try {  
      
        const sqlString = "SELECT * from compania where codigo = ?"

        const dbConexion = await connectDBMysql();
        const [company] = await dbConexion.execute(sqlString,[ codigo ]);
                  
        if (company.affectedRows===0) {    
          return { "company":{}, "message": "No existe data" };
        }                 
        
        return { "company":company,"message": "Ok" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};

export const getCompany_ByRnc = async (rnc) => {
    try {  
      
        const sqlString = "SELECT * from compania where rnc_ced = ?"

        const dbConexion = await connectDBMysql();
        const [company] = await dbConexion.execute(sqlString,[ rnc ]);
                  
        if (company.affectedRows===0) {    
          return { "company":{}, "message": "No existe data" };
        }                 
        
        return { "company":company,"message": "Ok" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};

getCompany_ByRnc

export const create_Company = async (cia) => {
    try { 
        
        const sqlString = `
        Insert into compania
        (codigo,rnc_ced,nombre,descripcion,direccion,email,telefono,celular)
        values(?,?,?,?,?,?,?,?)`
      
        const dbConexion = await connectDBMysql();
        
        const data = [
        cia.codigo,
        cia.rnc_ced,
        cia.nombre,
        cia.descripcion,
        cia.direccion,
        cia.email,
        cia.telefono,
        cia.celular
        ].map(v => v ?? null);

        const [companies]  =  await dbConexion.execute(sqlString, data);

        console.log("ID generado:", companies.insertId);
  
        if (companies.affectedRows > 0) {    
          return { "Compania":cia,Idgenerado:companies.insertId, "message": "Ok" };
        }
        
        return { "companies":{},"message": "Problemas al registrar" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};

export const update_Company = async (cia) => {
     try { 
        
        const sqlString = `
        update compania 
        set codigo=?,
        rnc_ced=?,
        nombre=?,
        descripcion=?,
        direccion=?,
        email=?,
        telefono=?,
        celular=?
        where codigo=${cia.codigo}`
      
        const dbConexion = await connectDBMysql();
        
        const data = [
        cia.codigo,
        cia.rnc_ced,
        cia.nombre,
        cia.descripcion,
        cia.direccion,
        cia.email,
        cia.telefono,
        cia.celular
        ].map(v => v ?? null);

        const [companies]  =  await dbConexion.execute(sqlString, data);

  
        if (companies.affectedRows > 0) {    
          return { "Compania":cia,Idgenerado:companies.insertId, "message": "Ok" };
        }
        
        return { "companies":{},"message": "Problemas al registrar" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};

export const delete_Company = async (codigo) => {
    try {                    
        const dbConexion = await connectDBMysql();      

        const [companies] = await dbConexion.query(`DELETE FROM compania WHERE CODIGO = ${codigo}`);
                  
        if (companies.affectedRows>0){    
          return { "users":codigo, "message": "Ok" };
        }else{
          return { "users":{}, "message": "El registro no existe" };
        }                 
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }
};