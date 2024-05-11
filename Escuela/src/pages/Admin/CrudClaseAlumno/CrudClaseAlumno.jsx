import { useParams } from "react-router-dom";
import useApp from "../../../hooks/useApp";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import axios from "axios";
import useAdmin from "../../../hooks/useAdmin";

const CrudClaseAlumno = () => {
    const [clase, setClase] = useState({})
    const [file, setFile] = useState(null)
    const [infoExel, setInfoExcel] = useState([])
    const { grupoID, materiaID, userID } = useParams();

    const { handleGetClass } = useApp();
    const { alerta, setAlerta } = useAdmin();

    const getClass = async() => {
        const claseDB = await handleGetClass(grupoID, materiaID, userID);
    }

    useEffect(() => {
        getClass()
    }, [])

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
                        grupoID : `${dato.Grupo}`,
                        materiaID : `${dato.MateriaID}`,
                        maestroID : `${dato.MaestroID}`,
                        calificacion : `${dato.Calificacion}`,
                        nombre : `${dato.Nombre + " " + dato.Apellidos}`,
                        upload : false
                    }
                )
            }

            setInfoExcel(jData)
        }

        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        if(file) {
            excelToJson()
        }
    }, [file])

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
                clases : infoExel
            }, config)

            for(let i=0; i < infoExel.length; i++) {
                infoExel[i].upload = true
            }

            setAlerta({
                error: false, 
                msg: data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                            disabled={infoExel.length === 0}
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
                        <select id="alumno" className="form-select">
                            <option value="0">Seleccione un alumno</option>
                        </select>
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
                            {infoExel?.map(user => (
                                <tr className={`${!user.upload && 'table-secondary'}`}>
                                    <td>{user.usuarioID}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.grupoID + "" + user.maestroID + "" + user.materiaID}</td>
                                    <td>{user?.calificacion !== "undefined" ? user.calificacion : "Aún no calificado"}</td>
                                    <td className="d-flex justify-content-around">{!user?.upload ? 'No activo' : (
                                        <>
                                            <button className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-primary">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>

                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgImage text-danger">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </>
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