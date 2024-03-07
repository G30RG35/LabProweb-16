const getType = (valor) => {
    if(typeof valor === 'string') {
        return "'" + valor + "'"
    } else {
        return valor
    }
}

export default getType