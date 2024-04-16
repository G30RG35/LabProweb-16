import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const NavAdmin = () => {
    const { pathname } = useLocation();

    return (
        <>
            <li className="nav-item">
                <Link to="/admin" className={`nav-link ${pathname === '/admin' && 'active'}`}>
                    Inicio
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/alumnos" className={`nav-link ${pathname === '/admin/alumnos' && 'active'}`}>
                    Alumnos
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/maestros" className={`nav-link ${pathname === '/admin/maestros' && 'active'}`}>
                    Maestros
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/admin" className={`nav-link ${pathname === '/admin/admin' && 'active'}`}>
                    Administradores
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/eventos" className={`nav-link ${pathname === '/admin/eventos' && 'active'}`}>
                    Eventos
                </Link>
            </li>
        </>
    )
}

export default NavAdmin