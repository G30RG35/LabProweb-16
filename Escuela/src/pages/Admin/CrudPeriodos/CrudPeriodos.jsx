import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import formatearFechaPeriodo from "../../../helpers/formatearFechaPeriodo";
import formatearFecha from "../../../helpers/formatearFecha";
import { Link } from "react-router-dom";

const CrudPeriodos = () => {
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const { periodos, alerta, setAlerta } = useAdmin();

    const handleAddNewPeriodo = async() => {
        const periodo = {
            fechaInicio, 
            fechaFin
        }

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/periodos`, {
                periodo
            }, config);

            setAlerta({
                error: false, 
                msg: data.msg
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-lg 6">
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
                                    <form className="" onSubmit={e => handleAddNewPeriodo()}>
                                        <div className="d-flex flex-column">
                                            <label htmlFor="fechaInicio">Fecha de inicio</label>
                                            <input type="date" id="fechaInicio" value={formatearFecha(periodo.fechaInicio)} onChange={e => setFechaInicio(e.target.value)} className="form-control" />
                                        </div>

                                        <div className="d-flex flex-column mt-2">
                                            <label htmlFor="fechaFin">Fecha de fin</label>
                                            <input type="date" id="fechaFin" value={formatearFecha(periodo.fechaFin)} onChange={e => setFechaFin(e.target.value)} className="form-control" />
                                        </div>

                                        <div className="d-flex gap-1 mt-2">
                                            <button type="submit" className="btn bgPrimary">Editar Periodo</button>
                                            <Link to={'/'} className="btn btn-success">Ver Periodo</Link>
                                        </div>
                                        
                                    </form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    )}
                </div>

                <div className="col-lg-6">
                    <form className="formContainer" onSubmit={e => handleAddNewPeriodo()}>
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

export default CrudPeriodos