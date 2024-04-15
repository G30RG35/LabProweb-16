import ActiveRecord from "./ActiveRecord.js";
import createConnection from "../config/DB.js";

const connection = await createConnection()

class ClaseInfo extends ActiveRecord {
    static tableName = 'clase';

    constructor(ClaseInfo) {
        super();
        this.grupoID = ClaseInfo?.grupoID;
        this.materiaID = ClaseInfo?.materiaID;
        this.usuarioID = ClaseInfo?.usuarioID;
    }

    async getClaseAllInfo(object) {
        let claves = Object.keys(object);
        let query = "SELECT c.grupoID, c.materiaID, c.usuarioID, m.nombre as materia, u.nombre as maestro FROM clase AS c\n"
        query += "INNER JOIN materia AS m ON m.ID = c.materiaID\n"
        query += "INNER JOIN user AS u ON u.ID = c.usuarioID"

        try {
            const [results, fields] = await connection.execute(query)
            return results
        } catch (error) {
            console.log(error)
            return
        }
    }

    async getClaseOneInfo(object) {
        let claves = Object.keys(object);
        let query = "SELECT c.grupoID, c.materiaID, c.usuarioID, m.nombre as materia, u.nombre as maestro FROM clase AS c\n"
        query += "INNER JOIN materia AS m ON m.ID = c.materiaID\n"
        query += "INNER JOIN user AS u ON u.ID = c.usuarioID\n"
        query += "WHERE "

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
}

export default ClaseInfo;