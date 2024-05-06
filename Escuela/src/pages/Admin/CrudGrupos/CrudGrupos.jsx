import React, { useState } from 'react'
import useAdmin from '../../../hooks/useAdmin'
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import formatearFecha from '../../../helpers/formatearFecha';
import axios from 'axios';

const CrudGrupos = () => {
  const [salonID, setSalonID] = useState(0);
  const [periodoID, setPeriodoID] = useState(0);
  const [escolaridadID, setEscolaridadID] = useState(0);
  const { grupos, salones, escolaridades, periodos } = useAdmin();

  const handleAddNewGroup = async() => {
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
          grupo : grupo
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
      <div className="row g-4">
        <div className="col-lg-6">
          <div>
            <h1>Grupos</h1>
            <p>Ver los grupos actuales y de periodos anteriores</p>

            {grupos?.length > 0 && (
              <Accordion>
                {grupos?.map(grupo => (
                  <Accordion.Item key={grupo.ID} eventKey={grupo.ID}>
                    <Accordion.Header>
                      {"ID: " + grupo.ID + ' Salon: ' + grupo.salonID}
                    </Accordion.Header>

                    <Accordion.Body>
                      <form>
                        <div>
                          <label htmlFor="salonID">Salon</label>
                          <select name="" id="salonID" className='form-select'>
                            <option value="0">Seleccionar un Salon</option>
                          </select>
                        </div>
                        <div className='mt-2'>
                          <label htmlFor="periodoID">Periodo</label>
                          <select name="" id="periodoID" className='form-select'>
                            <option value="0">Seleccionar un Periodo</option>
                          </select>
                        </div>

                        <div className='mt-2 d-flex gap-2'>
                          <Link to={`/admin/grupos/${grupo.ID}`} className='btn btn-primary'>Ver Grupo</Link>

                          <button className='btn btn-success'>Actualizar información</button>
                        </div>

                        
                      </form>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <form className="formContainer" onSubmit={e => handleAddNewGroup(e)}>
            <h3>Ingresa la informacion que se solicita para dar de alta un grupo</h3>
              <div className="d-flex flex-column">
                <label htmlFor="salon">Salon</label>
                <select id="salon" value={salonID} onChange={e => setSalonID(e.target.value)} className='form-select'>
                  <option value="0">Seleccione un salon</option>
                  {salones?.map(salon => (
                    <option key={salon.ID} value={salon.ID}>Capacidad: {salon.capacidad}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex flex-column mt-2">
                <label htmlFor="periodo">Periodo</label>
                <select id="periodo" value={periodoID} onChange={e => setPeriodoID(e.target.value)} className='form-select'>
                  <option value="0">Seleccione un periodo</option>
                  {periodos?.map(periodos => (
                    <option key={periodos.ID} value={periodos.ID}>{formatearFecha(periodos.fechaInicio)} - {formatearFecha(periodos.fechaFin)}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex flex-column mt-2">
                <label htmlFor="escolaridad">Escolaridad</label>
                <select id="escolaridad" value={escolaridadID} onChange={e => setEscolaridadID(e.target.value)} className='form-select'>
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

export default CrudGrupos