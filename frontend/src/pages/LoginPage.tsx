import {useState} from 'react'
import "../styles/LoginRegisterPage.css"
import {FaEnvelope, FaLock} from "react-icons/fa";
import axios from 'axios';

interface User {
    email: string;
    password: string;
}

export default function Login(){
    // const [error, setError] = useState<boolean>(false)
    const [formData, setFormData] = useState<User>({email:'',password:''})
    // const [user, setUser] = useState<User>({
    //     email:'',
    //     password:''
    //     })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formElements = e.currentTarget.elements;
        const email = (formElements.namedItem('email') as HTMLInputElement).value;
        const password = (formElements.namedItem('password') as HTMLInputElement).value;
        if(email && password) sendForm(email,password)       
    }

    async function sendForm(email:string,password:string){
        try{
            const response = await axios.post("http://localhost:3000/auth/login", {
            email: email,  
            password: password})
            // console.log(response.data.message)
            console.log(response.data.message,'// Datos:',response.data.data)
            
        }
            catch(err){
                console.log('Error: ',err)
            }
            finally{
                setFormData({
                    email: '',
                    password: ''})
                }
    }
        
    return(
        <>
            <div id="top" className="login-register">
                <div className="form-box-login">
                    <form className="form login" onSubmit={handleSubmit}>
                        <span className="title">INICIAR SESIÓN</span>
                        <span className="subtitle">Ingrese a su cuenta para acceder a sus clases y talleres</span>
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

                        <div className="form-section">
                            <p>¿No tienes una cuenta? <a href="/RegisterPage">Registrarse</a> </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
        )
    }