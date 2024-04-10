import Salon from "../models/Salon.js";

const getAllSalon = async(req, res) => {
    const salonObj = new Salon();
    const salones = await salonObj.getAllItems(Salon);

    res.status(201).json({msg: "Ok", status: 201, salones})
} 

const getOneSalon = async(req, res) => {
    const {id} = req.params;
    const salonObj = new Salon();
    const salon = await salonObj.getById(Salon, id);

    res.status(200).json({msg: 'Ok', salon})
}

const addNewSalon = async(req, res) => {
    const { salon } = req.body;

    const salonObj = new Salon(salon);
    const response = await salonObj.createItem(Salon, salonObj);

    if(response) {
        return res.status(200).json({msg: response.msg})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const updateSalon = async(req, res) => {
    const { id } = req.params;
    const { salon } = req.body;

    const salonObj = new Salon()
    const oldSalon = await salonObj.getById(Salon, +id)
    
    salonObj.ID = +id
    salonObj.capacidad = salon?.capacidad ?? oldSalon.capacidad;
    salonObj.activo = salon?.activo ?? oldSalon.activo;

    const response = await salonObj.saveItem(Salon, salonObj);

    if(response) {
        return res.status(200).json({msg: response.msg})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const deleteSalon = async(req, res) => {
    /** VER SI DEBERIAMOS BORRAR LOS SALONES */
}

export {
    getAllSalon, 
    getOneSalon, 
    addNewSalon, 
    updateSalon, 
    deleteSalon
}