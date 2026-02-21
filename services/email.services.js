//import express from "express";

import { enviarEmail } from "../utils/gestionEmails.js";

export class emailService{
    constructor(){}

    sendEmail = async (email, nombre, emailMsg) => {
    try {                    
                 
        const result = enviarEmail(email, nombre, emailMsg);
        
        return result;        
            
      } catch (err) {        
        return { Error: "Error interno del servidor" + err};
      }
    }
};