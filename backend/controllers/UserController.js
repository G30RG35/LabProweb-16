import { Console } from "console";
import formatearFecha from "../helpers/formatearFecha.js";
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
    const user = await userOj.getUserInfo(id);

    console.log(user)

    res.status(200).json({msg: 'Ok', user})
}

const addNewUser = async(req, res) => { 
    let { users, user, tipo = 1 } = req.body;

    if(user) {
        const userOj = new User(user)
        userOj.password = await hashearPassword(userOj.password)

        const response = await userOj.createItem(User, userOj)

        if(response) {
            const userRol = {
                usuarioID : response.res[0].insertId, 
                rolID : tipo
            }

            const detUserRol = new DetUsuarioRol(userRol)

            await detUserRol.createItem(DetUsuarioRol, detUserRol)

            return res.status(200).json({msg: response.msg})
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
    let { user } = req.body;

    const rolObj = new DetUsuarioRol();

    let roles = await rolObj.getByElement(DetUsuarioRol, 'userID', id)

    for(let i = 0; i < roles.length; i++) {
        const existeRol = user.roles.map(rol => {
            return +rol === roles[i].rolID
        })

        if(existeRol.filter(rol => rol).length <= 0) {
            const response = await rolObj.deleteManyItems(DetUsuarioRol, ['userID', 'rolID'], [+id, +roles[i].rolID])

            if(response) {
                roles = roles.filter(rol => rol.rolID !== roles[i].rolID)
                i = i - 1
            } else {
                const error = new Error('Hubo un error')
                return res.status(500).json({msg: error.message})
            }
        }
    }

    if(roles.length > 0) {
        const newRol = roles.map(rol => {
            const checkRol = user.roles.map(userRol => {
                const addUser = async(userNewRol, uID) => {
                    const response = await rolObj.createItem(DetUsuarioRol, { rolID : +userNewRol, userId : +uID })

                    if(!response) {
                        const error = new Error('Hubo un error')
                        return res.status(500).json({msg: error.message})
                    }
                }
                if(rol.rolID !== +userRol) {
                    addUser(userRol, id)
                    
                }
            })
        })
    } else {
        const roles = user.roles.map(rol => {
            return {
                rolID: +rol,
                userID: +id
            }
        })

        const response = await rolObj.createManyItems(DetUsuarioRol, roles, rolObj)

        if(!response) {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }

    user.ID = +id;
    const userObj = new User(user)

    const oldUser = await userObj.getById(User, user.ID)

    if(oldUser.password !== user.password) {
        userObj.password = await hashearPassword(userObj.password)
    }

    userObj.fechaNac = formatearFecha(userObj.fechaNac)
    const response = await userObj.saveItem(User, userObj)

    if(response) {


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

export {
    getAllUsers,
    getOneUser,
    addNewUser,
    updateUser, 
    deleteUser
}