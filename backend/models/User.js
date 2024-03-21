import ActiveRecord from "./ActiveRecord.js";

class User extends ActiveRecord {
    static tableName = 'user'

    static alertaExito = 'Usuario Creado Correctamente'

    constructor(user) {
        super();
        this.ID = user?.ID;
        this.nombre = user?.nombre ?? '';
        this.apellidos = user?.apellidos ?? '';
        this.fechaNac = user?.fechaNac ?? null;
        this.correo = user?.correo ?? '';
        this.numero = user?.numero ?? '';
        this.password = user?.password ?? '';
        this.direccion = user?.direccion ?? '';
        this.activo = user?.activo ?? true;
    }
}


export default User