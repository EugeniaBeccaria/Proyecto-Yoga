// import react from 'react'
// import {useState, useEffect} from 'react'
import "../styles/LoginPage.css"
import Navbar from "../components/Navbar";

function Login(){
    return(
        <>
            <Navbar disable={true}/>
                <div className="form-box">
                    <form className="form">
                        <span className="title">INICIAR SESIÓN</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        <div className="form-container">
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Contraseña" />
                        </div>
                        <button>Sign up</button>
                    <div className="form-section">
                        <p>¿No tienes una cuenta? <a href="">Registrarse</a> </p>
                    </div>
                    </form>
                </div>
        </>
    )
}
export default Login