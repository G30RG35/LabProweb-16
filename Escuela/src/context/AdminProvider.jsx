import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import generatePSWD from "../helpers/generarPassword";

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    // Inicializar alerta
    const [alerta, setAlerta] = useState(null)

    // Informacion de la pagina
    const [users, setUsers] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [clases, setClases] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [salones, setSalones] = useState([]);
    const [escolaridades, setEscolaridades] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [eventos, setEventos] = useState([]);

    // Inputs
    const [ID, setID] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [numero, setNumero] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState(generatePSWD());
    const [direccion, setDireccion] = useState('');
    const [maestros, setMaestros] = useState([]);
    const [alumnosDB, setAlumnosDB] = useState([]);
    
    const navigate = useNavigate()

    useEffect(() => {
        handleGetUsers();
        handleGetPeriodos();
        handleGetGroups();
        handleGetEscolaridades();
        handleGetEventos();
        handleGetSalones()
        handleGetMaterias()
        handleMaestros()
        handleGetClases()
        handleAlumnos()
    }, [])
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const handleGetUsers = async() => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/users`, config );
            setUsers(data.users)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleMaestros = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/rol/usuarios/2`, config);
            setMaestros(data.users);
        } catch (error) {
            console.log(error)
        }
    }

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
            setAlumnosDB(data.users);
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetClases = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clases`, config);
            setClases(data.clases);
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetPeriodos = async() => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/periodos`, config );            
            setPeriodos(data.periodos)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetMaterias = async() => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/materias`, config );   
            setMaterias(data.materias)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleGetGroups = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/grupos`, config );            
            setGrupos(data.grupos)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleGetEscolaridades = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/escolaridades`, config );            
            setEscolaridades(data.escolaridades)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleGetSalones = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/salones`, config );            
            setSalones(data.salones)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetEventos = async() => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_API_URL}/api/eventos`, config );          
            setEventos(data.eventos)
            
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
                periodos,
                setUsers, 
                handleSaveUser, 
                handleFillForm,
                alerta, setAlerta, 
                maestros,
                grupos,
                salones, 
                escolaridades,
                eventos,
                materias,
                clases,
                alumnosDB, 
                
                // Formulario
                ID, setID, 
                nombre, setNombre, 
                apellidos, setApellidos, 
                fechaNac, setFechaNac, 
                numero, setNumero, 
                correo, setCorreo, 
                password, setPassword,
                direccion, setDireccion,


                //Funciones 
                handleGetSalones,
                handleGetEventos,
                handleGetPeriodos,
                handleGetMaterias,
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