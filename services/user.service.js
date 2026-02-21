//import express from "express";
import bcrypt from "bcryptjs";

import { connectDBMysql} from "../config/db.js";
import 'dotenv/config'
//import { json, JSON } from "sequelize";
//import Message from "tedious/lib/message.js";

export class userService{
    constructor(){}

getAllUser = async () => {
    try {                    
        const dbConexion = await connectDBMysql();
        const [users] = await dbConexion.query(`SELECT * from Usuarios`);
        
        if (Object.keys(users).length === 0) {    
          return { "users":users, "message": "No existe data" };
        }                 
        
        return { "users":users,"message": "Ok" };
            
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { Error: "Error interno del servidor" + err};
      }

};

getUserByUser = async (userid) => {
    try {
          
        const db = await connectDBMysql();
        const [user] = await db.query(`SELECT * from Usuarios where usuario = '${userid}'`);
                    
        if (user.length === 0) {    
           return {"user":{}, "message":"Usuario no existe"}    
        }
        
         return {"user":user[0], "message":"Ok"}        
    
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { error: "Error interno del servidor" };
      } 
};

getUserByEmail = async (email) => {
    try {
          
        const db = await connectDBMysql();
        const [user] = await db.query(`SELECT * from Usuarios where email = '${email}'`);
                    
        if (user.length === 0) {    
           return {"user":{}, "message":"Usuario no existe"}    
        }
        
         return {"user":user[0], "message":"Ok"}        
    
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { error: "Error interno del servidor" };
      }

  //return await User.findById(id);
};

getByUser = async (userid, pass) => {
    try {
          
        const db = await connectDBMysql();
        const [user] = await db.query(`SELECT * from Usuarios where usuario = '${userid}'`);
                    
        if (user.length === 0) {    
           return {"user":{}, "message":"Usuario no existe"}    
        }
        
        const ok = await bcrypt.compare(pass, user[0].clave);    
        if (!ok){   
          return {"user":{}, "message":"Las credenciales son incorrectas"}               
        }
        
         return {"user":user[0], "message":"Ok"}        
    
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { error: "Error interno del servidor" };
      }

  //return await User.findById(id);
};

createUser = async(user)=>{
    try {
        
        const {id ,usuario, pass, rol, email} = user;   
        const userValidating = validateUserDate(user);    
        
        if(!userValidating.isvalid){            
            return {message:userValidating.message}
        }
        
        const passhash = await bcrypt.hash(pass, 10);
        const db = await connectDBMysql();
    
        const [rowsUserInsert] = await db.query(
          `INSERT INTO Usuarios
          (id, usuario, clave, roll, email)
          VALUES(${id}, '${usuario}', '${passhash}', ${rol}, '${email}')          
          `);
              
        if(rowsUserInsert.affectedRows===1){
            return {user:user, message:"Usuario registrado satisfactoriamente."}    
        }    
        
        return ({ message: "Usuario no registrado" });    

      } catch (error) {
         res.json({ message: "Error registrando registro" });
      }
      
};

getDeleteByUserId = async (userid) => {
    try {  
              
        const db = await connectDBMysql();
        const [user] = await db.query(`DELETE from Usuarios where usuario = '${userid}'`);
        
        if (user.affectedRows === 0) { 
          return {user:userid, message:`El usuario (${userid}) no existe`}
        }        
          
       return {user:"",message:`Usuario (${userid}) eliminado con existo`}    
               
      } catch (err) {
        console.log("ERROR EN LOGIN:", err);
        return { error: "Error interno del servidor" };
      }
};

}

export const getUpdateId = async (userid) => {
  return await User.findById(id);
};

const validateUserDate=(user) =>{
    try {

        if(!user.usuario){
           return {isvalid:false,message:"User field does not exist or is empty."} 
        }

        if(!user.pass){
            return {isvalid:false,message:"Password field does not exist or is empty."}             
        }

        if(!user.rol){
            return {isvalid:false,message:"Roll field does not exist or is empty."}              
        }

        if(!user.email){
            return {isvalid:false,message:"Email field does not exist or is empty."}              
        }

        return {isvalid:true,message:"Datos validados"}  
    } catch (error) {
       return {isvalid:false,message:"Error validating user data"}      
    }
}
