import User from "../models/User.js";

const getAllUsers = async(req, res) => {
    const userOj = new User();
    const users = await userOj.getAllItems(User)

    res.status(200).json({msg: 'Ok', users})
}

const getOneUser = async(req, res) => {
    const { id } = req.params;
    const userOj = new User();
    const user = await userOj.getById(User, id);

    res.status(200).json({msg: 'Ok', user})
}

const addNewUser = async(req, res) => {
    const userOj = new User(req.body)
    
    const response = await userOj.saveItem(User, userOj)

    if(response) {
        return res.status(200).json({msg: 'Usuario creado correctamente'})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

export {
    getAllUsers,
    getOneUser,
    addNewUser
}