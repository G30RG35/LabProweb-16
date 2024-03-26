import generatePSWD from "../helpers/generarPassword.js";
import hashearPassword from "../helpers/hashearPassword.js";
import DetUsuarioRol from "../models/DetUsuarioRol.js";
import User from "../models/User.js";

const getAllUsers = async(req, res) => {
    const userOj = new User();
    const users = await userOj.getUsersInfo(User)

    res.status(200).json({msg: 'Ok', users})
}

const getOneUser = async(req, res) => {
    const { id } = req.params;
    const userOj = new User();
    const user = await userOj.getById(User, id);

    res.status(200).json({msg: 'Ok', user})
}

const addNewUser = async(req, res) => { 
    let { users, user, tipo } = req.body;

    if(user) {
        const userOj = new User(user)
        userOj.password = await hashearPassword(userOj.password)

        const response = await userOj.saveItem(User, userOj)

        if(response) {
            return res.status(200).json({msg: response})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }

    if(users) {
        const user = new User()
        const userRol = new DetUsuarioRol()
        let usersNew = []

        for(let i = 0; i < users.length; i++) {
            const userNew = new User(users[i])
            userNew.password = await hashearPassword(userNew.password)
            usersNew[i] = userNew
        }

        const response = await user.createManyItems(User, usersNew, user)

        const userRolArray = []

        for(let i=response.res[0].insertId;i<(users.length+response.res[0].insertId);i++) {
            const user = {
                usuarioID : i, 
                rolID : tipo
            }

            const detUserRol = new DetUsuarioRol(user)
            userRolArray[i-response.res[0].insertId] = detUserRol
        }

        await userRol.createManyItems(DetUsuarioRol, userRolArray, userRol)

        if(response) {
            return res.status(200).json({msg: response.msg})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }    
}

const updateUser = async(req, res) => {
    const { id } = req.params;
    let user = req.body;
    user.ID = +id;
    user = new User(user)

    const response = await user.saveItem(User, user)

    if(response) {
        return res.status(200).json({msg: response})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

export {
    getAllUsers,
    getOneUser,
    addNewUser,
    updateUser
}