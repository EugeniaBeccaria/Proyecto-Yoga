import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "../../styles/admin/ListAlumnosPage.css";
import { deleteProfesor } from "../../service/userServiceFront";

type Clase = {
    id: string;
    name: string;
    day?: { id: string; name: string };
    time?: { id: string; startTime: string };
    room?: { id: string; name: string };
    deletedAt?: string | null;
}

type Alumno = {
    id: string;
    name: string;
    lastname?: string;
    email: string;
    membership?: string;
    classes: Clase[];
};

type Profesor = {
    id: string;
    name: string;
    lastname?: string;
    email: string;
    phone?: string;
    dni?: string;
    taughtClasses: Clase[];
    deletedAt?: string | null;
};

export default function ListAlumnosPage() {
    const [activeTab, setActiveTab] = useState<"students" | "professors">("students");
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [expandedProfessors, setExpandedProfessors] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const [profesorIdToDelete, setProfesorIdToDelete] = useState<string | null>(null);
    const [infoModal, setInfoModal] = useState<{ title: string; message: string; isError?: boolean } | null>(null);
    
    const toggleProfessorClasses = (profId: string) => {
        setExpandedProfessors(prev => ({
            ...prev,
            [profId]: !prev[profId]
        }));
    };

    const handleOpenModal = (id: string) => {
        const profesorSeleccionado = profesores.find(p => p.id === id);
        
        if (profesorSeleccionado && profesorSeleccionado.taughtClasses && profesorSeleccionado.taughtClasses.length > 0) {
            setInfoModal({
                title: "Acción no permitida",
                message: "No se puede dar de baja al profesor porque tiene clases asignadas. Por favor, elimine sus clases primero.",
                isError: true
            });
            return;
        }

        setProfesorIdToDelete(id);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        setProfesorIdToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!profesorIdToDelete) return;

        try {
            await deleteProfesor(profesorIdToDelete);
            setProfesores((prevProfesores) =>
            prevProfesores.map((profesor) =>
                profesor.id === profesorIdToDelete
                ? { ...profesor, deletedAt: new Date().toISOString() }
                : profesor
            )
            );
            setInfoModal({
                title: "Operación exitosa",
                message: "Profesor dado de baja correctamente.",
                isError: false
            });
        } catch (error) {
            console.error('Error al dar de baja al profesor:', error);
            setInfoModal({
                title: "Error",
                message: "Ocurrió un error al intentar dar de baja al profesor.",
                isError: true
            });
        } finally {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users/students", { withCredentials: true });
                const alumnosFiltrados = res.data.data.map((alumno: Alumno) => ({
                    ...alumno,
                    classes: alumno.classes?.filter(clase => !clase.deletedAt) || []
                }));
                setAlumnos(alumnosFiltrados);
            } catch (error) {
                console.error("Error al traer los alumnos", error);
            }
        };

        const fetchProfesores = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users?role=professor", { withCredentials: true });
                const profesoresFiltrados = res.data.data.map((profesor: Profesor) => ({
                    ...profesor,
                    taughtClasses: profesor.taughtClasses?.filter(clase => !clase.deletedAt) || []
                }));
                setProfesores(profesoresFiltrados);
            } catch (error) {
                console.error("Error al traer los profesores", error);
            }
        };

        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchAlumnos(), fetchProfesores()]);
            setLoading(false);
        };
        
        loadData();
    }, []);

    const filteredAlumnos = alumnos.filter(alumno => {
        const fullName = `${alumno.name} ${alumno.lastname || ""}`.toLowerCase();
        return fullName.includes(search.toLowerCase()) || 
                alumno.email.toLowerCase().includes(search.toLowerCase());
    });

    const filteredProfesores = profesores.filter(profe => {
        const fullName = `${profe.name} ${profe.lastname || ""}`.toLowerCase();
        return fullName.includes(search.toLowerCase()) || 
                profe.email.toLowerCase().includes(search.toLowerCase());
    });

    const getMembershipLabel = (membership?: string) => {
        if (!membership || membership === "Sin membresía activa") {
            return { text: "Sin membresía activa", variant: "inactive" };
        }

        return { text: `Activa: ${membership}`, variant: "active" };
    };

    return (
    <div className="list-alumnos-container">
        <h1 className="list-alumnos-title">
            {activeTab === "students" ? "Listado de Alumnos" : "Listado de Profesores"}
        </h1>

        <div className="tabs-container">
            <button
                className={`tab-button ${activeTab === "students" ? "active" : ""}`}
                onClick={() => {
                    setActiveTab("students");
                    setSearch("");
                }}
            >
                Alumnos
            </button>
            <button
                className={`tab-button ${activeTab === "professors" ? "active" : ""}`}
                onClick={() => {
                    setActiveTab("professors");
                    setSearch("");
                }}
            >
                Profesores
            </button>
        </div>

        <input
            type="text"
            placeholder={activeTab === "students" ? "Buscar por nombre o email de alumno" : "Buscar por nombre o email de profesor"}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
        />

        {loading ? (
            <p className="loading-text">
                {activeTab === "students" ? "Cargando alumnos..." : "Cargando profesores..."}
            </p>
        ) : activeTab === "students" ? (
            filteredAlumnos.length === 0 ? (
                <p className="loading-text">No se encontraron alumnos.</p>
            ) : (
                <div className="table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Nombre del Alumno</th>
                                <th>Email</th>
                                <th>Membresía</th>
                                <th>Clases Inscripto</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAlumnos.map(alumno => (
                                <tr key={alumno.id}>
                                    <td>{alumno.name} {alumno.lastname || ""}</td>
                                    <td>{alumno.email}</td>
                                    <td>
                                        {(() => {
                                            const membership = getMembershipLabel(alumno.membership);

                                            return (
                                                <span className={`membership-badge ${membership.variant}`}>
                                                    {membership.text}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td>
                                        {alumno.classes.length > 0 ? (
                                            alumno.classes.map(clase => clase.name).join(", ")
                                        ) : (
                                            "No se inscribió en ninguna clase"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        ) : (
            filteredProfesores.length === 0 ? (
                <p className="loading-text">No se encontraron profesores.</p>
            ) : (
                <div className="table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Nombre del Profesor</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>DNI</th>
                                <th>Clases que Dicta</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProfesores.map(profe => (
                                <Fragment key={profe.id}>
                                    <tr style={{ opacity: profe.deletedAt ? 0.6 : 1 }}>
                                        <td>{profe.name} {profe.lastname || ""}</td>
                                        <td>{profe.email}</td>
                                        <td>{profe.phone || "No especificado"}</td>
                                        <td>{profe.dni || "No especificado"}</td>
                                        <td>
                                            {profe.taughtClasses && profe.taughtClasses.length > 0 ? (
                                                <button 
                                                    className="view-classes-btn"
                                                    onClick={() => toggleProfessorClasses(profe.id)}
                                                >
                                                    <span>{profe.taughtClasses.length} {profe.taughtClasses.length === 1 ? 'Clase' : 'Clases'}</span>
                                                    <span className={`chevron-icon ${expandedProfessors[profe.id] ? 'open' : ''}`}>▼</span>
                                                </button>
                                            ) : (
                                                "No tiene clases asignadas"
                                            )}
                                        </td>
                                        
                                        <td>
                                            {profe.deletedAt ? (
                                                <span style={{ color: "#e74c3c", fontWeight: "bold" }}>Inactivo</span>
                                            ) : (
                                                <span style={{ color: "#27ae60", fontWeight: "bold" }}>Activo</span>
                                            )}
                                        </td>

                                        <td>
                                            {profe.deletedAt ? (
                                                <button
                                                    disabled
                                                    style={{
                                                        backgroundColor: "#e0e0e0",
                                                        color: "#777",
                                                        border: "none",
                                                        padding: "6px 12px",
                                                        borderRadius: "4px",
                                                        cursor: "not-allowed"
                                                    }}
                                                >
                                                    Dado de baja
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleOpenModal(profe.id)}
                                                    style={{
                                                        backgroundColor: "#e74c3c",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "6px 12px",
                                                        borderRadius: "4px",
                                                        cursor: "pointer",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    Dar de baja
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    {expandedProfessors[profe.id] && profe.taughtClasses && profe.taughtClasses.length > 0 && (
                                        <tr className="classes-detail-row">
                                            <td colSpan={7}>
                                                <div className="classes-detail-content">
                                                    <h4 className="classes-detail-title">Clases Asignadas a {profe.name} {profe.lastname || ""}</h4>
                                                    <div className="classes-grid">
                                                        {profe.taughtClasses.map(clase => (
                                                            <div key={clase.id} className="class-card">
                                                                <div className="class-card-header">
                                                                    <span className="class-icon">🧘</span>
                                                                    <h5 className="class-card-name">{clase.name}</h5>
                                                                </div>
                                                                <div className="class-card-body">
                                                                    <div className="class-card-info-item">
                                                                        <span className="info-icon">🗓️</span>
                                                                        <span className="info-text">{clase.day?.name || "Sin día"}</span>
                                                                    </div>
                                                                    <div className="class-card-info-item">
                                                                        <span className="info-icon">⏰</span>
                                                                        <span className="info-text">{clase.time?.startTime || "Sin hora"} hs</span>
                                                                    </div>
                                                                    <div className="class-card-info-item">
                                                                        <span className="info-icon">🚪</span>
                                                                        <span className="info-text">Salón {clase.room?.name || "Sin salón"}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        )}
    {showModal && (
            <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ color: "#2f5b46" }}>Confirmar Baja</h3>
                    <p>¿Estás seguro que deseas dar de baja a este profesor? Esta acción modificará su estado a inactivo.</p>
                    <div className="modal-buttons">
                        <button className="btn-cancelar" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button className="btn-confirmar" onClick={handleConfirmDelete}>
                            Sí, dar de baja
                        </button>
                    </div>
                </div>
            </div>
        )}

        {infoModal && (
            <div className="modal-overlay" onClick={() => setInfoModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3 style={{ color: infoModal.isError ? "#e74c3c" : "#2f5b46" }}>
                        {infoModal.title}
                    </h3>
                    <p>{infoModal.message}</p>
                    <div className="modal-buttons">
                        <button className="btn-cancelar" onClick={() => setInfoModal(null)}>
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
    );
}