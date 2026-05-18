import { useEffect, useState } from "react";
import "../../styles/admin/ListTalleresPage.css"; // Crearemos estos estilos
import { tallerService } from "../../service/tallerserviceFront";
import type { TallerApi } from "../../types/taller.type";

// Definimos una interfaz local para mapear la estructura si difiere
// (Asegúrate de que TallerApi contenga la información de 'users', o adáptalo según tu backend)
interface User {
  id: string;
  name: string;
  lastname?: string;
  email: string;
}

function ListTalleresPage() {
  const [talleres, setTalleres] = useState<TallerApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTallerId, setExpandedTallerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const data = await tallerService.getTalleres();
        setTalleres(data);
      } catch (error) {
        console.error("Error al obtener los talleres:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalleres();
  }, []);

  const handleToggleStudents = (tallerId: string) => {
    if (expandedTallerId === tallerId) {
      setExpandedTallerId(null);
    } else {
      setExpandedTallerId(tallerId);
    }
  };

  return (
    <div className="admin-talleres-container">
      <div className="admin-talleres-header">
        <h1 className="admin-talleres-title">Panel de Administración</h1>
        <h2 className="admin-talleres-subtitle">Gestión y Visualización de Talleres</h2>
      </div>

      <div className="admin-talleres-content">
        {isLoading ? (
          <p className="loading-text">Cargando talleres...</p>
        ) : talleres.length > 0 ? (
          <div className="talleres-list">
            {talleres.map((taller) => (
              <div key={taller.id} className="taller-list-item">
                <div className="taller-item-header">
                  <div className="taller-item-info">
                    <h3>{taller.name}</h3>
                    <p className="taller-description">Descripción: {taller.description}</p>
                    <p className="taller-meta">
                      Fecha y hora: {taller.datetime} {taller.time ? ` - ${taller.time.startTime}` : ""} | Salón: {taller.room.name}
                    </p>
                    <p className="taller-meta">
                      Prof: {taller.professor.name} {taller.professor.lastname} |  Precio: ${taller.price}
                    </p>
                  </div>

                  <div className="taller-item-details">
                    <p className="student-count">
                      Inscriptos: 
                      <strong> {(taller.users || []).length} / {taller.cupo}</strong>
                    </p>
                  </div>
                  
                  <div className="taller-item-actions">
                    <button 
                      className="toggle-students-btn" 
                      onClick={() => handleToggleStudents(taller.id)}
                    >
                      {expandedTallerId === taller.id ? 'Ocultar Alumnos' : 'Ver Alumnos'}
                    </button>
                  </div>
                </div>

                {expandedTallerId === taller.id && (
                  <div className="student-list">
                    <h4>Alumnos Inscriptos al Taller:</h4>
                    {(taller.users || []).length > 0 ? (
                      <ul>
                        {(taller.users || []).map((user: User) => (
                          <li key={user.id}>
                            <span className="student-name">
                              {user.name} {user.lastname}
                            </span>
                            <span className="student-email">({user.email})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-students">No hay alumnos inscriptos en este taller aún.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-talleres-message">
            <p>No hay talleres creados en el sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListTalleresPage;