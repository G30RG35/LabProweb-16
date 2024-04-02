import mysql from 'mysql2/promise'

const createConnection = async() => {
    const connetion = await mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: 'admin',
        database: 'escueladb'
    })

    return connetion;
}

export default createConnection