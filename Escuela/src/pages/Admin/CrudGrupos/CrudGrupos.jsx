import React, { useEffect, useState } from 'react'
import useAdmin from '../../../hooks/useAdmin'
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import getPeriodoCurrent from '../../../helpers/getPeriodoCurrent';

const CrudGrupos = () => {
  const [grupoData, setGrupoData] = useState({
    salonID: 0,
    periodoID: 0,
    escolaridadID: 0,
    editandoID: null
  });
  const [periodoID, setPeriodoID] = useState()

  const { grupos, salones, escolaridades, periodos, alerta, setAlerta } = useAdmin();
  
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

  const handleAddNewGroup = async (e) => {
    const { salonID, periodoID, escolaridadID } = grupoData;
  
    // Verificar si los campos de selección están en la opción 0
    if (parseInt(salonID) === 0 || parseInt(periodoID) === 0 || parseInt(escolaridadID) === 0) {
      return;
    }
  
    const grupo = {
      salonID,
      periodoID,
      escolaridadID
    }
  
    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/grupos`, {
        grupo: grupo
      }, config);

      setAlerta({
        error : false, 
        msg : data.msg
      })
  
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditarClick = (grupo) => {
    setGrupoData({
      ...grupoData,
      salonID: grupo.salonID,
      periodoID: grupo.periodoID,
      escolaridadID: grupo.escolaridadID,
      editandoID: grupo.ID
    });
  }

  const handleCancelarEdicion = () => {
    setGrupoData({
      ...grupoData,
      salonID: 0,
      periodoID: 0,
      escolaridadID: 0,
      editandoID: null
    });
  }

  const handleGuardarGrupoEditado = async (e) => {
    e.preventDefault();

    const { salonID, periodoID, escolaridadID, editandoID } = grupoData;
  
    // Verificar si los campos de selección están en la opción 0
    if (parseInt(salonID) === 0 || parseInt(periodoID) === 0 || parseInt(escolaridadID) === 0) {

      return;
    }
  
    const grupo = {
      ID : editandoID,
      salonID,  
      periodoID,
      escolaridadID
    }
  
    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/grupos`, {
        grupo: grupo
      }, config);

      setAlerta({
        error : false, 
        msg : data.msg
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getPeriodo = async() => {
        if(!periodoID) {
            const id = await getPeriodoCurrent(periodos)
            setPeriodoID(id)
        }
    }

    getPeriodo()
  }, [periodos])

  return (
    
    <div className='container my-5'>
      <div className="row g-4">
        <div className="col-lg-6">
          <div>
            <h1>Grupos</h1>
            <p>Ver los grupos actuales y de periodos anteriores</p>

            {grupos?.length > 0 && (
              <Accordion>
                {grupos?.map(grupo => grupo?.periodoID === +periodoID && (
                  <Accordion.Item key={grupo.ID} eventKey={grupo.ID}>
                    <Accordion.Header>
                      {grupo.escolaridad +" Salon "+grupo.salonID}
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

            <h3 className='mt-4'>Todos los grupos</h3>
            
            {grupos?.length > 0 && (
              <Accordion>
                {grupos?.map(grupo => (
                  <Accordion.Item key={grupo.ID} eventKey={grupo.ID}>
                    <Accordion.Header>
                      {grupo.escolaridad +" Salon "+grupo.salonID}
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

        <div className="col-lg-6">
          <form className="formContainer" onSubmit={handleAddNewGroup}>
            <h3>Ingresa la informacion que se solicita para dar de alta un grupo</h3>
            {alerta && (
                <p
                  className={`alert ${alerta.error ? "alert-danger" : "alert-success"
                    }`}
                >
                  {alerta.msg}
                </p>
              )}
            <div className="d-flex flex-column">
              <label htmlFor="salon">Salon</label>
              <select id="salon" value={grupoData.salonID} onChange={e => setGrupoData({ ...grupoData, salonID: e.target.value })} className='form-select'>
                <option value="0">Seleccionar un Salon</option>
                {salones?.map(salon => (
                  <option key={salon.ID} value={salon.ID}>{"Id:" + salon.ID + " Capacidad:" + salon.capacidad}</option>
                ))}
              </select>
            </div>

            <div className="d-flex flex-column mt-2">
              <label htmlFor="periodo">Periodo</label>
              <select id="periodo" value={grupoData.periodoID} onChange={e => setGrupoData({ ...grupoData, periodoID: e.target.value })} className='form-select'>
                <option value="0">Seleccione un periodo</option>
                {periodos?.map(periodo => (
                  <option key={periodo.ID} value={periodo.ID}>{formatearFechaPeriodo(periodo.fechaInicio, periodo.fechaFin)}</option>
                ))}
              </select>
            </div>

            <div className="d-flex flex-column mt-2">
              <label htmlFor="escolaridad">Escolaridad</label>
              <select id="escolaridad" value={grupoData.escolaridadID} onChange={e => setGrupoData({ ...grupoData, escolaridadID: e.target.value })} className='form-select'>
                <option value="0">Seleccione una escolaridad</option>
                {escolaridades?.map(escolaridad => (
                  <option key={escolaridad.ID} value={escolaridad.ID}>{escolaridad.nombre}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="button mt-2">Guardar Periodo</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CrudGrupos;
