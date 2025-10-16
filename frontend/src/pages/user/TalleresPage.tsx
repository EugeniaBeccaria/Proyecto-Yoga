import "../../styles/Catalogo.css";

    function TalleresPage() {
    const talleres = [
        {
        id: 1,
        nombre: "Meditación y Mindfulness",
        descripcion:
            "Aprendé técnicas de atención plena y relajación profunda para tu vida cotidiana.",
        imagen: "/taller1.jpg",
        },
        {
        id: 2,
        nombre: "Sonido y Vibración",
        descripcion:
            "Conectá con la energía del sonido a través de cuencos, mantras y ejercicios de respiración.",
        imagen: "/taller2.jpg",
        },
        {
        id: 3,
        nombre: "Yoga y Nutrición Consciente",
        descripcion:
            "Taller integral que combina movimiento, alimentación saludable y equilibrio emocional.",
        imagen: "/taller3.jpg",
        },
    ];

    return (
        <main className="catalogo">
        <img className="flor-fondo" src="/FlorLogo.png" alt="Fondo Shanti" />

        <section className="catalogo-header">
            <h1 className="titulo-principal">Nuestros Talleres</h1>
            <p className="subtitulo">
            Espacios especiales para aprender, compartir y conectar con otras personas.  
            Cada taller ofrece una experiencia única de crecimiento personal.
            </p>
        </section>

        <section className="catalogo-grid">
            {talleres.map((taller) => (
            <div key={taller.id} className="card">
                <img src={taller.imagen} alt={taller.nombre} />
                <h2>{taller.nombre}</h2>
                <p>{taller.descripcion}</p>
                <button>Más información</button>
            </div>
            ))}
        </section>
        </main>
    );
    }

    export default TalleresPage;
