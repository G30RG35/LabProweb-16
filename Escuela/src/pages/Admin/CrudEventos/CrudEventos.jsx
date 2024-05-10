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

  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    if (editingEventId !== null) {
      const evento = eventos.find(evento => evento.ID === editingEventId);
      setEventoData({
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        fecha: evento.fecha,
        hora: evento.hora,
        escolaridadID: evento.escolaridadID.toString() // Convertir a cadena
      });
    } else {
      setEventoData({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        escolaridadID: ''
      });
    }
  }, [editingEventId, eventos]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventoData({
      ...eventoData,
      [id]: value
    });
  };

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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

    return `${horas.toString().padStart(2, '0')}:${minutos} ${periodo}`;
  }

  function DeXEscolaridad(id) {
    const escolaridad = escolaridades.find(item => item.ID === id);
    return escolaridad ? escolaridad.nombre : "";
  }

  const handleAddNewEvento = async (e) => {
    e.preventDefault();

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
          { evento: eventoData },
          config
        );

        setAlerta({
          error: false,
          msg: data.msg,
        });
        handleGetEventos();
      } else {
        throw new Error('Por favor, completa todos los campos del evento');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEvento = async (e, eventoId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (eventoData.titulo && eventoData.descripcion && eventoData.fecha && eventoData.hora && eventoData.escolaridadID) {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/eventos/${eventoId}`,
          {
            evento: {
              ...eventoData,
              fecha: formatearFecha(eventoData.fecha)
            }
          },
          config
        );

        setAlerta({
          error: false,
          msg: data.msg,
        });
        handleGetEventos();
        setEditingEventId(null);
      } else {
        throw new Error('Por favor, completa todos los campos del evento');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEvento = async (eventoId) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/eventos/${eventoId}`,
        config
      );

      setAlerta({
        error: false,
        msg: data.msg,
      });
      handleGetEventos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
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
                      {editingEventId === evento.ID ? (
                        <form className="" onSubmit={(e) => handleEditEvento(e, evento.ID)}>
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
                            <label htmlFor="escolaridadID">Escolaridad</label>
                            <select
                              id="escolaridadID"
                              className="form-control"
                              value={eventoData.escolaridadID}
                              onChange={handleChange}
                            >
                              <option value="">Selecciona una escolaridad</option>
                              {escolaridades.map(escolaridad => (
                                <option key={escolaridad.ID} value={escolaridad.ID}>{escolaridad.nombre}</option>
                              ))}
                            </select>
                          </div>

                          <div className="d-flex gap-1 mt-2">
                            <button type="submit" className="btn bgPrimary">
                              Guardar evento
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>
                              Cancelar
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          {evento.descripcion}
                          {formatearFecha(evento.fecha) + " a las " + formatearHora(evento.hora)}
                          <br />
                          Este evento pertenece a: {DeXEscolaridad(evento.escolaridadID)}
                          <div className="d-flex gap-1 mt-2">
                            <button type="button" className="btn bgPrimary" onClick={() => setEditingEventId(evento.ID)}>
                              Editar evento
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteEvento(evento.ID)}>
                              Eliminar evento
                            </button>
                          </div>
                        </>
                      )}
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
                <label htmlFor="escolaridadID">Escolaridad</label>
                <select
                  id="escolaridadID"
                  className="form-control"
                  value={eventoData.escolaridadID}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una escolaridad</option>
                  {escolaridades.map(escolaridad => (
                    <option key={escolaridad.ID} value={escolaridad.ID}>{escolaridad.nombre}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="button mt-2">
                Crear Evento
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
