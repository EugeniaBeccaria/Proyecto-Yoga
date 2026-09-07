import { useState } from "react";
import axios from "axios";
import "../../styles/admin/CreateProfesor.css";

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
    message: string
}
export default function CreateProfesor() {
    const [messageError, setMessageError] = useState<error>({
        error: false,
        message: ''
    });

    const [ProfesorData, setProfesorData] = useState<ProfesorForm>({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        dni: '',
        password: ''
    });

    // Nuevo estado para el modal
    const [infoModal, setInfoModal] = useState<{ title: string; message: string; isError?: boolean } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfesorData({ ...ProfesorData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/api/users?role=professor', ProfesorData);

            if (res.status === 201) {
                // Modal de éxito en lugar del alert
                setInfoModal({
                    title: "Operación exitosa",
                    message: "Profesor creado con éxito.",
                    isError: false
                });
                setMessageError({ error: false, message: '' });
                setProfesorData({
                    name: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    dni: '',
                    password: '',
                });
            } else {
                // Modal de error en lugar del alert
                setInfoModal({
                    title: "Error",
                    message: "Ocurrió un error al intentar crear el profesor.",
                    isError: true
                });
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 409) {
                        const errorMessage = error.response.data?.message || 'Ya existe una cuenta con este email';
                        setMessageError({ error: true, message: errorMessage });
                    }
                    else if (error.response.status === 400) {
                        setMessageError({ error: true, message: 'Datos de entrada inválidos. Por favor, verifica el formulario.' });
                    }
                    else if (error.response.status === 500) {
                        setMessageError({ error: true, message: 'Error de servidor' });
                    }
                    else {
                        setMessageError({ error: true, message: error.response.data?.message || 'Error desconocido.' });
                    }
                }
            }
            else setMessageError({ error: true, message: 'Error inesperado' });
        }
    };

    return (
        <div id="crearProfesor" className="crearProfesor">
            <h2 className="crear-profesor-titulo">Crear Profesor</h2>
            {
                messageError.error &&
                <div className="message-error">
                    {messageError.message}
                </div>
            }
            <form onSubmit={handleSubmit} className="crear-profesor-form">
                
                {/* Fila de Nombre y Apellido */}
                <div className="row">
                    <div className="field">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre"
                            value={ProfesorData.name}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="lastname">Apellido:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Apellido"
                            value={ProfesorData.lastname}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                    </div>
                </div>

                {/* Fila de Email y Teléfono */}
                <div className="row">
                    <div className="field">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={ProfesorData.email}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Teléfono"
                            value={ProfesorData.phone}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                    </div>
                </div>

                {/* Fila de DNI y Contraseña */}
                <div className="row">
                    <div className="field">
                        <label htmlFor="dni">DNI:</label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            placeholder="DNI"
                            value={ProfesorData.dni}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={ProfesorData.password}
                            onChange={handleChange}
                            className="crear-profesor-input"
                            required
                        />
                        <p className="password-hint">La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.</p>
                    </div>
                </div>

                <button type="submit" className="crear-profesor-button">
                    Crear Profesor
                </button>
            </form>

            {/* MODAL INFORMATIVO */}
            {infoModal && (
                <div className="modal-overlay" onClick={() => setInfoModal(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ color: infoModal.isError ? "#e74c3c" : "#2f5b46" }}>
                            {infoModal.title}
                        </h3>
                        <p>{infoModal.message}</p>
                        <div className="modal-buttons">
                            <button className="btn-cancelar" onClick={() => setInfoModal(null)}>
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}