import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

export const PerdiodosVistaAlumno = () => {
  const periodos = [
    {
      ID: 1,
      fechaInicio: "2023-08-01",
      fechaFin: "2023-12-20",
    },
    {
      ID: 2,
      fechaInicio: "2024-01-02",
      fechaFin: "2024-04-12",
    },
    {
      ID: 3,
      fechaInicio: "2024-04-15",
      fechaFin: "2024-07-26",
    },
    {
      ID: 4,
      fechaInicio: "2024-08-05",
      fechaFin: "2024-12-19",
    },
    {
      ID: 5,
      fechaInicio: "2025-01-06",
      fechaFin: "2025-04-11",
    },
  ];

  const clases = [
    {
      userID: 1,
      calificacion: 85,
      grupoID: 101,
      materiaID: 202,
      maestroID: 301,
    },
    {
      userID: 2,
      calificacion: 90,
      grupoID: 102,
      materiaID: 201,
      maestroID: 302,
    },
    {
      userID: 3,
      calificacion: 78,
      grupoID: 101,
      materiaID: 203,
      maestroID: 303,
    },
    {
      userID: 4,
      calificacion: 65,
      grupoID: 103,
      materiaID: 202,
      maestroID: 301,
    },
    {
      userID: 5,
      calificacion: 82,
      grupoID: 102,
      materiaID: 201,
      maestroID: 304,
    },
  ];

  const [calificaciones, setCalificaciones] = useState({});

  const Meses = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const mesInicio = inicio.getMonth();
    const añoInicio = inicio.getFullYear();

    const mesFin = fin.getMonth();
    const añoFin = fin.getFullYear();

    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const mesInicioTxt = meses[mesInicio];
    const mesfinTxt = meses[mesFin];

    return (
      "Peridodo escolar " +
      mesInicioTxt +
      " " +
      añoInicio +
      " - " +
      mesfinTxt +
      " " +
      añoFin
    );
  };

  const mostrarCalificaciones = () => {
    let suma = 0;

    for (let i = 0; i < clases.length; i++) {
      const clase = clases[i];

      suma += clase.calificacion;
    }

    const prom = suma / clases.length;

    console.log("Promedio de calificaciones:", prom);
  };

  mostrarCalificaciones();

  return (
    <>
      <div className="divConteiner">
        <h1>Periodos</h1>
        <h3>Ver las calificaciones de los periodos pasados</h3>
      </div>

      <div className="container">
        <Accordion defaultActiveKey="0">
          {periodos.map((periodo) => (
            <Accordion.Item key={periodo.ID} eventKey={periodo.ID}>
              <Accordion.Header>
                {Meses(periodo.fechaInicio, periodo.fechaFin)}
              </Accordion.Header>
              <Accordion.Body>
                {mostrarCalificaciones}
                <div className="container">
                  {/* <CalificacionesPerdiodo 
                data={clases}
                /> */}
                  {clases.map((materia) => (
                    <p>{"id de la materia " +materia.materiaID+": "+materia.calificacion}</p>
                  ))}

                  <div className="divBtnGuardar">
                    <button type="button" className="btn btn-primary m-2">
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};
