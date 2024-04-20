import { useState, useEffect } from 'react';
import styles from './CrudAlumnos.module.css';
import useAdmin from '../../../hooks/useAdmin';
import FormularioUser from '../../../Componentes/FormularioAlumnos/FormularioUser';
import axios from 'axios';

const CrudAlumnos = () => {
    const [alumnos, setAlumnos] = useState([])
    const [usersFiltered, setUsersFiltered] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { users, setUsers, handleFillForm } = useAdmin();

    const handleAlumnos = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/rol/usuarios/1`, config);
            setAlumnos(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleAlumnos();
    }, [])

    useEffect(() => {
        setUsersFiltered(alumnos)
    }, [alumnos])

    useEffect(() => {
        const filtered = alumnos?.filter(user => {
            const idMatch = user.ID.toString().includes(searchTerm);
            const nameMatch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
            const lastNameMatch = user.apellidos.toLowerCase().includes(searchTerm.toLowerCase());
            return idMatch || nameMatch || lastNameMatch;
        });

        setUsersFiltered(filtered)
    }, [searchTerm])

    return (
        <div className='container my-5'>
            <div className='row gy-2'>
                <div className='col-lg-6 overflow-hidden'>
                    <h1>Listado de Alumnos</h1>
                    <div className="row">
                        <div className="col-11">
                            <input 
                                type="search" 
                                id="search" 
                                placeholder='Buscar Alumno' 
                                className={`w-100 ${styles.searchInput}`} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
                        <button className={`col-1 ${styles.btnSearch}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>

                    <div className='listadoUsers overflow-auto scrollContainer'>
                        {usersFiltered?.map(user => (
                            <div key={user.ID} className='userContainer w-100 h-auto shadow-sm rounded'>
                                <h2>ID: {user.ID}</h2>
                                <div>
                                    <p>{user.apellidos + ' ' + user.nombre}</p>
                                </div>

                                <div 
                                    className='btnFormContainer'
                                    onClick={() => handleFillForm(user)}
                                >
                                    <button className='editBtn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>

                                    <button className='deteleBtn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-6 order-first order-lg-last">
                    <FormularioUser 
                        tipo={1}
                    />
                </div>
            </div>
        </div>
    )
}

export default CrudAlumnos