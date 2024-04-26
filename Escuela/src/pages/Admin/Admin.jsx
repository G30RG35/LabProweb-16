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
    nombre: "Grupos", 
    url: "grupos",
    info: "Ver, editar o eliminar los grupos de la instutucion"
  },
  {
    id: 3,
    nombre: "Materias", 
    url: "materias",
    info: "Ver, editar o eliminar los materias de la instutucion", 
  },
  {
    id: 4,
    nombre: "Asignacion Maestro - Clase", 
    url: "clase-maestro",
    info: "Ver, editar o eliminar grupos y asignar a los maestros a un grupo"
  },
  {
    id: 5,
    nombre: "Asignacion Alumno - Clase",
    url: "clase-alumno",
    info: "Ver, editar o eliminar grupos y asignar a los alumno a un grupo"
  },
]

const Admin = () => {
  return (
    <div className='container my-5'>
      <h1>Administración</h1>
      <div className='row'>
        <div className={`col-lg-7 p-4 ${styles.seccionOpciones}`}>
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
        </div>
      </div>
    </div>
  )
}

export default Admin