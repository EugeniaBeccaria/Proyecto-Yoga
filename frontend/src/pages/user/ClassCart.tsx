import React, { useState, useEffect } from "react";
import "../../styles/ClassCart.css";
// import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { membershipPriceService } from "../../service/membershipPrice.service";
import { registrationService } from "../../service/registration.service";
import { membershipService } from "../../service/membership.service";
import type { IPlanGroup } from "../../types/class.type";
import type { SelectedClass } from "../../types/class.type";
import type { Error } from "../../types/error.type";
// import { useStripe } from "@stripe/react-stripe-js";

// interface errorState {
//     error: boolean;
//     message: string;
// }

const ClassCart: React.FC = () => {
    
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
    const [allPlans, setAllPlans] = useState<IPlanGroup[]>([]);
    const [currentPlan, setCurrentPlan] = useState<IPlanGroup | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false);
    // const [error, setError] = useState<errorState>({
    //     error: false,
    //     message: "",
    // });
    // const stripe = useStripe();
    // const navigate = useNavigate();

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
        const fetchPlans = async () => {
            try {
                const plans = await membershipPriceService.getCurrentPrices();
                console.log("Planes recibidos del backend:", plans);
                const sortedPlans = [...plans].sort((a, b) => a.numOfClasses - b.numOfClasses);
                console.log("Planes ordenados:", sortedPlans);
                setAllPlans(sortedPlans);
            } catch (error) {
                console.error("Error al cargar los planes", error);
            }
        };
        fetchPlans();
    }, []);

    useEffect(() => {
        const count = selectedClasses.length;
        if (count === 0 || allPlans.length === 0) {
            setCurrentPlan(null);
            return;
        }
        console.log(`Calculando plan para ${count} clases...`);
        const plan = allPlans.find(p => count <= p.numOfClasses);
        console.log("Plan encontrado:", plan);
        if (plan) {
            setCurrentPlan(plan);
        } else {
            setCurrentPlan(allPlans[allPlans.length - 1]);
        }
    }, [selectedClasses, allPlans]);


    const handleRemove = (id: number) => {
        const updatedClasses = selectedClasses.filter((c) => c.id !== id);
        setSelectedClasses(updatedClasses);
        localStorage.setItem("clases", JSON.stringify(updatedClasses));
    };

    // sin useStripe
    const handleClickCompra = async() => {
        const user = localStorage.getItem("user");
        if(!user){
            setRedirect(true);
            console.log("Usuario no autenticado, redirigiendo al login...");
            return;
        }

        try {
            const userParsed = JSON.parse(user);
            
            const hasMembership = await membershipService.searchUserMembership(userParsed.id);
            if(hasMembership){
                setError({error: true, message: 'El usuario ya tiene una membresía activa'});
                console.log("El usuario ya tiene una membresía activa.");
                return;
            }
            const checkoutData = await registrationService.prepareCheckoutData(selectedClasses, currentPlan!, userParsed);
            console.log("Checkout data received:", checkoutData);
            const session = checkoutData.session;

            if (session && session.url) {
                window.location.assign(session.url);
            } else {
                console.error("No Checkout Session URL available for redirect:", session);
            }
        }
        catch (error) {
            console.error("Error during checkout process:", error);
        }
    }

    //con useStripe
    //     const handleClickCompra = async() => {
    //     const user = localStorage.getItem("user");
    //     if(!user){
    //         setRedirect(true);
    //         console.log("Usuario no autenticado, redirigiendo al login...");
    //         return;
    //     }
    //     try {
    //         const userParsed = await JSON.parse(user);
    //         const checkoutData = await registrationService.prepareCheckoutData(selectedClasses, currentPlan!, userParsed);
    //         console.log("Checkout data received:", checkoutData);
    //         const session = checkoutData.session;

    //         if(!stripe){
    //             console.error("Stripe no está cargado aún.");
    //             return;
    //         }
    //         const {error} = await useStripe().redirectToCheckout({
    //             sessionId: session.id,
    //         });
    //         if (error) {
    //             console.error("Error redirecting to checkout:", error);
    //         }
    //     }
    //     catch (error) {
    //         console.error("Error during checkout process:", error);
    //     }
    // }
    return (
        <div className="container">
        <button 
            onClick={() => {
                window.history.back();
                //localStorage.removeItem("clases");
                }} 
            className="btn-back">
            Volver
        </button>
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
                    {selectedClasses.length > 0 && (
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
                {currentPlan ? (
                    <>
                        <p>
                            <strong>{currentPlan.description}</strong>
                        </p>
                        <p>{selectedClasses.length} clases al mes</p>
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

            <button onClick={handleClickCompra} className="summary-btn" disabled={!currentPlan}>Aceptar</button>
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
