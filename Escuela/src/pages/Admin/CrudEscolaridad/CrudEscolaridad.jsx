import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

export const CrudEscolaridad = () => {
  const { escolaridades, alerta, setAlerta } = useAdmin();

  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState(0);

  const handleAddNewEscolaridad = async (e) => {
    e.preventDefault();
    const grupo = {nombre, duracion};

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/escolaridad`,
        {
          grupo,
        },
        config
      );

      setAlerta({
        error: false,
        msg: data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(escolaridades);
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg 6">
            <div>
              <h1>Escolaridades</h1>
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
            {escolaridades.length === 0 ? (
              <p className="alert alert-danger">
                Aun no hay periodos dados de alta
              </p>
            ) : (
              <Accordion>
                {escolaridades.map((escolaridad) => (
                  <Accordion.Item
                    key={escolaridad.ID}
                    eventKey={escolaridad.ID}
                  >
                    <Accordion.Header>
                      {escolaridad.ID} - {escolaridad.nombre}
                    </Accordion.Header>
                    <Accordion.Body>
                      <form
                        className=""
                        onSubmit={(e) => handleAddNewEscolaridad(e, escolaridad.ID)}
                      >
                        <div className="d-flex flex-column">
                          <label>Nombre</label>
                          <input
                            type="text"
                            id="nombre"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <label htmlFor="duracion">Duración</label>
                          <input
                            type="number"
                            id="duracion"
                            className="form-control"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                          />
                        </div>
                        <div className="d-flex gap-1 mt-2">
                          <button type="submit" className="btn bgPrimary">
                            Editar Grupo
                          </button>
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
                Ingresa la informacion que se solicita para dar de alta una
                escolaridad
              </h2>
              <div className="d-flex flex-column">
                <label>Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  // value={fechaInicio}
                  // onChange={(e) => setFechaInicio(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Duracion</label>
                <input
                  type="number"
                  id="duracion"
                  // value={fechaInicio}
                  // onChange={(e) => setFechaInicio(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="button mt-2">
                Guardar escolaridad
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
