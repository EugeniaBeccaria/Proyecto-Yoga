import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/ClassCalendar.css'; 
// import { useNavigate } from 'react-router-dom';

interface ClaseHorario {
    id: string;
    name: string; 
    description: string;
    capacityLimit: number;
    enrolledCount: number;
    deletedAt: Date | null;
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
    { nombre: 'LUNES' },
    { nombre: 'MARTES' },
    { nombre: 'MIÉRCOLES'},
    { nombre: 'JUEVES' },
    { nombre: 'VIERNES' },
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
        const allClasses: ClaseHorario[] = response.data.data;
        const availableClasses = allClasses.filter(clase => clase.deletedAt === null); 
        setClases(availableClasses);
    }
    catch (error) {
        console.error('Error al cargar las clases:', error);
        }
    };


    async function handleDeleteClasses() {
    if (selectedClasses.length === 0) return;

    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar ${selectedClasses.length} clase(s)?`);
    if (!confirmDelete) return;

    try {
        const deletePromises = selectedClasses.map(clase => 
            axios.delete(`http://localhost:3000/api/classes/${clase.id}`, { withCredentials: true })
        );

        const results = await Promise.allSettled(deletePromises);

        const rejected = results.filter(r => r.status === 'rejected');
        
        if (rejected.length > 0) {
            const firstError = rejected[0].reason.response?.data?.message || "Error desconocido";
            alert(`Se eliminaron algunas clases, pero ${rejected.length} fallaron. Motivo principal: ${firstError}`);
        } else {
            alert('Todas las clases seleccionadas fueron dadas de baja con éxito');
        }

        fetchClases();
        setSelectedClasses([]);

    } catch (error) {
        console.error('Error crítico en el proceso de eliminación:', error);
        alert('Hubo un error inesperado al procesar la eliminación.');
    }
}

    function handleSelectClass(clase: ClaseHorario) {
        if (clase.enrolledCount > 0) return;
        const exist = selectedClasses?.find((c)=> c.id === clase.id)
        if (exist){
            setSelectedClasses(selectedClasses?.filter((c)=> c.id !== clase.id ) || null)
        }
        if(!exist && selectedClasses){
            setSelectedClasses([...selectedClasses,clase])
        }
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
                <div key={dia.nombre} className="celda-header">
                    {dia.nombre}
                </div>
            ))}
            {(
                turnoMañana ? FRANJAS_HORARIAS_MAÑANA : FRANJAS_HORARIAS_TARDE).map((franja) => (
                <React.Fragment key={franja.horaInicio}>
                    <div className="celda-hora">{franja.label}</div>

                    {DIAS_SEMANA.map((dia) => {
                        const clasesEnCelda = getClasesParaCelda(dia.nombre, franja.horaInicio);

                        return ( 
                            <div key={dia.nombre} className="celda-clase">
                                {clasesEnCelda?.length > 0 && (
                                    <div className="lista-clases">
                                        {clasesEnCelda?.map((clase) => {
                                            const isSelected = selectedClasses.find(item => item.id === clase.id);
                                            const isDisabled = clase.enrolledCount > 0; 

                                            return (
                                                <div 
                                                    key={clase.id} 
                                                    className={`clase-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled-grey' : ''}`} 
                                                    onClick={() => handleSelectClass(clase)}
                                                    title={isDisabled ? "No se puede eliminar: tiene alumnos inscriptos" : ""}
                                                    style={isDisabled ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
                                                >
                                                    {clase.name}
                                                    {isDisabled && <span style={{ marginLeft: '5px' }}></span>}
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
            Seleccioná el nombre de la clase que quieres eliminar y hacé clic en el botón <strong>“Eliminar”</strong> para eliminarla. <span style={{color: 'red'}}>Las clases que tienen alumnos inscriptos no pueden ser eliminadas.</span>
        </p>
    </div>
    )  
};
