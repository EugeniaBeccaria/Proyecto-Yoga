// import react from 'react'
// import {useState, useEffect} from 'react'
import "../styles/LoginPage.css"
import Navbar from "../components/Navbar";

function Register(){
    return(
        <>
            <Navbar disable={true}/>
                <div className="form-box">
                    <form className="form">
                        <span className="title">REGISTRARSE</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        <div className="form-container">
                            <input type="name" className="input" placeholder="Nombre completo" />                            
                            <input type="email" className="input" placeholder="Email" />
                            <input type="password" className="input" placeholder="Contraseña" />
                            <input type="password" className="input" placeholder="Repite tu contraseña" />
                        </div>
                        <button>Sign up</button>
                    <div className="form-section">
                        <p>¿Ya tienes una cuenta? <a href="/LoginPage">Iniciar sesión</a> </p>
                    </div>
                    </form>
                </div>
        </>
    )
}
export default Register