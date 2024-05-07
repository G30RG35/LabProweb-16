import React, { useState } from 'react'
import useAdmin from '../../../hooks/useAdmin'
import { Accordion } from 'react-bootstrap';
import axios from 'axios';

const CrudMaterias = () => {
  const [ID, setID] = useState(null)
  const [nombre, setNombre] = useState("")
  const [active, setActive] = useState("")

  const { materias } = useAdmin()

  const handleAddNewMateria = async(e) => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
      if(!ID) {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/materias`, {
          materia : {
            nombre, 
            activo : active
          }
        }, config);

        setAlerta({
            error: false, 
            msg: data.msg
        });
      } else {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/materias/${ID}`, {
          materia : {
            ID, 
            nombre, 
            activo : active
          }
        }, config);

        setAlerta({
            error: false, 
            msg: data.msg
        });
      }
        
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleFillForm = (id, nombre, activo) => {
    setID(id)
    setNombre(nombre)
    setActive(activo)
  }

  return (
    <div className='container my-5'>
      <div className="row g-4">
        <div className="col-lg-6">
          <div>
            <h1>Materias</h1>
            <p>Ver y dar de alta nuevas materias</p>

            {materias?.length > 0 && (
              <Accordion>
                {materias?.map(materia => (
                  <Accordion.Item key={materia.ID} eventKey={materia.ID}>
                    <Accordion.Header>
                      {materia.nombre}
                    </Accordion.Header>

                    <Accordion.Body>
                      <>
                        <label htmlFor="nombreMateria">Nombre de la materia</label>
                        <input type="text" id="nombreMateria" className='form-control' value={materia.nombre} />
                      
                        <label htmlFor="status" className='mt-2'>Estatus de la materia</label>
                        <select id="status" className='form-select' defaultValue={materia.activo}>
                          <option value={1}>Activo</option>
                          <option value={0}>Inactivo</option>
                        </select>

                        <button 
                          type='button' 
                          className='btn btn-success mt-2 btn-sm'
                          onClick={() => handleFillForm(materia.ID, materia.nombre, materia.activo)}
                        >Guardar cambios</button>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <form className="formContainer" onSubmit={(e) => handleAddNewMateria(e)}>
            <h3>Ingresa la información para dar de alta una clase</h3>
            <label htmlFor="nombre">Nombre de la materia</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id="nombre" placeholder='Nombre de la materia' className='form-control' />
            
            <label htmlFor="status" className='mt-2'>Estatus de la materia</label>
            <select id="status" className='form-select' value={active} onChange={e => setActive(e.target.value)}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
            
            <button className='btn bgPrimary mt-3'>Guardar materia</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CrudMaterias