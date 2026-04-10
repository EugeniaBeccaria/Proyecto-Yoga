import "../styles/LoginRegisterPage.css"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

import Profile from "../components/Profile";
import { useState } from 'react'
import {FaEnvelope, FaLock} from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { useGoogleLogin } from '@react-oauth/google';
import SocialButton from '../components/SocialButton';
import googleLogo from '/LogoGoogle.png';
import axios from 'axios';
import type { Error } from "../types/error.type";

import ReCAPTCHA from "react-google-recaptcha";

interface User {
    email: string;
    password: string;
}

export default function Login(){
    const { login, logout } = useContext(AuthContext);

    const [userLogin, setUserLogin] = useState<boolean>(false)
    const [formData, setFormData] = useState<User>({email:'',password:''})
    
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const [error, setError] = useState<Error | null>(null)
    const [errCloseSession, setErrCloseSession] = useState<boolean>(false)

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const userStoraged = localStorage.getItem('user')
        if(userStoraged){
            setUserLogin(true)
        }
    }, [])

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;// || '6LevS60sAAAAAC_rFtowYLlD7LnktuS4u3bA-yzU'    ;

    function handleClickCloseSession(){
        setErrCloseSession(false)
        deleteCookies()
        setSuccess(false)
        setUserLogin(false)
        setFormData({email: '', password: ''})
        logout()
    }

    async function deleteCookies(){
        try{ // las cookies se envian en cada request
            const resp = await axios.post('http://localhost:3000/auth/logout',{},{
                withCredentials:true
            })
            console.log(resp.data.message)
        }
        catch(err){
            setErrCloseSession(true)
            console.log('Error al cerrar sesión: ',err)
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        
        if (formData.email && formData.password) {
            sendForm(formData.email, formData.password);
        } else {
            setLoading(false);
        }
    }

    async function sendForm(email:string,password:string){
        try{
            setSuccess(false)
            setError(null)

            if (!token) {
                setLoading(false);
                setError({ error: true, message: 'Por favor, completa el reCAPTCHA' });
                return;
            }

            const response = await axios.post("http://localhost:3000/auth/login", 
            {
            email: email,  
            password: password,
            captchaToken: token
            },
            { withCredentials: true })

            const userData = response.data.user  
            
            console.log('Usuario logueado, nombre: ',userData.name)
            
            setLoading(false)
            setSuccess(true)
            setTimeout(()=>{
                login(userData)
                setUserLogin(true)
            },1300)
        }
        
        catch(err){
            setLoading(false)
            if (axios.isAxiosError(err)) {
                setError({ error: true, message: err.response?.data.message || err.response?.data.errors[0].msg || err.message});
                return;
                }
        }
        finally{
            setFormData({email: '',password: ''})
        }
    }

const handleGoogleLogin = useGoogleLogin({
        flow: 'auth-code', // Usamos el 'code' flow para que el backend lo verifique
        onSuccess: async (codeResponse) => {
            console.log('Google login code:', codeResponse.code);
            setLoading(true);
            setError(null);
            setSuccess(false);

            try {
                const response = await axios.post("http://localhost:3000/auth/google/login",
                    {
                        code: codeResponse.code,
                        captchaToken : token

                    },
                    { withCredentials: true });

                const userData = response.data.user;
                // if (response.status !== 200) {
                //     setLoading(false);
                //     setError(true);
                //     throw new Error(response.data.message || 'Error al iniciar sesión con Google');
                // }

                console.log('Usuario logueado con Google, nombre: ', userData.name);
                
                // lo mismo que el login normal
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    login(userData); //  Del AuthContext
                    setUserLogin(true);
                }, 1300);

            } 
            catch(err){
                setLoading(false)
                if (axios.isAxiosError(err)) {
                    setError({ error: true, message: err.response?.data.message || err.response?.data.errors[0].msg || err.message});
                    return;}
                }
        },
        onError: (error) => {
            console.error('Google login error:', error);
            setError({ error: true, message: 'Error al iniciar sesión con Google' });
        }
    });    
        
    function handleChangeCaptcha(value: string | null) {
        setToken(value);
    }

    return(
        <>
            <div id="top" className="form-box-login">
                {userLogin?
                    <div className="profile">
                        <Profile error = {errCloseSession} handleClick = {handleClickCloseSession}/>
                    </div>
                :<>
                    <form className="form login" onSubmit={handleSubmit}>
                            <img src="/logo-verde.png" alt="Logo Shanti Yoga" className="login-logo" />
                            <span className="title">INICIAR SESIÓN</span>
                            <span className="subtitle">Ingrese a su cuenta para acceder a sus clases y talleres</span>
                            {success  &&
                                <div className='success-message'>
                                Logueado con exito
                                </div>
                            }                        
                            {error?.error  &&
                                <div className='error-message'>
                                    {error.message}
                                </div>
                            }
                            <div className="form-container">
                                <div className="login-input">
                                    <label>USUARIO</label>
                                    <div className="caja-input">
                                        <FaEnvelope className="icon"/>
                                        <input 
                                            type="email"
                                            name = 'email'
                                            className="input" 
                                            placeholder="usuario@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}                                
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
                                            name="password"
                                            className="input" 
                                            placeholder="********" 
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            required
                                            />
                                    </div>
                                </div>
                            </div>

                            <ReCAPTCHA
                                className="recaptcha"
                                sitekey= {siteKey}
                                onChange= {handleChangeCaptcha}
                            />

                            <button>Sign in</button>
                            {loading &&
                                <div className='loading-message'>
                                Cargando...
                                </div>
                            }

                            <div className="social-login-divider">
                                <span>o</span>
                            </div>

                            <SocialButton
                                platform="google"
                                logoSrc={googleLogo}
                                onClick={() => handleGoogleLogin()} // Llamamos a la función del hook
                            />
                            
                            <div className="form-section">
                                <p>¿No tienes una cuenta? <HashLink smooth to = "/RegisterPage">Registrarse</HashLink></p>
                            </div>
                    </form>
                </>}
            </div>
        </>
        )
    }