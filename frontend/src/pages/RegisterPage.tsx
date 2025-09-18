import {useState} from 'react'
import "../styles/LoginRegisterPage.css"
import axios from 'axios';
import {FaUser, FaEnvelope, FaLock} from "react-icons/fa";
import SocialButton from '../components/SocialButton.tsx';
/*import { GoogleLogin } from '@react-oauth/google';*/

interface User {
    name: string;
    email: string;
    password: string;
    passwordRepeat:string;
}

function Register(){
    const [error, setError] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        name:'',
        email:'',
        password:'',
        passwordRepeat:''
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        setUser({
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email:(form.elements.namedItem('email') as HTMLInputElement).value,
            password:(form.elements.namedItem('password') as HTMLInputElement).value,
            passwordRepeat:(form.elements.namedItem('passwordRepeat') as HTMLInputElement).value            
        });
    if(user.password === user.passwordRepeat){
        setError(false)
        sendFormRegister()
        }
    else setError(true)
    }

    async function sendFormRegister(){
        try{
            const response = await axios.post("http://localhost:3000/api/users", {
            name: user.name,
            email: user.email,  
            password: user.password })

            // console.log(response.data.message)
            console.log(response.data.message,'// Datos:',response.data.data)
        }
            catch(err){
                console.log('Error: ',err)
            }
            finally{
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
                        <span className="title">REGISTRARSE</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        {error && 
                            <div className='mensaje-error'>
                                <p>Error: las contraseñas no coinciden</p>
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

                    <div className="form-section">
                        <p>¿Ya tienes una cuenta? <a href="/LoginPage">Iniciar sesión</a> </p>
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
                        <SocialButton platform="apple" logoSrc="/LogoApple.png" />
                    </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Register;