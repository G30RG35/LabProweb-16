import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [ID, setID] = useState(null);
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const { handleLogin, alerta } = useApp()
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async() => {
    const user = await handleLogin(ID, password, remember)
    setAuth(user)

    navigate('/');
  }

  const comprobarInfo = useCallback(() => {
    return !ID || password === ''
  }, [ID, password]);

  useEffect(() => {
    comprobarInfo()
  }, [ID, password])
  
  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin mx-auto my-auto">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
          }}>
            <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
            <p>Ingrese los datos que se piden para iniciar sesión</p>

            {alerta && (
              <div className={`alert ${alerta.error ? 'alert-danger' : 'alert-primary'}`} role="alert">
                {alerta.msg}
              </div>
            )}

            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="Ej. 12345"
                onChange={(e) => setID(e.target.value)}
              />
              <label htmlFor="floatingInput">Numero de Estudiante</label>
            </div>
            <div className="form-floating mt-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
                onChange={e => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Recuerdame
              </label>
            </div>
            <button 
              className="btn btn-primary w-100 py-2" 
              type="submit"
              disabled={comprobarInfo()}
            >
              Iniciar Sesión
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login
