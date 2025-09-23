/*import Navbar from "../components/Navbar";*/
import "../styles/HomePage.css";
import "../styles/Nosotros.css";
import "../styles/Clases.css";
import "../styles/Reseñas.css";

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
          <section id="top" className="home">
            <div className="hero">
              <img className="florFondoHome" src="/FlorLogo.png" alt="" />
              <h1 className="hero-title">SHANTI <span className="block yoga">yoga</span></h1>
              <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>
            </div>
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
                  <h2 className="titulo-nosotros">Nuestra historia</h2>
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
                  <img src="/Nosotros.png" alt="Nosotros Shanti Yoga" />
                </div>
              </div>
            </section>

            <section id="clases" className="clases">
              <h2 className="titulo-clases">Clases</h2>
              <table>
                <thead>
                  <tr>
                    <th>HORA</th>
                    <th>LUNES</th>
                    <th>MARTES</th>
                    <th>MIÉRCOLES</th>
                    <th>JUEVES</th>
                    <th>VIERNES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="horario">07:00 a 08:00</td>
                    <td className="horario-dia">
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                      <span className="clase fuego">Fuego Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                      <span className="clase fuego">Fuego Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                      <span className="clase fuego">Fuego Interior</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="horario">08:00 a 09:00</td>
                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                      <span className="clase fuego">Fuego Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                      <span className="clase fuego">Fuego Interior</span>
                    </td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>
                  </tr>

                  <tr>
                    <td className="horario">09:00 a 10:00</td>
                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>
                  </tr>

                  <tr>
                    <td className="horario">10:00 A 11:00</td>
                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>
                  </tr> 

                  <tr>
                    <td className="horario">11:00 A 12:00</td>
                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>

                    <td>
                      <span className="clase fuerte">Respira y Fluye</span>
                      <span className="clase">Fuerza Interior</span>
                    </td>

                    <td></td>
                    </tr>
                </tbody>
              </table>
            </section>

            <section id="talleres" className="talleres"></section>
            
            <section id="reseñas" className="reseñas">
              <h2 className="titulo-reseñas">Comunidad Shanti</h2>
              <div className="contenedor-reseñas">
                <div className="box">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>                    
                  </div>

                  <p>"Empecé en Shanti Yoga sin tener mucha experiencia y me sorprendió lo acogedor que es el lugar. Las clases están pensadas para todos los niveles y los profesores realmente se preocupan por cada alumno. Salgo de cada sesión relajada y con energía renovada. ¡100% recomendable!"</p>
                  <div className="user">
                    <img src="/Persona1.jpg" alt="" />
                    <div className="user-info">
                      <h3>Ana Martínez</h3>
                      <span>Cliente feliz</span>
                    </div>
                  </div>
                  <span className="fas fa-quote-right"></span>
                </div>

                <div className="box">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>                    
                  </div>

                  <p>"Lo que más me gusta de Shanti Yoga son los talleres. Cada vez aprendo algo nuevo sobre meditación, respiración y posturas. El ambiente es tranquilo, positivo y sin presión. Es un espacio donde realmente puedo desconectarme del estrés diario y reconectar conmigo mismo."</p>
                  <div className="user">
                    <img src="/Persona2.jpg" alt="" />
                    <div className="user-info">
                      <h3>Martín López</h3>
                      <span>Cliente feliz</span>
                    </div>
                  </div>
                  <span className="fas fa-quote-right"></span>
                </div>

                <div className="box">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>                    
                  </div>

                  <p>"Me encanta la comunidad de Shanti Yoga. Desde que vine por primera vez me sentí bienvenida, y todos los alumnos y profes hacen que cada clase sea divertida y motivadora. Además, las instalaciones son lindas y luminosas. Para mí, es más que un lugar para practicar yoga; es un espacio de crecimiento personal."</p>
                  <div className="user">
                    <img src="/Persona3.webp" alt="" />
                    <div className="user-info">
                      <h3>Valentina Gómez</h3>
                      <span>Cliente feliz</span>
                    </div>
                  </div>
                  <span className="fas fa-quote-right"></span>
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

