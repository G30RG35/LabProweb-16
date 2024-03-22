import ActiveRecord from "./ActiveRecord.js";
import createConnection from "../config/DB.js";

const connetion = await createConnection()

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

    async getUserInfo(id) {
        const [results, fields] = await connetion.execute(`
            select u.*, r.nombre as rol from user as u
            inner join detUsuarioRol as dur on u.ID = dur.userID
            inner join rol as r on r.ID = dur.rolID
            where u.ID = ${id}
        `)

        return results[0]
    }
}


export default User