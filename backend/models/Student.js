import ActiveRecord from "./ActiveRecord.js";

class Alumno extends ActiveRecord {
    constructor(alumno) {
        super();
        this.id = alumno?.id
        this.nombre = alumno?.nombre;
    }

    static tableName = 'Alumno'
}


export default Alumno