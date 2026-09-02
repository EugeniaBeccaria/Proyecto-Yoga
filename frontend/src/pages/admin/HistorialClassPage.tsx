import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/HistorialClassPage.css';

interface Clase {
    id: string;
    name: string;
    description: string;
    capacityLimit: number;
    enrolledCount: number;
    deletedAt: string | null;
    room: {
        id: string;
        name: string;
    };

    day: {
        id: string;
        name: string;
    };

    professor:{
        id: string;
        name: string;
        lastname: string | null;
    } | null;

    time: {
        id: number;
        startTime: string;
    };
}

function HistorialClassPage() {
    const [clases, setClases] = useState<Clase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchClases();
    }, []);

    const fetchClases = async () => {
        try {
            setLoading(true);

            const response = await axios.get('http://localhost:3000/api/classes', 
                { withCredentials: true }
            );

            console.log("CLASE COMPLETA:", JSON.stringify(response.data.data, null, 2));

            setClases(response.data.data);
            setError("");
        } catch (error) {
            console.error("Error al obtener las clases:", error);
            setError("Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const formatFechaBaja = (fecha: string | null) => {
        if (!fecha) return "-";

        const date = new Date(fecha);
        
        return date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="historial-class-page">
                <h1 className="title-class-page">Historial de Clases</h1>
                <p>Cargando clases...</p>
            </div>
        );
    }

    return (
        <div className="historial-class-page">
            <h1 className="title-class-page">Historial de Clases</h1>
            <p className="list-class-description">Listado de clases eliminadas</p>

            {error && (
                <p className="error-message-list-class">
                    {error}
                </p>
            )}

            {!error && clases.length === 0 && (
                <p className="empty-message-list-class">
                    No hay clases registradas.
                </p>
            )}

            {!error && clases.length > 0 && (
                <div className="table-container">
                    <table className="classes-table">
                        <thead>
                            <tr>
                                <th>Clase</th>
                                <th>Descripción</th>
                                <th>Capacidad</th>
                                <th>Profesor</th>
                                <th>Salón</th>
                                <th>Día</th>
                                <th>Hora</th>
                                <th>Fecha de Baja</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clases.map((clase) => {
                                const activa = clase.deletedAt === null;

                            return (
                                <tr key={clase.id}
                                className={!activa ? "class-deleted" : ""}>
                                    <td><strong>{clase.name}</strong></td>
                                    <td>{clase.description}</td>
                                    <td>{clase.enrolledCount ?? 0}{" / "}{clase.capacityLimit}</td>
                                    <td>{clase.professor?.name ?? "-"}</td>
                                    <td>{clase.room?.name ?? "-"}</td>
                                    <td>{clase.day?.name ?? "-"}</td>
                                    <td>{clase.time?.startTime.substring(0, 5) ?? "-"}</td>
                                    <td>{formatFechaBaja(clase.deletedAt)}</td>
                                    <td>
                                        <span
                                            className={
                                                activa
                                                    ? "status-active"
                                                    : "status-deleted"
                                            }
                                        >
                                            {activa ? "Activa" : "Dada de Baja"}
                                        </span>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HistorialClassPage;