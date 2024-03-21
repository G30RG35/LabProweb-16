import ActiveRecord from './ActiveRecord.js';

class Periodo extends ActiveRecord {
    static tableName = 'periodo';

    constructor(periodo) {
        super();
        this.ID = periodo?.ID;
        this.fechaInicio = periodo?.fechaInicio ?? '';
        this.fechaFin = periodo?.fechaFin ?? '';
    }
}

export default Periodo  