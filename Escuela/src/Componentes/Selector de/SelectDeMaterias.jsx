import React, { useRef } from "react";
import style from "./SelectDeMaterias.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

export const SelectDe = () => {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        type="button"
        // style={{ backgroundColor: "pink" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const arrayDeObjetos = [
    {
      id: "1",
      titulo: "Materia 1",
      cuerpo: "Este es el cuerpo del primer objeto.",
    },
    {
      id: "2",
      titulo: "Materia 2",
      cuerpo: "Este es el cuerpo del segundo objeto.",
    },
    {
      id: "3",
      titulo: "Materia 3",
      cuerpo: "Este es el cuerpo del tercer objeto.",
    },
  ];

  const persona = {
    id: 84596,
    nombre: "Jorge Javier Inosroza villarreal",
    edad: 19,
  };

  return (
    <>
      <div className={`${style.divConteiner}`}>
        <div className={`${style.divCentral}`}>
          <h1>Materias</h1>
          <p>
            Ingrese a la materia para ver sus calificaciones y las horas de
            clase
          </p>
          {/* Componente de acordeon */}
          <div>
            <Accordion /*defaultActiveKey="0"*/>
              {arrayDeObjetos.map((materia) => (
                <Accordion.Item key={materia.id} eventKey={materia.id}>
                  <Accordion.Header>{materia.titulo}</Accordion.Header>
                  <Accordion.Body>{materia.cuerpo}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>


            {
              <Accordion className="my-5">
                <Card> 
                  <Card.Header>
                    <CustomToggle eventKey="user">
                      {persona.nombre}
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="user">
                    <Card.Body>
                      {"Matricula: " + persona.id}
                      <br/>
                      {"Nombre: " + persona.nombre}
                      <br/>
                      {"Edad: " + persona.edad}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            }
          </div>
        </div>
      </div>
    </>
  );
};
