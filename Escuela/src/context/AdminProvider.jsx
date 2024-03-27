import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import generatePSWD from "../helpers/generarPassword";

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [alerta, setAlerta] = useState(null)
    const [users, setUsers] = useState([]);
    const [ID, setID] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [numero, setNumero] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState(generatePSWD());
    const [direccion, setDireccion] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        handleGetUsers()
    }, [])

    const handleGetUsers = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/users`, config );
            setUsers(data.users)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveUser = async(tipo, items) => {
        if(ID) {
            handleUpdateUser(tipo, items[0])
        } else {
            handleAddNewUser(tipo, items)
        }
    }

    const handleAddNewUser = async(tipo, items) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            if(items.length === 1) {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                    user: items[0], tipo
                }, config)

                setAlerta({
                    error: false, 
                    msg: data.msg
                })
            } else if(items.length >= 2) {
                const itemsNew = items?.map(user => {
                    user.password = generatePSWD()
                    return user
                })

                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                    users: itemsNew, tipo
                }, config)

                setAlerta({
                    error: false, 
                    msg: data.msg
                })

                navigate(0)
            } else {
                setAlerta({
                    error: false, 
                    msg: 'ERROR'
                }) 
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateUser = async(tipo, item) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const user = {
            ID, 
            ...item
        }
        
        try {
            const { data } = await axios.put( `${import.meta.env.VITE_API_URL}/api/users/${user.ID}`, {
                user
            }, config);
            
            setAlerta({
                error: false, 
                msg: data.msg
            })
        } catch (error) {
            
        }
    }

    const handleFillForm = (user) => {
        setID(user.ID)
        setNombre(user.nombre)
        setApellidos(user.apellidos)

        const fecha = new Date(user.fechaNac)
        let mes = fecha.getMonth()+1;
        let dia = fecha.getDate();
        let ano = fecha.getFullYear();

        if(dia<10) {
            dia='0'+dia;
        }
        if(mes<10) {
            mes='0'+mes;
        }
        setFechaNac(ano+"-"+mes+"-"+dia)
        setNumero(user.numero)
        setCorreo(user.correo)
        setDireccion(user.direccion)
        setPassword(user.password)
    }

    return (
        <AdminContext.Provider
            value={{
                users, 
                setUsers, 
                handleSaveUser, 
                handleFillForm,
                alerta, setAlerta, 

                // Formulario
                ID, setID, 
                nombre, setNombre, 
                apellidos, setApellidos, 
                fechaNac, setFechaNac, 
                numero, setNumero, 
                correo, setCorreo, 
                password, setPassword,
                direccion, setDireccion
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export {
    AdminProvider
}

export default AdminContext;