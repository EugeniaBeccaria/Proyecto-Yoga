import "../styles/LoginRegisterPage.css"
import Profile from "../components/Profile";

import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {FaEnvelope, FaLock} from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import axios from 'axios';
import Navbar from "../components/Navbar";


interface User {
    email: string;
    password: string;
}

export default function Login(){
    const navigate = useNavigate()

    const [login, setLogin] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<User>({email:'',password:''})
    const [success, setSuccess] = useState<boolean>(false)
    const [errCloseSession, setErrCloseSession] = useState<boolean>(false)

    useEffect(()=>{
        const userSerializado = localStorage.getItem('user')
        if(userSerializado){
            const user = JSON.parse(userSerializado)
            setLoading(false)
            setLogin(true)
            setFormData({email: user.email, password: ''})
        }
    },[])

    function handleClickCloseSession(){
        localStorage.removeItem('user')
        setErrCloseSession(false)
        setLogin(false)
        setFormData({email: '', password: ''})
        deleteCookies()
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        setLoading(true)
        e.preventDefault()
        const formElements = e.currentTarget.elements;
        const email = (formElements.namedItem('email') as HTMLInputElement).value;
        const password = (formElements.namedItem('password') as HTMLInputElement).value;
        if(email && password) 
            sendForm(email,password)       
    }

    async function sendForm(email:string,password:string){
        try{
            setSuccess(false)
            setError(false)
            const response = await axios.post("http://localhost:3000/auth/login", 
            {
            email: email,  
            password: password
            },
            { withCredentials: true })

            const userData = response.data.user
            if (response.status !== 200){
                setLoading(false)
                setError(true)
                throw new Error(response.data.message || 'Error al iniciar sesión')}        
                console.log('Usuario logueado, nombre: ',userData.name)
            
            localStorage.setItem('user',JSON.stringify(userData))
            setLoading(false)
            setSuccess(true)
            setTimeout(()=>{
                if(userData.role === 'admin')
                    navigate('/')
                    window.location.reload()
                if(userData.role === 'profesor')
                    navigate('/')
                else
                    navigate('/')
            },1300)
        }
        
        catch(err){
            setLoading(false)
            setError(true)
            if (axios.isAxiosError(err)) {
                console.log('Error del servidor:', err.response?.data?.message || err.message);
            } else {
                console.log('Error inesperado:', err);
            }
        }
        finally{
            setFormData({email: '',password: ''})
        }
    }
        
    return(
        <>
            <div id="top" className="form-box-login">
                <form className="form login" onSubmit={handleSubmit}>
                    {login?
                        <Profile error = {errCloseSession} handleClick = {handleClickCloseSession}/>
                        // <>
                        //     <div className="profile">
                        //         <h1>Sesion iniciada</h1>
                        //         <button onClick={handleClickCloseSession} className="button">Cerrar sesión</button>
                        //     </div>
                        //     {errCloseSession  &&
                        //         <div className='error-message'>
                        //             Error al cerrar sesión
                        //         </div>
                        //     }
                        // </>
                    :<>
                            <span className="title">INICIAR SESIÓN</span>
                            <span className="subtitle">Ingrese a su cuenta para acceder a sus clases y talleres</span>
                            {success  &&
                                <div className='success-message'>
                                Logueado con exito
                                </div>
                            }                        
                            {error  &&
                                <div className='error-message'>
                                Error de inicio de sesion
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
                            <button>Sign in</button>
                            {loading &&
                                <div className='loading-message'>
                                Cargando...
                                </div>
                            }
                            <div className="form-section">
                                <p>¿No tienes una cuenta? <HashLink smooth to = "/RegisterPage">Registrarse</HashLink></p>
                            </div>
                    </>}
                </form>
            </div>
        </>
        )
    }