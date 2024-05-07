import { useParams } from "react-router-dom";
import useApp from "../../../hooks/useApp";
import { useEffect, useState } from "react";

const CrudClaseAlumno = () => {
    const [clase, setClase] = useState({})
    const [file, setFile] = useState(null)
    const { grupoID, materiaID, userID } = useParams();

    const { handleGetClass } = useApp();

    const getClass = async() => {
        const claseDB = await handleGetClass(grupoID, materiaID, userID);
        setClase(claseDB)
    }

    useEffect(() => {
        getClass()
    }, [])

    console.log(clase)

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
                        <button className="btn btn-primary w-100">+ Guardar</button>
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

                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Matricula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Grupo / Maestro / Materia</th>
                            <th scope="col">Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </form>
        </div>
    )
}

export default CrudClaseAlumno