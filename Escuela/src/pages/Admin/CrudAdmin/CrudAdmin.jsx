import { useState, useEffect } from 'react';
import styles from './CrudAdmin.module.css';
import useAdmin from '../../../hooks/useAdmin';
import FormularioUser from '../../../Componentes/FormularioAlumnos/FormularioUser';
import axios from 'axios';

const CrudAdmin = () => {
    const [usersFiltered, setUsersFiltered] = useState([])
    const [usersDeleted, setUsersDeleted] = useState([])
    const [admin, setAdmin] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { handleFillForm, users, handleDeleteUser, handleRecoverUser } = useAdmin();

    const handleAdmin = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/rol/usuarios/3`, config);

            setAdmin(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleAdmin();
    }, [])

    useEffect(() => {
        handleAdmin();
    }, [users])

    useEffect(() => {
        setUsersFiltered(admin)

        const deleted = admin.filter(user => user.activo === 0)
        setUsersDeleted(deleted)
    }, [admin])

    useEffect(() => {
        const filtered = admin?.filter(user => {
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
                    <h1>Listado de Administradores</h1>
                    <div className="row">
                        <div className="col-11">
                            <input 
                                type="search" 
                                id="search" 
                                placeholder='Buscar Administrador' 
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
                        {usersFiltered?.map(user => user.activo === 1 && (
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

                                    <button onClick={() => handleDeleteUser(user.ID)} className='deteleBtn'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {usersDeleted?.length > 0 && (
                            <>
                                <h2>Usuarios eliminados</h2>
                                {usersDeleted?.map(user => (
                                    <div key={user.ID} className='userContainer w-100 h-auto shadow-sm rounded'>
                                        <h2>ID: {user.ID}</h2>
                                        <div>
                                            <p>{user.apellidos + ' ' + user.nombre}</p>
                                        </div>

                                        <div 
                                            className='btnFormContainer'
                                        >
                                            <button 
                                                onClick={() => handleRecoverUser(user.ID)}
                                                className='deteleBtn bg-success'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className="col-lg-6 order-first order-lg-last">
                    <FormularioUser 
                        tipo={3}
                    />
                </div>
            </div>
        </div>
    )
}

export default CrudAdmin