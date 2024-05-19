import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import formatearFechaPeriodo from "../../../helpers/formatearFechaPeriodo";
import axios from "axios";
import { Link } from "react-router-dom";

export const CrudClases = () => {
  const [usuarioID, setUsuarioID] = useState(0)
  const [materiaID, setMateriaID] = useState(0)
  const [grupoID, setGrupoID] = useState(0)

  const { maestros, materias, grupos, clases, setAlerta, alerta } = useAdmin();

  const handleAddNewClase = async(e) => {
    const clase = {
      grupoID, 
      materiaID, 
      usuarioID
    }

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/clases`, {
        clase : clase
      }, config)

      setAlerta({
          error: false, 
          msg: data.msg
      })
    } catch (error) {
      setAlerta({
        error: true, 
        msg: error.response.data.msg
      })
    }
  }

  return (
    <div className="container my-5">
      <h1 className="fw-bold">Asignación de clases</h1>
      <div className="divAsignacion">
        <div className="container">
          <div className="">
            <div className="p-4 text-light">
              <h1>Crear clase</h1>
              <p>Ingrese la información que se solicita para crear una clase</p>

              {alerta && (
                <p className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} text-uppercase fw-medium`}>{alerta.msg}</p>
              )}

              <form className="row g-3" onSubmit={e => handleAddNewClase(e)}>
                <div className="col-md-6">
                  <label htmlFor="maestro">Maestro</label>
                  <select id="maestro" value={usuarioID} onChange={e => setUsuarioID(e.target.value)} className="form-select">
                    <option value="0">Seleccione Maestro</option>
                    {maestros?.map(maestro => (
                      <option key={maestro.ID} value={maestro.ID}>{maestro.apellidos + ' ' + maestro.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="materia">Materia</label>
                  <select value={materiaID} onChange={e => setMateriaID(e.target.value)} id="materia" className="form-select">
                    <option value="0">Seleccione Materia</option>
                    {materias?.map(materia => (
                      <option value={materia.ID} key={materia.ID}>{materia.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="grupo">Grupo</label>
                  <select value={grupoID} onChange={e => setGrupoID(e.target.value)} id="grupo" className="form-select">
                    <option value="0">Seleccione Grupo</option>
                    {grupos?.map(grupo => (
                      <option key={grupo.ID} value={grupo.ID}>{'Grupo: ' + grupo.ID + ' / ' + grupo.escolaridad + ' / ' + formatearFechaPeriodo(grupo.fechaInicio) + '-' + formatearFechaPeriodo(grupo.fechaFin)}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 d-flex align-items-end">
                  <button className="btn btn-primary w-100">
                    Crear Clase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="input-group mb-3 px-0">
              <h3>Filtro</h3>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Button
              </button>
            </div>
          </div>
        </div>

        <Accordion defaultActiveKey="0">
          {clases?.map(clase => (
            <Accordion.Item key={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID} eventKey={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID}>
              <Accordion.Header>
                {"Grupo: " + clase.grupoID + " / " + clase.materia + " / " + clase.maestro}
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="col-sm-12 m-1">
                        Maestro
                        
                        <select
                          value={clase.usuarioID}  
                          className="form-select"
                          aria-label="Default select example"
                        >
                          {maestros?.map(maestro => (
                            <option key={maestro.ID} value={maestro.ID}>{maestro.apellidos + ' ' + maestro.nombre}</option>
                          ))}
                        </select>
                        <div className="row my-2">
                          <div className="col-sm-6">
                            Grupo
                            <select
                              value={clase.grupoID}
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option value={0}>Grupo</option>
                              {grupos?.map(grupo => (
                                <option value={grupo.ID} key={grupo.ID}>{grupo.escolaridad + ' ' + formatearFechaPeriodo(grupo.fechaInicio) + '-' + formatearFechaPeriodo(grupo.fechaFin)}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-6 ">
                            Materia
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={clase.materiaID}
                            >
                              <option value={0}>Grupo</option>
                              {materias?.map(materia => (
                                <option value={materia.ID} key={materia.ID}>{materia.nombre}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-primary m-2">
                        Guardar Cambios
                      </button>
                      <Link to={`/admin/clase-alumno/${clase.grupoID}/${clase.materiaID}/${clase.usuarioID}`} className="btn btn-secondary m-2">
                        Administrar Grupo
                      </Link>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
