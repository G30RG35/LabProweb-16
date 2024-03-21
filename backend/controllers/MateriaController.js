import Materia from "../models/Materia.js";

const getAllMaterias = async(req, res) => {
    const materiaObj = new Materia();

    try {
        const materias = await materiaObj.getAllItems(Materia);

        res.status(201).json({msg: 'Ok', status: 201, materias});
    } catch (error) {
        console.log(error)
    }
}

const getOneMateria = async(req, res) => {
    const {id} = req.params;

    const materiaObj = new Materia();
    
    try {
        const materia = await materiaObj.getById(Materia, id);

        res.status(201).json({msg: "Ok", status: 201, materia});
    } catch (error) {
        console.log(error)
    }
}

const addNewMateria = async(req, res) => {
    const { materia, materias } = req.body

    if(materia) {
        const materiaObj = new Materia(materia);

        const response = await materiaObj.saveItem(Materia, materiaObj);

        if(response) {
            return res.status(201).json({msg: response})
        } else {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }

    if(materias) {
        const materiaObj = new Materia();
        const materiasObj = materias?.map(materia => new Materia(materia));

        try {
            const response = await materiaObj.createManyItems(Materia, materiasObj, materiaObj);

            return res.status(200).json({msg: response, status: 200})
        } catch (err) {
            const error = new Error('Hubo un error')
            return res.status(500).json({msg: error.message})
        }
    }
}

const updateMateria = async(req, res) => {
    const { id } = req.params;
    let materia = req.body;
    materia.ID = +id;

    materia = new Materia(materia);

    try {
        const response = await materia.saveItem(Materia, materia);

        return res.status(200).json({msg: response, status: 200})
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllMaterias, 
    getOneMateria,
    addNewMateria,
    updateMateria
}