import {emailService} from '../services/email.services.js';

export const sendEmails = async (req, res, next) => {
  try {
    
    const email = req.body.email;
    const nombre = req.body.nombre;
    const emailMsg = req.body.emailmsg;
    
    if(email=="" || email=="" || emailMsg==""){
        return res.status(404).json({message:"Datos de correo Invalidos", Data:""})
    }
    
    // Validar email


    const clsEmail  = new emailService();

    const respuesta = await clsEmail.sendEmail(email,nombre,emailMsg);
    
    if(respuesta.error){
        return res.status(500).json(respuesta)
    }

    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
};