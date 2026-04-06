
import ClientService from "../services/cliente.service.js";

const clientSer = new ClientService();

export default class ClientController{
        constructor(parameter){
            //console.log("Bienvenido Clientes")
        }
        
        getClients = async (req, res, next) => {
        try {   
            const respuesta = await clientSer.getAllClients();                                         
             if(Object.keys(respuesta.customers).length===0){
                return res.status(404).json(respuesta)
            }

            return res.status(200).json(respuesta.customers);

        } catch (error) {
            next(error);
        }
        };

        getClientByCode = async (req, res, next) => {
          try {
        
            const codigo = req.body.codigo;
                
            const respuesta = await clientSer.getClient_ByCode(codigo);
            if(respuesta.message==="Ok"){
                return res.status(200).json(respuesta.clientes)
            }
        
            return res.status(404).json(respuesta)
            
          } catch (error) {
            console.error(error);
            next(error);
          }
        };


        createClient = async (req, res, next) => {
        try {

            const client = req.body;
                
            const respuesta = await clientSer.create_Client(client);
            if(respuesta.message==="Ok"){
                return res.status(200).json({"message":"Registro guardado exitosamente"})
            }

            return res.status(404).json({"message":"Error al guardar datos"})
            
        } catch (error) {
            console.error(error);
            next(error);
        }
        };


        updateClient = async (req, res, next) => {
        try {

            const client = req.body;            
            const respuesta = await clientSer.update_Client(client);
            if(respuesta.message==="Ok"){
                return res.status(200).json({"message":"Registro actualizado exitosamente"})
            }

            return res.status(404).json({"message":"Error al guardar datos"})
            
        } catch (error) {
            console.error(error);
            next(error);
        }
        };

       

        deleteClient = async (req, res, next) => {
          try {            
            const id = req.body.id; 
            
            const respuesta = await clientSer.delete_Client(id);
            if(respuesta.message==="Ok"){
                return res.status(200).json(respuesta)
            }
        
            return res.status(404).json({})
            
          } catch (error) {
            console.error(error);
            next(error);
          }
        };

}




