import React, { useEffect } from "react";
import style from "./Eventos.module.css";
import { Row, Col } from "react-bootstrap";
import useAdmin from "../../hooks/useAdmin";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Eventos = () => {
  const { eventos, escolaridades, alerta, setAlerta } = useAdmin();

  useEffect(() => {
    console.log(escolaridades);
  }, [escolaridades]);

  function formatearFecha(fechaString) {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${dia} de ${mes} de ${año}`;
  }

  function formatearHora(horaString) {
    const hora = horaString.split(':');
    let horas = parseInt(hora[0]);
    const minutos = hora[1];
    let periodo = 'AM';

    if (horas >= 12) {
      periodo = 'PM';
      horas -= 12;
    }

    if (horas === 0) {
      horas = 12;
    }

    return `${horas}:${minutos} ${periodo}`;
  }

  function DeXEscolaridad(id) {
    for (let index = 0; index < escolaridades.length; index++) {
      if (id == escolaridades[index].ID) {
        return escolaridades[index].nombre;
      }
    }
  }



  function CardComponent({ data }) {
    return (
      <Card className={`m-4`} style={{ width: '80%' }}>
        {/* <Card.Img variant="top" src={data.image} /> */}
        <Card.Body>
          <Card.Title>{data.titulo}</Card.Title>
          <Card.Text>{data.descripcion}
            {formatearFecha(data.fecha) + " a las " + formatearHora(data.hora)}</Card.Text>
          <br />
          Este evento pertenece a: {DeXEscolaridad(data.escolaridadID)}
        </Card.Body>
      </Card>
    );
  }



  return (
    <>
      <div className={`${style.divConteiner} container`}>
        <div className={`${style.Rowreverse} row`}>
          <div className={`${style.separacion} col-12 col-md-8 `}>
            <div className={`d-flex justify-content-center flex-column`}>

              {eventos.map((evento, index) => (
                <CardComponent key={index} data={evento} />
              ))}

            </div>
          </div>
          <div className={`col-12 col-md-4`}>
            <div>
              <div className={`${style.InfoArea}`}>
                <p className={`m-4`}>
                  Te invitamos a compañarnos en todos los eventos de nuestra institucion recuerda que tu presencia es escencial para el correcto desarrollo de nuestos hijos, Te esperamos!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
