import checkElementoExiste from "../helpers/checkElementoExiste.js";
import Clase from "../models/Clase.js";
import ClaseInfo from "../models/ClaseInfo.js";
import Grupo from "../models/Grupo.js";
import Materia from "../models/Materia.js";
import User from "../models/User.js";

const getAllClases = async(req, res) => {
    const claseObj = new ClaseInfo();

    const clases = await claseObj.getClaseAllInfo(Clase);

    if(clases) {
        res.status(201).json({msg: 'Ok', status: 201, clases});
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const getOneClase = async(req, res) => {
    const { grupoID, materiaID, usuarioID } = req.params;

    const claseObj = new ClaseInfo({ "grupoID" : grupoID, "materiaID" : materiaID, "usuarioID" : usuarioID })
    const claseAlu = await claseObj.getClaseAlumnosInfo({ "grupoID" : grupoID, "materiaID" : materiaID, "maestroID" : usuarioID })

    const clase = await claseObj.getClaseOneInfo(claseObj)

    for(let i=0; i < claseAlu.length; i++) {
        claseAlu[i].upload = true
    }

    clase[0].alumnos = claseAlu;

    if(clase) {
        return res.status(201).json({msg: "Ok", clase : clase[0]})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

const addNewClase = async(req, res) => {
    const { clase, clases } = req.body;

    if(clase) {
        const claseObj = new Clase(clase);
        const userObj = new User()

        const user = await userObj.getUserInfo(+claseObj.usuarioID);

        if(!await checkElementoExiste(new Grupo(), Grupo, 'ID', claseObj.grupoID)) {
            const error = new Error('El grupo no existe')
            return res.status(500).json({msg: error.message})
        }

        if(!await checkElementoExiste(new Materia(), Materia, 'ID', claseObj.materiaID)) {
            const error = new Error('La materia no existe')
            return res.status(500).json({msg: error.message})
        }

        if(user?.roles?.map(rol => rol === '2' ? true : undefined).includes(true)) {
            const response = await claseObj.saveClase(claseObj);

            if(response) {
                return res.status(201).json({msg: response.msg})
            } else {
                const error = new Error('La clase ya existe')
                return res.status(500).json({msg: error.message})
            }
        } else {
            const error = new Error('El usuario no es maestro')
            return res.status(500).json({msg: error.message})
        }
    }
}

export {
    getAllClases, 
    getOneClase, 
    addNewClase
}