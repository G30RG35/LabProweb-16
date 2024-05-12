import React, { useEffect, useState } from "react";
import axios from "axios";
import useAdmin from "../../hooks/useApp";

export const Perfil = () => {
    const id = 1; // Deberías obtener este ID de algún lado, en lugar de definirlo aquí directamente
    const [dataUser, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [user, setEditedUser] = useState({});
    const { setAlerta } = useAdmin();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`, config);
            setUser(data.user);
            setEditedUser(data.user);
            setAlerta({
                error: false,
                msg: data.msg
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        setEditedUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(dataUser);
    };
    const handleSave = async () => {
        const token = localStorage.getItem('token');
    
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
    
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, user, config);
            setUser(user);
            setAlerta({
                error: false,
                msg: data.msg
            });
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };
    

    const formatDate = (dateString) => {
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="container">
                <h1>Perfil</h1>
                <div className="row">
                    <div className="col">
                        <h2>Bienvenido {dataUser.nombre + " " + dataUser.apellidos}</h2>
                        <p>{"Numero de usuario: " + dataUser.ID}</p>
                        <p>{"Nombre: " + dataUser.nombre}</p>
                        <p>{"Apellidos: " + dataUser.apellidos}

                        </p>
                        <p>{"Correo: "}{isEditing ?
                            <input
                                type="text"
                                name="correo"
                                value={user.correo || ''}
                                onChange={handleInputChange}
                            /> :
                            dataUser.correo
                        }</p>
                        <p>{"Telefono: "}{isEditing ?
                            <input
                                type="text"
                                name="numero"
                                value={user.numero || ''}
                                onChange={handleInputChange}
                            /> :
                            dataUser.numero
                        }</p>
                        <p>{"Direccion: "}{isEditing ?
                            <input
                                type="text"
                                name="direccion"
                                value={user.direccion || ''}
                                onChange={handleInputChange}
                            /> :
                            dataUser.direccion
                        }</p>
                        <p>{"Fecha de nacimiento: "+ formatDate(dataUser.fechaNac)}</p>
                        {isEditing ? (
                            <>
                                <button className="btn btn-primary m-2" onClick={handleSave}>Guardar</button>
                                <button className="btn btn-danger m-2" onClick={handleCancel}>Cancelar</button>
                            </>
                        ) : (
                            <button className="btn btn-primary m-2" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Perfil;

