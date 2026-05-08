import React, { useState, useEffect } from "react";
import "../../styles/ClassCart.css";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { membershipPriceService } from "../../service/membershipPrice.service";
import { registrationService } from "../../service/registration.service";
import { membershipService } from "../../service/membershipServiceFront";
import type { IPlanGroup } from "../../types/class.type";
import type { SelectedClass } from "../../types/class.type";
import type { Error } from "../../types/error.type";
import { useSearchParams } from "react-router-dom";

const ClassCart: React.FC = () => {
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
    const [allPlans, setAllPlans] = useState<IPlanGroup[]>([]);
    const [currentPlan, setCurrentPlan] = useState<IPlanGroup | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cancel = searchParams.get("error");

    useEffect(() => {
        if (cancel === "payment_cancelled") {
            setError({ error: true, message: "El pago fue cancelado. Por favor, intenta nuevamente." });
        }

        const storedClasses = localStorage.getItem("clases");
        if (storedClasses) {
            const parsedClasses: SelectedClass[] = JSON.parse(storedClasses);
            setSelectedClasses(parsedClasses);
        }

        const fetchPlans = async () => {
            try {
                const plans = await membershipPriceService.getCurrentPrices();
                const sortedPlans = [...plans].sort((a, b) => a.numOfClasses - b.numOfClasses);
                setAllPlans(sortedPlans);
            } catch (error) {
                console.error("Error al cargar los planes", error);
            }
        };
        fetchPlans();
    }, [cancel]);

    useEffect(() => {
        const count = selectedClasses.length;
        if (count === 0 || allPlans.length === 0) {
            setCurrentPlan(null);
            return;
        }
        const plan = allPlans.find(p => count <= p.numOfClasses);
        if (plan) {
            setCurrentPlan(plan);
        } else {
            setCurrentPlan(allPlans[allPlans.length - 1]);
        }
    }, [selectedClasses, allPlans]);

    const handleRemove = (id: string) => {
        const updatedClasses = selectedClasses.filter((c) => c.id !== id);
        setSelectedClasses(updatedClasses);
        localStorage.setItem("clases", JSON.stringify(updatedClasses));
    };

    const handleClickCompra = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setRedirect(true);
            return;
        }

        try {
            const userParsed = JSON.parse(user);
            const hasMembership = await membershipService.searchUserMembership(userParsed.id);
            if (hasMembership) {
                setError({ error: true, message: 'El usuario ya tiene una membresía activa' });
                return;
            }
            const checkoutData = await registrationService.prepareCheckoutData(selectedClasses, currentPlan!, userParsed);
            const session = checkoutData.session;

            if (session && session.url) {
                window.location.assign(session.url);
            }
        } catch (error) {
            console.error("Error during checkout process:", error);
        }
    };

    return (
        <div className="container-cart">
            <div className="cart-nav">
                <button onClick={() => navigate('/ClassCalendar')} className="btn-back">
                    Volver
                </button>
            </div>
            
            <h2 className="page-title">Mi membresía</h2>

            <div className="membership-content">
                <div className="membership-left">
                    <div className="membership-header-cart">
                        <p className="header-clases">Clases</p>
                        <p className="header-info">Información</p>
                    </div>

                    <hr className="divider" />

                    <div className="cart-items-container">
                        {selectedClasses.map((clase) => (
                            <div key={clase.id} className="cart-item">
                                <div className="class-name-cart">
                                    <strong>{clase.name}</strong>
                                </div>
                                <div className="class-info-cart">
                                    <div>Día: {clase.day.name}</div>
                                    <div>Hora: {clase.time.startTime}hs</div>
                                    <div>Aula: {clase.room.name}</div>
                                </div>
                                <div className="remove-col-cart">
                                    <button
                                        aria-label={`Eliminar ${clase.name}`}
                                        onClick={() => handleRemove(clase.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA (RESUMEN) */}
                <div className="membership-summary">
                    <h3>Resumen de mi membresía</h3>
                    <hr className="summary-line" />

                    <div className="summary-info">
                        {currentPlan ? (
                            <>
                                <p><strong>{currentPlan.description}</strong></p>
                                <p>{selectedClasses.length} clases a la semana</p>
                            </>
                        ) : (
                            <p>
                                {selectedClasses.length > 0 ? "Calculando membresía..." : "No hay clases seleccionadas."}
                            </p>
                        )}
                    </div>

                    <hr className="summary-line" />

                    <div className="summary-total">
                        <p className="summary-total-label">Total:</p>
                        <div className="summary-total-box">
                            {currentPlan ? `$${currentPlan.price}` : "$0"}
                        </div>
                    </div>

                    <button 
                        onClick={handleClickCompra} 
                        className="summary-btn" 
                        disabled={!currentPlan}
                    >
                        Aceptar y Pagar
                    </button>
                </div>
            </div>

            {error?.error && (
                <p className="error-message-cart">{error.message}</p>
            )}

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