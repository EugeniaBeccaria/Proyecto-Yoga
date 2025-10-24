import { useState} from "react";
import axios from "axios";

type ProfesorForm = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    dni: string;
    password: string;
}
interface error {
    error: boolean
    message:string
}
export default function CreateProfesor() {
    const [messageError,setMessageError] = useState<error>({
        error:false,
        message:''
    })
    const [ProfesorData, setProfesorData] = useState<ProfesorForm>({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        dni: '',
        password: ''
    });


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProfesorData({...ProfesorData, [name]: value});
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await axios.post('http://localhost:3000/api/users?role=professor', ProfesorData);

        if (res.status === 201) {
            alert('Profesor creado con éxito');
            setMessageError({error:false,message:''})
            setProfesorData ({
                name: '',
                lastname: '',
                email: '',
                phone: '',
                dni: '',
                password: '',
            });
        } else {
            alert('Error al crear el profesor');
        }
    }
    catch(error){
        if (axios.isAxiosError(error)){
            if (error.response){
                if(error.response.status === 400){
                    setMessageError({error:true,message:'Ya existe una cuenta con este email'})
                    }
                if(error.response.status === 500){
                    setMessageError({error:true,message:'Error de servidor'})
                }
            }
        }
        else setMessageError({error:true, message:'Error inesperado'})
    }
};

return (
    <section id="crearProfesor" className="crearProfesor">
        <h2 className="crear-profesor-titulo">Crear Profesor</h2>
        {
            messageError.error &&
            <div className="message-error">
                {messageError.message}
            </div>
        }
        <form onSubmit={handleSubmit} className="crear-profesor-form">
            <input
                type="text"
                    name="name"
                    placeholder="Nombre"
                    value={ProfesorData.name}
                    onChange={handleChange}
                    className="crear-profesor-input"
                    required
            />

            <input
                type="text"
                name="lastname"
                placeholder="Apellido"
                value={ProfesorData.lastname}
                onChange={handleChange}
                className="crear-profesor-input"
                required
            />

            <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={ProfesorData.dni}
                onChange={handleChange}
                className="crear-profesor-input"
                required
            />

            <input
                type="email"                    
                name="email"
                placeholder="Email"
                value={ProfesorData.email}
                onChange={handleChange}
                className="crear-profesor-input"
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                value={ProfesorData.phone}
                onChange={handleChange}
                className="crear-profesor-input"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={ProfesorData.password}
                onChange={handleChange}
                className="crear-profesor-input"
                required
            />

            <button type="submit" className="crear-profesor-button">Crear Profesor</button>
        </form>
    </section>
)
}
