import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import useAdmin from "../../../hooks/useAdmin";
import axios from "axios";
import { Link } from "react-router-dom";
import useApp from "../../../hooks/useApp";
import CloudinaryWidget from "../../../Componentes/CloudinaryWidget/CloudinaryWidget";

export const CrudEventos = () => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [escolaridadID, setEscolaridadID] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const { escolaridades, alerta, setAlerta } = useAdmin();
  const { eventos } = useApp()

  console.log(eventos)

  const handleAddNewEvento = async(e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const evento = {
      titulo, 
      descripcion, 
      fecha, 
      hora, 
      escolaridadID, 
      imageUrl
    }

    console.log(evento)

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/eventos`,
        {
          evento
        },
        config
      );

      setAlerta({
        error: false,
        msg: data.msg,
      });
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
                  className={`alert ${
                    alerta.error ? "alert-danger" : "alert-success"
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
              <div className="d-flex flex-column mt-2">
                <label htmlFor="titulo">Titulo</label>
                <input 
                  type="text" 
                  id="titulo" 
                  className="form-control" 
                  placeholder="Titulo del evento"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                />
              </div>

              <div className="d-flex flex-column mt-2">
                <label htmlFor="descripcion">Descripcion</label>
                <textarea 
                  className="form-control"
                  id="descripcion"
                  onChange={e => setDescripcion(e.target.value)}
                  rows={4}
                >{descripcion}</textarea>
              </div>

              <div className="d-flex flex-column mt-2">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" id="fecha" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} />
              </div>

              <div className="d-flex flex-column mt-2">
                <label htmlFor="hora">Hora</label>
                <input 
                  type="time" 
                  id="Hora" 
                  className="form-control" 
                  value={hora}
                  onChange={e => setHora(e.target.value)}
                />
              </div>
              
              <div className="d-flex flex-column mt-2">
                <label htmlFor="esc">Escolaridad</label>
                <select value={escolaridadID} onChange={e => setEscolaridadID(e.target.value)} id="esc" className="form-select">
                  <option value={0}>Seleccione un plan de estudios</option>
                  {escolaridades?.map(esc => (
                    <option value={esc.ID} key={esc.ID}>{esc.nombre}</option>
                  ))}
                </select>
              </div>

              {imageUrl === '' ? (
                <div className="d-flex flex-column mt-2">
                  <label htmlFor="">Seleccione una imagen</label>
                  <CloudinaryWidget 
                    setImagenUrl={setImageUrl}
                    completeBtn={true}
                  />
                </div>
              ) : (
                <img src={imageUrl} className="w-100  p-3" />
              )}
              

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
