import { useEffect, useState } from "react";
import type { TallerApi } from "../../types/taller.type";
import { tallerService } from "../../service/tallerserviceFront";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/ListTalleresPage.css";

export default function ListTalleresPage() {
  const [talleres, setTalleres] = useState<TallerApi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTaller, setSelectedTaller] = useState<TallerApi | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [expandedDescId, setExpandedDescId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTalleres();
  }, []);

  const fetchTalleres = async () => {
    try {
      setLoading(true);
      const data = await tallerService.getTalleres();
      setTalleres(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al cargar los talleres");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAlumnosModal = (taller: TallerApi) => {
    setSelectedTaller(taller);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTaller(null);
    setShowModal(false);
  };

  const toggleDescription = (id: number) => {
    setExpandedDescId((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "";

    const cleanDate = dateStr.split("T")[0];
    const parts = cleanDate.split("-");

    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
    }

    return dateStr;
  };

  const calculateEndTime = (startTime?: string): string => {
    if (!startTime) return "";

    const [hoursStr, minutesStr] = startTime.split(":");
    const hours = parseInt(hoursStr, 10);

    if (isNaN(hours)) return "";

    const nextHour = (hours + 1) % 24;
    const formattedHour = String(nextHour).padStart(2, "0");
    const formattedMinutes = minutesStr ? minutesStr.padStart(2, "0") : "00";

    return `${formattedHour}:${formattedMinutes}`;
  };

  if (loading) {
    return <div className="talleres-loading">Cargando talleres...</div>;
  }

  if (error) {
    return <div className="talleres-error">{error}</div>;
  }

  return (
    <div className="list-talleres-container">
      <div className="list-talleres-header">
        <h1>Listado de Talleres</h1>
        <button
          className="btn-crear-taller"
          onClick={() => navigate("/CreateTallerPage#crearTalleres")}
        >
          Crear Nuevo Taller
        </button>
      </div>

      {talleres.length === 0 ? (
        <p className="no-talleres">No hay talleres registrados en este momento.</p>
      ) : (
        <div className="table-responsive">
          <table className="talleres-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Horario</th>
                <th>Precio</th>
                <th>Cupo Disponible</th>
                <th>Inscritos</th>
              </tr>
            </thead>
            <tbody>
              {talleres.map((taller) => {
                const totalInscritos = taller.users ? taller.users.length : 0;
                const cupoTotal = taller.cupo || 0;
                const cupoDisponible = Math.max(0, cupoTotal - totalInscritos);
                const isExpanded = expandedDescId === Number(taller.id);
                const desc = taller.description || "";
                const isLong = desc.length > 35;

                return (
                  <tr key={taller.id}>
                    <td>
                      <span className="taller-name-cell">{taller.name}</span>
                    </td>
                    <td className="taller-desc-cell">
                      <div className="desc-content-wrapper">
                        {isLong ? (
                          <>
                            <span>{isExpanded ? desc : `${desc.slice(0, 35)}... `}</span>
                            <button
                              type="button"
                              className="btn-ver-mas-desc"
                              onClick={() => toggleDescription(Number(taller.id))}
                            >
                              {isExpanded ? "Ver menos" : "Ver más"}
                            </button>
                          </>
                        ) : (
                          <span>{desc || "—"}</span>
                        )}
                      </div>
                    </td>
                    <td>{formatDate(taller.datetime)}</td>
                    <td>
                      {taller.time?.startTime} - {calculateEndTime(taller.time?.startTime)}
                    </td>
                    <td>${taller.price}</td>
                    <td>
                      {cupoDisponible === 0 ? (
                        <span className="cupo-agotado">Agotado</span>
                      ) : (
                        `${cupoDisponible} de ${cupoTotal}`
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-ver-alumnos"
                        onClick={() => handleOpenAlumnosModal(taller)}
                      >
                        Ver Alumnos ({totalInscritos})
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedTaller && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h2>Alumnos Inscritos</h2>
                <span className="modal-taller-subtitle">{selectedTaller.name}</span>
              </div>
              <button className="btn-close-modal" onClick={handleCloseModal} aria-label="Cerrar">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {!selectedTaller.users || selectedTaller.users.length === 0 ? (
                <div className="modal-empty-state">
                  <p>No hay alumnos inscritos en este taller todavía.</p>
                </div>
              ) : (
                <div className="modal-table-responsive">
                  <table className="modal-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTaller.users.map((alumno) => (
                        <tr key={alumno.id}>
                          <td>{alumno.name}</td>
                          <td>{alumno.lastname}</td>
                          <td>{alumno.email}</td>
                          <td>{alumno.phone || "No proporcionado"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cerrar" onClick={handleCloseModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}