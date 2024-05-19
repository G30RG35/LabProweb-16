import { emailContact } from "../helpers/email.js"

const handleContacto = async(req, res) => {
    const { emailInfo } = req.body

    

    try {
        await emailContact(emailInfo);

        return res.status(201).json({
            status: 201, 
            msg : "Se ha enviado el correo de forma exitosa"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500, 
            msg : "No se envio el correo, por favor, intente más tarde"
        })
    }
}

export {
    handleContacto
}