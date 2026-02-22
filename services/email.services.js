//import express from "express";

import { enviarCorreos } from "../utils/gestionEmails.js";

export class emailService{
    constructor(){}

    sendEmail = async (email, nombre, servicioInteres ,emailMsg) => {
    try {                    
                 
        const result = enviarCorreos(email, nombre,servicioInteres, emailMsg);
        
        return result;        
            
      } catch (err) {        
        return { Error: "Error interno del servidor" + err};
      }
    }
};