import React from "react";
import { Accordion } from "react-bootstrap";

export const Calificaciones = () => {
  const arrayDeAlumnos = [
    {
      ID: "001",
      nombre: "Juan Pérez",
      apellidos: "Martínez",
      fechaNac: "2000-01-01",
      correo: "juan.perez@ejemplo.com",
      numero: "555-123-4567",
      password: "password123",
      direccion: "Calle Principal 123",
      activo: true,
    },
    {
      ID: "002",
      nombre: "María García",
      apellidos: "López",
      fechaNac: "2002-02-02",
      correo: "maria.garcia@ejemplo.com",
      numero: "555-765-4321",
      password: "password456",
      direccion: "Avenida Juárez 456",
      activo: true,
    },
    {
      ID: "003",
      nombre: "Pedro González",
      apellidos: "Ramírez",
      fechaNac: "2003-03-03",
      correo: "pedro.gonzalez@ejemplo.com",
      numero: "555-321-6543",
      password: "password789",
      direccion: "Calle Sol 789",
      activo: true,
    },
    {
      ID: "004",
      nombre: "Ana Flores",
      apellidos: "Hernández",
      fechaNac: "2001-04-04",
      correo: "ana.flores@ejemplo.com",
      numero: "555-987-6543",
      password: "password012",
      direccion: "Calle Luna 987",
      activo: true,
    },
    {
      ID: "005",
      nombre: "Luis Sánchez",
      apellidos: "Diaz",
      fechaNac: "2004-05-05",
      correo: "luis.sanchez@ejemplo.com",
      numero: "555-213-4567",
      password: "password345",
      direccion: "Calle Sol 213",
      activo: true,
    },
  ];

  return (
    <div className="divConteiner">
      <h1>Listado de alumnos</h1>
      {/* <div className="divAsignacion">
        <div className="container">
         
        </div>
      </div> */}
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

        <Accordion defaultActiveKey="0">
          {arrayDeAlumnos.map((alumno) => (
            <Accordion.Item key={alumno.ID} eventKey={alumno.ID}>
              <Accordion.Header>
                {alumno.ID + "        " + alumno.nombre + alumno.apellidos}
              </Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  

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
    </div>
  );
};
