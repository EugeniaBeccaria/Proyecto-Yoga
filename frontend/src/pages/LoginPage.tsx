// import react from 'react'
// import {useState, useEffect} from 'react'
import "../styles/LoginRegisterPage.css"
import {FaEnvelope, FaLock} from "react-icons/fa";

function Login(){
    return(
        <>
                <div className="form-box">
                    <form className="form">
                        <span className="title">INICIAR SESIÓN</span>
                        <span className="subtitle">Ingrese a su cuenta para acceder a sus clases y talleres</span>
                        <div className="form-container">
                            <div className="login-input">
                                <label>USUARIO</label>
                                <div className="caja-input">
                                    <FaEnvelope className="icon"/>
                                    <input type="email" className="input" placeholder="usuario@exapmle.com" />
                                </div>
                            </div>

                            <div className="login-input">
                                <label>CONTRASEÑA</label>
                                <div className="caja-input">
                                    <FaLock className="icon"/>
                                    <input type="password" className="input" placeholder="********" />
                                </div>
                            </div>
                        </div>

                        <button>Sign in</button>

                    <div className="form-section">
                        <p>¿No tienes una cuenta? <a href="/RegisterPage">Registrarse</a> </p>
                    </div>
                    </form>
                </div>
        </>
    )
}
export default Login

