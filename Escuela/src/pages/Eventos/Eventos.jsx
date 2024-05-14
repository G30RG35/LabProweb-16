import React, { useEffect } from "react";
import style from "./Eventos.module.css";
import Card from 'react-bootstrap/Card';
import useApp from "../../hooks/useApp";

export const Eventos = () => {
  const { eventos, escolaridades } = useApp();

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
      <Card>
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
      <div className={`${style.divConteiner} container my-5`}>
        <div className={`${style.Rowreverse} row`}>
          <div className={`col-md-8 `}>
            <div className={`d-flex gap-4 justify-content-center flex-column`}>
              {eventos.map((evento, index) => (
                <CardComponent key={index} data={evento} />
              ))}

            </div>
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
