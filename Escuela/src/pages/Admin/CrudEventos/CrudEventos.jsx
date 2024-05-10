import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

export const CrudEventos = () => {
  const { eventos, escolaridades, alerta, setAlerta } = useAdmin();

  useEffect(() => {
    console.log(eventos);
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg 6">
            <div>
              <h1>Eventos</h1>
              <p>Ver todos los eventos pasados y futuros</p>

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
            {eventos.length === 0 ? (
              <p className="alert alert-danger">
                Aun no hay eventos dados de alta
              </p>
            ) : (
              <Accordion>
                {eventos?.map((evento) => (
                  <Accordion.Item key={evento.ID} eventKey={evento.ID}>
                    <Accordion.Header>
                      {evento.ID + "  " + evento.titulo}
                    </Accordion.Header>

                    <Accordion.Body>
                      <form className="" onSubmit={(e) => handleAddNewGrupo()}>
                        <div className="d-flex gap-1 mt-2">
                          <button type="submit" className="btn bgPrimary">
                            Editar evento
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
                Ingresa la informacion que se solicita para dar de alta un
                evento
              </h2>
              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Titulo</label>
                <input type="text" id="titulo" className="form-control" />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Descripcion</label>
                <input type="text" id="descripcion" className="form-control" />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Fecha</label>
                <input type="date" id="Fecha" className="form-control" />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fechaInicio">Hora</label>
                <input type="time" id="Hora" className="form-control" />
              </div>

              <button type="submit" className="button mt-2">
                Guardar Evento
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
