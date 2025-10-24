import { useState} from "react";

type ProfesorForm = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    dni: string;
    rol: string;
    password: string;
}

export default function CreateProfesor() {
    const [ProfesorData, setProfesorData] = useState<ProfesorForm>({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        dni: '',
        rol: 'professor',
        password: ''
    });


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProfesorData({...ProfesorData, [name]: value});
}

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ProfesorData)
    });

        if (res.ok) {
            alert('Profesor creado con éxito');
            setProfesorData ({
                name: '',
                lastname: '',
                email: '',
                phone: '',
                dni: '',
                rol: 'professor',
                password: '',
            });
        } else {
            alert('Error al crear el profesor');
        }
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        alert('Error al crear el profesor');
    }
};

return (
    <section id="crearProfesor" className="crearProfesor">
        <h2 className="crear-profesor-titulo">Crear Profesor</h2>
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
