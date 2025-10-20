import "../styles/LoginRegisterPage.css"
/*import FacebookAuth from "../components/FacebookAuth";*/
import SocialButton from '../components/SocialButton';

import {useState} from 'react'
import axios from 'axios';
import {FaUser, FaEnvelope, FaLock} from "react-icons/fa";
/*import { GoogleLogin } from '@react-oauth/google';*/
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';


interface User {
    name: string;
    email: string;
    password: string;
    passwordRepeat:string;
}

interface Error {
    act: boolean;
    message: string;
}

function Register(){
    const [error, setError] = useState<Error>({act:false, message:''})
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        name:'',
        email:'',
        password:'',
        passwordRepeat:''
    })
    
    const Navigate = useNavigate()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setLoading(true)
        const form = e.target as HTMLFormElement;
        setUser({
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email:(form.elements.namedItem('email') as HTMLInputElement).value,
            password:(form.elements.namedItem('password') as HTMLInputElement).value,
            passwordRepeat:(form.elements.namedItem('passwordRepeat') as HTMLInputElement).value            
        });
    if(user.password === user.passwordRepeat){
        setError({act:false, message:''})
        sendFormRegister()
        }
    else setError({ act:true, message:'Las contraseñas no coinciden'})
    }

    async function sendFormRegister(){
        try{
            const response = await axios.post("http://localhost:3000/api/users", {
            name: user.name,
            email: user.email,  
            password: user.password })

            // console.log(response.data.message)
            setLoading(false)
            setSuccess(true)
            console.log(response.data.message,'// Datos:',response.data.data)
            Navigate('/LoginPage')
        }
            catch(err){
                setLoading(false)
                setSuccess(false)
                if(axios.isAxiosError(err) && err.response?.status === 400){
                    setError({act:true, message:'Ya existe una cuenta con este email'})
                }
                else setError({act:true, message:'Error del servidor, intente más tarde'})
                console.log('Error: ',err)
            }
            finally{
                setLoading(false)
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    passwordRepeat:''})
                }
        }

    /*async function handleGoogleLogin(credential: string) {
        try {
            const response = await axios.post("http://localhost:3000/api/user/google", {
                token: credential
            });
            console.log("Usuario de Google registrado: ", response.data);
        } catch (err) {
            console.log("Error con Google Sign-In: ", err)
        }
    }*/
    

    return(
        <>
            <div id="top" className="login-register">
                <div  className="form-box-register">
                    <form className="form register" onSubmit={handleSubmit}>
                        <img src="/logo-verde.png" alt="Logo Shanti Yoga" className="login-logo" />
                        <span className="title">REGISTRARSE</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        {error.act && 
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
                        {/*<GoogleLogin
                            onSuccess={(credentialResponse) => {
                                if (credentialResponse.credential) {
                                    handleGoogleLogin(credentialResponse.credential);
                                }
                            }}
                            onError={() => {
                                console.log("Error al inciar sesión con Google.");
                            }}
                        />*/}
                        <SocialButton platform="google" logoSrc="/LogoGoogle.png" />
                        <SocialButton platform="facebook" logoSrc="LogoFacebook.png" />
                        {/*<FacebookAuth />*/}
                        <SocialButton platform="apple" logoSrc="/LogoApple.png" />
                    </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Register;