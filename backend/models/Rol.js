import ActiveRecord from "./ActiveRecord";

class Rol extends ActiveRecord {
    static tableName = 'rol';

    constructor(rol) {
        super();
        this.ID = rol?.ID;
        this.nombre = rol?.nombre;
    }
}

export default Rol;