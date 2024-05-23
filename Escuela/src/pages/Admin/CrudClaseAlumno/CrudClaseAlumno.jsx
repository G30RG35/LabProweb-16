import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import * as XLSX from 'xlsx/xlsx.mjs';
import ClaseAlumnoTable from "../../../Componentes/ClaseAlumnoTable/ClaseAlumnoTable";

const CrudClaseAlumno = () => {
    const [clase, setClase] = useState({})
    const [file, setFile] = useState(null)
    const [usuarioID, setUsuarioID] = useState(0)
    const [alumnos, setAlumnos] = useState(null)
    const [infoExcel, setInfoExcel] = useState([])
    const { grupoID, materiaID, userID } = useParams();

    const { alerta, setAlerta, alumnosDB, clases } = useAdmin();

    const addUserArray = () => {
        const alumno = alumnosDB?.filter(alumnoNew => alumnoNew.ID === +usuarioID)

        setInfoExcel([
            ...infoExcel, 
            { 
                usuarioID : `${alumno[0].ID}`,
                grupoID : +grupoID,
                materiaID : +materiaID,
                maestroID : +userID,
                calificacion : 0,
                nombre : `${alumno[0].nombre + " " + alumno[0].apellidos}`,
                upload : false
            }
        ])

        setUsuarioID(0)
    }

    const excelToJson = async() => {
        const reader = new FileReader()

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const jData = []

            for(let i=0;i<sheetData.length;i++) {
                const dato = sheetData[i]
                jData.push(
                    { 
                        usuarioID : `${dato.Matricula}`,
                        grupoID : +grupoID,
                        materiaID : +materiaID,
                        maestroID : +userID,
                        calificacion : 0,
                        nombre : `${dato.Nombre + " " + dato.Apellidos}`,
                        upload : false
                    }
                )
            }

            setInfoExcel(jData)
        }

        reader.readAsArrayBuffer(file);
    }

    const handleSaveUserClass = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/clasesAlumnos`, {
                clases : infoExcel
            }, config)

            for(let i=0; i < infoExcel.length; i++) {
                infoExcel[i].upload = true
            }

            handleGetClaseAlumno()

            setInfoExcel([])

            setTimeout(() => {
                setAlerta(null)
            }, 3000)

            setAlerta({
                error: false, 
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                error : true, 
                msg : error.response.data.msg
            })

            setInfoExcel([])

            setTimeout(() => {
                setAlerta(null)
            }, 3000)
        }
    }

    const handleGetClaseAlumno = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clases/${grupoID}/${materiaID}/${userID}`, config)
            setAlumnos(data.clase.alumnos)
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(() => {
        handleGetClaseAlumno()
    }, [])

    useEffect(() => {
        const claseNew = clases?.filter(clase => clase?.grupoID === +grupoID && clase?.materiaID === +materiaID && clase?.usuarioID === +userID)
        if(claseNew.length > 0) {
            setClase(claseNew[0])
        }
    }, [clases])

    useEffect(() => {
        if(file) {
            excelToJson()
        }
    }, [file])

    return (
        <div className="container my-5">
           <h1>Asignación de alumnos</h1> 

           <form className="bg-secondary text-light p-4 rounded-3 shadow">
                <div className="row">
                    <div className="col-sm-8">
                        <h3>Subir alumnos</h3>
                        <p className="m-0 fw-bold">Materia: <span className="fw-normal">{clase.materia}</span></p>
                        <p className="m-0 fw-bold">Grupo: <span className="fw-normal">{clase.grupoID}</span></p>
                        <p className="m-0 fw-bold">Docente: <span className="fw-normal">{clase.maestro}</span></p>
                    </div>

                    <div className="col-sm-4">
                        <button 
                            type="button"
                            onClick={() => handleSaveUserClass()}
                            className="btn btn-primary w-100"
                            disabled={infoExcel.length === 0}
                        >+ Guardar</button>
                    </div>

                    <div className="col-md-6">
                        <h5>Subir Excel</h5>
                        <div id='drop-area'>
                            <label className="form-label" htmlFor="customFile">{file ? file.name : 'Selecciona un archivo excel'}</label>
                            <input type="file" onChange={e => setFile(e.target.files[0])} className="form-control w-100 h-100" id="customFile" accept='.xlsx, .xls' hidden />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="alumno">Seleccionar Alumno</label>
                        <select value={usuarioID} onChange={e => setUsuarioID(e.target.value)} id="alumno" className="form-select">
                            <option value="0">Seleccione un alumno</option>
                            {alumnosDB?.map(alumno => (
                                <option value={alumno.ID} key={alumno.ID}>
                                    {alumno.ID} - {alumno.nombre + " " + alumno.apellidos}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={() => addUserArray()} className="btn btn-sm btn-dark w-100 mt-2">Agregar Alumno</button>
                    </div>
                </div>

                {alerta && (
                    <p className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} text-uppercase fw-medium`}>{alerta.msg}</p>
                )}

                <div>
                    <ClaseAlumnoTable 
                        users={alumnos}
                        infoExcel={infoExcel}
                        setAlumnos={setAlumnos}
                    />
                </div>
           </form>
        </div>
    )
}

export default CrudClaseAlumno