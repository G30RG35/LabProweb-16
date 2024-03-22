import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async(req, res, next) => {
    const userObj = new User()
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await userObj.getById(User, decoded.id)
            const { password, ...userAuth } = user;

            req.user = userAuth;
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msg: "Hubo un error" })
        }
    }

    if(!token) {
        const error = new Error("Token no valido")
        return res.status(401).json({msg: error.message})
    }

    next()
}

export default checkAuth