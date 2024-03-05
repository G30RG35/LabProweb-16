import ActiveRecord from "./ActiveRecord.js";

class User extends ActiveRecord {
    static tableName = 'user'

    constructor(user) {
        super();
        this.id = user?.id
        this.nombre = user?.nombre;
        this.apellido = user?.apellido;
        this.correo = user?.correo;
        this.numero = user?.numero;
        this.direccion = user?.direccion
    }
}


export default User