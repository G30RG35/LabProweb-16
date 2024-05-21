import GrupoLista from "../GrupoLista/GrupoLista";

const EscolaridadLista = ({ escolaridad, grupos, clases, setEscolaridadID, periodoID }) => {
    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-2'>
                <h3 className='m-0'>{escolaridad.nombre}</h3>
                <div className='d-flex gap-2'>
                    <button onClick={() => setEscolaridadID(escolaridad.ID)} className='btn btn-sm btn-dark'>Ver reporte</button>
                </div>
            </div>
            {grupos?.map(grupo => grupo.escolaridadID === escolaridad.ID && grupo.periodoID === +periodoID && (
                <GrupoLista 
                    key={grupo.ID}
                    grupo={grupo}
                    clases={clases}
                />
            ))}
        </div>
    )
}

export default EscolaridadLista