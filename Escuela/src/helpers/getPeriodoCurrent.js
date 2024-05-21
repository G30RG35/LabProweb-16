const getPeriodoCurrent = async(periodos) => {
    const now = Date.now()

    const current = await periodos?.filter(periodo => {
        const fechaInicio = new Date(periodo.fechaInicio).getTime()
        if((fechaInicio - now) < 0) {
            const fechaFin = new Date(periodo.fechaFin).getTime()
            if(fechaFin - now > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    })

    return current[0]?.ID
}

export default getPeriodoCurrent