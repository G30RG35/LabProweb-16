import Salon from "../models/Salon.js";

const getAllSalon = async(req, res) => {
    const salonObj = new Salon();
    const salones = await salonObj.getAllItems(Salon);

    res.status(201).json({msg: "Ok", status: 201, salones})
} 

const getOneSalon = async(req, res) => {

}

const addNewSalon = async(req, res) => {

}

const updateSalon = async(req, res) => {

}

const deleteSalon = async(req, res) => {

}

export {
    getAllSalon, 
    getOneSalon, 
    addNewSalon, 
    updateSalon, 
    deleteSalon
}