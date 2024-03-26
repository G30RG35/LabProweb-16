import { useState, useEffect, createContext } from "react";
import axios from "axios";
import generatePSWD from "../helpers/generarPassword";

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [alerta, setAlerta] = useState({})
    const [users, setUsers] = useState([]);

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
            } else {
                setAlerta({
                    error: false, 
                    msg: 'ERROR'
                }) 
            }
        } catch (error) {
            
        }
    }

    return (
        <AdminContext.Provider
            value={{
                users, 
                setUsers, 
                handleSaveUser
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