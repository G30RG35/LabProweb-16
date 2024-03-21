import Periodo from "../models/Periodo.js";

const getAllPeriodos = async(req, res) => {
    const periodoObj = new Periodo()
    const periodos = await periodoObj.getAllItems(Periodo);
    res.status(201).json({msg: 'Ok', status: 201, periodos})
}

const getOnePeriodo = async(req, res) => {
    const { id } = req.params;
    const periodoObj = new Periodo();
    const periodo = await periodoObj.getById(Periodo, id);

    res.status(201).json({msg: "Ok", status: 201, periodo});
}

const addNewPeriodo = async(req, res) => {
    const { periodo } = req.body;
    console.log(periodo)

    const periodoObj = new Periodo(periodo);

    console.log(periodo)
    const response = await periodoObj.saveItem(Periodo, periodo)

    if(response) {
        return res.status(200).json({msg: response})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const updatePeriodo = async(req, res) => {

}

const deletePeriodo = async(req, res) => {
    const { id } = req.params;
    
    // Busqueda de todo lo relacionado con el periodo
    /** ALEJANDRO QUE NO SE TE OLVIDE HACER ESTO
     *  PERO PRIMERO TIENES QUE TERMINAR EL CRUD DE GRUPO Y CLASE
     */
}

export {
    getAllPeriodos, 
    getOnePeriodo,
    addNewPeriodo,
    updatePeriodo,
    deletePeriodo
}