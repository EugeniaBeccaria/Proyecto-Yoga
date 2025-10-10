import { useEffect, useRef, useState } from "react";
import "../../styles/admin/CreateClassPage.css";
import { FaPen } from "react-icons/fa"; 
import axios from "axios";

interface classProps {
  name: string;
  description: string;
  // capacityLimit: number;
  day: string;
  time: string;
  room: string;
  profesor: string | null;
}
interface fetchDataProps {
  rooms: Array<{id:number, name:string}>;
  days: Array<{id:number, name:string}>;
  times: Array<{id:number, startTime:string}>;
  professors: Array<{id:number, name:string, email:string}>;
}
function CreateClassPage() {
  const [fetchData, setFetchData] = useState<fetchDataProps>({
    rooms: [],
    days: [],
    times: [],
    professors: []
  });

  const [classData, setClassData] = useState<classProps>({
    name: "",
    description: "",
    // capacityLimit: 0,
    day: "",
    time: "",
    room: "",
    profesor: "",
  });

  const [title, setTitle] = useState("Nombre Clase");
  const [descripcion, setDescripcion] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    LoadData()
  }, []);

  async function LoadData(){
    try{
      const response = await axios('http://localhost:3000/api/rooms')
      const rooms = response.data.data

      const responseDays = await axios('http://localhost:3000/api/days')
      const days = responseDays.data.data

      const responseTimes = await axios('http://localhost:3000/api/times')
      const times = responseTimes.data.data

      const responseProfessors = await axios('http://localhost:3000/api/users?role=professor')
      const professors = responseProfessors.data.data

      //no hay ningun profesor creado - implementar creacion de profesores en el admin

      setFetchData({...fetchData, rooms:rooms, days:days, times:times, professors:professors})
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleClick = () => {
    if (titleRef.current) {
      titleRef.current.contentEditable = "true";
      titleRef.current.classList.add("editing");
      titleRef.current.textContent = "";

      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      range.collapse(true);

      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  
  const stopEditing = () => {
    if (titleRef.current) {
      titleRef.current.contentEditable = "false";
      titleRef.current.classList.remove("editing");
      const value = titleRef.current.textContent?.trim() || "Nombre Clase";
      setTitle(value);
    }
  };

  
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        el.blur();
      }
    };

    el.addEventListener("keydown", handleKeyDown);
    el.addEventListener("blur", stopEditing);

    return () => {
      el.removeEventListener("keydown", handleKeyDown);
      el.removeEventListener("blur", stopEditing);
    };
  }, []);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const classFormData = e.currentTarget.elements;
    const name  = (classFormData.namedItem("nombreClase") as HTMLInputElement).value;
    const description = (classFormData.namedItem("descripcion") as HTMLInputElement).value;
    const idDay = (classFormData.namedItem("dia") as HTMLInputElement).value;
    const idTime = (classFormData.namedItem("hora") as HTMLInputElement).value;
    const idRoom = (classFormData.namedItem("salon") as HTMLInputElement).value;
    const idProfesor = (classFormData.namedItem("profesor") as HTMLInputElement).value;
    // console.log(name, description, idDay, idTime, idRoom, idProfesor)

    setClassData({
      name: name,
      description: description,
      day: idDay,
      time: idTime,
      room: idRoom,
      profesor: idProfesor,
    });  
    sendFormClass()
  };

  async function sendFormClass(){}

  return (
    <div id="top" className="create-class-page">
      
      <div className="page-title">CREAR CLASE</div>

      <div className="form-container">
        <div className="form-inner"> 
          <form id="formClase" onSubmit={handleSubmit}>
          <div className="title-bar-container">
            <div
              id="titleEditable"
              className="title-bar"
              role="button"
              tabIndex={0}
              aria-label="Editar nombre de la clase"
              title="Click para editar"
              ref={titleRef}
              onClick={handleTitleClick}
            >
              {title} <FaPen className="edit-icon" />
            </div>
          </div>

          
          <input type="hidden" id="nombreClase" name="nombreClase" value={title} />

            <div className="panel-verde">
              <div className="form-group">
                <label htmlFor="dia">Día:</label>
                <select id="dia" name="dia">



                  <option value="">Seleccione un día</option>
                  {
                    fetchData.days.map((day) => (
                    <option key={day.id} value={day.id}>{day.name}</option>
                    ))
                  }

                </select>
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora:</label>
                <select id="hora" name="hora">
                  <option value="">Seleccione un horario</option>
                  {
                    fetchData.times.map((time) => (
                      <option key={time.id} value={time.id}>{time.startTime}</option>
                    ))
                  }

                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salon">Salón:</label>
                <select id="salon" name="salon">
                  <option value="">Seleccione un salón</option>
                  {
                    fetchData.rooms.map((room) =>{
                      return(
                        <option key={room.id} value={room.id}>{room.name}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="profesor">Profesor:</label>
                <select id="profesor" name="profesor">
                  <option value="">Seleccione un profesor</option>
                  <option value="1">Mariana López</option>
                  <option value="2">Juan Pérez</option>
                  <option value="3">Laura Sánchez</option>
                </select>
              </div>
            </div>

            <div className="panel-descripcion">
              <div className="form-group">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
            </div>
          
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                ✔ Crear Clase
              </button>
              <button type="reset" className="btn btn-secondary">
                ✘ Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClassPage;
