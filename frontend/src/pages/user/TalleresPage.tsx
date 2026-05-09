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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    const handleContinueToPayment = () => {
        const talleresSeleccionados = talleres.filter((taller) =>
            seleccionados.includes(taller.id)
        );
        localStorage.removeItem("clases");
        localStorage.setItem("talleres", JSON.stringify(talleresSeleccionados));
        setCheckoutNotice("Talleres guardados. El checkout de talleres se conecta en el siguiente paso.");
        navigate("/ClassCart")
    };

    return (
        <main className="catalogo">
            {/* <img className="flor-fondo" src="/FlorLogo.png" alt="Fondo Shanti" /> */}

            <section className="catalogo-header">
                <h1 className="titulo-principal">Nuestros Talleres</h1>
                <p className="subtitulo">
                    Espacios especiales para aprender, compartir y conectar con otras personas.
                    Cada taller ofrece una experiencia única de crecimiento personal.
                </p>
            </section>
            {!loading && !error && talleres.length > 0 && (
                <div className="pago-container">
                    <button
                        className="btn-pago"
                        onClick={handleContinueToPayment}
                        disabled={!canContinueToPayment}
                    >
                        {canContinueToPayment
                            ? `Continuar al pago (${seleccionados.length})`
                            : "Selecciona al menos un taller"}
                    </button>
                    {checkoutNotice && <p className="checkout-notice">{checkoutNotice}</p>}
                </div>
            )}

            {loading ? (
                <p className="subtitulo">Cargando talleres...</p>
            ) : error ? (
                <p className="subtitulo">{error.message}</p>
            ) : talleres.length === 0 ? (
                <p className="subtitulo">No hay talleres disponibles por ahora.</p>
            ) : (
                <section className={`catalogo-grid ${talleres.length === 1 ? 'single' : ''}`}>
                    {talleres.map((taller) => (
                        <div
                            key={taller.id}
                            className={`card ${seleccionados.includes(taller.id) ? "seleccionada" : ""}`}
                        >
                            <img src={'/public/logo-verde.png'} alt={taller.name} />
                            <h2>{taller.name}</h2>
                            <p>{taller.description}</p>
                            <p>{formatDate(taller.datetime)}</p>
                            <p>Precio: ${taller.price.toFixed(2)}</p>

                            <button 
                                    className={seleccionados.includes(taller.id) ? "btn-agregado" : "btn-agregar"}
                                    onClick={() => toggleTaller(taller.id)}
                                >
                                    {seleccionados.includes(taller.id) ? "✓ Agregado" : "Agregar"}
                            </button>                        
                        </div>
                    ))}
                </section>
            )}

        </main>
    );
}

export default TalleresPage;
