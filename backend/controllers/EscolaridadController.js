import Escolaridad from "../models/Escolaridad.js"

const getAllEscolaridades = async(req, res) => {
    const escolaridadObj = new Escolaridad();

    const escolaridades = await escolaridadObj.getAllItems(Escolaridad);

    if(escolaridades) {
        res.status(201).json({msg: 'Ok', status: 201, escolaridades});
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const getOneEscolaridad = async(req, res) => {

}

const addNewEscolaridad = async(req, res) => {
    const { escolaridad } = req.body;

    const escolaridadObj = new Escolaridad(escolaridad);
    const response = await escolaridadObj.createItem(Escolaridad, escolaridadObj);

    if(response) {
        return res.status(201).json({msg: response.msg})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const updateEscolaridad = async(req, res) => {
    const { id } = req.params;
    const { escolaridad } = req.body;

    const escolaridadObj = new Escolaridad();
    const oldEscolaridad = await escolaridadObj.getById(Escolaridad, +id);

    escolaridadObj.ID = +id;
    escolaridadObj.nombre = escolaridad?.nombre ?? oldEscolaridad.nombre;
    escolaridadObj.duracion = escolaridad?.duracion ?? oldEscolaridad.duracion;

    const response = await escolaridadObj.saveItem(Escolaridad, escolaridadObj);

    if(response) {
        return res.status(200).json({msg: response.msg})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const deleteEscolaridad = async(req, res) => {

}

export {
    getAllEscolaridades, 
    getOneEscolaridad, 
    addNewEscolaridad, 
    updateEscolaridad, 
    deleteEscolaridad
}