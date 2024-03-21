import ActiveRecord from "./ActiveRecord";

class DetUsuarioRol extends ActiveRecord {
    static tableName = 'detUsuarioRol';

    constructor(detUsuarioRol) {
        super();
        this.usuarioID = detUsuarioRol?.usuarioID;
        this.rolID = detUsuarioRol?.rolID;
    }
}

export default DetUsuarioRol;