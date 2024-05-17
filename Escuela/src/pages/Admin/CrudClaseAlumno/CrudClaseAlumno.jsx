import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import * as XLSX from 'xlsx/xlsx.mjs';

const CrudClaseAlumno = () => {
    const [clase, setClase] = useState({})
    const [file, setFile] = useState(null)
    const [usuarioID, setUsuarioID] = useState(0)
    const [alumnos, setAlumnos] = useState(null)
    const [infoExcel, setInfoExcel] = useState([])
    const { grupoID, materiaID, userID } = useParams();

    const { alerta, setAlerta, alumnosDB, clases } = useAdmin();

    const handleChangeGrade = (userId, grade) => {
        const newArray = alumnos.map(info => {
            if(info.usuarioID === +userId) {
                info.calificacion = grade
            }
            return info
        })

        setAlumnos(newArray)
    }

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

            setAlumnos([
                ...alumnos, 
                ...infoExcel
            ])

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

    const handleSaveUserGrade = async(userId) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        const user = alumnos.filter(info => info.usuarioID === +userId)
        
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/clasesAlumnos/${user[0].grupoID}/${user[0].materiaID}/${user[0].maestroID}/${user[0].usuarioID}`, { claseAlumno : user }, config)
            setAlerta({
                error : false, 
                msg : data.msg
            })
            setTimeout(() => {
                setAlerta(null)
            }, 2000)
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
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Matricula</th>
                                <th>Nombre</th>
                                <th>Grupo / Maestro / Materia</th>
                                <th>Calificación</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoExcel?.map(user => (
                                <tr key={user.usuarioID} className={`${!user.upload && 'table-secondary'}`}>
                                    <td>{user.usuarioID}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.grupoID + "" + user.maestroID + "" + user.materiaID}</td>
                                    <td>No calificado</td>
                                    <td>{!user?.upload ? 'No activo' : (
                                        <div className="d-flex justify-content-around w-100">
                                            <button
                                                type="button"
                                                onClick={() => handleSaveUserGrade(user.usuarioID)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-primary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                                </svg>
                                            </button>

                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-danger">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}</td>
                                </tr>
                            ))}
                            {alumnos?.map(user => (
                                <tr key={user.usuarioID} className={`${!user.upload && 'table-secondary'}`}>
                                    <td>{user.usuarioID}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.grupoID + "" + user.maestroID + "" + user.materiaID}</td>
                                    <td><input type="number" value={user.calificacion} onChange={e => handleChangeGrade(user.usuarioID, e.target.value)} className="form-control form-control-sm" /></td>
                                    <td>{!user?.upload ? 'No activo' : (
                                        <div className="d-flex justify-content-around w-100">
                                            <button
                                                type="button"
                                                onClick={() => handleSaveUserGrade(user.usuarioID)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-primary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                                </svg>
                                            </button>

                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-danger">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
           </form>
        </div>
    )
}

export default CrudClaseAlumno