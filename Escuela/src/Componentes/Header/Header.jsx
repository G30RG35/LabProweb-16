import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import NavAdmin from '../NavAdmin/NavAdmin';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isAdmin, setIsAdmin] = useState([])
  const [isAlumno, setIsAlumno] = useState([])
  const [isMaestro, setIsMaestro] = useState([])
  const { auth, logOut } = useAuth();
  
  console.log(auth)

  useEffect(() => {
    setIsAdmin(auth?.roles?.filter(rol => rol === "3"))
    setIsAlumno(auth?.roles?.filter(rol => rol === "1"))
    setIsMaestro(auth?.roles?.filter(rol => rol === "2"))
  }, [auth])

  console.log(isAdmin)

  return (
    <>
      <div className='headerNav shadow'>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          <header className="d-flex flex-wrap justify-content-between container">
            <Link
              to="/"
              className="navbar-brand"
            >
              <span className="fs-4 text-light fw-bold">IEI School</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
              <ul className="navbar-nav column-gap-2">
                {isAdmin?.length > 0 ? (
                  <NavAdmin />
                ) : (
                  <>
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
                  </>
                )}
                {isAlumno?.length > 0 && (
                  <li className="nav-item">
                    <Link to="/alumno" className="nav-link">
                      Perfil
                    </Link>
                  </li>
                )}
                {isMaestro?.length > 0 && (
                  <li className="nav-item">
                    <Link to="/maestro" className="nav-link">
                      Clases
                    </Link>
                  </li>
                )}
                
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
