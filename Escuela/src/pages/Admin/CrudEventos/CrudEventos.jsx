import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";

export const CrudEventos = () => {
  const { eventos, escolaridades, alerta, setAlerta, handleGetEventos } = useAdmin();

  const [eventoData, setEventoData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    escolaridadID: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventoData({
      ...eventoData,
      [id]: value
    });
  };

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

  const handleAddNewEvento = async (e) => {
    e.preventDefault();

    console.log(eventoData)

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };


      if (eventoData.titulo && eventoData.descripcion && eventoData.fecha && eventoData.hora && eventoData.escolaridadID) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/eventos`,
          { evento: eventoData }, // Enviar eventoData dentro de un objeto con clave "evento"
          config
        );

        setAlerta({
          error: false,
          msg: data.msg,
        });
        handleGetEventos()
      } else {
        throw new Error('Por favor, completa todos los campos del evento');
      }
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg 6">
            <div>
              <h1>Eventos</h1>
              <p>Ver todos los eventos pasados y futuros</p>

              {alerta && (
                <p
                  className={`alert ${alerta.error ? "alert-danger" : "alert-success"
                    }`}
                >
                  {alerta.msg}
                </p>
              )}
            </div>
            {eventos.length === 0 ? (
              <p className="alert alert-danger">
                Aun no hay eventos dados de alta
              </p>
            ) : (
              <Accordion>
                {eventos?.map((evento) => (
                  <Accordion.Item key={evento.ID} eventKey={evento.ID}>
                    <Accordion.Header>
                      {evento.ID + "  " + evento.titulo}
                    </Accordion.Header>

                    <Accordion.Body>
                      <form className="" onSubmit={(e) => handleAddNewEvento()}>
                        {evento.descripcion}
                        {formatearFecha(evento.fecha) + " a las " + formatearHora(evento.hora)}
                        <br />
                        Este evento pertenece a: {DeXEscolaridad(evento.escolaridadID)}
                        <div className="d-flex gap-1 mt-2">
                          <button type="submit" className="btn bgPrimary">
                            Editar evento
                          </button>
                        </div>
                      </form>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>

          <div className="col-lg-6">
            <form
              className="formContainer"
              onSubmit={(e) => handleAddNewEvento(e)}
            >
              <h2>
                Ingresa la informacion que se solicita para dar de alta un
                evento
              </h2>
              <div className="d-flex flex-column">
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  id="titulo"
                  className="form-control"
                  value={eventoData.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="descripcion">Descripcion</label>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  value={eventoData.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  className="form-control"
                  value={eventoData.fecha}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  id="hora"
                  className="form-control"
                  value={eventoData.hora}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="hora">Escolaridad</label>
                <input
                  type="input"
                  id="escolaridadID"
                  className="form-control"
                  value={eventoData.escolaridadID}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="button mt-2">
                Guardar Evento
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
