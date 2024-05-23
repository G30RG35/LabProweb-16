import { Console } from "console";
import formatearFecha from "../helpers/formatearFecha.js";
import generatePSWD from "../helpers/generarPassword.js";
import hashearPassword from "../helpers/hashearPassword.js";
import DetUsuarioRol from "../models/DetUsuarioRol.js";
import User from "../models/User.js";
import { emailNewUser, emailUpdateUser } from "../helpers/email.js";
import checkPassword from "../helpers/checkPassword.js";

const getAllUsers = async(req, res) => {
    const userOj = new User();
    const users = await userOj.getUsersInfo(User)

    res.status(200).json({msg: 'Ok', users})
}

const getOneUser = async(req, res) => {
    const { id } = req.params;
    const userOj = new User();
    const user = await userOj.getUserInfo(id);

    res.status(200).json({msg: 'Ok', user})
}

const addNewUser = async(req, res) => { 
    let { users, user, tipo = 1 } = req.body;

    if(user) {
        const userOj = new User(user)

        userOj.password = await hashearPassword(userOj.password)

        const response = await userOj.createItem(User, userOj)

        if(response) {
            await emailNewUser({ 
                email : user.correo, 
                ID : response.res[0].insertId, 
                password : user.password, 
                nombre : user.nombre + " " + user.apellidos 
            })

            const userRol = {
                usuarioID : response.res[0].insertId, 
                rolID : tipo
            }

            const detUserRol = new DetUsuarioRol(userRol)

            await detUserRol.createItem(DetUsuarioRol, detUserRol)

            return res.status(200).json({msg: "Se creo el usuario correctamente"})
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

        for(let i=0; i < users.length; i++) {
            await emailNewUser({ 
                email : users[i].correo, 
                ID : response.res[0].insertId + i, 
                password : users[i].password, 
                nombre : users[i].nombre + " " + users[i].apellidos 
            })
        }

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
            return res.status(200).json({msg: "Se crearon los usuarios correctamente"})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }    
}

const updateUser = async(req, res) => {
    const { id } = req.params;
    let { user } = req.body;

    user.ID = +id;
    const userObj = new User(user)
    let oldUser = await userObj.getByElement(User, "ID", +id);
    oldUser = oldUser[0]

    if(user.password !== "") {
        if(!await checkPassword(oldUser.password, user.password)) {
            userObj.password = await hashearPassword(userObj.password)
        }
    } else {
        userObj.password = oldUser.password
    }


    userObj.fechaNac = formatearFecha(userObj.fechaNac)
    const response = await userObj.saveItem(User, userObj)
    
    if(response) {
        await emailUpdateUser({ 
            email : user.correo, 
            ID : id, 
            password : user.password, 
            nombre : user.nombre + " " + user.apellidos 
        })

        return res.status(200).json({msg: response})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const deleteUser = async(req, res) => {
    const { id } = req.params;

    const userObj = new User();
    const oldUser = await userObj.getById(User, +id)

    oldUser.activo = false 

    oldUser.fechaNac = formatearFecha(oldUser.fechaNac)
    
    const userNew = new User(oldUser)

    const response = await userNew.saveItem(User, userNew)

    if(response) {
        return res.status(200).json({msg: 'Usuario deshabilitado correctamente'})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const recoverUser = async(req, res) => {
    const { id } = req.params;

    const userObj = new User();
    const oldUser = await userObj.getById(User, +id)

    oldUser.activo = true 

    oldUser.fechaNac = formatearFecha(oldUser.fechaNac)
    
    const userNew = new User(oldUser)

    const response = await userNew.saveItem(User, userNew)

    if(response) {
        return res.status(200).json({msg: 'Usuario habilitado correctamente'})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

export {
    getAllUsers,
    getOneUser,
    addNewUser,
    updateUser, 
    deleteUser, 
    recoverUser
}