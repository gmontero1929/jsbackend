
//import nodemailer from 'nodemailer'
import sgMail from "@sendgrid/mail";
/*
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT, 
  secure: false,
  requireTLS: process.env.EMAIL_TLS,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
*/
/*
export async function enviarEmail(email, nombre, emailMsg) {
 
    try {
    const info = await transporter.sendMail({
      from: `"JACOMDAS.COM" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // TU correo de Hostinger
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <h3>Nuevo mensaje desde Jacomdas.com</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${emailMsg}</p>
      `
    });

     return {message:"Mensage enviado:", data: info.messageId}    

  } catch (error) {
    console.error(error);
    return {message: "Error enviando email:" , error:error}       
  }

}
*/
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const enviarCorreos = async (email, nombre, servicioInteres ,emailMsg) => {
  try {

    //validar email
    //email


    const result = await sgMail.send({
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER,
      subject: process.env.EMAIL_MSG,      
      html: `
        <h3 style="color: green"><strong>Nuevo mensaje desde Jacomdas.com</strong></h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong style="color: brown">Sevicio de Interés:</strong> ${servicioInteres}</p>
        <p><strong>Mensaje:</strong><br>${emailMsg}</p>
      `,
    });

    const header = result[0].headers;

    if(result[0].statusCode==202){
        return {message:"Mensage enviado", data: header['x-message-id']}  
    }    
    
    return {message:"Error enviado Email", data: result[0]}  
    
    
  } catch (error) {
    console.error(error.response?.body || error);    
    return {message: "Error enviando email" , error:error}
  }
};


