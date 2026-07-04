import { membershipService } from "../../service/membershipServiceFront";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import '../../styles/client/checkout-status.css';
import { tallerService } from "../../service/tallerserviceFront";

function CheckoutStatus() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading');
    const sessionId = searchParams.get("session_id");
    const type = searchParams.get("type");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionId) {
            console.error("No se encontró el session_id en los parámetros de búsqueda.");
            navigate('/ClassCart');
            return;
        }
        const checkStatus = async () => {
            if (type === 'taller') {
                try {
                    const searchSession = await tallerService.pollingSearchTalleres(sessionId);
                    if (searchSession) {
                        console.log("Taller encontrado, redirigiendo a la página de talleres...");
                        setStatus('success');
                        setTimeout(() => {
                            navigate('/MyTalleresPage');
                        }, 3000);
                    } else {
                        console.warn("Taller no encontrado después de varios intentos, redirigiendo al carrito...");
                        setStatus('timeout');
                    }
                } catch (error) {
                    console.error("Error verificando el estado del taller:", error);
                    setStatus('error');
                }
            }
            else {
                try {
                    const searchSession = await membershipService.pollingSearchMembership(sessionId);
                    if (searchSession) {
                        console.log("Membresía encontrada, redirigiendo a la página de clases...");
                        setStatus('success');
                        setTimeout(() => {
                            navigate('/MyClassesPage');
                        }, 3000);
                    } else {
                        console.warn("Membresía no encontrada después de varios intentos, redirigiendo al carrito...");
                        setStatus('timeout');
                    }
                }
                catch (error) {
                    console.error("Error verificando el estado de la membresía:", error);
                    setStatus('error');
                }
            }
        }
        checkStatus();
    }, [navigate, sessionId, type]);

    return (
        <div className={`status-page-container ${status}`}>
            <div className="status-bg-shape shape-left" aria-hidden="true"></div>
            <div className="status-bg-shape shape-right" aria-hidden="true"></div>

            {status === 'loading' && (
                <div className="status-card loading">
                    <div className="status-chip">Procesando</div>
                    <div className="spinner-wrapper">
                        <LoadingSpinner inline />
                    </div>
                    <div className="waiting-message">
                        <h2>Estamos confirmando tu pago</h2>
                        <p>No cierres esta ventana, suele tardar unos segundos.</p>
                    </div>
                </div>
            )}


            {status === 'success' && (
                <div className="status-card success">
                    <div className="status-chip">Confirmado</div>
                    <div className="status-icon-wrapper success-icon">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h2>¡Pago Confirmado!</h2>
                    <p>
                        {type === 'taller'
                            ? "Tu inscripción al taller de Yoga ya está activa. Te llevamos a tus talleres en unos segundos."
                            : "Tu membresía de Yoga ya está activa. Te llevamos a tus clases en unos segundos."}
                    </p>
                </div>
            )}

            {status === 'timeout' && (
                <div className="status-card timeout">
                    <div className="status-chip">Demorado</div>
                    <div className="status-icon-wrapper timeout-icon">
                        <svg className="hourglass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 2h14M5 22h14M19 2v4c0 4-3 7-7 7s-7-3-7-7V2M12 13c-4 0-7 3-7 7v2h14v-2c0-4-3-7-7-7z"/>
                        </svg>
                    </div>
                    <h2>El pago está tardando más de lo habitual</h2>
                    <p>
                        {type === 'taller'
                            ? "No te preocupes. Si se debitó el dinero, tu taller se activará en breve (máximo 5 min)."
                            : "No te preocupes. Si se debitó el dinero, tu membresía se activará en breve (máximo 5 min)."}
                    </p>
                    <p className="session-id">ID de sesión: {sessionId}</p>
                    <button onClick={() => navigate('/ClassCart')} className="home-btn">Volver al Carrito</button>
                </div>
            )}

            {status === 'error' && (
                <div className="status-card error">
                    <div className="status-chip">Sin conexión</div>
                    <div className="status-icon-wrapper error-icon">
                        <svg className="crossmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="crossmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="crossmark__check" fill="none" d="M16 16 36 36 M36 16 16 36"/>
                        </svg>
                    </div>
                    <h2>Hubo un problema verificando tu pago</h2>
                    <p>No pudimos conectarnos con nuestro servidor. Si el pago se realizó, contactanos indicando tu ID de sesión.</p>
                    <p className="session-id">ID de sesión: {sessionId}</p>
                    <button onClick={() => navigate('/ClassCart')} className="home-btn">Volver al Carrito</button>
                </div>
            )}

        </div>
    );
};

export default CheckoutStatus;