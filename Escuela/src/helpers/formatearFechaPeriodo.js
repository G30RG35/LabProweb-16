const formatearFechaPeriodo = (fecha) => {
    const fechaNew = new Date(fecha);
    const monthNum = fechaNew.getMonth() + 1;

    let month = '';

    switch (monthNum) {
        case 1: 
            month = "Enero";
            break;
        case 2: 
            month = "Febrero";
            break;
        case 3: 
            month = "Marzo";
            break;
        case 4: 
            month = "Abril";
            break;
        case 5: 
            month = "Mayo";
            break;
        case 6: 
            month = "Junio";
            break;
        case 7: 
            month = "Julio";
            break;
        case 8: 
            month = "Agosto";
            break;
        case 9: 
            month = "Septiembre";
            break;
        case 10: 
            month = "Octubre";
            break;
        case 11: 
            month = "Noviembre";
            break;
        case 12: 
            month = "Diciembre";
            break;
    }

    const year = fechaNew.getFullYear();
    return month + " " + year
}

export default formatearFechaPeriodo