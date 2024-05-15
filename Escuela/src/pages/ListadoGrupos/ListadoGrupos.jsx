import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useApp from '../../hooks/useApp';
import { Accordion } from 'react-bootstrap';
import useAdmin from '../../hooks/useAdmin';

export const ListadoGrupos = () => {
    const { setAlerta, alerta } = useApp();

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

                {grupos?.length > 0 && (
                    <Accordion>
                        {grupos?.map(grupo => (
                            <Accordion.Item key={grupo.ID} eventKey={grupo.ID}>
                                <Accordion.Header>
                                    {grupo.escolaridad + " Salon " + grupo.salonID}
                                </Accordion.Header>

                                <Accordion.Body>
                                    {grupoData.editandoID === grupo.ID ? (
                                        <form onSubmit={handleGuardarGrupoEditado}>
                                            <div>
                                                <label htmlFor="salonID">Salon</label>
                                                <select name="" value={grupoData.salonID} id="salonID" className='form-select' onChange={e => setGrupoData({ ...grupoData, salonID: e.target.value })}>
                                                    <option value="0">Seleccionar un Salon</option>
                                                    {salones?.map(salon => (
                                                        <option key={salon.ID} value={salon.ID}>{"Id:" + salon.ID + " Capacidad:" + salon.capacidad}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='mt-2'>
                                                <label htmlFor="periodoID">Periodo</label>
                                                <select value={grupoData.periodoID} id="periodoID" className='form-select' onChange={e => setGrupoData({ ...grupoData, periodoID: e.target.value })}>
                                                    <option value="0">Seleccionar un Periodo</option>
                                                    {periodos?.map(periodo => (
                                                        <option key={periodo.ID} value={periodo.ID}>{formatearFechaPeriodo(periodo.fechaInicio, periodo.fechaFin)}</option>
                                                    ))}
                                                </select>
                                                <div className='mt-2'>
                                                    <label htmlFor="periodoID">Escolaridad</label>
                                                    <select id="escolaridad" value={grupoData.escolaridadID} onChange={e => setGrupoData({ ...grupoData, escolaridadID: e.target.value })} className='form-select'>
                                                        <option value="0">Seleccione una escolaridad</option>
                                                        {escolaridades?.map(escolaridad => (
                                                            <option key={escolaridad.ID} value={escolaridad.ID}>{escolaridad.nombre}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='mt-2 d-flex gap-2'>
                                                <button className='btn btn-primary' type="submit">Guardar</button>
                                                <button className='btn btn-secondary' onClick={handleCancelarEdicion}>Cancelar</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div>
                                            <p>Salon: {`ID: ${salones.find(salon => salon.ID === grupo.salonID)?.ID} Capacidad: ${salones.find(salon => salon.ID === grupo.salonID)?.capacidad}`}</p>
                                            <p>Periodo: {formatearFechaPeriodo(grupo.fechaInicio, grupo.fechaFin)}</p>
                                            <p>Escolaridad: {escolaridades.find(escolaridad => escolaridad.ID === grupo.escolaridadID)?.nombre}</p>
                                            <button className='btn btn-primary' onClick={() => handleEditarClick(grupo)}>Editar</button>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    )
}
