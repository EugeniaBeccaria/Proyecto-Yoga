import "../styles/HomePage.css"
import "../styles/Nosotros.css"
/*import { useState } from "react";*/
/*import { BrowserRouter, Routes, Route } from "react-router-dom";*/


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
                <h2 className="titulo-nosotros">Nosotros</h2>
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

          </section>
          <section id="talleres" className="talleres"></section>
          <section id="reseñas" className="reseñas"></section>
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

