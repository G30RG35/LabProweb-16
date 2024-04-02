import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export const Login = () => {
  const Loguear=()=>{
    window.localStorage.setItem("rol",3)
  }
  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin mx-auto my-auto">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Numero de Estudiante</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button onClick={Loguear} className="btn btn-primary w-100 py-2" type="submit">
              Log in
            </button>
            <button  className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
          </form>
        </main>
      </div>
    </>
  );
};
