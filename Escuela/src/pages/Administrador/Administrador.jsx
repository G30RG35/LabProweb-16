import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./Administrador.module.css";

export const Administrador = () => {
  return (
    <>
      <Container>
        <h1>Administrador</h1>

        <Row>
          <Col sm={12} md={7} className={style.separacion}>
            <div className={style.divOpciones}>
              <p>Lista de opciones </p>
              <hr />
              <div>
                <p>Periodos</p>
                <p>Ver, editar o eliminar los periodos de la instutucion</p>
                <Button variant="primary">Editar</Button>
                <hr />
              </div>

              <div>
                <p>Grupos</p>
                <p>Ver, editar o eliminar los grupos de la instutucion</p>
                <Button variant="primary">Editar</Button>
                <hr />
              </div>

              <div>
                <p>Materias</p>
                <p>Ver, editar o eliminar los materias de la instutucion</p>
                <Button variant="primary">Editar</Button>
                <hr />
              </div>

              <div>
                <p>Asignacion Maestro - Clase</p>
                <p>
                  Ver, editar o eliminar grupos y asignar a los maestros a un
                  grupo
                </p>
                <Button variant="primary">Editar</Button>
                <hr />
              </div>

              <div>
                <p>Asignacion Alumno - Clase</p>
                <p>
                  Ver, editar o eliminar grupos y asignar a los alumno a un
                  grupo
                </p>
                <Button variant="primary">Editar</Button>
                <hr />
              </div>
            </div>
          </Col>
          <Col sm={12} md={5}>
            <Row>
                <div className={style.divEditores}>
                    <h2>Maestros / Docentes</h2>
                    <p>Ver, crear, editar o eliminar los docentes en la institución</p>
                    <Button variant="primary">Editar</Button>
                </div>
            </Row>

            <Row>
                <div className={style.divEditores}>
                    <h2>Alumnado</h2>
                    <p>Ver, crear, editar o eliminar los alumnos en la institución</p>
                    <Button variant="primary">Editar</Button>
                </div>
            </Row>

            <Row>
                <div className={style.divEditores}>
                    <h2>Eventos</h2>
                    <p>Ver, crear, editar o eliminar eventos</p>
                    <Button variant="primary">Editar</Button>
                </div>
            </Row>

            <Row>
                <div className={style.divEditores}>
                    <h2>Plan de estudios</h2>
                    <p>Ver, crear, editar o eliminar los planes de estudio</p>
                    <Button variant="primary">Editar</Button>
                </div>
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
};
