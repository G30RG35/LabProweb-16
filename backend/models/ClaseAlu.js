import ActiveRecord from "./ActiveRecord.js";

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
}

export default ClaseAlu;