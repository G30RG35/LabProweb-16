import React from "react";
import style from "../../pages/Eventos/Eventos.module.css";
import Fime from "./Fime.jpg";

export const VistaEvento = () => {
  const arrayDeObjetos = [
    {
      id: "1",
      titulo: "Evento 1",
      cuerpo: "Este es un evento.",
      fecha: "10/Enero/2023",
    },
    {
      id: "2",
      titulo: "Evento 2",
      cuerpo: "Este es un evento.",
      fecha: "10/Enero/2023",
    },
    {
      id: "3",
      titulo: "Evento 3",
      cuerpo: "Este es un evento.",
      fecha: "10/Enero/2023",
    },
  ];

  return (
    <>
      {arrayDeObjetos.map((evento) => (
        <div className={`${style.divEvento} container`} key={evento.id}>
          <h1>{evento.titulo}</h1>
          <h6 className="fw-light">{evento.fecha}</h6>
          <p>{evento.cuerpo}</p>
          <img style={{ width: "100%", height: "auto" }} src={Fime} alt="" />
        </div>
      ))}
    </>
  );
};
