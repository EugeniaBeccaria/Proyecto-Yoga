import "../styles/LoginRegisterPage.css"
import axios from 'axios';

import { useState, useContext } from 'react'
import { AuthContext } from "../context/AuthContext.tsx";
import {FaUser, FaEnvelope, FaLock} from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import SocialButton from '../components/SocialButton';
import { useGoogleLogin } from '@react-oauth/google';
import googleLogo from '/LogoGoogle.png';

import type { Error } from "../types/error.type";

interface User {
    name: string;
    email: string;
    password: string;
    passwordRepeat:string;
}

function Register(){
    const { login } = useContext(AuthContext);
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        name:'',
        email:'',
        password:'',
        passwordRepeat:''
    })
    
    const Navigate = useNavigate()

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const passwordRepeat = (form.elements.namedItem('passwordRepeat') as HTMLInputElement).value;
        setUser({
            name: name,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat
        });
        
        if (password === passwordRepeat) { 
            sendFormRegister(name, email, password) 
        } else {
            setError({ error: true, message: 'Las contraseñas no coinciden' })
            setLoading(false); 
        }
    }

async function sendFormRegister(name:string, email:string, password:string) {
        try {
            const response = await axios.post("http://localhost:3000/api/users?role=client", {
                name: name,
                email: email,
                password: password
            })

            setLoading(false)
            setSuccess(true)
            console.log(response.data.message, '// Datos:', response.data.data)
            setTimeout(() => {
                Navigate('/LoginPage')
            }, 1500);
        }
        catch (err) {
            setLoading(false)
            setSuccess(false)
            console.log('Error: ', err)
            if (axios.isAxiosError(err)) {
                setError({ error: true, message: err.response?.data.errors[0].msg || err.message })
            } else {
                setError({ error: true, message: 'Error del servidor, intente más tarde' })
            }
        }
        finally {
            setLoading(false)
            setUser({
                name: '',
                email: '',
                password: '',
                passwordRepeat: ''
            })
        }
    }

const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log('Google login code:', codeResponse.code);
            setLoading(true);
            setError(null); 
            setSuccess(false);

            try {
                const response = await axios.post("http://localhost:3000/auth/google/login",
                    {
                        code: codeResponse.code
                    },
                    { withCredentials: true });

                const userData = response.data.user;

                console.log('Usuario logueado/registrado con Google, nombre: ', userData.name);

                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    login(userData); 
                }, 1300);

            } catch (err) {
                setLoading(false);
                if (axios.isAxiosError(err)) {
                    setError({ error: true, message: err.response?.data?.message || err.message }); 
                    console.log('Error del servidor (Google):', err.response?.data?.message || err.message);
                } else {
                    setError({ error: true, message: 'Error inesperado de Google' }); 
                    console.log('Error inesperado (Google):', err);
                }
            }
        },
        onError: (error) => {
            console.error('Google login error:', error);
            setError({ error: true, message: 'Error al iniciar sesión con Google' }); 
        }
    });

    return(
        <>
            <div id="top" className="login-register">
                <div  className="form-box-register">
                    <form className="form register" onSubmit={handleSubmit}>
                        <img src="/logo-verde.png" alt="Logo Shanti Yoga" className="login-logo" />
                        <span className="title">REGISTRARSE</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        {error?.error && 
                            <div className='error-message'>
                                <p>{error.message}</p>
                            </div>
                        }
                        {success  && 
                            <div className='success-message'>
                                <p>Usuario Registrado</p>
                            </div>
                        }
                        <div className="form-container">
                            <div className="login-input">
                                <label>NOMBRE COMPLETO</label>
                                <div className='caja-input'>
                                    <FaUser className="icon"/>
                                    <input 
                                        type="text"
                                        name='name' 
                                        className="input" 
                                        placeholder="Nombre completo"
                                        value={user.name}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                        required
                                    />  
                                </div>
                            </div>   

                            <div className="login-input">   
                                <label>USUARIO</label>
                                <div className="caja-input">
                                    <FaEnvelope className="icon"/>
                                    <input
                                        type="email"
                                        name='email'
                                        className="input"
                                        placeholder="usuario@example.com"
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}                                
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-input">
                                <label>CONTRASEÑA</label>
                                <div className="caja-input">
                                    <FaLock className="icon"/>
                                    <input 
                                        type="password"
                                        name='password'
                                        className="input" 
                                        placeholder="********"
                                        value={user.password}
                                        onChange={(e) => setUser({...user, password: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-input">
                                <label>REPETIR CONTRASEÑA</label>
                                <div className="caja-input">
                                    <FaLock className="icon"/>
                                    <input 
                                        type="password"
                                        name='passwordRepeat'
                                        className="input" 
                                        placeholder="********"
                                        value={user.passwordRepeat}
                                        onChange={(e) => setUser({...user, passwordRepeat: e.target.value})}
                                        required
                                        />
                                </div>
                            </div>

                        </div>
                        <button type='submit'>Sign up</button>
                        {loading &&
                            <div className='loading-message'>
                            Cargando...
                            </div>
                        }

                    <div className="form-section">
                        <p>¿Ya tienes una cuenta? <HashLink smooth to = "/LoginPage">Iniciar sesión</HashLink></p>
                    </div>
                    
                        <div className="linea">
                        <span>O</span>
                    </div>
                    <div className="otros-inicios-sesion">
                        <SocialButton 
                                platform="google" 
                                logoSrc="/LogoGoogle.png" 
                                onClick={() => handleGoogleLogin()} // <-- SOLUCIÓN AL ERROR
                            />
                            <SocialButton 
                                platform="facebook" 
                                logoSrc="LogoFacebook.png" 
                                onClick={() => alert('Facebook no implementado')} // <-- Añadido para evitar error
                            />
                            <SocialButton 
                                platform="apple" 
                                logoSrc="/LogoApple.png" 
                                onClick={() => alert('Apple no implementado')} // <-- Añadido para evitar error
                            />
                    </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Register;