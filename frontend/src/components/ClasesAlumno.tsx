import React, { useState, useEffect } from 'react';
import '../styles/client/ClasesAlumno.css';
import { classService } from '../service/class.service';
import type { IEnrolledClass } from '../types/class.type';
import axios from 'axios';


const ClasesAlumno: React.FC = () => {
    const [clasesInscritas, setClasesInscritas] = useState<IEnrolledClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const classes = await classService.getMyEnrolledClasses();

                setClasesInscritas(classes);

            } catch (err) {
                console.error("Error al cargar las clases:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    setError("No autorizado. Por favor, inicia sesión de nuevo.");
                } else {
                    setError("Hubo un error al cargar tus clases. Intenta de nuevo.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, []); 

    // Manejo de estados de carga y error
    if (isLoading) {
        return (
            <div className="alumno-clases-container">
                <p className="loading-message">Cargando tus clases...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alumno-clases-container">
                <p className="error-message">Error: {error}</p>
            </div>
        );
    }

    // Renderizado - Usando las propiedades correctas de IEnrolledClass
    return (
        <div className="alumno-clases-container">
            <h2 className="alumno-clases-titulo">Mis Clases Inscritas</h2>
            {clasesInscritas.length > 0 ? (
                <div className="clases-grid">
                    {clasesInscritas.map(clase => (
                        <div key={clase.id} className="clase-card">
                            {/* ¡Usamos name, schedule, professorName! */}
                            <h3 className="clase-card-nombre">{clase.name}</h3>
                            <p className="clase-card-detalle"><strong>Horario:</strong> {clase.schedule}</p>
                            <p className="clase-card-detalle"><strong>Profesor:</strong> {clase.professorName}</p>
                            <p className="clase-card-descripcion">{clase.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-clases-mensaje">No estás inscrito en ninguna clase todavía.</p>
            )}
        </div>
    );
};

export default ClasesAlumno;