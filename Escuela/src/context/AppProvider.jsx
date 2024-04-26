import { useState, useEffect, createContext } from "react";
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [alerta, setAlerta] = useState(null)

    useEffect(() => {
        setAlerta(null)
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

    return (
        <AppContext.Provider
            value={{
                handleLogin, 
                alerta, 
                setAlerta
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