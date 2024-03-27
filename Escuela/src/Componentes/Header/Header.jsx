import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

export const Header = () => {
  const [rol, setRol] = useState("")
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRol(window.localStorage.getItem("rol"))
  }, [])
  
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar bg="light" expand="lg" mb={2}>
      <Container>
        <Navbar.Brand href="/">Nombre de Escuela</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse in={isOpen} id="basic-navbar-nav">
          <Nav className="me-auto">

            {rol==1?<>
              <Nav.Link href="/clases">clases</Nav.Link>
              <Nav.Link href="/periodos">Periodos</Nav.Link>
            </>:null}

            {rol==2?<>
              <Nav.Link href="/grupos">Grupos</Nav.Link>
              <Nav.Link href="/listas">Listas</Nav.Link>
              <Nav.Link href="/crudCalificaciones">Calificaciones</Nav.Link>
            </>:null}
            <Nav.Link href="/">Mestros</Nav.Link>
            <Nav.Link href="/">ALmunos</Nav.Link>
            <Nav.Link href="/">Grupos</Nav.Link>
            <Nav.Link href="/">Plan de estudios</Nav.Link>
            <Nav.Link href="/">Clases</Nav.Link>
            <Nav.Link href="/">Asignacion de alumnos</Nav.Link>
            <Nav.Link href="/">Periodos</Nav.Link>
            <Nav.Link href="/">Eventos</Nav.Link>
            {rol==3?
            <>
            
            </>:null}
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Cuenta
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/perfil">Perfil</Dropdown.Item>
                <Dropdown.Item href="#/logout">Salir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};
