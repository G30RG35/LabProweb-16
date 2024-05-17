import { useEffect, useState } from 'react'
import useAdmin from '../../hooks/useAdmin'
import GrupoLista from '../../Componentes/GrupoLista/GrupoLista';
import EscolaridadLista from '../../Componentes/EscolaridadLista/EscolaridadLista';

const ReporteCalificaciones = () => {
    const [escolaridadID, setEscolaridadID] = useState(null);
    const [promedio, setPromedio] = useState(null);

    const { escolaridades, clases, grupos, clasesAlu, handleGetClasesAlu } = useAdmin();

    const handleGetClases = async() => {
        await handleGetClasesAlu();
    }

    const handleGetData = () => {
        let total = 0;
        let i = 0;
        let apro = 0;
        let rep = 0;

        if(clasesAlu.length>0) {
            for(i; i<clasesAlu.length;i++) {
                total += clasesAlu[i]?.calificacion

                if(clasesAlu[i]?.calificacion >= 70) {
                    apro++
                } else {
                    rep++
                }
            }
        }

        setPromedio({
            promedio : (total / i).toFixed(2), 
            aprobados : apro, 
            reprobados : rep
        });
    }

    useEffect(() => {
        handleGetClases()
    }, [])

    return (
        <div className='container my-4'>
            <h1>Reporte de calificaciones</h1>

            <div className="row g-5">
                <div className="col-md-6">
                    {escolaridades?.map(escolaridad => (
                        <EscolaridadLista 
                            key={escolaridad.ID}
                            escolaridad={escolaridad}
                            grupos={grupos}
                            clases={clases}
                            setEscolaridadID={setEscolaridadID}
                        />
                    ))}
                </div>

                <div className="col-md-6">
                    <div className='bg-secondary p-4 rounded text-light shadow'>
                        {escolaridadID ? (
                            <>
                                <h4>Información por escolaridad</h4>
                            </>
                        ) : (
                            <>
                                <h4>Información general</h4>
                                <div>
                                    
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReporteCalificaciones