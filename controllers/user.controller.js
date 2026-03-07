import jwt from "jsonwebtoken";

import {userService} from '../services/user.service.js';
import { useParams } from "react-router-dom";

const usc = new userService(); 

export const getUsers = async (req, res, next) => {
  try {
    const respuesta = await usc.getAllUser();

    
    
    if(Object.keys(respuesta.users).length===0){
        return res.status(404).json({"Error":"No existe data."})
    }

    res.status(200).json(respuesta.users);
  } catch (error) {
    next(error);
  }
};


export const getUserByUserAndPass = async (req, res, next) => {
  try {      
    const userid = req.body.user
    const pass = req.body.pass   
    const respuesta = await usc.getByUser(userid, pass);
     
    if(!respuesta.user || Object.keys(respuesta.user).length === 0){            
      return res.status(404).json({ Error: respuesta.message});
    }
    
    const user = respuesta.user;
    const token = jwt.sign(
          { id: user.id, rol: user.roll, user: user.usuario, 
            email:user.email, company:user.compania, isvalid:user.validado
          },
          process.env.JWT_SECRET,
          { expiresIn: `${process.env.EXPIRA}` }
    ); 
    
    res.status(200).json({ token });    
    
  } catch (error) {
    console.log("Error comun")
    next(error);
  }
};


export const getUserById = async (req, res, next) => { 
  try {        
    const id = req.body.id    
    const respuesta = await usc.getUserById(id);
     
    if(!respuesta.user || Object.keys(respuesta.user).length === 0){            
      return res.status(404).json({ Error: respuesta.message});
    }
    
    const user = respuesta.user;
       
    return res.status(200).json({ user });    
    
  } catch (error) {
    console.log("Error comun" + error)
    next(error);
  }
};


export const registerUser = async(req, res, next)=>{
    try {
    const data = req.body;      
    
    const userFound = await usc.getUserByUser(data.usuario);
        
    if(userFound.message==="Ok"){        
      return res.status(400).json({message: "El usuario ya existe"});
    }  
    
    const userFoundPass = await usc.getUserByEmail(data.email);
          
    if(userFoundPass.message==="Ok"){        
      return res.status(400).json({message:"Existe una cuenta de correo identica."});
    } 

    const user = await usc.createUser(data);
    res.json(user);
  } catch (error) {
    next(error);
  }
};


export const updateUser = async(req, res, next)=>{
    try {
    const data = req.body;         
    const userFound = await usc.updateUser(data.user);
        
    if(!userFound.message==="Ok"){        
      return res.status(400).json({message: "El usuario no existe"});
    }  
    
    return res.status(200).json(userFound);

    res.json(user);
  } catch (error) {
    next(error);
  }
};


export const deleteById = async(req, res, next)=>{
    try {       
    const user = await usc.getDeleteById(req.body.id);

    if(user.user){
      return res.status(400).json(user)
    }

    if(!user.user){
      return res.status(200).json(user)
    }    
  } catch (error) {
    next(error);
  }
};

export const deleteByUser = async(req, res, next)=>{
    try {       
    const user = await usc.getDeleteByUser(req.body.user);

    if(user.user){
      return res.status(400).json(user)
    }

    if(!user.user){
      return res.status(200).json(user)
    }    
  } catch (error) {
    next(error);
  }
};

