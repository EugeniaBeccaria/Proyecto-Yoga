import { useEffect, useState } from "react";
import axios from 'axios';
import "../../styles/professor/professorDashboardPage.css";


interface Day {
  id: number;
  name: string; }

interface Time {
  id: number;
  startTime: string; 
}
interface Room {
  id: number;
  name: string; 
}

interface Classs {
  id: number;
  name: string;
  description: string;
  day: Day;       // Una clase tiene un objeto Día
  time: Time;     
  room: Room;     
}

function ProfessorDashboardPage() {

  const [classes, setClasses] = useState<Classs[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/classes/professor/classes', { withCredentials: true });        
        setClasses(response.data.data);
      } 
      catch (error) {console.error("Error al obtener las clases:", error);}
      finally { 
      setIsLoading(false); 
    }
    };

    fetchClasses();
  }, []); 


  return (
    <div className="dashboard-prof-container"> 
      <h1 className="dashboard-prof-title"> Panel de Profesor</h1>
      <h2 className="dashboard-prof-subtitle"> Mis Próximas Clases</h2>
      <div> {isLoading ? (<p className="loading-message"> Cargando tus clases...</p>): 
        classes.length > 0 ? (
          <div className="classes-grid">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-card">
              <h3>{classItem.name}</h3>
              <p>{classItem.day.name} - {classItem.time.startTime}</p>
              <p>Salón: {classItem.room.name}</p>
            </div>
          ))}
        </div> ): 
      ( <div className="empty-classes-message">
          <p>Aún no tienes ninguna clase asignada.</p>
          <p>Cuando se te asigne una, aparecerá aquí.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default ProfessorDashboardPage;