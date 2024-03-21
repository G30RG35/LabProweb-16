import ActiveRecord from "./ActiveRecord";

class Clase extends ActiveRecord {
    static tableName = 'clase';

    constructor(clase) {
        super();
        this.grupoID = clase?.grupoID;
        this.materiaID = clase?.materiaID;
        this.usuarioID = clase?.usuarioID;
    }
}

export default Clase;