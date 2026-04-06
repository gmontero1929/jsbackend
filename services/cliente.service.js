import { db } from "../config/db.js";

export default class ClientService {
  constructor(parameters) {
    
  }
        getAllClients = async () => {
            //const dbConexion = await connectDBMysql();
            try {                   
                const [customers] = await db.query(`SELECT * from Clientes`);
                        
                if (customers.length === 0) {    
                return { "clients":{}, "message": "No existe data" };
                }                
                
                return {customers,"message": "Ok" };
                    
            } catch (err) {
                console.log("ERROR EN LOGIN:", err);
                return { Error: "Error interno del servidor" + err};
            }  
        };

        getClient_ByCode = async (codigo) => {
            try {  
            
                const sqlString = "SELECT * from Clientes where codigo = ?"
                
                const [company] = await db.execute(sqlString,[ codigo ]);
                        
                if (company.affectedRows===0) {    
                return { "company":{}, "message": "No existe data" };
                }                 
                
                return { "company":company,"message": "Ok" };
                    
            } catch (err) {
                console.log("ERROR EN LOGIN:", err);
                return { Error: "Error interno del servidor" + err};
            }
        };

        create_Client = async (clt) => {
            try { 
                
                // aquí se deben validar los datos antes insertarlos en BD     

                const sqlString = `
                Insert into Clientes
                (codigo, compania, usuario, nombre,
                apellidos, identidad, telefono,
                email, celular, direccion)
                values(?,?,?,?,?,?,?,?,?,?)`
                                          
                const data = [
                clt.codigo, clt.compania, clt.usuario,
                clt.nombre, clt.apellidos, clt.identidad, 
                clt.telefono, clt.email, clt.celular,
                clt.direccion,
                ].map(v => v ?? null);

                const [clients]  =  await db.execute(sqlString, data);
                        
                if (clients.affectedRows > 0) {    
                return { "Clients":clt,Idgenerado:clients.insertId, "message": "Ok" };
                }
                
                return { "Clients":{},"message": "Problemas al registrar" };
                    
            } catch (err) {
                console.log("ERROR EN LOGIN:", err);
                return { Error: "Error interno del servidor" + err};
            }
        };


        update_Client = async (clt) => {
            try { 
                
                // aquí se deben validar los datos antes insertarlos en BD     

                const sqlString = `
                update Clientes set nombre=?,
                apellidos=?, identidad=?, telefono=?,
                email=?, celular=?, direccion=?                
                where id = ${clt.id}`
                                          
                const data = [                
                clt.nombre, clt.apellidos, clt.identidad, 
                clt.telefono, clt.email, clt.celular,
                clt.direccion,
                ].map(v => v ?? null);

                const [clients]  =  await db.execute(sqlString, data);
                        
                if (clients.affectedRows > 0) {    
                return { "Clients":clt,Idgenerado:clients.insertId, "message": "Ok" };
                }
                
                return { "Clients":{},"message": "Problemas al actualizar" };
                    
            } catch (err) {
                console.log("ERROR EN LOGIN:", err);
                return { Error: "Error interno del servidor" + err};
            }
        };

        delete_Client = async (id) => {
            try {  
            
                const sqlString = "DELETE from Clientes where id = ?"
                
                const [cliente] = await db.execute(sqlString,[ id ]);
                        
                if (cliente.affectedRows===0) {    
                return { "company":{}, "message": "No existe data" };
                }                 
                
                return { "company":cliente.affectedRows,"message": "Ok" };
                    
            } catch (err) {
                console.log("ERROR EN LOGIN:", err);
                return { Error: "Error interno del servidor" + err};
            }
        };
}