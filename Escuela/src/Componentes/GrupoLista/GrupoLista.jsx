import { Link } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { Accordion } from 'react-bootstrap';

const GrupoLista = ({ grupo, clases }) => {
    const { clasesAlu } = useAdmin()

    const handleGetData = (grupoID, materiaID, usuarioID) => {
        const claseAlu = clasesAlu?.filter(clase => clase.grupoID === +grupoID && clase.materiaID === +materiaID && clase.maestroID === +usuarioID)
        
        let total = 0;
        let i = 0;
        let apro = 0;
        let rep = 0;

        if(claseAlu.length>0) {
            for(i; i<claseAlu.length;i++) {
                total += claseAlu[i]?.calificacion

                if(claseAlu[i]?.calificacion >= 70) {
                    apro++
                } else {
                    rep++
                }
            }
        }

        return {
            promedio : (total / i).toFixed(2), 
            aprobados : apro, 
            reprobados : rep
        };
    }

    const handleGetProm = (grupoID, materiaID, usuarioID) => {
        const { promedio } = handleGetData(grupoID, materiaID, usuarioID)
        return promedio;
    }
    const handleGetApro = (grupoID, materiaID, usuarioID) => {
        const { aprobados } = handleGetData(grupoID, materiaID, usuarioID)
        return aprobados;
    }
    const handleGetRep = (grupoID, materiaID, usuarioID) => {
        const { reprobados } = handleGetData(grupoID, materiaID, usuarioID)
        return reprobados;
    }

    return (
        <div className='mb-4' key={grupo.ID}>
            <h4 className='fw-medium fs-6'>Grupo: {grupo.ID}</h4>
            <Accordion>
                {clases?.map(clase => (
                    <Accordion.Item eventKey={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID} key={clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID}>
                        <Accordion.Header>
                            <p className='m-0'>ID: {clase.grupoID + "" + clase.materiaID + "" + clase.usuarioID}</p>
                        </Accordion.Header>

                        <Accordion.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className='m-0 fw-bold'>Materia: <span className='fw-normal'>{clase.materia}</span></p>
                                    <p className='m-0 fw-bold'>Maestro: <span className='fw-normal'>{clase.maestro}</span></p>
                                    <p className='m-0 fw-bold'>Grupo: <span className='fw-normal'>{clase.grupoID}</span></p>
                                    <Link className='w-100 btn btn-sm btn-primary mt-2'>Ver grupo</Link>
                                </div>

                                <div className="col-md-6">
                                    <p className='m-0 fw-bold'>Promedio: <span className='fw-normal'>{handleGetProm(clase.grupoID, clase.materiaID, clase.usuarioID)}</span></p>
                                    <p className='m-0 fw-bold'>Alumnos aprobados: <span className='fw-normal'>{handleGetApro(clase.grupoID, clase.materiaID, clase.usuarioID)}</span></p>
                                    <p className='m-0 fw-bold'>Alumnos reprobados: <span className='fw-normal'>{handleGetRep(clase.grupoID, clase.materiaID, clase.usuarioID)}</span></p>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}

export default GrupoLista