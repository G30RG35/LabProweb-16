import ClaseAlu from "../models/ClaseAlu.js";

const getAllClaseAlumno = async() => {

}

const getOneClaseAlumno = async() => {
    const claseObj = new ClaseAlu();

    
}

const addNewClaseAlumno = async(req, res) => {
    const { clases } = req.body
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
        return res.status(500).json({msg: 'La clase ya existe'})
    }
}

export {
    getAllClaseAlumno, 
    addNewClaseAlumno
}