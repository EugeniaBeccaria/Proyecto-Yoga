import React, { useState, useEffect } from 'react';
import '../styles/client/ClasesAlumno.css';
import { tallerService } from '../service/tallerserviceFront';
import type { TallerApi } from '../types/taller.type';
import axios from 'axios';

const TalleresAlumno: React.FC = () => {
    const [talleresInscritos, setTalleresInscritos] = useState<TallerApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTalleres = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // 1. Traemos todos los talleres usando tu endpoint real
                const todosLosTalleres = await tallerService.getTalleres();
                
                // 2. Recuperamos el usuario logueado desde el localStorage
                const userProfile = localStorage.getItem('user');
                
                if (userProfile) {
                    const parsedUser = JSON.parse(userProfile);
                    const alumnoId = parsedUser.id; // Obtenemos el ID del alumno actual

                    // 3. Filtramos: el taller nos interesa si el alumno está incluido en su lista de 'users'
                    const misTalleres = todosLosTalleres.filter(taller => 
                        taller.users?.some(user => user.id === alumnoId)
                    );

                    setTalleresInscritos(misTalleres);
                } else {
                    setTalleresInscritos([]);
                }

            } catch (err) {
                console.error("Error al cargar los talleres:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    setError("No autorizado. Por favor, inicia sesión de nuevo.");
                } else {
                    setError("Hubo un error al cargar tus talleres. Intenta de nuevo.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchTalleres();
    }, []); 

    if (isLoading) {
        return (
            <div className="alumno-clases-container">
                <p className="loading-message">Cargando tus talleres...</p>
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

    return (
        <div className="alumno-clases-container">
            <h2 className="alumno-clases-titulo">Mis Talleres Inscritos</h2>
            {talleresInscritos.length > 0 ? (
                <div className="clases-grid">
                    {talleresInscritos.map(taller => (
                        <div key={taller.id} className="clase-card">
                            <h3 className="clase-card-nombre">{taller.name}</h3>
                            <p className="clase-card-descripcion">{taller.description}</p>
                            <p className="clase-card-detalle">
                                <strong>Fecha y Hora:</strong> {taller.datetime} {taller.time ? `- ${taller.time.startTime}` : ""}
                            </p>
                            <p className="taller-schedule">
                                <strong>Profesor:</strong> {taller.professor.name} {taller.professor.lastname}
                            </p>
                            <p className="taller-schedule">
                                <strong>Salón:</strong> {taller.room.name}
                            </p>
                            <p className="clase-card-detalle">
                                <strong>Precio:</strong> ${taller.price}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-clases-mensaje">No estás inscrito en ningún taller todavía.</p>
            )}
        </div>
    );
};

export default TalleresAlumno;