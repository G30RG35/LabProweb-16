import { Link } from 'react-router-dom';
import styles from './Index.module.css';
import Carousel from '../../Componentes/Carousel/Carousel'
import useApp from '../../hooks/useApp';
import { useState } from 'react';

const Index = () => {
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")
  const [numero, setNumero] = useState("")
  const [mensaje, setMensaje] = useState("")

  const { alerta, handleSendEmail } = useApp()

  return (
    <div>
      <Carousel />

      <div className=''>
        <div className='row'>
          <div className='col-md-6 p-5'>
            <div className='d-flex flex-column justify-content-center h-100'>
              <h2 className='fw-bold fs-1 text-primary'>¿Quiénes somos?</h2>
              <p className='fs-5'>Somos una <span className='text-primary fw-medium'>institucion</span> comprometidos con forjar a los estudiantes del futuro, somos una escuela que nos esforzamos por ofrecer la mejor educación a nuestros alumnos.</p>
              <p className='fs-5'>Tenemos a nuestra disposición una flotilla de maestros comprometidos con impartir la mejor educación a nuestros niños, a su vez contamos con un extenso catalogo de actividades dentro del plantel que los alumnos pueden realizar para desarrollar las habilidades tanto <span className='text-primary fw-medium'>academicas, deportivas y academicas</span></p>
            </div>
          </div>

          <div className='col-md-6 galeriaEscolar'>
            <div className='kinderDiv galeriaItem'>
              <div className='galeriaItem'>
                <h3>Kinder</h3>
              </div>
            </div>
            <div className='HighDiv'>
              <div className="galeriaItem">
                <h3>Secundaria</h3>
              </div>
            </div>
            <div className='ElementaryDiv'>
              <div className='galeriaItem'>
                <h3>Primaria</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.infoBg}`}>
        <div className={`${styles.bgBlur}`}>
          <div className={`container ${styles.infoBgText}`}>
            <h2 className='fw-bold border-bottom pb-3 fs-1'>Creando líderes sin fronteras</h2>
            <p className='fw-normal fs-4'>Nos renovamos como respuesta a los nuevos desafíos y objetivos de la educación moderna. Con proyectos enfocados al desarrollo integral de los alumnos, en espacios tanto cómodos como equipados para brindarles lo mejor en nuestras instalaciones.</p>
          </div> 
        </div>
      </div>

      <div className="container my-5 bg-light py-5 p-md-5 rounded-3 shadow-lg">
        <h2 className='text-primary fw-bold'>Solicita informacion</h2>
        <p>Conoce más acerca de nuestro modelo educativo para tus hijos</p>

        {alerta && (
          <p className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} text-uppercase fw-medium`}>{alerta.msg}</p>
        )}

        <form>
          <div className="row g-2">
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="nombre">Nombre</label>
              <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id='nombre' className='form-control' placeholder='Nombre' />
            </div>
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="apellidos">Apellido(s)</label>
              <input value={apellidos} onChange={e => setApellidos(e.target.value)} type="text" id='apellidos' className='form-control' placeholder='Apellido(s)' />
            </div>

            <div className="col-md-6">
              <div className="col-12">
                <label className='fw-medium fs-6 mb-1' htmlFor="email">Correo</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" id='email' className='form-control' placeholder='Ej. correo@gmail.com' />
              </div>
              <div className="col-12">
                <label className='fw-medium fs-6 mb-1' htmlFor="numero">Numero de celular</label>
                <input value={numero} onChange={e => setNumero(e.target.value)} type="number" id='numero' className='form-control' placeholder='Ej. 8110290000' />
              </div>
            </div>

            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" onChange={e => setMensaje(e.target.value)} className='form-control' rows={4}>{mensaje}</textarea>
            </div>
          </div>

          <button 
            className='mt-2 btn btn-md fw-bold btn-primary'
            type='button'
            onClick={() => handleSendEmail(nombre, apellidos, email, numero, mensaje)}
          >Enviar Solicitud</button>
        </form>
      </div>
    </div>
  )
}

export default Index