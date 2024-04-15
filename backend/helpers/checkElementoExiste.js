const checkElementoExiste = async(object, name, attribute, value) => {
    const elemento = await object.getByElement(name, attribute, value)
    if(elemento.length > 0) {
        return true
    } else {
        return false
    }
}

export default checkElementoExiste;