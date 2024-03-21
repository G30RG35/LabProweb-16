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
    const { users, user } = req.body;
    
    if(user) {
        const userOj = new User(user)
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
        const usersOj = users.map(user => new User(user))

        const response = await user.createManyItems(User, usersOj, user)

        console.log(response)

        if(response) {
            return res.status(200).json({msg: response})
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