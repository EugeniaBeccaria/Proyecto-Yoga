import React, { useState, useEffect } from 'react';
import '../../styles/ClassCalendar.css'; 
import { classService } from '../../service/class.service.js';
import { useNavigate } from 'react-router-dom';
import type { Error } from '../../types/error.type.js';

interface ClaseHorario {
    id: string;
    name: string; 
    description: string;
    capacityLimit: number;
    room: {
        id: string;
        name: string;
        };
    day: { 
        id: string;
        name: string;
    };
    professor: string;
    time: { 
        id: string;
        startTime: string;
    };
}

const FRANJAS_HORARIAS_MAÑANA = [
    { label: '07:00 a 08:00', horaInicio: '07:00' },
    { label: '08:00 a 09:00', horaInicio: '08:00' },
    { label: '09:00 a 10:00', horaInicio: '09:00' },
    { label: '10:00 a 11:00', horaInicio: '10:00' },
    { label: '11:00 a 12:00', horaInicio: '11:00' },
    { label: '12:00 a 13:00', horaInicio: '12:00' },
];
const FRANJAS_HORARIAS_TARDE = [
    { label: '13:00 a 14:00', horaInicio: '13:00' },
    { label: '14:00 a 15:00', horaInicio: '14:00' },
    { label: '15:00 a 16:00', horaInicio: '15:00' },
    { label: '16:00 a 17:00', horaInicio: '16:00' },
    { label: '17:00 a 18:00', horaInicio: '17:00' },
    { label: '18:00 a 19:00', horaInicio: '18:00' },
    { label: '19:00 a 20:00', horaInicio: '19:00' },
];

const DIAS_SEMANA = [
    { nombre: 'LUNES' },
    { nombre: 'MARTES' },
    { nombre: 'MIÉRCOLES' },
    { nombre: 'JUEVES' },
    { nombre: 'VIERNES' },
];

export default function ClassCalendar() {
    const [clases, setClases] = useState<ClaseHorario[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<ClaseHorario[]>([]);
    const [turnoMañana, setTurnoMañana] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {fetchClases()}, []);

    const fetchClases = async () => {
    try {
        const user = localStorage.getItem("user");
        if (user){
            const userParsed = await JSON.parse(user);
            if(userParsed.role === 'admin') setIsAdmin(true)
            else setIsAdmin(false);
        }

        const response = await classService.getAvailableClasses();
        setClases(response);
    }
    catch (error) {
        console.error('Error al cargar las clases:', error);
        }
    };

    function handleSelectClass(clase: ClaseHorario) {
        const exist = selectedClasses?.find((c)=> c.id === clase.id)
        if (exist){
            setSelectedClasses(selectedClasses?.filter((c)=> c.id !== clase.id ) || null)
        }
        if(!exist && selectedClasses){
            setSelectedClasses([...selectedClasses,clase])
        }}

    function handleSendClasses(){
        const hasArray = new Set<string>();
        let hasConflict = false;
        for(const clase of selectedClasses){
            if(hasArray.has(`${clase.day.id}-${clase.time.id}`)){
                setError({error: true, message: 'No se pueden seleccionar dos clases en el mismo día y horario'});
                hasConflict = true;
                break;
            }
            else{
                hasArray.add(`${clase.day.id}-${clase.time.id}`);
            }
        }
        if(hasConflict) return;
        else setError({error: false, message: ''});

        if(selectedClasses.length > 6){
            setError({error: true, message: 'No se pueden seleccionar más de 6 clases'});
            return;
        }
        setError({error: false, message: ''});
        localStorage.setItem('clases',JSON.stringify(selectedClasses));
        setSelectedClasses([]);
        navigate('/ClassCart');
    }

    const getClasesParaCelda = (diaNombre: string, horaInicio: string) => {
        return clases.filter((clase) => {
            const normalizedClaseDay = clase.day.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const normalizedGridDay = diaNombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const matchDay = normalizedClaseDay === normalizedGridDay;
            const horaClase = clase.time.startTime.substring(0, 5); 
            const matchTime = horaClase === horaInicio;

            return matchDay && matchTime;
        });
    };

    return (
        <div className="container-calendar">
            <h1 className="titulo-clases">Calendario de Clases</h1>

            <div className="container-elements-calendar">
                <select
                    className='select-turno' 
                    value={turnoMañana ? "mañana" : "tarde"} 
                    onChange={(e) => setTurnoMañana(e.target.value === "mañana")}>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                </select>
                
                <div className="footer-calendar">
                    <button 
                    className={(selectedClasses.length > 0 && !isAdmin) ? "btn-agregar" : "btn-agregar disabled"} 
                    onClick={(selectedClasses.length > 0 && !isAdmin) ? handleSendClasses : undefined}>
                        {selectedClasses.length > 0 ? `Agregar (${selectedClasses.length})` : "Agregar Clases"}
                    </button>
                </div>
            </div>

            {/* Contenedor del mensaje de error modificado */}
            {error?.error && (
                <div className="container-error-message">
                    <p className="error-message-calendar">{error.message}</p>
                </div>
            )}
            
            <div className="horario-grid">
                <div className="celda-header celda-hora">HORA</div>
                {DIAS_SEMANA.map((dia) => (
                    <div key={dia.nombre} className="celda-header">
                        {dia.nombre}
                    </div>
                ))}

                {(turnoMañana ? FRANJAS_HORARIAS_MAÑANA : FRANJAS_HORARIAS_TARDE).map((franja) => (
                    <React.Fragment key={franja.horaInicio}>
                        <div className="celda-hora">{franja.label}</div>

                        {DIAS_SEMANA.map((dia) => {
                            const clasesEnCelda = getClasesParaCelda(dia.nombre, franja.horaInicio);

                            return ( 
                                <div key={dia.nombre} className="celda-clase">
                                    <span className="mobile-day-label">{dia.nombre}</span>
                                    <div className="lista-clases">
                                        {clasesEnCelda?.length > 0 ? (
                                            clasesEnCelda.map((clase) => {
                                                const isSelected = selectedClasses.find(item => item.id === clase.id);
                                                return (
                                                    <div 
                                                        key={clase.id} 
                                                        className={`clase-item ${isSelected ? 'selected' : ''}`} 
                                                        onClick={() => handleSelectClass(clase)}>
                                                        {clase.name}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <span className="no-clases-text">-</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
            
            <p className="tableDescription">
                Seleccioná el nombre de la clase a la que querés asistir y hacé clic en el botón <strong>“Agregar”</strong> para sumarla a tu carrito.
            </p>
        </div>
    );
}