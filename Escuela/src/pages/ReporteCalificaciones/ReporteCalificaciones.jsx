import { useEffect, useState, useRef } from 'react'
import useAdmin from '../../hooks/useAdmin'
import GrupoLista from '../../Componentes/GrupoLista/GrupoLista';
import EscolaridadLista from '../../Componentes/EscolaridadLista/EscolaridadLista';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const ReporteCalificaciones = () => {
    const [escolaridadID, setEscolaridadID] = useState(null);
    const [escolaridad, setEscolaridad] = useState(null);
    const [data, setData] = useState(null);
    const [ancho, setAncho] = useState(0)

    const ref = useRef(null);

    const { escolaridades, clases, grupos, clasesAlu, handleGetClasesAlu } = useAdmin();

    const handleGetClases = async() => {
        await handleGetClasesAlu();
    }

    const handleInfoReporte = () => {
        let sumaCal = 0
        let i = 0
        let j = 0
        let k = 0
        let gruposCount = 0
        let clasesCount = 0
        let alumnosCount = 0
        let promPerClase = []

        let apr = 0;
        let rep = 0

        let maxPerGrupo = []
        let minPerGrupo = []

        const gruposEsc = grupos?.filter(grupo => grupo.escolaridadID === +escolaridadID)
        if(gruposEsc.length > 0) {
            for(i=0;i<gruposEsc.length;i++) {
                const clasesGru = clases?.filter(clase => clase.grupoID === gruposEsc[i].ID)
                if(clasesGru.length > 0) {
                    for(j=0;j<clasesGru.length;j++) {
                        let countPerClase = 0
                        let alumnosCountClase = 0

                        const clasesAluGru = clasesAlu?.filter(clase => {
                            const grupoMatch = +clase.grupoID === +clasesGru[j].grupoID
                            const materiaMatch = +clase.materiaID === +clasesGru[j].materiaID
                            const maestroMatch = +clase.maestroID === +clasesGru[j].usuarioID
        
                            return grupoMatch && materiaMatch && maestroMatch
                        })

                        
        
                        for(k=0;k<clasesAluGru.length;k++) {
                            sumaCal += clasesAluGru[k].calificacion
                            countPerClase += clasesAluGru[k].calificacion
                            alumnosCountClase++
        
                            if(clasesAluGru[k].calificacion >= 70) {
                                apr++
                            } else {
                                rep++
                            }
        
                            alumnosCount++
                        }

                        promPerClase = [
                            ...promPerClase, 
                            {
                                Name : "ID: " + clasesGru[j].grupoID + "" + clasesGru[j].materiaID + "" + clasesGru[j].usuarioID,
                                promedio : (countPerClase / alumnosCountClase),
                                count : alumnosCountClase
                            }
                        ]
        
                        maxPerGrupo[j] = clasesAluGru.reduce(function(a, b) {
                            return a.calificacion > b.calificacion ? a: b
                        })
                        
                        minPerGrupo[j] = clasesAluGru.reduce(function(a, b) {
                            return a.calificacion < b.calificacion ? a: b
                        })
        
                        clasesCount++
                    }
                }
    
                gruposCount++
            }
        }

        let max

        if(maxPerGrupo.length > 0) {
            max = maxPerGrupo.reduce(function(a, b) {
                return a.calificacion > b.calificacion ? a: b
            })
        }

        let min

        if(minPerGrupo.length > 0) {
            min = minPerGrupo.reduce(function(a, b) {
                return a.calificacion < b.calificacion ? a: b
            })
        }

        const promedio = sumaCal / alumnosCount

        setData({
            promedio : promedio.toFixed(2),
            alumnosCount, 
            clasesCount, 
            gruposCount, 
            aprobados : apr, 
            reprobados : rep, 
            max, 
            min, 
            promPerClase
        })
    }

    useEffect(() => {
        handleGetClases()
    }, [])

    useEffect(() => {
        handleInfoReporte()

        const escolaridadNew = escolaridades?.filter(esc => esc.ID === +escolaridadID)
        setEscolaridad(escolaridadNew[0])
    }, [escolaridadID])

    useEffect(() => {
        setAncho(ref.current ? ref.current.offsetWidth : 0);
    }, [ref.current]);

    console.log(ref.current)

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
                                <h4 className='fw-bold m-0 fs-2 text-center'>{escolaridad?.nombre}</h4>
                                <div ref={ref}>
                                    <div>
                                        <p className='mb-1 fw-bold fs-5'>Alumnos: <span className='fw-normal'>{data?.alumnosCount}</span></p>
                                        <br />
                                        <p className='mb-1 fw-bold fs-5'>No. Aprobados: <span className='fw-normal'>{data?.aprobados}</span></p>
                                        <p className='mb-1 fw-bold fs-5'>Porcentaje de aprobación: <span className='fw-normal'>{((data?.aprobados / data?.alumnosCount) * 100).toFixed(2)}%</span></p>
                                        <br />
                                        <p className='mb-1 fw-bold fs-5'>No. Reprobados: <span className='fw-normal'>{data?.reprobados}</span></p>
                                        <p className='mb-1 fw-bold fs-5'>Porcentaje de aprobación: <span className='fw-normal'>{((data?.reprobados / data?.alumnosCount) * 100).toFixed(2)}%</span></p>
                                        <br />
                                        <p className='mb-1 fw-bold fs-5'>Calificación más alta: <span className='fw-normal'>{data?.max?.calificacion}</span></p>
                                        <p className='mb-1 fw-bold fs-5'>Calificación más baja: <span className='fw-normal'>{data?.min?.calificacion}</span></p>
                                    </div>

                                    <p className='mb-1 fw-bold fs-5'>Promedio: <span className='fw-normal'>{data?.promedio}</span></p>

                                    <div className='text-dark mt-3'>
                                        <p className='text-light text-center mt-3 fw-light'>Grafica por clase</p>
                                        <BarChart 
                                            width={ancho}
                                            height={400}
                                            data={data?.promPerClase}
                                            margin={{
                                                right: 30,
                                                left: 0,
                                            }}
                                        >
                                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                            <XAxis dataKey="Name" stroke="#fff" />
                                            <YAxis stroke="#fff"/>
                                            <Tooltip stroke="#000" />
                                            <Legend />
                                            <Bar dataKey="promedio" fill='#8884d8' />
                                        </BarChart>
                                    </div>
                                </div>
                                
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