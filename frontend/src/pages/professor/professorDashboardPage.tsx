import { useEffect, useState } from "react";
import "../../styles/professor/professorDashboardPage.css";
import type { Day, Time, Rooms } from "../../types/class.type";
import { classService } from "../../service/class.service";
import { tallerService } from "../../service/tallerserviceFront";
import type { TallerApi } from "../../types/taller.type";

interface User {
  id: string;
  name: string;
  lastname?: string;
  email: string;
}

interface Classs {
  id: string;
  name: string;
  description: string;
  capacityLimit: number;
  day: Day;
  time: Time;     
  room: Rooms;
  users: User[];     
}

function ProfessorDashboardPage() {
  const [classes, setClasses] = useState<Classs[]>([]);
  const [talleres, setTalleres] = useState<TallerApi[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [expandedTallerId, setExpandedTallerId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesData, talleresData] = await Promise.all([
          classService.getMyClasses(),
          tallerService.getMyTalleres()
        ]);
        setClasses(classesData);
        setTalleres(talleresData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []); 
  
  const handleToggleStudents = (classId: string) => {
    if (expandedClassId === classId) {
      setExpandedClassId(null);
    } else {
      setExpandedClassId(classId);
    }
  };

  const handleToggleTallerStudents = (tallerId: string) => {
    if (expandedTallerId === tallerId) {
      setExpandedTallerId(null);
    } else {
      setExpandedTallerId(tallerId);
    }
  };

  return (
    <div className="dashboard-prof-container"> 
      
      <div className="dashboard-prof-header">
        <h1 className="dashboard-prof-title">Panel de Profesor</h1>
        <h2 className="dashboard-prof-subtitle">Mis Próximas Clases</h2>
      </div>
      
      <div className="dashboard-prof-content"> 
        {isLoading ? (
          <p className="loading-text">Cargando tus clases...</p>
        ) : classes.length > 0 ? (
          <div className="classes-list">
            {classes.map((classItem) => (
              <div key={classItem.id} className="class-list-item">
                
                <div className="class-item-header">
                  <div className="class-item-info">
                    <h3>{classItem.name}</h3>
                    <p>{classItem.day.name} - {classItem.time.startTime} | Salón: {classItem.room.name}</p>
                  </div>

                  <div className="class-item-details">
                    <p className="student-count">
                      Inscriptos: 
                      <strong> {classItem.users.length} / {classItem.capacityLimit}</strong>
                    </p>
                  </div>
                  
                  <div className="class-item-actions">
                    <button 
                      className="toggle-students-btn" 
                      onClick={() => handleToggleStudents(classItem.id)}
                    >
                      {expandedClassId === classItem.id ? 'Ocultar Alumnos' : 'Ver Alumnos'}
                    </button>
                  </div>
                </div>

                {expandedClassId === classItem.id && (
                  <div className="student-list">
                    <h4>Alumnos Inscriptos:</h4>
                    {classItem.users.length > 0 ? (
                      <ul>
                        {classItem.users.map(user => (
                          <li key={user.id}>
                            <span className="student-name">{user.name} {user.lastname || ""}</span> 
                            <span className="student-email">({user.email})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-students">No hay alumnos inscriptos en esta clase.</p>
                    )}
                  </div>
                )} 
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-classes-message">
            <p>Aún no tienes ninguna clase asignada.</p>
            <p>Cuando se te asigne una, aparecerá aquí.</p>
          </div>
        )}

        <div className="dashboard-prof-header" style={{ marginTop: '40px' }}>
          <h2 className="dashboard-prof-subtitle">Mis Próximos Talleres</h2>
        </div>
        
        {isLoading ? (
          <p className="loading-text">Cargando tus talleres...</p>
        ) : talleres.length > 0 ? (
          <div className="classes-list">
            {talleres.map((tallerItem) => {
              const datetimeDate = new Date(tallerItem.datetime);
              const formattedDate = !isNaN(datetimeDate.getTime()) 
                ? datetimeDate.toLocaleDateString() 
                : tallerItem.datetime;

              return (
              <div key={tallerItem.id} className="class-list-item">
                
                <div className="class-item-header">
                  <div className="class-item-info">
                    <h3>{tallerItem.name}</h3>
                    <p>{formattedDate} {tallerItem.time?.startTime ? `- ${tallerItem.time.startTime}` : ''} | Salón: {tallerItem.room?.name || 'N/A'}</p>
                  </div>

                  <div className="class-item-details">
                    <p className="student-count">
                      Inscriptos: 
                      <strong> {tallerItem.users?.length || 0} / {tallerItem.cupo}</strong>
                    </p>
                  </div>
                  
                  <div className="class-item-actions">
                    <button 
                      className="toggle-students-btn" 
                      onClick={() => handleToggleTallerStudents(tallerItem.id)}
                    >
                      {expandedTallerId === tallerItem.id ? 'Ocultar Alumnos' : 'Ver Alumnos'}
                    </button>
                  </div>
                </div>

                {expandedTallerId === tallerItem.id && (
                  <div className="student-list">
                    <h4>Alumnos Inscriptos:</h4>
                    {tallerItem.users && tallerItem.users.length > 0 ? (
                      <ul>
                        {tallerItem.users.map(user => (
                          <li key={user.id}>
                            <span className="student-name">{user.name} {user.lastname || ""}</span> 
                            <span className="student-email">({user.email})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-students">No hay alumnos inscriptos en este taller.</p>
                    )}
                  </div>
                )} 
              </div>
            )})}
          </div>
        ) : (
          <div className="empty-classes-message">
            <p>Aún no tienes ningún taller asignado.</p>
            <p>Cuando se te asigne uno, aparecerá aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfessorDashboardPage;