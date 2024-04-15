import ActiveRecord from "./ActiveRecord.js";

class Escolaridad extends ActiveRecord {
    static tableName = 'escolaridad'

    constructor(escolaridad) {
        super();
        this.ID = escolaridad?.ID;
        this.nombre = escolaridad?.nombre;
        this.duracion = escolaridad?.duracion;
    }
}

export default Escolaridad;