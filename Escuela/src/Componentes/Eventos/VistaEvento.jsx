import React from "react";
import style from "../../pages/Eventos/Eventos.module.css";
import Fime from "./Fime.jpg";
import useApp from "../../hooks/useApp";
import formatearFecha from "../../helpers/formatearFecha";

export const VistaEvento = () => {
  const { eventos } = useApp()

  return (
    <>
      {eventos?.map((evento) => (
        <div className={`container bg-light p-4 rounded shadow row`} key={evento.id}>
          <div className={evento.imageUrl ? "col-lg-7" : "col-12"}>
            <h1 className="text-primary">{evento.titulo}</h1>
            <p className="fw-bold mb-0">Fecha: <span className="fw-light">{formatearFecha(evento.fecha)}</span></p>
            <p className="fw-bold mb-0">Hora: <span className="fw-light">{evento.hora}</span></p>
            <p>{evento.descripcion}</p>
          </div>
          
          <div className="col-lg-5 d-flex align-items-center">
            <img src={evento.imageUrl} alt="" className="w-100" />
          </div>
        </div>
      ))}
    </>
  );
};
