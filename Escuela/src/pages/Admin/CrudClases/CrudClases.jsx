import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import formatearFechaPeriodo from "../../../helpers/formatearFechaPeriodo";
import axios from "axios";
import { Link } from "react-router-dom";
import getPeriodoCurrent from "../../../helpers/getPeriodoCurrent";

export const CrudClases = () => {
  const [usuarioID, setUsuarioID] = useState(0)
  const [materiaID, setMateriaID] = useState(0)
  const [periodoID, setPeriodoID] = useState()
  const [grupoID, setGrupoID] = useState(0)
  const [searchBar, setSearchBar] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const [clase, setClase] = useState({})

  const { maestros, materias, grupos, clases, setAlerta, alerta, periodos } = useAdmin();

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

  useEffect(() => {
    setFilteredItems(clases)
  }, [clases])

  useEffect(() => {
    const getPeriodo = async() => {
        if(!periodoID) {
            const id = await getPeriodoCurrent(periodos)
            setPeriodoID(id)
        }
    }

    getPeriodo()
  }, [periodos])

  const filterSomeClass = () => {
    const newArray = clases?.filter(clase => {
      const isMaestroName = clase?.maestro.toLowerCase().includes(searchBar.toLowerCase());
      const isMaestroID = clase?.usuarioID.toString().includes(searchBar.toLowerCase());
      const isGrupoID = clase?.grupoID.toString().includes(searchBar.toLowerCase());
      const isMateria = clase?.materia.toLowerCase().includes(searchBar.toLowerCase());

      return isMaestroName ||
        isMaestroID || 
        isMateria || 
        isGrupoID
    })

    setFilteredItems(newArray)
  }
  
  const handleUpdateClase = async(grupoIDNew, materiaIDNew, usuarioIDNew) => {
    const clase = {
      grupoID : grupoIDNew, 
      materiaID : materiaIDNew, 
      usuarioID : usuarioIDNew
    }

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/clases`, {
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
                    <option value={0}>Seleccione Maestro</option>
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
                placeholder="Filtre alguna clase"
                value={searchBar}
                onChange={e => setSearchBar(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => filterSomeClass()}
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>

        <h2>Actual periodo</h2>
        <Accordion defaultActiveKey="0">
          {filteredItems?.map(clase => clase.periodoID === +periodoID && (
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
                      {/* <button type="button" className="btn btn-primary m-2">
                        Guardar Cambios
                      </button> */}
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

        <h3 className="mt-3">Todas las clases</h3>
        <Accordion defaultActiveKey="0">
          {filteredItems?.map(clase => clase.periodoID !== +periodoID && (
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
                      <button onClick={() => handleUpdateClase(clase.grupoID, clase.materiaID, clase.usuarioID)} type="button" className="btn btn-primary m-2">
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
