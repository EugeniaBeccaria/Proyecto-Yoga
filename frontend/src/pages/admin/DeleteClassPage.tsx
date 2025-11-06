import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ClassCalendar.css'; 
// import { useNavigate } from 'react-router-dom';

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

interface errorState {
    error: boolean;
    message: string;
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
    { nombre: 'LUNES', id: 1 },
    { nombre: 'MARTES', id: 2 },
    { nombre: 'MIÉRCOLES', id: 3 },
    { nombre: 'JUEVES', id: 4 },
    { nombre: 'VIERNES', id: 5 },
];


export function DeleteClassPage(){
    const [clases, setClases] = useState<ClaseHorario[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<ClaseHorario[]>([]);
    const [turnoMañana, setTurnoMañana] = useState<boolean>(true);
    const [error, setError] = useState<errorState>({error: false, message: ''});

    // const navigate = useNavigate();

    useEffect(() => {fetchClases()}, []);

    const fetchClases = async () => {
    try {
        const response = await axios('http://localhost:3000/api/classes',{withCredentials: true});
        console.log('Datos de clases recibidos:', response.data.data);
        setClases(response.data.data);
    }
    catch (error) {
        console.error('Error al cargar las clases:', error);
        }
    };


    async function handleDeleteClasses(){
        if(selectedClasses.length === 0) return;

        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar ${selectedClasses.length} clase(s)?`);

        if (!confirmDelete) return;

        try {
            //Eliminar cada clase seleccionada
            for (const clase of selectedClasses) {
                await axios.delete(`http://localhost:3000/api/classes/${clase.id}`, 
                    { withCredentials: true }
                );
            }

            alert('Clases eliminadas con éxito');

            // Refrescar la lista de clases después de eliminarlas
            fetchClases();
            setSelectedClasses([]);

        } catch (error) {
            console.error('Error al eliminar las clases:', error);
            alert('Hubo un error al eliminar las clases. Por favor, intenta nuevamente.');
        }
    }



    function handleSelectClass(clase: ClaseHorario) {
        const exist = selectedClasses?.find((c)=> c.id === clase.id)
        if (exist){
            setSelectedClasses(selectedClasses?.filter((c)=> c.id !== clase.id ) || null)
        }
        if(!exist && selectedClasses){
            setSelectedClasses([...selectedClasses,clase])
        }}

    {/*function handleSendClasses(){
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
        console.log('Clases seleccionadas para agregar:', selectedClasses);
        localStorage.setItem('clases',JSON.stringify(selectedClasses));
        setSelectedClasses([]);
        navigate('/ClassCart');
    }*/}

    // filtra las clases que coinciden con una celda (día y hora)
    const getClasesParaCelda = (diaId: number, horaInicio: string) => {
        return clases.filter((clase) => clase.day.id === diaId && clase.time.startTime === horaInicio);
    };

    return (
        <div className="container-calendar">
        <h1 className="titulo-clases">Eliminar Clase</h1>

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
                className={selectedClasses.length > 0 ? "btn-agregar" : "btn-agregar disabled"} 
                onClick={selectedClasses.length > 0 ? handleDeleteClasses : undefined}>
                    Eliminar Clase
                </button>
            </div>
        </div>
        {error.error && <p className="error-message-calendar">{error.message}</p>}
        <div className="horario-grid">
            <div className="celda-header celda-hora">HORA</div>
            {DIAS_SEMANA.map((dia) => (
                <div key={dia.id} className="celda-header">
                    {dia.nombre}
                </div>
            ))}
            {(
                turnoMañana ? FRANJAS_HORARIAS_MAÑANA : FRANJAS_HORARIAS_TARDE).map((franja) => (
                <React.Fragment key={franja.horaInicio}>
                    <div className="celda-hora">{franja.label}</div>

                    {DIAS_SEMANA.map((dia) => {
                        const clasesEnCelda = getClasesParaCelda(dia.id, franja.horaInicio);

                        //IMPORTANTE --- HAY QUE MOSTRAR SOLO LAS CLASES QUE SIGAN TENIENDO CAPACIDAD DISPONIBLE
                        return ( 
                            <div key={dia.id} className="celda-clase">
                                {clasesEnCelda?.length > 0 && (
                                    <div className="lista-clases">
                                        {clasesEnCelda?.map((clase) => {
                                            // verifica si la clase está seleccionada
                                            const isSelected = selectedClasses.find(item => item.id === clase.id);
                                            return (
                                                <div 
                                                key={clase.id} 
                                                // asignacion de clase condicional para resaltar la seleccion
                                                className={`clase-item ${isSelected ? 'selected' : ''}`} 
                                                onClick={() => handleSelectClass(clase)}>
                                                {clase.name}
                                                </div>
                                            );
                                            })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
        <p className="tableDescription">
            Seleccioná el nombre de la clase que quieres eliminar y hacé clic en el botón <strong>“Eliminar”</strong> para eliminarla.
        </p>
    </div>
    )  
};
