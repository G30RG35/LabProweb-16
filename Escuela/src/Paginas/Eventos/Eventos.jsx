import React from "react";
import style from "./Eventos.module.css";
import { Row, Col } from "react-bootstrap";
import { VistaEvento } from "../../Componentes/Eventos/VistaEvento";

export const Eventos = () => {
  

  
    return (
    <>
      <div className={`${style.divConteiner} container`}>
        <div className={`${style.Rowreverse} row`}>
          <div className={`${style.separacion} col-12 col-md-8`}> 
            <VistaEvento />
          </div>
          <div className={`col-12 col-md-4`}>
            <div>
              <div className={`${style.InfoArea}`}></div>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
};
