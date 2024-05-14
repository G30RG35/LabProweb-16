import nodemailer from 'nodemailer'

export const emailNewUser = async(datos) => {
    const { email, ID, password, nombre } = datos;

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const msgHtml = `
        <div style="font-family: 'Roboto', sans-serif; width: 100%; display: flex; justify-content: center;">
            <div 
                style="
                    padding: 12px 25px; 
                    background: rgb(236,235,240); 
                    border-radius: 10px;
                "
            >
                <div style="display: flex; justify-content: center;">
                    <h2 style="font-weight: 700; font-size: 35px; margin: 10px 0; color: #0d4d6d;">IEI School</h2>
                </div>
                
                <p style="margin: 2px 0 5px 0;">Bienvenido ${nombre}! el sistema de IEI School te ha dado de alta, tus claves de acceso se muestran a continuacion</p>
                <p style="margin: 2px 0 5px 0;">Este mensaje fue enviado al correo asignado: ${email}</p>
                <p style="margin: 5px 0; font-weight: 600; margin-top: 20px;">Matricula: <span style="font-weight: normal;">${ID}</span></p>
                <p style="margin: 5px 0; font-weight: 600; margin-bottom: 10px;">Contraseña: <span style="font-weight: normal;">${password}</span></p>
                <a href="${process.env.FRONTEND_URL}/login" style="text-decoration: none; background-color: #0284c7; color: white; font-weight: 800; padding: 5px 10px; border-radius: 5px;">Iniciar sesión</a>

                <br>
                <p>Si tu no solicitaste tus claves, por favor, ignora este mensaje</p>
            </div>
        </div>
    `

    await transport.sendMail({
        from: "Mopal Grupo <accounts@mopalgrupo.com>", 
        to: email, 
        subject: "Respues a solicitud de crear usuario para el sistema de Inventario de Mopal Grupo", 
        text: "Claves para inicio de sesion en el sistema de inventario de Mopal", 
        html: msgHtml
    });
}