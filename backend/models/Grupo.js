import ActiveRecord from "./ActiveRecord.js";

class Grupo extends ActiveRecord {
    static tableName = 'grupo';

    constructor(grupo) {
        super();
        this.ID = grupo?.ID;
        this.salonID = grupo?.salonID;
        this.periodoID = grupo?.periodoID;
        this.escolaridadID = grupo?.escolaridadID;
    }
}

export default Grupo;