import React from "react";
import style from "./Eventos.module.css";
import { Row, Col } from "react-bootstrap";
import { VistaEvento } from "../../Componentes/Eventos/VistaEvento";

export const Eventos = () => {
    return (
    <>
      <div className={`${style.divConteiner} container my-5`}>
        <div className={`${style.Rowreverse} row`}>
          <div className={`d-flex flex-column gap-4 col-12 col-md-8`}> 
            <VistaEvento />
          </div>
          <div className={`col-12 col-md-4`}>
            <div>
              <div className={`p-3 rounded bg-secondary text-light`}>
                <h2>Información general</h2>
                <div className="border-top pt-2">
                  <h3 className="fw-light fs-5">Fechas de inscripcion</h3>
                  <p>Informamos que en los periodos Agosto - Junio las inscripciones seran en todo el mes de julio</p>
                </div>
                
                <div className="border-top pt-2">
                  <h3 className="fw-light fs-5">Anuncios</h3>
                  <p>Durante el mes de junio se llevaran a cabo unas reparaciones en el tercer piso de la escuela, contamos con todas las medidas de seguridad para garantizar el bienestar de nuestros estudiantes y nuestros maestros</p>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
};
