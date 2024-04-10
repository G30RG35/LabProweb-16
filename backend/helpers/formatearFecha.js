const formatearFecha = (fecha) => {
    const fechaNew = new Date(fecha)
    let mes = fechaNew.getMonth()+1;
    let dia = fechaNew.getDate();
    let ano = fechaNew.getFullYear();

    if(dia<10) {
        dia='0'+dia;
    }
    if(mes<10) {
        mes='0'+mes;
    }

    return ano+"-"+mes+"-"+dia;
}

export default formatearFecha;