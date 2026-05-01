import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/ListAlumnosPage.css";

type Clase = {
    id: string;
    name: string;
}

type Alumno = {
    id: string;
    name: string;
    email: string;
    membership?: string;
    classes: Clase[];
};

export default function ListAlumnosPage() {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users/students", { withCredentials: true });

                setAlumnos(res.data.data);
            } catch (error) {
                console.error("Error al traer los alumnos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlumnos();
    }, []);

    const filteredAlumnos = alumnos.filter(alumno =>
        alumno.name.toLowerCase().includes(search.toLowerCase()) ||
        alumno.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="list-alumnos-container">
            <h1 className="list-alumnos-title">Listado de Alumnos</h1>

            <input
                type="text"
                placeholder="Buscar por nombre o email"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
            />

            {loading ? (
                <p className="loading-text">Cargando alumnos...</p>
            ) : filteredAlumnos.length === 0 ? (
                <p className="loading-text">No se encontraron alumnos.</p>
            ) : (
                <div className="table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Nombre del Alumno</th>
                                <th>Email</th>
                                <th>Membresía</th>
                                <th>Clases Inscripto</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAlumnos.map(alumno => (
                                <tr key={alumno.id}>
                                    <td>{alumno.name}</td>
                                    <td>{alumno.email}</td>
                                    <td>{alumno.membership || "Sin membresía activa"}</td>
                                    <td>
                                        {alumno.classes.length > 0 ? (
                                            alumno.classes.map(clase => clase.name).join(", ")
                                        ) : (
                                            "No se inscribió en ninguna clase"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
