import { Link } from 'react-router-dom';
import styles from './Index.module.css';
import Carousel from '../../Componentes/Carousel/Carousel'

const Index = () => {
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

      <div className="container my-5 bg-light p-5 rounded-3 shadow-lg">
        <h2 className='text-primary fw-bold'>Solicita informacion</h2>
        <p>Conoce más acerca de nuestro modelo educativo para tus hijos</p>
        <form>
          <div className="row g-2">
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="nombre">Nombre</label>
              <input type="text" id='nombre' className='form-control' placeholder='Nombre' />
            </div>
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="apellidos">Apellido(s)</label>
              <input type="text" id='apellidos' className='form-control' placeholder='Apellido(s)' />
            </div>
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="email">Correo</label>
              <input type="email" id='email' className='form-control' placeholder='Ej. correo@gmail.com' />
            </div>
            <div className="col-md-6">
              <label className='fw-medium fs-6 mb-1' htmlFor="numero">Numero de celular</label>
              <input type="number" id='numero' className='form-control' placeholder='Ej. 8110290000' />
            </div>
          </div>

          <button className='mt-2 btn btn-md fw-bold btn-primary'>Enviar Solicitud</button>
        </form>
      </div>
    </div>
  )
}

export default Index