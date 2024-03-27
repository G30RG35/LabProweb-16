import styles from './Admin.module.css'
import TarjetaSeccion from "../../Componentes/TarjetaSeccion/TarjetaSeccion"

const Admin = () => {
  return (
    <div className='container my-5'>
      <h1>Administración</h1>
      <div className='row'>
        <div className={`col col-lg-8 ${styles.seccionOpciones}`}>
          <h2 className='text-light'>Lista de opciones</h2>
        </div>

        <div className={`col col-lg-4 ${styles.listadoOpciones}`}>
          <TarjetaSeccion 
            nombre={'maestros'}
          />
          <TarjetaSeccion 
            nombre={'alumnos'}
          />
          <TarjetaSeccion 
            nombre={'eventos'}
          />
        </div>
      </div>
    </div>
  )
}

export default Admin