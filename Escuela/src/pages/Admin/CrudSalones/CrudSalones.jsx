import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";
import { act } from "react";

export const CrudSalones = () => {
  const [capacidad, setCapacidad] = useState(0);
  const [activo, setActivo] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // Nuevo estado para almacenar el ID del salón que se está editando

  const { salones, alerta, setAlerta, handleGetSalones } = useAdmin();

  const handleAddNewSalon = async (e, id) => {
    e.preventDefault();
    const salon = {
      capacidad: capacidad,
      activo: activo ? 1 : 0
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/salones`,
        {
          salon: salon
        },
        config
      );

      setAlerta({
        error: false,
        msg: data.msg
      });

      handleGetSalones();
      setCapacidad(0);
      setActivo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditarClick = (id, capacidad, activo) => {
    setEditandoId(id); // Al hacer clic en editar, establecemos el ID del salón que se está editando
    setCapacidad(capacidad); // Establecemos la capacidad del salón en el estado
    setActivo(activo === 1 ? true : false); // Establecemos el estado de activo del salón
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null); // Al hacer clic en cancelar, restablecemos el estado de edición a null
    setCapacidad(0); // Restablecemos la capacidad a su valor inicial
    setActivo(false); // Restablecemos el estado activo a false
  };

  const handleGuardarSalonEditado = async (id) => {
    const token = localStorage.getItem("token");

    const salon = {
      capacidad: capacidad,
      activo: activo ? 1 : 0
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/salones/${id}`,
        {
          salon
        },
        config
      );

      setAlerta({
        error: false,
        msg: data.msg
      });

      handleGetSalones();
      setEditandoId(null);
      setCapacidad(0);
      setActivo(false);
    } catch (error) {
      console.log(error);
    }
  };

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
                  className={`alert ${alerta.error ? "alert-danger" : "alert-success"
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
                      {"Id " +
                        salon.ID +
                        " Capacidad " +
                        salon.capacidad +
                        " Activo " +
                        (salon.activo === 1 ? "Sí" : "No")
                      }
                    </Accordion.Header>

                    <Accordion.Body>
                      {editandoId === salon.ID ? (
                        <div className="d-flex flex-column">
                          <label htmlFor="capacidad">Capacidad:</label>
                          <input
                            type="number"
                            value={capacidad}
                            onChange={(e) => setCapacidad(e.target.value)}
                            className="form-control mb-2"
                          />
                          <div className="form-check mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`activo-${salon.ID}`}
                              checked={activo}
                              onChange={() => setActivo(!activo)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`activo-${salon.ID}`}
                            >
                              Activo
                            </label>
                          </div>
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => handleGuardarSalonEditado(salon.ID)}
                          >
                            Guardar
                          </button>
                          <button
                            className="btn btn-secondary m-2"
                            onClick={() => handleCancelarEdicion()}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <>
                          <p>Capacidad: {salon.capacidad}</p>
                          <p>Activo: {salon.activo === 1 ? "Sí" : "No"}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditarClick(salon.ID, salon.capacidad, salon.activo)}
                          >
                            Editar
                          </button>
                        </>
                        
                      )}
                      
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>

          <div className="col-lg-6 my-2">
            <form
              className="formContainer"
              onSubmit={(e) => handleAddNewSalon(e)}
            >
              <h2>
                Ingresa la informacion que se solicita para dar de alta un
                salon
              </h2>
              <div className="d-flex flex-column">
                <label htmlFor="capacidad">Capacidad del nuevo salon:</label>
                <input
                  type="number"
                  id="capacidad"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  className="form-control mb-2"
                />
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="activo"
                    checked={activo}
                    onChange={() => setActivo(!activo)}
                  />
                  <label className="form-check-label" htmlFor="activo">
                    Activo
                  </label>
                </div>
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
