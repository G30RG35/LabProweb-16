import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import formatearFechaPeriodo from "../../../helpers/formatearFechaPeriodo";
import formatearFecha from "../../../helpers/formatearFecha";
import { Link } from "react-router-dom";

const CrudPeriodos = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [editandoPeriodo, setEditandoPeriodo] = useState(null);
    const [confirmarBorrado, setConfirmarBorrado] = useState(false);
    const [periodoAEliminar, setPeriodoAEliminar] = useState(null);

    const { periodos, alerta, setAlerta, handleGetPeriodos } = useAdmin();

    const handleAddNewPeriodo = async (e) => {
        e.preventDefault();
        const periodo = {
            fechaInicio,
            fechaFin
        };

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/periodos`, {
                periodo
            }, config);

            setAlerta({
                error: false,
                msg: data.msg
            });
            handleGetPeriodos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditPeriodo = async (e, periodoId) => {
        e.preventDefault();
        const periodo = periodos.find(p => p.ID === periodoId);
        const { fechaInicio, fechaFin } = periodo;

        setEditandoPeriodo(periodoId);
        setFechaInicio(formatearFecha(fechaInicio));
        setFechaFin(formatearFecha(fechaFin));
    };

    const handleGuardarEdicion = async (periodoId) => {
        const periodo = {
            fechaInicio,
            fechaFin
        };

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/periodos/${periodoId}`, {
                periodo
            }, config);

            setEditandoPeriodo(null);
            setAlerta({
                error: false,
                msg: data.msg
            });
            handleGetPeriodos();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEliminarPeriodo = async (e, periodoId) => {
        e.preventDefault();
        if (confirmarBorrado && periodoAEliminar === periodoId) {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/periodos/${periodoId}`, config);
                setAlerta({
                    error: false,
                    msg: data.msg
                });
                handleGetPeriodos();
            } catch (error) {
                console.log(error);
            }
            setPeriodoAEliminar(null);
            setConfirmarBorrado(false);
        } else {
            setPeriodoAEliminar(periodoId);
            setConfirmarBorrado(true);
        }
    };

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-lg-6">
                    <div>
                        <h1>Periodos</h1>
                        <p>Ver las calificaciones de los periodos pasados</p>

                        {alerta && (
                            <p className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'}`}>{alerta.msg}</p>
                        )}
                    </div>
                    {periodos.length === 0 ? (
                        <p className="alert alert-danger">Aun no hay periodos dados de alta</p>
                    ) : (
                        <Accordion>
                            {periodos?.map(periodo => (
                                <Accordion.Item key={periodo.ID} eventKey={periodo.ID}>
                                    <Accordion.Header>
                                        {"ID " + periodo.ID + ": " + formatearFechaPeriodo(periodo.fechaInicio) + ' - ' + formatearFechaPeriodo(periodo.fechaFin)}
                                    </Accordion.Header>

                                    <Accordion.Body>
                                        {editandoPeriodo === periodo.ID ? (
                                            <form className="" onSubmit={e => handleGuardarEdicion(periodo.ID)}>
                                                <div className="d-flex flex-column">
                                                    <label htmlFor="fechaInicio">Fecha de inicio</label>
                                                    <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="form-control" />
                                                </div>

                                                <div className="d-flex flex-column mt-2">
                                                    <label htmlFor="fechaFin">Fecha de fin</label>
                                                    <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="form-control" />
                                                </div>

                                                <div className="d-flex gap-1 mt-2">
                                                    <button type="submit" className="btn btn-success">Guardar</button>
                                                    <button type="button" onClick={() => setEditandoPeriodo(null)} className="btn btn-danger">Cancelar</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div>
                                                <p><strong>Fecha de inicio:</strong> {formatearFecha(periodo.fechaInicio)}</p>
                                                <p><strong>Fecha de fin:</strong> {formatearFecha(periodo.fechaFin)}</p>
                                                {confirmarBorrado && periodoAEliminar === periodo.ID ? (
                                                    <div className="d-flex gap-1 mt-2">
                                                        <button onClick={(e) => handleEliminarPeriodo(e, periodo.ID)} className="btn btn-danger">Confirmar Borrado</button>
                                                        <button onClick={() => setConfirmarBorrado(false)} className="btn btn-secondary">Cancelar</button>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex gap-1 mt-2">
                                                        <button onClick={(e) => handleEditPeriodo(e, periodo.ID)} className="btn btn-primary">Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </div>

                <div className="col-lg-6">
                    <form className="formContainer" onSubmit={e => handleAddNewPeriodo(e)}>
                        <h3>Ingresa la informacion que se solicita para dar de alta un periodo</h3>
                        <div className="d-flex flex-column">
                            <label htmlFor="fechaInicio">Fecha de inicio</label>
                            <input type="date" id="fechaInicio" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="form-control" />
                        </div>

                        <div className="d-flex flex-column mt-2">
                            <label htmlFor="fechaFin">Fecha de fin</label>
                            <input type="date" id="fechaFin" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="form-control" />
                        </div>

                        <button type="submit" className="button mt-2">Guardar Periodo</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default CrudPeriodos;
