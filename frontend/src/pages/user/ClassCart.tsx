import React, { useState, useEffect } from "react";
import "../../styles/ClassCart.css";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface SelectedClass {
    id: number;
    name: string; 
    description: string;
    capacityLimit: number;
    room: {
        id: number;
        name: string;
        };
    day: { 
        id: number;
        name: string;
    };
    professor: number;
    time: { 
        id: number;
        startTime: string;
    };
}
// interface errorState {
//     error: boolean;
//     message: string;
// }

    const ClassCart: React.FC = () => {
    
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
    const [membershipType, setMembershipType] = useState<string>("");
    const [redirect, setRedirect] = useState<boolean>(false);
    // const [error, setError] = useState<errorState>({
    //     error: false,
    //     message: "",
    // });

    const navigate = useNavigate();

    async function loadSelectedClasses() {
        const storedClasses = localStorage.getItem("clases");
        if (storedClasses) {
            const parsedClasses: SelectedClass[] = JSON.parse(storedClasses);
            setSelectedClasses(parsedClasses);
            console.log("Clases cargadas desde el almacenamiento local:", parsedClasses);
        }
        else console.log("No hay clases seleccionadas en el almacenamiento local.");
    }
    useEffect(() => {
        loadSelectedClasses();
    }, []);

    useEffect(() => {
        const count = selectedClasses.length;
        if (count <= 2) setMembershipType("Membresía Básica (1-2 clases)");
        else if (count <= 4) setMembershipType("Membresía tipo 1 (2-4 clases)");
        else setMembershipType("Membresía Full (4-6 clases)");
    }, [selectedClasses]);


    const total = "$6000";

    const handleRemove = (id: number) => {
        setSelectedClasses(selectedClasses.filter((c) => c.id !== id));
    };

    const handleClickCompra = async() => {
        const user = localStorage.getItem("user");
        if(!user){
            setRedirect(true);
            console.log("Usuario no autenticado, redirigiendo al login...");
            return;
        }
        if (user){
            alert("Compra realizada con éxito");
            localStorage.removeItem("clases");
            navigate("/MyClassesPage");
        }
    }
    return (
        <div className="container">
        <button onClick={() => window.history.back()} className="btn-back">Volver</button>
        <h2 className="page-title">Mi membresía</h2>

        <div className="membership-content">
            {/*  COLUMNA IZQUIERDA (TABLA)  */}
            <div className="membership-left">
            <div className="membership-header">
                <p>Clases</p>
                <p>Información</p>
            </div>

            <hr className="divider" />

            <table className="membership-table">
                <tbody>
                {selectedClasses.map((clase) => (
                    <tr key={clase.id}>
                    <td className="class-name">
                        <strong>{clase.name}</strong>
                    </td>
                    <td className="class-info">
                        <div>Día: {clase.day.name}</div>
                        <div>Hora: {clase.time.startTime}hs</div>
                        <div>Aula: {clase.room.name}</div>
                    </td>
                    {selectedClasses.length > 1 && (
                        <td className="remove-col">
                        <button
                            aria-label={`Eliminar ${clase.name}`}
                            onClick={() => handleRemove(clase.id)}
                            >
                            X
                        </button>
                        </td>
                    )}

                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/*  COLUMNA DERECHA (RESUMEN)  */}
            <div className="membership-summary">
            <h3>Resumen de mi membresía</h3>
            <hr className="summary-line" />

            <div className="summary-info">
                <p>
                <strong>{membershipType}</strong>
                </p>
                <p>{selectedClasses.length} clases al mes</p>
            </div>

            <hr className="summary-line" />

            <div className="summary-total">
                <p className="summary-total-label">Total:</p>
                <div className="summary-total-box">{total}</div>
            </div>

            <button onClick={handleClickCompra} className="summary-btn">Aceptar</button>
            </div>
        </div>
            {redirect && (
                <div className="redirect">
                    <p className="text-redirect">Inicia Sesión para completar la compra,</p>
                    <HashLink smooth to="/LoginPage" className="link-redirect">Iniciar sesión</HashLink>
                </div>
            )}
        </div>
    );
    };

    export default ClassCart;
