import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

export const CrudSalones = () => {
  const [ID, setIdSalon] = useState(0);
  const [capacidad, setCapacidad] = useState(0);

  const { salones, alerta, setAlerta ,handleGetSalones} = useAdmin();

  const handleAddNewSalon = async (e) => {
    e.preventDefault();
    const salon = {
      capacidad,
    };

    console.log(salon);

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/salones`,
        {
            capacidad:capacidad
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
    console.log(salones);
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg 6">
            <div>
              <h1>Salon</h1>
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
            {salones.length === 0 ? (
              <p className="alert alert-danger">
                Aun no hay salones dados de alta
              </p>
            ) : (
              <Accordion>
                {salones?.map((salon) => (
                  <Accordion.Item key={salon.ID} eventKey={salon.ID}>
                    <Accordion.Header>
                      {"Id " + salon.ID + " Capacidad " + salon.capacidad}
                    </Accordion.Header>

                    <Accordion.Body>
                      <form className="" onSubmit={(e) => handleAddNewSalon(e)}>
                        <div className="d-flex flex-column">
                          <label htmlFor="fechaInicio">Capacidad</label>
                          <input
                            type="number"
                            id="capacidad"
                            value={capacidad}
                            onChange={(e) => setCapacidad(e.target.value)}
                            className="form-control"
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
              onSubmit={(e) => handleAddNewSalon(e)}
            >
              <h2>
                Ingresa la informacion que se solicita para dar de alta un salon
              </h2>
              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Capacidad del nuevo salon</label>
                <input
                  type="number"
                  id="capacidad"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="button mt-2">
                Guardar Salon
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
