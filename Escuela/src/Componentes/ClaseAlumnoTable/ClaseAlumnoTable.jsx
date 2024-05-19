import axios from "axios"
import useAdmin from "../../hooks/useAdmin"

const ClaseAlumnoTable = ({ users, infoExcel = [], setAlumnos }) => {
    const { setAlerta } = useAdmin()

    const handleChangeGrade = (userId, grade) => {
        const newArray = users.map(info => {
            if(info.usuarioID === +userId) {
                info.calificacion = grade
            }
            return info
        })

        setAlumnos(newArray)
    }

    const handleSaveUserGrade = async(userId) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        const user = users.filter(info => info.usuarioID === +userId)
        
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

    return (
        <table className="table table-hover">
            <thead className="table-secondary border">
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
                        <td>
                            {!user?.upload ? 'No activo' : (
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
                            )}
                        </td>
                    </tr>
                ))}
                {users?.map(user => (
                    <tr key={user.usuarioID} className={`${!user.upload && 'table-secondary'}`}>
                        <td>{user.usuarioID}</td>
                        <td>{user.nombre}</td>
                        <td>{user.grupoID + "" + user.maestroID + "" + user.materiaID}</td>
                        <td><input type="number" value={user.calificacion} onChange={e => handleChangeGrade(user.usuarioID, e.target.value)} className="form-control form-control-sm" /></td>
                        <td>
                            {!user?.upload ? 'No activo' : (
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
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ClaseAlumnoTable