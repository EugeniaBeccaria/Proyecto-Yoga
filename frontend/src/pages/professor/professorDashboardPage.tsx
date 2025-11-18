import { useEffect, useState } from "react";
import "../../styles/professor/professorDashboardPage.css";
import type { Day, Time, Rooms } from "../../types/class.type";
import { classService } from "../../service/class.service";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Classs {
  id: number;
  name: string;
  description: string;
  capacityLimit: number;
  day: Day;       // Una clase tiene un objeto Día
  time: Time;     
  room: Rooms;
  users: User[];     
}

function ProfessorDashboardPage() {

  const [classes, setClasses] = useState<Classs[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [expandedClassId, setExpandedClassId] = useState<number | null>(null);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await classService.getMyClasses();        
        setClasses(classes);
      } catch (error) {
        console.error("Error al obtener las clases:", error);
      } finally {
      setIsLoading(false); 
    }
    };

    fetchClasses();
  }, []); 
  
  const handleToggleStudents = (classId: number) => {
  if (expandedClassId === classId) {
    setExpandedClassId(null);
  } else {
    setExpandedClassId(classId);
  }
    };

return (
    <div className="dashboard-prof-container"> 
      
      <div className="dashboard-prof-header">
        <h1 className="dashboard-prof-title"> Panel de Profesor</h1>
        <h2 className="dashboard-prof-subtitle"> Mis Próximas Clases</h2>
      </div>
      
      <div> 
        {isLoading ? (
          <p className="loading-message"> Cargando tus clases...</p>
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
                      {expandedClassId === classItem.id ? 'Ocultar' : 'Ver Alumnos'}
                    </button>
                  </div>
                </div>

                {expandedClassId === classItem.id && (
                  <div className="student-list">
                    <h4>Alumnos Inscriptos:</h4>
                    {classItem.users.length > 0 ? (
                      <ul>
                        {classItem.users.map(user => (
                          <li key={user.id}>{user.name} - ({user.email})</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay alumnos inscriptos en esta clase.</p>
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
      </div>
    </div>
  );
}

export default ProfessorDashboardPage;