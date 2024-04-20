import styles from './TableForm.module.css'

const TableForm = ({infoExcel, handleSaveUser, tipo}) => {
    return (
        <>
            <button
                onClick={() => handleSaveUser(tipo, infoExcel)}
                className='button'
            >
                Guardar Lista
            </button>
            <div className={`${styles.tableFormContainer} mt-3`}>
                <div className={`${styles.scrollTable}`}>
                    <table className='table tablaForm table-hover table-dark'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Fecha Nacimiento</th>
                                <th>Numero</th>
                                <th>Correo</th>
                                <th>Direccion</th>
                            </tr>
                        </thead>

                        <tbody>
                            {infoExcel?.map(alumno => (
                                <tr key={alumno?.nombre + ' ' + alumno?.apellidos}>
                                    <td>{alumno?.nombre}</td>
                                    <td>{alumno?.apellidos}</td>
                                    <td>{alumno?.fechaNac}</td>
                                    <td>{alumno?.numero}</td>
                                    <td>{alumno?.correo}</td>
                                    <td className={`${styles.direccionTd}`}>{alumno?.direccion}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TableForm