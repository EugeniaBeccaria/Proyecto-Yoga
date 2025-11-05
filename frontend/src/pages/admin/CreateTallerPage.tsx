import { useState} from "react";
import "../../styles/admin/CreateTaller.css";


// type Room = {
//     id: number;
//     name: string;
//     capacity: number;
// };

type TallerForm = {
    name: string;
    datetime: string;
    price: number | "";
    description: string;
    cupo: number | "";
    roomId: string;
    profesorId: string;
}

export default function CrearTaller() {
    const [formData, setFormData] = useState<TallerForm> ({
        name: "",
        datetime: "",
        price: "",
        description: "",
        cupo: "",
        roomId: "",
        profesorId: ""
    });

    // const [rooms, setRooms] = useState<Room[]>([]);

    // Fetch rooms from the backend
    // useEffect(() => {
    //     fetch("http://localhost:3000/rooms")
    //     .then((res) => res.json())
    //     .then((data) => setRooms(data))
    //     .catch((error) => console.error("Error al buscar salones:", error));
    // }, []); 

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({ ...formData, [name]: type === "number" ? (value === "" ? "" : Number(value)) : value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:3000/talleres", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({...formData,
                    price: Number(formData.price),
                    cupo: Number(formData.cupo)
                }),
            });
        
            if(res.ok) {
                alert ("Taller creado con éxito");
                setFormData({ name: "", datetime: "", price: "", description: "", cupo: "", roomId: "", profesorId: "" });
            } else {
                alert("Error al crear el taller");
            }
        } catch (error) {
            console.error("Error al crear el taller:", error);
            alert("Error al crear el taller");
        }
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

            <button type="submit" className="crear-taller-boton">
                Crear Taller
            </button>
            </form>

        </div>
    </section>
);

}