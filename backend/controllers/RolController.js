import User from "../models/User.js"

const getAllRol = async() => {

}

const getOneRol = async() => {

}

const addNewRol = async() => {

}

const updateRol = async() => {

}

const deleteRol = async() => {

}

const getUsers = async(req, res) => {
    const userObj = new User();

    const users = await userObj.getUsersInfoByRol(req.params.rolID)
    res.status(200).json({msg: 'Ok', users})
}

export {
    getAllRol, 
    getOneRol, 
    addNewRol, 
    updateRol, 
    deleteRol, 
    getUsers
}