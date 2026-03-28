import { membershipService } from "../../service/membershipServiceFront";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import '../../styles/client/checkout-status.css';

function CheckoutStatus() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'timeout', 'error'
    const sessionId = searchParams.get("session_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionId) {
            console.error("No se encontró el session_id en los parámetros de búsqueda.");
            navigate('/ClassCart');
            return;
            }
        const checkMembershipStatus = async () => {
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
        };
        checkMembershipStatus();
        
    }, [sessionId]);

return (
    <div className="status-page-container">
        {status === 'loading' && (
            <>
                <LoadingSpinner /> {/* Cubre toda la pantalla con el spinner */}
                <div className="waiting-message">
                    <h2>Estamos confirmando tu pago con Stripe...</h2>
                    <p>No cierres esta ventana, suele tardar unos segundos.</p>
                </div>
            </>
        )}

        {status === 'success' && (
            <div className="status-card success">
            <div className="icon">🎉</div>
            <h2>¡Pago Confirmado!</h2>
            <p>Tu membresía de Yoga ya está activa. Redirigiendo a tus clases...</p>
            </div>
        )}

        {status === 'timeout' && (
            <div className="status-card timeout">
            <div className="icon">⏳</div>
            <h2>El pago está tardando más de lo habitual</h2>
            <p>No te preocupes. Si se debitó el dinero, tu membresía se activará en breve (máximo 5 min).</p>
            <p className="session-id">ID de sesión: {sessionId}</p>
            <button onClick={() => navigate('/ClassCart')} className="home-btn">Volver al Carrito</button>
            </div>
        )}

        {status === 'error' && (
            <div className="status-card error">
            <div className="icon">❌</div>
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