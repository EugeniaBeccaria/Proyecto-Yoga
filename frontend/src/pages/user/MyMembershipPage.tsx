import React, { useState, useEffect } from "react";
import "../../styles/MyMembershipPage.css";

    interface SelectedClass {
    id: number;
    name: string;
    day: string;
    time: string;
    }

    const MembershipPage: React.FC = () => {
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([
        { id: 1, name: "Respira y Fluye", day: "Lunes", time: "16:00" },
        { id: 2, name: "Fuerza Interior", day: "Martes", time: "17:00" },
        { id: 3, name: "Fuego Interior", day: "Viernes", time: "10:00" },
    ]);

    const [membershipType, setMembershipType] = useState<string>("");

    useEffect(() => {
        const count = selectedClasses.length;
        if (count <= 2) setMembershipType("Membresía Básica");
        else if (count <= 4) setMembershipType("Membresía tipo 1");
        else setMembershipType("Membresía Full");
    }, [selectedClasses]);

    const total = "$6000";

    const handleRemove = (id: number) => {
        setSelectedClasses(selectedClasses.filter((c) => c.id !== id));
    };

    return (
        <div className="container">
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
                        <div>Día: {clase.day}</div>
                        <div>Hora: {clase.time}hs</div>
                    </td>
                    <td className="remove-col">
                        <button
                        aria-label={`Eliminar ${clase.name}`}
                        onClick={() => handleRemove(clase.id)}
                        >
                        X
                        </button>
                    </td>
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

            <button className="summary-btn">Aceptar</button>
            </div>
        </div>
        </div>
    );
    };

    export default MembershipPage;
