import './RegisterFields.css'
import {useState, useEffect} from 'react';
import axios from 'axios';

interface User  {
  email: string;
  password: string;

}

function RegisterFields() {
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  })
  const [action, setAction] = useState<boolean>(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){ //Tipo de dato del evento
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    setUser({
      email: (form.email as HTMLInputElement).value,
      password: (form.contraseña as HTMLInputElement).value 
    })
    setAction(!action)
  }

  async function sendFormRegister() {
    try{
      const response = await axios.post("http://localhost:3000/api/user",{
        email: user.email,
        password: user.password
      })
      console.log('Usuario creado: ',response.data)
    }
    catch(err){
      console.log('Error: ', err)
    }
    finally{
      setUser({email:'',password:''})
    }
  }  
    
  useEffect(() => {
    if (user.email && user.password) { // Solo ejecuta si hay datos
      sendFormRegister();
    }
  }, [action]);

  return (
    <>
      <form className="formulario-registro" action="" id="formulario-registro" onSubmit={handleSubmit}>
        <h2 className="titulo-registro">Registrate</h2>
        <div className="input-contenedor-is">
          <label htmlFor="email">Dirección de Correo Electrónico</label>
          <input 
            id="email" 
            type="email" 
            placeholder="you@example.com"
            />
        </div>
          <div className="input-contenedor-is">
            <label htmlFor="contraseña">Contraseña</label>
            <input 
              id="contraseña" 
              type="password" 
              placeholder="********"
            />
            <label className="label-repetir" htmlFor="contraseña">Repite tu contraseña</label>
            <input 
              type="password"
              placeholder="********"
            />
          </div>
        <button 
          className="boton-registro" >
            Registrarse
        </button>
      </form>
    </>
    );
}

export default RegisterFields;