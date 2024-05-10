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
    
    if(user) {
      setAuth(user)
      navigate('/');
    }
  }

  const comprobarInfo = useCallback(() => {
    return !ID || password === ''
  }, [ID, password]);

  useEffect(() => {
    comprobarInfo()
  }, [ID, password])

  
  return (
    <>
      <div className="d-flex align-items-center py-5 bg-body-tertiary">
        <main className="form-signin mx-auto my-auto">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
          }}
            className="formLogin"
          >
            <h1 className="fs-2 fw-bold text-primary mb-2 fw-normal">Iniciar Sesión</h1>
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
                min={0}
              />
              <label htmlFor="floatingInput">Numero de Estudiante</label>
            </div>
            <div className="form-floating mt-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value) }
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button 
              className="btn btn-primary w-100 py-2 mt-4" 
              type="submit"
              disabled={comprobarInfo()}
            >
              Iniciar Sesión
            </button>
            <p className="mt-2">En caso de haber olvidado su contraseña, favor de avisar al area administrativa de la institucion para solicitar un cambio de contraeña</p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Login
