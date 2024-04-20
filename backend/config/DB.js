import mysql from 'mysql2/promise'

const createConnection = async() => {
    try {
        const connetion = await mysql.createConnection({
            host: 'localhost',
            user: 'root', 
            password: 'Alejandroe2004ms*',
            database: 'escueladb'
        })

        console.log("Conexion exitosa");

        return connetion;
    } catch (error) {
        console.log("Hubo un error");
        return
    }
}

export default createConnection