import { useEffect, useRef, useState } from "react";
import "../../styles/admin/CreateClassPage.css";
import { FaPen } from "react-icons/fa"; 
import axios from "axios";

interface classProps {
  name: string;
  description: string;
  capacityLimit: number;
  day: number;
  time: number;
  room: number;
  professor: number | null;
}
interface fetchDataProps {
  rooms: Array<{id:number, name:string}>;
  days: Array<{id:number, name:string}>;
  times: Array<{id:number, startTime:string}>;
  professors: Array<{id:number, name:string, email:string}>;
}
interface error {
  error: boolean,
  message:string
}

function CreateClassPage() {
  const [fetchData, setFetchData] = useState<fetchDataProps>({
    rooms: [],
    days: [],
    times: [],
    professors: []
  });

  // const [classData, setClassData] = useState<classProps>({
  //   name: "",
  //   description: "",
  //   // capacityLimit: 0,
  //   day: 0,
  //   time: 0,
  //   room: 0,
  //   profesor: 0,
  // });
  const [classCreated, setClassCreated] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<error>({
    error:false,
    message:''
  })
  const [count, setCount] = useState(0); 
  const [title, setTitle] = useState("Nombre Clase");
  const [descripcion, setDescripcion] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    LoadData()
  }, []);

  async function LoadData(){
    try{
      const [roomsRes, daysRes, timesRes, professorsRes] = await Promise.all([
      axios('http://localhost:3000/api/rooms', { withCredentials: true }),
      axios('http://localhost:3000/api/days', { withCredentials: true }),
      axios('http://localhost:3000/api/times', { withCredentials: true }),
      axios('http://localhost:3000/api/users?role=professor', { withCredentials: true })
    ]);

      console.log(roomsRes.data.data ,daysRes.data.data,timesRes.data.data, professorsRes.data.data)

      setFetchData({
        rooms:roomsRes.data.data, 
        days:daysRes.data.data, 
        times:timesRes.data.data, 
        professors:professorsRes.data.data
      })

    } catch (error) {
      console.error('Error al cargar los datos iniciales ',error);
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
    const capacityLimit = parseInt((classFormData.namedItem("capacityLimit") as HTMLInputElement).value);
    const idDay = Number((classFormData.namedItem("dia") as HTMLInputElement).value);
    const idTime = Number((classFormData.namedItem("hora") as HTMLInputElement).value);
    const idRoom = Number((classFormData.namedItem("salon") as HTMLInputElement).value);
    const idProfessor = Number((classFormData.namedItem("profesor") as HTMLInputElement).value);

    const classData: classProps = ({
      name: name,
      description: description,
      capacityLimit: capacityLimit,
      day: idDay,
      time: idTime,
      room: idRoom,
      professor: idProfessor,
    });
    sendFormClass(classData);
  };

  async function sendFormClass(classData: classProps){
    try{
      const response = await axios.post('http://localhost:3000/api/classes', {classData}, {withCredentials: true})
      
      if(response.status === 201){
        console.log("class created")
        setMessageError({error:false, message:''})
        setClassCreated(true);
        setTimeout(()=>{
          setClassCreated(false);
          // window.location.href = "#top"; 
          // window.location.reload(); 
        }, 2500);
      }

    }
    catch(error){
      if (axios.isAxiosError(error)){
        if (error.response){

          if(error.response.status === 400){
            console.log('flag')
            setMessageError({error:true,message:'Campos incompletos'})
          }
          if(error.response.status === 404){
            setMessageError({error:true,message:'Error de servidor'})
          }
          if(error.response.status === 409){
            setMessageError({error:true,message:'Clase existente'})
          }
        }
      }
      else setMessageError({error:true, message:'Error inesperado'})
    }
  }


  return (
    <div id="top" className="create-class-page">
      
      <h1 className="title-class-page">Crear Clase</h1>
      {/*<div className="page-title">CREAR CLASE</div>*/}

      {/*<div className="form-container">*/}
        {/*<div className="form-inner"> */}
        <form id="formClase" className="form-create-class" onSubmit={handleSubmit}>
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

              {/*<div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="name"
                  value={classCreated.name}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de la"
                />
              </div>*/}
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
                  {
                    fetchData.professors.map((professor) =>{
                      return(
                        <option key={professor.id} value={professor.id}>{professor.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            <div className="form-group">
              <label htmlFor="capacityLimit">Límite de Capacidad:</label>
              <input
                type="number"
                id="capacityLimit"
                name="capacityLimit"
                value={count}
                min={0}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setCount(isNaN(value) ? 0 : value);
                }}
                />
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
                  {
                    classCreated && (
                      <div className="success-message">
                        Clase creada exitosamente.
                      </div>
                    )
                  }
                  {
                    messageError.error && (
                      <div className="error-message">
                        {messageError.message}
                      </div>
                    )
                  }
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                ✔ Crear Clase
              </button>
              <button type="reset" className="btn btn-secondary">
                ✘ Cancelar
              </button>
            </div>
          </form>
        {/*</div>*/}
      {/*</div>*/}
    </div>
  );
}

export default CreateClassPage;
