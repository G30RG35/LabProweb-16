import React, { useState } from 'react'
import useAdmin from '../../../hooks/useAdmin'
import { Accordion } from 'react-bootstrap';
import axios from 'axios';

const CrudMaterias = () => {
  const [ID, setID] = useState(null)
  const [nombre, setNombre] = useState("")
  const [active, setActive] = useState(1)
  const [editMode, setEditMode] = useState(false)

  const { materias, handleGetMaterias } = useAdmin()

  const handleAddNewMateria = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const materia = {
      nombre: nombre,
      activo: active
    }

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/materias${ID}`, materia, config);
      setNombre("");
      setActive(1);
      handleGetMaterias();
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateMateria = async (materiaId) => {
    const materia = {
      nombre: nombre,
      activo: active
    };

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/materias/${materiaId}`, { materia }, config);

      setEditMode(false);
      handleGetMaterias();
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setID(null);
    setNombre("");
    setActive(1);
  };

  const handleFillForm = (id, nombre, activo) => {
    setID(id)
    setNombre(nombre)
    setActive(activo)
    // Activa el modo de edición
    setEditMode(true);
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
                {materias?.map(m => (
                  <Accordion.Item key={m.ID} eventKey={m.ID}>
                    <Accordion.Header>
                      <span>{m.nombre}</span>
                    </Accordion.Header>

                    <Accordion.Body>
                      <>
                        {editMode && ID === m.ID ? (
                          <>
                            <label htmlFor="nombreMateria" className='mt-2'>Nombre de la materia</label>
                            <input
                              type="text"
                              className='form-control my-2'
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                            />
                            <label htmlFor="status" className='mt-2'>Estatus de la materia</label>
                            <select
                              id="status"
                              className='form-select m-2'
                              value={active}
                              onChange={(e) => setActive(e.target.value)}
                            >
                              <option value={1}>Activo</option>
                              <option value={0}>Inactivo</option>
                            </select>
                            <button
                              type='button'
                              className='btn btn-danger m-2 btn-sm'
                              onClick={handleCancelEdit}
                            >Cancelar</button>
                          </>
                        ) : (
                          <>
                            <label htmlFor="status" className='mt-2'>Nombre de la materia</label>
                            <p>{m.nombre}</p>
                            <label htmlFor="status" className='mt-2'>Estatus de la materia</label>
                            <p>{m.activo === 1 ? "Activo" : "Inactivo"}</p>
                          </>
                        )}

                        {editMode && ID === m.ID ? (
                          <button
                            type='button'
                            className='btn btn-success m-2 btn-sm'
                            onClick={() => handleUpdateMateria(m.ID)}
                          >Guardar cambios</button>
                        ) : (
                          <button
                            type='button'
                            className='btn btn-primary mt-2 btn-sm'
                            onClick={() => handleFillForm(m.ID, m.nombre, m.activo)}
                          >Editar</button>
                        )}
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
            <h3>Ingresa la información para dar de alta una materia</h3>
            <label htmlFor="nombre">Nombre de la materia</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id="nombre" placeholder='Nombre de la materia' className='form-control' />

            <label htmlFor="status" className='mt-2'>Estatus de la materia</label>
            <select
              id="status"
              className='form-select'
              value={active}
              onChange={e => setActive(e.target.value)}
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>

            <button type="submit" className='btn bgPrimary mt-3'>Guardar materia</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CrudMaterias
