import ActiveRecord from "./ActiveRecord.js";

class Salon extends ActiveRecord {
    static tableName = 'salon';

    constructor(salon) {
        super();
        this.ID = salon?.ID;
        this.capacidad = salon?.capacidad;
        this.activo = salon?.activo ?? true;
    }
}

export default Salon;