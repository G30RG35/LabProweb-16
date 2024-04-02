import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Header = () => {
  const { auth, logOut } = useAuth();

  return (
    <>
      <div className='headerNav shadow'>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <header className="d-flex flex-wrap justify-content-between container">
            <Link
              to="/"
              className="navbar-brand"
            >
              <span className="fs-4">LOGO</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
              <ul className="navbar-nav column-gap-2">
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
            </div>
          </header>
        </div>
      </div>
    </>
  );
};
