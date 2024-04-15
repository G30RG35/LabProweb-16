import ActiveRecord from "./ActiveRecord.js";
import createConnection from "../config/DB.js";

const connection = await createConnection()

class Clase extends ActiveRecord {
    static tableName = 'clase';

    constructor(clase) {
        super();
        this.grupoID = clase?.grupoID;
        this.materiaID = clase?.materiaID;
        this.usuarioID = clase?.usuarioID;
    }

    async getOnClasss(object) {
        let claves = Object.keys(object);
        let query = "SELECT * FROM clase WHERE "

        for(let i=0; i<claves.length; i++) {
            query += `${i === 0 ? '' : ' AND '}${claves[i]} = ${object[claves[i]]}`
        }

        try {
            const [results, fields] = await connection.execute(query)
            return results
        } catch (error) {
            console.log(error)
            return
        }
    }

    async saveClase(object) {
        let query = `INSERT INTO clase (`

        let claves = Object.keys(object);

        for(let i=0; i<claves.length; i++) {
            query += `${i === 0 ? '' : ', '}${claves[i]}`
        }

        query += `) VALUES (`

        for(let i=0; i<claves.length; i++) {
            query += `${i === 0 ? '' : ', '}${object[claves[i]]}`
        }

        query += ")";

        try {
            const response = await connection.execute(query);
            return {msg: "Clase creada correctamente", response}
        } catch (error) {
            console.log(error)
            return
        }
    }
}

export default Clase;