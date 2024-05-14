import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import formatearFecha from "../../helpers/formatearFecha";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../hooks/useAdmin";
import formatearFechaPeriodo from "../../helpers/formatearFechaPeriodo";

export const Perfil = () => {
    const [user, setUser] = useState({});
    const [clases, setClases] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const { periodos } = useAdmin()
    const { auth } = useAuth()

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
        setEditedUser(auth);
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

    const handleGetClases = async() => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clasesAlumnos/alumno/${auth.ID}`, config);
            setClases(data.clases)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        handleGetClases()
    }, [])
    
    return (
        <>
            <div className="container my-4">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <h1 className="text textPrimary">Perfil</h1>
                        <h2 className="fw-light">Bienvenido {auth?.nombre + " " + auth?.apellidos}</h2>
                        <p className="mb-1 fw-bold">Numero de usuario: <span className="fw-normal">{auth?.ID}</span></p>
                        <p className="mb-1 fw-bold">Nombre: <span className="fw-normal">{auth?.nombre}</span></p>
                        <p className="mb-1 fw-bold">Apellidos: <span className="fw-normal">{auth?.apellidos}</span></p>
                        <p className="mb-1 fw-bold">Fecha de nacimiento: <span className="fw-normal">{formatearFecha(auth?.fechaNac)}</span></p>

                        <p className="mb-1 fw-bold">Correo: <span className="fw-normal">{auth?.correo}</span>
                            {isEditing &&
                                <input
                                    type="text"
                                    name="correo"
                                    className="form-control form-control-sm"
                                    placeholder="Correo"
                                    value={user.correo || ''}
                                    onChange={handleInputChange}
                                />
                            }
                        </p>

                        <p className="mb-1 fw-bold">
                            Numero: <span className="fw-normal">{auth.numero}</span>

                            {isEditing &&
                                <input
                                    type="text"
                                    name="numero"
                                    className="form-control form-control-sm"
                                    placeholder="Número"
                                    value={user.numero || ''}
                                    onChange={handleInputChange}
                                /> 
                            }
                        </p>

                        <p className="mb-1 fw-bold">Dirección: <span className="fw-normal">{auth.direccion}</span>
                            {isEditing &&
                                <input
                                    type="text"
                                    name="direccion"
                                    value={user.direccion || ''}
                                    onChange={handleInputChange}
                                    className="form-control form-control-sm"
                                    placeholder="Dirección"
                                /> 
                            }
                        </p>

                        {isEditing ? (
                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
                                <button className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
                            </div>
                        ) : (
                            <button className="btn btn-primary" onClick={handleEdit}>Editar</button>
                        )}
                    </div>

                    <div className="col-lg-6">
                        <h3>Periodos</h3>
                        {periodos?.map(periodo => {
                            const clasesNum = clases?.filter(clase => clase.periodoID === periodo.ID)

                            if(clasesNum.length > 0)
                                return (
                                    <div className="mb-4">
                                        <h4>{formatearFechaPeriodo(periodo.fechaInicio) + " - " + formatearFechaPeriodo(periodo.fechaFin)}</h4>
                                        <Accordion>
                                            {clases?.map(clase => clase.periodoID === periodo.ID && (
                                                    <Accordion.Item eventKey={clase.grupoID + "" + clase.maestroID + "" + clase.materiaID} key={clase.grupoID + "" + clase.maestroID + "" + clase.materiaID}>
                                                        <Accordion.Header>
                                                            <div className="d-flex flex-column flex-sm-row justify-content-between w-100">
                                                                <p className="m-0 fw-bold">ID: <span className="fw-normal">{clase.grupoID + "" + clase.materiaID + "" + clase.maestroID}</span></p>
                                                                <div className="d-flex gap-4 px-sm-2">
                                                                    <p className="m-0 fw-bold">Materia: <span className="fw-normal">{clase.nombreMateria}</span></p>
                                                                    <p className="m-0 fw-bold">Grupo: <span className="fw-normal">{clase.grupoID}</span></p>
                                                                </div>
                                                            </div>
                                                        </Accordion.Header>
                                                        
                                                        <Accordion.Body>
                                                            <div>
                                                                <p className="mb-1 fw-bold">Materia: <span className="fw-normal">{clase.nombreMateria}</span></p>
                                                                <p className="mb-1 fw-bold">Maestro: <span className="fw-normal">{clase.nombreMaestro}</span></p>
                                                                <p className="mb-1 fw-bold">Grupo: <span className="fw-normal">{clase.grupoID}</span></p>
                                                                <p className="mt-3 fw-bold">Calificación: <span className="fw-normal">{clase.calificacion === 0 ? "Aún no calificado" : clase.calificacion}</span></p>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    </div>
                                )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Perfil;

