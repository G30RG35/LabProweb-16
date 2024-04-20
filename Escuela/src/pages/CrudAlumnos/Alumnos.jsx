import React, { useEffect, useState } from "react";
import { Col, Row, Container, Accordion, Button } from "react-bootstrap";
import style from "./Alumnos.module.css";
import Form from "react-bootstrap/Form";
import Datepicker from "../../Componentes/Datapicker/Datepicker";

export const Alumnos = () => {
  const arrayDeObjetos = [
    {
      id: "01401001",
      nombre: "Pedro López",
      apellidos: "Ramírez Sánchez",
      fechaNac: "2000-12-25",
      correo: "pedro.lopez@correo.com",
      numero: "5545678901",
      password: "micascontraseña123",
      direccion: "Calle Principal No. 101, Colonia San Miguel",
      activo: true,
    },
    {
      id: "01401002",
      nombre: "Ana González",
      apellidos: "Flores Pérez",
      fechaNac: "1995-03-08",
      correo: "ana.gonzalez@correo.com",
      numero: "5512345678",
      password: "micontraseña",
      direccion: "Avenida Independencia No. 202, Fraccionamiento Los Robles",
      activo: true,
    },
    {
      id: "01401003",
      nombre: "Carlos Martínez",
      apellidos: "López García",
      fechaNac: "1987-06-11",
      correo: "carlos.martinez@correo.com",
      numero: "5598765432",
      password: "micascontraseña",
      direccion: "Calle Zaragoza No. 303, Colonia Centro",
      activo: false,
    },
    {
      id: "01401004",
      nombre: "Isabel Gómez",
      apellidos: "Pérez Rodríguez",
      fechaNac: "1975-09-19",
      correo: "isabel.gomez@correo.com",
      numero: "5556789012",
      password: "micontraseña123",
      direccion: "Avenida Reforma No. 404, Fraccionamiento Las Águilas",
      activo: true,
    },
    {
      id: "01401005",
      nombre: "Diego Sánchez",
      apellidos: "García Moreno",
      fechaNac: "2005-02-14",
      correo: "diego.sanchez@correo.com",
      numero: "5523456789",
      password: "micascontraseña",
      direccion: "Calle Constitución No. 505, Colonia Juárez",
      activo: false,
    },
    {
      id: "01401006",
      nombre: "Sofia Rodríguez",
      apellidos: "López González",
      fechaNac: "1992-05-27",
      correo: "sofia.rodriguez@correo.com",
      numero: "5587654321",
      password: "micontraseña123",
      direccion: "Avenida Madero No. 606, Fraccionamiento Los Olivos",
      activo: true,
    },
    {
      id: "01401007",
      nombre: "Alejandro Flores",
      apellidos: "Pérez Martínez",
      fechaNac: "1980-11-04",
      correo: "alejandro.flores@correo.com",
      numero: "5543210987",
      password: "micontraseña",
      direccion: "Calle Morelos No. 707, Colonia Independencia",
      activo: false,
    },
    {
      id: "01401008",
      nombre: "Laura García",
      apellidos: "Ramírez López",
      fechaNac: "1997-08-16",
      correo: "laura.garcia@correo.com",
      numero: "5598765432",
      password: "micascontraseña",
      direccion: "Avenida Hidalgo No. 808, Fraccionamiento Las Brisas",
      activo: true,
    },
    {
      id: "01401009",
      nombre: "Andrea Moreno",
      apellidos: "Martínez Sánchez",
      fechaNac: "2003-04-29",
      correo: "andrea.moreno@correo.com",
      numero: "5567890123",
      password: "micontraseña123",
      direccion: "Calle Allende No. 909, Colonia del Valle",
      activo: true,
    },
    {
      id: "01401010",
      nombre: "David López",
      apellidos: "García González",
      fechaNac: "1998-10-05",
      correo: "david.lopez@correo.com",
      numero: "5532109876",
      password: "micontraseña",
      direccion: "Avenida Juárez No. 1010, Fraccionamiento El Dorado",
      activo: false,
    },
  ];

  const [objetos, setObjetos] = useState([]); // Use state to manage objects
  const [filtro, setFiltro] = useState(""); // State for filter input

  useEffect(() => {
    setObjetos(arrayDeObjetos);
  }, []);

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
  };

  const filteredObjects = objetos.filter((obj) => {
    // Filter logic based on search term
    const searchTerm = filtro.toLowerCase();
    return (
      obj.nombre.toLowerCase().includes(searchTerm) ||
      obj.apellidos.toLowerCase().includes(searchTerm)||
      obj.id.includes(searchTerm)
    );
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  return (
    <>
      <Container>
        <h1>Listado de Alumnos</h1>
        <Row>
          <Col xs={12} md={7}>
            <Row>
              <div className="input-group mb-3">
                <h3>Filtro</h3>
                <input
                  type="text"
                  className="form-control mx-2"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={filtro}
                  onChange={handleFilterChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Button
                </button>
                
              </div>
            </Row>
            <Accordion defaultActiveKey="0">
              {filteredObjects.map((maestro) => (
                <Accordion.Item key={maestro.id} eventKey={maestro.id}>
                  <Accordion.Header>
                    {maestro.id + ".-" + maestro.nombre}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="container">
                      <div className="row">
                        <div className={style.divAgregar}>
                          <div className={style.center}>
                            <h4>Editar Alumnos</h4>
                          </div>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Nombre"
                          />
                          <br />
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Apellidos"
                          />
                          <br />
                          <Datepicker onDateSelected={handleDateSelection}/>
                          <br />
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Correo"
                          />
                          <br />
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Telefono"
                          />
                          <br />
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Contraseña"
                          />
                          <br />
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Direccion"
                          />
                          <br />
                          <Button variant="success">Guardar</Button>
                          <Button variant="danger">Eliminar</Button>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col xs={12} md={5}>
            <div className={style.divAgregar}>
              <div className={style.center}>
                <h4>Agregar Alumno</h4>
              </div>
              <Form.Control size="sm" type="text" placeholder="Nombre" />
              <br />
              <Form.Control size="sm" type="text" placeholder="Apellidos" />
              <br />
              <Datepicker onDateSelected={handleDateSelection}/>
              <br />
              <Form.Control size="sm" type="text" placeholder="Correo" />
              <br />
              <Form.Control size="sm" type="text" placeholder="Telefono" />
              <br />
              <Form.Control size="sm" type="text" placeholder="Contraseña" />
              <br />
              <Form.Control size="sm" type="text" placeholder="Direccion" />
              <br />
              <Button>Guardar</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
