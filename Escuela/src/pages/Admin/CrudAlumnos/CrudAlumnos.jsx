import { useState, useEffect } from 'react';
import styles from './CrudAlumnos.module.css';
import useAdmin from '../../../hooks/useAdmin';
import FormularioAlumnos from '../../../Componentes/FormularioAlumnos/FormularioAlumnos';

const CrudAlumnos = () => {
    const [alumnos, setAlumnos] = useState([])
    const { users, setUsers } = useAdmin();

    useEffect(() => {

    }, [users])

    return (
        <div className='container my-5'>
            <div className='row gy-2'>
                <div className='col-lg-6'>
                    <h1>Listado de Alumnos</h1>
                    <div className="row">
                        <div className="col-11">
                            <input type="search" id="search" placeholder='Buscar Alumno' className={`w-100 ${styles.searchInput}`} />
                        </div>
                        <button className={`col-1 ${styles.btnSearch}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>

                    <div>
                        {users?.map(user => (
                            <div key={user.ID}>
                                <button>
                                    <h2>ID: {user.ID}</h2>
                                    <p>{user.nombre + ' ' + user.apellidos}</p>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-6 order-first order-lg-last">
                    <FormularioAlumnos />
                </div>
            </div>
        </div>
    )
}

export default CrudAlumnos