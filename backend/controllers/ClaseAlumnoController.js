import ClaseAlu from "../models/ClaseAlu.js";
import ClaseAluView from "../models/ClaseAluView.js";
import Salon from "../models/Salon.js";

const getAllClaseAlumno = async(req, res) => {
    const clasesAluObj = new ClaseAluView()
    const clasesAlu = await clasesAluObj.getAllItems(ClaseAluView);

    if(clasesAlu) {
        return res.status(201).json({
            status : 201,
            msg : "Ok", 
            clasesAlu
        })
    } else {
        return res.status(500).json({
            status: 500, 
            msg: "Hubo un error al obtener las clases, intentelo más tarde"
        })
    }
}

const getClaseAlumno = async(req, res) => {
    const { usuarioID } = req.params
    const claseObj = new ClaseAluView();
    const clases = await claseObj.getByElement(ClaseAluView, 'usuarioID', +usuarioID)

    if(clases) {
        return res.status(201).json({
            status : 201,
            msg : "Ok", 
            clases
        })
    } else {
        return res.status(500).json({
            status: 500, 
            msg: "Hubo un error al obtener las clases, intentelo más tarde"
        })
    }
}

const addNewClaseAlumno = async(req, res) => {
    const { clases } = req.body

    if(clases) {
        const claseObj = new ClaseAlu();
        const clasesObj = [];

        for(let i=0; i<clases.length; i++) {
            clasesObj[i] = new ClaseAlu(clases[i]) 

            clasesObj[i].calificacion = 0
        }

        const response = await claseObj.createManyItems(ClaseAlu, clasesObj, claseObj);

        if(response) {
            return res.status(201).json({msg: "Se añadieron los alumnos correctamente"})
        } else {
            return res.status(500).json({msg: 'El usuario ya se encuentra en esta clase'})
        }
    }
}

const updateClaseAlumno = async(req, res) => {
    const { grupoID, materiaID, maestroID, usuarioID } = req.params;
    const { claseAlumno } = req.body

    const claseAlumnoObj = new ClaseAlu()
    const response = await claseAlumnoObj.updateGrade(usuarioID, grupoID, materiaID, maestroID, claseAlumno[0].calificacion)

    if(response) {
        return res.status(201).json({msg: "Se actualizo la calificacion correctamente"})
    } else {
        return res.status(500).json({msg: 'La clase ya existe'})
    }
}

const deleteClaseAlumno = async(req, res) => {
    const { grupoID, materiaID, maestroID, usuarioID } = req.params;
    const { claseAlumno } = req.body

    const claseAlumnoObj = new ClaseAlu()
    const query = `DELETE FROM clasealu WHERE usuarioID = ${usuarioID} AND grupoID = ${grupoID} AND maestroID = ${maestroID} AND materiaID = ${materiaID}`;
    const response = await claseAlumnoObj.queryExecute(query)

    if(response) {
        return res.status(201).json({msg: "Se elimino el alumno correctamente"})
    } else {
        return res.status(500).json({msg: 'La clase ya existe'})
    }
}

const getClaseAluMaestro = async(req, res) => {
    const { maestroID } = req.params
    const claseAluObj = new ClaseAluView()
    const clases = await claseAluObj.getByElement(ClaseAluView, "maestroID", maestroID)

    if(clases) {
        return res.status(201).json({
            status : 201,
            msg : "Ok", 
            clases
        })
    } else {
        return res.status(500).json({
            status: 500, 
            msg: "Hubo un error al obtener las clases, intentelo más tarde"
        })
    }
}

export {
    getAllClaseAlumno, 
    addNewClaseAlumno, 
    updateClaseAlumno, 
    getClaseAlumno, 
    getClaseAluMaestro, 
    deleteClaseAlumno
}