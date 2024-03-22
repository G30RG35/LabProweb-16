import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Header = () => {
  const { auth, logOut } = useAuth();

  return (
    <>
      <div className='headerNav shadow'>
        <div className="border-bottom">
          <header className="d-flex flex-wrap justify-content-center py-3 container">
            <Link
              to="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <svg className="bi me-2" width="40" height="32">
                <use href="#bootstrap"></use>
              </svg>
              <span className="fs-4">Logo</span>
            </Link>

            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/eventos" className="nav-link">
                  Eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/nosotros" className="nav-link">
                  Nosotros
                </Link>
              </li>
              {!auth.ID ? (
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary">
                    Iniciar Sesión
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button 
                    onClick={() => {
                      logOut()
                    }}
                    className="btn btn-danger"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              )}
              
            </ul>
          </header>
        </div>
      </div>
    </>
  );
};
