
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, 
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function enviarEmail(emailTo, emailSubject, emailMsg) {
  try {    
    const info = await transporter.sendMail({
      from: '"JACOMDAS.COM" <info@jacomdas.com>',
      to: emailTo,
      subject: emailSubject,      
      html: `<div style='color:green'>                
                <p>${emailMsg}</p>
             </div>`
    });
    
    return {message:"Correo enviado:", data: info.messageId}    

    } catch (error) {
    return {message: "Error enviando correo:" , error:error}        
  }
}