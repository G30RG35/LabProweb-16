import ActiveRecord from './ActiveRecord.js';

class Periodo extends ActiveRecord {
    static tableName = 'periodo';

    constructor(periodo) {
        super();
        this.ID = periodo?.ID;
        this.fechaInicio = periodo?.fechaInicio ?? '';
        this.fechaFin = periodo?.fechaFin ?? '';
    }

    async endPeriodo(id) {
        let query = `
            UPDATE clase AS c
            JOIN grupo AS g ON c.grupoID = g.ID
            JOIN periodo AS p ON p.ID = g.periodoID
            SET active = true
            WHERE p.ID = ${id}
        `

        try {
            await connection.execute(query)
            return true
        } catch (error) {
            console.log(error)
            return
        }
    }
}

export default Periodo  