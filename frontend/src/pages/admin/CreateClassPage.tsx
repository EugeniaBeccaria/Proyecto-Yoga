import { useEffect, useRef, useState } from "react";
import "../../styles/admin/CreateClassPage.css";
import { FaPen } from "react-icons/fa"; 

function CreateClassPage() {
  const [title, setTitle] = useState("Nombre Clase");
  const [descripcion, setDescripcion] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);

  // Maneja activar la edición
  const handleTitleClick = () => {
    if (titleRef.current) {
      titleRef.current.contentEditable = "true";
      titleRef.current.classList.add("editing");

      // 👇 limpiar el texto cuando empieza la edición
      titleRef.current.textContent = "";

      // Poner el cursor al inicio
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      range.collapse(true);

      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };


  // Maneja terminar la edición
  const stopEditing = () => {
    if (titleRef.current) {
      titleRef.current.contentEditable = "false";
      titleRef.current.classList.remove("editing");
      const value = titleRef.current.textContent?.trim() || "Nombre Clase";
      setTitle(value);
    }
  };

  // Eventos de teclado y blur
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

  // Submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Clase creada: ${title}`);
  };

  return (
    <div className="background-grid">
      <div className="top-button">CREAR CLASE</div>

      <div className="form-container">
        <div className="form-inner"> 

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
          {/* Valor oculto */}
          <input type="hidden" id="nombreClase" name="nombreClase" value={title} />

          <form id="formClase" onSubmit={handleSubmit}>
            <div className="panel-verde">
              <div className="form-group">
                <label htmlFor="dia">Día:</label>
                <select id="dia" name="dia">
                  <option value="">Seleccione un día</option>
                  <option value="lunes">Lunes</option>
                  <option value="martes">Martes</option>
                  <option value="miercoles">Miércoles</option>
                  <option value="jueves">Jueves</option>
                  <option value="viernes">Viernes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora:</label>
                <select id="hora" name="hora">
                  <option value="">Seleccione un horario</option>
                  <option value="10:00">10:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:30">16:30</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salon">Salón:</label>
                <select id="salon" name="salon">
                  <option value="">Seleccione un salón</option>
                  <option value="a">Salón A</option>
                  <option value="b">Salón B</option>
                  <option value="c">Salón C</option>
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
