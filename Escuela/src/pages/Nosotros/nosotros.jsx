import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Nosotros.module.css";

export const Nosotros = () => {
  return (
    <>
      <Container className={`${styles.conteiner}`}>
        <Row className={`${styles.spaceRow} ${styles.colorRow}`}>
          <Col>
            <h2>Misión</h2>
            <p>
              Formar ciudadanos íntegros, responsables y preparados para el
              éxito académico y personal.
            </p>
            <p>
              Brindar una educación de calidad basada en valores, innovación y
              pensamiento crítico.
            </p>
            <p>
              Desarrollar las habilidades y el potencial de cada estudiante para
              que puedan alcanzar sus sueños.
            </p>
            <p>
              Promover una comunidad educativa donde se fomente la colaboración,
              el respeto y la inclusión.
            </p>
          </Col>
          <Col>
            <h2>Visión</h2>
            <p>Ser una escuela líder en la formación de líderes del futuro.</p>
            <p>
              Ser reconocida por su excelencia educativa y su compromiso con la
              sociedad.
            </p>
            <p>
              Ser un espacio donde se inspiren y se cultiven los talentos de los
              estudiantes.
            </p>
            <p>
              Ser una comunidad educativa que transforma vidas y construye un
              futuro mejor.
            </p>
          </Col>
        </Row>
        <Row className={`${styles.spaceRow}`}>
          <h2>Equipo docente:</h2>
          <p>
            En nuestra escuela, creemos que el éxito de los estudiantes depende
            en gran medida de la calidad de sus profesores. Por eso, contamos
            con un equipo docente altamente calificado y comprometido con la
            educación.
          </p>
          <p>
            Nuestros profesores son expertos en sus áreas de conocimiento y
            están constantemente actualizando sus conocimientos y métodos de
            enseñanza.
          </p>
          <p>
            Además de su experiencia y formación, nuestros profesores son
            apasionados por la educación y se dedican a ayudar a los estudiantes
            a alcanzar su máximo potencial.
          </p>
          <img
            src="https://www.smt.edu.ar/wp-content/uploads/2019/02/3409A20076.jpg"
            alt=""
          />
        </Row>
        <Row className={`${styles.spaceRow} ${styles.colorRow}`}>
          <h2> Modelo educativo</h2>
          <p>
            En nuestra escuela, creemos en un modelo educativo innovador y
            centrado en el estudiante.
          </p>
          <p>
            Nuestro objetivo es formar ciudadanos íntegros, preparados para el
            éxito académico y personal, y que puedan contribuir a una sociedad
            mejor.
          </p>
          <p>
            Para ello, implementamos un enfoque pedagógico que se basa en los
            siguientes principios:
          </p>
          <h3>Principios del modelo educativo:</h3>
          <p>
            Aprendizaje activo: Los estudiantes son protagonistas de su propio
            aprendizaje y participan activamente en el proceso educativo.
          </p>
          <p>
            Pensamiento crítico: Fomentamos el desarrollo del pensamiento
            crítico y la capacidad de análisis en los estudiantes.
          </p>
          <p>
            Creatividad e innovación: Estimulamos la creatividad y la innovación
            en los estudiantes, brindándoles oportunidades para explorar sus
            talentos y desarrollar sus habilidades.
          </p>
        </Row>
      </Container>
    </>
  );
};
