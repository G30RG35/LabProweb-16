import ActiveRecord from "./ActiveRecord.js";

class Materia extends ActiveRecord {
    static tableName = 'materia';

    constructor(materia) {
        super();
        this.ID = materia?.ID;
        this.nombre = materia?.nombre;      
        this.activo = materia?.activo ?? true;
    }
}

export default Materia;