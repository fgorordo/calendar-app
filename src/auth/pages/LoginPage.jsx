import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
}

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerRePassword: "",
}

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerRePassword, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email:loginEmail, password:loginPassword})
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerRePassword) {
      return Swal.fire("Error en registro" , "Las contraseñas no coinciden", "error");
    };
    startRegister({name: registerName, email: registerEmail, password: registerPassword});
  };

  useEffect(() => {
    if ( errorMessage !== null) {
      Swal.fire("Error en la autenticación", errorMessage, "error")
    }
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={onRegisterInputChange}
                value={registerName}
                name="registerName"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                onChange={onRegisterInputChange}
                value={registerEmail}
                name="registerEmail"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={onRegisterInputChange}
                value={registerPassword}
                name="registerPassword"
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                onChange={onRegisterInputChange}
                value={registerRePassword}
                name="registerRePassword"
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
