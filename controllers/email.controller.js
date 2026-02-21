import {emailService} from '../services/email.services.js';

export const sendEmails = async (req, res, next) => {
  try {
    
    const emailTo = req.body.emailto;
    const emailSubject = req.body.emailsubject;
    const emailMsg = req.body.emailmsg;
    
    if(emailTo=="" || emailSubject=="" || emailMsg==""){
        return res.status(404).json({message:"Datos de correo Invalidos", Data:""})
    }

    const clsEmail  = new emailService();

    const respuesta = await clsEmail.sendEmail(emailTo,emailSubject,emailMsg);
    
    if(respuesta.error){
        return res.status(404).json(respuesta)
    }

    return res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
};