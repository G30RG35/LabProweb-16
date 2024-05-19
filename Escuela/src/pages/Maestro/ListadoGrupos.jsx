import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useApp from '../../hooks/useApp';
import { Accordion } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAdmin from '../../hooks/useAdmin';
import { Link } from 'react-router-dom';

export const ListadoGrupos = () => {
    const [clases, setClases] = useState([])
    const { auth } = useAuth()
    const { setAlerta, alerta } = useApp();
    const { grupos } = useAdmin()

    const formatearFechaPeriodo = (fechaInicio, fechaFin) => {
        const meses = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        const fechaInicioObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);
    
        const diaInicio = fechaInicioObj.getDate();
        const mesInicio = meses[fechaInicioObj.getMonth()];
        const añoInicio = fechaInicioObj.getFullYear();
    
        const diaFin = fechaFinObj.getDate();
        const mesFin = meses[fechaFinObj.getMonth()];
        const añoFin = fechaFinObj.getFullYear();
    
        return `${diaInicio} ${mesInicio} ${añoInicio} - ${diaFin} ${mesFin} ${añoFin}`;
    }

    const handleGetClaseMaestro = async() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/clases/maestro/${auth.ID}`, config);

            data.clases = data.clases.filter(clase => clase.active === 1)

            setClases(data.clases)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetClaseMaestro()
    }, [])

    return (
        <div className="container my-5">
            <div className='col-sm-8 m-auto'>
                <h1>Listado de Grupos</h1>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Buscar grupo"
                        aria-label="Buscar grupo"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Buscar
                    </Button>
                </InputGroup>

                {clases?.length > 0 && (
                    <Accordion>
                        {clases?.map(clase => (
                            <Accordion.Item key={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID} eventKey={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID}>
                                <Accordion.Header>
                                    {"ID: " + clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID + " " + clase.escolaridad + " Salon " + clase.salonID}
                                </Accordion.Header>

                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className='fw-bold mb-1'>Grupo: <span className='fw-normal'>{clase.grupoID}</span></p>
                                            <p className='fw-bold mb-1'>Materia: <span className='fw-normal'>{clase.materia}</span></p>
                                            <p className='fw-bold mb-1'>Salon: <span className='fw-normal'>{clase.salonID}</span></p>
                                        </div>

                                        <div className="col-md-4">
                                            <Link to={`/maestro/${clase.grupoID}/${clase.materiaID}/${clase.usuarioID}`} className='btn btn-primary w-100'>Administrar clase</Link>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    )
}
