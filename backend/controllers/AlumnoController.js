import Alumno from "../models/Student.js"

const getAllStudents = async(req, res) => {
    const AlumnoOj = new Alumno()
    const alumnos = await AlumnoOj.getAllItems(Alumno)

    res.status(200).json({msg: 'Ok', alumnos})
}

const getOneStudent = async(req, res) => {
    const { id } = req.params;

    const AlumnoOj = new Alumno()
    const alumno = await AlumnoOj.getById(Alumno, id);

    res.status(200).json({msg: 'Ok', alumno})
}

const addNewStudent = async(req, res) => {
    const AlumnoOj = new Alumno(req.body)
    
    const response = await AlumnoOj.saveItem(Alumno, AlumnoOj)

    if(response) {
        return res.status(200).json({msg: 'Alumno creado correctamente'})
    } else {
        const error = new Error('Hubo un error')
        return res.status(500).json({msg: error.message})
    }
}

export {
    getAllStudents,
    getOneStudent,
    addNewStudent
}