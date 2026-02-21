//import express from "express";

import { enviarEmail } from "../utils/gestionEmails.js";

export class emailService{
    constructor(){}

    sendEmail = async (emailTo, emailSubject, emailMsg) => {
    try {                    
                 
        const result = enviarEmail(emailTo, emailSubject, emailMsg);
        
        return result;        
            
      } catch (err) {        
        return { Error: "Error interno del servidor" + err};
      }
    }
};