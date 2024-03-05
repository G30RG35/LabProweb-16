import ActiveRecord from "./ActiveRecord.js";

class Alumno extends ActiveRecord {
    static tableName = 'Alumno'

    constructor(alumno) {
        super();
        this.id = alumno?.id
        this.nombre = alumno?.nombre;
    }
}


export default Alumno