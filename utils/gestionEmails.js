
import nodemailer from 'nodemailer'

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

