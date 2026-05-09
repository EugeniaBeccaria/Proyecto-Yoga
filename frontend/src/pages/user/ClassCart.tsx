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
import type { TallerApi } from "../../types/taller.type.ts";
import { useSearchParams } from "react-router-dom";

type CartType = "classes" | "talleres" | "empty";

const ClassCart: React.FC = () => {
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
    const [allPlans, setAllPlans] = useState<IPlanGroup[]>([]);
    const [currentPlan, setCurrentPlan] = useState<IPlanGroup | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);

    const [talleres, setTalleres] = useState<TallerApi[]>([]);
    const [cartType, setCartType] = useState<CartType>("empty");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cancel = searchParams.get("error");

    useEffect(() => {
        if (cancel === "payment_cancelled") {
            setError({ error: true, message: "El pago fue cancelado. Por favor, intenta nuevamente." });
        }

        const parseStoredArray = <T,>(key: string): T[] => {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return [];
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        };

        const parsedClasses = parseStoredArray<SelectedClass>("clases");
        const parsedTalleres = parseStoredArray<TallerApi>("talleres");

        if (parsedClasses.length > 0) {
            setSelectedClasses(parsedClasses);
            setCartType("classes");
        } else {
            setTalleres(parsedTalleres);
            setCartType(parsedTalleres.length > 0 ? "talleres" : "empty");
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

        if (parsedClasses.length > 0) {
            fetchPlans();
        }
    }, [cancel]);

    useEffect(() => {
        if (cartType !== "classes") return;
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
    }, [selectedClasses, allPlans, cartType]);

    const handleRemove = (id: string) => {
        const updatedClasses = selectedClasses.filter((c) => c.id !== id);
        setSelectedClasses(updatedClasses);
        localStorage.setItem("clases", JSON.stringify(updatedClasses));

        if (updatedClasses.length === 0) {
            setCartType("empty");
        }
    };

    const handleRemoveTaller = (id: string) => {
        const updatedTalleres = talleres.filter((taller) => taller.id !== id);
        setTalleres(updatedTalleres);
        localStorage.setItem("talleres", JSON.stringify(updatedTalleres));

        if (updatedTalleres.length === 0) {
            setCartType("empty");
        }
    };

    const handleClickCompra = async () => {
        if (cartType === "talleres") {
            setError({ error: true, message: "El checkout de talleres aun no esta disponible." });
            return;
        }

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

    const redireccion = () => {
        if (cartType === "classes") {
            navigate("/ClassCalendar");
        } else {
            navigate("/talleres");
        }
    };

    const totalTalleres = talleres.reduce((acc, taller) => acc + Number(taller.price || 0), 0);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        return d.toLocaleString("es-AR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="container-cart">
            <div className="cart-nav">
                <button onClick={redireccion} className="btn-back">
                    Volver
                </button>
            </div>
            
            <h2 className="page-title">
                {cartType === "talleres" ? "Mis talleres" : cartType === "classes" ? "Mi membresia" : "Mi carrito"}
            </h2>

            <div className="membership-content">
                <div className="membership-left">
                    <div className="membership-header-cart">
                        <p className="header-clases">{cartType === "talleres" ? "Talleres" : "Clases"}</p>
                        <p className="header-info">Información</p>
                    </div>

                    <hr className="divider" />

                    <div className="cart-items-container">
                        {cartType === "classes" && selectedClasses.map((clase) => (
                            <div key={clase.id} className="cart-item">
                                <div className="class-name-cart">
                                    <strong>{clase.name}</strong>
                                </div>
                                <div className="class-info-cart">
                                    <div>Dia: {clase.day.name}</div>
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

                        {cartType === "talleres" && talleres.map((taller) => (
                            <div key={taller.id} className="cart-item">
                                <div className="class-name-cart">
                                    <strong>{taller.name}</strong>
                                </div>
                                <div className="class-info-cart">
                                    <div>{taller.description}</div>
                                    <div>{formatDate(taller.datetime)}</div>
                                </div>
                                <div className="remove-col-cart">
                                    <button
                                        aria-label={`Eliminar ${taller.name}`}
                                        onClick={() => handleRemoveTaller(taller.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}

                        {cartType === "empty" && (
                            <p className="class-info-cart">No hay items seleccionados en el carrito.</p>
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA (RESUMEN) */}
                <div className="membership-summary">
                    <h3>{cartType === "talleres" ? "Resumen de talleres" : "Resumen de mi membresia"}</h3>
                    <hr className="summary-line" />

                    <div className="summary-info">
                        {cartType === "classes" && currentPlan ? (
                            <>
                                <p><strong>{currentPlan.description}</strong></p>
                                <p>{selectedClasses.length} clases a la semana</p>
                            </>
                        ) : cartType === "classes" ? (
                            <p>
                                {selectedClasses.length > 0 ? "Calculando membresía..." : "No hay clases seleccionadas."}
                            </p>
                        ) : cartType === "talleres" ? (
                            <>
                                <p><strong>{talleres.length} taller(es) seleccionado(s)</strong></p>
                            </>
                        ) : (
                            <p>Carrito vacio.</p>
                        )}
                    </div>

                    <hr className="summary-line" />

                    <div className="summary-total">
                        <p className="summary-total-label">Total:</p>
                        <div className="summary-total-box">
                            {cartType === "classes"
                                ? (currentPlan ? `$${currentPlan.price}` : "$0")
                                : `$${totalTalleres.toFixed(2)}`}
                        </div>
                    </div>

                    <button 
                        onClick={handleClickCompra} 
                        className="summary-btn" 
                        disabled={cartType === "classes" ? !currentPlan : talleres.length === 0}
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