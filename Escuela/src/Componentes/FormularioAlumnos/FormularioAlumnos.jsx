import { useState, useEffect } from 'react';
import styles from './FormularioAlumnos.module.css'
import generatePSWD from '../../helpers/generarPassword';
import * as XLSX from 'xlsx/xlsx.mjs';
import TableForm from '../TableForm/TableForm';
import useAdmin from '../../hooks/useAdmin';

const FormularioAlumnos = () => {
    const [file, setFile] = useState(null)
    const [infoExel, setInfoExcel] = useState([])
    const [password, setPassword] = useState(generatePSWD());

    const { handleSaveUser } = useAdmin();

    const handleSetPassword = () => {
        const newPassword = generatePSWD()
        setPassword(newPassword)
    }

    const excelToJson = async() => {
        const reader = new FileReader()

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const jData = []

            for(let i=0;i<sheetData.length;i++) {
                const dato = sheetData[i]
                jData.push(
                    {...dato, 
                    fechaNac : `${new Date(((dato.fechaNac - (25567 + 1)) * 86400 * 1000)).getFullYear() + '-' + (new Date(((dato.fechaNac - (25567 + 1)) * 86400 * 1000)).getMonth() + 1) + '-' + new Date(((dato.fechaNac - (25567 + 1)) * 86400 * 1000)).getDate()}`,
                    numero : `${dato.numero}`}
                )
            }

            setInfoExcel(jData)
        }

        reader.readAsArrayBuffer(file);
    }

    useEffect(() => {
        if(file) {
            excelToJson()
        }
    }, [file])

    return (
        <div className={`${styles.formContainer}`}>
            <h5>Subir Excel</h5>
            <div id='drop-area'>
                <label className="form-label" htmlFor="customFile">{file ? file.name : 'Selecciona un archivo excel'}</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} className="form-control w-100 h-100" id="customFile" accept='.xlsx, .xls' hidden />
            </div>

            {infoExel.length > 0 && (
                <TableForm 
                    infoExcel={infoExel}
                    handleSaveUser={handleSaveUser}
                />
            )}

            <h4 className='mt-3'>Ingresa la informacion para guardar la informacion del alumno</h4>
            <form className={`${styles.FormAlumno}`}>
                <div className="row gy-2">
                    <div className={`${styles.inputAlumno} col-md-6`}>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" placeholder='Nombre del alumno' />
                    </div>
                    <div className={`${styles.inputAlumno} col-md-6`}>
                        <label htmlFor="apellido">Apellido(s)</label>
                        <input type="text" id="apellido" placeholder='Apellido(s) del alumno' />
                    </div>
                    <div className={`${styles.inputAlumno} col-12`}>
                        <label htmlFor="fechaNac">Fecha de nacimiento</label>
                        <input type="date" id="fechaNac" />
                    </div>

                    <div className={`${styles.inputAlumno} col-md-6`}>
                        <label htmlFor="numero">Numero</label>
                        <input type="number" id="numero" placeholder='Numero' />
                    </div>

                    <div className={`${styles.inputAlumno} col-md-6`}>
                        <label htmlFor="correo">Correo</label>
                        <input type="text" id="correo" placeholder='Correo del alumno' />
                    </div>

                    <div className={`${styles.inputAlumno} col-12`}>
                        <label htmlFor="password">Contraseña<span>Contraseña generada de forma aleatoria</span></label>
                        <div className={`${styles.inputPassword}`}>
                            <input type="text" id="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
                            <button
                                onClick={() => handleSetPassword()}
                                type='button'
                                className={`${styles.btnChangePassword}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={`${styles.inputAlumno} col-12`}>
                        <label htmlFor="direccion">Direccion</label>
                        <input type="text" id="direccion" placeholder='Ej. Aragon 118, Privadas Villa Sol, Escobedo, Nuevo Léon' />
                    </div>
                </div>

                <div className={`${styles.btnSubmitContainer}`}>
                    <button type="submit" className={`${styles.btnSubmit}`}>Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default FormularioAlumnos