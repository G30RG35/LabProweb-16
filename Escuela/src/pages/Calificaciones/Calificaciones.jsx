import React from "react";
import { Accordion } from "react-bootstrap";
import useApp from "../../hooks/useApp";

export const Calificaciones = () => {
  const { clasesView,alerta, setAlerta } = useApp();

  return (
    <div className="divConteiner">
      <h1>Listado de alumnos</h1>
      <div>
        <div className="container">
          <div className="row">
            <div className="input-group mb-3">
              <h3>Filtro</h3>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Buscar Alumno"
                aria-label="Buscar Alumno"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ width: 20, height: "auto" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Accordion>
  {clasesview?.map((clase) => (
    <Accordion.Item key={clase.ID} eventKey={clase.ID}>
      <Accordion.Header>
        {`${clase.ID} - Materia: ${clase.materiaID}, Grupo: ${clase.grupoID}`}
      </Accordion.Header>
      <Accordion.Body>
        <div className="d-flex flex-column">
          <label htmlFor="calificacion">Calificación</label>
          <input
            type="text"
            id="calificacion"
            className="form-control"
            value={clase.calificacion}
            readOnly
          />
        </div>

        <div className="d-flex gap-1 mt-2">
          <button type="button" className="btn bgPrimary" onClick={() => handleEditClase(clase.ID)}>
            Editar clase
          </button>
          <button type="button" className="btn btn-danger" onClick={() => handleDeleteClase(clase.ID)}>
            Eliminar clase
          </button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  ))}
</Accordion>
      </div>
    </div>
  );
};
