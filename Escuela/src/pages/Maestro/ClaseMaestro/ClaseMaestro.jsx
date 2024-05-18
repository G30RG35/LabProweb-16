import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ClaseAlumnoTable from "../../../Componentes/ClaseAlumnoTable/ClaseAlumnoTable"
import useAdmin from "../../../hooks/useAdmin"

const ClaseMaestro = () => {
    const [alumnos, setAlumnos] = useState(null)
    const { grupoID, materiaID, usuarioID } = useParams();
    const { alerta } = useAdmin()

    const handleGetClaseAlumno = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clases/${grupoID}/${materiaID}/${usuarioID}`, config)
            setAlumnos(data.clase.alumnos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetClaseAlumno()
    }, [])

    return (
        <div className='container my-5'>
            <h1>Información de la clase</h1>

            {alerta && (
                <p className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} text-uppercase fw-medium`}>{alerta.msg}</p>
            )}

            <ClaseAlumnoTable 
                users={alumnos}
                setAlumnos={setAlumnos}
            />
        </div>
    )
}

export default ClaseMaestro