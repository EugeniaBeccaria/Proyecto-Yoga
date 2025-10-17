/*import Navbar from "../components/Navbar";*/
import "../styles/HomePage.css";
import "../styles/Nosotros.css";
import "../styles/Clases.css";
import "../styles/Reseñas.css";

import { HashLink } from "react-router-hash-link";

function HomePage(){
  const rows = 3;
  const cols = 32;
  const total = rows * cols;

  // Crear array de cuadrados alternando colores
    const squares = Array.from({ length: total }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const isPink = row % 2 === 0 ? col % 2 === 0 : col % 2 !== 0;
    return { color: isPink ? "pink" : "green" };
  });

  return (
    <>
        <main>
          <section className="hero" id="top">
            <h1 className="hero-title">
              <span className="shanti">SHANTI</span>
              <span className="yoga">yoga</span>
            </h1>

            <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>

            {/* <a href="#nosotros" className="scroll-arrow"></a> */}
            <HashLink smooth to="#nosotros" className="scroll-arrow"></HashLink>
          </section>


            <section id="nosotros" className="nosotros">
              <div className="grid">
                {squares.map((square, index) => (
                <div
                  key={index}
                  className={`square ${square.color}`}
                ></div>
              ))}
              </div>

              <div className="nosotros-contenido">
                <div className="nosotros-texto">
                  <h2 className="titulo-nosotros">
                    Nuestra<br />Historia
                  </h2>
                  <p>
                    Hace más de diez años, Shanti Yoga nació de un sueño
                    compartido por un pequeño grupo de amantes del
                    bienestar y la vida consciente. La fundadora, Mariana
                    López, buscaba un lugar donde las personas pudieran
                    encontrar equilibrio, calma y conexión consigo mismas,
                    más allá de la práctica física del yoga.
                    Lo que comenzó como clases en un pequeño estudio en el
                    corazón de la ciudad, pronto se transformó en una
                    comunidad apasionada, un espacio donde cada persona es
                    bienvenida y respetada, sin importar su experiencia.
                    Shanti Yoga se construyó sobre la idea de que el yoga no
                    es solo posturas, sino un camino hacia la armonía entre
                    cuerpo, mente y espíritu.
                  </p>
                </div>

                <div className="imagen-nosotros">
                  <img src="/nosotrosfoto.jpg" alt="Equipo Shanti Yoga" />
                </div>
              </div>
            </section>
          {/* ====== NUESTRAS CLASES ====== */}
          <section id="nuestras-clases" className="seccion-catalogo verde">
            <h2 className="titulo-seccion">
              Nuestras Clases
            </h2>


            <p className="subtitulo-seccion">
              En Shanti Yoga te ofrecemos clases pensadas para que encuentres tu equilibrio y bienestar. 
              Cada clase combina técnicas de respiración, movimiento y conexión interior, adaptadas a todos los niveles.
            </p>

            <div className="grid-cards">
              <div className="card-catalogo verde">
                <div className="badge">
                  <img src="/logo-verde.png" alt="Logo clase verde" />
                </div>
                <h3>Respiración y Gripe</h3>
                <p>Una clase suave que combina respiración consciente y movimiento fluido para liberar tensiones.</p>
              </div>

              <div className="card-catalogo verde">
                <div className="badge">
                  <img src="/logo-verde.png" alt="Logo clase verde" />
                </div>
                <h3>Fuerza Interior</h3>
                <p>Potencia tu energía y estabilidad con posturas de fuerza, alineación y concentración.</p>
              </div>

              <div className="card-catalogo verde">
                <div className="badge">
                  <img src="/logo-verde.png" alt="Logo clase verde" />
                </div>
                <h3>Fluir y Equilibrar</h3>
                <p>Una práctica equilibrada que combina relajación y fuerza para un bienestar integral.</p>
              </div>
            </div>

            <div className="acciones-catalogo">
              <a className="btn-outline" href="/clases">Ver calendario de clases</a>
            </div>
          </section>

          {/* ====== NUESTROS TALLERES ====== */}
          <section id="nuestros-talleres" className="seccion-catalogo rosado">
            <h2 className="titulo-seccion">
              Nuestros Talleres
            </h2>

            <p className="subtitulo-seccion">
              En Shanti Yoga te ofrecemos talleres temáticos para profundizar en técnicas de meditación, respiración y bienestar. 
              Cada encuentro está diseñado para ayudarte a reconectar con vos mismo y con tu entorno.
            </p>

            <div className="grid-cards">
              <div className="card-catalogo rosado">
                <div className="badge">
                  <img src="/logo-rosa.png" alt="Logo taller rosa" />
                </div>
                <h3>Equilibrio Emocional</h3>
                <p>Un espacio de introspección y calma para reconectar con tu centro interior.</p>
              </div>

              <div className="card-catalogo rosado">
                <div className="badge">
                  <img src="/logo-rosa.png" alt="Logo taller rosa" />
                </div>
                <h3>Respiración Consciente</h3>
                <p>Técnicas para mejorar tu respiración y liberar tensiones acumuladas.</p>
              </div>

              <div className="card-catalogo rosado">
                <div className="badge">
                  <img src="/logo-rosa.png" alt="Logo taller rosa" />
                </div>
                <h3>Yoga y Energía</h3>
                <p>Explorá el poder del movimiento consciente para potenciar tu energía vital.</p>
              </div>
            </div>

            <div className="acciones-catalogo">
              <a className="btn-outline" href="/talleres">Ver calendario de talleres</a>
            </div>
          </section>

          <section id="reseñas" className="reseñas">
            <h2 className="titulo-reseñas">Comunidad Shanti</h2>

            <div className="contenedor-reseñas">
              <div className="reseña-card">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="reseña-texto">
                  “Empecé en Shanti Yoga sin tener mucha experiencia y me sorprendió lo acogedor que es el lugar.
                  Las clases están pensadas para todos los niveles y los profesores realmente se preocupan por cada alumno.
                  Salgo de cada sesión relajada y con energía renovada. ¡100% recomendable!”
                </p>
                <div className="reseña-user">
                  <img src="/Persona1.jpg" alt="Ana Martínez" />
                  <div>
                    <h3>Ana Martínez</h3>
                    <span>Cliente feliz</span>
                  </div>
                </div>
              </div>

              <div className="reseña-card">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="reseña-texto">
                  “Lo que más me gusta de Shanti Yoga son los talleres. Cada vez aprendo algo nuevo sobre 
                  meditación, respiración y posturas. El ambiente es tranquilo, positivo y sin presión. Es un espacio donde 
                  realmente puedo desconectarme del estrés diario y reconectar conmigo mismo."”
                </p>
                <div className="reseña-user">
                  <img src="/Persona2.jpg" alt="Martín López" />
                  <div>
                    <h3>Martín López</h3>
                    <span>Cliente feliz</span>
                  </div>
                </div>
              </div>

              <div className="reseña-card">
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="reseña-texto">
                  “Me encanta la comunidad de Shanti Yoga. Desde que vine por primera vez me sentí bienvenida,
                  y todos los profes hacen que cada clase sea divertida y motivadora. Es un espacio de crecimiento personal.”
                </p>
                <div className="reseña-user">
                  <img src="/Persona3.webp" alt="Valentina Gómez" />
                  <div>
                    <h3>Valentina Gómez</h3>
                    <span>Cliente feliz</span>
                  </div>
                </div>
              </div>
            </div>
          </section>


      </main>
  </>
  )
}

export default HomePage


/*export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1 className="hero-title">SHANTI yoga</h1>
        <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>
      </div>
    </section>
  )
}*/

