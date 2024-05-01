import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

const CrudGrupos = () => {
    const [idSalon, setIdSalon] = useState(0)
    const [periodoId, setPeriodoId] = useState(0)
    const [escolaridadId, setEscolaridadId] = useState(0)

    const { grupos, periodos,alerta, setAlerta } = useAdmin();

    const handleAddNewGrupo = async() => {
        const grupo = {
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
                grupo
            }, config);

            setAlerta({
                error: false, 
                msg: data.msg
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
console.log(periodos)
    }, [])
    

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg 6">
            <div>
              <h1>Grupo</h1>
              <p>Ver las calificaciones de los periodos pasados</p>

              {alerta && (
                <p
                  className={`alert ${
                    alerta.error ? "alert-danger" : "alert-success"
                  }`}
                >
                  {alerta.msg}
                </p>
              )}
            </div>
            {grupos.length === 0 ? (
              <p className="alert alert-danger">
                Aun no hay periodos dados de alta
              </p>
            ) : (
              <Accordion>
                {grupos?.map((grupo) => (
                  <Accordion.Item key={grupo.ID} eventKey={grupo.ID}>
                    <Accordion.Header>
                      {/* {"ID " +
                        grupo.ID +
                        ": " +
                        formatearFechaPeriodo(grupo.fechaInicio) +
                        " - " +
                        formatearFechaPeriodo(grupo.fechaFin)} */}
                    </Accordion.Header>

                    <Accordion.Body>
                      <form
                        className=""
                        onSubmit={(e) => handleAddNewGrupo()}
                      >
                        <div className="d-flex flex-column">
                          <label htmlFor="fechaInicio">Fecha de inicio</label>
                          <input
                            type="date"
                            id="fechaInicio"
                            // value={formatearFecha(grupo.fechaInicio)}
                            // onChange={(e) => setFechaInicio(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex flex-column mt-2">
                          <label htmlFor="fechaFin">Fecha de fin</label>
                          <input
                            type="date"
                            id="fechaFin"
                            // value={formatearFecha(grupo.fechaFin)}
                            // onChange={(e) => setFechaFin(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex gap-1 mt-2">
                          <button type="submit" className="btn bgPrimary">
                            Editar Grupo
                          </button>
                          <Link to={"/"} className="btn btn-success">
                            Ver Grupo
                          </Link>
                        </div>
                      </form>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>

          <div className="col-lg-6">
            <form
              className="formContainer"
              onSubmit={(e) => handleAddNewPeriodo()}
            >
              <h2>
                Ingresa la informacion que se solicita para dar de alta un
                grupo
              </h2>
              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Salon</label>
                <input
                  type="number"
                  id="salonId"
                  // value={fechaInicio}
                  // onChange={(e) => setFechaInicio(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Periodo</label>
                <input
                  type="number"
                  id="periodoId"
                  // value={fechaInicio}
                  // onChange={(e) => setFechaInicio(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Escolaridad</label>
                <input
                  type="number"
                  id="escolaridadId"
                  // value={fechaInicio}
                  // onChange={(e) => setFechaInicio(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="button mt-2">
                Guardar Grupo
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrudGrupos;
