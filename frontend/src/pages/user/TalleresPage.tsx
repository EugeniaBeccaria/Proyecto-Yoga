import { useEffect, useState } from "react";
import "../../styles/Catalogo.css";
import { tallerService } from "../../service/tallerserviceFront";
import { useNavigate } from "react-router-dom";
import type { TallerApi } from "../../types/taller.type.ts";
import type { Error } from "../../types/error.type.ts";


function TalleresPage() {
    const [talleres, setTalleres] = useState<TallerApi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [seleccionados, setSeleccionados] = useState<string[]>([]);
    const [checkoutNotice, setCheckoutNotice] = useState<string>("");

    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser)?.id : undefined;

    useEffect(() => {
        const fetchTalleres = async () => {
            try {
                setLoading(true);
                setError(null);

                const talleresFromApi = await tallerService.getTalleres();
                setTalleres(
                    talleresFromApi.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
                );
            } catch (err) {
                setError({ error: true, message: "No se pudieron cargar los talleres." });
                console.error("Error al cargar los talleres:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTalleres();
    }, []);

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        return d.toLocaleString('es-AR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    
    const toggleTaller = (id: string) => {
        setCheckoutNotice("");
        setSeleccionados(prev => 
            prev.includes(id) 
                ? prev.filter(tallerId => tallerId !== id)
                : [...prev, id]
        );
    };

    const canContinueToPayment = seleccionados.length > 0;
    const visibleTalleres = userId
        ? talleres.filter((taller) => !taller.users?.some((user) => user.id === userId))
        : talleres;

    const handleContinueToPayment = () => {
        const talleresSeleccionados = visibleTalleres.filter((taller) =>
            seleccionados.includes(taller.id)
        );
        localStorage.removeItem("clases");
        localStorage.setItem("talleres", JSON.stringify(talleresSeleccionados));
        setCheckoutNotice("Talleres guardados. El checkout de talleres se conecta en el siguiente paso.");
        navigate("/ClassCart")
    };

    return (
        <main className="catalogo">
            <section className="catalogo-header" id="top">
                <div className="header-overlay"></div>
                <div className="header-content">
                    <h1 className="titulo-principal animate-fade-in">Nuestros Talleres</h1>
                    <p className="subtitulo animate-fade-in-delayed">
                        Espacios especiales para aprender, compartir y conectar con otras personas.
                        Cada taller ofrece una experiencia única de crecimiento personal.
                    </p>
                </div>
            </section>

            {loading ? (
                <div className="loading-container">
                    <p className="subtitulo">Cargando talleres...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p className="subtitulo error-text">{error.message}</p>
                </div>
            ) : visibleTalleres.length === 0 ? (
                <div className="empty-container">
                    <p className="subtitulo">No hay talleres disponibles por ahora.</p>
                </div>
            ) : (
                <>
                    <section className={`catalogo-grid ${visibleTalleres.length === 1 ? 'single' : ''}`}>
                        {visibleTalleres.map((taller) => {
                            const isSelected = seleccionados.includes(taller.id);
                            return (
                                <div
                                    key={taller.id}
                                    className={`taller-card ${isSelected ? "seleccionada" : ""}`}
                                >
                                    <div className="taller-card-image-wrapper">
                                        <img src={'/public/logo-verde.png'} alt={taller.name} className="taller-card-img" />
                                        <div className="taller-card-price-tag">
                                            ${taller.price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                        {isSelected && (
                                            <div className="selected-badge">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="badge-icon">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="taller-card-content">
                                        <h2 className="taller-card-title">{taller.name}</h2>
                                        <p className="taller-card-description">{taller.description}</p>
                                        
                                        <div className="taller-card-details">
                                            <div className="taller-detail-item">
                                                <svg className="taller-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                                <span>{formatDate(taller.datetime)}</span>
                                            </div>
                                            {taller.time && (
                                                <div className="taller-detail-item">
                                                    <svg className="taller-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <polyline points="12 6 12 12 16 14"></polyline>
                                                    </svg>
                                                    <span>{taller.time.startTime} hs</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="taller-card-footer">
                                        <button
                                            className={isSelected ? "btn-agregado" : "btn-agregar"}
                                            onClick={() => toggleTaller(taller.id)}
                                        >
                                            {isSelected ? (
                                                <>
                                                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                    Agregado
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                    Agregar
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    <div className={`pago-sticky-bar ${canContinueToPayment ? "active" : ""}`}>
                        <div className="pago-sticky-content">
                            <div className="pago-summary">
                                <span className="pago-selected-count">
                                    {seleccionados.length} {seleccionados.length === 1 ? "taller seleccionado" : "talleres seleccionados"}
                                </span>
                                <span className="pago-total-label">
                                    Total: <strong className="pago-total-price">
                                        ${visibleTalleres
                                            .filter(t => seleccionados.includes(t.id))
                                            .reduce((sum, t) => sum + t.price, 0)
                                            .toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </strong>
                                </span>
                            </div>
                            <div className="pago-actions">
                                <button
                                    className="btn-pago-sticky"
                                    onClick={handleContinueToPayment}
                                    disabled={!canContinueToPayment}
                                >
                                    Continuar al pago
                                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {checkoutNotice && <p className="checkout-notice-sticky">{checkoutNotice}</p>}
                    </div>
                </>
            )}
        </main>
    );
}

export default TalleresPage;
