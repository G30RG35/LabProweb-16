import styles from '../../pages/Admin/Admin.module.css';
import { Link } from 'react-router-dom';

const TarjetaSeccion = ({nombre}) => {
    return (
        <div className={`${styles.tarjetaSecciones} shadow`}>
            <h3>{nombre}</h3>
            <p className='mb-3'>Ver, crear, editar o eliminar los {nombre} de la institucion</p>
            <Link to={`/admin/${nombre}`} className={`${styles.button}`}>Saber más</Link>
        </div>
    )
}

export default TarjetaSeccion