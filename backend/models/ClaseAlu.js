import ActiveRecord from "./ActiveRecord.js";
import createConnection from "../config/DB.js";

const connetion = await createConnection()

class ClaseAlu extends ActiveRecord {
    static tableName = 'claseAlu';

    constructor(claseAlu) {
        super();
        this.usuarioID = claseAlu?.usuarioID;
        this.grupoID = claseAlu?.grupoID;
        this.materiaID = claseAlu?.materiaID;
        this.maestroID = claseAlu?.maestroID;
        this.calificacion = claseAlu?.calificacion;
    }

    async updateGrade(usuarioID, grupoID, materiaID, maestroID, calificacion) {
        let query = `UPDATE claseAlu `;
        query += `SET calificacion = ${calificacion} `;
        query += `WHERE usuarioID = ${usuarioID} AND grupoID = ${grupoID} AND materiaID = ${materiaID} AND maestroID = ${maestroID}`

        try {
            await connetion.execute(query)
            return {msg: 'Se guardo la calificacion correctamente'}
        } catch (err) {
            console.log(err)
            return
        }
    }
}

export default ClaseAlu;