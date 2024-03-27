import ActiveRecord from "./ActiveRecord.js";

class DetUsuarioRol extends ActiveRecord {
    static tableName = 'detUsuarioRol';

    constructor(detUsuarioRol) {
        super();
        this.userID = detUsuarioRol?.usuarioID;
        this.rolID = detUsuarioRol?.rolID;
    }
}

export default DetUsuarioRol;