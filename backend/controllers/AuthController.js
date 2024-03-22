import checkPassword from "../helpers/checkPassword.js";
import generarJWT from "../helpers/generarJWT.js";
import User from "../models/User.js";

const auth = async(req, res) => {
    const { ID, password } = req.body;
    const userObj = new User(req.body);

    const user = await userObj.getById(User, userObj.ID);

    if(user.length === 0) {
        const error = new Error("El usuario no esta registrado");
        return res.status(404).json({msg: error.message});
    }

    if(await checkPassword(password, user.password)) {
        const { password, ...userAuth } = user;
        userAuth.token = generarJWT(user.ID)
        
        return res.json(userAuth);
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message})
    }
}

export {
    auth
}