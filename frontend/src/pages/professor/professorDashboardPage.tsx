import { useEffect, useState } from "react";
import axios from 'axios';
import "../../styles/professor/professorDashboardPage.css";

interface Day {
  id: number;
  name: string; }

interface Time {
  id: number;
  hour: string; 
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
  time: Time;     // Una clase tiene un objeto Hora
  room: Room;     // Una clase tiene un objeto Salón
}

function ProfessorDashboardPage() {

  const [classes, setClasses] = useState<Classs[]>([]);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/classes');
        setClasses(response.data);
      } 
      catch (error) {console.error("Error al obtener las clases:", error);}
    };

    fetchClasses();
  }, []); 


  return (
    <div>
      <h1>Panel del Profesor</h1>
    </div>
  );
}

export default ProfessorDashboardPage;