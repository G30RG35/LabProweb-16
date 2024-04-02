import React from "react";
import style from "./Crud.module.css";
import { Accordion } from "react-bootstrap";

export const Crud_Clases = () => {
  const arrayDeObjetos = [
    {
      id: "01401002",
      Nombre: "Ingles",
      Grupo: "401",
      Salon: "002",
      Maestro: "Marco Antonio",
    },
    {
      id: "01401003",
      Nombre: "Ingles",
      Grupo: "401",
      Salon: "002",
      Maestro: "Marco Antonio",
    },
    {
      id: "01401004",
      Nombre: "Ingles",
      Grupo: "401",
      Salon: "002",
      Maestro: "Marco Antonio",
    },
    {
      id: "01401005",
      Nombre: "Ingles",
      Grupo: "401",
      Salon: "002",
      Maestro: "Marco Antonio",
    },
    {
      id: "01401006",
      Nombre: "Ingles",
      Grupo: "401",
      Salon: "002",
      Maestro: "Marco Antonio",
    },
  ];

  return (
    <div className={`${style.divConteiner}`}>
      <h1>Asignacion de clases</h1>
      <div className={`${style.divAsignacion}`}>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 m-1">
              <select class="form-select" aria-label="Default select example">
                <option selected>Maestros</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-sm-5 m-1">
              <select class="form-select" aria-label="Default select example">
                <option selected>Materia</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-5 m-1">
              <select class="form-select" aria-label="Default select example">
                <option selected>Grupo</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-sm-5 m-1 d-grid">
              <button type="button" class="btn btn-primary">
                Crear Clase
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div class="input-group mb-3">
              <h3>Filtro</h3>
              <input
                type="text"
                class="form-control mx-2"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Button
              </button>
            </div>
          </div>
        </div>

        <Accordion /*defaultActiveKey="0"*/>
          {arrayDeObjetos.map((clase) => (
            <Accordion.Item key={clase.id} eventKey={clase.id}>
              <Accordion.Header>
                {clase.Nombre + "/" + clase.Grupo + "/" + clase.Salon}
                {clase.id}
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-8">
                      <div className="col-sm-12 m-1">
                        Maestros
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Maestros</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <div className="row my-2">
                          <div className="col-sm-6">
                            Grupo
                            <select
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Grupo</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-sm-6 ">
                            Materia
                          <select
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Materia</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <button type="button" class="btn btn-primary m-2">
                        Guardar Cambios
                      </button>
                      <button type="button" class="btn btn-secondary m-2">
                        Administrar Grupo
                      </button>
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
