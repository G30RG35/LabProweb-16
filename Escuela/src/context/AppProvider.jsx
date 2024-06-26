import { useState, useEffect, createContext } from "react";
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [alerta, setAlerta] = useState(null)
    const [eventos, setEventos] = useState([])
    const [escolaridades, setEscolaridades] = useState([]);
    const [salones, setSalones] = useState([]);
    const [clasesView, setClasesView] = useState([])
    
    useEffect(() => {
        setAlerta(null)
        handleGetEventos()
        handleGetEscolaridades()
        handleGetGroups()
        handleGetSalones()
    }, [])

    const handleLogin = async(ID, password, remember) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth`, {
                ID, password
            })

            localStorage.setItem('token', data.token);

            setAlerta(null)
            return data;
        } catch (error) {
            console.error(error)
            setAlerta({
                msg: error?.response?.data?.msg, 
                error: true
            })
        }
    }

    const handleGetClass = async(grupoID, materiaID, usuarioID) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        } 

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clases/${grupoID}/${materiaID}/${usuarioID}`, config)

            return data.clase[0]
        } catch (error) {
            console.error(error)
            setAlerta({
                msg: error?.response?.data?.msg, 
                error: true
            })
        }
    }

    const handleGetEventos = async() => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/eventos`)

            setEventos(data.eventos.reverse())
        } catch (error) {
            setAlerta({
                msg: error?.response?.data?.msg, 
                error: true
            })
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
    const [grupos, setGrupos] = useState([])

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

    const handleSendEmail = async(nombre, apellidos, email, numero, mensaje) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/contacto/info`, {
                emailInfo : {nombre, apellidos, email, numero, mensaje}
            } );            
            setAlerta({
                error : false, 
                msg : data.msg
            })
        } catch (error) {
            setAlerta({
                error : true, 
                msg : error.response.data.msg
            })
        }
    }

    return (
        <AppContext.Provider
            value={{
                handleLogin, 
                alerta, 
                setAlerta, 
                handleGetClass, 
                eventos, 
                escolaridades,
                grupos,
                salones,
                clasesView,
                handleSendEmail
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider
}

export default AppContext;