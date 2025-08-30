import Navbar from "../components/Navbar";
import "../styles/HomePage.css"
/*import { BrowserRouter, Routes, Route } from "react-router-dom";*/

function HomePage(){
  return (
    <>
      <Navbar />
        <main>
          <section className="home">
            <div className="hero">
              <img className="florFondoHome" src="/FlorLogo.png" alt="" />
              <h1 className="hero-title">SHANTI <span className="block yoga">yoga</span></h1>
              <p className="hero-subtitle">Tu espacio para crecer y relajarte.</p>
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

