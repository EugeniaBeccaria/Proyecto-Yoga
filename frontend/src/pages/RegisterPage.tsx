import {useState} from 'react'
import "../styles/LoginRegisterPage.css"
import Navbar from "../components/Navbar";
import axios from 'axios';

interface User {
    name: string;
    mail: string;
    password: string;
    passwordRepeat:string;
}

function Register(){
    const [error, setError] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        name:'',
        mail:'',
        password:'',
        passwordRepeat:''
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        setUser({
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            mail:(form.elements.namedItem('mail') as HTMLInputElement).value,
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
            const response = await axios.post("http://localhost:3000/api/user",{
                name: user.name,
                mail: user.mail,
                password: user.password
            })
                console.log('Usuario creado con exito: ',response.data.userData)
            }
            catch(err){
                console.log('Error: ',err)
            }
            finally{
                setUser({
                    name: '',
                    mail: '',
                    password: '',
                    passwordRepeat:''})
                }
        }

    return(
        <>
            <Navbar disable={true}/>
                <div className="form-box">
                    <form className="form" onSubmit={handleSubmit}>
                        <span className="title">REGISTRARSE</span>
                        <span className="subtitle">Crea tu cuenta para acceder a clases y talleres</span>
                        {error && 
                            <div className='mensaje-error'>
                                <p>Error: las contraseñas no coinciden</p>
                            </div>
                        }
                        <div className="form-container">
                            <input 
                                type="name"
                                name='name' 
                                className="input" 
                                placeholder="Nombre completo"
                                value={user.name}
                                onChange={(e) => setUser({...user, name: e.target.value})}
                                required
                                />                            
                            <input
                                type="email"
                                name='mail'
                                className="input"
                                placeholder="Email"
                                value={user.mail}
                                onChange={(e) => setUser({...user, mail: e.target.value})}                                
                                required
                                />
                            <input 
                                type="password"
                                name='password'
                                className="input" 
                                placeholder="Contraseña"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                required
                                />
                            <input 
                                type="password"
                                name='passwordRepeat'
                                className="input" 
                                placeholder="Repite tu contraseña"
                                value={user.passwordRepeat}
                                onChange={(e) => setUser({...user, passwordRepeat: e.target.value})}
                                required
                                />
                        </div>
                        <button type='submit'>Sign up</button>
                    <div className="form-section">
                        <p>¿Ya tienes una cuenta? <a href="/LoginPage">Iniciar sesión</a> </p>
                    </div>
                    </form>
                </div>
        </>
    )
}
export default Register