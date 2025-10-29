import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ClassCalendar.css'; // Este archivo CSS no cambia

// --- 1. Definición de Tipos y Constantes ---

// --- CAMBIO AQUÍ ---
// Actualizamos la interfaz para que coincida EXACTAMENTE
// con la estructura de objetos que viene en tu array 'data'.
interface ClaseHorario {
    id: number;
    name: string; 
    description: string;
    capacityLimit: number;
    room: {
        id: number;
        name: string;
        };
    day: { 
        id: number;
        name: string;
    };
    professor: number;
    time: { 
        id: number;
        startTime: string;
    };
}

const FRANJAS_HORARIAS = [
    { label: '07:00 a 08:00', horaInicio: '07:00' },
    { label: '08:00 a 09:00', horaInicio: '08:00' },
    { label: '09:00 a 10:00', horaInicio: '09:00' },
    { label: '10:00 a 11:00', horaInicio: '10:00' },
    { label: '11:00 a 12:00', horaInicio: '11:00' },
];

const DIAS_SEMANA = [
    { nombre: 'LUNES', id: 1 },
    { nombre: 'MARTES', id: 2 },
    { nombre: 'MIÉRCOLES', id: 3 },
    { nombre: 'JUEVES', id: 4 },
    { nombre: 'VIERNES', id: 5 },
];


export default function ClassCalendar() {
    const [clases, setClases] = useState<ClaseHorario[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {fetchClases()}, []);

    const fetchClases = async () => {
    try {
        const response = await axios('http://localhost:3000/api/classes');
        console.log('Datos de clases recibidos:', response.data.data);
        setClases(response.data.data);
        setLoading(false);
    } catch (error) {
        console.error('Error al cargar las clases:', error);
        setLoading(false);
        }
    };

    // filtra las clases que coinciden con una celda (día y hora)
    const getClasesParaCelda = (diaId: number, horaInicio: string) => {
        return clases.filter((clase) => clase.day.id === diaId && clase.time.startTime === horaInicio);
    };

    if (loading) {
    return <div>Cargando horario...</div>;
    }

    return (
        <div className="container-calendar">
        <h1 className="titulo-clases">Calendario de Clases</h1>
        <p className="tableDescription">
            Seleccioná el nombre de la clase a la que querés asistir y hacé clic en el botón <strong>“Agregar”</strong> para sumarla a tu carrito. Una vez agregada,
            podrás ver el detalle antes de confirmar tu inscripción.
        </p>
        <div className="horario-grid">
            {/* Fila de Encabezados (Días) */}
            <div className="celda-header celda-hora">HORA</div>
            {DIAS_SEMANA.map((dia) => (
                <div key={dia.id} className="celda-header">
                    {dia.nombre}
                </div>
            ))}

            {/* Filas de Contenido (Horas + Clases) */}
            {FRANJAS_HORARIAS.map((franja) => (
                <React.Fragment key={franja.horaInicio}>
                    <div className="celda-hora">{franja.label}</div>

                    {DIAS_SEMANA.map((dia) => {
                        const clasesEnCelda = getClasesParaCelda(dia.id, franja.horaInicio);
                        
                        return (
                            <div key={dia.id} className="celda-clase">
                                {clasesEnCelda.length > 0 && (
                                    <div className="lista-clases">
                                        {clasesEnCelda.map((clase) => ( //lista cada clase que encontro en getClasesParaCelda
                                            <div key={clase.id} className="clase-item">
                                                {clase.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
        </div>
    );
};