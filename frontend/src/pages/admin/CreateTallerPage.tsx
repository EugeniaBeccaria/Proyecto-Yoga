import { useEffect, useState} from "react";
import "../../styles/admin/CreateTaller.css";
import axios from "axios";
import type { Rooms } from "../../types/class.type";
import type { User } from "../../types/user.type";

type TallerForm = {
    name: string;
    datetime: string;
    price: number;
    description: string;
    cupo: number ;
    roomId: string;
    profesorId: string;
}
interface Error {
    error: boolean,
    message: string
}

export default function CrearTaller() {
    const [formData, setFormData] = useState<TallerForm> ({
        name: "",
        datetime: "",
        price: 0,
        description: "",
        cupo: 0,
        roomId: "",
        profesorId: ""
    });
    const [errors, setErrors] = useState<Error | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Rooms[]>([]);
    const [professors, setProfessors] = useState<User[]>([]);

    // Fetch rooms from the backend
    const loadData = async () => {
    try{
        const [roomsRes, professorsRes] = await Promise.all([
        axios('http://localhost:3000/api/rooms', { withCredentials: true }),
        axios('http://localhost:3000/api/users?role=professor', { withCredentials: true })
        ]);
        setRooms(roomsRes.data.data);
        setProfessors(professorsRes.data.data);
        } catch (error) {
            console.error("Error al cargar las habitaciones:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({...formData, [name]: type === "number" ? (value === "" ? null : Number(value)) : value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tallerData = {
            name: formData.name,
            datetime: formData.datetime,
            price: formData.price,
            description: formData.description,
            cupo: formData.cupo,
            roomId: parseInt(formData.roomId, 10) as number,
            profesorId: parseInt(formData.profesorId, 10) as number
        };
        console.log("Taller Data to submit:", tallerData);
        setFormData({
            name: "",
            datetime: "",
            price: 0,
            description: "",
            cupo: 0,
            roomId: "",
            profesorId: ""
        });
        try {
            const response = await axios.post('http://localhost:3000/api/talleres', tallerData, { withCredentials: true });
            console.log("Taller creado con éxito:", response.data);
            setSuccessMessage("Taller creado con éxito");
            setErrors(null);
        }
        catch (error) {
            setSuccessMessage(null);
            console.log("Error al crear el taller:", error);
            if (axios.isAxiosError(error)) {
                setErrors({ error: true, message: error.response?.data.message || error.response?.data.errors[0].msg });
                return;
            }
        }
        console.log("Submitting Taller Data:", tallerData);
    };

    return (
    <section id="crearTalleres" className="crearTalleres">
        <div className="crear-taller-card">
        <h2 className="crear-taller-titulo">Crear Taller</h2>
            <form onSubmit={handleSubmit} className="crear-taller-form">

            <label>Nombre del taller:</label>
            <input
                type="text"
                name="name"
                placeholder="Nombre del taller"
                value={formData.name}
                onChange={handleChange}
                className="crear-taller-input"
                required
            />

            <label>Fecha y hora:</label>
            <input
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleChange}
                className="crear-taller-input"
                required
            />

            <label>Profesor:</label>
            <select
                name="profesorId"
                value={formData.profesorId}
                onChange={handleChange}
                className="crear-taller-select"
                required
            >
                <option value="">Seleccione un profesor</option>
                {professors.map((professor) => (
                    <option key={professor.id} value={professor.id}>
                        {professor.name}
                    </option>
                ))}
            </select>

            <div className="crear-taller-row">
            <div className="crear-taller-column">
                <label>Cupo:</label>
                <input
                type="number"
                name="cupo"
                placeholder="Cupo"
                value={formData.cupo}
                onChange={handleChange}
                className="crear-taller-input"
                required
                />
            </div>

            <div className="crear-taller-column">
                <label>Salón:</label>
                <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    className="crear-taller-select"
                    required
                    >
                    <option value="">Seleccione un salón</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
            </div>
            </div>


            <label>Precio:</label>
            <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                className="crear-taller-input"
                required
            />

            <label>Descripción:</label>
            <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                className="crear-taller-textarea"
                required
            />

            {errors?.error && (
            <div className="error-message-taller">
                {errors.message}
            </div>
            )}

            {successMessage && (
            <div className="success-message">
                {successMessage}
            </div>
            )}
            
            <button type="submit" className="crear-taller-boton">
                Crear Taller
            </button>
            </form>
        </div>
    </section>
);

}