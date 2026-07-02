import React, { useState, useEffect } from 'react';
import '../styles/client/ClasesAlumno.css';
import { tallerService } from '../service/tallerserviceFront';
import type { TallerApi } from '../types/taller.type';
import axios from 'axios';

const TalleresAlumno: React.FC = () => {
    const [talleresInscritos, setTalleresInscritos] = useState<TallerApi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

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

    const getTallerDate = (taller: TallerApi): Date => {
        if (taller.datetime) {
            if (taller.time?.startTime) {
                const timeStr = taller.time.startTime.trim();
                const formattedTime = /^\d{2}:\d{2}/.test(timeStr) ? timeStr : `0${timeStr}`;
                const localDate = new Date(`${taller.datetime}T${formattedTime}:00`);
                if (!isNaN(localDate.getTime())) {
                    return localDate;
                }
            }
            const localDateOnly = new Date(`${taller.datetime}T00:00:00`);
            if (!isNaN(localDateOnly.getTime())) {
                return localDateOnly;
            }
            const parsed = new Date(taller.datetime);
            if (!isNaN(parsed.getTime())) {
                return parsed;
            }
        }
        return new Date(0);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const d = new Date(`${dateString}T00:00:00`);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleString('es-AR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const now = new Date();

    const upcomingTalleres = talleresInscritos.filter(taller => {
        return getTallerDate(taller) >= now;
    });

    const pastTalleres = talleresInscritos.filter(taller => {
        return getTallerDate(taller) < now;
    });

    const displayedTalleres = activeTab === 'upcoming' ? upcomingTalleres : pastTalleres;

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

            <div className="talleres-tabs">
                <button
                    className={`taller-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Proximos
                </button>
                <button
                    className={`taller-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                >
                    Anteriores
                </button>
            </div>

            {displayedTalleres.length > 0 ? (
                <div className="clases-grid">
                    {displayedTalleres.map(taller => (
                        <div key={taller.id} className="clase-card">
                            <h3 className="clase-card-nombre">{taller.name}</h3>
                            <p className="clase-card-descripcion">{taller.description}</p>
                            <p className="clase-card-detalle">
                                <strong>Fecha y Hora:</strong> {formatDate(taller.datetime)} {taller.time ? `- ${taller.time.startTime} hs` : ""}
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
                <p className="no-clases-mensaje">
                    {activeTab === 'upcoming'
                        ? 'No tienes talleres por venir inscritos.'
                        : 'No tienes talleres anteriores.'}
                </p>
            )}
        </div>
    );
};

export default TalleresAlumno;