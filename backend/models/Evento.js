import ActiveRecord from "./ActiveRecord.js";

class Evento extends ActiveRecord {
    static tableName = 'evento';

    constructor(evento) {
        super();
        this.ID = evento?.ID;
        this.titulo = evento?.titulo;
        this.descripcion = evento?.descripcion;
        this.fecha = evento?.fecha;
        this.hora = evento?.hora;
        this.escolaridadID = evento?.escolaridadID;
        this.imageUrl = evento?.imageUrl;
    }
}

export default Evento;