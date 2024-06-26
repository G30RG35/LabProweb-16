import { Link } from 'react-router-dom'
import styles from './Admin.module.css'
import TarjetaSeccion from "../../Componentes/TarjetaSeccion/TarjetaSeccion"

const lstOpciones = [
  {
    id: 1,
    nombre: "Periodos", 
    url: "periodos",
    info: "Ver, editar o eliminar los periodos de la instutucion"
  },
  {
    id: 2,
    nombre: "Salones", 
    url: "salones",
    info: "Ver, editar o eliminar los salones de la instutucion"
  },
  {
    id: 3,
    nombre: "Grupos", 
    url: "grupos",
    info: "Ver, editar o eliminar los grupos de la instutucion"
  },
  {
    id: 4,
    nombre: "Materias", 
    url: "materias",
    info: "Ver, editar o eliminar los materias de la instutucion", 
  },
  {
    id: 5,
    nombre: "Asignacion Maestro - Clase", 
    url: "clase-maestro",
    info: "Ver, editar o eliminar grupos y asignar a los maestros a un grupo"
  }
]

const Admin = () => {
  return (
    <div className='container my-5'>
      <h1>Administración</h1>
      <div className='row'>
        <div className={`col-lg-7 p-4 my-2 ${styles.seccionOpciones}`}>
          <h2 className='text-light fw-bold'>Lista de opciones</h2>
          <div className='d-flex gap-4 mt-3 flex-column'>
            {lstOpciones.map(opcion => (
              <div key={opcion.id} className={`text-light border-top pt-3 ${styles.opcionTarjeta}`}>
                <h3 className='fw-regular fs-4'>{opcion.nombre}</h3>
                <p className='m-0'>{opcion.info}</p>
                <a href={`/admin/${opcion.url}`} className='btn btn-primary mt-1'>Comenzar</a>
              </div>
            ))}
          </div>
          
        </div>

        <div className={`col-lg-5 ${styles.listadoOpciones}`}>
          <TarjetaSeccion 
            nombre={'maestros'}
          />
          <TarjetaSeccion 
            nombre={'alumnos'}
          />
          <TarjetaSeccion 
            nombre={'eventos'}
          />

          <div className='bg-secondary rounded text-center text-light py-4 px-5'>
            <h4>Reporte</h4>
            <p>Ingrese para poder ver un promedio del periodo actual</p>
            <Link to={`/admin/reportes/calificaciones`} className='btn bgPrimary'>Ver reporte</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin